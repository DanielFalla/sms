Ext.define('sms.controller.SMSController',{
	extend: 'Ext.app.Controller',
	requires:['sms.model.User'],
	config: {
        refs: {
        	validateAccountButton : 'name=validateAccountButton',
        	mainTabPanel : 'name=maintabpanel',
        	otherAmount : 'name=otherAmount',
        }
    },
	init: function(){
		this.control({
			'[name=validateAccountButton]':{
    			tap:this.loadOptions
    		},
    		'[name=sendPaymentOptionButton]':{
    			tap:this.sendPaymentOptionButton
    		},
    		'[name=otherAmount]':{
    			keyup:this.uncheckRadioButtons
    		},
    		'[name=payment]':{
    			check:this.emptyOtherAmountField
    		},
		});
	},
	
	loadOptions: function(){
		
		var tabPanel=Ext.getCmp('maintabpanel');
		var button=Ext.getCmp('PINN');
		this.validateAccount(tabPanel);
    },
    
    validateAccount: function(tabPanel){
    	if (Ext.getCmp('PINN').getValue()=="123"){
    		var user=Ext.create('sms.model.User',{
    			firstName:'Daniel',
    			lastName:'Falla',
    			minimumPayment:200.45,
    			fullPayment:400.00
    		});
    		this.setPaymentLabels(user);
    		tabPanel.setActiveItem(1);
    	}
    	else{
    		Ext.Msg.alert('Alert','Invalid PIN number. Please try again');
    	}
    },
    
    sendPaymentOptionButton: function(){
    	var form=Ext.getCmp('paymentoptions');
    	form.updateRecord(form.paymentOptions, true);
    	var v=form.paymentOptions.get("payment");
    	if (form.paymentOptions.get("payment")==null && form.paymentOptions.get("otherAmount")==null){
    		Ext.Msg.alert('No option selected');
    	}else if ((form.paymentOptions.get("payment")!='agent')
    		|| form.paymentOptions.get("otherAmount")!=null){
    		Ext.Msg.alert('Alert', 'Your payment request is being processed. Thank you');
    	}else{
    		Ext.Msg.alert('Alert','An agent will call you shortly');
    	}
    },
    
    uncheckRadioButtons: function(){
    	Ext.getCmp('full').uncheck();
    	Ext.getCmp('min').uncheck();
    	Ext.getCmp('agent').uncheck();
    },
    
    emptyOtherAmountField: function( check, e, eOpts){
    	Ext.getCmp('otherAmount').setValue("");
    },
    
    setPaymentLabels: function(user){
    	var options=Ext.getCmp('fieldset');
    	options.setTitle(user.get('firstName')+', you\'re late on your payments</br>Please select an option below:');
    	var fullOption=Ext.getCmp('full');
    	fullOption.setLabel('<div>Full payment: $'+user.get('fullPayment')+"</div>");
		var minOption=Ext.getCmp('min');
		minOption.setLabel('Minimum payment: $'+user.get('minimumPayment'));
		var fullOption=Ext.getCmp('full');
    }
    
});