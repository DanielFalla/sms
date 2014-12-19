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
				id:'fieldset',
				title: 'Please select an option',
				defaults:{
					xtype:'radiofield',
					labelWidth:'80%'
				},
				items:[
				    {
				    	id: 'full',
				    	name: 'payment',
				    	value: 'full',
				    },{
				    	id: 'min',
				    	name:'payment',
				    	value:'min',
				    },{
				    	id: 'otherAmount',
				    	xtype: 'numberfield',
				    	label: 'Other amount',
				    	labelWidth:'80',
				    	name:'otherAmount',
				    	minValue: 0,
				    },{
				    	id: 'agent',
				    	name:'payment',
				    	value:'agent',
				    	label: 'Talk to an agent',
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