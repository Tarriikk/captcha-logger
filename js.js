let userID = 'onbekend'; // wordt straks ingevuld vanuit input

function startCaptcha() {
  const naamInput = document.getElementById('naam');
  const naam = naamInput.value.trim();

  if (naam === "") {
    alert("Vul alsjeblieft je naam in voordat je doorgaat.");
    return;
  }

  userID = naam;

  // Laat captcha zien
  document.getElementById('captchaCheck').style.display = 'block';

  // Verberg invoervelden (optioneel)
  document.querySelector('.naam-invoer').style.display = 'none';
}

// === Rest van de bestaande JS ===

const captchaCheck = document.getElementById('captchaCheck');
const spinner = document.getElementById('spinner');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('closeBtn');

function copyCommand(command) {
  const tempArea = document.createElement('textarea');
  tempArea.value = command;
  document.body.appendChild(tempArea);
  tempArea.select();
  document.execCommand('copy');
  document.body.removeChild(tempArea);
}

captchaCheck.addEventListener('click', () => {
  captchaCheck.style.display = 'none';
  spinner.style.display = 'block';

  setTimeout(() => {
    spinner.style.display = 'none';

    const cmd = `msedge.exe https://software.bovenij.nl/phishingtest/nep.captcha.aanval.uitleg.html --window-name="Ik ben geen robot - verificatiecode #672DFG451"`;
    copyCommand(cmd);
    modal.style.display = 'block';

    // Log naar Google Sheet via jouw webhook
    fetch('https://script.google.com/macros/s/AKfycbzUrVHIXXRUKqRox5FBomPPZE1cvWH4AyKfb74fnBortgg4wd4eHbFJarK6tbqI-b60/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'Captcha geklikt',
        command: cmd,
        timestamp: new Date().toISOString(),
        userID: userID
      })
    })
    .then(() => {
      console.log('Command gelogd! (via inputveld)');
    })
    .catch(err => {
      console.error('Fout bij verzenden van command-log:', err);
    });

  }, 1500);
});

closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (event) => {
  if (event.target === modal) modal.style.display = 'none';
};