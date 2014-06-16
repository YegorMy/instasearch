var requireConfig = {
    requirePath: '/js/',
    fileName: 'index.js'
};

var modulesConfig = {
};

var required = [];

function require(path) {
    var filesArray = [];

    if (typeof path == 'string') {
        filesArray.push(path);
    } else {
        filesArray = path
    }

    filesArray.forEach(function(e, n) {
        if (modulesConfig[e]) {
            modulesConfig[e].forEach(function(e) {
                filesArray = insertIntoArray(n, filesArray, {val:e});
            })
            modulesConfig[e] = null;
        }
    });

    /*
    * conf.forEach(function(e) {
     array = insertIntoArray(flag, array, e);
     });
     conf[val] = null;
     console.log(array);
     innerRequire(flag - conf.length + 1, array);*/

    innerRequire(0, filesArray);
}
function innerRequire(flag, array) {
    if (!required.filter(function(e) { return e == array[flag]}).length) {
        if (flag < array.length) {
            var script = document.createElement("script");
            var body = document.getElementsByTagName('head')[0];
            var val = array[flag];
            var name = '';

            if (typeof val == 'object') {
                name = val.val;
            } else {
                name = val;
            }

            var src = requireConfig.requirePath + name + "/" + requireConfig.fileName;
            script.type = "text/javascript";
            script.src = src + "?v=" + Math.round(Math.random() * 1000);
            script.onload = function() {
                required.push(array[flag]);
                innerRequire(++flag, array);
            }
            body.appendChild(script);
        }
    }
}
function insertIntoArray(position, array, value) {
    for(var i = array.length; i--; i < position) {
        array[i+1] = array[i];
    }
    array[position] = value;
    return array;
}