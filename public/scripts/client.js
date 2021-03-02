/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 
//Creates the "time ago" stamp for the tweets based on time it was created
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

//Adds the HTML to the list of tweets, which would be populated by the usernames, text, and time stamp
const createTweetElement = function(tweet) {

  const $tweet = `
  <article class="tweet-article">
    <header class="tweet-header">
        <img class="tweet-icon" src="/images/faceicon.png">
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
      <span>
        <i class="fa fa-flag" aria-hidden="true"></i>
        <i class="fa fa-retweet" aria-hidden="true"></i>
        <i class="fa fa-heart" aria-hidden="true"></i>
      </span>
    </footer>
  </article>

  `;
  return $tweet;

};

//Renders the latest tweet onto the page
const renderTweets = function(tweet) {
  $('#tweets-container').empty();
  tweet.forEach( (tweets) => {
    $('#tweets-container').prepend(createTweetElement(tweets));
  })

};

//Contains: 1)get and post logic 2)tweet validation logic 3)logic for loading tweets without page refresh
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

