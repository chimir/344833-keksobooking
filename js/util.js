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
    }
  };
})();
