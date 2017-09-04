'use strict';
(function () {
  var similarDialog = document.querySelector('.dialog');

  // Замена диалогового окна на другое, с индексом
  // равным индексу нажатой метки.
  window.showCard = function (evt) {
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

    var similarDialogPanel = similarDialog.querySelector('.dialog__panel');
    similarDialog.replaceChild(window.card.fillLodge(window.data.similarAds[index]), similarDialogPanel);
  };
})();
