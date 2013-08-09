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
      // Bind once.
      $('body').once('responsive-menus-load', function(){
        $('.responsive-menus .toggler').unbind('click');
        $.each(settings.responsive_menus, function(ind, iteration) {
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
                    $(this).addClass('responsive-menus-simple').wrap('<div data-mediasize="' + iteration.media_size + '" class="responsive-menus ' + toggler_class + '" />');
                    $('.' + toggler_class).prepend('<span class="toggler">' + toggler_text + '</span>');
                    $('.' + toggler_class + ' .toggler').bind('click', toggler_click);
                    // Use absolute positioning.
                    if (iteration.absolute) {
                      $('.' + toggler_class).addClass('absolute');
                    }
                  }
                }
              });
            }
            else {
              // Single level menus.
              if (!$(value).hasClass('responsive-menus-simple')) {
                toggler_class = 'responsive-menus-' + ind + '-' + index;
                $(value).addClass('responsive-menus-simple').wrap('<div data-mediasize="' + iteration.media_size + '" class="responsive-menus ' + toggler_class + '" />');
                $('.' + toggler_class).prepend('<span class="toggler">' + toggler_text + '</span>');
                $('.' + toggler_class + ' .toggler').bind('click', toggler_click);
                // Use absolute positioning.
                if (iteration.absolute) {
                  $('.' + toggler_class).addClass('absolute');
                }
              }
            }
          });
          // Adjustable width instead of @media queries.
          $('.responsive-menus').each(function(){
            if (window.innerWidth < $(this).data('mediasize')) {
              $(this).addClass('responsified');
            }
          });
          // Handle window resizing.
          $(window).resize(function() {
            $('.responsive-menus').each(function(){
              if (window.innerWidth > $(this).data('mediasize')) {
                $(this).removeClass('responsified');
              }
              if (window.innerWidth < $(this).data('mediasize')) {
                $(this).addClass('responsified');
              }
            });
          });
        });
      });

    }
  };

}(jQuery));
