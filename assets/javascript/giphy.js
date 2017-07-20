var animals = ["dog", "cat", "quokka", "sloth", "goat", "kangaroo", "squirrel", "hedgehog", "hamster", "otter", "giraffe", "baby elephant", "duck", "turtle"]

function displayAnimalGif() {
	var animal = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + " &api_key=dc6zaTOxFJmzC";

	// create ajax call
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		console.log(response.data)
		// save results as a variable
		var results = response.data;

		for (var i = 0; results.length; i++) {
		// create a div that holds the GIFs
			var animalGifDiv = $("<div class='animalgifs'>");
			var showAnimal = $("<img>");

			// retrieve the gif still
				showAnimal.attr("data-still", results[i].images.fixed_height_still.url);
			// retrieve animated gif
				showAnimal.attr("data-animate", results[i].images.fixed_height.url);

			animalGifDiv.append(showAnimal);

			showAnimal.attr("src", results[i].images.fixed_height_still.url);
			$("#animals-view").prepend(animalGifDiv);

		}

	});
}

// animate the gif on click
$("#animals-view").on("click", "showAnimal", function() {
	var stillURL = $(this).attr("data-still");
	var animateURL = $(this).attr("data-animate");
	var currentImage = $(this).attr("src");

	if(currentImage === stillURL) {
		$(this).attr("src", animateURL);
	} else {
		$(this).attr("src", stillURL);
	}

});

// function for displaying animal gifs
function renderButtons() {

	// delete the animals prior to adding new animals
	$("#buttons-view").empty();

	// loop through the array of animals
	for (var i = 0; i < animals.length; i++) {

		// generate a button for each animal in the array
		var animalButton = $("<button>");
		// add a class to the button
		animalButton.addClass("animalBtn");
		// add a data-attribute
		animalButton.attr("data-name", animals[i]);
		// put button text
		animalButton.text(animals[i]);
		// add button to the buttons-view div
		$("#buttons-view").append(animalButton);
	}
}

// function that handles events when the add gif button is clicked 
	$("#add-animal").on("click", function(event) {
		event.preventDefault();

		// grab input from the textbox 
		var animal = $("#animal-input").val().trim();

		// the animal from the textbox is added to array
		animals.push(animal);

		//call the renderButtons which handles the processing of the animal array
		renderButtons();
	});

	// add click event to all elements with a class of "animal"
	$(document).on("click", ".animalBtn", displayAnimalGif);

	// call the renderButtons function to display the initial buttons
	renderButtons();