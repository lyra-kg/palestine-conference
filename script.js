document.addEventListener('DOMContentLoaded', () => {

const speakers = [
     {
    id: 'khadidja', 
    name: 'Dr. Khadidja bint Abdullah', 
    role: 'Historian, Middle East Studies',
    img: 'images/speakers1.avif', 
    alt: 'Dr. Khadidja bint Abdullah' 
    },

     { 
    id: 'umar', 
    name: 'Mr. Umar Al-Masri',
    role: 'Diplomat, Former UN Advisor',
    img: 'images/speakers2.avif', 
    alt: 'Mr. Umar Al-Masri' 
     }, 
     { 
    id: 'sara',
    name: 'Ms. Sara Johnson', 
    role: 'Humanitarian Policy Expert', 
    img: 'images/speakers3.avif', 
    alt: 'Ms. Sara Johnson' 
     }
];
const programItems = [ 
    'Opening keynote: Roads to Recognition', 
    'Panel: Economic Foundations of Statehood', 
    'Workshop: Humanitarian Coordination in Practice', 
    'Closing roundtable: Voices from the Diaspora'
 ];

const aboutSection = document.querySelector('#about');

const programList = document.createElement('ul'); 

programList.style.marginTop = '20px'; 
programList.style.listStyle = 'none';

programItems.forEach(item => {
     const li = document.createElement('li'); 
     li.textContent = '— ' + item; 
     li.style.padding = '6px 0';
     programList.appendChild(li); 
    });

const programHeading = document.createElement('h3');
programHeading.textContent = 'Program Highlights'; 
programHeading.style.marginTop = '30px';

aboutSection.appendChild(programHeading); 
aboutSection.appendChild(programList);

const speakersSection = document.querySelector('#speakers'); 
const speakersHeading = speakersSection.querySelector('h2');

speakersSection.querySelectorAll('.card').forEach(card => card.remove());

function getFavorites() { 
    const saved = localStorage.getItem('favoriteSpeakers'); 
    return saved ? JSON.parse(saved) : [];
 }

function saveFavorites(list) { 
    localStorage.setItem('favoriteSpeakers', JSON.stringify(list)); 
}

function renderSpeakers() { 
    speakersSection.querySelectorAll('.card').forEach(card => card.remove());

const favorites = getFavorites();

const cardsHTML = speakers.map(speaker => {
  const isFavorite = favorites.includes(speaker.id);
  return `
    <div class="card" data-id="${speaker.id}">
      <img src="${speaker.img}" alt="${speaker.alt}">
      <h3>${speaker.name}</h3>
      <p>${speaker.role}</p>
      <button class="favorite-btn ${isFavorite ? 'is-favorite' : ''}">
        ${isFavorite ? ' In your schedule' : ' Add to my schedule'}
      </button>
    </div>`;
}).join('');

speakersHeading.insertAdjacentHTML('afterend', cardsHTML);

speakersSection.querySelectorAll('.favorite-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.card');
    const id = card.getAttribute('data-id');
    let favs = getFavorites();

    if (favs.includes(id)) {
      favs = favs.filter(fav => fav !== id);
    } else {
      favs.push(id);
    }
    saveFavorites(favs);
    renderSpeakers();
  });
});
}
renderSpeakers();

const heroSection = document.querySelector('.hero');
const heroButton = heroSection.querySelector('button');

const countdownEl = document.createElement('div');
countdownEl.id = 'countdown';
countdownEl.style.fontWeight = 'bold';
countdownEl.style.margin = '15px 0';
heroButton.insertAdjacentElement('beforebegin', countdownEl);

const conferenceDate = new Date('2026-12-01T09:00:00');

function updateCountdown() {
    const now = new Date();
    const diff = conferenceDate - now;

    if (diff <= 0) {
        countdownEl.textContent = 'The conference has started!';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60 )) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.textContent = `Starts in ` +days + 'd' + hours +'h' + minutes +'m' + seconds +'s';

    setTimeout(updateCountdown, 1000);
}
    updateCountdown();

    const form = document.querySelector('#form form');
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const topicSelect = form.querySelector('select');
    const messageInput = form.querySelector('textarea');
    const submitBtn = form.querySelector('button[type="submit"]');

    function createMessageEl(afterEl, type) {
        const el = document.createElement('div');
        el.className ='form-message ' + type;
        afterEl.insertAdjacentElement('afterend', el);
        return el;
    }

    const nameError = createMessageEl(nameInput, 'error');
    const emailError = createMessageEl(emailInput, 'error');
    const topicError = createMessageEl(topicSelect, 'error');
    const successMsg = createMessageEl(submitBtn, 'success');

    function isValidEmail(value) { return /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(value); }
    form.addEventListener('submit', (e) => { e.preventDefault();
    [nameError, emailError, topicError].forEach(el => el.textContent = '');
    successMsg.textContent = '';

    let isValid = true;

    const fieldsToCheck = [
    { input: nameInput, errorEl: nameError, message: 'Please enter your name.' },
    { input: emailInput, errorEl: emailError, message: 'Please enter a valid email.' },
    { input: topicSelect, errorEl: topicError, message: 'Please choose a topic.' }
    ];

    fieldsToCheck.forEach(field => {
    const value = field.input.value.trim();
    let fieldIsValid = true;

    if (!value) {
        fieldIsValid = false;
    }
    if (field.input === emailInput && value && !isValidEmail(value)) {
        fieldIsValid = false;
    }

    if (!fieldIsValid) {
        field.errorEl.textContent = field.message;
        field.input.style.border = '2px solid #922b21';
        isValid = false;
    } else {
        field.input.style.border = '1px solid #ccc';
    }
    });

    if (!isValid) return;

    const registrationData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    topic: topicSelect.value,
    message: messageInput.value.trim()
    };
    localStorage.setItem('conferenceRegistration', JSON.stringify(registrationData));

    successMsg.textContent = 'Thanks, ' + registrationData.name + '! Your registration was received.';
    form.reset();

    setTimeout(() => {
    successMsg.textContent = '';
    }, 4000);
    });


});