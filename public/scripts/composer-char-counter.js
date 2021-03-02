//Function for counting down the number of tweet characters as they get entered
$(document).ready(function() {
  $("textarea").on("input", function () {
    const maxChars = 140
    const remainingChars = maxChars - $(this).val().length;
    const counter = $(this).closest(".new-tweet").find(".counter");
    
    counter.text(remainingChars);
    if (remainingChars < 0) {
      counter.css({"color": "red"});
    } else {
      counter.css({"color": "black"})
    }
    console.log(this);
  })
});