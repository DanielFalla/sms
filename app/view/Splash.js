Ext.define('sms.view.Splash',{
	requires:['sms.view.NumericPassword'],
	extend: 'Ext.Panel',
	alias   : 'widget.splash',
	id: 'splash',
	config:{
		fullscreen: true,
		items:[{
			docked:'top',
			xtype: 'toolbar',
			title: '',
			height: 42,
			layout: {
		        type: 'vbox',
		        align: 'left',
		        pack: 'left'
		    },
			items: [{
				xtype:'image',
				width:82,
				height:40,
				src:'resources/images/verizon-logo.png',
				hidden:false
			}]
		},{
			layout: {
		        type: 'vbox',
		        align: 'left',
		        pack: 'left'
		    },
	    	items: [{
    	        xtype:'label',
    	        width: '100%',
    	        html:'<section><div align=\'left\'><h1 class=\'padt18\'>VZ Message:</h1></div></section>',
	    	},{
	    		xtype:'label',
    	        id:'responselabel',
    	        width: '100%',
	    	}]
        },{
        	xtype: 'label',
        	docked: 'bottom',
        	html: '<section><hr/><h2>&copy;2015 Verizon<br/><br/></h2></section>',
        }]
	}
});