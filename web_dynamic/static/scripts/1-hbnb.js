$(function() {
  let checkedAmen = {}
  $('INPUT[type=checkbox]').change(function() {
    if($(this).prop("checked")) {
      checkedAmen[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete checkedAmen[$(this).attr('data-id')];
  }
    let loadValue = Object.values(checkedAmen);
    if(len(loadvalue) > 0) {
      $(div.amenities > h4).text(loadValue.join(','));
    } else {
      $(div.amenities > h4).html(&nbsp;);
    }
  });
});
