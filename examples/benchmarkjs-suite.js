YUI.add('benchmarkjs-suite', function (Y, NAME) {

    var suite = Y.BenchmarkSuite = new Benchmark.Suite,
        container,
        scrollview;
    
    container = document.createElement('div')
    container.id = "container";
    document.body.appendChild(container);

    suite.add('ScrollView: Create', function () {
        scrollview = new Y.ScrollView({
            render: container
        });
    });
    
    // suite.add({
    //     name: 'ScrollView: Create & Destroy', 
    //     fn: function () {
    //         scrollview = new Y.ScrollView({
    //             render: container
    //         });
    //         scrollview.destroy();
    //     }
    // });

}, '@VERSION@', {requires: ['scrollview-base']});