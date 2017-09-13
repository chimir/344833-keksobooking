'use strict';
(function () {
  var similarPin = document.querySelector('.tokyo__pin-map');
  var similarDialog = document.querySelector('.dialog');
  var dialogClose = similarDialog.querySelector('.dialog__close');

  similarDialog.classList.add('hidden'); // Скрываем диологовое окно по умолчанию.

  // Делаем метку активной при клике по ней и
  // окрываем диалоговое окно.
  similarPin.addEventListener('click', function (evt) {
    window.card.openDialog(evt);
  });

  // Делаем метку, находящуюся в фокусе, активной и
  // окрываем диалоговое окно при нажатии Enter.
  similarPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.card.openDialog);
  });

  // Скрываем диологовое окно при клике на кнопку закрытия (крестик) .dialog__close.
  // Удаляем класс pin--active у активной метки.
  dialogClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.card.closeDialog();
  });

  // Закрытие диалогового окна при нажатии Ssc.
  document.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, window.card.closeDialog);
  });

  /**
   * =========================
   * #16 максимум подвижности
   * =========================
   */

  var pinMain = similarPin.querySelector('.pin__main');
  var addressField = document.querySelector('#address');

  var pinWidth = 75;
  var pinHeight = 94;

  // Координаты острия метки.
  var getPinGadPosition = function (x, y) {
    var pinGadPositionX = Math.round(x + pinWidth / 2);
    var pinGadPositionY = y + pinHeight;

    return 'x: ' + pinGadPositionX + ', y: ' + pinGadPositionY;
  };

  addressField.readOnly = true;
  addressField.value = getPinGadPosition(pinMain.offsetLeft, pinMain.offsetTop);

  // Перемещение метки.
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    // Начальные координаты мышки.
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // Удержание мышки.
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinPosition = {
        x: (pinMain.offsetLeft - shift.x),
        y: (pinMain.offsetTop - shift.y)
      };

      pinMain.style.top = pinPosition.y + 'px';
      pinMain.style.left = pinPosition.x + 'px';

      addressField.value = getPinGadPosition(pinPosition.x, pinPosition.y);
    };

    // Отпускание мышки.
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

