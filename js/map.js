'use strict';

var ADS_TITLE = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var ADS_TYPE = [
  {
    'en': 'flat',
    'ru': 'квартира'
  },
  {
    'en': 'house',
    'ru': 'дом'
  },
  {
    'en': 'bungalo',
    'ru': 'бунгало'
  }
];

var ADS_CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];

var ADS_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];

var ADS_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var adsQuantity = 8; // Кол-во объявлений.

// Рандомное число.
// Возвращает случайное целое число между min (включительно) и max (не включая max).
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Создание массива не поаторяющихся чисел от min (включительно) и max (не включая max).
var getRandomArray = function (min, max) {
  var arr = [];

  while (arr.length < max - min) {
    var randomNumber = getRandom(min, max);

    if (arr.indexOf(randomNumber) === -1) {
      arr.push(randomNumber);
    }
  }

  return arr;
};

var avatarIdMin = 1;
var avatarIdMax = 8;

var priseQuantityMin = 1000;
var priseQuantityMax = 1000000;

var roomsQuantityMin = 1;
var roomsQuantityMax = 5;

var guestsQuantityMin = 1;
var guestsQuantityMax = 10;

var xQuantityMin = 300;
var xQuantityMax = 900;

var yQuantityMin = 100;
var yQuantityMax = 500;

var randomAvatarIndex = getRandomArray(avatarIdMin, avatarIdMax + 1);
var randomTitleIndex = getRandomArray(0, ADS_TITLE.length);

// Данные для заполнения объявления.
var addAdsOptions = function (number) {
  return {
    'author': {
      'avatar': 'img/avatars/user0' + (randomAvatarIndex[number]) + '.png' // не должны повторяться.
    },
    'offer': {
      'title': ADS_TITLE[randomTitleIndex[number]], // не должны повторяться.
      'address': '',
      'price': getRandom(priseQuantityMin, priseQuantityMax + 1),
      'type': ADS_TYPE[getRandom(0, ADS_TYPE.length)],
      'rooms': getRandom(roomsQuantityMin, roomsQuantityMax + 1),
      'guests': getRandom(guestsQuantityMin, guestsQuantityMax + 1),
      'checkin': ADS_CHECKIN[getRandom(0, ADS_CHECKIN.length)],
      'checkout': ADS_CHECKOUT[getRandom(0, ADS_CHECKOUT.length)],
      'features': '',
      'description': '',
      'photos': ''
    },
    'location': {
      'x': getRandom(xQuantityMin, xQuantityMax + 1),
      'y': getRandom(yQuantityMin, yQuantityMax + 1)
    }
  };
};

// Заполнение массива.
var createArray = function (length, data) {
  var array = [];
  for (var i = 0; i < length; i++) {
    array.push(data(i));
  }
  return array;
};

var similarAds = createArray(adsQuantity, addAdsOptions); // Массив c данными для заполнения объявлений.

var similarLodgeTemplate = document.querySelector('#lodge-template').content;
var similarPin = document.querySelector('.tokyo__pin-map');
var similarDialog = document.querySelector('.dialog');
var similarDialogPanel = document.querySelector('.dialog__panel');

// Создание меток и заполнение данными (аватар пользователя и координаты меток).
var frag = document.createDocumentFragment();
var pinWidth = 56;
var pinHeight = 75;

for (var i = 0; i < similarAds.length; i++) {
  var x = similarAds[i].location.x - pinWidth / 2;
  var y = similarAds[i].location.y - pinHeight;

  var newPin = document.createElement('div');
  newPin.className = 'pin';
  newPin.style = 'left: ' + x + 'px; top: ' + y + 'px';
  newPin.innerHTML = '<img src="' + similarAds[i].author.avatar + '" class="rounded" width="40" height="40">';

  frag.appendChild(newPin);
}
similarPin.appendChild(frag);

var randomFeaturesIndex = getRandomArray(0, ADS_FEATURES.length);
// Массив строк случайной длины доступнх удобств.
var adsFeatures = [];
for (i = 0; i < getRandom(1, ADS_FEATURES.length + 1); i++) {
  adsFeatures.push(ADS_FEATURES[randomFeaturesIndex[i]]);
}

// Список доступных удобств.
var fragment = document.createDocumentFragment();
for (i = 0; i < adsFeatures.length; i++) {
  var newElement = document.createElement('span');
  newElement.className = 'feature__image feature__image--' + adsFeatures[i];

  fragment.appendChild(newElement);
}

// Заполняем карточку.
var fillLodge = function (data) {
  var adsElement = similarLodgeTemplate.cloneNode(true);

  adsElement.querySelector('.lodge__title').textContent = data.offer.title;
  adsElement.querySelector('.lodge__address').textContent = data.location.x + ', ' + data.location.y;
  adsElement.querySelector('.lodge__price').innerHTML = data.offer.price + '&#x20bd;/ночь';
  adsElement.querySelector('.lodge__type').textContent = data.offer.type.ru;
  adsElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + data.offer.guests + ' гостей в ' + data.offer.rooms + ' комнатах';
  adsElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + data.offer.checkin + ' , выезд до ' + data.offer.checkout;
  adsElement.querySelector('.lodge__features').appendChild(fragment);
  adsElement.querySelector('.lodge__description').textContent = data.offer.description;
  document.querySelector('.dialog__title img').src = data.author.avatar;

  return adsElement;
};

similarDialog.removeChild(similarDialogPanel); // Удаляем карточку по умолчанию.
similarDialog.appendChild(fillLodge(similarAds[0])); // Вставляем первую карточку из массива.

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

  for (i = fieldUnder.options.length - 1; i >= 0; i--) {
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

var price = [
  1000,
  5000,
  10000
];

var type = [
  'bungalo',
  'flat',
  'house',
  'palace'
];

// Изменение  плейсхолдера поля цены, в зависимости от типа жилья.
typeField.addEventListener('input', function () {
  if (typeField.value === type[0]) {
    priceField.placeholder = 0;
  } else if (typeField.value === type[1]) {
    priceField.placeholder = price[0];
  } else if (typeField.value === type[2]) {
    priceField.placeholder = price[1];
  } else if (typeField.value === type[3]) {
    priceField.placeholder = price[2];
  }
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
