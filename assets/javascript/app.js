var shows = ["Firefly", "Doctor Who", "Stargate Atlantis", "Star Trek", "Stranger Things", "Black Mirror", "Orphan Black", "X-Files"];

function displayGif() {
	var scifi = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + scifi + " &api_key=dc6zaTOxFJmzC";


	// create ajax call
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

		// save results as a variable
		var results = response.data;

		for (var i = 0; i < 10; i++) {

			// create a div that holds the GIFs
			var showDiv = $("<div class='scifiGifs'>");
			var showGif = $("<img>");
			var rating = results[i].rating;
			var p = $("<p>").html("<strong>Rating: </strong>" + rating.toUpperCase());

               showGif.attr("src", results[i].images.fixed_height_still.url);
               showGif.attr("data-still", results[i].images.fixed_height_still.url);
               showGif.attr("data-animate", results[i].images.fixed_height.url);
               showGif.attr("data-state", "still");
               showGif.addClass("gifImage");
               console.log(showGif);
			showDiv.append(showGif).append(p);
			$("#gif-view").prepend(showDiv);
		}

	});
}


// animate the gif on click
$(document).on("click", ".gifImage", function() {
	var state = $(this).attr("data-state");
	var animated = $(this).attr("data-animate");
	var still = $(this).attr("data-still");
	console.log("This is Working!!");

	if(state === "still") {
		$(this).attr("src", animated);
		$(this).attr("data-state", "animate");
		console.log($(this).attr("data-state", "animate"));
	} else {
		$(this).attr("src", still);
		$(this).attr("data-state", "still");
		console.log($(this).attr("data-state", "still"));
	}
});

// clear button
$("#clearBtn").on("click", function() {
	$("#gif-view").empty();
});


// function for displaying show name list of buttons
function renderButtons() {

	// delete the shows prior to adding new shows
	$("#buttons-view").empty();

	// loop through the array of shows
	for (var i = 0; i < shows.length; i++) {

		// generate a button for each show in the array
		var scifiButton = $("<button>");
		// add a class to the button
		scifiButton.addClass("scifiBtn");
		// add a data-attribute
		scifiButton.attr("data-name", shows[i]);
		// put button text
		scifiButton.text(shows[i]);
		// add button to the buttons-view div
		$("#buttons-view").append(scifiButton);
	}
}

// function that handles events when the add gif button is clicked 
	$("#add-show").on("click", function(event) {
		event.preventDefault();

		// grab input from the textbox 
		scifi = $("#show-input").val().trim();

		// the scifi show from the textbox is added to array
		shows.push(scifi);

		//call the renderButtons which handles the processing of the scifi show array
		renderButtons();
	});

	// add click event to all elements with a class of "scifi"
	$(document).on("click", ".scifiBtn", displayGif);

	// call the renderButtons function to display the initial buttons
	renderButtons();