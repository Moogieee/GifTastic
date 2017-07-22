var shows = ["Firefly", "Doctor Who", "Stargate Atlantis", "Star Trek", "Stranger Things", "Black Mirror", "Orphan Black", "X-Files"];

function displayScifiGif() {
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
			var scifiGifDiv = $("<div class='scifiGifs'>");
			var showGif = $("<img>");
			var rating = results[i].rating;
			var p = $("<p>").html("<strong>Rating: </strong>" + rating.toUpperCase());

               showGif.attr("src", results[i].images.fixed_height_still.url);
               showGif.attr("data-still", results[i].images.fixed_height_still.url);
               showGif.attr("data-animate", results[i].images.fixed_height.url);
               showGif.attr("data-state", 'still');
               showGif.addClass("scifiImage");

			scifiGifDiv.append(showGif).append(p);
			$("#scifiGif-view").prepend(scifiGifDiv);
		}

	});
}

// animate the gif on click
$(".scifiImage").on("click", function() {
	var state = $(this).attr("data-state");
	var animate = $(this).attr("data-animate");
	var still = $(this).attr("data-still");

	if(state === "still") {
		$(this).attr("src", animate);
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", still);
		$(this).attr("data-state", "still");
	}
});

// clear button
$("#clearBtn").on("click", function() {
	$("#scifiGif-view").empty();
});


// function for displaying scifi list of buttons
function renderButtons() {

	// delete the scifi shows prior to adding new scifi shows
	$("#buttons-view").empty();

	// loop through the array of scifi shows
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
	$("#add-scifishow").on("click", function(event) {
		event.preventDefault();

		// grab input from the textbox 
		var scifi = $("#show-input").val().trim();

		// the scifi show from the textbox is added to array
		shows.push(scifi);

		//call the renderButtons which handles the processing of the scifi show array
		renderButtons();
	});

	// add click event to all elements with a class of "scifi"
	$(document).on("click", ".scifiBtn", displayScifiGif);

	// call the renderButtons function to display the initial buttons
	renderButtons();