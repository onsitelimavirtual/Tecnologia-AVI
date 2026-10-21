/* Toolkit do Programador — catálogo de aplicações completas, gratuito e offline.
   Construção determinística por componentes; NÃO é modelo de IA generativa.
   © 2026 Nailson Rodrigues de Lima */
(function (root) {
  'use strict';
  const APPS = [
    {id:'diario', name:'Diário eletrônico', slug:'diario_eletronico', description:'Registros pessoais com data, humor, edição, pesquisa e backup JSON.',
      triggers:['diario eletronico','diario pessoal','diario digital','meu diario','escrever diario','registro diario','diario de bordo','journal'],
      fields:[['date','Data','date',true],['title','Título','text',true],['mood','Humor','select',false,['Ótimo','Bem','Neutro','Cansado','Difícil']],['body','Registro','textarea',true]]},
    {id:'agenda', name:'Agenda de compromissos', slug:'agenda_compromissos', description:'Compromissos com data, horário, local, busca e backup JSON.',
      triggers:['agenda','compromisso','compromissos','calendario pessoal','agenda eletronica','agendamento pessoal'],
      fields:[['title','Compromisso','text',true],['date','Data','date',true],['time','Horário','time',true],['place','Local','text',false],['body','Detalhes','textarea',false]]},
    {id:'tarefas', name:'Lista de tarefas', slug:'lista_tarefas', description:'Tarefas com situação, prioridade, prazo, busca e backup JSON.',
      triggers:['lista de tarefas','gerenciador de tarefas','controle de tarefas','to-do','todo list','checklist','afazeres'],
      fields:[['title','Tarefa','text',true],['date','Prazo','date',false],['priority','Prioridade','select',false,['Baixa','Média','Alta']],['done','Concluída','checkbox',false],['body','Observações','textarea',false]]},
    {id:'notas', name:'Bloco de notas', slug:'bloco_notas', description:'Notas pesquisáveis, organizadas localmente e com exportação JSON.',
      triggers:['bloco de notas','aplicativo de notas','anotacoes','anotacao','criar notas','minhas notas'],
      fields:[['title','Título','text',true],['body','Anotação','textarea',true]]},
    {id:'contatos', name:'Agenda de contatos', slug:'agenda_contatos', description:'Contatos com telefone, e-mail, edição, pesquisa e backup JSON.',
      triggers:['agenda de contatos','lista de contatos','gerenciador de contatos','cadastro de contatos','contatos pessoais','agenda telefonica'],
      fields:[['title','Nome','text',true],['phone','Telefone','tel',false],['email','E-mail','email',false],['body','Observações','textarea',false]]},
    {id:'despesas', name:'Controle de despesas', slug:'controle_despesas', description:'Registro de gastos, valor, categoria, data e backup JSON.',
      triggers:['despesas','meus gastos','controle financeiro','financas pessoais','orcamento pessoal','registro de gastos','controle de gastos'],
      fields:[['title','Descrição','text',true],['amount','Valor (R$)','number',true],['date','Data','date',true],['category','Categoria','select',true,['Alimentação','Transporte','Moradia','Saúde','Educação','Lazer','Outros']]]},
    {id:'estoque', name:'Controle de estoque', slug:'controle_estoque', description:'Inventário simples de produtos, quantidades, preços e backup JSON.',
      triggers:['controle de estoque','gestao de estoque','inventario','inventario de produtos','controle de produtos','estoque'],
      fields:[['title','Produto','text',true],['quantity','Quantidade','number',true],['amount','Preço unitário (R$)','number',false],['category','Categoria','text',false]]},
    {id:'calculadora', name:'Calculadora', slug:'calculadora', description:'Calculadora de quatro operações com validação e teclado.',
      triggers:['calculadora','calcular soma','calculadora simples','operacoes matematicas','calculadora basica']}
  ];
  const escapeHtml = (value) => String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const normalize = (value) => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  function interpret(text) {
    const q = ' ' + normalize(text) + ' ';
    const tokens = new Set(q.trim().split(/\s+/).filter(Boolean));
    const ranked = APPS.map(app => {
      let score = 0;
      for (const trigger of app.triggers) {
        const term = normalize(trigger);
        if (q.includes(' ' + term + ' ')) score = Math.max(score, 10 + term.split(' ').length * 4);
        else {
          const parts = term.split(' ');
          if (parts.length > 1 && parts.every(x => tokens.has(x))) score = Math.max(score, 9 + parts.length);
        }
      }
      // Termos únicos sem ambiguidade usados apenas no domínio adequado.
      if (app.id === 'diario' && tokens.has('diario')) score = Math.max(score,14);
      if (app.id === 'calculadora' && tokens.has('calculadora')) score = Math.max(score,18);
      return {app,score};
    }).sort((a,b)=>b.score-a.score);
    return ranked[0].score >= 10 ? {id:ranked[0].app.id, name:ranked[0].app.name, confidence:'alta', score:ranked[0].score} : null;
  }
  function baseCss() { return `:root{font-family:system-ui,-apple-system,Segoe UI,Arial,sans-serif;color-scheme:light;--bg:#f3f6fb;--ink:#14213b;--sub:#5f6b80;--brand:#24476b;--line:#dbe3ee}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink)}header{background:#0b1731;color:#fff;padding:24px max(18px,calc((100vw - 1050px)/2))}header h1{font-size:clamp(1.55rem,4vw,2.1rem);margin:0 0 6px}header p{margin:0;color:#b8c5db}main{max-width:1085px;padding:22px 17px 56px;margin:auto}.layout{display:grid;grid-template-columns:minmax(250px,360px) minmax(0,1fr);gap:18px}.card{background:white;border:1px solid var(--line);border-radius:15px;padding:20px;box-shadow:0 6px 24px #1828450d}h2{font-size:1.1rem;margin:0 0 14px}label{font-weight:600;display:block;font-size:.9rem;margin-bottom:6px}input,select,textarea{font:inherit;border:1px solid #adbbd0;background:white;border-radius:9px;padding:10px;width:100%;color:var(--ink)}textarea{min-height:115px;resize:vertical}input[type=checkbox]{width:auto;transform:scale(1.25)}.field{margin-bottom:15px}button{font:inherit;cursor:pointer;background:#fff;color:var(--brand);border:1px solid #bac9db;border-radius:9px;padding:10px 13px;font-weight:600}button:hover,button:focus-visible{outline:2px solid #70a8ff;outline-offset:1px}button.primary{background:var(--brand);color:white;border-color:var(--brand)}button.danger{color:#a52535;border-color:#e2adb6}.actions{display:flex;flex-wrap:wrap;gap:8px}.hint,small{color:var(--sub);font-size:.83rem}.results{display:grid;gap:11px;margin-top:16px}.item{border:1px solid var(--line);padding:15px;border-radius:11px;background:#fff;overflow-wrap:anywhere}.item h3{margin:0 0 5px;font-size:1.06rem}.item p{white-space:pre-wrap;margin:10px 0;overflow-wrap:anywhere}.item small{display:block;margin-bottom:9px}.item .actions button{padding:7px 10px;font-size:.83rem}#status{min-height:27px;margin:12px 0;font-weight:600}#status.bad{color:#a52535}#status.good{color:#146c44}.toolbar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.toolbar input{flex:1 1 180px}#total{display:block;font-size:.88rem;color:var(--sub);margin-top:8px}.empty{padding:25px;color:var(--sub);border:1px dashed #aebace;text-align:center;border-radius:10px}footer{text-align:center;font-size:.8rem;color:var(--sub);padding:12px}#previewNote{background:#fff4d7;color:#634500;padding:10px;border-radius:8px;margin-bottom:12px}[hidden]{display:none!important}@media(max-width:750px){.layout{grid-template-columns:1fr}.card{padding:15px}.toolbar button{flex:1 1 auto}header{padding:20px 17px}}`; }
  function commonStart(name, markup, js, configMarkup) {
    return '<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">\n<title>' + escapeHtml(name) + '</title>\n<style>\n' + baseCss() + '\n</style>\n</head>\n<body>\n<header><h1>' + escapeHtml(name) + '</h1><p>Aplicativo independente • Gratuito • Dados armazenados neste navegador</p></header>\n<main>\n'+ markup +'\n</main>\n<footer>Gerado pelo Toolkit do Programador • © 2026 Nailson Rodrigues de Lima</footer>\n'+ (configMarkup || '') + '\n<script>\n'+js+'\n<\/script>\n</body></html>\n';
  }
  function fieldHTML(field) {
    const [id,label,type,required,options] = field;
    const attr = required ? ' required' : '';
    const inputAttr = type==='number' ? ' step="0.01" min="0"' : type==='text'?' maxlength="120"' : '';
    const body = type==='textarea' ? '<textarea id="f-'+id+'" maxlength="6000"'+attr+'></textarea>' : type==='select' ? '<select id="f-'+id+'"'+attr+'><option value="">Selecione</option>'+options.map(o=>'<option value="'+escapeHtml(o)+'">'+escapeHtml(o)+'</option>').join('')+'</select>' : type==='checkbox' ? '<input type="checkbox" id="f-'+id+'">' : '<input type="'+type+'" id="f-'+id+'"'+inputAttr+attr+'>';
    return '<div class="field"><label for="f-'+id+'">'+escapeHtml(label)+(required?' *':'')+'</label>'+body+'</div>';
  }
  function crudJS() { return String.raw`(function(){
'use strict';
const conf=JSON.parse(document.getElementById('tk-config').textContent);
const form=document.getElementById('entryForm'), list=document.getElementById('entries'), status=document.getElementById('status');
const fields=conf.fields, storeKey='toolkit-app-'+conf.id+'-v1';
let records=[],editing=null,persistent=true;
const byId=id=>document.getElementById(id);
function notice(message, error){status.textContent=message;status.className=error?'bad':'good';}
function safeText(s){return String(s == null ? '' : s);}
function stamp(){return new Date().toISOString();}
function uniqueId(){if(typeof crypto!=='undefined' && crypto.randomUUID)return crypto.randomUUID();return String(Date.now())+'-'+Math.random().toString(36).slice(2);}
function load(){try{const raw=localStorage.getItem(storeKey);if(raw){const v=JSON.parse(raw);if(Array.isArray(v))records=v.filter(valid).slice(0,500);}}
catch(e){persistent=false;notice('Armazenamento bloqueado. Os dados só durarão até fechar esta página; exporte o backup JSON.',true);} }
function save(){if(!persistent)return false;try{localStorage.setItem(storeKey,JSON.stringify(records));return true;}catch(e){persistent=false;notice('Não foi possível salvar neste navegador (permissão ou espaço). Exporte o backup JSON.',true);return false;}}
function valid(row){if(!row || typeof row!=='object'||Array.isArray(row)||typeof row.id!=='string'||row.id.length>120)return false;
return fields.every(f=>{const v=row[f[0]];return f[2]==='checkbox'?typeof v==='boolean':typeof v==='string'&&v.length<7000&&(!f[3]||v.trim()!=='')&&(f[2]!=='number'||v===''||Number.isFinite(Number(v))&&Number(v)>=0);});}
function gather(){const item={id:editing||uniqueId(),modified:stamp()};for(const f of fields){let v=f[2]==='checkbox'?byId('f-'+f[0]).checked:byId('f-'+f[0]).value.trim();if(typeof v==='string' && v.length>6000){throw new Error('Campo muito extenso.');}if(f[3]&&!v)throw new Error('Preencha o campo '+f[1]+'.');if(f[2]==='number'&&v!==''&&(!Number.isFinite(Number(v))||Number(v)<0))throw new Error('Número inválido em '+f[1]+'.');item[f[0]]=v;}return item;}
function clear(){form.reset();editing=null;byId('submitBtn').textContent='Adicionar registro';byId('cancelBtn').hidden=true;}
function render(){const q=byId('search').value.toLocaleLowerCase('pt-BR');const filtered=records.filter(item=>fields.some(f=>safeText(item[f[0]]).toLocaleLowerCase('pt-BR').includes(q))).sort((a,b)=>safeText(b.modified).localeCompare(safeText(a.modified)));
list.replaceChildren();byId('total').textContent=filtered.length+' de '+records.length+' registro(s)';
if(!filtered.length){const p=document.createElement('div');p.className='empty';p.textContent='Nenhum registro encontrado.';list.append(p);return;}
for(const item of filtered){const el=document.createElement('article');el.className='item';
const title=document.createElement('h3');title.textContent=safeText(item.title||item.name||item.date||'Registro');el.append(title);
for(const f of fields){if(f[0]==='title')continue;const val=f[2]==='checkbox'?(item[f[0]]?'Sim':'Não'):safeText(item[f[0]]);if(!val)continue;const line=document.createElement(f[2]==='textarea'?'p':'small');line.textContent=f[1]+': '+val;el.append(line);}
const actions=document.createElement('div');actions.className='actions';const edit=document.createElement('button');edit.type='button';edit.textContent='Editar';edit.addEventListener('click',()=>{editing=item.id;for(const f of fields){const input=byId('f-'+f[0]);if(f[2]==='checkbox')input.checked=Boolean(item[f[0]]);else input.value=safeText(item[f[0]]);}byId('submitBtn').textContent='Salvar alterações';byId('cancelBtn').hidden=false;form.scrollIntoView({behavior:'smooth',block:'start'});byId('f-'+fields[0][0]).focus();});
const del=document.createElement('button');del.type='button';del.className='danger';del.textContent='Excluir';del.addEventListener('click',()=>{if(!confirm('Excluir este registro?'))return;records=records.filter(x=>x.id!==item.id);if(editing===item.id)clear();const ok=save();render();if(ok)notice('Registro excluído.');});actions.append(edit,del);el.append(actions);list.append(el);}}
form.addEventListener('submit',e=>{e.preventDefault();try{const item=gather();if(!editing&&records.length>=500){notice('Limite de 500 registros: exporte seus dados antes de continuar.',true);return;}const index=records.findIndex(x=>x.id===editing);if(index>=0)records[index]=item;else records.unshift(item);const ok=save();clear();render();if(ok)notice('Registro salvo neste navegador.');}catch(err){notice(err.message,true);}});
byId('cancelBtn').addEventListener('click',clear);byId('search').addEventListener('input',render);
byId('exportBtn').addEventListener('click',()=>{const payload=JSON.stringify({app:conf.id,version:1,exportedAt:stamp(),records},null,2);const blob=new Blob([payload],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=conf.id+'_backup.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);notice('Backup JSON preparado. Guarde o arquivo em local seguro.');});
byId('importFile').addEventListener('change',async e=>{const f=e.target.files&&e.target.files[0];if(!f)return;try{if(f.size>2*1024*1024)throw new Error('Arquivo maior que 2 MB.');const parsed=JSON.parse(await f.text());if(!parsed||parsed.app!==conf.id||parsed.version!==1||!Array.isArray(parsed.records)||parsed.records.length>500||!parsed.records.every(valid))throw new Error('Arquivo inválido ou de outro aplicativo.');if(!confirm('A importação substituirá os registros atuais. Continuar?'))return;records=parsed.records.map(x=>Object.assign({},x));clear();const ok=save();render();notice(ok?'Backup importado e salvo.':'Backup lido, mas o navegador não permitiu salvar. Exporte seus dados.',!ok);}catch(err){notice('Não foi possível importar: '+err.message,true);}finally{e.target.value='';}});
try{localStorage.setItem('__tk_probe','1');localStorage.removeItem('__tk_probe');}catch(e){persistent=false;byId('previewNote').hidden=false;notice('Sem acesso ao armazenamento: use exportação para manter seus dados.',true);}
load();render();
})();`; }
  function makeCrud(app) {
    const config={id:app.id,fields:app.fields};
    const form = '<section class="card"><h2>Novo registro</h2><form id="entryForm">'+app.fields.map(fieldHTML).join('')+'<div class="actions"><button class="primary" id="submitBtn" type="submit">Adicionar registro</button><button id="cancelBtn" type="button" hidden>Cancelar edição</button></div></form><p class="hint">Os registros são armazenados no navegador quando permitido. Faça backups regularmente.</p></section>';
    const records='<section class="card"><h2>Meus registros</h2><div class="toolbar"><label for="search" style="position:absolute;left:-9999px">Pesquisar</label><input id="search" type="search" placeholder="Pesquisar registros…" autocomplete="off"><button type="button" id="exportBtn">Exportar JSON</button><label for="importFile" style="border:1px solid #bac9db;border-radius:9px;padding:10px;cursor:pointer;margin:0;color:#24476b">Importar JSON</label><input type="file" id="importFile" accept=".json,application/json" style="position:absolute;left:-9999px;width:1px" aria-label="Escolher backup JSON"></div><small id="total"></small><div class="results" id="entries"></div></section>';
    const html='<div id="previewNote" hidden role="status">Prévia isolada: armazenamento local indisponível. Baixe o HTML e abra normalmente para persistir os dados, quando o navegador permitir.</div><p id="status" role="status" aria-live="polite"></p><div class="layout">'+form+records+'</div>';
    const configMarkup='<script type="application/json" id="tk-config">'+JSON.stringify(config).replace(/</g,'\\u003c')+'<\/script>';
    return commonStart(app.name,html,crudJS(),configMarkup);
  }
  function makeCalculator(app) {
    const markup=`<section class="card" style="max-width:560px;margin:0 auto"><h2>Quatro operações</h2><div class="field"><label for="a">Primeiro número</label><input id="a" type="number" step="any" inputmode="decimal" required></div><div class="field"><label for="op">Operação</label><select id="op"><option value="+">Somar (+)</option><option value="-">Subtrair (−)</option><option value="*">Multiplicar (×)</option><option value="/">Dividir (÷)</option></select></div><div class="field"><label for="b">Segundo número</label><input id="b" type="number" step="any" inputmode="decimal" required></div><div class="actions"><button id="calc" class="primary" type="button">Calcular</button><button id="clear" type="button">Limpar</button></div><p id="status" role="status" aria-live="polite"></p><output id="result" style="display:block;font-size:2rem;font-weight:bold" aria-live="polite"></output><small>Use números finitos. A divisão por zero é rejeitada.</small></section>`;
    const js = String.raw`(function(){'use strict';const $=id=>document.getElementById(id);function calc(){const a=Number($('a').value),b=Number($('b').value),op=$('op').value;const status=$('status');status.className='bad';$('result').textContent='';if(!$('a').value.trim()||!$('b').value.trim()||!Number.isFinite(a)||!Number.isFinite(b)){status.textContent='Informe dois números válidos.';return;}if(op==='/'&&b===0){status.textContent='Não é possível dividir por zero.';return;}const value=op==='+'?a+b:op==='-'?a-b:op==='*'?a*b:a/b;if(!Number.isFinite(value)){status.textContent='Resultado fora do intervalo suportado.';return;}status.textContent='Operação concluída.';status.className='good';$('result').textContent=String(Number(value.toPrecision(13)));}$('calc').addEventListener('click',calc);$('clear').addEventListener('click',()=>{for(const id of ['a','b'])$(id).value='';$('result').textContent='';$('status').textContent='';$('a').focus();});for(const id of ['a','b'])$(id).addEventListener('keydown',e=>{if(e.key==='Enter')calc();});})();`;
    return commonStart(app.name,markup,js);
  }
  function generate(id) {
    const app=APPS.find(x=>x.id===id);
    if(!app)throw new Error('Aplicativo não suportado pelo catálogo local.');
    const code=app.id==='calculadora'?makeCalculator(app):makeCrud(app);
    return {code,filename:app.slug+'.html',language:'html',recipeId:'app-'+id,source:'local-app',matched:true,complete:true,appId:app.id,title:app.name,summary:app.description+' Código completo para esta categoria de projeto, sem modelos generativos.',advice:'Teste na prévia e depois no HTML baixado. Registros do modo de prévia podem não persistir devido ao isolamento de segurança. Faça backups; sem sincronização nem criptografia.'};
  }
  const api={APPS,normalize,interpret,generate};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  if(root)root.ToolkitApps=api;
})(typeof window!=='undefined'?window:null);
