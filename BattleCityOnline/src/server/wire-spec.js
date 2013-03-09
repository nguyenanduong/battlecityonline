define({
    "express": {
        module: "dojo/node!express"
    },
    
    "application": {
        create: {
            module: "bco-server/Application",
            args: {
                port: 8283,
                express: { $ref: "express" }
            }
        }
    }    
});