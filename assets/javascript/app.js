//  Global Variables


//  Sets up topics array of strings to be displayed at top of screen

var topics = ["ajax", "barcelona", "real madrid", "psg", "atletico", "man city", "man united", "tottenham", "liverpool", "bayern"]


//  Sets up queryURL
var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=WBSORvGtsCMCwgWYyeKt6QjIwl0E7W8d";

//  Creats button for each item in topics list

// $("#topics-contatiner").html("<button>").text("button");

// Function for displaying movie data
function renderButtons() {

    // Deleting the buttons prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#topics-container").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {

        // Then dynamically generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie to our button
        a.addClass("team");
        // Adding a data-attribute
        a.attr("data-team", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#topics-container").append(a);
    }
}
renderButtons();

//  Calls GIPHY api using queryURL

$.ajax({
    url: queryURL,
    method: "GET"
})
    .then(function (response) {
        var results = response.data;
        console.log(results);

    });
