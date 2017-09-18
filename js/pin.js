'use strict';
(function () {
  var DEBOUNCE_TIME = 500;

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

    var newPinAvatar = document.createElement('img');
    newPinAvatar.src = data.author.avatar;
    newPinAvatar.className = 'rounded';
    newPinAvatar.width = 40;
    newPinAvatar.height = 40;

    newPin.appendChild(newPinAvatar);

    return newPin;
  };

  var formFilter = document.querySelector('.tokyo__filters');

  var pins = [];

  var typeFilter = formFilter.querySelector('#housing_type'); // Тип жилья.
  var priceFilter = formFilter.querySelector('#housing_price'); // Цена.
  var roomNumber = formFilter.querySelector('#housing_room-number'); // Кол-во комнат.
  var guestsNumber = formFilter.querySelector('#housing_guests-number'); // Кол-во гостей.

  var getSelectValue = function (filterValue, data) {
    if (filterValue !== 'any') {
      return String(data) === filterValue;
    }
    return true;
  };

  var filterResult;
  var updatePins = function () {
    var filteredPins = pins;

    var typeFilterValue = typeFilter.value; // Тип жилья.
    var priceFilterValue = priceFilter.value; // Цена.
    var roomNumberValue = roomNumber.value; // Кол-во комнат.
    var guestsNumberValue = guestsNumber.value; // Кол-во гостей.
    var selectedFeatures = formFilter.querySelectorAll('input[type="checkbox"]:checked'); // Удобства

    filteredPins = filteredPins.filter(function (it) {
      return getSelectValue(typeFilterValue, it.offer.type) &&
        checkPrice(it.offer.price, priceFilterValue) &&
        getSelectValue(roomNumberValue, it.offer.rooms) &&
        getSelectValue(guestsNumberValue, it.offer.guests);
    });

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

    filterResult = filteredPins;
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

  var debounce = function () {
    var lastTimeout;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      updatePins();
    }, DEBOUNCE_TIME);
  };

  formFilter.addEventListener('change', debounce);

  // Создание меток и заполнение данными (аватар пользователя и координаты меток).
  var render = function (data) {
    var pinMain = similarPin.querySelector('.pin__main');

    similarPin.innerHTML = '';
    similarPin.appendChild(pinMain);

    data.forEach(function (dataObject) {
      similarPin.appendChild(getPin(dataObject));
    });
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
    if (pin !== null) {
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
          break;
        }
        target = target.parentNode;
      }
    },

    // Индекс нажатой метки.
    getPinIndex: function (evt) {
      var pinsAll = document.querySelectorAll('.pin:not(.pin__main)');
      var target = evt.target;

      if (target.nodeName === 'IMG') {
        var targetElement = target.parentNode;
      } else {
        targetElement = target;
      }

      var i = 0;
      while (pinsAll[i] !== targetElement) {
        i++;
      }

      var ads = typeof filterResult === 'undefined' ? getInitialArray(pins) : filterResult;
      return ads[i]; // Объекст объявления с индексом нажатой метки.
    }
  };
})();
