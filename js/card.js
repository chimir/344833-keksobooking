'use strict';
(function () {
  var similarLodgeTemplate = document.querySelector('#lodge-template').content;
  var similarDialog = document.querySelector('.dialog');

  // Список доступных удобств.
  var getFeatures = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      var newElement = document.createElement('span');
      newElement.className = 'feature__image feature__image--' + arr[i];

      fragment.appendChild(newElement);
    }

    return fragment;
  };

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
      adsElement.querySelector('.lodge__features').appendChild(getFeatures(data.offer.features));
      adsElement.querySelector('.lodge__description').textContent = data.offer.description;
      document.querySelector('.dialog__title img').src = data.author.avatar;

      return adsElement;
    },

    openDialog: function (evt) {
      // Проверяем, что клик был не по метке с классом pin__main.
      if (!evt.target.classList.contains('pin__main') && !evt.target.parentNode.classList.contains('pin__main')) {
        window.pin.activatePin(evt);
        similarDialog.classList.remove('hidden');
        window.showCard(evt);
      }
    },

    closeDialog: function () {
      var pin = document.querySelector('.pin--active');
      similarDialog.classList.add('hidden');
      pin.classList.remove('pin--active');
    }
  };
})();
