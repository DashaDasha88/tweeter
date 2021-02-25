/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function (tweet) {

  const date = Date(tweet.created_at).toString();

  let $tweet = `
  <article class="tweet-article">
    <header class ="tweet-header">
      <h1 class="tweet-username">${tweet.user.name}</h1>
      <h1 class="tweet-username">${tweet.user.handle}</h1>
    </header>

    <div class="tweet-content">
      <p>
       ${tweet.content.text}
      </p>
    </div>

    <footer class="footer">
      <span id="date">${date}</span>
    </footer>
  </article>

  `

  return $tweet;

};


const renderTweets = function (tweets) {
  tweets = tweets.reverse();

  let renderedTweets = "";

  for (tweet of tweets) {
    renderedTweets += createTweetElement(tweet);
    console.log(renderedTweets)
  }

  $(document).ready(function(){
  $("#tweets-container").prepend($(renderedTweets));
  });

}

renderTweets(data);

//
$(document).ready(function () {

  $("form").on("submit", function(event) {
    event.preventDefault();

    let formInput = $(this).serialize();

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: formInput,
    }).done(function(data) {
      console.log('Ajax request successful');
    });

    
  });

});

