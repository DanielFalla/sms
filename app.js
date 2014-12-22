/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'sms',

    requires: [
        'Ext.MessageBox','sms.view.MainTabPanel','sms.model.PaymentOptions','sms.utils.Functions'
    ],

    views: [
        'sms.view.Splash',
        'sms.view.PaymentOptionsPanel'
    ],
    
    controllers:[
         'sms.controller.SMSController'
    ],
    
    stores:[
         'sms.store.UserStore'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
//    	if( Ext.os.is.Android ) { 
//    		this.loadCss( 'touch/resources/css/cupertino-classic.css' ); // css url will be like touch/resources/css/bb6.css
//		}
    	var panel=Ext.create('sms.view.MainTabPanel');
    	panel.getTabBar().hide();
    	panel.setActiveItem(0);
    	var popanel=Ext.getCmp('paymentoptions');
    	popanel.paymentOptions=Ext.create('sms.model.PaymentOptions',{
    		payment:undefined,
    		otherAmount:undefined,
    	});
    	
    	popanel.setRecord(popanel.paymentOptions);
        Ext.Viewport.add(panel);
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    },
    
    loadCss: function (filename) {
    	var css = document.createElement('link');
    	css.rel = "stylesheet"; 
    	css.type = "text/css"; 
    	css.href = filename; 
    	document.getElementsByTagName('head')[0].appendChild(css); 
	}
});
