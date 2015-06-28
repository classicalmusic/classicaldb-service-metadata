'use strict';

function requireUncached(module){
  delete require.cache[require.resolve(module)];
  return require(module);
}

describe('environment configuration', function(){
  var config;
  it('should set process.env.NODE_ENV to "development" by default', function(){
    //"gulp test" sets process.env.NODE_ENV to 'test', so we need to override that
    delete process.env.NODE_ENV;
    config = requireUncached('./environment');
    expect(config.env).to.equal('development');
  });

  it('should set the appropriate variables for "production environment"', function(){
    process.env.NODE_ENV = 'production';
    config = requireUncached('./environment');

    var expected = {
      env: 'production',
      port: 8080
    };
    for (var key in expected) {
      expect(expected[key]).to.deep.equal(config[key]);
    }
  });

  it('should set the appropriate variables for "development environment"', function(){
    process.env.NODE_ENV = 'development';
    config = requireUncached('./environment');

    var expected = {
      env: 'development',
      port: 5101,
      postgres: {
        dbname: 'cdb_metadata_service_dev',
        username: 'cdb',
        password: null
      }
    };
    for (var key in expected) {
      expect(expected[key]).to.deep.equal(config[key]);
    }
  });

  it('should set the appropriate variables for "test environment"', function(){
    process.env.NODE_ENV = 'test';
    config = requireUncached('./environment');

    var expected = {
      env: 'test',
      port: 5202,
      postgres: {
        dbname: 'cdb_metadata_service_test',
        username: 'cdb',
        password: null
      }
    };
    for (var key in expected) {
      expect(expected[key]).to.deep.equal(config[key]);
    }
  });
});