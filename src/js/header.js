{
  const header = document.querySelector('header.header');

  function scrollHandler() {
    if (window.scrollY > 0) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  }

  scrollHandler = throttle(scrollHandler, 500);
  window.addEventListener('scroll', scrollHandler);
}
