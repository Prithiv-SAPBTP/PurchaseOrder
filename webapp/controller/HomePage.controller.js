sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], (Controller,MessageToast,MessageBox) => {
    "use strict";

    return Controller.extend("newproject.controller.HomePage", {
        onInit() {   
        },
        onBack:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteLogin");
                 },
        onPress:function(evt){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("Itemdata",{ 
                        "Ebeln" : evt.getSource().getBindingContext().getProperty().Ebeln 
                    });
        },  
        onCreate:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("CreatePage");
        }, 
        onEdit:function(oEvent){
            var oContext = oEvent.getSource().getBindingContext();
            this._oSelectedPath = oContext.getPath();
            var oSelectedData = oContext.getObject();

            if (!this.addproduct) {
                this.addproduct = sap.ui.xmlfragment("newproject.view.Update", this);
                this.getView().addDependent(this.addproduct);
            }
            var oJSONModel = new sap.ui.model.json.JSONModel(oSelectedData);
            this.getView().setModel(oJSONModel,"editModel");
            this.addproduct.open();           
        },
        onSave:function () {
            var oDataModel = this.getView().getModel();
            var oUpdatedData = this.addproduct.getModel("editModel").getData();
            var sPath = this._oSelectedPath;
            oDataModel.update(sPath, oUpdatedData, {
                method: "PUT", 
                success: function () {
                    sap.m.MessageToast.show("Purchase Order updated successfully!");
                    this.addproduct.close();
                }.bind(this),
                error: function (oError) {
                    sap.m.MessageBox.error("Error updating Purchase Order.");
                }.bind(this)
            });
        },
        onCancel: function () {
            this.addproduct.close();
        }   
    });
      });