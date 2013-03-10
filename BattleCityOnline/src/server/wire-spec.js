define({
    express: {
        module: "dojo/node!express"
    },
    
    application: {
        create: {
            module: "bco-server/Application",
            args: {
                port: 8283,                
                express: { $ref: "express" },
                clientModules: [
                    { name: "dojo", path: "lib/dojo" },
                    { name: "dijit", path: "lib/dijit" },

                    { name: "meld", path: "lib/meld" },
                    { name: "when", path: "lib/when" },
                    { name: "wire", path: "lib/wire" },
                    
                    { name: "bco-common", path: "src/common" },
                    { name: "bco-client", path: "src/client" }
                ]
            }
        }
    }    
});