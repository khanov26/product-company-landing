{
  const swiper = new Swiper('.feedback .slider', {
    pagination: {
      el: '.feedback .controls',
      clickable: true,
      renderBullet: function (index, className) {
        return `<button class="${className}">${index + 1}</button>`;
      },
    },
  });
}
