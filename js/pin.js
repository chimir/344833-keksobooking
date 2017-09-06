'use strict';
(function () {
  var similarPin = document.querySelector('.tokyo__pin-map');
  var pin = similarPin.querySelector('.pin');

  // Функция создания метки.
  var getPin = function (data) {
    var pinWidth = 56;
    var pinHeight = 75;
    var x = data.location.x - pinWidth / 2;
    var y = data.location.y - pinHeight;

    var newPin = document.createElement('div');
    newPin.className = 'pin';
    newPin.style = 'left: ' + x + 'px; top: ' + y + 'px';
    newPin.tabIndex = 0;
    newPin.innerHTML = '<img src="' + data.author.avatar + '" class="rounded" width="40" height="40">';

    return newPin;
  };

  // Создание меток и заполнение данными (аватар пользователя и координаты меток).
  var successHandler = function (pins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(getPin(pins[i]));
    }

    similarPin.appendChild(fragment);
  };

  window.backend.load(successHandler, window.util.errorHandler);

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
