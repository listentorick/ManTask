Ext.define("ManTask.view.ChoreEditor", {
    extend: "Ext.form.Panel",
    requires: "Ext.form.FieldSet",
    alias: "widget.choreeditor",
    config:{
        scrollable:'vertical'
    },
    initialize: function () {

        this.callParent(arguments);

        var backButton = {
            xtype: "button",
            ui: "back",
            text: "Home"
        };

        var saveButton = {
            xtype: "button",
            ui: "action",
            text: "Save",
			handler: this.onSaveButtonTap,
			scope: this
        };

        var topToolbar = {
            xtype: "toolbar",
            docked: "top",
            title: "Edit Chore",
            items: [
                backButton,
                { xtype: "spacer" },
                saveButton
            ]
        };

        var deleteButton = {
            xtype: "button",
            iconCls: "trash",
            iconMask: true,
            scope: this
        };

        var bottomToolbar = {
            xtype: "toolbar",
            docked: "bottom",
            items: [
                deleteButton
            ]
        };

        var choreTitleEditor = {
            xtype: 'textfield',
            name: 'title',
            label: 'Title',
            required: true
        };

        var choreNarrativeEditor = {
            xtype: 'textareafield',
            name: 'narrative',
            label: 'Narrative'
        };

        this.add([
            topToolbar,
            { xtype: "fieldset",
                items: [choreTitleEditor, choreNarrativeEditor]
            },
            bottomToolbar
        ]);
    },
	
	onSaveButtonTap: function () {
		this.fireEvent("saveChoreCommand", this);
	}

});