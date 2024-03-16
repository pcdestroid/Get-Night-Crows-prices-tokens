function updateTokenPrices() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow(); const tokensRange = sheet.getRange('B12:B' + lastRow);
  const tokens = tokensRange.getValues(); const all_prices = get_prices();
  const prices = tokens.map(row => {
    const token = row[0]; const price = tokenPrice(token, all_prices); return [price];
  }); sheet.getRange('C12:C' + lastRow).setValues(prices);
}
function tokenPrice(token, all_prices) {
  const price = all_prices;
  if (token == "CROW") {return price.crow}
  if (token == "PAPYRUS") {return price.papyrus * price.crow}
  if (token == "MORION") {return price.morion * price.crow}
  if (token == "PROMOTE") {return price.promote * price.crow}
  if (token == "GEAR") {return price.gear * price.crow}
  if (token == "TEAR") {return price.tear * price.crow}
  if (token == "FEATHER") {return price.feather * price.crow}
}
function get_crow_price() {
  const response = UrlFetchApp.fetch(`https://api.wemixplay.com/info/v2/price-chart?symbol=CROW&range=1`);
  const data = JSON.parse(response.getContentText()); return Number(data.data.chart.at(-1).p);
}
function get_prices() {
  const response = UrlFetchApp.fetch(`https://napi.wemixplay.com/info/v1/token/dex/crowToken`);
  const data = JSON.parse(response.getContentText());
  const closes = {
    crow: get_crow_price(),
    promote: data.Data[0].daySummary.close,
    gear: data.Data[1].daySummary.close,
    papyrus: data.Data[2].daySummary.close,
    feather: data.Data[3].daySummary.close,
    morion: data.Data[4].daySummary.close,
    tear: data.Data[5].daySummary.close
  }; return closes;
}
