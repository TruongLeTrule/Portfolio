const feedbackCircles = Array.from(
  document.querySelectorAll(".feedback .active-circle")
);
const feedbackGroup = document.querySelector(".feedback-group .row");
const feedbackArrowRight = document.querySelector(".feedback__arrow--right");
const feedbackArrowLeft = document.querySelector(".feedback__arrow--left");

const feedback = {
  currentIndex: 0,

  feedbackSlider: function () {
    // Set current index and toggle the circle active
    const _this = feedback;
    feedbackCircles[_this.currentIndex].classList.remove("active");
    _this.currentIndex += 1;
    _this.checkIndex();
    // Move to next feedback
    feedbackGroup.style.transform = `translateX(-${_this.currentIndex}00%)`;
  },

  checkIndex: function () {
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

  nextFeedback: function () {
    const _this = this;
    feedbackArrowRight.onclick = function () {
      feedbackCircles[_this.currentIndex].classList.remove("active");
      _this.currentIndex += 1;
      _this.checkIndex();

      // Move to next feedback
      feedbackGroup.style.transform = `translateX(-${_this.currentIndex}00%)`;
    };
  },

  preFeedback: function () {
    const _this = this;
    feedbackArrowLeft.onclick = function () {
      feedbackCircles[_this.currentIndex].classList.remove("active");
      _this.currentIndex -= 1;
      _this.checkIndex();

      // Move to previous feedback
      feedbackGroup.style.transform = `translateX(-${_this.currentIndex}00%)`;
    };
  },

  start: function () {
    feedbackCircles[this.currentIndex].classList.add("active");
    // Auto move to next feedback
    setInterval(this.feedbackSlider, 5000);
    // Move to next feedback
    this.nextFeedback();
    // Move to previous feedback
    this.preFeedback();
  },
};

feedback.start();
