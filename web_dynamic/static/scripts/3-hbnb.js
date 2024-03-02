$(() => {
  const amenityIds = {};

  const updateAmenitiesList = () => {
    const checkedAmenities = Object.values(amenityIds);
    $('div.amenities h4').text(checkedAmenities.join(', '));
  };

  const updateAPIStatus = () => {
    $.ajax({
      url: 'http://192.168.33.10:5001/api/v1/places_search',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({}),
      success: function (response) {
        $('#api_status').addClass('available');
        $('section.places').empty();
        response.forEach(place => {
          const placeHTML = `
                        <article>
                            <div class="title_box">
                                <h2>${place.name}</h2>
                                <div class="price_by_night">$${place.price_by_night}</div>
                            </div>
                            <div class="information">
                                <div class="max_guest">${place.max_guest} Guest(s)</div>
                                <div class="number_rooms">${place.number_rooms} Bedroom(s)</div>
                                <div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div>
                            </div>
                            <div class="description">${place.description}</div>
                        </article>`;
          $('section.places').append(placeHTML);
        });
      },
      error: function () {
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
