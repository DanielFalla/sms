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
			layout: {
		        type: 'vbox',
		        align: 'center',
		        pack: 'center'
		    },
			items: [{
				xtype:'image',
				width:120,
				height:41,
				src:'resources/images/verizon-logo.png',
				hidden:false
			}]
		},{
	    	items: [{
    	        xtype:'label',
    	        id:'responselabel',
    	        width: '100%',
    	        centered:true
	    	}]
        },{
        	xtype: 'label',
        	docked: 'bottom',
        	html: '<section><hr/><h2>&copy;2015 Verizon<br/><br/></h2></section>',
        }]
	}
});