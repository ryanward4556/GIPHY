$(document).ready(function () {
    //  Global Variables

    var gifContainer = $("#gif-container")

    //  Sets up topics array of strings to be displayed at top of screen

    var topics = ["ajax", "barcelona", "real madrid", "psg", "atletico", "man city", "man united", "tottenham", "liverpool", "bayern", "inter milan"]



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
                console.log(response);
                for (var i = 0; i < 10; i++) {
                    var image = $("<img>");
                    image.attr("src", response.data[i].images.original_still.url);
                    image.attr("data-still", response.data[i].images.original_still.url);
                    image.attr("data-animate", response.data[i].images.original.url);
                    image.attr("data-state", "still");
                    var rating = $("<p>");
                    rating.addClass("rating");
                    rating.text("Rating: " + response.data[i].rating);
                    image.addClass("image");
                    gifContainer.append(rating);
                    rating.append(image);
                }
            });
        gifContainer.empty();

    }


    // Function for displaying movie data
    function renderButtons() {

        // Deleting the buttons prior to adding new topics
        // (this is necessary otherwise you will have repeat buttons)
        $("#topics-container").empty();

        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {

            // Then dynamically generating buttons for each topic in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of topic to our button
            a.addClass("topic");
            a.addClass("btn btn-success");
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

        // Adding the topic from the textbox to our array
        topics.push(topic);
        
        // Calls renderButtons which handles the processing of our topic array
        renderButtons();

        //  Empties input box
        $("#topic-input").val('');
    });

    renderButtons();
    $(document).on("click", ".topic", displayTopicInfo);
    $(document).on("click", ".image", function (e) {
        e.preventDefault();
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    });

});
