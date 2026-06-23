(function () {
  var burger = document.querySelector('.burger-container');
  var header = document.querySelector('.header');

  if (burger && header) {
    burger.onclick = function () {
      header.classList.toggle('menu-opened');
    };
  }
})();