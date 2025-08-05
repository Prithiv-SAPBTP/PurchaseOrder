sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/Messaging"
], (Controller,MessageToast,MessageBox) => {
    "use strict";

    return Controller.extend("newproject.controller.CreatePage", {
        onInit() {
            // Messaging.registerObject(this.getView(), true);
            this.getView().setModel(this.getOwnerComponent().getModel("odata"));
        },
        onBack:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("HomePage");
            this.onRead();
                 },
        onRead:function(){
            var oDataModel = this.getOwnerComponent().getModel();
            var ojsonModel = new sap.ui.model.JSONModel();
            oDataModel.read("/HEADERXSet",{
                success:function(ores){
                    ojsonModel.setProperty("/HEADERXSet",ores.results);
                    this.getView().setModel(ojsonModel,"ojsonModel");
                }.bind(this),
                error:function(oError){

                }.bind(this)
            })
                 },
        onSave:function(evt){
    
           
            // Replace with actual input values from your UI
            var oEntry = {
                "Ebeln": this.getView().byId("idEbeln").getValue(),
                "Bukrs": this.getView().byId("idBukrs").getValue(),
                "Bstyp": this.getView().byId("idBstyp").getValue(),
                "Bsart": this.getView().byId("idBsart").getValue(),
                "Statu": this.getView().byId("idStatu").getValue(),
                "Lponr": this.getView().byId("idLponr").getValue(),
                // "Aedat": this.getView().byId("idAedat").getDateValue(),
                "Lifnr": "1001"
            };
            var oDataModel = this.getOwnerComponent().getModel();
            oDataModel.create("/HEADERXSet", oEntry, {
                success: function(oData, response) {
                    sap.m.MessageToast.show("Purchase Order created successfully!");
                }.bind(this),
                error: function(oError) {
                    sap.m.MessageBox.error("Error creating Purchase Order.");
                }.bind(this)
            });
        },
        onBstypValueHelp: function () {
            var oView = this.getView();
      
            if (!this._oValueHelpDialog) {
              this._oValueHelpDialog = sap.ui.xmlfragment(
                "newproject.view.BstypValueHelp", this
              );
              oView.addDependent(this._oValueHelpDialog);
            }
      
            // bind data
            this._oValueHelpDialog.bindAggregation("items", {
              path: "/BstypValueHelpSet",
              template: new sap.m.StandardListItem({
                title: "{Bstyp}",
                description: "{Description}"
              })
            });
      
            this._oValueHelpDialog.open();
          },
      
          onValueHelpSearch: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("Bstyp", FilterOperator.Contains, sValue);
      
            var oBinding = oEvent.getSource().getBinding("items");
            oBinding.filter([oFilter]);
          },
      
          onValueHelpClose: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
      
            if (oSelectedItem) {
              var sBstyp = oSelectedItem.getTitle();
              this.byId("idBstyp").setValue(sBstyp);
            }
      
            oEvent.getSource().getBinding("items").filter([]);
          },
      
          onValueHelpCancel: function (oEvent) {
            oEvent.getSource().getBinding("items").filter([]);
          },
          onCancel:function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("HomePage");
            // this.onRead();
          }
    });
      });