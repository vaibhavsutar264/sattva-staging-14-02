$('#playPause').on('click', function(){
  $(this).toggle('.fa-pause-circle')
})

$(document).on('click', '#newVideoGoBack', function () {
  window.history.back();
});

$(document).on(
  'click',
  '.view-course-accordion .accordion .item .heading',
  function () {
    var a = $(this).closest('.item');
    var b = $(a).hasClass('open');
    var c = $(a).closest('.accordion').find('.open');

    if (b != true) {
      $(c).find('.content').slideUp(200);
      $(c).removeClass('open');
    }

    $(a).toggleClass('open');
    $(a).find('.content').slideToggle(200);
  }
);

document.addEventListener('DOMContentLoaded', function () {
  jQuery('.preloader-background').delay(1700).fadeOut('slow');

  jQuery('.preloader-wrapper').delay(1700).fadeOut();
});
jQuery(window).scroll(function () {
  // $('.logo-image').hide();
  var scroll = jQuery(window).scrollTop();
  if (scroll >= 100) {
    jQuery('header').addClass('bgwhite');
    // $('.logo-image').show();
  } else {
    jQuery('header').removeClass('bgwhite');
    // $('.logo-image').hide();
  }
});
// jQuery(document).ready(function () {
//   jQuery('#connectslider, #sattvatestimonial').owlCarousel({
//     items: 1,
//     autoplay: false,
//     loop: true,
//     smartSpeed: 2000,
//     autoplayTimeout: 15000,
//     nav: true,
//     dots: false,
//   });
//   jQuery('.events-carousel').owlCarousel({
//     loop: true,
//     margin: 10,
//     responsiveClass: true,
//     dots: false,
//     responsive: {
//       0: {
//         items: 1,
//         nav: true,
//       },
//       600: {
//         items: 3,
//         nav: false,
//       },
//       1000: {
//         items: 6,
//         nav: true,
//         loop: false,
//       },
//     },
//   });
//   $('#graduationDate').datepicker({
//     format: 'mm/dd/yyyy',
//     startDate: '-1d',
//   });
// });

jQuery(document).ready(function () {
  //   jQuery('.course-slider').owlCarousel({
  //     loop: true,
  //     margin: 20,
  //     dots: false,
  //     responsiveClass: true,
  //     responsive: {
  //       0: {
  //         items: 1,
  //         nav: true,
  //       },
  //       600: {
  //         items: 3,
  //         nav: false,
  //       },
  //       1000: {
  //         items: 4,
  //         nav: true,
  //         loop: false,
  //       },
  //     },
  //   });
});

// jQuery('#sattvatestimonial').owlCarousel({
//   items: 1,
//   autoplay: false,
//   loop: true,
//   smartSpeed:1500,
//   nav: true,
//   dots: false,
// });

$('.modal').on({
  mousewheel: function (e) {
    if (e.target.id == 'el') return;
    e.preventDefault();
    e.stopPropagation();
  },
});

$('[data-show="more"]').on('click', function (event) {
  event.preventDefault();
  if ($(this).attr('more-collapse') === 'false') {
    $(this).attr('more-collapse', 'true');
    $(this).prev('.more-text').removeClass('hide');
    $(this).text('Read Less');
  } else {
    $(this).text('Read More');
    $(this).attr('more-collapse', 'false');
    $(this).prev('.more-text').addClass('hide');
  }
});

$(document).on('change', '.paymentMethod', function () {
  if ($(this).val() == 1) {
    $('.creditCardDiv').show();
    $('.paypal').hide();
  } else {
    $('.creditCardDiv').hide();
    $('.paypal').show();
  }
});

$(document).on('click', '.free-reg', function () {
  $('html, body').animate(
    {
      scrollTop: $('#main-registration').offset().top,
    },
    2000
  );
});

$(document).on('click', '.tesimonial .owl-dots button.owl-dot', function () {
  var index = $('.owl-dot').index(this);
  $('.testimonial_ul li span').removeClass('active');
  $('.testimonial_ul li').eq(index).find('span').addClass('active');
});

