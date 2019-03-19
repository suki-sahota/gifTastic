/*
 * Author: Suki Sahota
 * Description: GifTastic
 */
// Initial array of animals
let animals = ["sloth", "skunk", "red panda", "koala", "banana slug"];
let index = -1;


// Function adds user input to the animals array and calls method renderButton
// =====================================
$("#add-animal").on("click", function(event) {
    event.preventDefault();
    let animal = $("#animal-input").val().trim();
    animals.push(animal);
    renderButton();
});


// Function for dynamically creating and displaying buttons with .on "click" AJAX call built in
// =====================================
function renderButton() {
    // Increment our index variable, which guides us through animals array to avoid re-creation of buttons
    index++;

    // Creating a div to hold the animal gifs
    let animalDiv = $("<div class='animal'>");

    // Create new button and outfit with attributes
    let a = $("<button>", {
        text: animals[index],
        addClass: "animal-btn",
        "data-name": animals[index],
        // Add event listener to button
        click: function () {
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("data-name") + "&api_key=oNIJujv5GkFIhvvjaPoxn4KuA6QYQFrP&limit=10";
            // Run AJAX call to produce 10 new gifs relevant to button clicked
            $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                for (let i = 0; i < 10 ; i++) {
                    let animateUrl = response.data[i].images.fixed_height.url;
                    let stillUrl = response.data[i].images.fixed_height_still.url;
                    let rating = response.data[i].rating;
        
                    // Creating a new image tag with class ".gif" and add attributes
                    let newGif = $("<img class='gif'>");
                    newGif.attr({
                        "src": stillUrl,
                        "data-animate": animateUrl,
                        "data-still": stillUrl,
                        "data-state": "still"
                    });
                    
                    // Prepending the images tag and the rating to the animalDiv with class ".animal"
                    $(".animal:first").prepend(newGif);
                    $(".animal:first").prepend("<h4>" + "Rating: " + rating + "</h4>");
                }
            });
            // Putting the entire animalDiv above the previous animalDiv
            $(".animals-view").prepend(animalDiv);
        }
    });

    // Append newly created button to .buttons div with the rest of buttons
    $(".buttons").append(a);
}


// MAIN PROCESS
// =====================================
for (let i = 0; i < animals.length; i++) {
    renderButton();
}

// Adding event listener to each gif so that we can animate or make still by the press of a button
$(document).on("click", ".gif", function() {
    let state = $(this).attr("data-state");
    // If gif is still at the time of "click", make animate
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } // If gif is animate at the time of "click", make still
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});