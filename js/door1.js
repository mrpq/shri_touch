/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door1(number, onUnlock) {
  DoorBase.apply(this, arguments);
  this.questsPassed = [];
  this.questOneStarted = false;
  this.questOnePathOneHover = false;
  this.questOnePathTwoHover = false;

  this.questTwoStarted = false;

  const _trackButtonOnePath = event => {
    if (this.questOneStarted) {
      console.log("we good");
    }
  };
  const _trackButtonOneLeftPath = event => {
    this.questOneStarted = false;
    console.log("Left!");
  };
  const _trackButtonOneRelease = event => {
    this.questOneStarted = false;
    console.log("Release!");
  };
  // ==== Напишите свой код для открытия второй двери здесь ====
  const buttonOne = this.popup.querySelector(".door-riddle__button_3");
  buttonOne.addEventListener("pointerdown", e => {
    this.questOneStarted = true;
    console.log("started!");
  });
  buttonOne.addEventListener("pointerup", e => {
    this.questOneStarted = false;
  });

  const buttonOnePathPartOne = this.popup.querySelector(
    ".door-riddle__button_3-path_1"
  );
  const buttonOnePathPartTwo = this.popup.querySelector(
    ".door-riddle__button_3-path_0"
  );
  buttonOnePathPartOne.addEventListener("pointerenter", e => {
    if (this.questOneStarted) {
      this.questOnePathOneHover = true;
      console.log("p1 enter");
    }
  });
  buttonOnePathPartOne.addEventListener("pointerout", e => {
    if (!this.questOnePathTwoHover) {
      this.questOneStarted = false;
      this.questOnePathOneHover = false;
      console.log("p1 out");
    }
  });

  buttonOnePathPartOne.addEventListener("pointerleave", e => {
    if (!this.questOnePathTwoHover) {
      this.questOneStarted = false;
      this.questOnePathOneHover = false;
      console.log("p1 leave");
    }
  });
  buttonOnePathPartTwo.addEventListener("pointerenter", e => {
    console.log("p2 enter");
    if (this.questOnePathOneHover) {
      this.questOnePathTwoHover = true;
      console.log("p2 enter");
    } else {
    }
  });
  buttonOnePathPartTwo.addEventListener("pointerover", e => {
    console.log("p2 over");
    if (this.questOnePathOneHover) {
      this.questOnePathTwoHover = true;
      console.log("p2 over");
    } else {
    }
  });
  buttonOnePathPartTwo.addEventListener("pointerleave", e => {
    this.questOnePathTwoHover = false;
    console.log("p2 leave");
  });

  const questOneEndPoint = this.popup.querySelector(
    ".door-riddle__button_3_end"
  );
  console.log(questOneEndPoint);
  questOneEndPoint.addEventListener("pointerenter", e => {
    console.log("hello", this.questOneStarted);
    if (this.questOneStarted) {
      alert("Boom!");
    }
  });
  questOneEndPoint.addEventListener("pointerover", e => {
    console.log("hello over", this.questOneStarted);
    if (this.questOneStarted) {
      alert("Boom!");
    }
  });
  // this.popup.addEventListener(
  //   "click",
  //   function() {
  //     this.unlock();
  //   }.bind(this)
  // );
  // ==== END Напишите свой код для открытия второй двери здесь ====
}
Door1.prototype = Object.create(DoorBase.prototype);
Door1.prototype.constructor = DoorBase;
