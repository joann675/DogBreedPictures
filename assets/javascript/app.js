var apiKey = "W8dSjJ0mp08muVgdx37ImPcoz1s8UzBa";
var topics = ["Labrador Retreiver", "Bulldog", "German Shepherd", "Golden Retriever",
    "Beagle", "French Bulldog", "Poodle", "Yorkshire Terrier",
    "Rottweiler", "Boxer", "Dachshund"];

var queryURL;
var offset = 0;



$(document).ready(function () {

    loadButtonList();

    function loadButtonList() {

        // Logic modeled after working-movie-app exercise
        $("#DogBreedButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var newButton = $("<button>");
            newButton.attr("style", "background:teal;color:white")
            newButton.addClass("breedButton");
            // Adding a data-attribute with a value of the breed at index i
            newButton.attr("data-name", topics[i]);
            // Providing the button's text with a value of the breed at index i
            newButton.text(topics[i]);
            newButton.on("click", getImages);
            $("#DogBreedButtons").append(newButton);

        }


    }

    function getImages() {
        console.log("In onClick for breed button")
        offset = 0;
        $("#DogPictures").empty();

        queryURL = "https://api.giphy.com/v1/gifs/search?api_key=W8dSjJ0mp08muVgdx37ImPcoz1s8UzBa&limit=10&lang=en&q=" + $(this).attr("data-name") + "&offset=" + offset;
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                renderImages(response);

            })


    }

    function renderImages(response) {
        for (var j = 0; j < response.data.length; j++) {
            var newDiv = $("<div>");
            newDiv.attr("style", "display: inline-block");
            var imgStill = response.data[j].images.fixed_height_still.url;
            var imgMoving = response.data[j].images.fixed_height.url;
            var rating = $("<h4>");

            rating.text("Rating:" + response.data[j].rating);
            var newImage = $("<img>");

            newImage.attr("src", imgStill);


            newImage.attr("data-still", imgStill);
            newImage.attr("data-animate", imgMoving);
            newImage.attr("data-state", "still");
            newImage.attr("style", "margin:10px");
            newImage.addClass("gif");
            newImage.on("click", changeState);
            newDiv.append(rating, newImage);
            $("#DogPictures").prepend(newDiv);

        }
    }

    // Logic taken from pausing-gifs exercise
    function changeState() {

        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    };


    // Logic modeled after working-movie-app exercise
    $("#addBreed").on("click", function (event) {

        event.preventDefault();

        // Get the text the user types into the input field
        var breed = $("#breed").val().trim();
        if (breed != "") {
            // add the new breed into the breedlist array
            topics.push(breed);
            $("#breed").val("");


            // The loadButtonList function is called, displaying the list of breed buttons
            loadButtonList();
        }
    });

    // Get the next 10 images
    $("#getMore").on("click", function (event) {


        if ($("#DogPictures").children().length == 0)
            console.log("Can't get more if pictures are empty");
        else {



            event.preventDefault();
            offset = parseInt(offset) + 10;
            var n = queryURL.indexOf("&offset=");
            queryURL = queryURL.slice(0, n) + "&offset=" + offset;
            console.log(queryURL);

            $.ajax({
                url: queryURL,
                method: "GET"
            })
                .then(function (response) {
                    console.log(response);
                    renderImages(response);


                });

        }

    });



})