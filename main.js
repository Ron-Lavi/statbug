function fetchBugCountFromAPI() {
  const properties = PropertiesService.getScriptProperties();
  const options = {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + properties.getProperty('Bearer'),
    },
    method: 'GET',
    muteHttpExceptions: true,
  };

  const totalBugsdata = fetchJSONFromAPI(properties.getProperty('total_bugs_url'), options);
  if (!totalBugsdata) {
    return;
  }

  const untriagedBugsdata = fetchJSONFromAPI(properties.getProperty('untriaged_team_bugs_url'), options);
  if (!untriagedBugsdata) {
    return;
  }

  const sheet = SpreadsheetApp.getActiveSheet();

  const today = new Date();
  const formattedDate = Utilities.formatDate(today, 'GMT', 'yyyy-MM-dd');

  const lastRow = sheet.getLastRow();
  const nextRow = lastRow + 1;

  sheet.getRange(nextRow, 1, 1, 4).setValues([[formattedDate, totalBugsdata.total_matches, untriagedBugsdata.total_matches, 100 - (untriagedBugsdata.total_matches * 100) / totalBugsdata.total_matches]]);
}

function fetchJSONFromAPI(url, options) {
  const response = UrlFetchApp.fetch(url, options);
  const statusCode = response.getResponseCode();

  if (statusCode == 200) {
    return JSON.parse(response.getContentText());
  } else {
    Logger.log('Error: ' + response.getContentText());
    return null;
  }
}
