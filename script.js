// Feedback slider
const feedbackCircles = Array.from(
    document.querySelectorAll(".feedback .active-circle")
  ),
  feedbackGroup = document.querySelector(".feedback-group .row"),
  feedbackArrowRight = document.querySelector(".feedback__arrow--right"),
  feedbackArrowLeft = document.querySelector(".feedback__arrow--left");

// Service slider
const serviceGroup = document.querySelector(".service-group .row"),
  serviceItems = Array.from(document.querySelectorAll(".service-item"));
serviceCircles = Array.from(
  document.querySelectorAll(".service .active-circle")
);

// Mood slider
const moodGroup = document.querySelector(".mood__img-group .row"),
  moodItems = Array.from(document.querySelectorAll(".mood__img-wrap"));
moodCircles = Array.from(document.querySelectorAll(".mood .active-circle"));

//   Feedback object
class AutoSlider {
  constructor(sliderGroup, sliderCircles, arrowRight, arrowLeft) {
    this.currentIndex = 0;
    this.sliderGroup = sliderGroup;
    this.sliderCircles = sliderCircles;
    this.arrowRight = arrowRight;
    this.arrowLeft = arrowLeft;
    this.intervalID;
    this.sliderDelayTime = 3000;
  }

  start() {
    this.sliderCircles[this.currentIndex].classList.add("active");
    // Auto move to next feedback
    this.intervalID = setInterval(
      () => this.sliderMove(),
      this.sliderDelayTime
    );
    // Move to next feedback
    this.nextFeedback();
    // Move to previous feedback
    this.preFeedback();

    this.arrowRight.addEventListener("click", () => this.nextFeedback());
    this.arrowLeft.addEventListener("click", () => this.preFeedback());
  }

  sliderMove() {
    // Set current index and toggle the circle active
    this.sliderCircles[this.currentIndex].classList.remove("active");
    this.currentIndex += 1;
    this.checkIndex();
    // Move to next feedback
    this.sliderGroup.style.transform = `translateX(-${this.currentIndex}00%)`;
  }

  checkIndex() {
    if (this.currentIndex >= feedbackCircles.length) {
      this.currentIndex = 0;
      this.sliderCircles[this.currentIndex].classList.add("active");
    } else if (this.currentIndex < 0) {
      this.currentIndex = this.sliderCircles.length - 1;
      this.sliderCircles[this.currentIndex].classList.add("active");
    } else {
      this.sliderCircles[this.currentIndex].classList.add("active");
    }
  }

  nextFeedback() {
    clearInterval(this.intervalID);
    this.sliderCircles[this.currentIndex].classList.remove("active");
    this.currentIndex += 1;
    this.checkIndex();

    // Move to next feedback
    this.sliderGroup.style.transform = `translateX(-${this.currentIndex}00%)`;

    // Auto move to next feedback
    this.intervalID = setInterval(
      () => this.sliderMove(),
      this.sliderDelayTime
    );
  }

  preFeedback() {
    clearInterval(this.intervalID);
    this.sliderCircles[this.currentIndex].classList.remove("active");
    this.currentIndex -= 1;
    this.checkIndex();

    // Move to previous feedback
    this.sliderGroup.style.transform = `translateX(-${this.currentIndex}00%)`;

    // Auto move to next feedback
    this.intervalID = setInterval(
      () => this.sliderMove(),
      this.sliderDelayTime
    );
  }
}

class Slider {
  constructor(sliderGroup, sliderItems, sliderCircles) {
    this.sliderCircles = sliderCircles;
    this.sliderGroup = sliderGroup;
    this.sliderItems = sliderItems;
    this.isDragging = false;
    this.startPos = 0;
    this.currentTranslate = 0;
    this.preTranslate = 0;
    this.animationID = 0;
    this.currentIndex = 0;
  }

  start() {
    this.sliderItems.forEach((item, index) => {
      const itemImage = item.querySelector("img");
      itemImage.addEventListener("dragstart", (e) => e.preventDefault());

      // Touch events
      item.addEventListener("touchstart", (event) =>
        this.touchstart(event, index)
      );
      item.addEventListener("touchend", (event) => this.touchend(event));
      item.addEventListener("touchmove", (event) => this.touchmove(event));
    });
  }

  touchstart(event, index) {
    this.currentIndex = index;
    this.startPos = this.getPositionX(event);
    this.isDragging = true;
    this.animationID = requestAnimationFrame(() => this.animation());
  }

  touchend() {
    this.isDragging = false;
    cancelAnimationFrame(this.animationID);

    const movedBy = this.currentTranslate - this.preTranslate;

    if (movedBy < -100 && this.currentIndex < this.sliderItems.length - 1) {
      this.removeActive();
      this.currentIndex += 1;
    }

    if (movedBy > 100 && this.currentIndex > 0) {
      this.removeActive();
      this.currentIndex -= 1;
    }

    this.setPositionByIndex();

    this.setActive();
  }

  touchmove(event) {
    if (this.isDragging) {
      const currentPosition = this.getPositionX(event);
      this.currentTranslate =
        this.preTranslate + currentPosition - this.startPos;
    }
  }

  getPositionX(event) {
    return event.touches[0].clientX;
  }

  animation() {
    this.setSliderPosition();
    if (this.isDragging) requestAnimationFrame(() => this.animation());
  }

  setSliderPosition() {
    this.sliderGroup.style.transform = `translateX(${this.currentTranslate}%)`;
  }

  setPositionByIndex() {
    this.currentTranslate = this.currentIndex * -100;
    this.preTranslate = this.currentTranslate;
    this.setSliderPosition();
  }

  setActive() {
    this.sliderCircles[this.currentIndex].classList.add("active");
  }

  removeActive() {
    this.sliderCircles[this.currentIndex].classList.remove("active");
  }
}

const feedbackAutoSlider = new AutoSlider(
  feedbackGroup,
  feedbackCircles,
  feedbackArrowRight,
  feedbackArrowLeft
);
const serviceSlider = new Slider(serviceGroup, serviceItems, serviceCircles);
const moodSlider = new Slider(moodGroup, moodItems, moodCircles);

feedbackAutoSlider.start();
serviceSlider.start();
moodSlider.start();
