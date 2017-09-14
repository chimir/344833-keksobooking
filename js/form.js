'use strict';
(function () {
  var noticeForm = document.querySelector('.notice__form');
  var addressField = noticeForm.querySelector('#address');
  var titleField = noticeForm.querySelector('#title');
  var priceField = noticeForm.querySelector('#price');
  var typeField = noticeForm.querySelector('#type');
  var timeInField = noticeForm.querySelector('#timein');
  var timeOutField = noticeForm.querySelector('#timeout');
  var roomNumberField = noticeForm.querySelector('#room_number');
  var capacityField = noticeForm.querySelector('#capacity');

  // Функция создает массив из значений выпадающего списка.
  var getSelectOptionsArr = function (selectFieldName) {
    var array = [];

    for (var i = 0; i < selectFieldName.length; i++) {
      array.push(selectFieldName.options[i].value);
    }

    return array;
  };

  var syncPlaceholder = function (element, value) {
    element.placeholder = value;
  };

  var syncValues = function (element, value) {
    element.value = value;
  };

  var roomNumber = getSelectOptionsArr(roomNumberField);
  var capacity = getSelectOptionsArr(capacityField);

  /**
   * Количество гостей в зависимости от кол-ва комнат.
   *
   * @param {*} fieldParent - поле с которым производим действие.
   * @param {*} fieldUnder - зависимое поле, в котором меняется значение.
   */
  var bindFields = function (fieldParent, fieldUnder) {
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

  // Количество гостей в зависимости от кол-ва комнат.
  bindFields(roomNumberField, capacityField); // задаем значения по умолчанию.
  roomNumberField.addEventListener('change', function () {
    bindFields(roomNumberField, capacityField);
  });

  // Мин. цена для типа жилья.
  var price = [
    1000,
    0,
    5000,
    10000
  ];

  // Время выезда в зависимости от значения поля - "время заезда"
  window.synchronizeFields(timeInField, timeOutField, getSelectOptionsArr(timeInField), getSelectOptionsArr(timeOutField), syncValues);

  // Время заезда в зависимости от значения поля - "время выезда"
  window.synchronizeFields(timeOutField, timeInField, getSelectOptionsArr(timeOutField), getSelectOptionsArr(timeInField), syncValues);

  // Изменение  плейсхолдера поля цены, в зависимости от типа жилья.
  priceField.placeholder = price[0]; // значения по умолчанию.
  window.synchronizeFields(typeField, priceField, getSelectOptionsArr(typeField), price, syncPlaceholder);


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

  // Отправка формы.
  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(noticeForm), function () {
      noticeForm.reset();
      titleField.removeAttribute('style');
      priceField.removeAttribute('style');
      addressField.removeAttribute('style');
    }, window.util.errorHandler);
  });
})();
