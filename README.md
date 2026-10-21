# Toolkit do Programador — IA Estendida Local 3.0

**Produto:** Toolkit do Programador • **Autoria:** Nailson Rodrigues de Lima • **Edição:** outubro de 2026.

## Visão geral

Esta edição melhora o motor offline, corrigindo a situação em que `Criar um diário eletrônico` gerava apenas HTML inicial com `TODO`. Agora o pedido é interpretado como **aplicativo conhecido** e produz um arquivo HTML independente, contendo interface, lógica, criação/edição/exclusão/pesquisa e importação/exportação em JSON.

A criação offline é **montagem determinística a partir de componentes e modelos locais**, e não um modelo de linguagem treinado. Não promete gerar qualquer software arbitrário. Os recursos de IA generativa do Chrome e Ollama permanecem opcionais e requerem compatibilidade/instalação do usuário. Não existe API paga obrigatória, conta de usuário nem backend do Toolkit.

## Formas de abrir

**Modo mais simples:** abra `Toolkit_do_Programador_IA_Estendida_Standalone.html`. Um único arquivo, sem Python, sem instalação e com os componentes locais incorporados. Pode funcionar offline, desde que o navegador tenha suporte às APIs usadas. A prévia HTML funciona em `iframe` isolado e, por segurança, o armazenamento nela pode ficar bloqueado.

**Publicação em GitHub Pages/HTTPS:** publique `index.html`, `styles.css`, `app.js`, `app-catalog.js`, `ai-engine.js`, `ai-ui.js`, `sw.js`, `manifest.webmanifest` e os ícones na mesma pasta. O PWA depende das condições de instalação do navegador; o cache funciona após acesso inicial sob HTTPS/localhost e não é aplicável ao standalone aberto como arquivo.

**Exemplo pronto para testar:** abra `Exemplos/diario_eletronico.html` (mesma aplicação produzida pelo catálogo); crie um registro, edite, pesquise e exporte JSON. Os dados ficam no dispositivo se o navegador permitir `localStorage`.

## O que o gerador local reconhece

| Solicitação aproximada | Modelo HTML resultante | Recursos principais |
|---|---|---|
| Criar um diário eletrônico | `diario_eletronico.html` | data, título, humor, registro, CRUD, busca e backup |
| Agenda de compromissos | `agenda_compromissos.html` | data, horário, local, CRUD, busca e backup |
| Gerenciador de tarefas | `lista_tarefas.html` | tarefa, prazo, prioridade, concluída, CRUD, busca e backup |
| Bloco de notas | `bloco_notas.html` | notas pesquisáveis, CRUD e backup |
| Agenda de contatos | `agenda_contatos.html` | nome, telefone, e-mail, CRUD e backup |
| Controle de despesas | `controle_despesas.html` | despesas, valores, categorias, CRUD e backup |
| Controle de estoque | `controle_estoque.html` | produtos, quantidade, preço, CRUD e backup |
| Calculadora | `calculadora.html` | soma, subtração, multiplicação, divisão e validação de zero |

A descrição em português é normalizada para identificar palavras-chave e combinações conhecidas, com prioridade às expressões reconhecidas. O programa é gerado em **HTML + CSS + JavaScript** dentro de um único arquivo, mesmo quando o usuário começa pela opção JavaScript. Se selecionar Python, SQL, Bash ou PowerShell, o motor não fingirá gerar um aplicativo web nessas linguagens: serão usadas apenas receitas compatíveis ou estrutura inicial com alerta. A seleção manual de receita continua prevalecendo.

### Criar pelo Toolkit

1. Abra a página **Criador de aplicações e scripts** e escreva `Criar um diário eletrônico`.
2. Clique em **Gerar exemplo de script**. O status deverá mostrar **Aplicação local completa** e o nome `diario_eletronico.html`.
3. Use **Verificar sintaxe** para uma revisão sintática básica do HTML e de JavaScript incorporado, **Abrir prévia HTML** para inspecionar a interface, ou **Editar código** para alterar o arquivo.
4. Use **Baixar arquivo** para obter o HTML independente. Abra o HTML baixado em um navegador para usar `localStorage` quando o navegador permitir. O backup JSON é recomendado.
5. Outra opção é ir até **Aplicações completas** e escolher diretamente um dos oito aplicativos.

### Outras ferramentas preservadas

- 16 receitas em seis linguagens: JavaScript, Python, SQL PostgreSQL, HTML, Bash e PowerShell.
- Editor, cópia, exportação e armazenamento de scripts no navegador.
- Ferramentas locais de JSON, Base64 UTF-8, URL, textos e comparação de código.
- IA Estendida: modo guiado por regras; IA Chrome ou Ollama opcional se modelos e ambiente estiverem disponíveis. Nenhum modelo generativo é fornecido no pacote.
- Visual responsivo, temas claro/escuro, Termos de Uso, Política de Privacidade e identidade visual.

## Privacidade, limites e segurança

- O módulo offline do catálogo e o modo guiado não chamam APIs. O código gerado não inclui bibliotecas CDN, nem dependências pagas.
- As aplicações de registros armazenam informações em `localStorage`. Isso **não é criptografia, sincronização, banco remoto ou backup automático**. Evite inserir dados sensíveis. Exportação JSON contém os dados em texto legível.
- Se o navegador bloquear armazenamento (notavelmente durante a prévia isolada), a aplicação informa que os dados só duram até o fechamento e permite exportar JSON manualmente.
- Importação JSON exige estrutura e tipo correspondentes; possui limite de 2 MB e até 500 registros por aplicação. **Importar substitui os dados atuais** após confirmação.
- A prévia exige clique explícito, usa `iframe` com `sandbox="allow-scripts allow-downloads"`, sem `allow-same-origin`. O isolamento reduz acesso ao Toolkit, mas não garante impedir tentativas de rede feitas por código HTML manualmente modificado. Não pré-visualize código não confiável.
- **Verificar sintaxe** faz apenas validação parcial no navegador. Um resultado positivo não certifica comportamento, acessibilidade, segurança nem compatibilidade universal.
- Solicitações fora do catálogo retornam receitas existentes ou um rascunho marcado como incompleto. Gerar software arbitrário sem templates requer um modelo generativo compatível, revisão humana e testes.
- O suporte a Windows 7 de 32 bits, navegadores antigos, PWA em cada dispositivo e IA local Chrome/Ollama depende de requisitos específicos e **não está homologado** nesta entrega.

## Arquivos

`index.html`, `app.js`, `app-catalog.js`, `ai-engine.js`, `ai-ui.js`, `styles.css`, `sw.js`, `manifest.webmanifest`, `icon.svg`, `icon-192.png`, `icon-512.png`, `Toolkit_do_Programador_IA_Estendida_Standalone.html`, `Exemplos/`, `tests/`, `README.md` e `RELATORIO_QA.md`.

## Testes feitos e não feitos

Consulte `RELATORIO_QA.md` para resultados reproduzidos, limitações e cenários de aceite. Não foi validada a conexão com um Ollama real nem a instalação PWA num telefone físico.

© 2026 Nailson Rodrigues de Lima. Respeite as licenças de eventuais componentes externos e dos modelos opcionais.
