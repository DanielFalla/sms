Ext.define('sms.view.Splash',{
	extend: 'Ext.Panel',
	alias   : 'widget.splash',
	config:{
		fullscreen: true,
//		title: 'Welcome',
		items:[{
			docked:'top',
			xtype: 'titlebar',
			title: 'LV Mobile Payment App',
			layout:'vbox',
		},{
	     	items: [
    	        {
    	        	xtype: 'fieldset',
    	        	title: 'Please enter your PIN number',
//    	        	instructions: '&copy; Copyright 2015 LiveVox, Inc. All rights reserved',
    	        	items: [
    	        	        {
    	        	        	xtype: 'numberfield',
    	        	        	id:'PINN',
    	        	        	label: 'PIN #'
    	        	        },
    	        	]
    	        }
	        ]
		},{
        	xtype: 'button',
        	docked: 'bottom',
        	text: 'Send',
        	name: 'validateAccountButton',
        }]
	}
});