Ext.define("ManTask.store.Chores", {
    extend: "Ext.data.Store",
    requires:"Ext.data.proxy.LocalStorage",
    config: {
        model: "ManTask.model.Chore",
        proxy: {
            type: 'localstorage',
            id: 'chores-app-store'
        },
        sorters: [{ property: 'dateCreated', direction: 'DESC'}],
		grouper: {
            sortProperty: "dateCreated",
            direction: "DESC",
            groupFn: function (record) {

                if (record && record.data.dateCreated) {
                    return record.data.dateCreated.toDateString();
                } else {
                    return '';
                }
            }
        }
    }
});