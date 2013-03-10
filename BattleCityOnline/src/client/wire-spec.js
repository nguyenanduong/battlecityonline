define({
    viewContainer: {
        create: {
            module: "bco-client/ViewContainer",
            args: [
                {
                    defaultView: "home",
                    views: {
                        home: {}
                    }
                },
                
                { $ref: "dom!root" }
            ]
        }
    },    
    
    application: {
        create: {
            module: "bco-client/Application",
            args: {
                viewContainer: { $ref: "viewContainer" }
            }
        }
    },
    
    plugins: [ { module: "wire/dom" } ]
});