'use strict';
(function () {
  var similarDialog = document.querySelector('.dialog');

  // Замена диалогового окна на другое, с индексом
  // равным индексу нажатой метки.
  window.showCard = function (evt) {
    var similarDialogPanel = similarDialog.querySelector('.dialog__panel');
    var card = window.pin.getPinIndex(evt);

    similarDialog.replaceChild(window.card.fillLodge(card), similarDialogPanel);
  };
})();
