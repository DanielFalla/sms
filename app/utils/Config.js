Ext.define('sms.utils.Config',{
	singleton:true,
	endUserId: undefined,
	getUrlParameter: function(keyname){
        var strdata = window.location.search;

        var qindex = strdata.indexOf('?');
        if (qindex > -1) {
            strdata = strdata.substr(qindex + 1);
        }
        var elements = strdata.split('&');

        for (var i = 0; i < elements.length; i++) {
            var keypair = elements[i].split('=');
            if (keypair.length == 2 && keypair[0].toLowerCase() == keyname.toLowerCase()) {
                this.endUserId = decodeURI(keypair[1]).substr(0,decodeURI(keypair[1]).length-1);
            }
        }
	},
});