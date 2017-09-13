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

  var typeFilterValue; // Тип жилья.
  var priceFilterValue; // Цена.
  var roomNumberValue; // Кол-во комнат.
  var guestsNumberValue; // Кол-во гостей.
  var featureValue; // Удобства.

  var pins = [];

  var updatePins = function () {
    var sameTypePins = pins.filter(function (it) { // Ok
      return it.offer.type === typeFilterValue;
    });
    var samePricePins = pins.filter(function (it) {
      // console.log(getPrice(it.offer.price));
    });
    var sameRoomPins = pins.filter(function (it) { // Ok
      return it.offer.rooms === roomNumberValue;
    });
    var sameGuestsPins = pins.filter(function (it) { // Ok
      return it.offer.guests === guestsNumberValue;
    });
    var sameFeaturePins = pins.filter(function (it) {
      return it.offer.features.some(getFeature);
      // console.log(it.offer.features.indexOf(featureValue));
    });

    render(sameTypePins);
  };

  // Тип жилья.
  var typeFilter = formFilter.querySelector('#housing_type');
  typeFilter.addEventListener('change', function () {
    typeFilterValue = typeFilter.value;
    updatePins();
  });

  // Цена.
  var priceFilter = formFilter.querySelector('#housing_price');
  priceFilter.addEventListener('change', function () {
    priceFilterValue = priceFilter.value;
    updatePins();
    /*
    * any    - Любая
    * middle - 10000 - 50000₽
    * low    - до 10000₽
    * high   - от 50000₽
    *
    */
  });

  var getPrice = function (price) {
    if (priceFilterValue === 'middle') {
      return (price >= 10000) && (price < 50000);
    } else if (priceFilterValue === 'low') {
      return price < 10000;
    } else if (priceFilterValue === 'high') {
      return price >= 50000;
    } else {
      return true;
    }
  };


  // Кол-во комнат.
  var roomNumberFilter = formFilter.querySelector('#housing_room-number');
  roomNumberFilter.addEventListener('change', function () {
    roomNumberValue = parseInt(roomNumberFilter.value, 10);
    updatePins();
    /*
    * any - Любое число комнат
    * 1
    * 2
    * 3
    */
  });

  // Кол-во гостей.
  var guestsNumberFilter = formFilter.querySelector('#housing_guests-number');
  guestsNumberFilter.addEventListener('change', function () {
    guestsNumberValue = parseInt(guestsNumberFilter.value, 10);
    updatePins();
    /*
    * any - Любое число гостей
    * 1
    * 2
    */
  });

  // Удобства.
  var featureFilter = formFilter.querySelector('#housing_features input');
  featureFilter.addEventListener('change', function () {
    featureValue = featureFilter.checked ? featureFilter.value : '';
    updatePins();
  });

  var getFeature = function (it) {
    return it === featureValue;
  };

  var feat = formFilter.querySelectorAll('#housing_features input');
  // console.log(feat[0].checked);

  // Создание меток и заполнение данными (аватар пользователя и координаты меток).
  var render = function (data) {
    var pinMain = similarPin.querySelector('.pin__main');

    similarPin.innerHTML = '';
    similarPin.appendChild(pinMain);

    for (var i = 0; i < data.length; i++) {
      similarPin.appendChild(getPin(data[i]));
    }
  };

  var successHandler = function (data) {
    pins = data;
    updatePins();
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
