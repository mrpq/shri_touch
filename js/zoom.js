class Zoom {
  constructor(selector) {
    this.trackingElem = document.querySelector(selector);
    this.trackingElem.addEventListener(
      "pointerdown",
      this.registerPointer.bind(this)
    );
    this.trackingElem.addEventListener(
      "pointerup",
      this.unregisterPointer.bind(this)
    );
    this.trackingElem.addEventListener(
      "pointermove",
      this.onPointerMove.bind(this)
    );
    this.registeredPointers = [];
    this.initialDistance = 0;
    this.currDistance = 0;
    this.listeners = [];
    this.releaseListeners = [];
  }

  getDistanceBetweenPointers(pointers) {
    const [pointer1Coords, pointer2Coords] = pointers.map(p => {
      return { x: p.clientX, y: p.clientY };
    });
    const distance = Math.sqrt(
      Math.pow(pointer1Coords.x - pointer2Coords.x, 2) +
        Math.pow(pointer1Coords.y - pointer2Coords.y, 2)
    );
    return distance;
  }

  initDistance() {
    const pointersDistance = this.getDistanceBetweenPointers(
      this.registeredPointers
    );
    this.initialDistance = pointersDistance;
    this.currDistance = pointersDistance;
  }

  resetDistance() {
    this.initialDistance = 0;
    this.currDistance = 0;
  }

  registerPointer(event) {
    if (this.registeredPointers.length < 2) {
      this.registeredPointers.push(event);
      if (this.registeredPointers.length === 2) {
        this.initDistance();
      }
    }
  }

  unregisterPointer(event) {
    // this.registeredPointers = [];
    this.registeredPointers = this.registeredPointers.filter(
      p => p.pointerId !== event.pointerId
    );
    this.resetDistance();
    this.releaseListeners.forEach(listener => listener());
  }

  updatePointer(stillPointer, event) {
    this.registeredPointers = [stillPointer, event];
  }

  onPointerMove(event) {
    const stillPointer = this.registeredPointers.find(
      p => p.pointerId !== event.pointerId
    );

    const pointersDistance = this.getDistanceBetweenPointers([
      stillPointer,
      event
    ]);
    this.currDistance = pointersDistance;
    this.updatePointer(stillPointer, event);
    this.listeners.forEach(listener => {
      listener(this.currDistance, this.initialDistance);
    });
  }

  addListener(f) {
    this.listeners.push(f);
  }
  addReleaseListener(f) {
    this.releaseListeners.push(f);
  }
}
