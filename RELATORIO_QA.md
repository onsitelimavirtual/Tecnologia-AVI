# Relatório QA — Toolkit do Programador, IA Estendida Local 3.0

Data: 21 de outubro de 2026.

## Passagem A — entendimento do pedido

**Requisito corrigido:** ao solicitar `Criar um diário eletrônico`, produzir um aplicativo utilizável, não um HTML com `TODO`. A solução foi implementada por catálogo de 8 aplicativos com templates completos para cada domínio, combinado com a biblioteca anterior de 16 receitas em seis linguagens. A camada offline não é IA generativa e não requer API paga.

**Limitação preservada:** pedidos fora do catálogo permanecem rotulados como rascunhos e não são apresentados como programas prontos.

## Passagem B — execução de testes

- **13/13** testes Node.js da biblioteca original (`tests/test_engine.js`) aprovados.
- **25/25** testes Node.js da IA Estendida e adaptadores simulados (`tests/test_ai.js`) aprovados.
- **20/20** novos testes Node.js (`tests/test_catalog.js`) aprovados: oito modelos completos com JavaScript sintaticamente compilável, identificação de nove frases em português, fallback de intenção desconhecida, seleção manual de receita e compatibilidade de linguagens.
- **Testes de navegador Chromium, via conteúdo HTML incorporado (`tests/test_catalog_browser.py`)**: diário com criação, edição, busca, exclusão, exportação e reimportação JSON; calculadora com divisão normal e proteção contra divisão por zero; Toolkit standalone com solicitação em linguagem natural, emissão de HTML sem `TODO` e abertura da prévia isolada. Nenhuma exceção JavaScript observada nesses cenários.
- **Testes adicionais de interface mobile (`tests/test_all_templates_browser.py`)**: criação de registros nos sete aplicativos CRUD; tela de catálogo com oito aplicativos; geração pela IA guiada, transferência ao editor e teste de rolagem horizontal nos layouts de 390 px. Sem exceções JavaScript nesses cenários.
- **Testes estáticos**: `node --check` em `app-catalog.js`, `app.js`, `ai-engine.js` e `ai-ui.js` aprovados; conferência de inclusão dos arquivos no HTML standalone e no cache PWA.

## Limites dos testes

1. A verificação do navegador foi feita com conteúdo HTML injetado no Chromium usando `page.set_content()`, pois esta infraestrutura anteriormente bloqueava URLs locais. **Não representa validação completa de abertura `file://`, publicação HTTPS ou instalação PWA.**
2. A prévia com origem isolada pode negar `localStorage`. Foram exercitados o comportamento de fallback em memória e importação/exportação; persistência real após fechar/reabrir no dispositivo do usuário precisa de confirmação.
3. Os testes de UI cobrem fluxos principais do diário e calculadora e criação de registros dos demais aplicativos em viewport mobile. Os processos completos de importação, edição e exclusão nos outros seis modelos ainda devem ser testados no navegador final antes de uso de produção.
4. A validação sintática não substitui execução de testes de lógica. Não foi realizada auditoria de segurança independente, avaliação WCAG completa, medição de desempenho com 500 registros nem homologação em Android/Windows 7.
5. Chrome LanguageModel e Ollama local continuam opcionais; integrações com modelo real não foram testadas nesta versão.

## Checklist para o destinatário

- [ ] Abrir o standalone, gerar `Criar um diário eletrônico` e conferir status e nome de arquivo.
- [ ] Abrir a prévia e verificar os campos de data, título, humor e registro.
- [ ] Baixar o HTML gerado, abri-lo separadamente e criar/editar/excluir/pesquisar registros.
- [ ] Fechar/reabrir o HTML, verificar se os dados persistem no seu navegador; em caso de bloqueio, usar exportar/importar JSON.
- [ ] Importar um backup inválido e confirmar mensagem de erro sem perda de registros.
- [ ] Alterar o código e executar o verificador; testar com arquivo ainda isolado.
- [ ] Experimentar agenda, tarefas, estoque, despesas, notas e contatos no dispositivo final.
- [ ] Publicar em HTTPS e testar instalação PWA e cache sem internet, se desejar.

**Resultado técnico:** funções centrais do motor de aplicações e do diário foram verificadas em testes automatizados; não foi atribuída homologação comercial ou compatibilidade universal.
