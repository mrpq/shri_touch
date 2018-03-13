/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door2(number, onUnlock) {
  DoorBase.apply(this, arguments);
  const onUnlockButtonPointerDown = () => {
    this.unlock();
  };
  const zoomarea = new Zoom(".popup_level_2__zoomarea");
  const button = this.popup.querySelector(".door-riddle__button_6");
  button.addEventListener("pointerdown", onUnlockButtonPointerDown.bind(this));
  zoomarea.addListener((currDistance, initialDistance) => {
    const diff = currDistance - initialDistance;
    const scale = diff > 0 ? diff * 0.01 : 0;
    button.style.transform = `translateX(-50%) scale(${scale},${scale}`;
  });
  zoomarea.addReleaseListener(() => {
    button.setAttribute("style", "transform: translateX(-50%) scale(0,0)");
  });
}
Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;
