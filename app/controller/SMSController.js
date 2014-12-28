Ext.define('sms.controller.SMSController',{
	extend: 'Ext.app.Controller',
	requires:['sms.model.User'],
	user:undefined,
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
    			tap:this.sendPaymentOption
    		},
    		'[name=otherAmount]':{
    			keyup:this.uncheckRadioButtons
    		},
    		'[name=payment]':{
    			check:this.emptyOtherAmountField
    		},
    		'[id=PIN]':{
    			keyup:this.enterPIN
    		},
    		'[id=otherAmount]':{
    			keyup:this.enterOtherAmount
    		}
		});
	},
	
	enterPIN: function( e, eOpts){
		if (eOpts.event.keyCode == 13)
			this.loadOptions();
	},
	
	enterOtherAmount: function(e, eOpts){
		if (eOpts.event.keyCode == 13)
			this.sendPaymentOption();
	},
	
    loading: true,
    
    
	
	loadOptions: function(){
		if (this.loading){
//			Ext.Msg.alert('Error','Invalid PIN. Please try again').setTop(4000);
    		setTimeout(function() {
                
//    			Ext.Msg.alert('Error','Invalid PIN. Please try again').hide();
            }, 1000);
    		this.loading=false;
		}else{
			var tabPanel=Ext.getCmp('maintabpanel');
			this.validateAccount(tabPanel);
		}
    },
    
    validateAccount: function(tabPanel){
    	if (Ext.getCmp('PIN').getValue()=="123"){
    		var user=Ext.create('sms.model.User',{
    			firstName:'Daniel',
    			lastName:'Falla',
    			minimumPayment:2000.45,
    			fullPayment:4000.00
    		});
    		this.setPaymentLabels(user);
    		tabPanel.setActiveItem(1);
    	}
    	else{
    		Ext.Msg.alert('Error','Invalid PIN. Please try again');
    	}
    },
    
    sendPaymentOption: function(){
    	var form=Ext.getCmp('paymentoptions');
    	form.updateRecord(form.paymentOptions, true);
    	var v=form.paymentOptions.get("payment");
    	if (form.paymentOptions.get("payment")==null && form.paymentOptions.get("otherAmount")==null){
    		Ext.Msg.alert('Error', 'Please select an option');
    	}else if (form.paymentOptions.get("otherAmount")!=null){
    			var otherAmount=form.paymentOptions.get("otherAmount");
    			var minPayment=this.user.get('minimumPayment');
    			var fullPayment=this.user.get('fullPayment');
    			if (!(minPayment<=otherAmount && otherAmount<=fullPayment))
    				Ext.Msg.alert('Error', 'The amount specified must be between minimum and full payment amounts');
    			else
    				Ext.Msg.alert('Alert', 'Your payment request is being processed. Thank you');
    	}else if(form.paymentOptions.get("payment")!='agent'){
    		Ext.Msg.alert('Alert', 'Your payment request is being processed. Thank you');
    	}else{
    		Ext.Msg.alert('Alert','An agent will call you shortly');
    	}
    },
    
    uncheckRadioButtons: function(){
    	Ext.getCmp('full').uncheck();
    	Ext.getCmp('min').uncheck();
    	Ext.getCmp('agent').uncheck();
    	var form=Ext.getCmp('paymentoptions');
    	form.paymentOptions.set('payment',null);
    },
    
    emptyOtherAmountField: function( check, e, eOpts){
    	Ext.getCmp('otherAmount').setValue("");
    },
    
    setPaymentLabels: function(user){
    	this.user=user;
    	var options=Ext.getCmp('fieldset');
    	options.setTitle(user.get('firstName')+', you\'re late on your payment');
    	var fullOption=Ext.getCmp('full');
    	fullOption.setLabel('<div style="width: 100%; overflow: hidden;"><div style="float: left;">Full payment:</div><div align="right"> $'+sms.utils.Functions.addCommas(user.get('fullPayment'))+"</div></div>");
		var minOption=Ext.getCmp('min');
		minOption.setLabel('<div style="width: 100%; overflow: hidden;"><div style="float: left;">Minimum payment:</div><div align="right"> $'+sms.utils.Functions.addCommas(user.get('minimumPayment'))+"</div></div>");
		var fullOption=Ext.getCmp('full');
    }
    
});