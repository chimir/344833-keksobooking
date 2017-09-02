'use strict';
(function () {

  /**
   * =====================
   * доверяй, но проверяй
   * =====================
   */
  var noticeForm = document.querySelector('.notice__form');
  var addressField = noticeForm.querySelector('#address');
  var titleField = noticeForm.querySelector('#title');
  var priceField = noticeForm.querySelector('#price');
  var typeField = noticeForm.querySelector('#type');
  var timeInField = noticeForm.querySelector('#timein');
  var timeOutField = noticeForm.querySelector('#timeout');
  var roomNumberField = noticeForm.querySelector('#room_number');
  var capacityField = noticeForm.querySelector('#capacity');

  /**
   *
   * Количество гостей в зависимости от кол-ва комнат.
   *
   * @param {*} fieldParent - поле с которым производим действие.
   * @param {*} fieldUnder - зависимое поле, в котором меняется значение.
   *
   */
  var relationFields = function (fieldParent, fieldUnder) {
    var roomNumber = [
      '1',
      '2',
      '3',
      '100'
    ];

    var capacity = [
      '3',
      '2',
      '1',
      '0'
    ];

    for (var i = fieldUnder.options.length - 1; i >= 0; i--) {
      var option = fieldUnder.options[i];

      if (fieldParent.value === roomNumber[0]) {
        fieldUnder.value = capacity[2];
        var condition = option.value !== capacity[2];
      } else if (fieldParent.value === roomNumber[1]) {
        fieldUnder.value = capacity[2];
        condition = option.value !== capacity[2] && option.value !== capacity[1];
      } else if (fieldParent.value === roomNumber[2]) {
        fieldUnder.value = capacity[2];
        condition = option.value === capacity[3];
      } else if (fieldParent.value === roomNumber[3]) {
        fieldUnder.value = capacity[3];
        condition = option.value !== capacity[3];
      }

      if (condition) {
        option.hidden = true;
      } else {
        option.hidden = false;
      }
    }
  };

  relationFields(roomNumberField, capacityField); // задаем значения по умолчанию.

  // Количество гостей в зависимости от кол-ва комнат.
  roomNumberField.addEventListener('change', function () {
    relationFields(roomNumberField, capacityField);
  });

  // Заезд/выезд.
  noticeForm.addEventListener('change', function (evt) {
    var target = evt.target;

    if (target === timeInField) {
      timeOutField.value = timeInField.value;
    } else {
      timeInField.value = timeOutField.value;
    }
  });

  // Мин. цена для типа жилья.
  var priceOfType = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  // Изменение  плейсхолдера поля цены, в зависимости от типа жилья.
  priceField.placeholder = priceOfType[typeField.value]; // значение по умолчанию.
  typeField.addEventListener('change', function () {
    priceField.placeholder = priceOfType[typeField.value];
  });

  // Выделяем красной рамкой неправильно заполненные поля.
  var highlightFieldError = function (field) {
    if (!field.validity.valid) {
      field.setAttribute('style', 'border-color: red;');
    }
  };

  // Выделяем красной рамкой неправильно заполненные поля - Адрес
  addressField.addEventListener('invalid', function () {
    highlightFieldError(addressField);
  });

  // Выделяем красной рамкой неправильно заполненные поля - Заголовок объявления
  titleField.addEventListener('invalid', function () {
    highlightFieldError(titleField);
  });

  // Выделяем красной рамкой неправильно заполненные поля - Цена
  priceField.addEventListener('invalid', function () {
    highlightFieldError(priceField);
  });

  // Валидация поля - Заголовок.
  titleField.addEventListener('input', function () {
    var minLength = titleField.minLength;
    var maxLength = titleField.maxLength;

    if (titleField.validity.tooShort) {
      titleField.setCustomValidity('Заголовок объявления должен быть минимум из ' + minLength + '-и символов');
    } else {
      titleField.setCustomValidity('');
    }

    if (titleField.validity.tooLong) {
      titleField.setCustomValidity('Заголовок объявления не должен превышать ' + maxLength + ' символов');
    } else {
      titleField.setCustomValidity('');
    }

    // Для браузера Edge
    if (titleField.value.length < 30) {
      titleField.setCustomValidity('Заголовок объявления должен быть минимум из 30-и символов');
    } else if (titleField.value.length > 100) {
      titleField.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else {
      titleField.setCustomValidity('');
    }
  });

})();
