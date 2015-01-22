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
    	var url='/SMS/auth/[key]/{pin}?pin=[pin]';
    	debugger;
    	sms.utils.Config.pin=Ext.getCmp('PIN').getValue();
    	url=url.replace('[key]',sms.utils.Config.endUserId);
    	url=url.replace('[pin]',sms.utils.Config.pin);
    	var me=this;
    	Ext.Ajax.request({
    		scope:me,
    		url:url,
    		success: function(response, request){
                var account = Ext.decode(response.responseText).account;
                var user=Ext.create('sms.model.User',{
        			firstName:'Daniel',
        			minimumPayment:parseFloat(account.minimumPayment),
        			fullPayment:parseFloat(account.balance)
        		});
        		me.setPaymentLabels(user);
        		tabPanel.setActiveItem(1);
    		},
    		failure: function(response,request){
    			Ext.Msg.alert('Error','Invalid PIN. Please try again');
    		}
    	
    	});
    },
    
    sendPaymentOption: function(){
    	var form=Ext.getCmp('paymentoptions');
    	form.updateRecord(form.paymentOptions, true);
    	var amount=form.paymentOptions.get("payment");
    	if (form.paymentOptions.get("payment")==null && form.paymentOptions.get("otherAmount")==null){
    		Ext.Msg.alert('Error', 'Please select an option');
    	}else if (form.paymentOptions.get("otherAmount")!=null){
    			var otherAmount=form.paymentOptions.get("otherAmount");
    			var minPayment=this.user.get('minimumPayment');
    			var fullPayment=this.user.get('fullPayment');
    			if (!(minPayment<=otherAmount && otherAmount<=fullPayment))
    				Ext.Msg.alert('Error', 'The amount specified must be between minimum and full payment amounts');
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
    	debugger;
    	var url='/SMS/pay/[key]/authorize?pin=[pin]';
    	url=url.replace('[key]',sms.utils.Config.endUserId);
    	url=url.replace('[pin]',sms.utils.Config.pin);
    	var me=this;
    	Ext.Ajax.request({
    		url:url,
    		scope:me,
    		success: function(response, request){
    			Ext.Msg.alert('Alert', 'Your payment request is being processed. Thank you');
    		},
    		failure: function(response,request){
    			debugger;
    			me.showResponseError();
    		}
    	
    	});
    },
    
    showResponseError: function(){
    	Ext.Msg.alert('Error','We couldn\'t process your request. Please try again later');
    },
    
    agentCallback: function(){
    	var url='';
		
    	Ext.Ajax.request({
    		url:url,
    		success: function(response, request){
    			Ext.Msg.alert('Alert','An agent will call you shortly');
    		},
    		failure: function(response,request){
    			Ext.Msg.alert('Error','We couldn\'t process your request. Please try again later');
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