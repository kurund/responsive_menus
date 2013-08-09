/**
 * @file
 * Simple responsification of menus.
 */
(function ($) {
  /**
   * Handle clicks & toggling the menu.
   */
  var toggler_click = function() {
    $(this).parent().toggleClass('responsive-toggled');
  };
  // Iterate through selectors, check window sizes, add some classes.
  Drupal.behaviors.responsive_menus = {
    attach: function (context, settings) {
      settings.responsive_menus = settings.responsive_menus || {};
      $('.responsive-menus .toggler').unbind('click');
      $.each(settings.responsive_menus, function(ind, iteration){
        if (iteration.responsive_menus_style != 'responsive_menus_simple') {
          return true;
        }
      if (!iteration.selectors.length) {
        return;
      }
      if (!iteration.media_size.length) {
        iteration.media_size = 768;
      }
      // Handle clicks & toggling.
      var toggler_class = '';
      var toggler_text = iteration.toggler_text;
      // Iterate through our selectors.
      $.each(iteration.selectors, function(index, value) {
        if ($(value).length > 1) {
          // Handle nested menus.  Make sure we get the first, but not children.
          $(value).each(function(val_index) {
            if (!$(this).parents('ul').length) {
              if (!$(this).hasClass('responsive-menus-simple')) {
                toggler_class = 'responsive-menus-' + ind + '-' + index + '-' + val_index;
                $(this).addClass('responsive-menus-simple').wrap('<div class="responsive-menus ' + toggler_class + '" />');
                $('.' + toggler_class).prepend('<span class="toggler">' + toggler_text + '</span>');
              }
            }
          });
        }
        else {
          // Single level menus.
          if (!$(value).hasClass('responsive-menus-simple')) {
            toggler_class = 'responsive-menus-' + ind + '-' + index;
            $(value).addClass('responsive-menus-simple').wrap('<div class="responsive-menus ' + toggler_class + '" />');
            $('.' + toggler_class).prepend('<span class="toggler">' + toggler_text + '</span>');
          }
        }
      });
      // Re-bind click function.  This handles ajax events.
      $('.responsive-menus .toggler').bind('click', toggler_click);
      // Use absolute positioning.
      if (iteration.absolute) {
        $('.responsive-menus-simple').addClass('absolute');
      }
      // Other things to bind once.
      $('body').once('responsive-menus-load', function(){
        // Adjustable width instead of @media queries.
        if (window.innerWidth < iteration.media_size) {
          $('.responsive-menus').addClass('responsified');
        }
        // Handle window resizing.
        $(window).resize(function() {
          if(window.innerWidth > iteration.media_size) {
            $('.responsive-menus').removeClass('responsified');
          }
          if (window.innerWidth < iteration.media_size) {
            $('.responsive-menus').addClass('responsified');
          }
        });
      });

});

    }
  };

}(jQuery));
