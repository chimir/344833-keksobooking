'use strict';
(function () {
  var similarLodgeTemplate = document.querySelector('#lodge-template').content;

  window.card = {
    // Заполняем карточку.
    fillLodge: function (data) {
      var adsElement = similarLodgeTemplate.cloneNode(true);

      adsElement.querySelector('.lodge__title').textContent = data.offer.title;
      adsElement.querySelector('.lodge__address').textContent = data.location.x + ', ' + data.location.y;
      adsElement.querySelector('.lodge__price').innerHTML = data.offer.price + '&#x20bd;/ночь';
      adsElement.querySelector('.lodge__type').textContent = data.offer.type.ru;
      adsElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + data.offer.guests + ' гостей в ' + data.offer.rooms + ' комнатах';
      adsElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + data.offer.checkin + ' , выезд до ' + data.offer.checkout;
      adsElement.querySelector('.lodge__features').appendChild(window.data.fragment);
      adsElement.querySelector('.lodge__description').textContent = data.offer.description;
      document.querySelector('.dialog__title img').src = data.author.avatar;

      return adsElement;
    }
  };
})();
