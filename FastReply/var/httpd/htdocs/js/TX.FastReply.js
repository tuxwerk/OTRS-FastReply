//
// TX.FastReply.js
//
//  note: the overlay is not part of the ticket text field because the ticket text field has overflow:scroll
//        with many templates the end of the overlay would disappear inside the scrolled area.
//
// dependencies: jquery
// prerequisites: the answer fields must be exactly the elements select[name="ResponseID"].

$(function() {
  var createFastReply = function(selectEl) {
    var box = $('<div class="inactive fast-reply"><ul></ul></div>');
    selectEl.find('option[value!="0"]').each(function() {
      var li = $('<li></li>');
      li.attr('value',$(this).attr('value'));
      li.html($(this).text());
      li.appendTo(box.find('ul'));
    });
    var attachFrame = selectEl.parents('.Content');
    if (attachFrame.length === 0) {
      attachFrame = $(document.body);
    };
    box.prependTo(attachFrame);
    selectEl.mouseover(function() {
      var offSet = selectEl.offset();
      var offSetFrame = attachFrame.offset();
      box.removeClass('inactive');
      box[0].style.top = (offSet.top - offSetFrame.top)+ 'px';
      box[0].style.left = (offSet.left -offSetFrame.left) + 'px'; 
      box[0].style.width = (selectEl.outerWidth() + 5)+'px';
    });
    box.click(function(ev) {
      ev.stopPropagation();
      var val = ev.target.value;
      selectEl.find('option[value="'+val+'"]')[0].selected = true;
      selectEl.find('option[value="'+val+'"]').change();
    });
    var timeoutID;
    box.mouseleave(function() {
      timeoutID = window.setTimeout(function() {
      box.addClass('inactive');
      },400);
    });
    box.mouseenter(function() {
      window.clearTimeout(timeoutID);});
  };
  $('select[name="ResponseID"]').each(function() {
    createFastReply($(this));
  });
});
