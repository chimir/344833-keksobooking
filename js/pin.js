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

  var formFilter = document.querySelector('.tokyo__filters');

  var pins = [];

  var updatePins = function () {
    var filteredPins = pins;

    var typeFilterValue = formFilter.querySelector('#housing_type').value; // Тип жилья.
    var priceFilterValue = formFilter.querySelector('#housing_price').value; // Цена.
    var roomNumberValue = formFilter.querySelector('#housing_room-number').value; // Кол-во комнат.
    var guestsNumberValue = formFilter.querySelector('#housing_guests-number').value; // Кол-во гостей.
    var selectedFeatures = formFilter.querySelectorAll('input[type="checkbox"]:checked'); // Удобства

    if (typeFilterValue !== 'any') {
      filteredPins = filteredPins.filter(function (it) {
        return it.offer.type === typeFilterValue;
      });
    }

    filteredPins = filteredPins.filter(function (it) {
      return checkPrice(it.offer.price, priceFilterValue);
    });

    if (roomNumberValue !== 'any') {
      filteredPins = filteredPins.filter(function (it) {
        return it.offer.rooms === parseInt(roomNumberValue, 10);
      });
    }
    if (guestsNumberValue !== 'any') {
      filteredPins = filteredPins.filter(function (it) {
        return it.offer.guests === parseInt(guestsNumberValue, 10);
      });
    }

    if (selectedFeatures.length > 0) {
      [].forEach.call(selectedFeatures, function (item) {
        filteredPins = filteredPins.filter(function (it) {
          var isChecked = false;

          if (it.offer.features.indexOf(item.value) > -1) {
            isChecked = true;
          }

          return isChecked;
        });
      });
    }

    render(filteredPins);
  };

  var checkPrice = function (price, selected) {
    switch (selected) {
      case 'low':
        return price < 10000;
      case 'middle':
        return (price >= 10000) && (price < 50000);
      case 'high':
        return price >= 50000;
      default:
        return true;
    }
  };

  var debounceTimeout = 500;
  var debounce = function () {
    var lastTimeout;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      updatePins();
    }, debounceTimeout);
  };

  formFilter.addEventListener('change', debounce);

  // Создание меток и заполнение данными (аватар пользователя и координаты меток).
  var render = function (data) {
    var pinMain = similarPin.querySelector('.pin__main');

    similarPin.innerHTML = '';
    similarPin.appendChild(pinMain);

    for (var i = 0; i < data.length; i++) {
      similarPin.appendChild(getPin(data[i]));
    }
  };

  var getInitialArray = function (data) {
    return data.slice(0, 3);
  };

  var successHandler = function (data) {
    pins = data;

    render(getInitialArray(pins));
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
    },

    // Индекс нажатой метки.
    getPinIndex: function (evt) {
      var target = evt.target;

      if (target.nodeName === 'IMG') {
        var targetSrc = evt.target.getAttribute('src');
      } else {
        targetSrc = evt.target.firstChild.getAttribute('src');
      }

      for (var i = 0; i < pins.length; i++) {
        if (pins[i].author.avatar === targetSrc) {
          var index = i;
        }
      }

      return pins[index]; // Объекст объявления с индексом нажатой метки.
    }
  };
})();
