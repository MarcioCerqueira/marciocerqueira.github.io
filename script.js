
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

  //Adjust one- or two-columns distribution  
  $(window).resize(function() {
    adjustColumns();  
  })
  
  $(window).on("orientationchange", function() {
    adjustColumns();
  })

  $(window).resize();

  //Load HTML attributes of logo images
  loadLogos();

});

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

function loadLogos() {
  
  $(".logoPDF").attr("src", "imgs\\home\\PDF.png");
  $(".logoPDF").attr("alt", "PDF");
  $(".logoPDF").attr("title", "Main Paper");

  $(".logoAppendix").attr("src", "imgs\\home\\Appendix.png");
  $(".logoAppendix").attr("alt", "Appendix");
  $(".logoAppendix").attr("title", "Supplementary Document");

  $(".logoGitHub").attr("src", "imgs\\home\\GitHub.png");
  $(".logoGitHub").attr("alt", "Source Code");
  $(".logoGitHub").attr("title", "Source Code");

  $(".logoDOI").attr("src", "imgs\\home\\DOI.png");
  $(".logoDOI").attr("alt", "DOI");
  $(".logoDOI").attr("title", "DOI (Digital Object Identifier)");

  $(".logoYouTube").attr("src", "imgs\\home\\YouTube.png");
  $(".logoYouTube").attr("alt", "YouTube Video");
  $(".logoYouTube").attr("title", "Video");

  $(".logoSlides").attr("src", "imgs\\home\\PPT.png");
  $(".logoSlides").attr("alt", "Slides");
  $(".logoSlides").attr("title", "Slides");

  $(".logoAward").attr("src", "imgs\\home\\Award.png");
  $(".logoAward").attr("alt", "Award");
  $(".logoAward").attr("title", "Award");

  $(".logoPoster").attr("src", "imgs\\home\\Poster.png");
  $(".logoPoster").attr("alt", "Poster");
  $(".logoPoster").attr("title", "Poster");

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

