document.addEventListener('DOMContentLoaded', function() {
  const popup = document.querySelector('.video-popup-overlay');
  const videoPlayer = popup.querySelector('.video-popup-player');

  document.querySelectorAll('.video-preview').forEach(preview => {
    preview.addEventListener('click', function(e) {
      e.preventDefault();
      const videoSrc = this.getAttribute('data-video');

      videoPlayer.innerHTML = '';
      const source = document.createElement('source');
      source.src = videoSrc;
      source.type = 'video/mp4';
      videoPlayer.appendChild(source);


      videoPlayer.currentTime = 0;
      videoPlayer.controls = true; 
      videoPlayer.muted = false;   

      popup.style.display = 'flex';


      videoPlayer.load();

    });
  });


  document.querySelector('.video-popup-close').addEventListener('click', function() {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    popup.style.display = 'none';
  });

  popup.addEventListener('click', function(e) {
    if (e.target === this) {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
      this.style.display = 'none';
    }
  });
});