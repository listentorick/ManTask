Ext.define("ManTask.controller.Chores", {
    extend: "Ext.app.Controller",
	config: {
		refs: { 
			choresListContainer: "choreslistcontainer",
			choreEditor: "choreeditor"
		},
		control: {
			choresListContainer: {
                // The commands fired by the chores list container.
                newChoreCommand: "onNewChoreCommand",
                editChoreCommand: "onEditChoreCommand"
            },
			choreEditor: {
				// The commands fired by the chore editor.
				saveChoreCommand: "onSaveChoreCommand",
				deleteChoreCommand: "onDeleteChoreCommand",
				backToHomeCommand: "onBackToHomeCommand"
			}
		}
	},
	
	onNewChoreCommand: function() {

		var now = new Date();
		var choreId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();

		var newChore = Ext.create("ManTask.model.Chore", {
			id: choreId,
			dateCreated: now,
			title: "",
			narrative: ""
		});

		this.activateChoreEditor(newChore);
	},
	
	activateChoreEditor: function (record) {
		var choreEditor = this.getChoreEditor();
		choreEditor.setRecord(record);	
		Ext.Viewport.animateActiveItem(choreEditor,{type: 'slide', direction: 'left'});
	},
	
	activateChoresList: function () {
		Ext.Viewport.animateActiveItem(this.getChoresListContainer(), {type: 'slide', direction: 'right'});
	},
	
	getRandomInt: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	
	onEditChoreCommand: function(list, record) {
		this.activateChoreEditor(record)
	},
	
	onSaveChoreCommand: function () {
		var choreEditor = this.getChoreEditor();

		var currentChore = choreEditor.getRecord();
		var newValues = choreEditor.getValues();

		// Update the current chores's fields with form values.
		currentChore.set("title", newValues.title);
		currentChore.set("narrative", newValues.narrative);

		var errors = currentChore.validate();

		if (!errors.isValid()) {
			Ext.Msg.alert('Wait!', errors.getByField("title")[0].getMessage(), Ext.emptyFn);
			currentChore.reject();
			return;
		}

		var choresStore = Ext.getStore("Chores");

		if (null == choresStore.findRecord('id', currentChore.data.id)) {
			choresStore.add(currentChore);
		}

		choresStore.sync();

		choresStore.sort([{ property: 'dateCreated', direction: 'DESC'}]);

		this.activateChoresList();
	},
	
	onDeleteChoreCommand: function () {
		var choreEditor = this.getChoreEditor();
		var currentChore = choreEditor.getRecord();
		var choresStore = Ext.getStore("Chores");

		choresStore.remove(currentChore);
		choresStore.sync();

		this.activateChoresList();
	},
	
	onBackToHomeCommand: function(){
		this.activateChoresList();
	},

    launch: function () {
        this.callParent();
		
        console.log("launch");
    },
	
    init: function () {
        this.callParent();
        console.log("init");
    }
});



