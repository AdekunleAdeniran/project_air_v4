$(function () {
  let amenityDict = {};
  $('input[type=checkbox]').change(function () {
    if(this.checked) {
      amenityDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenityDict[$(this).data('id')];
    }
    let amenityValues = Object.values(amenityDict);
    if (amenityValues.length > 0) {
      $('div.amenities > h4').text(amenityValues.join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });

  $.get('http://127.0.0.1:5001/api/v1/status/', function(data, textStatus)
	{
	  alert("Done, with the following status: " + textStatus + ". Here is the response: " + data);
	  if(textStatus == 'success') {
	    $('div#api_status').addClass('available');
	  } else {
	    $('div#api_status').removeClass('available');
	  }
	});
});
