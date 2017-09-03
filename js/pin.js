'use strict';
(function () {
  var similarPin = document.querySelector('.tokyo__pin-map');
  var pin = similarPin.querySelector('.pin');

  // Создание меток и заполнение данными (аватар пользователя и координаты меток).
  var frag = document.createDocumentFragment();
  var pinWidth = 56;
  var pinHeight = 75;

  for (var i = 0; i < window.data.similarAds.length; i++) {
    var x = window.data.similarAds[i].location.x - pinWidth / 2;
    var y = window.data.similarAds[i].location.y - pinHeight;

    var newPin = document.createElement('div');
    newPin.className = 'pin';
    newPin.style = 'left: ' + x + 'px; top: ' + y + 'px';
    newPin.tabIndex = 0;
    newPin.innerHTML = '<img src="' + window.data.similarAds[i].author.avatar + '" class="rounded" width="40" height="40">';

    frag.appendChild(newPin);
  }
  similarPin.appendChild(frag);

  // Добавляем класс нажатой метке, и удаляем этого класс у активной метки.
  var highlightPin = function (node) {
    if (pin) {
      pin.classList.remove('pin--active');
    }
    pin = node;
    pin.classList.add('pin--active');
  };

  window.pin = {
    // Активируем нажатую метку, включая нажатие на потомке.
    activatePin: function (evt) {
      var target = evt.target;

      while (target !== similarPin) {
        if (target.className === 'pin') {
          highlightPin(target);
        }
        target = target.parentNode;
      }
    }
  };
})();
