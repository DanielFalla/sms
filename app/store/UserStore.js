Ext.define('SMS.store.DemoTreeStore', {
			extend: 'Ext.data.TreeStore',
//            storeId: 'TreeStore',
            requires: ['SMS.model.DemoEntry'],
            config:{
            	model:'SMS.model.DemoEntry',
            	proxy: {
            		type: 'jsonp',
            		url: 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&q=http://feeds.feedburner.com/SenchaBlog',
            		reader: {
            			type: 'json',
            			rootProperty: 'responseData.feed.entries'
            		}
            	}
            },
//            fields: ['title', 'link', 'author', 'contentSnippet', 'content', {
//                name: 'leaf',
//                defaultValue: true
//            }],
//            root: {
//                leaf: false
//            },
        });