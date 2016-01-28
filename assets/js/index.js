/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();
        $(".block-blog-description").show_description();
        $("#sidebar .facebook-page").show_facebook_msg();
    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };

    $.fn.show_description = function (options) {
        var defaults = {
                elem: $(this)
            },
        allOptions = $.extend(defaults, options),
        hide = function() {
            $(allOptions.elem).addClass("closed");
        },
        show = function() {
            $(allOptions.elem).removeClass("closed");
        }
        $(allOptions.elem).find(".block-button").click(function(event) {
            if($(allOptions.elem).hasClass("closed")) {
                show();
            } else {
                hide();
            }
        });

        if (Cookies.get('showAbout') === "true" || typeof Cookies.get('showAbout') === 'undefined') {
            show();
            Cookies.set('showAbout', 'false');
        }
    }

    $.fn.show_facebook_msg = function (options) {
        var defaults = {
                elem: $(this)
            },
            allOptions = $.extend(defaults, options),
            hide = function() {
                $(allOptions.elem).addClass("closed");
            },
            show = function() {
                $(allOptions.elem).removeClass("closed");
            }

        $(".btn-show-fb-message").click(function(event) {
            if($(allOptions.elem).hasClass("closed")) {
                show();
                Cookies.set('showShowFBMesage', 'true', { expires: 7 });
            }
        });

        $(".btn-hide-fb-message").click(function(event) {
            if(!$(allOptions.elem).hasClass("closed")) {
                hide();
                Cookies.set('showShowFBMesage', 'false', { expires: 7 });
            }
        });

        if (Cookies.get('showShowFBMesage') === "true" || typeof Cookies.get('showShowFBMesage') === 'undefined') {
            show();
        }
    }
})(jQuery);