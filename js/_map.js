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

var adsTypeTranslate = {
  'flat': 'квартира',
  'house': 'дом',
  'bungalo': 'бунгало'
};

var adsQuantity = 8; // Кол-во объявлений.

// Рандомное число.
// Возвращает случайное целое число от 0 до max (не включая max).
var getRandom = function (max) {
  return Math.floor(Math.random() * max);
};

// Рандомное число.
// Возвращает случайное целое число между min (включительно) и max (включительно).
var randomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

// Создание массива не повторяющихся чисел от min (включительно) до max (включительно).
var getRandomArray = function (min, max) {
  var arr = [];

  while (arr.length <= max - min) {
    var randomNumber = randomInteger(min, max);

    if (arr.indexOf(randomNumber) === -1) {
      arr.push(randomNumber);
    }
  }

  return arr;
};

var avatarIdMin = 1;
var avatarIdMax = 8;

var randomAvatarIndex = getRandomArray(avatarIdMin, avatarIdMax);
var randomTitleIndex = getRandomArray(0, ADS_TITLE.length);
console.log(randomTitleIndex);

// Данные для заполнения объявления.
var adsOptions = function (number) {
  return {
    'author': {
      'avatar': 'img/avatars/user0' + (randomAvatarIndex[number]) + '.png' // не должны повторяться.
    },
    'offer': {
      'title': ADS_TITLE[randomTitleIndex[number]], // не должны повторяться.
      'address': '',
      'price': randomInteger(1000, 1000000),
      'type': ADS_TYPE[getRandom(ADS_TYPE.length)],
      'rooms': randomInteger(1, 5),
      'guests': randomInteger(1, 10),
      'checkin': ADS_CHECKIN[getRandom(ADS_CHECKIN.length)],
      'checkout': ADS_CHECKOUT[getRandom(ADS_CHECKOUT.length)],
      'features': '',
      'description': '',
      'photos': ''
    },
    'location': {
      'x': randomInteger(300, 900),
      'y': randomInteger(100, 500)
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

// var count = random(0, adsQuantity); // Случайное число в зависимости от кол-ва объявлений.

// Массив строк случайной длины доступнх удобств.
var adsFeatures = [];
for (i = 0; i < randomInteger(1, ADS_FEATURES.length); i++) {
  adsFeatures.push(ADS_FEATURES[i]);
}

console.log(adsFeatures);

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
  adsElement.querySelector('.lodge__price').innerHTML = data.offer.price + '&#x20bd;/ночь';
  adsElement.querySelector('.lodge__type').textContent = adsTypeTranslate[data.offer.type];
  adsElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + data.offer.guests + ' гостей в ' + data.offer.rooms + ' комнатах';
  adsElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + data.offer.checkin + ' , выезд до ' + data.offer.checkout;
  adsElement.querySelector('.lodge__features').appendChild(fragment);
  adsElement.querySelector('.lodge__description').textContent = data.offer.description;
  document.querySelector('.dialog__title img').src = data.author.avatar;

  return adsElement;
};

similarDialog.removeChild(similarDialogPanel); // Удаляем карточку по умолчанию.
similarDialog.appendChild(lodge(similarAds[0])); // Вставляем карточку.
