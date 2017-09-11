'use strict';
(function () {
  var KEYCODE = {
    ENTER: 13,
    ESC: 27
  };

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === KEYCODE.ESC) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.keyCode === KEYCODE.ENTER) {
        action(evt);
      }
    },

    // Рандомное число.
    // Возвращает случайное целое число между min (включительно) и max (не включая max).
    getRandom: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    // Создание массива не поаторяющихся чисел от min (включительно) и max (не включая max).
    getRandomArray: function (min, max) {
      var arr = [];

      while (arr.length < max - min) {
        var randomNumber = window.util.getRandom(min, max);

        if (arr.indexOf(randomNumber) === -1) {
          arr.push(randomNumber);
        }
      }

      return arr;
    },

    // Сообщение об шибке.
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');

      node.style.backgroundColor = '#323232';
      node.style.color = '#ffffff';
      node.style.fontSize = '14px';
      node.style.lineHeight = '20px';
      node.style.minWidth = '288px';
      node.style.maxWidth = '568px';
      node.style.borderRadius = '2px';
      node.style.padding = '14px 24px';
      node.style.position = 'absolute';
      node.style.left = '20px';
      node.style.bottom = '20px';
      node.style.zIndex = '99';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
