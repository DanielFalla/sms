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
			items: [{
				xtype:'image',
				width:82,
				height:42,
				src:'resources/images/verizon-logo.png',
			}]
		},{
			xtype:'panel',
			id:'messagepanel',
			height: '100%',
			items: [
			        {
			        	xtype:'label',
			        	html:'<section class="padding"><div align=\'left\'><h1 class=\'padt18\'>VZ Message:</h1></div></section>',
			        },{
			        	xtype:'label',
			        	id:'responselabel',
			        },{
			        	xtype:'label',
			        	cls: 'bottom-align',
			        	html:'<section><p class=\'fine-print padding\'>NOTICE: Add legal notice here</p></section>'
			        }
			]
        },{
        	xtype:'panel',
        	docked: 'bottom',
        	layout:{
        		type:'hbox',
        		pack:'center'
        	},
        	defaults:{ flex:1 },
        	items:[{
        		xtype: 'panel',
        		items:[{
        			xtype:'label',
        			html: '<hr/>',
        		},{
        			xtype:'label',
        			html: '<section class="padding"><h2>&copy;2015 Verizon<br/><br/></h2></section>',
        		},{
        			xtype:'label',
        			html:'<section class=\'padt15 padding-left\'><a href="https://secure.opinionlab.com/ccc01/o.asp?id=kMHhvBit&amp;referer=https://m.verizon.com/mForYourHome/mo/BundleQualify.ASPX?Message=NOSESS&amp;custom_var=0fde9edd434c45f8bbfec5cae049473f" >Feedback</a></section>'
        		},{
        			xtype:'label',
        			html:'<section class=\'padt15 padding-left\'><a href="https://www.verizon.com/about/privacy/" target="_blank">Privacy Policy</a></section>'
        		},{
        			xtype:'label',
        			html:'<section class=\'padt15 padding-left\'><a href="https://www.verizon.com/about/terms/" target="_blank">Terms &amp; Conditions</a></section>'
        		},{
        			xtype:'label',
        			html:'<section class=\'padt15 padding-left\'><a href="http://www.verizon.com/?r&amp;mobileexperience=false">Go to Full Site</a></section>'
        		}]
        	},{
        		xtype: 'panel',
        		align: 'right',
        		items:[{
        			xtype:'label',
        			html:'<hr/>'
        		},{
        			xtype: 'panel',
        			cls: 'social-media',
        			layout:{
        				type:'vbox',
        				pack:'top'
        			},
        			items:[{
        				xtype:'label',
        				html:'<section class="padding-right"><h2><b>Connect with us!</b></h2></section>'
        			},{
        				xtype:'panel',
        				layout:{
            				type:'hbox',
            				pack:'right'
            			},
            			items:[{
            				xtype:'label',
            				html:'<section class=\'icons-padt padding-right\'><a href="http://www.facebook.com/VerizonFiOS"><img src="resources/images/facebook.png" /></a><a href="http://twitter.com/verizon"><img src="resources/images/twitter.png" /></a><a href="https://plus.google.com/105239496200717206978/posts" /><img src="resources/images/gplus.png"</a></section>'
            			}]
        			}]
        		}],
        	}]
        },
        
        ]
	}
});