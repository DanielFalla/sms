Ext.define('sms.controller.SMSController',{
	extend: 'Ext.app.Controller',
	config: {
        refs: [{
           selector : ['name=validateAccountButton'],
           ref : 'validateAccountButton'
        },{
        	selector : ['name=maintabpanel'],
            ref : 'mainTabPanel'
        }]
    },
	init: function(){
		this.control({
			'[name=validateAccountButton]':{
    			tap:this.validateAccount
    		},
    		'[name=sendPaymentOptionButton]':{
    			tap:this.sendPaymentOptionButton
    		},
		});
	},
	
	validateAccount: function(){
		debugger;
		var tabPanel=Ext.getCmp('maintabpanel');
		var button=Ext.getCmp('PINN');
		if (Ext.getCmp('PINN').getValue()=="123")
			tabPanel.setActiveItem(1);
		else
			Ext.Msg.alert('Alert','Invalid PIN number. Please try again');
    },
    
    sendPaymentOptionButton: function(){
    	debugger;
    	var form=Ext.getCmp('paymentoptions');
    	form.updateRecord(form.paymentOptions, true);
    	
    }
});