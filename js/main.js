$(document).ready(function () {
  const slide = (next) => {
    const currentSlide = $(".reviews-img.reviews-img-current");
    let currentSlideIndex = $(".reviews-img.reviews-img-current").index();
    const nextSlideIndex = next ? ++currentSlideIndex : --currentSlideIndex;
    const nextSlide = $(".reviews-img").eq(nextSlideIndex);
    currentSlide.fadeOut(100);
    currentSlide.removeClass("reviews-img-current");
    if (nextSlideIndex === $(".reviews-img:last").index() + 1) {
      $(".reviews-img").eq(0).fadeIn(100);
      $(".reviews-img").eq(0).addClass("reviews-img-current");
      $('.reviews-img-current').removeAttr('style');
    } else {
      nextSlide.fadeIn(100);
      nextSlide.addClass("reviews-img-current");
      $('.reviews-img-current').removeAttr('style');
    }
  }
  let interval;
  const autoplay = () => {
    interval = setTimeout(function(){
      slide(true);
      autoplay();
    }, 3000);
  };
  autoplay();
  $(document).click(function(e) {
    if (e && e.target.closest('div')) {
      if (e.target.closest('div').matches('.reviews-next')) {
        e.preventDefault();
        slide(true);
      } else if (e.target.closest('div').matches('.reviews-prev')) {
        e.preventDefault();
        slide();
      } else if (e.target.matches('.buy-product-button')){
        e.preventDefault();
        let res = [];
        $('.buy-product-form input').each(function(index, elem){
          res.push(elem.value ? true : false);
        })
        if (res.includes(false)) {
          $('.buy-product-name').addClass('active');
          $('.buy-product-phone').addClass('active');
        } else {
          location.reload();
        }
        console.log(res.includes(false) ? '' : 'order');
      }  
    }
  })
  const mouseHandler = (elem, handler) => {
    if (handler === 'over') {
      $(elem).mouseover(function(e){
        e.preventDefault();
        clearTimeout(interval);
      });
    } else if (handler === 'leave') {
      $(elem).mouseleave(function(e){
        e.preventDefault();
        autoplay();
      });
    }
  }
  mouseHandler('.reviews-next', 'over');
  mouseHandler('.reviews-next', 'leave');
  mouseHandler('.reviews-prev', 'over');
  mouseHandler('.reviews-prev', 'leave');
  mouseHandler('.reviews-img-current', 'over');
  mouseHandler('.reviews-img-current', 'leave');

  const eventKey = (e) => {
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
  const countTimer = (dDay) => {
    const getTimeRemaining = () => {
      const dateStop = new Date(dDay).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 3600),
        preNumber = (num) => num < 10 ? `0${num}` : num;
      return {
        timeRemaining,
        hours: preNumber(hours),
        minutes: preNumber(minutes),
        seconds: preNumber(seconds),
      }
    }
    const updateClock = () => {
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

  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const validate = (num) => num < 10 ? `0${num}` : num;
  let date = new Date();
  const localTimeZone = -(new Date().getTimezoneOffset()*60000);
  date = date.getTime() + 30*60000 + localTimeZone;
  const second  = parseInt(date / 1000) % 60;
  const minute  = parseInt((date / 60) / 1000) % 60;
  const hour = Math.floor(date/(1000*60*60)) % 24;

  countTimer(`${validate(new Date().getDate())} ${month[new Date().getMonth()]} ${new Date().getFullYear()} ${validate(hour)}:${validate(minute)}:${validate(second)}`);

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