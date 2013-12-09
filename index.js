var fs = require('fs');
var path = require('path');

var toWrap = {
  rename: 2, // (oldPath, newPath, callback)
  renameSync: 2, // (oldPath, newPath)
  truncate: 1, // (path, len, callback)
  truncateSync: 1, // (path, len)
  chown: 1, // (path, uid, gid, callback)
  chownSync: 1, // (path, uid, gid)
  lchown: 1, // (path, uid, gid, callback)
  lchownSync: 1, // (path, uid, gid)
  chmod: 1, // (path, mode, callback)
  chmodSync: 1, // (path, mode)
  lchmod: 1, // (path, mode, callback)
  lchmodSync: 1, // (path, mode)
  stat: 1, // (path, callback)
  lstat: 1, // (path, callback)
  statSync: 1, // (path)
  lstatSync: 1, // (path)
  link: 2, // (srcpath, dstpath, callback)
  linkSync: 2, // (srcpath, dstpath)
  symlink: 2, // (srcpath, dstpath, [type], callback)
  symlinkSync: 2, // (srcpath, dstpath, [type])
  readlink: 1, // (path, callback)
  readlinkSync: 1, // (path)
  realpath: 1, // (path, [cache], callback)
  realpathSync: 1, // (path, [cache])
  unlink: 1, // (path, callback)
  unlinkSync: 1, // (path)
  rmdir: 1, // (path, callback)
  rmdirSync: 1, // (path)
  mkdir: 1, // (path, [mode], callback)
  mkdirSync: 1, // (path, [mode])
  readdir: 1, // (path, callback)
  readdirSync: 1, // (path)
  openSync: 1, // (path, flags, [mode])
  utimes: 1, // (path, atime, mtime, callback)
  utimesSync: 1, // (path, atime, mtime)
  readFile: 1, // (filename, [options], callback)
  readFileSync: 1, // (filename, [options])
  writeFile: 1, // (filename, data, [options], callback)
  writeFileSync: 1, // (filename, data, [options])
  appendFile: 1, // (filename, data, [options], callback)
  appendFileSync: 1, // (filename, data, [options])
  watchFile: 1, // (filename, [options], listener)
  unwatchFile: 1, // (filename, [listener])
  watch: 1, // (filename, [options], [listener])
  exists: 1, // (path, callback)
  existsSync: 1, // (path)
};

var fsKeys = Object.keys(fs);

function wrap(method, pathArgs) {
  return function (/* path, path, etc.. */) {
    var args = [];

    for (var i = 0; i < arguments.length; i++) {
      if (i < pathArgs && typeof arguments[i] === 'string') {
        args[i] = path.resolve(root, arguments[i]);
      } else {
        args[i] = arguments[i];
      }
    }

    return method.apply(fs, args);
  };
}

exports.relativeTo = function (root) {
  var wrapped = {};

  fsKeys.forEach(function (key) {
    if (toWrap.hasOwnProperty(key)) {
      wrapped[key] = wrap(fs[key], toWrap[key]);
    } else {
      wrapped[key] = fs[key];
    }
  });

  return wrapped;
};