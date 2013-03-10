require({
	packages: [
        // Dojo
		{ name: "dojo", location: "." },
		
		// Wire et al.
		{ name: "meld", location: "../../lib/meld", main: "meld" },
		{ name: "when", location: "../../lib/when", main: "when" },
		{ name: "wire", location: "../../lib/wire", main: "wire" },
		
        // bco common
        { name: "bco-common", location: "../../src/common" },

        // bco server
        { name: "bco-server", location: "../../src/server" }
	]
}, ["wire!bco-server/wire-spec"], function (wireSpec) {
    
	var app = wireSpec.application;
	app.run();
});