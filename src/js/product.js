{
  const videoWrapper = document.querySelector('.product .video');
  const video = document.querySelector('.product video');
  const playButton = document.querySelector('.product button');

  playButton.addEventListener('click', togglePlay);

  function togglePlay() {
    if (video.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  }

  function playVideo() {
    video.play();
    videoWrapper.dataset.state = 'play';
  }

  function pauseVideo() {
    video.pause();
    videoWrapper.dataset.state = 'pause';
  }
}
