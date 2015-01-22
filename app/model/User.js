Ext.define('sms.model.User', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            { name: 'firstName',     type: 'string' },
            { name: 'lastName',     type: 'string' },
            { name: 'minimumPayment', type: 'double' },
            { name: 'fullPayment', type: 'double' },
            { name: 'pin', type: 'integer' },
        ]
    }
});