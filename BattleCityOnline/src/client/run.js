require({
    baseUrl:"/script/", 
    packages: [
        { name: "dojo" }, 
        { name: "dijit" }, 

        { name: "domReady" }, 
        { name: "meld", main: "meld" }, 
        { name: "when", main: "when" }, 
        { name: "wire", main: "wire" },

        { name: "dcl", main: "dcl" }, 
        { name: "box2d-html5", main: "box2d-html5" }, 
        { name: "frozen" }, 

        { name: "bco-client" },
        { name: "bco-common" }
    ], 
    paths: { 
        "wire/domReady": "domReady/domReady"
    }
}, ["wire!bco-client/wire-spec"], function (wireSpec) {   

    var app = wireSpec.application;
    app.run();
});