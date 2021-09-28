(function(){

  var menu = $(".menu");
  var burgerOpen = $(".link--open");
  var burgerClose = $(".link--close");
  
  function setup(){
    menuShow();
    sayHello();
  }

  function sayHello(){
        if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
            var t = ["\n %c Made with ♥ by Cardi! %c https://www.axel-cardinaels.be/ 🤠‍ %c \n\n", "color: #fff; background: #002BCE; padding:5px 0;", "color: white; background: #1D1D1D; padding:5px 5px;","background:white;"];
            window.console.log.apply(console, t)
        }else{
            window.console && window.console.log("Made with love ♥ by Cardi! - https://www.axel-cardinaels.be/ 🤠 ");
        }
    }


  function menuShow(){
    $(".menu__action").click(function(event) {

      event.preventDefault();
      menu.toggleClass("menu--hidden");
      $(".menu__action").toggleClass("action--hide");

    });
  }

  setup();
})();
