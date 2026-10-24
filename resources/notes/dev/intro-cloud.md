---
title: Introdução à Cloud
date: 2026-10-15
summary: Pequeno resumo de elementos chave de computação em nuvem.
---

# O que é computação em Nuvem
Fornecimento de recursos computacionais pela internet, sob demanda.
- Compute.
- Storage.
- Network.
Podem ser provisionados de maneira extremamente rápida e escalável.

## Virtualização
É fundamental para o funcionamento da cloud.
- Permite a possibilidade de multiplas máquinas virtuais em apenas uma máquina (servidor)
  - Cada uma delas roda um sistema operacional diferente e suas aplicações.
  - As VMs não sabem da existências das outras e compartilham os mesmos recursos.
- Hypervisor: Software responsável por criar o ambiente virtualizado, possibilitando várias VMs no mesmo host.
  - Se mantém entre o hardware físico e as VMs, cria o conjunto compartilhado de recursos.
Benefícios:
- Investimento inicial com infraestrutura reduzido.
- Custo de operação menor.
- Economia de espaço.

## Termos associados
Compute:
- Fornece recursos computacionais para processar as cargas de trabalho (Aplicação, serviço ou tarefa).
- Relativo à CPU e RAM.
Storage:
- Permite salvar dados em um ambiente compartilhado.
- Tudo que permite salvar dados na nuvem é um recurso de storage.
- Relativo à armazenamento, tipo HD ou NAS em um servidor.
Network:
- Fornece conectividade que permite outros recursos se comunicar uns com os outros.
- Relativo à Roteador e Firewall.

# Tipos de Nuvem
## Pública
O provedor disponibiliza o uso de infraestrutura compartilhada que pode ser provisionada sob demanda e rapidamente.
- Pode ser acessada pela internet.
- O consumidor nunca vai ver o hardware, mas consegue definir a zona geográfica que será "hospedado".
- A manutenção da parte física e por conta do provedor.

## Privada
É uma infraestrutura dedicada a uma única organização, oferecendo maior controle sobre recursos.
- Pode ser on-premise e cloud ao mesmo tempo.
  - Isso porque utiliza virtualização e recursos compartilhados.

## Híbrida
Combina ambientes de nuvem privada e pública.
- Ganha as vantagens dos dois tipos.
- Permite arquitetar os serviços da maneira mais apropriada para a empresa.
- Geralmente utilizada em situações críticas (picos) ou recuperação de desastre.
  - Frequentemente utilizada em configurações de curto prazo e preparação para transições para núvem pública
  
## Comunitária
Compartilhada por organizações com propósitos parecidos (Segurança por exemplo).
  - Permite as organizações colaborarem e compartilhar recursos, com a escalabilidade da nuvem.
 
# Conceitos chave de nuvem
- Sob-demanda: Imediatamente disponível para alocar quando e onde você precisa.
- Escalabilidade: Permite escalar os recursos dependendo da necessidade.
  - Vertical: Aumenta/Diminui a capacidade de uma máquina.
  - Horizontal: Altera a quantidade de máquinas (Adiciona/Remove).
- Economia de escala: Grandes provedores conseguem operar infraestrutura em larga escala, reduzindo o custo por unidade de recurso.
- Flexibilidade e Elasticidade:
  - Flexibilidade: Capacidade de escolher e configurar recursos conforme as necessidades.
  - Elasticidade: Capacidade de aumentar ou reduzir tamanho AUTOMATICAMENTE ou sob demanda de acordo com o trabalho.
- Pay as you go: Paga apenas pelo o que usar.
- Disponibilidade: provedores de nuvem distribuem sua infraestrutura em diferentes regiões e zonas de disponibilidade, permitindo arquiteturas altamente disponíveis e resilientes.
- Segurança: As nuvens prometem ser mais seguras que os próprios data centers das empresas, atingindo padrões de qualidade de segurança definidor mundialmente.

## Segurança
Modelo de responsabilidade compartilhada
- Provedor: Mantém a segurança DA nuvem.
- Cliente: Mantém a segurança NA nuvem.

# Modelos de serviço em nuvem
Cada tipo de serviço da um nivel de gerenciamento e customização para sua solução.

## SaaS
A aplicação é entregue pronta para o uso através da internet, sem configuração do ambiente e infraestrutura.
- Exemplo: Gmail.
- Pouquíssima customização da aplicação.

## PaaS
Fornece um ambiente pré-configurado para desenvolvimento.
- Reduz a necessidade de gerenciar a infra.

## IaaS
Fornece recursos de infraestrutura, como processamento, armazenamento e redes virtualizadas.
- O cliente tem maior controle sobre o ambiente, incluindo o SO.
- Ainda assim o host é responsabilidade do provedor.

# Casos de uso comuns de computação em nuvem
- Armazenamento de dados e Backup.
- Controle de tráfego.
- Web Hosting.
- Homologação.
- Big Data.