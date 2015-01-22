Ext.define('sms.view.NoKeyPresent',{
	extend: 'Ext.Panel',
	alias   : 'widget.nokeypresent',
	id: 'nokeypresent',
	config:{
		fullscreen: true,
		items:[{
			docked:'top',
			xtype: 'titlebar',
			title: 'LV Mobile Payment',
			layout:'vbox',
		},{
	    	items: [{
    	        xtype:'label',
    	        id:'nokeyerror',
    	        html:'No key provided.'
	    	}]
	    }]
	}
});