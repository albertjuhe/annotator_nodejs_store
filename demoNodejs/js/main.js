
(function(window, document, undefined) {

    var doc = document.documentElement;
    var adjustTimeout; // Timeout for prevent IE fires multiple resize events crashing.
    
    /* Aux methods */
    var hasParent = function(el, id)
    {
        if (el) {
            do {
                if (el.id === id) {
                    return true;
                }
                if (el.nodeType === 9) {
                    break;
                }
            }
            while((el = el.parentNode));
        }
        return false;
    };

    var initMasonry = function(){
        var $container = $('.authors');
        $container.imagesLoaded( function(){
            $container.masonry({
                itemSelector : '.box',
                isAnimated: !Modernizr.csstransitions,
                columnWidth: function( containerWidth ) {
                    //console.log(containerWidth);
                    var w = Math.round(containerWidth/4);
                    var bw = w - 30;

                    if( containerWidth  > 920) {
                       $('.box').width(bw);
                       return w;
                    }   
     
                    if( containerWidth <= 920 && containerWidth > 550) {
                        w = Math.round(containerWidth/3)-1;
                        bw = w - 20;
                    } else if(containerWidth == 704) {
                        w = Math.round(containerWidth/2);
                        bw = w - 20;
                    }else{
                        w = containerWidth;
                        bw = w;
                    }

                    $('.box').width(bw);
                    return w;
                }
            });
        });
    };

    var adjustResize = function(){
         if (navigator.userAgent.match(/msie/i) ) {
            if (!adjustTimeout)
                adjustTimeout = setTimeout( function() { resizeBar(); adjustTimeout = null; }, 50 );
        }else {
            resizeBar();
        }
    };

    var resizeBar = function(){
        var top = $('.navbar-inner').height();
        var total = $("#position-bar > .nav").children(':not(.visuallyhidden)').length;
        var winh = ($(window).height());
        var itemh = 100/total;

        $('#position-bar').css({
            'top' : top + 'px',
            'height' : (winh-top) + 'px'
        });

        $( "#position-bar > .nav > li:not(.visuallyhidden)" ).each(function(){
            $(this).css({'height': itemh + '%'});
        });

        $( "#container").css({'padding-top': (top + 30)+'px'});

        resizeProgress();

    };

    var resizeProgress = function(){
        var offset_bar = $('#position-bar').offset();
        var active_li = $("#position-bar > .nav > li.active");
        var offset_li = 0

        if(active_li.length>0){
            offset_li = active_li.offset();
            $('#position-bar .progress').css({
                'height' : (offset_li.top - offset_bar.top) + 'px'
            });
        }
    }


    window.App = (function() {

        var _init = false, app = { };
        var inner = document.getElementById('inner-wrap');
            nav_open = false,
            nav_class = 'js-nav';
        var tips_tpl = '<div class="tooltip uoctip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>';


        app.init = function()
        {
            if (_init) {
                return;
            }
            _init = true;


            /* App Navigation */

            app.closeNav =function()
            {
                if (nav_open) nav_open = false;
                $(doc).removeClass(nav_class)
            };

            app.openNav = function()
            {
                if (nav_open) return;
                if(!$(doc).hasClass(nav_class)) $(doc).addClass(nav_class);
                nav_open = true;
            };

            app.toggleNav = function(e)
            {
                if (nav_open && $(doc).hasClass(nav_class)) {
                    app.closeNav();
                } else {
                    app.openNav();
                }
                if (e) {
                    e.preventDefault();
                }
            };

            $('#nav-open-btn').on('click', function(e){
                e.preventDefault();
                app.toggleNav();
            });

            $('#nav-close-btn').on('click', function(e){
                e.preventDefault();
                app.toggleNav();
            });

            $(document).on('mousedown', function(e){
                if (nav_open && !hasParent(e.target, 'nav')) {
                    e.preventDefault();
                    app.closeNav();
                }
            });

            $(doc).addClass('js-ready');


            /* Init ToolTips */

            // Tooltips (navbar)
            $('#nav-content').tooltip({
              selector:'[rel=tooltip]',
              template: tips_tpl,
              placement: function(a, element) {
                var w = $(window).width();
                //console.log(w);
                if(w < 768) {
                    return 'right';
                }
                return "bottom";
              }
            });

            // Tooltips (position-bar)
            $('#position-bar').tooltip({
              selector:'[rel=tooltip]',
              template: tips_tpl,
              placement: 'right'
            });

            // Tooltips (content)
            $('#content').tooltip({
              selector:'[rel=tooltip]',
              template: tips_tpl,
              placement: 'top'
            });


            /* Config Position Bar */
            $("#position-bar > .nav > li").on('activate', function() {
               resizeProgress();
            });
            
            $('#position-bar > .nav > li > a').click(function(ev) {
                var offset =  $('.navbar-inner').height() - 50;
                var $elm =$($(this).attr('href'));
                if($elm.hasClass("sect2")) offset += 30;
                ev.preventDefault();
                $elm[0].scrollIntoView();
                scrollBy(0, -offset);
            });

            $(window).on('resize', adjustResize );
            adjustResize();

            $('[data-spy="scroll"]').each(function () {
               $(this).scrollspy({'target': '#position-bar', 'offset': 550 });
            });

            /* Init jQuery Masonry for dynamic layout */
            initMasonry();

            /* Make code pretty */
            window.prettyPrint && prettyPrint()

        };

        return app;

    })();

    $.fn.ready(function()
    {
        // Init App
        window.App.init();

    });

})(window, window.document);



