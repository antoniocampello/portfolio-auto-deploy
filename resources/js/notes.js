const content = document.querySelector("#notes-content");
const notePath = new URLSearchParams(window.location.search).get("note");
const topics = {
    dev: "Dev",
    reading: "Reading",
    ideas: "Ideas",
};

function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) {
        node.textContent = text;
    }
    if (className) {
        node.className = className;
    }
    return node;
}

function safeLink(href) {
    try {
        const url = new URL(href, window.location.href);
        return ["http:", "https:", "mailto:"].includes(url.protocol) ? url.href : null;
    } catch {
        return null;
    }
}

function renderInline(text, parent) {
    const tokenPattern = /(`[^`]+`|\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|_[^_]+_|\[[^\]]+\]\([^)]+\))/g;
    let position = 0;

    for (const match of text.matchAll(tokenPattern)) {
        parent.append(document.createTextNode(text.slice(position, match.index)));
        const token = match[0];

        if (token.startsWith("`")) {
            parent.append(element("code", token.slice(1, -1)));
        } else if (token.startsWith("**") || token.startsWith("__")) {
            parent.append(element("strong", token.slice(2, -2)));
        } else if (token.startsWith("*") || token.startsWith("_")) {
            parent.append(element("em", token.slice(1, -1)));
        } else {
            const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
            const href = linkMatch && safeLink(linkMatch[2]);
            if (linkMatch && href) {
                const link = element("a", linkMatch[1]);
                link.href = href;
                const url = new URL(href);
                if (["http:", "https:"].includes(url.protocol) && url.origin !== window.location.origin) {
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                }
                parent.append(link);
            } else {
                parent.append(document.createTextNode(token));
            }
        }
        position = match.index + token.length;
    }

    parent.append(document.createTextNode(text.slice(position)));
}

function renderMarkdown(markdown, container) {
    const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
    let index = 0;

    while (index < lines.length) {
        const line = lines[index];
        if (!line.trim()) {
            index += 1;
            continue;
        }

        const fence = /^\s*```/.exec(line);
        if (fence) {
            const codeLines = [];
            index += 1;
            while (index < lines.length && !/^\s*```/.test(lines[index])) {
                codeLines.push(lines[index]);
                index += 1;
            }
            if (index < lines.length) {
                index += 1;
            }
            const pre = element("pre");
            pre.append(element("code", codeLines.join("\n")));
            container.append(pre);
            continue;
        }

        const heading = /^(#{1,6})\s+(.+)$/.exec(line);
        if (heading) {
            const headingNode = element(`h${heading[1].length}`);
            renderInline(heading[2], headingNode);
            container.append(headingNode);
            index += 1;
            continue;
        }

        const listMatch = /^\s*(?:[-*+]|\d+\.)\s+/.exec(line);
        if (listMatch) {
            const ordered = /^\s*\d+\./.test(line);
            const list = element(ordered ? "ol" : "ul");
            while (index < lines.length) {
                const item = /^\s*(?:[-*+]|\d+\.)\s+(.+)$/.exec(lines[index]);
                if (!item || /^\s*\d+\./.test(lines[index]) !== ordered) {
                    break;
                }
                const listItem = element("li");
                renderInline(item[1], listItem);
                list.append(listItem);
                index += 1;
            }
            container.append(list);
            continue;
        }

        if (/^\s*>/.test(line)) {
            const quote = element("blockquote");
            while (index < lines.length && /^\s*>/.test(lines[index])) {
                const paragraph = element("p");
                renderInline(lines[index].replace(/^\s*>\s?/, ""), paragraph);
                quote.append(paragraph);
                index += 1;
            }
            container.append(quote);
            continue;
        }

        const paragraphLines = [];
        while (
            index < lines.length &&
            lines[index].trim() &&
            !/^\s*```/.test(lines[index]) &&
            !/^(#{1,6})\s+/.test(lines[index]) &&
            !/^\s*(?:[-*+]|\d+\.)\s+/.test(lines[index]) &&
            !/^\s*>/.test(lines[index])
        ) {
            paragraphLines.push(lines[index]);
            index += 1;
        }
        const paragraph = element("p");
        renderInline(paragraphLines.join(" "), paragraph);
        container.append(paragraph);
    }
}

function showError(message) {
    const error = element("p", message, "note-error");
    error.setAttribute("role", "alert");
    content.replaceChildren(error);
}

async function showNote(path) {
    if (!/^(dev|reading|ideas)\/[a-zA-Z0-9_-]+\.md$/.test(path)) {
        showError("Invalid note address.");
        return;
    }

    content.replaceChildren(element("p", "Loading note...", "note-loading"));
    const [topic] = path.split("/");
    try {
        const response = await fetch(`../notes/${path.split("/").map(encodeURIComponent).join("/")}`);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const source = await response.text();
        const frontMatter = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(source);
        if (!frontMatter) {
            throw new Error("Metadados da nota.");
        }

        const metadata = {};
        for (const line of frontMatter[1].split(/\r?\n/)) {
            const field = /^(title|date|summary):\s*(.*)$/.exec(line);
            if (field) {
                metadata[field[1]] = field[2].replace(/^["']|["']$/g, "");
            }
        }
        if (!metadata.title || !metadata.date) {
            throw new Error("Data ou título da nota faltando.");
        }

        document.title = `${metadata.title} | Den @ Notes`;
        const article = element("article", undefined, "note-article");
        const header = element("header", undefined, "note-article-header");
        header.append(element("p", `${metadata.date} · ${topics[topic]}`, "note-date"));
        header.append(element("h2", metadata.title));
        article.append(header);

        const body = element("div", undefined, "markdown-content");
        renderMarkdown(frontMatter[2].trim(), body);
        article.append(body);

        const backLink = element("a", "← Voltar para todas as notas", "back-to-notes");
        backLink.href = window.location.pathname;
        article.append(backLink);
        content.replaceChildren(article);
    } catch (error) {
        console.error("Could not load Markdown note:", error);
        showError("Could not load this note. Check that the Markdown file exists and is available on the site.");
    }
}

if (notePath) {
    showNote(notePath);
}