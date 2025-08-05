sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], (Controller,MessageToast,MessageBox) => {
    "use strict";

    return Controller.extend("newproject.controller.Login", {
        onInit() {
          
            var taskModel = new sap.ui.model.json.JSONModel("model/data.json");
            this.getView().setModel(taskModel);
        },
        onLogin: function () {
            var oView = this.getView();
            var sUsername = oView.byId("username").getValue();
            var sPassword = oView.byId("password").getValue();
           
            if (!sUsername || !sPassword) {
              MessageToast.show("Please enter username and password.");
              return; 
            }

            var getAllRoles = this.getView().getModel().oData.roles;

            for (let i = 0; i < getAllRoles.length; i++) {
                if (getAllRoles[i].Username == sUsername && getAllRoles[i].Password == sPassword) {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    MessageToast.show("Login Successful...");
                    oRouter.navTo("HomePage")
                    break;
                }
                else{
                    MessageToast.show("Enter a valid UserName or Password");    
                }
            }
      
          }
        });
      });