Ext.define('sms.utils.Functions',{
	singleton:true,
	addNumberCommas: function (nStr){
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
		else if (x[1]-parseFloat(x[1]).toFixed(1)==0)
			return x1 + x2 + '0';
		else
			return x1 + x2;
	},
	moneyFormat: function (a){
		return [a.slice(0, a.length-2), '.', a.slice(a.length-2)].join('');
	}
});