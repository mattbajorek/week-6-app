$(document).on('ready', function() {
	// Create the display buttons
	var sports = ['basketball','baseball','football','soccer','tennis','gymnastics','bowling','golf','lacrosse','hockey'];
	var stillImg = [];
	var movingImg = [];

	function displaySportButtons() {
		// Clear all of sportButtons
		$('#sportButtons').empty();
		// Add all of sportButtons
		for (var i=0; i<sports.length; i++) {
			var $but = $('<button>').attr('data-sport',sports[i]).text(sports[i]);
			$('#sportButtons').append($but);
		}
	}

	$(document).on('click', 'button', function() {
		// Clear previous data
		var $div = $('#sports')
		$div.empty();
		stillImg = [];
		movingImg = [];
		// Show new images
    var p = $(this).attr('data-sport');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: 'GET'
      })
      .done(function(response) {
        var results = response.data;
        console.log(results)

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $('<div class="item">')
          var rating = results[i].rating;
          var p = $('<p>').text("Rating: " + rating);
          var personImage = $('<img>').attr('data-num',i);
          var stillURL = results[i].images.fixed_height_still.url;
          var movingURL = results[i].images.fixed_height.url;
          stillImg.push(stillURL);
          movingImg.push(movingURL);
          personImage.attr('src', stillURL);
          gifDiv.append(p);
          gifDiv.append(personImage);
          $div.prepend(gifDiv);
        }

      });
  });

  $(document).on('click', 'img', function() {
  	var num = $(this).attr('data-num');
  	var currentURL = $(this).attr('src');
  	if (currentURL == stillImg[num]) {
  		$(this).attr('src', movingImg[num]);
  	} else {
  		$(this).attr('src', stillImg[num]);
  	}
  });

	$('#addSport').on('click', function() {
		var userInput = $('#sport-input').val();
		sports.push(userInput);
		displaySportButtons();
		return false;
	});

	// Show initial sport buttons
	displaySportButtons();
});