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
	    	items: [{
    	        xtype:'fieldset',
    	        id:'splash',
    	        defaults:{
					labelWidth:'85%'
				},
    	        items:[
	               {
	            	   xtype: 'numberfield',
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