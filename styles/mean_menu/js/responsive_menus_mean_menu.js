/**
 * @file
 * Integrate Mean Menu library with Responsive Menus module.
 */
(function ($) {
  Drupal.behaviors.responsive_menus_mean_menu = {
    attach: function (context, settings) {
      settings.responsive_menus = settings.responsive_menus || {};
      if (!settings.responsive_menus.selectors.length) {
        return;
      }
      // Call meanmenu() with our custom settings.
      $(settings.responsive_menus.selectors).once('responsive-menus-mean-menu', function() {
        $(this).meanmenu({
          meanMenuClose: settings.responsive_menus.close_txt || "X",
          meanMenuCloseSize: settings.responsive_menus.close_size || "18px",
          meanMenuOpen: settings.responsive_menus.trigger_txt || "<span /><span /><span />",
          meanRevealPosition: settings.responsive_menus.position || "right",
          meanScreenWidth: settings.responsive_menus.media_size || "480",
          meanShowChildren: settings.responsive_menus.show_children || true,
          meanExpandableChildren: settings.responsive_menus.expand_children || true,
          meanExpand: settings.responsive_menus.expand_txt || "+",
          meanContract: settings.responsive_menus.contract_txt || "-",
          meanRemoveAttrs: settings.responsive_menus.remove_attrs || true
        });
      });

    }
  };
}(jQuery));
