$(document).ready(function () {
    var selectedAmenities = {};

    $('input[type="checkbox"]').change(function () {
        var amenityId = $(this).data('id');
        var amenityName = $(this).data('name');

        if (this.checked) {
            selectedAmenities[amenityId] = amenityName;
        } else {
            delete selectedAmenities[amenityId];
        }
    });

    $('button').click(function () {
        $.ajax({
            type: "POST",
            url: "http://0.0.0.0:5001/api/v1/places_search",
            contentType: "application/json",
            data: JSON.stringify({ amenities: Object.keys(selectedAmenities) }),
            success: function (data) {
            },
            error: function () {
                console.log("Error fetching places data from the API.");
            }
        });
    });
});
