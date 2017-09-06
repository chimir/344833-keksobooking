'use strict';
(function () {
  var similarDialog = document.querySelector('.dialog');

  // Индекс нажатой метки.
  window.getPinIndex = function (evt) {
    var target = evt.target;

    if (target.nodeName === 'IMG') {
      var targetSrc = evt.target.getAttribute('src');
    } else {
      targetSrc = evt.target.firstChild.getAttribute('src');
    }

    for (var i = 0; i < window.data.similarAds.length; i++) {
      if (window.data.similarAds[i].author.avatar === targetSrc) {
        var index = i;
      }
    }

    return index;
  };

  // Замена диалогового окна на другое, с индексом
  // равным индексу нажатой метки.
  window.showCard = function (evt) {
    var similarDialogPanel = similarDialog.querySelector('.dialog__panel');
    var index = window.getPinIndex(evt);

    similarDialog.replaceChild(window.card.fillLodge(window.data.similarAds[index]), similarDialogPanel);
  };
})();
