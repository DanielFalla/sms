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
	    	var val= Ext.getCmp('otherAmount').getValue();
	    	if (eOpts.event.keyCode != 8)
	    		str=val.toFixed(3).replace(".", "");
	    	else
	    		str=val.toFixed(1).replace(".", "");
	    	var input=document.getElementsByName("otherAmount");
	    	input[0].value= parseFloat(sms.utils.Functions.moneyFormat(str)).toFixed(2);
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
    	var url='/SMS/auth/[key]';
    	sms.utils.Config.pin=Ext.getCmp('PIN').getValue();
    	url=url.replace('[key]',sms.utils.Config.endUserId);
    	var me=this;
    	var param='pin='+sms.utils.Config.pin;
    	Ext.getCmp('maintabpanel').setMasked(true);
    	Ext.Ajax.request({
    		url:url,
    		scope:me,
    		params:param,
    		noCache: false,
    		method:'POST',
    		success: function(response, request){
                var account = Ext.decode(response.responseText).account;
                var user=Ext.create('sms.model.User',{
        			firstName:account.name,
        			minimumPayment:parseFloat(account.minimumPayment),
        			fullPayment:parseFloat(account.balance)
        		});
        		me.setPaymentLabels(user);
        		tabPanel.setActiveItem(1);
            	Ext.getCmp('maintabpanel').setMasked(false);
    		},
    		failure: function(response,request){
    			this.showResponseError('Invalid PIN. Please try again');
    			Ext.getCmp('PIN').setValue('');
    			Ext.getCmp('maintabpanel').setMasked(false);
    		},
    		headers: {
    			'Accept':'application/json',
    			'Content-Type':'application/x-www-form-urlencoded'
    		}
    	
    	});
    },
    
    sendPaymentOption: function(){
    	var form=Ext.getCmp('paymentoptions');
    	form.updateRecord(form.paymentOptions, true);
    	var amount=form.paymentOptions.get("payment");
    	if (form.paymentOptions.get("payment")==null && form.paymentOptions.get("otherAmount")==null){
    		this.showResponseError('Please select an option');
    	}else if (form.paymentOptions.get("otherAmount")!=null){
    			var otherAmount=form.paymentOptions.get("otherAmount");
    			var minPayment=this.user.get('minimumPayment');
    			var fullPayment=this.user.get('fullPayment');
    			if (!(minPayment<=otherAmount && otherAmount<=fullPayment))
    				this.showResponseError('The amount specified must be between minimum and full payment amounts');
    			else
    				this.sendPayment(otherAmount);
    	}else if(form.paymentOptions.get("payment")!='agent'){
    		if (amount=='min')
    			this.sendPayment(this.user.minimumAmount);
    		if (amount=='full')
    			this.sendPayment(this.user.balance);
    	}else{
    		this.agentCallback();
    	}
    },
    
    sendPayment: function(amount){
    	var url='/SMS/pay/[key]/authorize';
    	url=url.replace('[key]',sms.utils.Config.endUserId);
    	var me=this;
    	var param='pin='+sms.utils.Config.pin;

    	Ext.getCmp('maintabpanel').setMasked(true);
    	Ext.Ajax.request({
    		url:url,
    		scope:me,
    		noCache: false,
    		method:'POST',
    		params:param,
    		success: function(response, request){
    			this.showSuccessMessage('Your payment request is being processed. Thank you');
    			Ext.getCmp('maintabpanel').setMasked(false);
    		},
    		failure: function(response,request){
    			this.showResponseError('We couldn\'t process your request. Please try again later');
    			Ext.getCmp('maintabpanel').setMasked(false);
    		},
    		headers: {
    			'Accept':'application/json',
    			'Content-Type':'application/x-www-form-urlencoded'
    		}
    	
    	});
    },
    
    showResponseError: function(msg){
    	Ext.create('Ext.MessageBox').show(
    	        {
    	            title: 'Error',
    	            message: msg,
    	            buttons: Ext.MessageBox.OK
    	        }        
    		);
    },
    
    showSuccessMessage: function(msg){
    	Ext.create('Ext.MessageBox').show(
    	        {
    	            title: 'Alert',
    	            message: msg,
    	            buttons: Ext.MessageBox.OK
    	        }        
    		);
    },
    
    agentCallback: function(){
    	var url='/SMS/response/CALLBACK/[key]';
    	url=url.replace('[key]',sms.utils.Config.endUserId);
    	var param='pin='+sms.utils.Config.pin;
    	var me=this;

    	Ext.getCmp('maintabpanel').setMasked(true);
    	Ext.Ajax.request({
    		url:url,
    		scope:me,
    		method:'POST',
    		params:param,
    		success: function(response, request){
    			this.showSuccessMessage('An agent will call you shortly');
    			Ext.getCmp('maintabpanel').setMasked(false);
    		},
    		failure: function(response,request){
    			this.showResponseError('We couldn\'t process your request. Please try again later');
    			Ext.getCmp('maintabpanel').setMasked(false);
    		},
    		headers: {
    			'Accept':'application/json',
    			'Content-Type':'application/x-www-form-urlencoded'
    		}
    	});
    },
    
    emptyOtherAmountField: function( check, e, eOpts){
    	Ext.getCmp('otherAmount').setValue("");
    },
    
    setPaymentLabels: function(user){
    	this.user=user;
    	var options=Ext.getCmp('fieldset');
    	options.setTitle(user.get('firstName')+', you\'re late on your payment');
    	var fullOption=Ext.getCmp('full');
    	fullOption.setLabel('<div style="width: 100%; overflow: hidden;"><div style="float: left;">Full payment:</div><div align="right"> $'+sms.utils.Functions.addNumberCommas(user.get('fullPayment'))+"</div></div>");
		var minOption=Ext.getCmp('min');
		minOption.setLabel('<div style="width: 100%; overflow: hidden;"><div style="float: left;">Minimum payment:</div><div align="right"> $'+sms.utils.Functions.addNumberCommas(user.get('minimumPayment'))+"</div></div>");
		var fullOption=Ext.getCmp('full');
    }
    
});