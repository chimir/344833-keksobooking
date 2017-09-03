'use strict';
(function () {
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

  var randomAvatarIndex = window.util.getRandomArray(avatarIdMin, avatarIdMax + 1);
  var randomTitleIndex = window.util.getRandomArray(0, ADS_TITLE.length);

  // Данные для заполнения объявления.
  var addAdsOptions = function (number) {
    return {
      'author': {
        'avatar': 'img/avatars/user0' + (randomAvatarIndex[number]) + '.png' // не должны повторяться.
      },
      'offer': {
        'title': ADS_TITLE[randomTitleIndex[number]], // не должны повторяться.
        'address': '',
        'price': window.util.getRandom(priseQuantityMin, priseQuantityMax + 1),
        'type': ADS_TYPE[window.util.getRandom(0, ADS_TYPE.length)],
        'rooms': window.util.getRandom(roomsQuantityMin, roomsQuantityMax + 1),
        'guests': window.util.getRandom(guestsQuantityMin, guestsQuantityMax + 1),
        'checkin': ADS_CHECKIN[window.util.getRandom(0, ADS_CHECKIN.length)],
        'checkout': ADS_CHECKOUT[window.util.getRandom(0, ADS_CHECKOUT.length)],
        'features': '',
        'description': '',
        'photos': ''
      },
      'location': {
        'x': window.util.getRandom(xQuantityMin, xQuantityMax + 1),
        'y': window.util.getRandom(yQuantityMin, yQuantityMax + 1)
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

  var randomFeaturesIndex = window.util.getRandomArray(0, ADS_FEATURES.length);
  // Массив строк случайной длины доступнх удобств.
  var adsFeatures = [];
  for (var i = 0; i < window.util.getRandom(1, ADS_FEATURES.length + 1); i++) {
    adsFeatures.push(ADS_FEATURES[randomFeaturesIndex[i]]);
  }

  // Список доступных удобств.
  var fragment = document.createDocumentFragment();
  for (i = 0; i < adsFeatures.length; i++) {
    var newElement = document.createElement('span');
    newElement.className = 'feature__image feature__image--' + adsFeatures[i];

    fragment.appendChild(newElement);
  }

  window.data = {
    similarAds: createArray(adsQuantity, addAdsOptions), // Массив c данными для заполнения объявлений.
    fragment: fragment
  };
})();
