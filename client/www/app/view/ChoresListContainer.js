Ext.define("ManTask.view.ChoresListContainer", {
    extend: "Ext.Container",
    alias: "widget.choreslistcontainer",

    initialize: function () {

        this.callParent(arguments);

        var newButton = {
            xtype: "button",
            text: 'New',
            ui: 'action',
            handler: this.onNewButtonTap,
            scope: this
        };

        var topToolbar = {
            xtype: "toolbar",
            title: 'My Chores',
            docked: "top",
            items: [
                { xtype: 'spacer' },
                newButton
            ]
        };
		
		var choresList = {
            xtype: "choreslist",
			store: Ext.getStore("Chores"),
            listeners: {
                disclose: { fn: this.onChoresListDisclose, scope: this }
            }
        };

        this.add([topToolbar, choresList]);

    },
    onNewButtonTap: function () {
        console.log("newChoreCommand");
        this.fireEvent("newChoreCommand", this);
    },
	onChoresListDisclose: function (list, record, target, index, evt, options) {
		console.log("editChoreCommand");
		this.fireEvent('editChoreCommand', this, record);
	},
    config: {
        layout: {
            type: 'fit'
        }
    }
});




