/* Toolkit do Programador — motor local e interface.
   Modulo de IA Estendida opcional em ai-engine.js e ai-ui.js.
   Copyright (c) 2026 Nailson Rodrigues de Lima. */
(function () {
  'use strict';

  const LANGUAGES = {
    javascript: { name: 'JavaScript', ext: 'js', comment: '//' },
    python: { name: 'Python', ext: 'py', comment: '#' },
    sql: { name: 'SQL / PostgreSQL', ext: 'sql', comment: '--' },
    html: { name: 'HTML', ext: 'html', comment: '<!--' },
    bash: { name: 'Bash', ext: 'sh', comment: '#' },
    powershell: { name: 'PowerShell', ext: 'ps1', comment: '#' }
  };

  // Cada receita contém EXEMPLOS de código. Nunca interpolar objetivo/caso em código executável.
  const RECIPES = [
    {
      id: 'email', title: 'Validar endereço de e-mail', category: 'VALIDAÇÃO',
      description: 'Verificar um formato básico de e-mail, sem garantir que a caixa exista.',
      example: 'Validar o formato de um e-mail de cadastro',
      terms: ['email', 'e-mail', 'correio eletronico', 'validar endereco', 'validacao de cadastro'],
      advice: 'Teste entradas válidas e inválidas. Validação de formato não confirma a existência da conta.',
      templates: {
        javascript: `// Exemplo para JavaScript moderno\nfunction emailValido(valor) {\n  if (typeof valor !== 'string' || valor.length > 254) return false;\n  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(valor);\n}\n\nconsole.log(emailValido('ana@exemplo.com')); // true\nconsole.log(emailValido('invalido@')); // false`,
        python: `# Python 3 — validação básica de formato\nimport re\n\ndef email_valido(valor):\n    if not isinstance(valor, str) or len(valor) > 254:\n        return False\n    return re.fullmatch(r"[^\\s@]+@[^\\s@]+\\.[^\\s@]+", valor) is not None\n\nprint(email_valido("ana@exemplo.com"))  # True\nprint(email_valido("invalido@"))  # False`,
        html: `<!doctype html>\n<html lang="pt-BR">\n<head><meta charset="utf-8"><title>Validação de e-mail</title></head>\n<body>\n  <form id="cadastro">\n    <label>E-mail: <input id="email" type="email" required maxlength="254"></label>\n    <button type="submit">Validar</button>\n  </form>\n  <p id="resultado" role="status"></p>\n  <script>\n    document.getElementById('cadastro').addEventListener('submit', function (e) {\n      e.preventDefault();\n      document.getElementById('resultado').textContent = 'Formato aceito pelo navegador.';\n    });\n  </script>\n</body>\n</html>`
      }
    },
    {
      id: 'api', title: 'Consultar uma API', category: 'INTEGRAÇÃO',
      description: 'Fazer uma requisição GET e tratar respostas e erros básicos.',
      example: 'Buscar dados de uma API em JSON',
      terms: ['api', 'requisicao http', 'buscar dados externos', 'fetch', 'endpoint', 'webservice', 'rest'],
      advice: 'Substitua api.exemplo.com por uma API real e revise autenticação, CORS, política de uso e formato da resposta.',
      templates: {
        javascript: `// JavaScript moderno — navegador ou ambiente com fetch\nasync function buscarDados() {\n  const endereco = 'https://api.exemplo.com/dados'; // ALTERE a URL\n  try {\n    const resposta = await fetch(endereco, { method: 'GET' });\n    if (!resposta.ok) throw new Error('HTTP ' + resposta.status);\n    const dados = await resposta.json();\n    console.log(dados);\n    return dados;\n  } catch (erro) {\n    console.error('Não foi possível consultar a API:', erro.message);\n    return null;\n  }\n}\n\nbuscarDados();`,
        python: `# Python 3 — biblioteca padrão, sem pip\nimport json\nfrom urllib.request import urlopen\nfrom urllib.error import HTTPError, URLError\n\ndef buscar_dados():\n    endereco = "https://api.exemplo.com/dados"  # ALTERE\n    try:\n        with urlopen(endereco, timeout=10) as resposta:\n            dados = json.load(resposta)\n            print(dados)\n            return dados\n    except (HTTPError, URLError, ValueError) as erro:\n        print("Falha na consulta:", erro)\n        return None\n\nbuscar_dados()`,
        powershell: `# PowerShell — troque pelo endpoint autorizado\n$endereco = 'https://api.exemplo.com/dados'\ntry {\n    $dados = Invoke-RestMethod -Uri $endereco -Method Get -TimeoutSec 10 -ErrorAction Stop\n    $dados | ConvertTo-Json -Depth 5\n} catch {\n    Write-Error "Falha ao consultar API: $($_.Exception.Message)"\n}`,
        bash: `#!/usr/bin/env bash\n# Requer curl. Informe um endpoint autorizado.\nset -euo pipefail\nURL='https://api.exemplo.com/dados'\nif ! command -v curl >/dev/null 2>&1; then\n  echo 'Instale o curl antes de executar.' >&2\n  exit 1\nfi\ncurl --fail --silent --show-error --max-time 10 "$URL"`
      }
    },
    {
      id: 'password', title: 'Gerar senha aleatória', category: 'SEGURANÇA',
      description: 'Usar geradores criptográficos para obter uma senha de exemplo.',
      example: 'Gerar uma senha aleatória forte',
      terms: ['senha', 'password', 'senha forte', 'password generator', 'credencial'],
      advice: 'Use geradores criptográficos. Não registre senhas em logs, histórico ou capturas de tela.',
      templates: {
        javascript: `// JavaScript no navegador — exige crypto.getRandomValues\nfunction gerarSenha(tamanho = 16) {\n  if (!Number.isInteger(tamanho) || tamanho < 1 || tamanho > 128) {\n    throw new RangeError('Escolha tamanho entre 1 e 128.');\n  }\n  const caracteres = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%';\n  const limite = Math.floor(256 / caracteres.length) * caracteres.length;\n  const resultado = [];\n  while (resultado.length < tamanho) {\n    const bytes = new Uint8Array(32);\n    crypto.getRandomValues(bytes);\n    for (const byte of bytes) {\n      if (byte < limite) resultado.push(caracteres[byte % caracteres.length]);\n      if (resultado.length === tamanho) break;\n    }\n  }\n  return resultado.join('');\n}\n\n// Demonstração: evite exibir senhas reais em logs.\nconsole.log(gerarSenha(16));`,
        python: `# Python 3 — módulo secrets, adequado para senhas\nimport secrets\nimport string\n\ndef gerar_senha(tamanho=16):\n    if not isinstance(tamanho, int) or not 1 <= tamanho <= 128:\n        raise ValueError("Tamanho deve estar entre 1 e 128")\n    alfabeto = string.ascii_letters + string.digits + "!@#$%"\n    return "".join(secrets.choice(alfabeto) for _ in range(tamanho))\n\n# Apenas para demonstração. Não grave senhas em logs.\nprint(gerar_senha())`
      }
    },
    {
      id: 'dedupe', title: 'Remover elementos duplicados', category: 'DADOS',
      description: 'Eliminar valores repetidos de uma lista, preservando a primeira ocorrência.',
      example: 'Remover itens duplicados de uma lista',
      terms: ['duplicad', 'repetid', 'unico', 'sem repetir', 'distinct', 'eliminar repeticao'],
      advice: 'Experimente uma lista vazia, valores repetidos e dados de tipos diferentes.',
      templates: {
        javascript: `// Para valores primitivos (textos, números, booleanos)\nfunction semDuplicados(lista) {\n  return [...new Set(lista)];\n}\n\nconsole.log(semDuplicados([2, 3, 2, 5, 3])); // [2, 3, 5]`,
        python: `# Para valores hashable, mantendo a ordem\ndef sem_duplicados(valores):\n    return list(dict.fromkeys(valores))\n\nprint(sem_duplicados([2, 3, 2, 5, 3]))  # [2, 3, 5]`,
        sql: `-- PostgreSQL: DISTINCT elimina resultados repetidos\n-- Substitua clientes e cidade pelos nomes reais.\nSELECT DISTINCT cidade\nFROM clientes\nWHERE cidade IS NOT NULL\nORDER BY cidade;`
      }
    },
    {
      id: 'sort', title: 'Ordenar uma lista', category: 'DADOS',
      description: 'Colocar números em ordem crescente sem modificar a lista original.',
      example: 'Ordenar lista de valores do menor para o maior',
      terms: ['ordenar', 'classificar lista', 'crescente', 'decrescente', 'sort', 'ordenacao'],
      advice: 'Em JavaScript, passe uma função de comparação para ordenar números corretamente.',
      templates: {
        javascript: `// Sem alterar a lista original\nconst numeros = [15, 2, 44, 7];\nconst crescente = [...numeros].sort((a, b) => a - b);\nconst decrescente = [...numeros].sort((a, b) => b - a);\nconsole.log({ crescente, decrescente });`,
        python: `numeros = [15, 2, 44, 7]\ncrescente = sorted(numeros)\ndecrescente = sorted(numeros, reverse=True)\nprint("Crescente:", crescente)\nprint("Decrescente:", decrescente)`,
        sql: `-- PostgreSQL — substitua tabela/coluna conforme sua base\nSELECT id, nome\nFROM clientes\nORDER BY nome ASC, id ASC;`
      }
    },
    {
      id: 'json', title: 'Ler e formatar JSON', category: 'DADOS',
      description: 'Converter conteúdo JSON em objeto e exibir uma versão indentada.',
      example: 'Ler e formatar texto JSON',
      terms: ['json', 'formatar arquivo', 'dados estruturados', 'parse'],
      advice: 'JSON exige aspas duplas para chaves e textos; dados recebidos externamente devem ser validados.',
      templates: {
        javascript: `const texto = '{"nome":"Ana","ativo":true}';\ntry {\n  const objeto = JSON.parse(texto);\n  console.log(JSON.stringify(objeto, null, 2));\n} catch (erro) {\n  console.error('JSON inválido:', erro.message);\n}`,
        python: `import json\n\ntexto = '{"nome":"Ana","ativo":true}'\ntry:\n    objeto = json.loads(texto)\n    print(json.dumps(objeto, ensure_ascii=False, indent=2))\nexcept json.JSONDecodeError as erro:\n    print("JSON inválido:", erro)`,
        powershell: `$texto = '{"nome":"Ana","ativo":true}'\ntry {\n    $objeto = $texto | ConvertFrom-Json -ErrorAction Stop\n    $objeto | ConvertTo-Json -Depth 10\n} catch {\n    Write-Error "JSON inválido: $($_.Exception.Message)"\n}`
      }
    },
    {
      id: 'csv', title: 'Ler arquivo CSV', category: 'ARQUIVOS',
      description: 'Ler colunas de um arquivo CSV com cabeçalho.',
      example: 'Ler os dados de um arquivo CSV',
      terms: ['csv', 'planilha csv', 'arquivo de tabela', 'valores separados'],
      advice: 'Ajuste o nome do arquivo, delimitador e codificação. Não confunda CSV com XLSX.',
      templates: {
        python: `# Coloque dados.csv na mesma pasta deste script\nimport csv\n\nwith open("dados.csv", "r", encoding="utf-8-sig", newline="") as arquivo:\n    leitor = csv.DictReader(arquivo, delimiter=",")\n    for linha in leitor:\n        print(linha)`,
        powershell: `# Ajuste o caminho; CSV com cabeçalho\n$arquivo = Join-Path $PSScriptRoot 'dados.csv'\nif (-not (Test-Path -LiteralPath $arquivo)) {\n    throw 'Arquivo dados.csv não encontrado.'\n}\nImport-Csv -LiteralPath $arquivo -Delimiter ',' -Encoding UTF8 | Format-Table -AutoSize`
      }
    },
    {
      id: 'discount', title: 'Calcular desconto', category: 'CÁLCULOS',
      description: 'Aplicar um desconto percentual a um valor numérico.',
      example: 'Calcular desconto percentual em um produto',
      terms: ['desconto', 'porcentagem', 'percentual', 'preco final', 'valor final'],
      advice: 'Para valores financeiros reais, considere inteiros em centavos ou bibliotecas decimais.',
      templates: {
        javascript: `function aplicarDesconto(preco, porcentagem) {\n  if (!Number.isFinite(preco) || preco < 0 || !Number.isFinite(porcentagem) ||\n      porcentagem < 0 || porcentagem > 100) {\n    throw new Error('Preço e percentual inválidos.');\n  }\n  return Math.round(preco * (1 - porcentagem / 100) * 100) / 100;\n}\nconsole.log(aplicarDesconto(200, 15)); // 170`,
        python: `from decimal import Decimal, ROUND_HALF_UP\n\ndef aplicar_desconto(preco, percentual):\n    preco = Decimal(str(preco))\n    percentual = Decimal(str(percentual))\n    if preco < 0 or not 0 <= percentual <= 100:\n        raise ValueError("Preço ou percentual inválido")\n    return (preco * (1 - percentual / 100)).quantize(\n        Decimal("0.01"), rounding=ROUND_HALF_UP\n    )\n\nprint(aplicar_desconto("200.00", "15"))  # 170.00`
      }
    },
    {
      id: 'crud', title: 'Criar tabela e operações SQL', category: 'BANCO DE DADOS',
      description: 'Modelo de tabela e consultas com parâmetros PostgreSQL.',
      example: 'Criar tabela SQL com cadastro de clientes',
      terms: ['sql', 'banco de dados', 'criar tabela', 'consulta banco', 'crud', 'inserir registro', 'insert', 'select'],
      advice: 'Execute cada comando conscientemente, em base de testes. $1 representa um parâmetro aplicado pelo driver da sua linguagem.',
      templates: {
        sql: `-- PostgreSQL — modelo didático\nCREATE TABLE IF NOT EXISTS clientes (\n  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  nome TEXT NOT NULL,\n  email TEXT NOT NULL UNIQUE,\n  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()\n);\n\n-- Na aplicação, vincule os parâmetros $1 e $2 pelo driver.\nINSERT INTO clientes (nome, email) VALUES ($1, $2);\n\nSELECT id, nome, email FROM clientes WHERE id = $1;\n\nUPDATE clientes SET nome = $1 WHERE id = $2;\n\n-- Só exclua registros com autorização e confirmação.\n-- DELETE FROM clientes WHERE id = $1;`
      }
    },
    {
      id: 'pagination', title: 'Paginar resultados', category: 'DADOS',
      description: 'Dividir uma lista ou consulta em páginas previsíveis.',
      example: 'Paginar uma lista de resultados',
      terms: ['paginacao', 'paginar', 'pagina de resultados', 'limit offset', 'pagination'],
      advice: 'Defina limites máximos para o tamanho de página. Em bancos grandes, considere paginação por cursor.',
      templates: {
        javascript: `function paginar(itens, pagina = 1, porPagina = 10) {\n  if (!Number.isInteger(pagina) || pagina < 1 ||\n      !Number.isInteger(porPagina) || porPagina < 1 || porPagina > 100) {\n    throw new Error('Parâmetros de página inválidos.');\n  }\n  const inicio = (pagina - 1) * porPagina;\n  return itens.slice(inicio, inicio + porPagina);\n}\nconsole.log(paginar([1, 2, 3, 4, 5], 2, 2)); // [3, 4]`,
        python: `def paginar(itens, pagina=1, por_pagina=10):\n    if not isinstance(pagina, int) or not isinstance(por_pagina, int):\n        raise ValueError("Página e limite devem ser inteiros")\n    if pagina < 1 or not 1 <= por_pagina <= 100:\n        raise ValueError("Página ou limite fora do intervalo")\n    inicio = (pagina - 1) * por_pagina\n    return itens[inicio:inicio + por_pagina]\n\nprint(paginar([1, 2, 3, 4, 5], 2, 2))  # [3, 4]`,
        sql: `-- PostgreSQL; associe $1 = limite, $2 = deslocamento.\n-- Ordenação estável evita páginas inconsistentes.\nSELECT id, nome\nFROM clientes\nORDER BY id\nLIMIT $1 OFFSET $2;`
      }
    },
    {
      id: 'form', title: 'Criar formulário HTML', category: 'INTERFACE',
      description: 'Formulário acessível com validação nativa e feedback no navegador.',
      example: 'Criar formulário de contato HTML',
      terms: ['formulario', 'form', 'pagina html', 'site', 'interface web', 'cadastro html', 'contato'],
      advice: 'Este exemplo valida no navegador, mas não envia mensagens ou dados para um servidor.',
      templates: {
        html: `<!doctype html>\n<html lang="pt-BR">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Formulário de contato</title>\n  <style>body{font:16px Arial,sans-serif;max-width:480px;margin:40px auto;padding:16px}label{display:block;margin:16px 0}input,textarea{display:block;width:100%;padding:10px;margin-top:5px;box-sizing:border-box}button{padding:10px 18px}</style>\n</head>\n<body>\n  <h1>Contato</h1>\n  <form id="contato">\n    <label>Nome <input name="nome" required minlength="2" maxlength="80"></label>\n    <label>E-mail <input name="email" type="email" required></label>\n    <label>Mensagem <textarea name="mensagem" required maxlength="2000"></textarea></label>\n    <button type="submit">Validar</button>\n  </form>\n  <p id="aviso" role="status"></p>\n  <script>\n    document.getElementById('contato').addEventListener('submit', function(evento) {\n      evento.preventDefault();\n      document.getElementById('aviso').textContent = 'Dados validados neste navegador. Não foram enviados.';\n    });\n  </script>\n</body>\n</html>`
      }
    },
    {
      id: 'backup', title: 'Criar backup de pasta', category: 'ARQUIVOS',
      description: 'Compactar uma pasta em arquivo com data/hora, sem apagar os originais.',
      example: 'Criar backup de uma pasta de arquivos',
      terms: ['backup', 'copia de seguranca', 'compactar pasta', 'zipar pasta', 'arquivar pasta'],
      advice: 'Verifique os caminhos, permissões e espaço em disco antes de executar. Teste também a restauração.',
      templates: {
        bash: `#!/usr/bin/env bash\n# Exemplo: backup não destrutivo de ./dados para ./backups\nset -euo pipefail\nORIGEM='./dados'\nDESTINO='./backups'\nif [[ ! -d "$ORIGEM" ]]; then\n  echo 'Pasta de origem não encontrada.' >&2\n  exit 1\nfi\nmkdir -p -- "$DESTINO"\nARQUIVO="$DESTINO/backup_$(date +%Y%m%d_%H%M%S).tar.gz"\ntar -czf "$ARQUIVO" -C "$ORIGEM" .\necho "Backup criado: $ARQUIVO"`,
        powershell: `# Exemplo: compactar .\\dados para .\\backups\n$origem = Join-Path (Get-Location) 'dados'\n$destino = Join-Path (Get-Location) 'backups'\nif (-not (Test-Path -LiteralPath $origem -PathType Container)) {\n    throw 'Pasta de origem não encontrada.'\n}\nNew-Item -ItemType Directory -Path $destino -Force | Out-Null\n$arquivo = Join-Path $destino ("backup_{0}.zip" -f (Get-Date -Format 'yyyyMMdd_HHmmss'))\nCompress-Archive -LiteralPath $origem -DestinationPath $arquivo -ErrorAction Stop\nWrite-Output "Backup criado: $arquivo"`,
        python: `# Python 3 — backup ZIP de ./dados, sem excluir originais\nfrom pathlib import Path\nfrom datetime import datetime\nfrom shutil import make_archive\n\norigem = Path("dados")\ndestino = Path("backups")\nif not origem.is_dir():\n    raise FileNotFoundError("Pasta dados não encontrada")\ndestino.mkdir(exist_ok=True)\nnome = destino / ("backup_" + datetime.now().strftime("%Y%m%d_%H%M%S"))\narquivo = make_archive(str(nome), "zip", root_dir=str(origem))\nprint("Backup criado:", arquivo)`
      }
    },
    {
      id: 'dates', title: 'Mostrar data e hora atuais', category: 'UTILITÁRIOS',
      description: 'Obter a data/hora do sistema no formato ISO ou legível.',
      example: 'Mostrar data e hora atual',
      terms: ['data e hora', 'hora atual', 'data atual', 'timestamp', 'relogio', 'datetime'],
      advice: 'Diferencie horário local de UTC ao armazenar e comparar datas.',
      templates: {
        javascript: `const agora = new Date();\nconsole.log('Local:', agora.toLocaleString('pt-BR'));\nconsole.log('UTC (ISO):', agora.toISOString());`,
        python: `from datetime import datetime, timezone\n\nprint("Local:", datetime.now().astimezone().isoformat())\nprint("UTC:", datetime.now(timezone.utc).isoformat())`,
        bash: `#!/usr/bin/env bash\ndate '+Local: %Y-%m-%d %H:%M:%S %z'\ndate -u '+UTC: %Y-%m-%dT%H:%M:%SZ'`,
        powershell: `Write-Output (Get-Date -Format 'yyyy-MM-dd HH:mm:ss zzz')\nWrite-Output ([DateTime]::UtcNow.ToString('yyyy-MM-ddTHH:mm:ssZ'))`
      }
    },
    {
      id: 'filter', title: 'Filtrar ou pesquisar registros', category: 'DADOS',
      description: 'Localizar itens que contenham um termo de pesquisa.',
      example: 'Buscar registros pelo nome de uma pessoa',
      terms: ['filtrar', 'pesquisar', 'buscar nome', 'encontrar registro', 'busca textual', 'procurar texto'],
      advice: 'Em SQL, parâmetros protegem contra injeção. Defina regras de acentuação e maiúsculas para sua aplicação.',
      templates: {
        javascript: `const pessoas = [{ nome: 'Ana' }, { nome: 'Bruno' }, { nome: 'Anabela' }];\nfunction buscarPorNome(lista, termo) {\n  const busca = String(termo).trim().toLocaleLowerCase('pt-BR');\n  return lista.filter(p => p.nome.toLocaleLowerCase('pt-BR').includes(busca));\n}\nconsole.log(buscarPorNome(pessoas, 'ana'));`,
        python: `pessoas = [{"nome": "Ana"}, {"nome": "Bruno"}, {"nome": "Anabela"}]\n\ndef buscar_por_nome(lista, termo):\n    busca = str(termo).strip().casefold()\n    return [p for p in lista if busca in p["nome"].casefold()]\n\nprint(buscar_por_nome(pessoas, "ana"))`,
        sql: `-- PostgreSQL — vincule $1 com o termo procurado.\nSELECT id, nome, email\nFROM clientes\nWHERE nome ILIKE '%' || $1 || '%'\nORDER BY nome, id\nLIMIT 100;`
      }
    },
    {
      id: 'slug', title: 'Transformar texto em slug', category: 'TEXTO',
      description: 'Converter uma frase em identificador simples para URLs.',
      example: 'Converter título para URL amigável',
      terms: ['slug', 'url amigavel', 'normalizar texto', 'tirar acento', 'converter titulo'],
      advice: 'Revise transliteração de idiomas não latinos e conflitos entre slugs iguais.',
      templates: {
        javascript: `function slug(texto) {\n  return String(texto).normalize('NFD').replace(/[\\u0300-\\u036f]/g, '')\n    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');\n}\nconsole.log(slug('Programação para Iniciantes!'));`,
        python: `import re\nimport unicodedata\n\ndef slug(texto):\n    normal = unicodedata.normalize("NFKD", str(texto))\n    sem_acentos = "".join(c for c in normal if not unicodedata.combining(c))\n    return re.sub(r"(^-+|-+$)", "", re.sub(r"[^a-z0-9]+", "-", sem_acentos.lower()))\n\nprint(slug("Programação para Iniciantes!"))`
      }
    },
    {
      id: 'regex', title: 'Encontrar padrão com expressão regular', category: 'TEXTO',
      description: 'Pesquisar padrões de texto por expressão regular.',
      example: 'Localizar números em um texto com expressão regular',
      terms: ['regex', 'expressao regular', 'padrao de texto', 'encontrar numero', 'procurar numero'],
      advice: 'Evite executar regex complexas sobre textos não confiáveis sem limites de tempo e tamanho.',
      templates: {
        javascript: `const texto = 'Pedido 123, lote 45';\nconst numeros = texto.match(/\\d+/g) || [];\nconsole.log(numeros); // ['123', '45']`,
        python: `import re\n\ntexto = "Pedido 123, lote 45"\nnumeros = re.findall(r"\\d+", texto)\nprint(numeros)  # ['123', '45']`
      }
    }
  ];

  function normalized(input) {
    return String(input || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }
  function selectRecipe(goal, language, wantedId) {
    if (!LANGUAGES[language]) throw new Error('Linguagem não suportada.');
    if (wantedId && wantedId !== 'auto') {
      const manual = RECIPES.find(r => r.id === wantedId && r.templates[language]);
      if (manual) return manual;
    }
    const q = normalized(goal);
    const scored = RECIPES.filter(r => r.templates[language]).map(r => ({
      recipe: r, score: r.terms.reduce((score, term) => score + (q.includes(normalized(term)) ? (term.length >= 6 ? 2 : 1) : 0), 0)
    })).filter(x => x.score > 0).sort((a, b) => b.score - a.score);
    return scored.length ? scored[0].recipe : null;
  }
  function commentIntro(lang, goal, useCase) {
    // Remove quebras invisíveis e neutraliza fechamentos de comentários HTML.
    const safe = s => String(s || '').replace(/[\u2028\u2029\u0000-\u001f]/g, ' ').replace(/-->/g, '-- >').replace(/<!--/g, '< !--').trim();
    const rows = ['Toolkit do Programador — exemplo educacional', 'Objetivo: ' + safe(goal)];
    if (useCase && String(useCase).trim()) rows.push('Caso de uso: ' + safe(useCase));
    rows.push('Revise, ajuste e teste antes de usar.');
    if (lang === 'html') return '<!--\n' + rows.join('\n') + '\n-->\n\n';
    const prefix = LANGUAGES[lang].comment;
    return rows.map(row => prefix + ' ' + row).join('\n') + '\n\n';
  }
  function fallback(lang) {
    const templates = {
      javascript: `// ESTRUTURA INICIAL — complete o algoritmo da sua tarefa.\nfunction minhaFuncao(entrada) {\n  // TODO: validar a entrada.\n  // TODO: implementar a função solicitada.\n  return entrada; // Substitua pelo resultado esperado.\n}\n\nconsole.log(minhaFuncao('exemplo'));`,
      python: `# ESTRUTURA INICIAL — complete o algoritmo da sua tarefa.\ndef minha_funcao(entrada):\n    # TODO: validar a entrada.\n    # TODO: implementar a função solicitada.\n    return entrada  # Substitua pelo resultado esperado.\n\nprint(minha_funcao("exemplo"))`,
      sql: `-- ESTRUTURA INICIAL — adapte ao seu banco e sua tarefa.\n-- TODO: substitua o nome da tabela e das colunas.\nSELECT id, nome\nFROM minha_tabela\nLIMIT 10;`,
      html: `<!doctype html>\n<html lang="pt-BR">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Meu projeto inicial</title>\n</head>\n<body>\n  <main>\n    <h1>Meu projeto</h1>\n    <p>TODO: construir a interface e a lógica solicitada.</p>\n  </main>\n</body>\n</html>`,
      bash: `#!/usr/bin/env bash\nset -euo pipefail\n# ESTRUTURA INICIAL — complete a tarefa manualmente.\nprintf '%s\\n' 'TODO: implementar a função solicitada.'`,
      powershell: `# ESTRUTURA INICIAL — complete a tarefa manualmente.\nfunction Invoke-MinhaFuncao {\n    param([string]$Entrada)\n    # TODO: validar e processar $Entrada.\n    return $Entrada\n}\nInvoke-MinhaFuncao -Entrada 'exemplo'`
    };
    return templates[lang];
  }
  function generate({ goal, useCase = '', language = 'javascript', recipeId = 'auto' }) {
    if (!LANGUAGES[language]) throw new Error('Selecione uma linguagem válida.');
    if (!String(goal || '').trim()) throw new Error('Informe a função pretendida.');
    if (String(goal).length > 500 || String(useCase).length > 800) throw new Error('Descrição maior que o limite permitido.');
    const catalogue = typeof window !== 'undefined' ? window.ToolkitApps : (typeof require === 'function' ? require('./app-catalog.js') : null);
    if ((language === 'javascript' || language === 'html') && recipeId === 'auto' && catalogue) {
      const project = catalogue.interpret(goal);
      if (project) return catalogue.generate(project.id);
    }
    const recipe = selectRecipe(goal, language, recipeId);
    const code = commentIntro(language, goal, useCase) + (recipe ? recipe.templates[language] : fallback(language));
    const filename = (recipe ? recipe.id : 'estrutura_inicial') + '.' + LANGUAGES[language].ext;
    return {
      code, filename, language, recipeId: recipe ? recipe.id : null,
      matched: Boolean(recipe),
      title: recipe ? recipe.title : 'Estrutura inicial para adaptar',
      summary: recipe ? recipe.description : 'Não foi encontrada uma receita compatível. Foi criada apenas uma estrutura base, sem a lógica pedida.',
      advice: recipe ? recipe.advice : 'Descreva a função com termos como “validar e-mail” ou escolha uma receita específica. Preencha os pontos TODO antes de usar.'
    };
  }

  function textDiff(a, b) {
    const left = String(a).replace(/\r\n/g, '\n').split('\n');
    const right = String(b).replace(/\r\n/g, '\n').split('\n');
    if (left.length > 200 || right.length > 200) throw new Error('Máximo de 200 linhas por versão.');
    const n = left.length, m = right.length;
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--)
      dp[i][j] = left[i] === right[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    let i = 0, j = 0;
    const changes = [];
    while (i < n || j < m) {
      if (i < n && j < m && left[i] === right[j]) { changes.push({ type: 'same', value: '  ' + left[i++] }); j++; }
      else if (j < m && (i === n || dp[i][j + 1] >= dp[i + 1][j])) changes.push({ type: 'added', value: '+ ' + right[j++] });
      else changes.push({ type: 'removed', value: '- ' + left[i++] });
    }
    return changes;
  }

  const engine = { LANGUAGES, RECIPES, generate, selectRecipe, normalized, textDiff };
  if (typeof module !== 'undefined' && module.exports) module.exports = engine;
  if (typeof window !== 'undefined') window.ToolkitEngine = engine;
  if (typeof document === 'undefined') return;

  const $ = id => document.getElementById(id);
  const $$ = selector => Array.from(document.querySelectorAll(selector));
  let currentResult = null;
  let toastTimer;
  const STORE_HISTORY = 'toolkit-programador-history-v1';
  const STORE_THEME = 'toolkit-programador-theme-v1';

  function toast(message) {
    const el = $('toast');
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3300);
  }
  function safelyRead(key, fallback) {
    try { const raw = localStorage.getItem(key); return raw === null ? fallback : JSON.parse(raw); }
    catch (_) { return fallback; }
  }
  function safelyWrite(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (_) { toast('Armazenamento indisponível neste navegador.'); return false; }
  }
  function navigate(page) {
    if (!$('page-' + page)) return;
    $$('.page').forEach(el => el.classList.toggle('active', el.id === 'page-' + page));
    $$('.nav-btn').forEach(el => {
      const selected = el.dataset.page === page;
      el.classList.toggle('active', selected);
      if (selected) el.setAttribute('aria-current', 'page'); else el.removeAttribute('aria-current');
    });
    const selected = document.querySelector('.nav-btn[data-page="' + page + '"]');
    $('crumbLabel').textContent = selected ? selected.textContent.trim() : 'Toolkit';
    $('sidebar').classList.remove('open'); $('menuToggle').setAttribute('aria-expanded', 'false');
    if (page === 'historico') renderHistory();
    if (page === 'biblioteca') renderLibrary();
    if (page === 'apps') renderApps();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
  function populateRecipes() {
    const lang = $('language').value;
    const previous = $('recipe').value;
    const options = [{ value: 'auto', text: 'Detectar pela descrição' }].concat(
      RECIPES.filter(r => r.templates[lang]).map(r => ({ value: r.id, text: r.title }))
    );
    $('recipe').replaceChildren();
    options.forEach(o => { const option = document.createElement('option'); option.value = o.value; option.textContent = o.text; $('recipe').appendChild(option); });
    $('recipe').value = options.some(o => o.value === previous) ? previous : 'auto';
  }
  function updateCounters() { $('goalCount').textContent = $('goal').value.length + '/500'; $('caseCount').textContent = $('useCase').value.length + '/800'; }
  function showResult(result) {
    currentResult = result;
    $('generatedCode').textContent = result.code;
    $('codeEditor').value = result.code;
    $('codeEditor').hidden = true;
    $('generatedCode').parentElement.hidden = false;
    $('editCode').textContent = 'Editar código';
    $('editCode').setAttribute('aria-pressed', 'false');
    $('resetEdits').hidden = true;
    $('filename').textContent = result.filename;
    $('codeLanguage').textContent = LANGUAGES[result.language].name;
    $('resultSummary').textContent = result.title + ' — ' + result.summary;
    $('resultStatus').textContent = result.source === 'local-app' ? 'Aplicação local completa' : result.source === 'ai' ? 'IA generativa • revisar' : (result.matched ? 'Exemplo guiado' : 'Estrutura incompleta');
    $('resultStatus').classList.remove('success', 'warning');
    $('resultStatus').classList.add(result.source === 'ai' ? 'warning' : (result.matched ? 'success' : 'warning'));
    $('resultAdvice').querySelector('p').textContent = result.advice;
    ['editCode', 'copyCode', 'downloadCode', 'saveCode'].forEach(id => $(id).disabled = false);
    $('previewBtn').disabled = !/\.html?$/i.test(result.filename);
    $('validateBtn').disabled = false;
    closePreview();
  }
  function getEffectiveCode() {
    return $('codeEditor').hidden ? (currentResult && currentResult.code) : $('codeEditor').value;
  }
  function closePreview() {
    const box=$('previewWrap'); if(!box)return;
    box.hidden=true; $('previewFrame').removeAttribute('srcdoc');
  }
  function openPreview() {
    if (!currentResult || !/\.html?$/i.test(currentResult.filename)) {toast('A prévia isolada é oferecida somente para HTML.');return;}
    const code=getEffectiveCode();
    if (code.length > 160000) {toast('Arquivo muito grande para a prévia.');return;}
    // O iframe não possui allow-same-origin: não pode acessar os dados do Toolkit.
    $('previewFrame').srcdoc=code;
    $('previewWrap').hidden=false;
    $('previewWrap').scrollIntoView({behavior:'smooth',block:'nearest'});
    toast('Prévia isolada aberta. O armazenamento do aplicativo pode estar indisponível na prévia.');
  }
  function validateCurrent() {
    if(!currentResult)return;
    const code=getEffectiveCode(); const lang=currentResult.language;
    let message='Análise básica: ', warning=false;
    try {
      if (lang==='html') {
        if (!/<html\b/i.test(code) || !/<body\b/i.test(code)) throw Error('faltam elementos HTML principais.');
        const doc=new DOMParser().parseFromString(code,'text/html');
        if (!doc.body) throw Error('não foi identificado um corpo HTML.');
        const scripts=Array.from(doc.querySelectorAll('script:not([src]):not([type="application/json"])'));
        scripts.forEach(script=>{if(script.textContent.trim())new Function(script.textContent);});
        message+='HTML e sintaxe dos scripts incorporados verificados sem erros de análise.';
      } else if(lang==='javascript') {
        new Function(code); message+='sintaxe JavaScript analisada sem erros.';
      } else {message+='verificação sintática automática indisponível para '+LANGUAGES[lang].name+'. Execute no interpretador correspondente.'; warning=true;}
    } catch(e) {message+='possível problema: '+String(e.message||e).slice(0,140);warning=true;}
    $('validationFeedback').textContent=message+' Não equivale a teste funcional nem auditoria.';
    $('validationFeedback').className='feedback '+(warning?'error':'ok');
  }
  function makeScript() {
    try {
      const result = generate({ goal: $('goal').value, useCase: $('useCase').value, language: $('language').value, recipeId: $('recipe').value });
      showResult(result);
      if (result.source === 'local-app') { $('language').value='html'; populateRecipes(); }
      toast(result.source === 'local-app' ? 'Aplicação offline criada. Abra a prévia ou baixe o HTML.' : result.matched ? 'Exemplo guiado criado. Revise o código.' : 'Estrutura inicial criada. A lógica ainda precisa ser implementada.');
    } catch (error) { toast(error.message); $('goal').focus(); }
  }
  async function copyText(text) {
    if (!text) { toast('Não há texto para copiar.'); return; }
    try {
      if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); toast('Copiado para a área de transferência.'); return; }
      const temp = document.createElement('textarea'); temp.value = text; temp.style.position = 'fixed'; temp.style.opacity = '0'; document.body.appendChild(temp);
      temp.focus(); temp.select();
      const ok = document.execCommand('copy'); temp.remove();
      if (!ok) throw new Error('Cópia bloqueada.');
      toast('Texto copiado.');
    } catch (_) { toast('Não foi possível copiar. Selecione o texto e copie manualmente.'); }
  }
  function downloadText(filename, contents) {
    const blob = new Blob([contents], { type: 'text/plain;charset=utf-8' });
    const address = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = address; link.download = filename; document.body.appendChild(link);
    link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(address), 2000);
    toast('Arquivo preparado para download.');
  }
  function getHistory() {
    const stored = safelyRead(STORE_HISTORY, []);
    return Array.isArray(stored) ? stored.filter(x => x && typeof x.code === 'string' && x.code.length <= 150000 && typeof x.filename === 'string' && x.filename.length < 120 && LANGUAGES[x.language]).slice(0, 25) : [];
  }
  function saveCurrent() {
    if (!currentResult) return;
    const items = getHistory();
    items.unshift({ id: String(Date.now()) + '-' + Math.random().toString(36).slice(2, 7), at: new Date().toISOString(), goal: $('goal').value.trim(), useCase: $('useCase').value, ...currentResult, code: getEffectiveCode() });
    if (safelyWrite(STORE_HISTORY, items.slice(0, 25))) toast('Script salvo neste navegador.');
  }
  function renderHistory() {
    const items = getHistory();
    $('historyCount').textContent = items.length + (items.length === 1 ? ' item salvo' : ' itens salvos');
    $('clearHistory').disabled = items.length === 0;
    $('historyList').replaceChildren();
    if (!items.length) {
      const empty = document.createElement('div'); empty.className = 'empty-state';
      const head = document.createElement('strong'); head.textContent = 'Nenhum script salvo por enquanto.';
      const msg = document.createElement('span'); msg.textContent = 'Gere um exemplo e clique em “Salvar neste aparelho”.';
      empty.append(head, msg); $('historyList').append(empty); return;
    }
    items.forEach(item => {
      const el = document.createElement('article'); el.className = 'history-item';
      const body = document.createElement('div'); const title = document.createElement('strong');
      title.textContent = (item.goal || item.title || item.filename).slice(0, 90);
      const detail = document.createElement('small');
      const time = new Date(item.at);
      detail.textContent = item.filename + ' • ' + (isNaN(time.getTime()) ? 'Data indisponível' : time.toLocaleString('pt-BR'));
      body.append(title, detail);
      const actions = document.createElement('div'); actions.className = 'history-buttons';
      const open = document.createElement('button'); open.type = 'button'; open.className = 'btn small'; open.textContent = 'Abrir';
      open.addEventListener('click', () => {
        $('goal').value = item.goal || item.title || 'Exemplo salvo';
        $('useCase').value = item.useCase || '';
        $('language').value = LANGUAGES[item.language] ? item.language : 'javascript';
        populateRecipes(); $('recipe').value = item.recipeId && $('recipe').querySelector('option[value="' + item.recipeId + '"]') ? item.recipeId : 'auto';
        updateCounters(); showResult(item); navigate('criador'); toast('Script salvo carregado.');
      });
      const del = document.createElement('button'); del.type = 'button'; del.className = 'btn danger small'; del.textContent = 'Excluir';
      del.addEventListener('click', () => { if (safelyWrite(STORE_HISTORY, getHistory().filter(x => x.id !== item.id))) renderHistory(); });
      actions.append(open, del); el.append(body, actions); $('historyList').append(el);
    });
  }
  function renderApps() {
    const catalog=window.ToolkitApps;
    $('appsGrid').replaceChildren();
    if(!catalog)return;
    catalog.APPS.forEach(app=>{
      const article=document.createElement('article');article.className='recipe-card';
      const tag=document.createElement('span');tag.className='recipe-tag';tag.textContent='APLICAÇÃO HTML';
      const title=document.createElement('h3');title.textContent=app.name;
      const desc=document.createElement('p');desc.textContent=app.description;
      const button=document.createElement('button');button.type='button';button.textContent='Criar aplicativo ↗';
      button.addEventListener('click',()=>{
        $('goal').value='Criar '+app.name.toLowerCase(); $('useCase').value=''; $('language').value='html';
        populateRecipes(); $('recipe').value='auto'; updateCounters(); navigate('criador'); makeScript();
      });
      article.append(tag,title,desc,button);$('appsGrid').append(article);
    });
  }
  function renderLibrary() {
    const query = normalized($('librarySearch').value.trim());
    const entries = RECIPES.filter(r => normalized(r.title + ' ' + r.description + ' ' + r.category + ' ' + r.terms.join(' ')).includes(query));
    $('libraryCount').textContent = entries.length + (entries.length === 1 ? ' receita' : ' receitas');
    $('libraryGrid').replaceChildren();
    if (!entries.length) { const empty = document.createElement('div'); empty.className = 'empty-state'; empty.textContent = 'Nenhum exemplo encontrado. Experimente outras palavras.'; $('libraryGrid').append(empty); }
    entries.forEach(recipe => {
      const article = document.createElement('article'); article.className = 'recipe-card';
      const tag = document.createElement('span'); tag.className = 'recipe-tag'; tag.textContent = recipe.category;
      const h = document.createElement('h3'); h.textContent = recipe.title;
      const p = document.createElement('p'); p.textContent = recipe.description;
      const button = document.createElement('button'); button.type = 'button'; button.textContent = 'Usar esta receita ↗';
      button.addEventListener('click', () => {
        $('goal').value = recipe.example; $('useCase').value = '';
        if (!recipe.templates[$('language').value]) $('language').value = Object.keys(recipe.templates)[0];
        populateRecipes(); $('recipe').value = recipe.id; updateCounters();
        navigate('criador'); $('goal').focus();
      });
      article.append(tag, h, p, button); $('libraryGrid').append(article);
    });
  }
  function setFeedback(id, message, error = false) { const el = $(id); el.textContent = message; el.className = 'feedback ' + (error ? 'error' : 'ok'); }
  function utf8Encode(text) {
    if (typeof TextEncoder !== 'undefined') { const bytes = new TextEncoder().encode(text); let binary = ''; for (const byte of bytes) binary += String.fromCharCode(byte); return btoa(binary); }
    return btoa(unescape(encodeURIComponent(text)));
  }
  function utf8Decode(text) {
    const binary = atob(text.replace(/\s/g, '')); const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    if (typeof TextDecoder !== 'undefined') return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    let escaped = ''; for (const byte of bytes) escaped += '%' + byte.toString(16).padStart(2, '0'); return decodeURIComponent(escaped);
  }
  function transformText(mode, value) {
    switch (mode) {
      case 'upper': return value.toLocaleUpperCase('pt-BR');
      case 'lower': return value.toLocaleLowerCase('pt-BR');
      case 'trim': return value.split('\n').map(line => line.trim().replace(/[ \t]+/g, ' ')).join('\n').trim();
      case 'slug': return normalized(value).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      default: throw new Error('Transformação desconhecida.');
    }
  }
  function showDiff() {
    try {
      const changes = textDiff($('diffA').value, $('diffB').value);
      $('diffResult').replaceChildren();
      let additions = 0, removals = 0;
      changes.forEach(change => {
        const line = document.createElement('span'); line.className = 'diff-' + change.type;
        line.textContent = change.value + '\n'; $('diffResult').append(line);
        if (change.type === 'added') additions++; if (change.type === 'removed') removals++;
      });
      setFeedback('diffFeedback', additions + ' linha(s) adicionada(s); ' + removals + ' linha(s) removida(s).');
    } catch (error) { setFeedback('diffFeedback', error.message, true); }
  }
  const termsHtml = `<h3>IA Estendida e licenças</h3><p>O modo guiado opera por regras, não por modelo generativo. O Chrome e o Ollama são ferramentas opcionais sujeitas a requisitos, instalação, licenças e limitações do usuário. A análise não executa nem homologa o código.</p><h3>Finalidade</h3><p>Ferramenta educacional para criação e adaptação de exemplos de scripts, além de operações locais de texto. O software é fornecido “no estado em que se encontra”.</p><h3>Responsabilidade do usuário</h3><p>Revise cada script e teste em ambiente apropriado antes de utilizá-lo. É responsabilidade do usuário obter autorização para acessar serviços, arquivos, sistemas e bancos de dados. Não execute códigos que não compreenda.</p><h3>Limitações</h3><p>No modo guiado, o gerador trabalha com receitas e estruturas iniciais e não é um modelo generativo. Modos com IA generativa são opcionais e podem produzir respostas incorretas ou inseguras; não garantimos adequação a produção.</p><h3>Autoria</h3><p>© Nailson Rodrigues de Lima. O uso de código gerado deve respeitar direitos de terceiros e licenças dos ambientes em que for empregado.</p>`;
  const privacyHtml = `<h3>Processamento e IA</h3><p>O modo guiado processa localmente sem fazer solicitações de rede. Ao selecionar Chrome, o navegador pode executar modelo local e baixar arquivos de modelo conforme suas condições. Ao selecionar Ollama, o conteúdo do pedido é enviado ao serviço Ollama local configurado, exclusivamente após sua ação. A edição não possui backend próprio, telemetria ou anúncios.</p><h3>Dados armazenados</h3><p>Se você clicar em “Salvar neste aparelho”, exemplos e descrições serão armazenados no localStorage do navegador, até você apagá-los ou limpar os dados do site. A preferência de tema também pode ser salva.</p><h3>Compartilhamento</h3><p>O aplicativo não envia automaticamente textos a terceiros. Se você selecionar o Ollama, o prompt será transmitido ao endereço local informado ao clicar em gerar. A utilização de recursos do Chrome segue o ambiente do navegador. Ao copiar ou baixar textos, você controla seu uso posterior. Extensões de navegador e o ambiente de hospedagem podem ter suas próprias práticas de dados, fora do controle deste aplicativo.</p><h3>Controle</h3><p>Apague os scripts em “Meus scripts” e use as opções de limpeza de dados do navegador se desejar. Evite inserir senhas, credenciais e dados sensíveis no aplicativo.</p>`;
  function showInfo(title, body) {
    $('dialogTitle').textContent = title;
    $('dialogBody').innerHTML = body; // conteúdo estático interno, jamais conteúdo do usuário
    if ($('infoDialog').showModal) $('infoDialog').showModal(); else $('infoDialog').setAttribute('open', '');
  }
  function closeInfo() { if ($('infoDialog').close) $('infoDialog').close(); else $('infoDialog').removeAttribute('open'); }

  // Interface pública controlada para receber código da IA sem executá-lo.
  window.ToolkitUI = {
    navigate,
    loadAIResult(item) {
      const lang = LANGUAGES[item.language] ? item.language : 'javascript';
      $('goal').value = String(item.goal || '').slice(0, 500);
      $('useCase').value = String(item.useCase || '').slice(0, 800);
      $('language').value = lang; populateRecipes();
      $('recipe').value = 'auto'; updateCounters();
      const code = String(item.code || '').slice(0, 100000);
      showResult({code, language: lang, filename: String(item.filename || 'assistencia.' + LANGUAGES[lang].ext),
        matched: Boolean(item.matched), source: item.source === 'local-app' ? 'local-app' : item.source === 'guiado' ? 'guiado' : 'ai',
        title:'Resultado enviado da IA Estendida', summary:'Código NÃO executado nem validado. Confira comportamento, segurança e dependências.',
        advice:'Revise o código no editor e faça testes em ambiente isolado. Não insira credenciais.'});
      navigate('criador');
      toast('Código transferido ao editor. Use Validar e Prévia para testar HTML local.');
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    $('currentYear').textContent = String(new Date().getFullYear());
    $('statRecipes').textContent = String(RECIPES.length);
    $('statApps').textContent=String(window.ToolkitApps ? window.ToolkitApps.APPS.length : 0);
    if (safelyRead(STORE_THEME, 'dark') === 'light') document.documentElement.classList.add('light');
    $$('.nav-btn').forEach(b => b.addEventListener('click', () => navigate(b.dataset.page)));
    $$('[data-go]').forEach(b => b.addEventListener('click', () => navigate(b.dataset.go)));
    $('menuToggle').addEventListener('click', () => {
      const opened = $('sidebar').classList.toggle('open'); $('menuToggle').setAttribute('aria-expanded', String(opened));
    });
    document.addEventListener('keydown', ev => { if (ev.key === 'Escape') { $('sidebar').classList.remove('open'); $('menuToggle').setAttribute('aria-expanded', 'false'); } });
    $('themeToggle').addEventListener('click', () => { const light = document.documentElement.classList.toggle('light'); safelyWrite(STORE_THEME, light ? 'light' : 'dark'); });
    $('goal').addEventListener('input', updateCounters); $('useCase').addEventListener('input', updateCounters);
    $('language').addEventListener('change', populateRecipes); populateRecipes();
    $('generateBtn').addEventListener('click', makeScript);
    $('clearBuilder').addEventListener('click', () => {
      $('goal').value = ''; $('useCase').value = ''; $('recipe').value = 'auto'; updateCounters();
      currentResult = null; $('generatedCode').textContent = '// Seu código aparecerá aqui.';
      $('codeEditor').value = ''; $('codeEditor').hidden = true; $('generatedCode').parentElement.hidden = false; $('editCode').textContent = 'Editar código'; $('editCode').setAttribute('aria-pressed', 'false'); $('resetEdits').hidden = true;
      $('filename').textContent = 'exemplo.js'; $('codeLanguage').textContent = 'JavaScript';
      $('resultSummary').textContent = 'Quando você gerar, verá um exemplo comentado, orientações de adaptação e sugestões de teste.';
      $('resultStatus').textContent = 'Aguardando descrição'; $('resultStatus').className = 'result-state';
      $('resultAdvice').querySelector('p').textContent = 'Explique a entrada, o resultado esperado e eventuais restrições. Depois revise e teste o código no seu ambiente.';
      $('previewBtn').disabled=true;$('validateBtn').disabled=true;$('validationFeedback').textContent='';closePreview();
      ['editCode','copyCode','downloadCode','saveCode'].forEach(id => $(id).disabled = true); $('goal').focus();
    });
    $$('[data-prompt]').forEach(b => b.addEventListener('click', () => { $('goal').value = b.dataset.prompt; $('recipe').value = 'auto'; updateCounters(); makeScript(); }));
    $('editCode').addEventListener('click', () => {
      if (!currentResult) return;
      const isEditing = $('codeEditor').hidden;
      if (isEditing) {
        $('codeEditor').value = $('generatedCode').textContent;
        $('codeEditor').hidden = false; $('generatedCode').parentElement.hidden = true; $('codeEditor').focus();
      } else {
        currentResult.code = $('codeEditor').value;
        $('generatedCode').textContent = currentResult.code;
        $('codeEditor').hidden = true; $('generatedCode').parentElement.hidden = false;
      }
      $('editCode').textContent = isEditing ? 'Concluir edição' : 'Editar código';
      $('editCode').setAttribute('aria-pressed', String(isEditing));
      $('resetEdits').hidden = !isEditing;
    });
    $('resetEdits').addEventListener('click', () => {
      if (!currentResult || !window.confirm('Descartar as alterações e gerar novamente a partir dos campos atuais?')) return;
      makeScript();
    });
    $('copyCode').addEventListener('click', () => currentResult && copyText(getEffectiveCode()));
    $('downloadCode').addEventListener('click', () => currentResult && downloadText(currentResult.filename, getEffectiveCode()));
    $('saveCode').addEventListener('click', saveCurrent);
    $('previewBtn').addEventListener('click',openPreview);
    $('previewClose').addEventListener('click',closePreview);
    $('validateBtn').addEventListener('click',validateCurrent);
    $$('.tool-tab').forEach(button => button.addEventListener('click', () => {
      const target = button.dataset.tool;
      $$('.tool-tab').forEach(el => { el.classList.toggle('active', el === button); el.setAttribute('aria-selected', String(el === button)); });
      $$('.tool-content').forEach(el => { el.classList.toggle('active', el.id === 'tool-' + target); el.hidden = el.id !== 'tool-' + target; });
    }));
    [['formatJson', 'formatado'], ['minifyJson', 'compactado'], ['validateJson', 'válido']].forEach(([id, operation]) => $(id).addEventListener('click', () => {
      try { const parsed = JSON.parse($('jsonInput').value); $('jsonOutput').value = operation === 'compactado' ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2); setFeedback('jsonFeedback', 'JSON ' + operation + ' com sucesso.'); }
      catch (error) { $('jsonOutput').value = ''; setFeedback('jsonFeedback', 'Erro de JSON: ' + error.message, true); }
    }));
    $('copyJson').addEventListener('click', () => copyText($('jsonOutput').value));
    $('b64Encode').addEventListener('click', () => { try { $('base64Output').value = utf8Encode($('base64Input').value); setFeedback('base64Feedback', 'Texto codificado.'); } catch (e) { setFeedback('base64Feedback', e.message, true); } });
    $('b64Decode').addEventListener('click', () => { try { $('base64Output').value = utf8Decode($('base64Input').value); setFeedback('base64Feedback', 'Base64 decodificado.'); } catch (_) { $('base64Output').value = ''; setFeedback('base64Feedback', 'Base64 inválido ou conteúdo não é texto UTF-8 válido.', true); } });
    $('urlEncode').addEventListener('click', () => { try { $('urlOutput').value = encodeURIComponent($('urlInput').value); setFeedback('urlFeedback', 'Texto codificado.'); } catch (_) { setFeedback('urlFeedback', 'Entrada inválida.', true); } });
    $('urlDecode').addEventListener('click', () => { try { $('urlOutput').value = decodeURIComponent($('urlInput').value); setFeedback('urlFeedback', 'Texto decodificado.'); } catch (_) { $('urlOutput').value = ''; setFeedback('urlFeedback', 'URL codificada inválida.', true); } });
    $$('[data-text-transform]').forEach(b => b.addEventListener('click', () => { $('textOutput').value = transformText(b.dataset.textTransform, $('textInput').value); setFeedback('textFeedback', 'Transformação realizada.'); }));
    $$('[data-copy-target]').forEach(b => b.addEventListener('click', () => copyText($(b.dataset.copyTarget).value)));
    $('compareDiff').addEventListener('click', showDiff);
    $('librarySearch').addEventListener('input', renderLibrary); renderLibrary(); renderApps();
    $('clearHistory').addEventListener('click', () => { if (window.confirm('Apagar todos os scripts salvos neste navegador?')) { if (safelyWrite(STORE_HISTORY, [])) { renderHistory(); toast('Histórico apagado.'); } } });
    $('termsOpen').addEventListener('click', () => showInfo('Termos de Uso', termsHtml));
    $('privacyOpen').addEventListener('click', () => showInfo('Política de Privacidade', privacyHtml));
    $('closeDialog').addEventListener('click', closeInfo); $('dialogDone').addEventListener('click', closeInfo);
    if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  });
})();
