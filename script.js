// Feedback Slider
const feedbackCircles = Array.from(
  document.querySelectorAll(".feedback .active-circle")
);
const feedbackGroup = document.querySelector(".feedback-group .row"),
  feedbackArrowRight = document.querySelector(".feedback__arrow--right"),
  feedbackArrowLeft = document.querySelector(".feedback__arrow--left");

// Service slide
const serviceGroup = document.querySelector(".service-group .row"),
  serviceItems = Array.from(document.querySelectorAll(".service-item"));
serviceCircles = Array.from(
  document.querySelectorAll(".service .active-circle")
);

//   Feedback object
const feedback = {
  currentIndex: 0,

  feedbackSlider() {
    // Set current index and toggle the circle active
    const _this = feedback;
    feedbackCircles[_this.currentIndex].classList.remove("active");
    _this.currentIndex += 1;
    _this.checkIndex();
    // Move to next feedback
    feedbackGroup.style.transform = `translateX(-${_this.currentIndex}00%)`;
  },

  checkIndex() {
    if (this.currentIndex >= feedbackCircles.length) {
      this.currentIndex = 0;
      feedbackCircles[this.currentIndex].classList.add("active");
    } else if (this.currentIndex <= 0) {
      this.currentIndex = feedbackCircles.length - 1;
      feedbackCircles[this.currentIndex].classList.add("active");
    } else {
      feedbackCircles[this.currentIndex].classList.add("active");
    }
  },

  nextFeedback() {
    const _this = this;
    feedbackArrowRight.onclick = function () {
      feedbackCircles[_this.currentIndex].classList.remove("active");
      _this.currentIndex += 1;
      _this.checkIndex();

      // Move to next feedback
      feedbackGroup.style.transform = `translateX(-${_this.currentIndex}00%)`;
    };
  },

  preFeedback() {
    const _this = this;
    feedbackArrowLeft.onclick = function () {
      feedbackCircles[_this.currentIndex].classList.remove("active");
      _this.currentIndex -= 1;
      _this.checkIndex();

      // Move to previous feedback
      feedbackGroup.style.transform = `translateX(-${_this.currentIndex}00%)`;
    };
  },

  start() {
    feedbackCircles[this.currentIndex].classList.add("active");
    // Auto move to next feedback
    setInterval(this.feedbackSlider, 5000);
    // Move to next feedback
    this.nextFeedback();
    // Move to previous feedback
    this.preFeedback();
  },
};

const serviceObj = {
  isDragging: false,
  startPos: 0,
  currentTranslate: 0,
  preTranslate: 0,
  animationID: 0,
  currentIndex: 0,
  _this: this,

  start() {
    serviceItems.forEach((service, index) => {
      const serviceImage = service.querySelector("img");
      serviceImage.addEventListener("dragstart", (e) => e.preventDefault());

      // Touch events
      service.addEventListener("touchstart", this.touchstart(index));
      service.addEventListener("touchend", this.touchend);
      service.addEventListener("touchmove", this.touchmove);
    });
  },

  touchstart(index) {
    const _this = this;
    return function (event) {
      _this.currentIndex = index;
      _this.startPos = _this.getPositionX(event);
      _this.isDragging = true;

      _this.animationID = requestAnimationFrame(_this.animation);
    };
  },

  touchend() {
    const _this = serviceObj;
    _this.isDragging = false;
    cancelAnimationFrame(_this.animationID);

    const movedBy = _this.currentTranslate - _this.preTranslate;

    if (movedBy < -100 && _this.currentIndex < serviceItems.length - 1) {
      _this.removeActive();
      _this.currentIndex += 1;
    }

    if (movedBy > 100 && _this.currentIndex > 0) {
      _this.removeActive();
      _this.currentIndex -= 1;
    }

    serviceObj.setPositionByIndex();

    _this.setActive();
  },

  touchmove(event) {
    const _this = serviceObj;
    if (_this.isDragging) {
      const currentPosition = _this.getPositionX(event);
      _this.currentTranslate =
        _this.preTranslate + currentPosition - _this.startPos;
    }
  },

  getPositionX(event) {
    return event.touches[0].clientX;
  },

  animation() {
    const _this = serviceObj;
    _this.setSliderPosition();
    if (_this.isDragging) requestAnimationFrame(_this.animation);
  },

  setSliderPosition() {
    serviceGroup.style.transform = `translateX(${this.currentTranslate}%)`;
  },

  setPositionByIndex() {
    this.currentTranslate = this.currentIndex * -100;
    this.preTranslate = this.currentTranslate;
    this.setSliderPosition();
  },

  setActive() {
    serviceCircles[this.currentIndex].classList.add("active");
  },

  removeActive() {
    serviceCircles[this.currentIndex].classList.remove("active");
  },
};

feedback.start();
serviceObj.start();
