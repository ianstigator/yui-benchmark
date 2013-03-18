YUI().use('app', 'benchmark', function (Y) {

	var suite = new Benchmark.Suite();
	
    Y.Benchmark.addTest(suite);
    
	// -- Y.Model ------------------------------------------------------------------
	suite.add('Y.Model: Instantiate a bare model', function () {
	    var model = new Y.Model();
	});

	suite.add('Y.Model: Subclass and instantiate a bare model', function () {
	    var MyModel = Y.Base.create('myModel', Y.Model, []),
	        model   = new MyModel();
	});

	// // -- Y.View -------------------------------------------------------------------
	// suite.add('Y.View: Instantiate a bare view', function () {
	//     var view = new Y.View();
	// });

	// suite.add('Y.View: Instantiate and subclass a bare view', function () {
	//     var MyView = Y.Base.create('myView', Y.View, []),
	//         view   = new MyView();
	// });

    suite.run(true);
});