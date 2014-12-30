Ext.define('sms.view.Splash',{
	extend: 'Ext.Panel',
	alias   : 'widget.splash',
	id: 'splash',
	config:{
		fullscreen: true,
		items:[{
			docked:'top',
			xtype: 'titlebar',
			title: 'LV Mobile Payment',
			layout:'vbox',
		},{
	    	items: [
	        	        {
	        	        	xtype: 'numberfield',
	        	        	id:'PIN',
	        	        	isFocused:true,
	        	        	label: 'PIN'
	        	        },
	        ]
        },{
        	xtype: 'button',
        	docked: 'bottom',
        	text: 'Send',
        	name: 'validateAccountButton',
        	id: 'validateAccountButton'
        }]
	}
});