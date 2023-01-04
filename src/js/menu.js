{
  const menuButton = document.querySelector('header button.menu');
  const nav = document.querySelector('header nav');

  menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('open');
    nav.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
  });
}