$(document).on('click', '.play_button_image', function () {
  $(this).parent().hide();
  $(this)
    .parent()
    .parent()
    .find('.displayNonDiv')
    .find('.moduleContent')
    .show();
  $('video').trigger('pause');
  $(this)
    .parent()
    .parent()
    .find('.displayNonDiv')
    .find('.moduleContent')
    .get(0)
    .play();
});

// js added by hitesh

$(document).on('click', '#sidebarCollapse', function () {
  $('#sidebar').toggleClass('navmbl');
});

$(document).on('click', '#nav-link li', function () {
  $('#sidebar').removeClass('navmbl');
});

$("#nav-link").click(function(){
  $("#sidebar").removeClass("navmbl");
});

$(document).on('click', '.closeVideo', function () {
  var src = $(this).parents('.modal-content').find('iframe').attr('src');
  $(this).parents('.modal-content').find('iframe').attr('src', '');
  $(this).parents('.modal-content').find('iframe').attr('src', src);
  //$(".videoPlayer").find("video").jwplayer().stop();
});

$(document).on('click', '.closeAudio', function () {
  $('audio').trigger('pause');
});

$(document).on('click', '.chapter-disc', function () {
  $(this).toggleClass('rem-elips');
  $(this).find('.chapter-readmore').toggle();
});
$(document).on('click', '.showModalVideo', function () {
  var src = $(this).attr('data-src');
  $('#videoIframe').attr('src', src);
});

$(document).on('click', '.showAudioModal', function () {
  var src = $(this).attr('data-src');
  var thumbnail = $(this)
    .parents('.videos-newtabs')
    .find('.thumbnailImage')
    .attr('src');
  $('#audioModalImage').attr('src', thumbnail);
  var html =
    '<audio class="audio" src="' +
    src +
    '" controls><p>Fallback content goes here.</p></audio>';
  $('#audioDiv').html(html);
});

document.addEventListener('contextmenu', (event) => event.preventDefault());
$(document).keydown(function (e) {
  if (e.which === 123) {
    return false;
  }
});

$(document).on('hidden.bs.modal', '.modal', function () {
  var src = $(this).find('iframe').attr('src');
  $(this).find('iframe').attr('src', ' ');
  $(this).find('iframe').attr('src', src);
});

$(document).on('click', '#viewVideo', function () {
  var src = $(this).attr('data-src');
  $('#videoIframe').attr('src', src);
});

$(document).on('click', '#courseVIdeo', function () {
  var src = $(this).attr('data-src');
  var vTitle = $(this).attr('data-title');
  var vDesc = $(this).attr('data-description');

  $('#courseVidUrl').attr('src', src);
  $('#courseVidTitle').html(vTitle);
  $('#courseVidDesc').html(vDesc);
});

$(document).on('click', '#courseVideoTwo', function () {
  var src = $(this).attr('data-src');

  $('#courseVidUrl2').attr('src', src);
});

$(document).on('click', '.nextChapterBtn', function () {
  //alert('Hello');
  $(this)
    .parents('.accordion__item')
    .find('.accordion__panel')
    .attr('hidden', true);
  $(this)
    .parents('.accordion__item')
    .find('.accordion__heading')
    .find('.accordion__button')
    .attr('aria-expanded', false);
  $(this)
    .parents('.accordion__item')
    .next()
    .find('.accordion__heading')
    .find('.accordion__button')
    .attr('aria-expanded', true);
  $(this)
    .parents('.accordion__item')
    .next()
    .find('.accordion__panel')
    .removeAttr('hidden');
});

// $(document).on('click', '.accordion__heading', function () {
//   //alert('Hello');
//   $('.accordion__item').find('.accordion__panel').attr('hidden', true);
//   $('.accordion__item')
//     .find('.accordion__heading')
//     .find('.accordion__button')
//     .attr('aria-expanded', false);
// });

