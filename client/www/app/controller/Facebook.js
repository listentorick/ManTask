
 function alertData(data)  {	
	 if(data.constructor == Array ||
		data.constructor == Object){
		for(var p in data){
			alert(p + ": " + data[p]);
			alertData(data[p]);
			
		}
	}
}

/**
 * Handles Facebook interactions, specifically Login and Logout.
 *
 * When a user logs in, we display their profile picture and a list of Runs.
 */
Ext.define('ManTask.controller.Facebook', {
    extend: 'Ext.app.Controller',
    requires: ['Ext.MessageBox'],

	/*
    config: {
        control: {
            '#signout': {
                tap: 'onUserTap'
            },
            '#logoutButton': {
                tap: 'logout'
            }
        }
    },*/
	
	
	launch: function () {
        this.callParent();
    },
    /**
     * Load the Facebook Javascript SDK asynchronously
     */
    init: function() {
	
		var me = this;

		FB.init({ appId: "331199740299634", nativeInterface: CDV.FB, useCachedDialogs: false, successCB: function() {
			FB.getLoginStatus(function(response) {
			   if (response.status == 'connected') {
					me.onLogin();
				} else {
					me.login();
				}
			});
		
		}}
		);	
    },

    login: function() {

		var me = this;
		  FB.login(
			 function(response) {
				if (response.status =="connected") {
					me.onLogin();
				} else {
					
				}
			 },
			 { scope: "email, user_about_me" }
			 );
    },

    onLogin: function() {

        var me = this,
            errTitle;
		
        FB.api('/me', function(response) {
            if (response.error) {
             
			    FB.logout();
			  
                errTitle = "Facebook " + response.error.type + " error";
                Ext.Msg.alert(errTitle, response.error.message, function() {
				   window.open('http://developers.facebook.com/tools/debug/og/object?q=' +  FB.getAccessToken());
				   me.login();
                });
            } else {
              
				ManTask.userData = response;
               
				//this next code should be a controller method?
				var choresListContainer = {
					xtype: "choreslistcontainer"
				};
		
				var choreEditor = {
					xtype: "choreeditor"
				};
				
				Ext.Viewport.add(choresListContainer);
				Ext.Viewport.add(choreEditor);
			    Ext.Viewport.setActiveItem(choresListContainer);
				Ext.getStore("Chores").load();
	
            }
        });
    },
	
    logout: function() {
        Ext.Viewport.setMasked({xtype: 'loadmask', message: 'Logging out...'});
        FB.logout();
    },

    /**
     * Called when the Logout button is tapped
     */
    onLogout: function() {

        if (!this.hasCheckedStatus) return;

        this.login();

        Ext.Viewport.setMasked(false);
        Ext.Viewport.setActiveItem(Ext.getCmp('login'));
        Ext.getStore('Runs').removeAll();

        this.logoutCmp.destroy();
    },

    /**
     * When the user profile picture is tapped, create a Logout button and pop it up next to the
     * avatar.
     */
    onUserTap: function(cmp) {

        if (!this.logoutCmp) {
            this.logoutCmp = Ext.create('Ext.Panel', {
                width: 120,
                top: 0,
                left: 0,
                padding: 5,
                modal: true,
                hideOnMaskTap: true,
                items: [
                    {
                        xtype: 'button',
                        id: 'logoutButton',
                        text: 'Logout',
                        ui: 'decline'
                    }
                ]
            });
        }

        this.logoutCmp.showBy(cmp);
    }
});
