Ext.define('sms.view.Splash',{
	requires:['sms.view.NumericPassword'],
	extend: 'Ext.Panel',
	alias   : 'widget.splash',
	id: 'splash',
	config:{
		fullscreen: true,
		items:[{
			docked:'top',
			xtype: 'titlebar',
			title: 'Promise to Pay',
			layout:'vbox',
		},{
	    	items: [{
    	        xtype:'label',
    	        id:'responselabel',
    	        width: '100%'
	    	}]
//        },{
//        	xtype: 'button',
//        	docked: 'bottom',
//        	text: 'Send',
//        	name: 'validateAccountButton',
//        	id: 'validateAccountButton'
        }]
	}
});