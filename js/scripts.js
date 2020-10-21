    (function($) {
        "use strict"; // Start of use strict

        // Preloader
        $(window).on('load', function () {
            if ($('#preloader').length) {
                $('#preloader').delay(100).fadeOut('slow', function () {
                    $(this).remove();
                });
            }
        });

        // Smooth scroll for the navigation menu and links with .scrollto classes
        var scrolltoOffset = $('#header').outerHeight() - 21;
        if (window.matchMedia("(max-width: 991px)").matches) {
            scrolltoOffset += 20;
        }
        $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function (e) {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                if (target.length) {
                    e.preventDefault();

                    var scrollto = target.offset().top - scrolltoOffset;

                    if ($(this).attr("href") == '#header') {
                        scrollto = 0;
                    }

                    $('html, body').animate({
                        scrollTop: scrollto
                    }, 1500, 'easeInOutExpo');

                    if ($(this).parents('.nav-menu, .mobile-nav').length) {
                        $('.nav-menu .active, .mobile-nav .active').removeClass('active');
                        $(this).closest('li').addClass('active');
                    }

                    if ($('body').hasClass('mobile-nav-active')) {
                        $('body').removeClass('mobile-nav-active');
                        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
                        $('.mobile-nav-overly').fadeOut();
                    }
                    return false;
                }
            }
        });

        // Activate smooth scroll on page load with hash links in the url
        $(document).ready(function () {

            //$('.expertise-div').hover(function () {
            //    $('.expertise-div').addClass('expertise-after');
            //}, function () {
            //    $('.expertise-div').removeClass('expertise-after');
            //});

            //ctrl+u disable
            document.onkeydown = function (e) {
                if (e.ctrlKey &&
                    (e.keyCode === 67 ||
                     e.keyCode === 86 ||
                     e.keyCode === 85 ||
                     e.keyCode === 117)) {
                    return false;
                } else {
                    return true;
                }
            };
            $(document).keypress("u", function (e) {
                if (e.ctrlKey) {
                    return false;
                }
                else {
                    return true;
                }
            });

            //right mouse click disable
            $(document).bind("contextmenu", function (e) {
                return false;
            });

            if (window.location.hash) {
                var initial_nav = window.location.hash;
                if ($(initial_nav).length) {
                    var scrollto = $(initial_nav).offset().top - scrolltoOffset;
                    $('html, body').animate({
                        scrollTop: scrollto
                    }, 1500, 'easeInOutExpo');
                }
            }
        });

        // Navigation active state on scroll
        var nav_sections = $('section');
        var main_nav = $('.nav-menu, .mobile-nav');

        $(window).on('scroll', function () {
            var cur_pos = $(this).scrollTop() + 200;

            nav_sections.each(function () {
                var top = $(this).offset().top,
                  bottom = top + $(this).outerHeight();

                if (cur_pos >= top && cur_pos <= bottom) {
                    if (cur_pos <= bottom) {
                        main_nav.find('li').removeClass('active');
                    }
                    main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
                }
                if (cur_pos < 300) {
                    $(".nav-menu ul:first li:first, .mobile-menu ul:first li:first").addClass('active');
                }
            });
        });

        // Mobile Navigation
        if ($('.nav-menu').length) {
            var $mobile_nav = $('.nav-menu').clone().prop({
                class: 'mobile-nav d-lg-none'
            });
            $('body').append($mobile_nav);
            $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
            $('body').append('<div class="mobile-nav-overly"></div>');

            $(document).on('click', '.mobile-nav-toggle', function (e) {
                $('body').toggleClass('mobile-nav-active');
                $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
                $('.mobile-nav-overly').toggle();
            });

            $(document).on('click', '.mobile-nav .drop-down > a', function (e) {
                e.preventDefault();
                $(this).next().slideToggle(300);
                $(this).parent().toggleClass('active');
            });

            $(document).click(function (e) {
                var container = $(".mobile-nav, .mobile-nav-toggle");
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    if ($('body').hasClass('mobile-nav-active')) {
                        $('body').removeClass('mobile-nav-active');
                        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
                        $('.mobile-nav-overly').fadeOut();
                    }
                }
            });
        } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
            $(".mobile-nav, .mobile-nav-toggle").hide();
        }

        // Toggle .header-scrolled class to #header when page is scrolled
        $(window).scroll(function () {
            if ($(this).scrollTop() > 200) {
                $('#header').addClass('header-scrolled');
                $('#topbar').addClass('topbar-scrolled');
            } else {
                $('#header').removeClass('header-scrolled');
                $('#topbar').removeClass('topbar-scrolled');
            }
        });

        if ($(window).scrollTop() > 200) {
            $('#header').addClass('header-scrolled');
            $('#topbar').addClass('topbar-scrolled');
        }

        // Back to top button
        $(window).scroll(function () {
            if ($(this).scrollTop() > 200) {
                $('.back-to-top').fadeIn('slow');
            } else {
                $('.back-to-top').fadeOut('slow');
            }
        });

        // Back to top button
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.back-to-top').fadeIn('slow');
            } else {
                $('.back-to-top').fadeOut('slow');
            }
        });

        $('.back-to-top').click(function () {
            $('html, body').animate({
                scrollTop: 0
            }, 1500, 'easeInOutExpo');
            return false;
        });

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 72)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  //// Activate scrollspy to add active class to navbar items on scroll
  //$('body').scrollspy({
  //  target: '#mainNav',
  //  offset: 75
  //});

  //// Collapse Navbar
  //var navbarCollapse = function() {
  //  if ($("#mainNav").offset().top > 600) {
  //    $("#mainNav").addClass("navbar-scrolled");
  //  } else {
  //    $("#mainNav").removeClass("navbar-scrolled");
  //  }
  //};
  //// Collapse now if page is not at top
  //navbarCollapse();
  //// Collapse the navbar when page is scrolled
  //$(window).scroll(navbarCollapse);

  // Magnific popup calls
  //$('#portfolio').magnificPopup({
  //  delegate: 'a',
  //  type: 'image',
  //  tLoading: 'Loading image #%curr%...',
  //  mainClass: 'mfp-img-mobile',
  //  gallery: {
  //    enabled: true,
  //    navigateByImgClick: true,
  //    preload: [0, 1]
  //  },
  //  image: {
  //    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
  //  }
  //});

        // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      items: 1
  });

        // Init AOS
  function aos_init() {
      AOS.init({
          duration: 1000,
          once: true
      });
  }
  $(window).on('load', function () {
      aos_init();
  });

})(jQuery); // End of use strict
