var apiKey = "W8dSjJ0mp08muVgdx37ImPcoz1s8UzBa";
var breedlist = ["Labrador Retreiver", "Bulldog", "German Shepherd", "Golden Retriever",
    "Beagle", "French Bulldog", "Poodle", "Yorkshire Terrier",
    "Rottweiler", "Boxer", "Dachshund"];

var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=W8dSjJ0mp08muVgdx37ImPcoz1s8UzBa&limit=10&offset=0&rating=G&lang=en";



$(document).ready(function () {

    loadButtonList();

    function loadButtonList() {

        // Logic modeled after working-movie-app exercise
        $("#DogBreedButtons").empty();
        for (var i = 0; i < breedlist.length; i++) {
            var newButton = $("<button>");
            newButton.attr("style", "background:teal;color:white")
            newButton.addClass("breedButton");
            // Adding a data-attribute with a value of the breed at index i
            newButton.attr("data-name", breedlist[i]);
            // Providing the button's text with a value of the breed at index i
            newButton.text(breedlist[i]);
            newButton.on("click", getImages);
            $("#DogBreedButtons").append(newButton);

        }


    }

    function getImages() {
        console.log("In onClick for breed button")
        $("#DogPictures").empty();

        queryURL += "&q=" + $(this).attr("data-name");

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                for (var j = 0; j < response.data.length; j++) {
                    var imgStill = response.data[j].images.fixed_height_still.url;
                    var imgMoving = response.data[j].images.fixed_height.url;
                    var newImage = $("<img>");

                    newImage.attr("src", imgStill);


                    newImage.attr("data-still", imgStill);
                    newImage.attr("data-animate", imgMoving);
                    newImage.attr("data-state", "still");
                    newImage.attr("style", "margin:10px");
                    newImage.addClass("gif");
                    newImage.on("click", changeState);
                    $("#DogPictures").append(newImage);
                }

            })


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
        // add the new breed into the breedlist array
        breedlist.push(breed);
        $("#breed").val("");


        // The loadButtonList function is called, displaying the list of breed buttons
        loadButtonList();
    });



});

