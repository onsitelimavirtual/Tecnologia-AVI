# Toolkit do Programador

Aplicativo web responsivo de autoria de Nailson Rodrigues de Lima. O escopo é exclusivamente um **kit para programação**, sem qualquer relação com busca de passagens ou descontos em viagens.

## Abrir e usar

- **Sem instalação:** extraia o ZIP e abra `index.html` em um navegador moderno. Não há dependências externas.
- **Arquivo único:** `Toolkit_do_Programador_Standalone.html` contém HTML, CSS e JavaScript. Abra diretamente, inclusive sem internet. Nesta variante, não há instalação PWA.
- **GitHub Pages ou hospedagem HTTPS:** publique os arquivos da pasta na raiz do site. O manifesto e o service worker permitirão que navegadores compatíveis ofereçam a instalação como PWA; normalmente é preciso acessar o site ao menos uma vez com conexão.
- **Android:** use o navegador Chrome ou outro moderno; para instalar PWA, a página deve estar hospedada em HTTPS. O arquivo único pode ser aberto localmente, se o gerenciador de arquivos e o navegador permitirem.

## Como gerar um código

1. Entre em **Criador de scripts**.
2. Explique a **função pretendida** em português (por exemplo, "Validar e-mail").
3. Opcionalmente descreva um caso de uso; ele aparecerá documentado no código gerado.
4. Selecione uma linguagem: JavaScript, Python, SQL/PostgreSQL, HTML, Bash ou PowerShell.
5. Se preferir, selecione uma receita manualmente; caso contrário, o aplicativo tenta identificar termos de sua descrição.
6. Clique em **Gerar exemplo de script**. Use **Editar código** para adaptar o exemplo antes de copiar, baixar ou salvar. Teste no ambiente adequado.

O app oferece receitas locais pré-programadas, e **não** um gerador por LLM. Uma solicitação que não se encaixa em uma receita gera **somente uma estrutura inicial marcada como incompleta**. O caso de uso não é interpretado como especificação executável. Não cole tokens nem informações sensíveis.

## Outros recursos

- Ferramentas: validação e formatação de JSON, Base64 para texto UTF-8, codificação de componente de URL, normalização de texto, comparação de versões por linha.
- Biblioteca: receitas pesquisáveis e atalho para abrir no criador.
- Meus scripts: salvamento local no navegador via localStorage (até 25 itens), reabertura e exclusão. As alterações feitas no editor também podem ser salvas.
- Tema claro/escuro, acessibilidade básica (labels, foco visível, navegação pelo teclado), Termos de Uso e Política de Privacidade.

## QA e limites conhecidos

- O motor local passou em 13 testes automatizados de Node.js, e uma validação estática não encontrou IDs ausentes. Consulte `RELATORIO_QA.md` para os resultados.
- A suíte de interface com Playwright está incluída em `tests/`, mas a execução foi bloqueada pelas políticas do navegador do ambiente de entrega; não equivale a homologação em navegador real. Os testes PWA e Android exigem verificação no dispositivo.
- Os exemplos são educativos: seu funcionamento depende da linguagem, versão, permissões e dados fornecidos ao executá-los em outro ambiente. Templates de API usam endereço **fictício** e exigem substituição.
- SQL usa sintaxe PostgreSQL; `clientes` é uma tabela de exemplo e pode não existir em seu banco. `$1` e `$2` são parâmetros do driver.
- A funcionalidade de regex existe como receita de código, não como executor interno. Nenhum código gerado é executado pelo aplicativo.
- Base64 não protege segredos. Histórico e tema usam armazenamento local, sujeito a limpeza ou bloqueio pelo navegador.
- Instalabilidade PWA varia conforme navegador e hospedagem. O navegador decide quando oferecer a instalação.

## Estrutura

- `index.html`: interface web
- `styles.css`: visual responsivo
- `app.js`: motor local e lógica
- `icon.svg`, `icon-192.png`, `icon-512.png`: identidade visual
- `manifest.webmanifest`, `sw.js`: instalabilidade/offline em HTTPS
- `Toolkit_do_Programador_Standalone.html`: versão autônoma, um único arquivo

© 2026 Nailson Rodrigues de Lima. Todos os direitos reservados sobre a identidade e implementação autoral. A geração de scripts não concede direitos sobre software de terceiros.
