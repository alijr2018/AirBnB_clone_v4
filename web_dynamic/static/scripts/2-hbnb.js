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
