$(".reviews-next").click(function(e){
  e.preventDefault();
  toNextSlide();
});

function toNextSlide() {
  var currentSlide = $(".reviews-img.reviews-img-current");
  var currentSlideIndex = $(".reviews-img.reviews-img-current").index();
  var nextSlideIndex = currentSlideIndex + 1;
  var nextSlide = $(".reviews-img").eq(nextSlideIndex);
  currentSlide.fadeOut(100);
  currentSlide.removeClass("reviews-img-current");

  if (nextSlideIndex == $(".reviews-img:last").index() + 1) {
    $(".reviews-img").eq(0).fadeIn(100);
    $(".reviews-img").eq(0).addClass("reviews-img-current");
    $('.reviews-img-current').removeAttr('style');
  } else {
    nextSlide.fadeIn(100);
    nextSlide.addClass("reviews-img-current");
    $('.reviews-img-current').removeAttr('style');
  }
}

$(".reviews-prev").click(function(e){
  e.preventDefault();
  toPrevSlide();
});

function toPrevSlide() {
  var currentSlide = $(".reviews-img.reviews-img-current");
  var currentSlideIndex = $(".reviews-img.reviews-img-current").index();
  var prevSlideIndex = currentSlideIndex - 1;
  var prevSlide = $(".reviews-img").eq(prevSlideIndex);
  currentSlide.fadeOut(100);
  currentSlide.removeClass("reviews-img-current");
  prevSlide.fadeIn(100);
  prevSlide.addClass("reviews-img-current");
  $('.reviews-img-current').removeAttr('style');
}

setInterval(toNextSlide, 3000);

function eventKey(e) {
  switch (e.keyCode) {
    case 37:
      toPrevSlide();
      break;

    case 39:
      toNextSlide();
      break;
  }
}
$(document).on("keydown", eventKey);
