var Table = require('cli-table'),
    log = require('./log');

module.exports = {
	getRaw: function (results) {
		return JSON.stringify(results, null, 4);
	},

	getPretty: function (results) {
		return prettifyResults(results);
	}
}

function prettifyResults (results) {
    var data = {},
        refs = [],
        tables = {};

    results.forEach(function (result) {
        agent = result.UA.split(' ')[0];

        if (!data[result.name]) {
            data[result.name] = {};
        }

        if (!data[result.name][agent]) {
            data[result.name][agent] = {
                refs: [],
                fastest: null,
                slowest: null
            };
        }

        if (!data[result.name][agent].refs[result.ref]) {
            data[result.name][agent].refs[result.ref] = {
                cumulative: 0,
                average: 0,
                count: 0,
                slower: null
            };
        }

        if (refs.indexOf(result.ref) === -1) {
            refs.push(result.ref);
        }

        data[result.name][agent].refs[result.ref].cumulative += result.value;
        data[result.name][agent].refs[result.ref].count++;
        tables[result.name] = new Table({
            head: [''],
            style : {
                compact : true, 
                'padding-right' : 2,
                'padding-left' : 2,
            }
        });
    });

    // Generate the averages
    for (test in data) {
        var set = data[test];
        for (agent in set) {
            for (ref in set[agent].refs) {
                var self = set[agent].refs[ref];
                self.average = self.cumulative / self.count
            }
        }
    }

    // Figure out the fastest/slowest
    for (test in data) {
        var set = data[test];
        for (agent in set) {
            var fastest = null;
            var slowest = null;

            for (ref in set[agent].refs) {
                var self = set[agent].refs[ref];

                if (!fastest || self.average > fastest) {
                    set[agent].fastest = ref;
                    fastest = self.average;
                }
                if (!slowest || self.average < slowest) {
                    set[agent].slowest = ref;
                    slowest = self.average;
                }
            }
        }
    }

    // Figure out the slower %
    for (test in data) {
        var set = data[test];
        for (agent in set) {
            var fastest = set[agent].fastest;
            var slowest = set[agent].slowest;

            for (ref in set[agent].refs) {
                var self = set[agent].refs[ref];
                self.slower = -(((set[agent].refs[fastest].average / self.average) - 1) * 100).toFixed(2);
            }
        }
    }

    // Display the results
    for (test in data) {
        var table = tables[test];
        refs.forEach(function (ref) {
            var row = [];

            row.push(ref);

            for (agent in data[test]) {
                if (table.options.head.indexOf(agent) == -1) {
                    table.options.head.push(agent)
                }

                if (data[test][agent].refs[ref].slower) {
                    row.push(data[test][agent].refs[ref].slower.toFixed(0) + '%');
                    // row.push(data[test][agent].refs[ref].average);
                }
                else {
                    // row.push('');
                    row.push(log.color('Fastest', 'green'));
                }
            }

            table.push(row);
        });

        return ('\n' + test + '\n' + table.toString() + '\n');
    }
}