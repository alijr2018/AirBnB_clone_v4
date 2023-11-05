$(document).ready(function () {
    const selectedAmenities = {};
  
    $('input[type="checkbox"]').change(function () {
      const amenityId = $(this).data('id');
      const amenityName = $(this).data('name');
  
      if (this.checked) {
        selectedAmenities[amenityId] = amenityName;
      } else {
        delete selectedAmenities[amenityId];
      }
  
      const amenitiesList = Object.values(selectedAmenities).join(', ');
      $('#amenities_h4').text('Amenities: ' + amenitiesList);
    });
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
	console.log(data);
	if (data.status === 'OK') {
	    $('#api_status').addClass('available');
		$('#api_status').removeAttr('id');
	    console.log("i AM IN");
	} else {
	    $('#api_status').removeClass('available');
	}
    });

    $.ajax({
        type: "POST",
        url: "http://0.0.0.0:5001/api/v1/places_search",
        contentType: "application/json",
        data: JSON.stringify({}),
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var place = data[i];
                var article = "<article>" +
                    "<div class='title_box'>" +
                    "<h2>" + place.name + "</h2>" +
                    "<div class='price_by_night'>$" + place.price_by_night + "</div>" +
                    "</div>" +
                    "<div class='information'>" +
                    "<div class='max_guest'>" + place.max_guest + " Guest" + (place.max_guest !== 1 ? "s" : "") + "</div>" +
                    "<div class='number_rooms'>" + place.number_rooms + " Bedroom" + (place.number_rooms !== 1 ? "s" : "") + "</div>" +
                    "<div class='number_bathrooms'>" + place.number_bathrooms + " Bathroom" + (place.number_bathrooms !== 1 ? "s" : "") + "</div>" +
                    "</div>" +
                    "<div class='description'>" + place.description + "</div>" +
                    "</article>";

                $(".places").append(article);
            }
        },
        error: function () {
            console.log("Error fetching places data from the API.");
        }
    });
