var nopt = require('nopt'),
    path = require('path');

/**
 * A utility to lookup tasks given a task ID
 *
 * @public
 * @param {Number} An ID referencing a task
 * @returns The Task instance whose ID matches the argument
 */
exports.findTaskById = function (tasks, taskID) {
    return tasks.filter(function (task, i, arr) {
        return (task.meta.id == taskID);
    }).shift();
};

/**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @param obj1
 * @param obj2
 * @returns obj3 a new object based on obj1 and obj2
 */
exports.merge = function (obj1, obj2) {
    var obj3 = {}, attrname;

    for (attrname in obj1) {
        obj3[attrname] = obj1[attrname];
    }

    for (attrname in obj2) {
        obj3[attrname] = obj2[attrname];
    }

    return obj3;
};

exports.parseOptions = function (argv) {
    var known = {
        'ref': Array,
        'wip': Boolean,
        'raw': Boolean,
        'pretty': Boolean,
        'multiseed': Boolean,
        'port': Number,
        'timeout': Number,
        'iterations': Number,
        'yuipath': path,
        'source': path,
        'tmproot': path
    },
    shorts = {},
    options = nopt(known, shorts, argv, 0);

    return options;
};