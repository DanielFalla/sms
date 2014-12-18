Ext.define('sms.view.PaymentOptionsPanel',{
	extend: 'Ext.form.Panel',
	model:'sms.model.PaymentOptions',
	alias:'widget.paymentoptions',
	id:'paymentoptions',
	paymentOptions:undefined,
	config:{
		fullscreen:true,
		items:[{
			docked:'top',
			xtype: 'titlebar',
			title: 'Payment Options',
			layout:'vbox',
		},{
			items:[{
				xtype: 'fieldset',
				title: 'Please select an option',
				defaults:{
					xtype:'radiofield',
					labelWidth:'50%'
				},
				items:[
				    {
				    	name: 'payment',
				    	value: 'full',
				    	label: 'Full payment',
				    },{
				    	name:'payment',
				    	value:'min',
				    	label: 'Minimum payment',
				    },{
				    	xtype: 'textfield',
				    	label: 'Other amount',
				    	name:'otherAmount',
				    	placeHolder: 'USD',
				    	align:'right'
				    },{
				    	name:'payment',
				    	value:'agent',
				    	label: 'Talk to agent',
				    }
		        ]
			},{
	        	xtype: 'button',
	        	text: 'Send',
	        	name: 'sendPaymentOptionButton',
	        }]
		}]
	}
});