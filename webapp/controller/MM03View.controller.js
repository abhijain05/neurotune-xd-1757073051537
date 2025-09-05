sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/m/MessagePopover",
  "sap/m/MessageItem",
  "sap/ui/core/library",
  "sap/ui/core/UIComponent",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, MessageToast, MessageBox, MessagePopover, MessageItem, coreLibrary, UIComponent, Filter, FilterOperator) {
  "use strict";

  // Shortcut for sap.ui.core.MessageType
  var MessageType = coreLibrary.MessageType;

  /**
   * @name converted.mm03view.controller.MM03View
   * @class Controller for the MM03View view.
   */
  return Controller.extend("converted.mm03view.controller.MM03View", {
    /**
     * Called when the MM03View controller is initialized.
     * @public
     */
    onInit: function () {
      // Initialize the Material Data Model
      var oMaterialDataModel = new JSONModel();
      oMaterialDataModel.loadData("model/mockData/materialData.json");
      this.getView().setModel(oMaterialDataModel, "materialData");

      // Load customer data from mock data
      var oCustomerModel = new JSONModel();
      oCustomerModel.loadData("model/mockData/customers.json");
      this.getView().setModel(oCustomerModel, "customers");

      // Load product data from mock data
      var oProductModel = new JSONModel();
      oProductModel.loadData("model/mockData/products.json");
      this.getView().setModel(oProductModel, "products");

      // Load order data from mock data
      var oOrderModel = new JSONModel();
      oOrderModel.loadData("model/mockData/orders.json");
      this.getView().setModel(oOrderModel, "orders");

      // Initialize message model for MessageArea/MessagePopover
      var oMessageModel = new JSONModel({
        messages: [{
          type: MessageType.Success,
          title: "System Information",
          description: "Application converted successfully, Use AI optimize for better result",
          subtitle: "Conversion complete",
          counter: 1
        }]
      });
      this.getView().setModel(oMessageModel, "messages");

      // Converted from WebDynpro: 2025-09-05T11:50:57.464Z
    },

    /**
     * Called before the view is rendered.
     * @public
     */
    onBeforeRendering: function () {
      // Prepare data before rendering
    },

    /**
     * Called after the view is rendered.
     * @public
     */
    onAfterRendering: function () {
      // Adjust UI after rendering
    },

    /**
     * Handle value help request (for ValueHelp / F4 elements)
     * @param {sap.ui.base.Event} oEvent The event object
     */
    handleValueHelp: function (oEvent) {
      var oSource = oEvent.getSource();

      // Create value help dialog if it doesn't exist
      if (!this._valueHelpDialog) {
        this._valueHelpDialog = new sap.m.SelectDialog({
          title: "Select Value",
          confirm: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            if (oSelectedItem) {
              oSource.setValue(oSelectedItem.getTitle());
            }
          },
          cancel: function (oEvent) {
            // handle cancel event
          }
        });

        // Sample items - would be filled with actual data in a real app
        var oDialogModel = new JSONModel({
          items: [{
            title: "Item 1",
            description: "Description 1"
          }, {
            title: "Item 2",
            description: "Description 2"
          }, {
            title: "Item 3",
            description: "Description 3"
          }]
        });

        this._valueHelpDialog.setModel(oDialogModel);
        this._valueHelpDialog.bindAggregation("items", {
          path: "/items",
          template: new sap.m.StandardListItem({
            title: "{title}",
            description: "{description}"
          })
        });
      }

      // Open the dialog
      this._valueHelpDialog.open();
    },

    /**
     * Handle file download requests (for FileDownload elements)
     * @param {sap.ui.base.Event} oEvent The event object
     */
    onFileDownload: function (oEvent) {
      // In a real application, this would be connected to a backend service
      // For now, we'll show a message
      MessageToast.show("File download initiated");

      // Sample approach to download a file:
      // var sUrl = "/api/downloadFile?id=123";
      // var link = document.createElement("a");
      // link.href = sUrl;
      // link.download = "filename.pdf";
      // link.click();
    },

    /**
     * Open message popover (for MessageArea elements)
     * @param {sap.ui.base.Event} oEvent The event object
     */
    handleMessagePopoverPress: function (oEvent) {
      if (!this._messagePopover) {
        this._messagePopover = new MessagePopover({
          items: {
            path: "messages>/messages",
            template: new MessageItem({
              type: "{messages>type}",
              title: "{messages>title}",
              description: "{messages>description}",
              subtitle: "{messages>subtitle}",
              counter: "{messages>counter}"
            })
          }
        });

        this.getView().byId("messagePopoverBtn").addDependent(this._messagePopover);
      }

      this._messagePopover.toggle(oEvent.getSource());
    },

    /**
     * Handle navigation link press events
     * @param {sap.ui.base.Event} oEvent The event object
     */
    onNavigationLinkPress: function (oEvent) {
      var oSource = oEvent.getSource();
      var sHref = oSource.getHref();

      if (sHref) {
        // If href is set, let the default behavior handle it
        return;
      }

      // Otherwise, handle the navigation programmatically
      var sNavTarget = oSource.data("navTarget");
      if (sNavTarget) {
        MessageToast.show("Navigating to: " + sNavTarget);
        // In a real application, this would navigate to the appropriate view or application
        // using the router
      }
    },

    /**
     * Handle office control rendering
     * @param {sap.ui.base.Event} oEvent The event object
     */
    onOfficeControlRendered: function (oEvent) {
      // This would normally integrate with MS Office API or similar
      // In a converted application, this would be replaced by a more appropriate solution
      console.log("Office control container rendered");

      var oSource = oEvent.getSource();
      var sDomRef = oSource.getDomRef();
      if (sDomRef) {
        sDomRef.innerHTML = '<div class="sapUiMediumMargin">' +
          '<div class="sapUiMediumMarginBottom">' +
          '<span class="sapUiIcon sapUiIconMirrorInRTL" style="font-family:SAP-icons;color:#0854a0;font-size:2.5rem">&#xe0ef;</span>' +
          '</div>' +
          '<div class="sapMText">' +
          '<p>Office document integration would be configured here.</p>' +
          '<p>In SAPUI5, this typically uses OData services with MS Graph API integration.</p>' +
          '</div>' +
          '</div>';
      }
    },

    /**
     * Open dialog
     * This is a generic handler for WebDynpro dialog elements
     * @param {sap.ui.base.Event} oEvent The event object
     */
    openDialog: function (oEvent) {
      // Get the dialog ID from the source control
      var oSource = oEvent.getSource();
      var sDialogId = oSource.data("dialogId") || "confirmDialog";

      // Find the dialog in the view
      var oDialog = this.getView().byId(sDialogId);
      if (oDialog) {
        oDialog.open();
      } else {
        MessageToast.show("Dialog with ID '" + sDialogId + "' not found");
      }
    },

    /**
     * Close dialog
     * @param {sap.ui.base.Event} oEvent The event object
     */
    closeDialog: function (oEvent) {
      var oDialog = oEvent.getSource().getParent();
      oDialog.close();
    },

    /**
     * Handle dialog confirm button press
     * @param {sap.ui.base.Event} oEvent The event object
     */
    onDialogConfirm: function (oEvent) {
      // Handle dialog confirmation logic
      MessageToast.show("Dialog confirmed");
      this.closeDialog(oEvent);
    },

    /**
     * Handle dialog cancel button press
     * @param {sap.ui.base.Event} oEvent The event object
     */
    onDialogCancel: function (oEvent) {
      // Handle dialog cancellation
      this.closeDialog(oEvent);
    },

    /**
     * Navigate to SecondView
     * @param {sap.ui.base.Event} oEvent The event object
     */
    onNextPress: function (oEvent) {
      // Get the router instance
      var oRouter = UIComponent.getRouterFor(this);

      // Navigate to the 'second' route
      oRouter.navTo("second");
    },

    /**
     * Navigate back to main view
     * @param {sap.ui.base.Event} oEvent The event object
     */
    onBackPress: function (oEvent) {
      // Get the router instance
      var oRouter = UIComponent.getRouterFor(this);

      // Navigate to the 'main' route
      oRouter.navTo("main");
    },

    /**
     * Navigate to a specific route
     * @param {string} sRoute The route name to navigate to
     */
    navTo: function (sRoute) {
      var oRouter = UIComponent.getRouterFor(this);
      oRouter.navTo(sRoute);
    },

    /**
     * Handle the Save button press event.
     * @param {sap.ui.base.Event} oEvent The event object.
     */
    onSave: function (oEvent) {
      // Get the data from the model
      var oMaterialData = this.getView().getModel("materialData").getData();

      // Validate the input fields
      if (!this._validateForm(oMaterialData)) {
        return; // Stop saving if validation fails
      }

      // Show confirmation dialog
      MessageBox.confirm("Are you sure you want to save the changes?", {
        title: "Confirm Save",
        onClose: function (oAction) {
          if (oAction === MessageBox.Action.OK) {
            // Simulate saving data to a backend
            setTimeout(function () {
              MessageToast.show("Data saved successfully!");
            }, 1000); // Simulate asynchronous saving
          } else {
            MessageToast.show("Save cancelled.");
          }
        }
      });
    },

    /**
     * Validate the form data
     * @param {object} oData The data to validate
     * @private
     */
    _validateForm: function (oData) {
      var bValid = true;

      // Example validation for Material Number
      if (!oData.materialData.materialNumber) {
        MessageBox.error("Material Number is required.");
        bValid = false;
      }

      // Add more validation rules as needed
      return bValid;
    },

    /**
     * Handle search functionality for tables.
     * @param {sap.ui.base.Event} oEvent The event object.
     */
    onSearch: function (oEvent) {
      var sQuery = oEvent.getParameter("query");

      // Create a filter for the binding
      if (sQuery) {
        var oFilter = new Filter("materialDescription", FilterOperator.Contains, sQuery);
        var oBinding = this.byId("materialTable").getBinding("items");
        oBinding.filter([oFilter]);
      } else {
        // Reset the filter if no query
        this.byId("materialTable").getBinding("items").filter([]);
      }
    },

    /**
     * Export the data to a CSV file.
     */
    onExportToCSV: function () {
      var oTable = this.byId("materialTable");
      var aData = oTable.getModel("materialData").getProperty("/materialData");

      if (!aData || aData.length === 0) {
        MessageToast.show("No data to export.");
        return;
      }

      var sCsvContent = this._convertToCSV(aData);
      var oBlob = new Blob([sCsvContent], {
        type: 'text/csv'
      });
      var sUrl = URL.createObjectURL(oBlob);
      var oLink = document.createElement('a');
      oLink.href = sUrl;
      oLink.download = 'material_data_export.csv';
      oLink.click();
      URL.revokeObjectURL(sUrl);
    },

    /**
     * Convert the data to CSV format.
     * @param {Array} aData The data to convert.
     * @private
     * @returns {string} The CSV formatted string.
     */
    _convertToCSV: function (aData) {
      if (!aData || aData.length === 0) {
        return '';
      }

      var aHeaders = Object.keys(aData[0]);
      var sCsv = aHeaders.join(',') + '\n';

      aData.forEach(function (row) {
        var aValues = aHeaders.map(function (header) {
          return '"' + (row[header] || '').toString().replace(/"/g, '""') + '"';
        });
        sCsv += aValues.join(',') + '\n';
      });

      return sCsv;
    }
  });
});
