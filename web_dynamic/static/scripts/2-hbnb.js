$(() => {
  const amenityIds = {};

  const updateAmenitiesList = () => {
    const checkedAmenities = Object.values(amenityIds);
    $('div.amenities h4').text(checkedAmenities.join(', '));
  };

  const updateAPIStatus = () => {
    $.ajax({
	    url: 'http://0.0.0.0:5001/api/v1/status/',
	    success: function(response) {
              if (response.status === 'OK' ) {
	        $('#api_status').addClass('available');
	      } else {
                $('#api_status').removeClass('available');
	      }
	    },
	    error: function() {
	      $('#api_status').removeClass('available');
	    }
    });
  };

  updateAPIStatus();

  setInterval(updateAPIStatus, 10000);

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');

    if ($(this).is(':checked')) {
      amenityIds[amenityId] = amenityName;
    } else {
      delete amenityIds[amenityId];
    }

    updateAmenitiesList();
  });
});
