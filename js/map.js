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

var KEYDOWN = {
  ENTER: 13,
  ESC: 27
};

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
  newPin.tabIndex = 0;
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


/**
 * ================
 * #11 подробности
 * ================
 */
var pin = similarPin.querySelector('.pin');
var dialogClose = similarDialog.querySelector('.dialog__close');

similarDialog.classList.add('hidden'); // Скрываем диологовое окно по умолчанию.


// Добавляем класс нажатой метке, и удаляем этого класс у активной метки.
var highlightPin = function (node) {
  if (pin) {
    pin.classList.remove('pin--active');
  }
  pin = node;
  pin.classList.add('pin--active');
};

// Активируем нажатую метку, включая нажатие на потомке.
var activatePin = function (evt) {
  var target = evt.target;

  while (target !== similarPin) {
    if (target.className === 'pin') {
      highlightPin(target);
    }
    target = target.parentNode;
  }
};

// Делаем метку активной при клике по ней и
// окрываем диалоговое окно.
similarPin.addEventListener('click', function (evt) {
  activatePin(evt);
  similarDialog.classList.remove('hidden');
});

// Делаем метку активной и
// окрываем диалоговое окно при нажатии Enter.
similarPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYDOWN.ENTER) {
    activatePin(evt);
    similarDialog.classList.remove('hidden');
  }
});

// Скрываем диологовое окно при клике на кнопку закрытия (крестик) .dialog__close.
// Удаляем класс pin--active у активной метки.
dialogClose.addEventListener('click', function () {
  similarDialog.classList.add('hidden');
  pin.classList.remove('pin--active');
});

// Закрытие диалогового окна при нажатии Ssc.
document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYDOWN.ESC) {
    similarDialog.classList.add('hidden');
    pin.classList.remove('pin--active');
  }
});

/**
 * Не получпется так сделать, т.к nodeList[i].className не видит добавляемый класс pin--active
 *
 * NodeList
 * var pins = similarPin.querySelectorAll('.pin:not(.pin__main)');
 *
 * function findInArray(nodeList, value) {
 *  for (i = 0; i < nodeList.length; i++) {
 *    if (nodeList[i].className === value) {
 *      return i;
 *    }
 *  }
 *  return 0;
 * }
 *
 * var index = findInArray(pins, 'pin pin--active');
 *
 * similarDialog.appendChild(fillLodge(similarAds[index]))
 */

similarDialog.removeChild(similarDialogPanel); // Удаляем карточку по умолчанию.
similarDialog.appendChild(fillLodge(similarAds[0])); // Вставляем первую карточку из массива.
