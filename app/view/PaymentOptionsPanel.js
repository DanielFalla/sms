Ext.define('sms.view.PaymentOptionsPanel',{
	extend: 'Ext.form.Panel',
	model:'sms.model.PaymentOptions',
	alias:'widget.paymentoptions',
	id:'paymentoptions',
	requires: [
	           'Ext.TitleBar',
	           'Ext.form.FieldSet',
	           'Ext.field.Radio',
	           'Ext.field.Number'
	       ],
	paymentOptions:undefined,
	config:{
		fullscreen:true,
		layout:'fit',
		items:[{
			docked:'top',
			xtype: 'titlebar',
			title: 'Payment Options',
			layout:'vbox',
		},{
			items:[{
				xtype: 'fieldset',
				id:'fieldset',
				instructions:'Please select an option',
				defaults:{
					xtype:'radiofield',
					labelWidth:'90%'
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
				    	align: 'right'
				    },{
				    	id: 'agent',
				    	name:'payment',
				    	value:'agent',
				    	label: 'Talk to an agent',
				    }
		        ]
			}]
		},{
        	xtype: 'button',
        	docked:'bottom',
        	text: 'Send',
        	name: 'sendPaymentOptionButton',
        }]
	}
});