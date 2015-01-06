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
			title: 'Verizon',
			layout:'vbox',
		},{
	    	items: [{
    	        xtype:'label',
    	        id:'responselabel',
    	        width: '100%',
    	        centered:true
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