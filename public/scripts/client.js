/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const currentTime = function(date) {

  const currentDate = Date.now();
  const secondsAgo = (currentDate - date) / 1000 / 60;
  const minutesAgo = (currentDate - date) / 1000 / 60;
  const hoursAgo = (currentDate - date) / 1000 / 60 / 60;
  if (minutesAgo < 1) {
    return `${Math.floor(secondsAgo)} seconds ago`;
  } else if (minutesAgo > 1 && minutesAgo < 60) {
    return `${Math.floor(minutesAgo)} minutes ago`;
  } else if (minutesAgo > 60 && hoursAgo < 24) {
    return `${Math.floor(hoursAgo)} hours ago`;
  } else if (hoursAgo > 24) {
    return `${Math.floor(hoursAgo / 24)} days ago`;
  }
};

const createTweetElement = function(tweet) {

  const $tweet = `
  <article class="tweet-article">
    <header class ="tweet-header">
      <span class="tweet-icon">
        <i class="fas fa-ghost" aria-hidden="true"></i>
      </span>
        <h1 class="tweet-username1">${tweet.user.name}</h1>
        <h1 class="tweet-username2">${tweet.user.handle}</h1>
    </header>

    <div class="tweet-content">
      <p>
       ${tweet.content.text}
      </p>
    </div>

    <footer class="footer">
      <span id="date">${currentTime(tweet.created_at)}</span>
      <span class="tweet-flags">
        <i class="fa fa-flag" aria-hidden="true"></i>
        <i class="fa fa-retweet" aria-hidden="true"></i>
        <i class="fa fa-heart" aria-hidden="true"></i>
      </span>
    </footer>
  </article>

  `;
  return $tweet;

};


const renderTweets = function(tweets) {
  tweets = tweets.reverse();

  let renderedTweets = "";

  for (tweet of tweets) {
    renderedTweets += createTweetElement(tweet);
    console.log(renderedTweets);
  }

  $(document).ready(function() {
    $("#tweets-container").prepend($(renderedTweets));
  });

};

// renderTweets(data);

//
$(document).ready(function() {

  $("form").on("submit", function(event) {
    event.preventDefault();

    const formInput = $(this).serialize();
    console.log("Form input", formInput);

    if ($("textarea").val() === "") {
      $(".errors").html('<p id="errors-emptyform">Please enter a tweet.</p>');
    } else if ($("textarea").val().length > 140) {
      $(".errors").html('<p id="errors-toomanycharacters">Your tweet must be under 140 characters.</p>');
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: formInput,
      }).done(function() {
        loadTweets();
      });
    }
  });
  
  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: "/tweets",
      dataType: "json",
      success: function(result) {
        renderTweets(result);
      }
    });

  };

  loadTweets();

});

