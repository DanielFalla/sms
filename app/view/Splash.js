Ext.define('sms.view.Splash',{
	requires:['sms.view.NumericPassword','Ext.Img'],
	extend: 'Ext.Panel',
	alias   : 'widget.splash',
	id: 'splash',
	config:{
		fullscreen: true,
		items:[{
			xtype: 'titlebar',
			id:'titleBar',
		},{
			xtype: 'image',
			id:'splashImage',
			height:100
		},{
	    	items: [{
    	        xtype:'fieldset',
    	        id:'splashfieldset',
    	        defaults:{
					labelWidth:'85%'
				},
    	        items:[
	               {
	            	   xtype: 'numericpasswordfield',
	            	   id:'PIN',
	            	   label: 'Please enter your PIN:',
	            	   labelWidth:'80',
	               },
               ]
	    	}]
        },{
        	xtype: 'button',
        	docked: 'bottom',
        	text: 'Send',
        	name: 'validateAccountButton',
        	id: 'validateAccountButton'
        }]
	}
});