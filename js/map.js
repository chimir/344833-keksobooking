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
  'flat',
  'house',
  'bungalo'
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
var random = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Данные для заполнения объявления.
var adsOptions = function () {
  return {
    'author': {
      'avatar': 'img/avatars/user0' + random(1, 8) + '.png' // не должны повторяться.
    },
    'offer': {
      'title': ADS_TITLE[random(0, ADS_TITLE.length)], // не должны повторяться.
      'address': '',
      'price': random(1000, 1000000),
      'type': ADS_TYPE[random(0, ADS_TYPE.length)],
      'rooms': random(1, 5),
      'guests': random(1, 10),
      'checkin': ADS_CHECKIN[random(0, ADS_CHECKIN.length)],
      'checkout': ADS_CHECKOUT[random(0, ADS_CHECKOUT.length)],
      'features': '',
      'description': '',
      'photos': ''
    },
    'location': {
      'x': random(300, 900),
      'y': random(100, 500)
    }
  };
};

// Заполнение массива.
var createArray = function (length, data) {
  var array = [];
  for (var i = 0; i < length; i++) {
    array.push(data());
  }
  return array;
};

var similarAds = createArray(adsQuantity, adsOptions); // Массив c данными для заполнения объявлений.

var similarLodgeTemplate = document.querySelector('#lodge-template').content;
var similarPin = document.querySelector('.tokyo__pin-map');
var similarDialog = document.querySelector('.dialog');
var similarDialogPanel = document.querySelector('.dialog__panel');

// Создание меток и заполнение данными (аватар пользователя и координаты меток).
var fr = document.createDocumentFragment();
var pinWidth = 56;
var pinHeight = 75;

for (var i = 0; i < similarAds.length; i++) {
  var x = similarAds[i].location.x - pinWidth / 2;
  var y = similarAds[i].location.y - pinHeight;

  var newPin = document.createElement('div');
  newPin.className = 'pin';
  newPin.style = 'left: ' + x + 'px; top: ' + y + 'px';
  newPin.innerHTML = '<img src="' + similarAds[i].author.avatar + '" class="rounded" width="40" height="40">';

  fr.appendChild(newPin);
}
similarPin.appendChild(fr);

var count = random(0, adsQuantity); // Случайное число в зависимости от кол-ва объявлений.

// Тип помещения, русское название.
var type = function () {
  var premises = similarAds[count].offer.type;

  if (premises === 'flat') {
    premises = 'Квартира';
  } else if (premises === 'bungalo') {
    premises = 'Бунгало';
  } else if (premises === 'house') {
    premises = 'Дом';
  }

  return premises;
};

// Массив строк случайной длины доступнх удобств.
var adsFeatures = [];
for (i = 0; i < random(1, ADS_FEATURES.length); i++) {
  adsFeatures.push(ADS_FEATURES[random(0, ADS_FEATURES.length)]);
}

// Список доступных удобств.
var fragment = document.createDocumentFragment();
for (i = 0; i < adsFeatures.length; i++) {
  var newElement = document.createElement('span');
  newElement.className = 'feature__image feature__image--' + adsFeatures[i];

  fragment.appendChild(newElement);
}

// Заполняем карточку.
var lodge = function (data) {
  var adsElement = similarLodgeTemplate.cloneNode(true);

  adsElement.querySelector('.lodge__title').textContent = data.offer.title;
  adsElement.querySelector('.lodge__address').textContent = data.location.x + ', ' + data.location.y;
  adsElement.querySelector('.lodge__price').textContent = data.offer.price + '\u20BD/ночь';
  adsElement.querySelector('.lodge__type').textContent = type();
  adsElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + data.offer.guests + ' гостей в ' + data.offer.rooms + ' комнатах';
  adsElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + data.offer.checkin + ' , выезд до ' + data.offer.checkout;
  adsElement.querySelector('.lodge__features').appendChild(fragment);
  adsElement.querySelector('.lodge__description').textContent = data.offer.description;
  document.querySelector('.dialog__title img').src = data.author.avatar;

  return adsElement;
};

similarDialog.removeChild(similarDialogPanel); // Удаляем карточку по умолчанию.
similarDialog.appendChild(lodge(similarAds[count])); // Вставляем карточку.
