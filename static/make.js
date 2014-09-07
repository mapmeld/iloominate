// multilingual text input
$("textarea").ime();

// update font sample
$("#fontSize, #fontName").on('change select', function() {
  $("#fontSample").css({
    fontFamily: $("#fontName").val().replace("web_", ""),
    fontSize: $("#fontSize").val() + "pt"
  });
});

// don't let font become larger than line size
$("#fontSize").on('change', function() {
  var lineSize = $("#lineSize").val() * 1;
  var fontSize = $("#fontSize").val() * 1;
  if(fontSize && lineSize && fontSize > 10 && lineSize > 10 && fontSize > lineSize) {
    $("#lineSize").val(fontSize);
  }
});

// don't let line size become smaller than font
$("#lineSize").on('change', function() {
  var lineSize = $("#lineSize").val() * 1;
  var fontSize = $("#fontSize").val() * 1;
  if(fontSize && lineSize && fontSize > 10 && lineSize > 10 && lineSize < fontSize) {
    $("#fontSize").val(lineSize);
  }
});

// don't let user remove all text placement options
$(".pagetext").on('change', function(e) {
  var oneChecked = false;
  $(".pagetext").each(function(i, checkbox) {
    if(checkbox.checked) {
      oneChecked = true;
    }
  });

  if (!oneChecked) {
    e.preventDefault();
    e.target.checked = true;
    return false;
  }
});

// let user select an icon for the cover
$('.addicon').click(function() {
  $('#iconmodal').modal('show');
});

var rgb_of = {
  "pink": [255, 105, 180],
  "red": [255, 0, 0],
  "orange": [255, 165, 0],
  "yellow": [255, 255, 0],
  "green": [0, 255, 0],
  "blue": [0, 0, 255],
  "purple": [200, 0, 200]
};

$(".color-bar span").on("click", function(e){
  var color = $(e.target).attr("class");
  var canvas = $("canvas.color-change")[0];
  var ctx = canvas.getContext('2d');
  $.each($("#iconmodal img"), function(x, img) {
    // clear canvas
    ctx.clearRect(0, 0, 164, 164);

    // draw black icon
    ctx.drawImage(img, 0, 0, 164, 164);

    // pixel replace
    var imageData = ctx.getImageData(0, 0, 164, 164);
    for (var i = 0; i < imageData.data.length; i += 4) {
      if(imageData.data[i+3]) {
        imageData.data[i] = rgb_of[color][0];
        imageData.data[i+1] = rgb_of[color][1];
        imageData.data[i+2] = rgb_of[color][2];
      }
    }
    ctx.putImageData(imageData,0,0);

    // replace icon
    img.src = canvas.toDataURL();
  });
});

$('#iconmodal img').on('click', function(e) {
  $('#iconmodal').modal('hide');
  $('.iconurl').val(e.target.src);
});
