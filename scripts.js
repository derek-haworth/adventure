// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 2;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}

// Cache selectors
var lastId,
    topMenu = $("#top-menu"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 900);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
   }    
   // NAV TRANSITION AND ANIMATION
   var navHeight = $('header').outerHeight();
   var sectionHeight = $('.bannerBG').outerHeight() - navHeight;
   var headerHeight = 400;

   if ($(document).scrollTop() > sectionHeight){
     $("header").css("background-color", "#E1E1E1");
   } else if ($(document).scrollTop() < (sectionHeight - headerHeight)) {
     $("header").css("background-color", "rgba(34,34,34,0.2)");
   } else {
     $("header").css("background-color", "rgba(255,255,255,0.5)");
   }

});

$(document).ready(function() {
     
    //ACCORDION BUTTON ACTION (ON CLICK DO THE FOLLOWING)
    $('.accordionButton').click(function() {

        //REMOVE THE ON CLASS FROM ALL BUTTONS
        $('.accordionButton').removeClass('on');
          
        //NO MATTER WHAT WE CLOSE ALL OPEN SLIDES
        $('.accordionContent').slideUp('normal');
   
        //IF THE NEXT SLIDE WASN'T OPEN THEN OPEN IT
        if($(this).next().is(':hidden') == true) {
            
            //ADD THE ON CLASS TO THE BUTTON
            $(this).addClass('on');
              
            //OPEN THE SLIDE
            $(this).next().slideDown('normal');
         } 
          
     });
      
    //ADDS THE .OVER CLASS FROM THE STYLESHEET ON MOUSEOVER 
    $('.accordionButton').mouseover(function() {
        $(this).addClass('over');
        
    //ON MOUSEOUT REMOVE THE OVER CLASS
    }).mouseout(function() {
        $(this).removeClass('over');                                        
    });
    
    // CLOSES ALL S ON PAGE LOAD
    $('.accordionContent').hide();

});
