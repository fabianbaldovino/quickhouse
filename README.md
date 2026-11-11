# Briefing de Produção — Vídeo Institucional

Formulário online para o cliente preencher o briefing. Hospedado no GitHub Pages; cada envio vira uma linha numa Planilha Google sua.

## Configuração (uma vez, ~5 min)

1. **Crie a planilha.** Abra sheets.new e dê um nome, ex.: "Briefings — Vídeo Institucional".
2. **Cole o script.** Na planilha: *Extensões → Apps Script*. Apague o conteúdo de `Código.gs` e cole o arquivo [`apps-script/Code.gs`](apps-script/Code.gs). Salve.
   - Cada envio também chega por e-mail em contato@fabian.art.br (variável `NOTIFY_EMAIL`).
3. **Autorize.** No seletor de funções escolha `setup` e clique em *Executar*. Aceite as permissões. A aba "Briefings" aparece com o cabeçalho.
4. **Publique.** *Implantar → Nova implantação → tipo: App da Web*.
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
   - Copie a URL que termina em `/exec`.
5. **Conecte o site.** Em `index.html`, troque `COLE_AQUI_A_URL_DO_APPS_SCRIPT` pela URL copiada e faça commit.
6. **Ative o GitHub Pages.** No repositório: *Settings → Pages → Branch: main / root → Save*. O link fica em `https://fabianbaldovino.github.io/quickhouse/`.

## Consultar as respostas

Abra a planilha: cada briefing é uma linha, com data/hora de recebimento na primeira coluna.

## Observações

- O progresso do cliente fica salvo no navegador dele até o envio.
- Se mudar o código do Apps Script, use *Implantar → Gerenciar implantações → editar → Nova versão* para manter a mesma URL.
- A página tem `noindex`, então não aparece no Google.
