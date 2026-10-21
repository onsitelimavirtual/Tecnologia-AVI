/* Interface IA Estendida, sem bibliotecas, sem chaves de API. */
(function () {
  'use strict';
  if (typeof document === 'undefined') return;
  const $ = id => document.getElementById(id);
  const A = window.ToolkitAI;
  let response = null;
  let controller = null;
  let working = false;
  const hints = {
    guiado:'Ativo sem instalação. Análise heurística (não é um LLM). Nenhum texto enviado à rede.',
    chrome:'Usa LanguageModel quando habilitado e compatível. Pode baixar um modelo e requerer hardware moderno. Não suportado em muitos celulares e computadores antigos; o português pode não ser aceito.',
    ollama:'Exige Ollama e um modelo previamente baixado e iniciado no próprio computador. Sem assinatura e sem chave de nuvem. Requisições locais podem exigir configurar CORS; não exponha o serviço à internet.'
  };
  function setStatus(message, kind) {
    const el=$('aiStatus'); el.textContent=message; el.className='result-state'+(kind?' '+kind:'');
  }
  function setBusy(flag) {
    working=flag; $('aiRun').disabled=flag; $('aiCancel').disabled=!flag;
    $('ollamaCheck').disabled=flag;
  }
  function errorMessage(e) {
    if (e && e.name==='AbortError') return 'Operação cancelada.';
    if (e && e.name==='TypeError' && $('aiProvider').value==='ollama') return 'Ollama inacessível pelo navegador. Confira instalação, endereço, CORS e restrições de conteúdo misto em HTTPS.';
    return e && e.message ? String(e.message).slice(0,400) : 'Não foi possível concluir a análise.';
  }
  function updateProvider() {
    const provider=$('aiProvider').value;
    $('aiProviderHint').textContent=hints[provider];
    $('ollamaSettings').hidden=provider!=='ollama';
    $('aiUsedProvider').textContent={guiado:'Modo guiado',chrome:'IA Chrome',ollama:'Ollama local'}[provider];
    $('sideStatus').textContent=provider==='guiado'?'Modo guiado gratuito':provider==='chrome'?'IA do Chrome selecionada':'Ollama local selecionado';
  }
  function showAnswer(result, provider) {
    response=result;
    $('aiAnswer').textContent=result.text;
    $('aiGeneratedCode').textContent=result.code||'';
    $('aiGeneratedWrap').hidden=!result.code;
    $('aiCopy').disabled=false;
    $('aiDownload').disabled=false;
    $('aiToBuilder').disabled=!result.code;
    $('aiUsedProvider').textContent=provider;
    setStatus(result.code?'Resposta com código':'Orientação disponível','success');
  }
  function clearAnswer() {
    response=null; $('aiAnswer').textContent='Aqui você encontrará recomendações, alertas e planos de teste. Os resultados são orientativos e precisam de revisão.';
    $('aiGeneratedCode').textContent=''; $('aiGeneratedWrap').hidden=true;
    ['aiCopy','aiDownload','aiToBuilder'].forEach(id=>$(id).disabled=true);
    setStatus('Aguardando tarefa');
  }
  function collect() {
    const mode=$('aiMode').value, language=$('aiLanguage').value;
    const goal=$('aiGoal').value.trim(), context=$('aiContext').value.trim(), code=$('aiInputCode').value;
    if (!goal && !code.trim()) throw new Error('Preencha o objetivo ou cole um código para análise.');
    if (mode==='gerar' && !goal) throw new Error('Para gerar código, descreva a função pretendida.');
    return {mode,language,goal,context,code};
  }
  async function run() {
    if (working) return;
    let data;
    try { data=collect(); } catch(e) {setStatus(e.message,'warning'); $('aiGoal').focus(); return;}
    const provider=$('aiProvider').value;
    clearAnswer();
    if (provider==='guiado') {
      try { const r=A.guided({...data,toolkit:window.ToolkitEngine});showAnswer(r, r.source==='local-app'?'Aplicação montada offline':'Orientação offline'); }
      catch(e){setStatus(errorMessage(e),'warning');}
      return;
    }
    setBusy(true); setStatus('Consultando IA local…'); controller=new AbortController();
    const timeout=setTimeout(()=>controller && controller.abort(),120000);
    try {
      const prompt=A.modelPrompt(data);
      let message;
      if (provider==='ollama') {
        message=await A.ollamaPrompt({url:$('ollamaUrl').value,model:$('ollamaModel').value,prompt,signal:controller.signal});
      } else {
        message=await A.chromePrompt({modelClass:window.LanguageModel,prompt,signal:controller.signal});
      }
      const code=A.extractedCode(message);
      const ext=window.ToolkitEngine.LANGUAGES[data.language].ext;
      const result={text:message,code:code||null,filename:'assistencia_ia.'+ext,language:data.language,goal:data.goal,context:data.context,source:provider};
      showAnswer(result, provider==='ollama'?'IA generativa • Ollama local':'IA generativa • Chrome');
    } catch (e) {setStatus(errorMessage(e),'warning');}
    finally {clearTimeout(timeout);controller=null;setBusy(false);}
  }
  function appendCodeToBuilder() {
    if (!response || !response.code) return;
    const lang=response.language||$('aiLanguage').value;
    window.ToolkitUI.loadAIResult({
      code:response.code, filename:response.filename||'assistencia_ia.'+window.ToolkitEngine.LANGUAGES[lang].ext,
      language:lang, goal:response.goal||$('aiGoal').value, useCase:response.context||$('aiContext').value,
      source:response.source||'guiado', matched:Boolean(response.matched)
    });
  }
  async function checkOllama() {
    const controllerTest=new AbortController();
    const timeout=setTimeout(()=>controllerTest.abort(),9000);
    $('ollamaCheck').disabled=true;
    $('ollamaFeedback').textContent='Verificando serviço local…';
    try {
      const models=await A.ollamaModels({url:$('ollamaUrl').value,signal:controllerTest.signal});
      const installed=models.length?models.join(', '):'nenhum (baixe um modelo no Ollama antes de gerar)';
      $('ollamaFeedback').textContent='Conectado. Modelos: '+installed;
      $('ollamaFeedback').className='feedback ok';
      if (models.length && !models.includes($('ollamaModel').value)) $('ollamaModel').value=models[0];
    } catch(e){$('ollamaFeedback').textContent=errorMessage(e);$('ollamaFeedback').className='feedback error';}
    finally {clearTimeout(timeout);$('ollamaCheck').disabled=working;}
  }
  function prepareFromBuilder() {
    $('aiGoal').value=$('goal').value;
    $('aiContext').value=$('useCase').value;
    $('aiLanguage').value=$('language').value;
    $('aiMode').value='gerar';
    window.ToolkitUI.navigate('ia');
    $('aiGoal').focus();
  }
  document.addEventListener('DOMContentLoaded',()=>{
    if (!A || !window.ToolkitUI) return;
    $('aiProvider').addEventListener('change',updateProvider);
    $('aiRun').addEventListener('click',run);
    $('aiCancel').addEventListener('click',()=>{if(controller)controller.abort();});
    $('ollamaCheck').addEventListener('click',checkOllama);
    $('aiClear').addEventListener('click',()=>{
      if (working) return;
      ['aiGoal','aiContext','aiInputCode'].forEach(id=>$(id).value='');
      clearAnswer(); $('aiGoal').focus();
    });
    $('aiCopy').addEventListener('click',()=>{
      if (!response) return;
      const text=response.text+(response.code?'\n\nCÓDIGO:\n'+response.code:'');
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(()=>setStatus('Copiado.','success')).catch(()=>fallbackCopy(text));
      else fallbackCopy(text);
    });
    function fallbackCopy(text) {
      const el=document.createElement('textarea'); el.value=text;el.style.position='fixed';el.style.top='-2000px';document.body.appendChild(el);el.select();
      try {const ok=document.execCommand('copy');setStatus(ok?'Copiado.':'Selecione e copie manualmente.',ok?'success':'warning');}
      catch (_) {setStatus('Selecione o resultado e copie manualmente.','warning');} finally {el.remove();}
    }
    $('aiDownload').addEventListener('click',()=>{
      if (!response) return;
      const output=response.text+(response.code?'\n\n--- CÓDIGO PROPOSTO ---\n'+response.code:'');
      const blob=new Blob([output],{type:'text/plain;charset=utf-8'});
      const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download='Toolkit_IA_Estendida_Resultado.txt';a.click();setTimeout(()=>URL.revokeObjectURL(u),2000);
    });
    $('aiToBuilder').addEventListener('click',appendCodeToBuilder);
    $('builderToAI').addEventListener('click',prepareFromBuilder);
    updateProvider();
  });
})();
