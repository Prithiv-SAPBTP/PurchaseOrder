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
        },
        onDelete:function(){
            var selectedTableRow = this.getView().byId("Id").getSelectedItem();
            var oSelectedData = selectedTableRow.getBindingContext().getObject();
            MessageBox.confirm("Are you sure want to delete the Record",{
                title: "Confirm",
                onClose:function(oAction){
                    if(oAction === 'OK'){
                        this.onDeleteRecord(oSelectedData);
                    }
                }.bind(this),
                actions:[sap.m.MessageBox.Action.OK,
                    sap.m.MessageBox.Action.CANCEL],
                    emphasizedAction:sap.m.MessageBox.Action.OK,
            })            
        },
        onDeleteRecord:function(oRecord){
            var oDataModel = this.getOwnerComponent().getModel();
            var sEbeln = oRecord.Ebeln.toString().padStart(10, '0');
            var sPath = "/HEADERXSet(Ebeln='" + sEbeln + "')";

            oDataModel.remove(sPath, {
                success: function() {
                    sap.m.MessageToast.show("Record deleted successfully!");
                }.bind(this),
                error: function() {
                    sap.m.MessageBox.error("Error deleting record.");
                }.bind(this)
            });
        }
    });
      });