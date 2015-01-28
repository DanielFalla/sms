Ext.define('sms.view.NoKeyPresent',{
	extend: 'Ext.Panel',
	alias   : 'widget.nokeypresent',
	id: 'nokeypresent',
	requires:['Ext.Label'],
	config:{
		fullscreen: true,
		items:[{
			xtype: 'titlebar',
			id:'errorTitleBar',
		},{
			xtype: 'image',
			id:'errorImage',
			height:100
		},{
	    	items: [{
    	        xtype:'label',
    	        id:'nokeyerror',
    	        html:'<br><br><br><div align="center">Error: No key provided</div>'
	    	}]
	    }]
	}
});