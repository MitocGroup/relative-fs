relative-fs
===========

An NPM module that can wrap the fs module to make it's path arguments relative to the current directory.

Turns this:
```
var path = require('path');
var fs = require('fs');

var file = fs.readFileSync(path.join(__dirname, './some-file'));
```

Into this:
```
require('relative-fs');
var fs = require('fs').relativeTo(__dirname);

var file = fs.readFileSync('./some-file');
```

The plugin is very straight-forward and does exactly what you would think in just a few lines of code.
