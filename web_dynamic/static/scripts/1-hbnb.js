$(() => {
  const amenityIds = {};

  const updateAmenitiesList = () => {
    const checkedAmenities = Object.values(amenityIds);
    $('div.amenities h4').text(checkedAmenities.join(', '));
  };

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
