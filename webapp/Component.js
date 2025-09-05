sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/Device"
], function (UIComponent, Device) {
  "use strict";

  /**
   * @name converted.mm03view.Component
   * @class Component of the app.
   */
  return UIComponent.extend("converted.mm03view.Component", {
    metadata: {
      manifest: "json"
    },

    /**
     * The component is initialized by UI5 automatically during the startup of the app.
     * @public
     * @override
     */
    init: function () {
      // Call the base component's init function
      UIComponent.prototype.init.apply(this, arguments);

      // Set device model
      this.setModel(new sap.ui.model.json.JSONModel(Device), "device");

      // Enable routing
      this.getRouter().initialize();
    }
  });
});
