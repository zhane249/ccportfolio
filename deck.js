// referenced from https://www.youtube.com/watch?v=w9OpXh3K6YI
document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".swiper", {
    effect: "cards",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    loop: true,
    cardsEffect: {
      rotate: 0,    
      perSlideOffset: 10, 
      perSlideRotate: 2,
      slideShadows: false
    }
  });
});
