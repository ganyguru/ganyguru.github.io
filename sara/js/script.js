$("#order").click(function()
{
  $(".progress").removeClass("hide");
  $(".sbtn").animate({opacity:"0"},700,
  function(){
      $(".homeholder").animate({width:"100%"},2000);
      $(".homecontent").animate({top:"10px",left:"50%","margin-left":"-75px"},2000);
      $(".logofull").animate({height:"150px",width:"150px",top:"-100%"},2000,function() {
        $(".masi").fadeIn(1000);
      });
      $(".progress").addClass("hide");

  });
  //$(".homecontent").animate({top:"10px",left:"75px"},2000);
  // $(".logofull").animate({height:"150px",width:"150px",top:"-100%"},2000);
});
