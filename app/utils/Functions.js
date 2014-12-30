Ext.define('sms.utils.Functions',{
	singleton:true,
	addCommas: function (nStr){
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
		    x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		
		if (x.length==1)
			return x1 + x2 + '.00';
		else
			return x1 + x2;
	},
	insertStringInString: function (a, b){
		return [a.slice(0, a.length-2), b, a.slice(a.length-2)].join('');
	}
});