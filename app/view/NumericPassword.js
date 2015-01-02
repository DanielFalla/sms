Ext.define('sms.view.NumericPassword', {
    extend : 'Ext.field.Number',
    alias  : 'widget.numericpasswordfield',

    labelCls:'numeric-password',
    config : {
    	component: {
    		pattern : '[0-9]*',
	    }
    },

    initialize : function() {
        this.callParent();

        var component = this.getComponent();

        component.input.on({
            scope   : this,
            keydown : 'onKeyDown'
        });
    },

    onKeyDown : function(e) {
        var code = e.browserEvent.keyCode;

        if (!(code >= 48 && code <= 57) && !(code >= 97 && code <= 105) && code !== 46 && code !== 8) {
            e.stopEvent();
        }
    }
});