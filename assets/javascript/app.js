//  Global Variables

var gifContainer = $("#gif-container")

//  Sets up topics array of strings to be displayed at top of screen

var topics = ["ajax", "barcelona", "real madrid", "psg", "atletico", "man city", "man united", "tottenham", "liverpool", "bayern"]



//  Creats button for each item in topics list

// $("#topics-contatiner").html("<button>").text("button");


function displayTopicInfo() {
    //  Calls GIPHY api using queryURL
    var search = $(this).attr("data-search-item");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=WBSORvGtsCMCwgWYyeKt6QjIwl0E7W8d";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            for(var i = 0; i < 10; i++) {
                var imageURL = response.data[i].images.fixed_height.url;
                var image = $("<img>").attr("src", imageURL);
                gifContainer.append(image);
            }
            

        });
}


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
        a.addClass("topic");
        // Adding a data-attribute
        a.attr("data-search-item", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#topics-container").append(a);
    }
}

// This function handles events where one button is clicked
$("#add-topic").on("click", function (event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var topic = $("#topic-input").val().trim();

    // Adding the movie from the textbox to our array
    topics.push(topic);
    console.log(topics);


    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});


$(document).on("click", ".topic", displayTopicInfo);

renderButtons();

//  Create an on click event for the gif-stills. 
//  Once clicked they're url should be replaced with the moving gif url
