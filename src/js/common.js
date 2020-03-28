$(document).ready(function () {
  
$(".mobile-menu").click(function (e) { 
  e.preventDefault();
  console.log(1);
  $(".navigation").fadeToggle();
  $(this).children().toggleClass("fa-bars fa-times");
});

});