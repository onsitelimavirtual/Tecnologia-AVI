# Relatório de QA — Toolkit do Programador

Data: 21/10/2026

## Escopo validado

- Nome e escopo: Toolkit do Programador. Sem menção a projetos de viagens.
- Motor: 13 testes unitários aprovados em Node.js 22; cobrem 6 linguagens, receitas, escolha de modelo, objetivo obrigatório, limites, entradas maliciosas em comentários e diferenças de texto.
- Análise estática: `node --check app.js` concluído sem erros de sintaxe; 57 referências diretas do JavaScript a IDs da página verificadas, sem elementos ausentes.
- Integridade do arquivo standalone: conteúdo equivalente aos CSS/JS separados, com os fechamentos de script escapados para incorporação segura.

## Cobertura de interface e pendências

- Existe `tests/test_ui.py` com cenários de navegação, geração de scripts, edição, download, armazenamento, biblioteca, ferramentas, tema, versão mobile e arquivo standalone.
- A execução do teste automatizado de interface **não pôde ser concluída neste ambiente**: o navegador Chromium bloqueou `http://127.0.0.1` e `file://` com `ERR_BLOCKED_BY_ADMINISTRATOR`. A existência dos testes não equivale à aprovação.
- A instalação PWA em HTTPS, comportamento real de cópia/arquivo no Android e execução de cada script gerado **não foram homologados**.

## Testes manuais recomendados antes de publicar

1. Abrir `Toolkit_do_Programador_Standalone.html`, navegar pelas seis áreas e gerar um exemplo de "Validar e-mail".
2. Selecionar Python e "Gerar senha forte"; conferir que o código gerado usa `secrets`.
3. Editar o código, copiar, baixar e salvar; recarregar, abrir "Meus scripts" e recuperar a edição.
4. Validar e invalidar JSON; codificar e decodificar um texto com acentos em Base64.
5. Testar o layout em Android, com orientação retrato e landscape, sem rolagem lateral indevida.
6. Se publicar em HTTPS, verificar instalação, ícones, abertura offline após primeira visita e atualização da aplicação.
7. Executar scripts apenas em ambientes de testes separados, após revisão de segurança.

## Cuidados

O criador usa templates e correspondência heurística; não interpreta pedidos livres como um modelo generativo e não executa códigos automaticamente. Exemplos com API usam endereço fictício. Conteúdo salvo fica no armazenamento local do navegador. Não inserir credenciais, dados sensíveis ou código de produção sem revisão.
