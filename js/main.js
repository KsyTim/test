$(document).ready(function () {
  function slider() {
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
  }

  slider();

  function countTimer(dDay) {
    function getTimeRemaining() {
      const dateStop = new Date(dDay).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 3600);
      function preNumber(num){
        if (num < 10) {
          return `0${num}`;
        } else {
          return num;
        }
      }
      return {
        timeRemaining,
        hours: preNumber(hours),
        minutes: preNumber(minutes),
        seconds: preNumber(seconds),
      };
    };
    function updateClock() {
      const timer = getTimeRemaining();
      $('#timer-hours').text(`${timer.hours}`);
      $('#timer-minutes').text(`${timer.minutes}`);
      $('#timer-seconds').text(`${timer.seconds}`);
      let clockTimeout;
      if (timer.timeRemaining > 0) {
        clockTimeout = setTimeout(() => {
          setTimeout(updateClock, 1000);
        });
      } else if (timer.timeRemaining <= 0) {
        clearTimeout(clockTimeout);
        $('#timer-hours').text('00');
        $('#timer-minutes').text('00');
        $('#timer-seconds').text('00');
        $('.timer-action').text('Акция завершена');
      }
    };
    updateClock();
  };

  countTimer('02 March 2022 17:30:00');

  
  $(document).on('input', function(e) {
    const target = e.target;
    if(target) {
      if(target.id === 'name') {
        target.value = target.value.replace(/^[0-9\s\W_]{0,1}/g, '').replace(/\W/g, '');
      } else if (target.id === 'phone') {
        target.value = target.value.replace(/\D/g, '');
        if(target.value.length === 12){
          target.value = target.value.substring(0,11);
        }
      }
    }
  })

  $('.buy-product-form input').each(function(index, elem){
    if(elem){
      $(elem).focusin(function(e) {
        const target = e.target;
        if(target.value.length === 0) {
          if(target.id === 'name') {
            $('.buy-product-name').addClass('active');
          } else if (target.id === 'phone') {
            $('.buy-product-phone').addClass('active');
          }
        }
      })
      $(elem).focusout(function(e) {
        const target = e.target;
        if(target.value.length === 0) {
          if(target.id === 'name') {
            if($('.buy-product-name').hasClass('active')) {
              $('.buy-product-name')[0].classList.remove('active');
            } 
          } else if (target.id === 'phone') {
            if($('.buy-product-phone').hasClass('active')) {
              $('.buy-product-phone')[0].classList.remove('active');
            }
          }
        }
      })
    }
  })

  $(document).on('change', function(e) {
    const target = e.target;
    if(target) {
      if(target.id === 'name') {
        if($('.buy-product-name').hasClass('active')) {
          $('.buy-product-name')[0].classList.remove('active');
        }      
      } else if (target.id === 'phone') {
        if($('.buy-product-phone').hasClass('active')) {
          $('.buy-product-phone')[0].classList.remove('active');
        }
      }
    }
  })
})