$(document).on('click', '#courseRatingStar', function () {
  //alert('Hello');
  $('.accordion__item').find('.accordion__panel').attr('hidden', true);
  $('.accordion__item')
    .find('.accordion__heading')
    .find('.accordion__button')
    .attr('aria-expanded', false);
  $('.accordion__item')
    .last()
    .find('.accordion__heading')
    .find('.accordion__button')
    .attr('aria-expanded', true);
  $('.accordion__item').last().find('.accordion__panel').removeAttr('hidden');
});

$(document).on('click', '.showMoreSchedule', function () {
  $(this).parent().find('.allSchedule').show();
  //$(this).parent().find('.singleSchedule').hide();
  $(this).html("VIEW LESS <i class='fa fa-angle-up' aria-hidden='true'></i>");
  $(this).removeClass('showMoreSchedule');
  $(this).addClass('showLessSchedule');
});

$(document).on('click', '.showLessSchedule', function () {
  $(this).parent().find('.allSchedule').hide();
  $(this).parent().find('.singleSchedule').show();
  $(this).html("VIEW MORE <i class='fa fa-angle-down' aria-hidden='true'></i>");
  $(this).removeClass('showLessSchedule');
  $(this).addClass('showMoreSchedule');
});



$(document).ready(function () {
  // $('#sidebarCollapse').on('click', function () {
  //     $('#sidebar').toggleClass('active');
  // });
  $('.btn-notes').on('click', function () {
      event.preventDefault();
      $('.notes-content').toggleClass('active');
  });
  $('.close-notes').on('click', function () {
      event.preventDefault();
      $('.notes-content').removeClass('active');
  });
  
});

$(document).on('click','.notification-btn', function () {
  event.preventDefault();
  $('.notification-content').toggleClass('active');
});

$("#sidebar").hover(function () {
  $(this).removeClass("active");
});
$(document).ready(function(){
  $('[data-toggle="popover"]').popover();   
});
$("#sidebar").hover(function () {
  $(this).removeClass("active");
});
$(document).ready(function(){
  $('[data-toggle="popover"]').popover();   
});


$(".pop").popover({ trigger: "manual" , html: true, animation:false})
    .on("mouseenter", function () {
        var _this = this;
        $(this).popover("show");
        $(".popover").on("mouseleave", function () {
            $(_this).popover('hide');
        });
    }).on("mouseleave", function () {
        var _this = this;
        setTimeout(function () {
            if (!$(".popover:hover").length) {
                $(_this).popover("hide");
            }
        }, 300);
});



// $(document).on('click', '.notify-content button', function(){
//   $(this).parent().parent().remove();
//   event.preventDefault();
// });
  

var outputArea = $("#chat-output");
  $("#user-input-form").on("submit", function (e) {
    e.preventDefault();
    var message = $("#user-input").val();
    outputArea.append(`<div class='bot-message'><div class='message'>${message}</div></div>`);   
    $("#user-input").val("");
  });


// Player Designer Js
//like & shuffle button
  $(document).on('click','.heart',function(e){
    $(this).toggleClass('clicked');
  });


$(document).on('click', '.shuffle', function(){
  $(this).toggleClass('clicked');
});

//show info box on hover
$(document).on('mouseenter', '.playerView', function(){ 
  $('.info').toggleClass('up');
});


//music player settings

let audio = new Audio('http://music.dawnfoxes.com/_fxs_/_upls_/_sngs_/UK/clean_bandit-symphony-ft-zara_larsson.mp3');

// $('.pause').hide(); 
$(".pause").css("display", "none");

//play button
$(document).on('click', '.play', function(){
  audio.play();
  $('.play').hide();
  $('.pause').show();
});

//pause button
$(document).on('click', '.pause', function(){
  audio.pause();
  $('.play').show();
  $('.pause').hide();
});


  jQuery('#enxScreen').contents().find('#joinRoomByPin').attr('style', 'color: ' + 'red' + ' !important');
