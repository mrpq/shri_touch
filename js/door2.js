/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door2(number, onUnlock) {
  DoorBase.apply(this, arguments);

  // ==== Напишите свой код для открытия третей двери здесь ====
  // Для примера дверь откроется просто по клику на неё
  this.popup.addEventListener(
    "click",
    function() {
      this.unlock();
    }.bind(this)
  );
  // ==== END Напишите свой код для открытия третей двери здесь ====
}
Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;
