    $('.accueil').click(function(e){
        $('.opponents').fadeOut(200)
        $('.connectedopponents').fadeOut(200)
        $('.leftcontent').delay( 200 ).fadeIn(200)
        $('.findopponent').removeClass('active');
        $('.accueil').addClass('active');
    });

    $('.findopponent').click(function(e){
        $('.opponents').delay( 200 ).fadeIn(200)
        $('.connectedopponents').delay( 200 ).fadeIn(200)
        $('.leftcontent').fadeOut(200)
        $('.accueil').removeClass('active');
        $('.findopponent').addClass('active');  
    });

 	$('.arrowleft').click(function(e){
        $('.opponents').delay( 200 ).fadeToggle(200)
        $('.connectedopponents').delay( 200 ).fadeToggle(200)
        $('.leftcontent').delay( 200 ).fadeToggle(200)
        $('.accueil').toggleClass('active');
        $('.findopponent').toggleClass('active');  
    });

    $('.arrowright').click(function(e){
        $('.opponents').delay( 200 ).fadeToggle(200)
        $('.connectedopponents').delay( 200 ).fadeToggle(200)
        $('.leftcontent').delay( 200 ).fadeToggle(200)
        $('.accueil').toggleClass('active');
        $('.findopponent').toggleClass('active');  
    });

    $('.nameuser').click(function(e){
        $('.opponents').fadeOut(200)
        $('.connectedopponents').fadeOut(200)
        $('.leftcontent').fadeOut(200)
        $('.accueil').fadeOut(200)
        $('.playIA').fadeOut(200)
        $('.findopponent').fadeOut(200)
        $('.arrowright').fadeOut(200)
        $('.arrowleft').fadeOut(200)
        $('.arrowback').delay( 200 ).fadeIn(200)
        $('.return_profile').delay( 200 ).fadeIn(200)
        $('.profileview').delay( 200 ).fadeIn(200)
        $('.info_profile_view').delay( 200 ).fadeIn(200)

    });

     $('.arrowback').click(function(e){
        $('.opponents').delay( 200 ).fadeIn(200)
        $('.connectedopponents').delay( 200 ).fadeIn(200)
        $('.leftcontent').delay( 200 ).fadeIn(200)
        $('.accueil').delay( 200 ).fadeIn(200)
        $('.playIA').delay( 200 ).fadeIn(200)
        $('.findopponent').delay( 200 ).fadeIn(200)
        $('.arrowright').delay( 200 ).fadeIn(200)
        $('.arrowleft').delay( 200 ).fadeIn(200)
        $('.arrowback').fadeOut(200)
        $('.return_profile').fadeOut(200)
        $('.profileview').fadeOut(200)
        $('.accueil').addClass('active');
        $('.findopponent').removeClass('active');
        $('.info_profile_view').fadeOut(200)  
    });

     $('.return_profile').click(function(e){
        $('.opponents').delay( 200 ).fadeIn(200)
        $('.connectedopponents').delay( 200 ).fadeIn(200)
        $('.leftcontent').delay( 200 ).fadeIn(200)
        $('.accueil').delay( 200 ).fadeIn(200)
        $('.playIA').delay( 200 ).fadeIn(200)
        $('.findopponent').delay( 200 ).fadeIn(200)
        $('.arrowright').delay( 200 ).fadeIn(200)
        $('.arrowleft').delay( 200 ).fadeIn(200)
        $('.arrowback').fadeOut(200)
        $('.return_profile').fadeOut(200)
        $('.profileview').fadeOut(200)
        $('.accueil').addClass('active');
        $('.findopponent').removeClass('active');  
        $('.info_profile_view').fadeOut(200)
    });

    $('.friendsmenu').click(function(e){
        $('.players').fadeOut(200)
        $('.morescores').fadeOut(200) 
        $('.search_results').fadeOut(200)
        $('.friendsconnected').delay( 200 ).fadeIn(200)
        $('.friendsconnected_title').delay( 200 ).fadeIn(200)
        $('.friendsmenu').addClass('active');
        $('.bestplayersmenu').removeClass('active');
        $('.results_searchmenu').removeClass('active');
    });

    $('.bestplayersmenu').click(function(e){
        $('.friendsconnected').fadeOut(200)
        $('.friendsconnected_title').fadeOut(200)
        $('.search_results').fadeOut(200)
        $('.players').delay( 200 ).fadeIn(200)
        $('.morescores').delay( 200 ).fadeIn(200)
        $('.bestplayersmenu').addClass('active');
        $('.friendsmenu').removeClass('active');
        $('.results_searchmenu').removeClass('active');

    });

    $('.results_searchmenu').click(function(e){
        $('.players').fadeOut(200)
        $('.morescores').fadeOut(200) 
        $('.friendsconnected').fadeOut(200)
        $('.friendsconnected_title').fadeOut(200)
        $('.search_results').delay( 200 ).fadeIn(200)
        $('.results_searchmenu').addClass('active');
        $('.bestplayersmenu').removeClass('active');
        $('.friendsmenu').removeClass('active');
    });

    $('.ad4').click(function(e){
        $('.popin').show();
        $('.pop_search_19x19').show();
    });

    $('.ad3').click(function(e){
        $('.popin').show();
        $('.pop_search_13x13').show();
    });

    $('.ad2').click(function(e){
        $('.popin').show();
        $('.pop_search_9x9').show();
    });

    $('.startgame').click(function(e){
        $('.popin').show();
        $('.chooseroom').show();
    });

    $('.exit').click(function(e){
        $('.popin').hide();
        $('.pop_search_19x19').hide();
        $('.pop_search_13x13').hide();
        $('.pop_search_9x9').hide();
        $('.chooseroom').hide();
        $('.chooseroomB').hide();
        $('.pop_accept_match_13x13').hide();
        $('.pop_accept_match_19x19').hide();
        $('.pop_accept_match_9x9').hide();
        $('.pop_friend_occuped').hide();
        $('.pop_friend_poked').hide();
    });

    $('.defisSelected').click(function(e){
        $('.popin').hide();
        $('.pop_search_19x19').hide();
        $('.pop_search_13x13').hide();
        $('.pop_search_9x9').hide();
        $('.chooseroom').hide();
        $('.chooseroomB').hide();
        $('.pop_accept_match_13x13').hide();
        $('.pop_accept_match_19x19').hide();
        $('.pop_accept_match_9x9').hide();
        $('.pop_friend_occuped').hide();
        $('.pop_friend_poked').hide();
    });

    $('.popin').click(function(e){
        $('.popin').hide();
        $('.pop_search_19x19').hide();
        $('.pop_search_13x13').hide();
        $('.pop_search_9x9').hide();
        $('.chooseroom').hide();
        $('.chooseroomB').hide();
        $('.pop_accept_match_13x13').hide();
        $('.pop_accept_match_19x19').hide();
        $('.pop_accept_match_9x9').hide();
        $('.pop_friend_occuped').hide();
        $('.pop_friend_poked').hide();
    });

    var opts = {
      lines: 17 // The number of lines to draw
    , length: 5 // The length of each line
    , width: 17 // The line thickness
    , radius: 56 // The radius of the inner circle
    , scale: 0.3 // Scales overall size of the spinner
    , corners: 1 // Corner roundness (0..1)
    , color: '#fff' // #rgb or #rrggbb or array of colors
    , opacity: 0.05 // Opacity of the lines
    , rotate: 0 // The rotation offset
    , direction: 1 // 1: clockwise, -1: counterclockwise
    , speed: 0.9 // Rounds per second
    , trail: 90 // Afterglow percentage
    , fps: 15 // Frames per second when using setTimeout() as a fallback for CSS
    , zIndex: 2e9 // The z-index (defaults to 2000000000)
    , className: 'spinner' // The CSS class to assign to the spinner
    , top: '50%' // Top position relative to parent
    , left: '50%' // Left position relative to parent
    , shadow: false // Whether to render a shadow
    , hwaccel: false // Whether to use hardware acceleration
    , position: 'relative' // Element positioning
    }
    var target1 = document.querySelector('.loading1')
    var spinner = new Spinner(opts).spin(target1);

    var target2 = document.querySelector('.loading2')
    var spinner = new Spinner(opts).spin(target2);

    var target3 = document.querySelector('.loading3')
    var spinner = new Spinner(opts).spin(target3);

    var searchbar = document.querySelector(".searchbar");

    searchbar.onkeyup=function(){
        if (searchbar.value == "") {
            $('.friendsconnected').fadeOut(200)
            $('.friendsconnected_title').fadeOut(200)
            $('.search_results').fadeOut(200)
            $('.players').delay( 300 ).fadeIn(200)
            $('.morescores').delay( 300 ).fadeIn(200)
            $('.bestplayersmenu').addClass('active');
            $('.friendsmenu').removeClass('active');
            $('.results_searchmenu').hide();
        }
        else {
            $('.players').fadeOut(200)
            $('.morescores').fadeOut(200) 
            $('.friendsconnected').fadeOut(200)
            $('.friendsconnected_title').fadeOut(200)
            $('.search_results').delay( 300 ).fadeIn(200)
            $('.results_searchmenu').addClass('active');
            $('.results_searchmenu').show();
            $('.bestplayersmenu').removeClass('active');
            $('.friendsmenu').removeClass('active');
            document.querySelector(".typedsearch").innerHTML= searchbar.value;
            lookFor(racine,input.value,0); // We refresh positions
            return false;
        }
    };