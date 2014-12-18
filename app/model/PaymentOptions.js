Ext.define('sms.model.PaymentOptions', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'payment',     type: 'string' },
            { name: 'otherAmount',     type: 'double' },
        ]
    }
});