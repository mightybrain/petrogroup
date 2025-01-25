class CustomVideo {
  constructor(element) {
    this.element = element;
    this.videoFrame = element.querySelector('video');
    this.playBtn = element.querySelector('.js-play-btn');

    this.init()

    this.timeout = null;
  }

  init() {
    this.element.addEventListener('mouseenter', () => {
      this.timeout = setTimeout(() => {
        this.videoFrame.play()
      }, 5000)
    })

    this.element.addEventListener('mouseleave', () => {
      clearTimeout(this.timeout)
    })

    this.videoFrame.addEventListener('click', () => {
      if (this.videoFrame.paused) {
        this.videoFrame.play();

        return;
      }

      this.videoFrame.pause();
    })
  }
}