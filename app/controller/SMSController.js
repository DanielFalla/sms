Ext.define('sms.controller.SMSController',{
	extend: 'Ext.app.Controller',
	requires:['sms.model.User', 'sms.view.NumericPassword'],
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
    		'[name=payment]':{
    			check:this.emptyOtherAmountField
    		},
    		'[id=PIN]':{
    			keyup:this.enterPIN,
    			blur:this.blurPIN
    		},
    		'[id=otherAmount]':{
    			focus:this.setCursor,
    			keyup:this.enterOtherAmount
    		},
		});
	},
	
	blurPIN:function(e,eOpts){
		Ext.getCmp('PIN').focus();
	},
	
	enterPIN: function( e, eOpts){
		if (eOpts.event.keyCode == 13)
			this.loadOptions();
	},
	
	enterOtherAmount: function(e, eOpts){
		if (eOpts.event.keyCode == 13)
			this.sendPaymentOption();
		else{
			Ext.getCmp('full').uncheck();
	    	Ext.getCmp('min').uncheck();
	    	Ext.getCmp('agent').uncheck();
	    	var form=Ext.getCmp('paymentoptions');
	    	form.paymentOptions.set('payment',null);
	    	
	    	//Mask the input number
	    	var str;
	    	if (eOpts.event.keyCode != 48){
	    		var val= Ext.getCmp('otherAmount').getValue();
	    		str=val.toString().replace(".", "");
	    	}else{
	    		var val= Ext.getCmp('otherAmount').getValue();
	    		if ((val-Math.floor(val)).toFixed(2)==0 && val!=0)
	    			str=val.toString().replace(".", "")+'000';
	    		else if ((val-Math.floor(val)).toFixed(2)>=0.1 && val!=0)
	    			str=val.toString().replace(".", "")+'00';
	    		else if ((val-Math.floor(val)).toFixed(2)<0.1 && val!=0)
	    			str=val.toString().replace(".", "")+'0';
	    		else
	    			str=val.toString().replace(".", "");
	    	}
	    	var input=document.getElementsByName("otherAmount");
	    	input[0].value= parseFloat(sms.utils.Functions.insertStringInString(str,'.')).toFixed(2);
		}
	},
	
	setCursor: function(a, e, eOpts){
		//Set value to zero if there's nothing in the box
		if (Ext.getCmp('otherAmount').getValue()==null
				|| Ext.getCmp('otherAmount').getValue()==""){
	    	var input=document.getElementsByName("otherAmount");
	    	input[0].value= parseFloat(0).toFixed(2);
		}
	},
	
	loadOptions: function(){
		var tabPanel=Ext.getCmp('maintabpanel');
		this.validateAccount(tabPanel);
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