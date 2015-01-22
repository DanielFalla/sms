Ext.define('sms.view.NoKeyPresent',{
	extend: 'Ext.Panel',
	alias   : 'widget.nokeypresent',
	id: 'nokeypresent',
	requires:['Ext.Label'],
	config:{
		fullscreen: true,
		layout:'fit',
		items:[{
			docked:'top',
			xtype: 'titlebar',
			title: 'LV Mobile Payment',
			layout:'vbox',
		},{
	    	items: [{
    	        xtype:'label',
    	        id:'nokeyerror',
    	        html:'<br><br><br><div align="center">Error: No key provided</div>'
	    	}]
	    }]
	}
});