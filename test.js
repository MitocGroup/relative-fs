var relativeFs = require('./index');
var _fs = require('fs');
var sinon = require('sinon');

describe('relative-fs::relativeTo()', function () {
  it('returns a new object that has all of the methods of the fs module', function () {
    var fs = relativeFs.relativeTo(__dirname);
    Object.keys(fs).should.eql(Object.keys(_fs));
    fs.should.not.be.exactly(_fs);
  });

  it('calls the underlying fs method with modified paths', function () {
    var fs = relativeFs.relativeTo('/better-not-be-cwd');
    sinon.stub(_fs, 'exists');

    fs.exists('./1');

    _fs.exists.callCount.should.eql(1);
    _fs.exists.lastCall.args[0].should.eql('/better-not-be-cwd/1');
    _fs.exists.restore();
  });

  it('works with methods that accept two paths', function () {
    var fs = relativeFs.relativeTo('/better-not-be-cwd');
    sinon.stub(_fs, 'link');

    fs.link('./1', './2');

    _fs.link.callCount.should.eql(1);
    _fs.link.lastCall.args[0].should.eql('/better-not-be-cwd/1');
    _fs.link.lastCall.args[1].should.eql('/better-not-be-cwd/2');
    _fs.link.restore();
  });
});