const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
  });
});

const countdownLabel = document.querySelector('#countdown-label');
const countdownValue = document.querySelector('#countdown');
const countdownNote = document.querySelector('#countdown-note');
const eventStart = new Date('2026-10-16T14:00:00+02:00').getTime();
const eventEnd = new Date('2026-10-18T14:00:00+02:00').getTime();
const pad = (value) => String(value).padStart(2, '0');

function updateCountdown() {
  const now = Date.now();
  let target;
  if (now < eventStart) {
    countdownLabel.textContent = 'COMIENZA EN';
    countdownNote.textContent = 'Viernes 16 · 14:00';
    target = eventStart;
  } else if (now < eventEnd) {
    countdownLabel.textContent = 'TIEMPO HASTA EL CIERRE';
    countdownNote.textContent = 'Domingo 18 · 14:00';
    target = eventEnd;
  } else {
    countdownLabel.textContent = 'HACKATHON FINALIZADA';
    countdownValue.textContent = '¡GRACIAS!';
    countdownNote.textContent = 'Fin · domingo 18 · 14:00';
    return;
  }
  const remaining = Math.max(0, target - now);
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  countdownValue.textContent = `${days ? `${days}d ` : ''}${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

updateCountdown();
setInterval(updateCountdown, 1000);
