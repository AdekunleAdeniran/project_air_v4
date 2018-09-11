window.onload = function () {
  let amenityDict = {};
  let stateDict = {};
  let cityDict = {};
  console.log($('#stateFilter'));

  //Checkbox for Amenity
  $('.amenFilter').change(function () {
    if (this.checked) {
      amenityDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenityDict[$(this).data('id')];
    }
    let amenityValues = Object.values(amenityDict);
    console.log(amenityValues);
    if (amenityValues.length > 0) {
      $('div.amenities > h4').text(amenityValues.join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });

  //Checkbox for State
  $('.stateFilter').change(function () {
    if (this.checked) {
      stateDict[$(this).data('id')] = $(this).data('name');
      console.log(stateDict);
    } else {
      delete stateDict[$(this).data('id')];
    }
    let stateValues = Object.values(stateDict);
    if (stateValues.length > 0) {
      $('div.locations > h4').text(stateValues.join(', '));
    } else {
      $('div.locations > h4').html('&nbsp;');
    }
  });

  //Checkbox for City
  $('.cityFilter').change(function () {
    if (this.checked) {
      cityDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete cityDict[$(this).data('id')];
    }
    let cityValues = Object.values(cityDict);
    console.log(cityValues);
    if (cityValues.length > 0) {
      $('div.locations > h4').text(cityValues.join(', '));
    } else {
      $('div.locations > h4').html('&nbsp;');
    }
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (textStatus === 'success') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  function getPlaces(newData={}){
    $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: JSON.stringify(newData),
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
      $.each(data, function (i, place) {
        $('SECTION.places').append(
          '<article>' +
              '<div class="title">' +
              '<h2>' + place.name + '</h2>' +
              '<div class="price_by_night">' +
              place.price_by_night +
              '</div>' +
              '</div>' +
              '<div class="information">' +
              '<div class="max_guest">' +
              '<i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' +
              place.max_guest + 'Guests' +
              '</div>' +
              '<div class="number_rooms">' +
              '<i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' +
              place.number_rooms + 'Bedrooms' +
              '</div>' +
              '<div class="number_bathrooms">' +
              '<i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' +
              place.number_bathrooms + 'Bathrooms' +
              '</div>' +
              '</div>' +
              '<div class="description">' +
              place.description +
              '</div>' +
              '</article>'
            );
          });
        }
      });
    };
    getPlaces({});

  $('button').on('click', function () {
    let filterDict = {};
    filterDict['amenities'] = Object.keys(amenityDict);
    filterDict['states'] = Object.keys(stateDict);
    filterDict['cities'] = Object.keys(cityDict);
    console.log(filterDict);
    $('section.places').empty();
    getPlaces(filterDict);
  });
};
