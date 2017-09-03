'use strict';
(function () {
  var similarPin = document.querySelector('.tokyo__pin-map');
  var similarDialog = document.querySelector('.dialog');
  var dialogClose = similarDialog.querySelector('.dialog__close');

  similarDialog.classList.add('hidden'); // Скрываем диологовое окно по умолчанию.

  var openDialog = function (evt) {
    window.pin.activatePin(evt);
    similarDialog.classList.remove('hidden');

    window.card.replaceDialog(evt);
  };

  var closeDialog = function () {
    var pin = similarPin.querySelector('.pin--active');
    similarDialog.classList.add('hidden');
    pin.classList.remove('pin--active');
  };

  // Делаем метку активной при клике по ней и
  // окрываем диалоговое окно.
  similarPin.addEventListener('click', function (evt) {
    openDialog(evt);
  });

  // Делаем метку, находящуюся в фокусе, активной и
  // окрываем диалоговое окно при нажатии Enter.
  similarPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openDialog);
  });

  // Скрываем диологовое окно при клике на кнопку закрытия (крестик) .dialog__close.
  // Удаляем класс pin--active у активной метки.
  dialogClose.addEventListener('click', function () {
    closeDialog();
  });

  // Закрытие диалогового окна при нажатии Ssc.
  document.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, closeDialog);
  });
})();

