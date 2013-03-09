define([
    "dojo/_base/declare",
    
    "bco-common/_Object"
], function (
    declare,
    
    _Object) {
    
    return declare([_Object], {
        express: null,
        port: null,
        
        run: function () {
            var app = this.express();
            
            app.configure((function () {
                app.use(this.express.bodyParser());
                app.use(this.express.methodOverride());
                
                app.use(app.router);
                
                app.use(this.express.static("public_html"));
                
                app.use(function(err, req, res, next){
                    console.error(err.stack);
                    res.send(500, err);
                });
            }).bind(this));
            
            var port = this.port || 80;
            app.listen(port);
            console.log("Listening on " + port);
        }
    });
});