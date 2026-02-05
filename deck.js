// referenced from https://www.youtube.com/watch?v=w9OpXh3K6YI
document.addEventListener("DOMContentLoaded", () => {
  let isDragging = false;

  const swiper = new Swiper(".swiper", {
    effect: "cards",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    loop: true,
    cardsEffect: {
      rotate: 0,
      perSlideOffset: 10,
      perSlideRotate: 2,
      slideShadows: false,
    },
    on: {
      touchMove() {
        isDragging = true;
      },
      touchEnd() {
        setTimeout(() => {
          isDragging = false;
        }, 100);
      },
    },
  });

 
  document.querySelector(".swiper").addEventListener("click", () => {
    if (isDragging) return;

    const activeSlide = document.querySelector(".swiper-slide-active");
    if (!activeSlide) return;

    const card = activeSlide.querySelector(".card");
    if (!card) return;

    const link = card.dataset.link;
    if (link) {
      window.location.href = link;
    }
  });
});
