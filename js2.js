window.onload = function () {
  function getParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  const userID = getParam('userID');
  console.log("Pagina geopend door:", userID || "onbekend");

  fetch('https://script.google.com/macros/s/AKfycbzUrVHIXXRUKqRox5FBomPPZE1cvWH4AyKfb74fnBortgg4wd4eHbFJarK6tbqI-b60/exec', {
    method: 'POST',
    mode: 'no-cors', // Hiermee omzeil je CORS fouten
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      event: 'Pagina geopend',
      command: '-',
      timestamp: new Date().toISOString(),
      userID: userID || 'onbekend'
    })
  })
  .then(() => {
    console.log('Paginabezoek gelogd! (via no-cors)');
  })
  .catch(err => {
    console.error('Fout bij verzenden paginalog:', err);
  });
};