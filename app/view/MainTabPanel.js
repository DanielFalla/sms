Ext.define("sms.view.MainTabPanel", {
	extend:'Ext.tab.Panel',
    xtype:'maintabpanel',
    name:'maintabpanel',
    id:'maintabpanel',
    config:{
    	fullscreen: true,
    	items: [
	        {
	        	title: 'Splash',
	        	iconCls: 'home',
	        	cls: 'home',
	        	xtype:'splash'
	        },{
	        	title: 'Payment Options',
	        	iconCls: 'star',
	        	
	        	xtype:'paymentoptions'
	        },{
	        	title: 'Payment Options',
	        	iconCls: 'star',
	        	
	        	xtype:'nokeypresent'
	        }
        ]
    }
});