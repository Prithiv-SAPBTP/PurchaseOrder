sap.ui.define([
    "sap/ui/core/mvc/Controller"
  ], (BaseController) => {
    "use strict";
  
    return BaseController.extend("newproject.controller.Itemdata", {
        onInit() {
          sap.ui.core.UIComponent.getRouterFor(this).getRoute("Itemdata").attachPatternMatched(this._ObjPatternMatched,this);
        },
      //   _ObjPatternMatched:function(evt){
      //     // var that = this;
      //     var oValue = evt.getParameter("arguments").Ebeln;
      //     this.getOwnerComponent().getModel().read("/HEADERXSet",{
      //         urlParameters: {
      //             "$expand":"HEADERANDITEMX"
      //         },
      //         filters:[new sap.ui.model.Filter("Ebeln","EQ","000"+oValue)],
      //         success:function(oData,results){  
      //           var oval = [oData.results[0].HEADERANDITEMX];
      //             var poData = new sap.ui.model.json.JSONModel(oval);
      //             this.getView().byId("ID").setModel(poData, "poData");           
      //             // console.log(oData);

      //         }.bind(this),
      //         error:function(oError){
      //             // MessageBox.error(JSON.parse(oError.responseText).error.message.value);
      //         }
      //     })
      // },
      _ObjPatternMatched: function (evt) {
        var oValue = evt.getParameter("arguments").Ebeln.padStart(10, "0");
      
        this.getOwnerComponent().getModel().read("/HEADERXSet", {
          urlParameters: {
            "$expand": "HEADERANDITEMX"
          },
          filters: [new sap.ui.model.Filter("Ebeln", "EQ", oValue)],
          success: function (oData) {
            if (oData.results && oData.results.length > 0) {
              var itemData = oData.results[0].HEADERANDITEMX; 
              var poData = new sap.ui.model.json.JSONModel(itemData);
              this.getView().byId("ID").setModel(poData, "poData");
            }
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