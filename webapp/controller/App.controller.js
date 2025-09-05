sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
  "use strict";

  /**
   * @name converted.mm03view.controller.App
   * @class Controller for the App view.
   */
  return Controller.extend("converted.mm03view.controller.App", {
    /**
     * Called when the app controller is initialized.
     * @public
     */
    onInit: function () {
      // Log app initialization
      console.log("App controller initialized");

      // Get the router instance
      var oRouter = UIComponent.getRouterFor(this);

      // Check if the router is available
      if (oRouter) {
        // Log router initialization
        console.log("Router found, initializing navigation");

        // Attach event handler for bypassed routes
        oRouter.attachBypassed(function (oEvent) {
          console.log("Route bypassed:", oEvent.getParameter("hash"));
        });

        // Navigate to main view if no hash is set
        if (!window.location.hash || window.location.hash === "#") {
          console.log("No hash found, navigating to main route");
          // Delay navigation to ensure router is fully initialized
          setTimeout(function () {
            oRouter.navTo("main");
          }, 100);
        }
      } else {
        // Log error if router is not found
        console.error("Router not found in App controller");
      }
    }
  });
});
