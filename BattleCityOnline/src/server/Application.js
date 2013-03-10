define([
    "dojo/_base/declare",
    
    "bco-common/_Object"
], function (
    declare,
    
    _Object) {
    
    return declare([_Object], {
        express: null,
        port: null,
        
        clientModules: null,
        
        postscript: function () {
            this.inherited(arguments);
        },
        
        run: function () {
            var app = this.express();
            
            app.configure((function () {
                this.clientModules.forEach(function(module) {
                    app.use("/script/" + module.name, this.express.static(module.path));                       
                }, this);
                
                app.use(this.express.static("public_html"));
                
                app.use(this._handleServerError);
            }).bind(this));
            
            var port = this.port || 80;
            app.listen(port);
            console.log("Listening on " + port);
        },
        
        _handleServerError: function (err, req, res, next) {
            console.error(err.stack);
            res.send(500, err);
        }
    });
});