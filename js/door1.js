/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door1(number, onUnlock) {
  DoorBase.apply(this, arguments);
  button3Pressed = false;
  button4Pressed = false;
  startCoords = {
    btn3: {},
    btn4: {}
  };
  slideButtons = [
    this.popup.querySelector(".door-riddle__button_3"),
    this.popup.querySelector(".door-riddle__button_4")
  ];
  unlockButton = this.popup.querySelector(".door-riddle__button_5");

  const onSlideButtonPointerDown = e => {
    if (e.target.classList.contains("door-riddle__button_3")) {
      button3Pressed = true;
      recordPointerDownStartCoords(e);
    }
    if (e.target.classList.contains("door-riddle__button_4")) {
      button4Pressed = true;
      recordPointerDownStartCoords(e);
    }
  };

  const onSlideButtonPointerUp = e => {
    button3Pressed = false;
    button4Pressed = false;
    resetSlideButtonsPosition();
    hideUnlockButton();
  };

  const onUnlockButtonPointerDown = () => {
    this.unlock();
  };

  const onSlideButtonPointerMove = event => {
    if (button3Pressed && button4Pressed) {
      moveSlideButton(event);
      if (checkSlideButtonsTravelEnough()) {
        revealUnlockButton();
      } else {
        hideUnlockButton();
      }
    }
  };

  const revealUnlockButton = () => {
    unlockButton.classList.add("door-riddle__button_5--visible");
  };

  const hideUnlockButton = () => {
    unlockButton.classList.remove("door-riddle__button_5--visible");
  };

  const moveSlideButton = event => {
    const distance = event.clientX - startCoords.btn3.x;
    event.target.style.left = `${distance}px`;
  };

  const resetSlideButtonsPosition = () => {
    slideButtons.forEach(b => (b.style.left = "0"));
    startCoords = { btn3: {}, btn4: {} };
  };

  const checkSlideButtonsTravelEnough = () => {
    return slideButtons.every(b => {
      const left = parseInt(b.style.left);
      return left >= 230 && left <= 270;
    });
  };

  const recordPointerDownStartCoords = event => {
    if (event.target.classList.contains("door-riddle__button_3")) {
      startCoords.btn3.x = event.clientX;
    }
    if (event.target.classList.contains("door-riddle__button_4")) {
      startCoords.btn4.x = event.clientX;
    }
  };

  slideButtons.forEach(btn => {
    btn.addEventListener("pointerdown", onSlideButtonPointerDown);
    btn.addEventListener("pointerup", onSlideButtonPointerUp);
    btn.addEventListener("pointermove", onSlideButtonPointerMove);
    btn.addEventListener("pointerleave", onSlideButtonPointerUp);
  });
  unlockButton.addEventListener(
    "pointerdown",
    onUnlockButtonPointerDown.bind(this)
  );
}
Door1.prototype = Object.create(DoorBase.prototype);
Door1.prototype.constructor = DoorBase;
