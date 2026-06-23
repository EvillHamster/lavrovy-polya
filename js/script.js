document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    easing: 'ease-in-out-sine'
  });

  setInterval(addItem, 1900);

  var itemsCounter = 1;
  var container = document.getElementById('aos-demo');

  function addItem() {
    if (itemsCounter > 42 || !container) return;
    var item = document.createElement('div');
    item.classList.add('aos-item');
    item.setAttribute('data-aos', 'fade-up');
    item.innerHTML = '<div class="aos-item__inner"><h3>' + itemsCounter + '</h3></div>';
    container.appendChild(item);
    itemsCounter++;
  }
});

// Добавление класса display-none,
// чтобы избавиться от 'палок' в блоке Наши преимущества
// при уменьшении ширины

function check1024ScreenWidth() {
  const element = document.querySelector('.benefist__border-2');
  const mediaQuery = window.matchMedia('(max-width: 1024px)');

  if (mediaQuery.matches) {
    element.classList.add('display-none');
  } else {
    element.classList.remove('display-none');
  }
}

window.addEventListener('load', check1024ScreenWidth);
window.addEventListener('resize', check1024ScreenWidth);

function check768ScreenWidth() {
  const elements = document.querySelectorAll('.benefist__border');
  const mediaQuery = window.matchMedia('(max-width: 768px)');

  function handleResize() {
    elements.forEach(element => {
      if (mediaQuery.matches) {
        element.classList.add('display-none');
      } else {
        element.classList.remove('display-none');
      }
    });
  }
  handleResize();
  mediaQuery.addListener(handleResize);
}

check768ScreenWidth();

// ========== НОВЫЙ КОД ДЛЯ КНОПОК "ГЕН.ПЛАН" ==========
// Кеш для iframe
let iframeCache = {};

// Функция закрытия попапа
function closePopup() {
  const popup = document.getElementById('genplanPopup');
  popup.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Обработчики для кнопок "Ген.план"
document.querySelectorAll('.act2').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    const pageUrl = this.getAttribute('data-genplan') || this.parentElement.getAttribute('href');
    const popup = document.getElementById('genplanPopup');
    const popupContent = document.querySelector('.popup-content');

    // Если iframe уже создан для этого URL
    if (iframeCache[pageUrl]) {
      popupContent.innerHTML = `<span class="popup-close">&times;</span>`;
      popupContent.appendChild(iframeCache[pageUrl]);
      popup.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      iframeCache[pageUrl].style.display = 'block';
      popupContent.querySelector('.popup-close').addEventListener('click', closePopup);
      popup.addEventListener('click', function(e) {
        if (e.target === popup) closePopup();
      });
      return;
    }

    // Создаём спиннер
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.style.cssText = 'position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); z-index:10;';

    // Создаём iframe
    const iframe = document.createElement('iframe');
    iframe.src = pageUrl;
    iframe.style.cssText = 'width:100%; height:100%; border:none; position:absolute; top:0; left:0; display:none;';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '');

    popupContent.innerHTML = `<span class="popup-close">&times;</span>`;
    popupContent.appendChild(spinner);
    popupContent.appendChild(iframe);
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    iframe.addEventListener('load', function() {
      spinner.style.display = 'none';
      iframe.style.display = 'block';
    });

    iframeCache[pageUrl] = iframe;

    popupContent.querySelector('.popup-close').addEventListener('click', closePopup);
    popup.addEventListener('click', function(e) {
      if (e.target === popup) closePopup();
    });
  });
});