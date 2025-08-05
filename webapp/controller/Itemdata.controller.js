sap.ui.define([
    "sap/ui/core/mvc/Controller"
  ], (BaseController) => {
    "use strict";
  
    return BaseController.extend("newproject.controller.Itemdata", {
        onInit() {
          sap.ui.core.UIComponent.getRouterFor(this).getRoute("Itemdata").attachPatternMatched(this._ObjPatternMatched,this);
        },
      _ObjPatternMatched: function (evt) {
        var oValue = evt.getParameter("arguments").Ebeln.padStart(10, "0");
        this.getOwnerComponent().getModel().read("/HEADERXSet(Ebeln='" + oValue + "')", {
          urlParameters: {
            "$expand": "HEADERANDITEMX"
          },
          success: function (oData) {
              var itemData = oData.HEADERANDITEMX; 
              var poData = new sap.ui.model.json.JSONModel(itemData);
              this.getView().byId("ID").setModel(poData, "poData");
          }.bind(this),
          error: function (oError) {
            sap.m.MessageBox.error("Failed to load PO items");
          }
        });
      },

        onBack:function(){
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter.navTo("HomePage");
               }
    });
  });