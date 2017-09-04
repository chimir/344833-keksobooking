'use strict';
(function () {
  /**
   * @param {*} firstField - поле с которым производим действие.
   * @param {*} secondField - зависимое поле, в котором меняется значение.
   * @param {array} firstArray - массив из значений поля с которым производим действие.
   * @param {array} secondArray - массив из значений зависимого поля
   * @param {function} syncValues - функция
   */
  window.synchronizeFields = function (firstField, secondField, firstArray, secondArray, syncValues) {
    firstField.addEventListener('change', function () {
      var firstFieldValue = firstField.value; // значение первого поля.
      var firstArrayIndex = firstArray.indexOf(firstFieldValue); // Индекс значения первого поля

      syncValues(secondField, secondArray[firstArrayIndex]); // функция вида element.min = value;
    });
  };
})();
