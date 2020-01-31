
$(document).ready(function() {

  //Always load to the top of the page
  $(this).scrollTop(0);

  //Highlight the current menu item on scroll
  $(window).scroll(function() {
    
    let position = $(this).scrollTop();
    let chosenId = "home";
    $("section").each(function() {
      let target = $(this).offset().top;
      let id = $(this).attr("id");
      if(position > (target - 10))
        chosenId = id;
    });
    $("a").removeClass("active");
    $("a[href$='" + chosenId + "']").addClass("active");
  });
  
  $(window).resize(function() {
    adjustColumns();  
  })
  
  $(window).on("orientationchange", function() {
    adjustColumns();
  })

  $(window).resize();

});

//Adjusting one- or two-columns distribution
function adjustColumns() {

  if($(window).outerWidth() < 600) {
    let columns = $(".column");
    $("#education").append(columns);
    $(".row").remove();
  } else {
    let columns = $(".column");
    $("#education").remove(columns);
    $("#education").append("<div class='row' id='row1'></div>");
    $("#education").append("<div class='row' id='row2'></div>");
    $("#row1").append($("#column1"));
    $("#row1").append($("#column2"));
    $("#row2").append($("#column3"));
    $("#row2").append($("#column4"));
  }
}

function toggleMenu() {
  
  var nav = $("nav")[0];
  var icon = $("i")[0];

  if (nav.className === "") {
    nav.className += " responsive";
    icon.className = "fa fa-times fa-lg";
  } else {
    nav.className = "";
    icon.className = "fa fa-bars fa-lg";
  }

}

