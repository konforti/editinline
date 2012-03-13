(function($) {
  Drupal.behaviors.editInline = {
    attach: function(context, settings) {
      $('#content #page-title')
      .before('<div id="status"></div>')
      .addClass('editable')
      .attr('contentEditable', true)
      .after('<button id="save">Save</button>');
      
      $(".editable").click(function(e) {
        $("#save").show();
        e.stopPropagation();
      });

      $(document).click(function() {
        $("#save").hide();
      });

      $("#save").click(function() {
        var content = $('.editable').text();
        $.ajax({
            url: '/openideal/editinline/save',
            type: 'POST',
            data:  {content: content, q: settings.getQ},
            success:function(data) {
              if (data == '1') {
                $("#status")
                .addClass("success")
                .text("Title saved successfully")
                .fadeIn('slow')
                .delay(3000)
                .fadeOut('slow');
              }
              else {
                $("#status")
                .addClass("error")
                .text("Error, title could not be saved")
                .fadeIn('slow')
                .delay(3000)
                .fadeOut('slow');
              }   
            }
            
        });

      });
    }
  };
})(jQuery);
