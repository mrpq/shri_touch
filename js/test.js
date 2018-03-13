class Zoom {
  constructor(selector) {
    this.trackingElem = document.querySelector(selector);
    this.trackingElem.addEventListener("pointerdown", registerPointer);
    this.trackingElem.addEventListener("pointerup", unregisterPointer);
    this.trackingElem.addEventListener(
      "pointermove",
      this.onPointerMove.bind(this)
    );
    this.registeredPointers = [];
    this.initialDistance = 0;
    this.currDistance = 0;
    this.listeners = [];
  }

  initDistance() {
    const pointersDistance = this.getDistanceBetweenPointers(
      this.registeredPointers
    );
    this.initialDistance = pointersDistance;
    this.currDistance = pointersDistance;
  }

  registerPointer() {
    if (this.registeredPointers.length < 2) {
      this.registeredPointers.push(event);
      if (this.registeredPointers.length === 2) {
        this.initDistance();
      }
    }
  }

  unregisterPointer(event) {
    this.registeredPointers = this.registeredPointers.filter(
      p => p.pointerId !== event.pointerId
    );
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
      // alert(`${this.currDistance},${this.initialDistance}`);
      listener(this.currDistance, this.initialDistance);
    });
  }

  addListener(f) {
    this.listeners.push(f);
  }
}

const tdiv = document.querySelector(".test");
const odiv = document.querySelector(".out");
let registeredPointers = [];
let firstDistance;
let prevDistance;

const getDistanceBetweenPointers = pointers => {
  const [pointer1Coords, pointer2Coords] = pointers.map(p => {
    return { x: p.clientX, y: p.clientY };
  });
  const distance = Math.sqrt(
    Math.pow(pointer1Coords.x - pointer2Coords.x, 2) +
      Math.pow(pointer1Coords.y - pointer2Coords.y, 2)
  );
  return distance;
};

const registerPointer = event => {
  if (registeredPointers.length < 2) {
    registeredPointers.push(event);
    if (registeredPointers.length === 2) {
      prevDistance = getDistanceBetweenPointers(registeredPointers);
      firstDistance = prevDistance;
    }
  }
};

const unregisterPointer = event => {
  registeredPointers = registeredPointers.filter(
    p => p.pointerId !== event.pointerId
  );
};

const updatePointer = (stillPointer, event) => {
  registeredPointers = [stillPointer, event];
};

const onPointerMove = event => {
  console.log(registeredPointers[0].clientX);
  const stillPointer = registeredPointers.find(
    p => p.pointerId !== event.pointerId
  );

  const newDistance = getDistanceBetweenPointers([stillPointer, event]);
  updatePointer(stillPointer, event);
  odiv.innerHTML = newDistance;
};

// tdiv.addEventListener("pointerdown", registerPointer);
// tdiv.addEventListener("pointerup", unregisterPointer);
// tdiv.addEventListener("pointermove", onPointerMove);
try {
  const zoomable = new Zoom(".test");
  zoomable.addListener((currDistance, initialDistance) => {
    odiv.innerHTML = currDistance - initialDistance;
  });
} catch (e) {
  alert(e.message);
}
