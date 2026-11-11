/**
 * Recebe os envios do formulário de briefing e grava na planilha.
 * Cole este código em Extensões > Apps Script de uma Planilha Google.
 */

const SHEET_NAME = 'Briefings';

// Ordem das colunas na planilha: [chave do formulário, título da coluna]
const COLUMNS = [
  ['recebido_em',    'Recebido em'],
  ['empresa',        'Empresa / Marca'],
  ['data',           'Data'],
  ['responsavel',    'Responsável'],
  ['cargo',          'Cargo'],
  ['email',          'E-mail'],
  ['telefone',       'Telefone / WhatsApp'],
  ['abordagem',      '1. Abordagem'],
  ['duracao',        '2. Duração'],
  ['duracao_outra',  '2. Duração (outra)'],
  ['objetivo',       '3. Objetivo'],
  ['objetivo_outro', '3. Objetivo (outro)'],
  ['canais',         '4. Onde vai passar'],
  ['recursos',       '5. Recursos de produção'],
  ['recursos_outro', '5. Recursos (outro)'],
  ['marcos',         '6. Fatos e marcos'],
  ['entrevistados',  '7. Quem pode dar entrevista'],
  ['locacoes',       '8. Locações disponíveis'],
  ['observacoes',    '9. Algo mais?'],
];

// Cada briefing enviado também chega neste e-mail (deixe '' para desligar).
const NOTIFY_EMAIL = 'contato@fabian.art.br';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet_();
    const p = e.parameters || {};
    const row = COLUMNS.map(([key]) => {
      if (key === 'recebido_em') return new Date();
      const v = p[key];
      return v ? v.join(', ') : '';
    });
    sheet.appendRow(row);

    if (NOTIFY_EMAIL) {
      const empresa = (p.empresa || [''])[0];
      const resumo = COLUMNS.map(([, title], i) => row[i] ? `${title}: ${row[i]}` : null)
        .filter(Boolean).join('\n');
      MailApp.sendEmail(NOTIFY_EMAIL, `Novo briefing: ${empresa}`, resumo);
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(([, title]) => title));
    sheet.getRange(1, 1, 1, COLUMNS.length)
      .setFontWeight('bold').setBackground('#0D1330').setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
    sheet.setColumnWidths(1, COLUMNS.length, 220);
  }
  return sheet;
}

/** Rode esta função uma vez pelo editor para criar o cabeçalho e autorizar o script. */
function setup() {
  getSheet_();
}
