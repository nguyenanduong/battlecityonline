define([
    "dojo/_base/declare",    
    "bco-common/_Object",
    "box2d-html5"
], function (
    declare,
    _Object,
    box2d) {
	
    return declare([_Object], {
        viewContainer: null,
        
        run: function () {
        	this._loadB2();
            viewContainer.startup();    
        }
    });
});