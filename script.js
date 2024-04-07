function updateTokenPrices() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  const tokensRange = sheet.getRange('B14:B' + lastRow);
  const tokens = tokensRange.getValues();
  const prices = tokens.map(row => {
    const token = row[0];
    const price = tokenPrice(token);
    return [price];
  });

  sheet.getRange('C14:C' + lastRow).setValues(prices);
}
function tokenPrice(token) {

  if (token == "CROW") { return get_price(token) }
  if (token == "PAPYRUS") { return get_price(token) }
  if (token == "MORION") { return get_price(token) }
  if (token == "PROMOTE") { return get_price(token) }
  if (token == "GEAR") { return get_price(token) }
  if (token == "TEAR") { return get_price(token) }
  if (token == "FEATHER") { return get_price(token) }
}

function get_price(coin) {
  const response = UrlFetchApp.fetch(`https://api.wemixplay.com/info/v2/price-chart?symbol=${coin}&range=1`);
  const data = JSON.parse(response.getContentText()); return Number(data.data.chart.at(-1).p);
}
