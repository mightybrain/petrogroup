class CustomVideo {
  constructor(element) {
    this.element = element;
    this.videoFrame = element.querySelector('video');
    this.playBtn = element.querySelector('.js-play-btn');

    this.init()

    this.timeout = null;
  }

  playVideo() {
    this.videoFrame.play()

    this.videoFrame.setAttribute('data-played', '');
  }

  pauseVideo() {
    this.videoFrame.pause();

    this.videoFrame.removeAttribute('data-played');
  }

  init() {
    this.element.addEventListener('mouseenter', () => {
      this.timeout = setTimeout(() => {
        this.playVideo()
      }, 5000)
    })

    this.element.addEventListener('mouseleave', () => {
      clearTimeout(this.timeout)
    })

    this.videoFrame.addEventListener('click', () => {
      if (this.videoFrame.paused) {
        this.playVideo();

        return;
      }

      this.pauseVideo();
    })
  }
}