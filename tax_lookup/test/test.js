process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let request = require('supertest');

describe('Loading our Express Server', function () {
  let server;
  before(function () {
    server = require('../app');
  });
 
  it('Responds to /', function testSlash(done) {
  request(server)
    .get('/')
    .expect(200, done);
  });
  it('Responds to /about', function testAbout(done) {
	  request(server)
	  .get('/about')
	  .expect(200,done);
  });
  it('Return 404 for invalid routes', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
  
  it('Retrieve invalid account data', (done) => {
	  request(server)
	  .get('/lookup?txtBRTNo=18318950')
	  .set('Accept', 'application/json')
	  .expect('Content-Type', /json/)
	  .expect(500, done);
    });
  
  it('Retrieve valid account data', (done) => {
	  request(server)
	  .get('/lookup?txtBRTNo=183189500')
	  .set('Accept', 'application/json')
	  .expect('Content-Type', /json/)
	  .expect(200, done);
    });
});