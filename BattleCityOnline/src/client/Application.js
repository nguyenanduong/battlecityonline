define([
    "dojo/_base/declare",    
    "bco-common/_Object"
], function (
    declare,
    _Object) {
	
    return declare([_Object], {
        viewContainer: null,
        
        run: function () {
        	viewContainer.startup();    
        }
    });
});