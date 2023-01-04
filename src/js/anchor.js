{
  const header = document.querySelector('header.header');
  const sections = Array.from(document.querySelectorAll('section'));
  const anchors = Array.from(
    document.querySelectorAll('header.header a.anchor')
  );

  document
    .querySelectorAll('a.anchor')
    .forEach((anchor) => anchor.addEventListener('click', handleAnchorClick));

  function handleAnchorClick(event) {
    event.preventDefault();
    const anchor = event.target;
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) {
      return;
    }

    const headerHeight = header.offsetHeight;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, targetPosition - headerHeight);
  }

  const options = {
    rootMargin: `-${header.offsetHeight}px 0px 0px 0px`,
  };

  let scrollPrevPos = 0;
  let scrollDirection;

  function setScrollDirection() {
    if (window.scrollY > scrollPrevPos) {
      scrollDirection = 'down';
    } else {
      scrollDirection = 'up';
    }
    scrollPrevPos = window.scrollY;
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    setScrollDirection();

    let activeSection;

    if (scrollDirection === 'down') {
      let entry = entries.find((entry) => !entry.isIntersecting);

      if (!entry) {
        return;
      }

      const outSectionIndex = sections.indexOf(entry.target);
      if (outSectionIndex === sections.length - 1) {
        return;
      }

      activeSection = sections[outSectionIndex + 1];
    } else {
      let entry = entries.find((entry) => entry.isIntersecting);

      if (!entry) {
        return;
      }

      activeSection = entry.target;
    }

    anchors.forEach((anchor) => anchor.classList.remove('active'));

    const activeAnchor = anchors.find(
      (anchor) => anchor.getAttribute('href') === `#${activeSection.id}`
    );

    if (!activeAnchor) {
      return;
    }

    activeAnchor.classList.add('active');
  }, options);

  sections.forEach((section) => sectionObserver.observe(section));
}
