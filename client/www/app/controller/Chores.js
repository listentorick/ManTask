Ext.define("ManTask.controller.Chores", {
    extend: "Ext.app.Controller",
	config: {
		refs: { 
			choresListContainer: "choreslistcontainer"
		},
		control: {
			choresListContainer: {
                // The commands fired by the chores list container.
                newChoreCommand: "onNewChoreCommand",
                editChoreCommand: "onEditChoreCommand"
            }
		}
	},
	
	onNewChoreCommand: function() {
	},
	
	onEditChoreCommand: function() {
	},
	
    launch: function () {
        this.callParent();
		Ext.getStore("Chores").load();
        console.log("launch");
    },
    init: function () {
        this.callParent();
        console.log("init");
    }
});



