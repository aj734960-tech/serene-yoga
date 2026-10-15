const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

// Filter class cards by category.
document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.class-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

const dialog = document.getElementById('classDialog');
const dialogTitle = document.getElementById('dialogTitle');
const dialogText = document.getElementById('dialogText');
const dialogChoose = document.getElementById('dialogChoose');
let selectedClass = '';


const tutorialVideo = document.getElementById('tutorialVideo');

const yogaPlaylist = 'PLW0v0k7UCVrkh5WZyHu0d0fWnaNgbmQTw';

const yogaVideos = {
  'Start with the basics': yogaPlaylist,
  'Gentle Flow': yogaPlaylist,
  'Slow & Soft': yogaPlaylist,
  'Morning Flow': yogaPlaylist
};

function openClass(name) {
  selectedClass = name;

  dialogTitle.textContent = name;
  dialogText.textContent =
    `Follow this guided yoga practice for ${name}. Move at your own comfortable pace.`;

  const playlistId = yogaVideos[name] || yogaPlaylist;

  tutorialVideo.src =
    `https://www.youtube.com/embed/videoseries?list=${playlistId}`;

  tutorialVideo.style.display = 'block';

  dialog.showModal();
}

dialog.addEventListener('close', () => {
  tutorialVideo.src = '';
});
function openClass(name) {
  selectedClass = name;

  dialogTitle.textContent = name;
  dialogText.textContent =
    `Follow this guided yoga practice for ${name}. Move at your own comfortable pace.`;

  const playlistId = yogaVideos[name];

  tutorialVideo.src =
    `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}`;

  tutorialVideo.style.display = 'block';

  dialog.showModal();
}

dialog.addEventListener('close', () => {
  tutorialVideo.src = '';
});

document.querySelectorAll('.class-link').forEach(button => {
  button.addEventListener('click', () => openClass(button.dataset.class));
});
document.querySelectorAll('.small-book').forEach(button => {
  button.addEventListener('click', () => {
    selectedClass = button.dataset.session;
    document.getElementById('interest').value =
      selectedClass.includes('Unwind') ? 'Relaxation and breathing' :
      selectedClass.includes('Energy') ? 'Energising morning flow' : 'Gentle beginner yoga';
    document.getElementById('join').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('fullName').focus({ preventScroll: true });
    document.getElementById('formMessage').textContent = `${selectedClass} selected — complete the form to confirm your demo interest.`;
  });
});
document.getElementById('dialogClose').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
dialogChoose.addEventListener('click', () => {
  dialog.close();
  document.getElementById('interest').value =
    selectedClass.toLowerCase().includes('unwind') ? 'Relaxation and breathing' :
    selectedClass.toLowerCase().includes('wake') || selectedClass.toLowerCase().includes('energy') ? 'Energising morning flow' : 'Gentle beginner yoga';
  document.getElementById('join').scrollIntoView({ behavior: 'smooth' });
  document.getElementById('formMessage').textContent = `${selectedClass} selected — complete the form below.`;
});

// Demo-only form: validates input and shows an on-page confirmation.
document.getElementById('joinForm').addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('fullName').value.trim();
  const interest = document.getElementById('interest').value;
  const message = document.getElementById('formMessage');
  if (!name) {
    message.textContent = 'Please enter your name to continue.';
    return;
  }
  message.textContent = `Thank you, ${name}! Your demo interest in ${interest.toLowerCase()} has been recorded on this page.`;
  event.target.reset();
});
