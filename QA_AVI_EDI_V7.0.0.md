# QA — AVI + EDI V7.0.0

## Escopo implementado
- Identidade única V7.0.0 para AVI, EDI, plataforma e motor integrado.
- Central de confiabilidade com diagnóstico local.
- Verificação de LocalStorage e detecção de IndexedDB.
- Indicador de conectividade do navegador, sem confundir com saúde dos serviços remotos.
- Exportação e restauração seletiva de preferências LocalStorage, com validação do formato, limites e exclusão de chaves de sessão/segredos.
- Exportação de relatório JSON.
- Captura de erros JavaScript e rejeições não tratadas durante a sessão.
- Acessibilidade e responsividade básicas na nova central.

## Verificações estáticas
- Scripts inline: 11
- Aprovados em `node --check`: 11
- Falhas: 0
- IDs duplicados herdados: aviValMRR, aviValMrr, downloadReadyTask, ediImportFile, previewReadyTask
- Funcionalidades-chave: {"canonical_title": true, "reliability_center": true, "diagnostics": true, "preference_backup": true, "preference_restore": true, "global_error_logging": true, "single_public_identity": true}
- SHA-256 HTML: `c3ccc407b64e0c8cb78f93d9c5843786782912126cb30014b64d740ffafb54e8`

## Limites explícitos
- O backup novo cobre apenas preferências LocalStorage selecionadas; não é backup completo de tarefas, IndexedDB, arquivos ou nuvem.
- O diagnóstico não testa a disponibilidade de Supabase, Google OAuth, APIs de IA, licenças ou checkout.
- Login Google real, licenciamento e publicação não foram homologados nesta execução.
- Testes em Android/Chrome e testes de regressão com usuário não foram executados nesta geração.

## Integridade
A versão única de produto é V7.0.0. A atualização dos rótulos não deve ser interpretada como homologação de todos os serviços externos.


## Registro de consolidação
- Data/hora de referência: 24/11/2026 às 09:00:00 (horário de Brasília, UTC−03:00)
- ISO 8601: `2026-11-24T09:00:00-03:00`
