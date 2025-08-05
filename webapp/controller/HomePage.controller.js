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
        onEdit:function(){
            
        }
    });
      });