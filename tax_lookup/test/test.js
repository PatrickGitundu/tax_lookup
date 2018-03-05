process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let request = require('supertest');

/*
 * Start our tests
 */
describe('Loading our Express Server', function () {
  // Load our server
  let server;
  before(function () {
    server = require('../app');
  });
  
  // Test that our home page renders.
  it('Responds to /', function testSlash(done) {
  request(server)
    .get('/')
    .expect(200, done);
  });
  
  // Test that our about page renders.
  it('Responds to /about', function testAbout(done) {
	  request(server)
	  .get('/about')
	  .expect(200,done);
  });
  
  // Test that unknown routes will not render.
  it('Return 404 for invalid routes', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
  
  // Test that invalid account data will return our specified error status.
  it('Retrieve invalid account data', (done) => {
	  request(server)
	  .get('/lookup?txtBRTNo=18318950')
	  .set('Accept', 'application/json')
	  .expect('Content-Type', /json/)
	  .expect(500, done);
    });
  
  // Test that using a valid account number will result in a status of 200 and our response will be a JSON object.
  it('Retrieve valid account data', (done) => {
	  request(server)
	  .get('/lookup?txtBRTNo=183189500')
	  .set('Accept', 'application/json')
	  .expect('Content-Type', /json/)
	  .expect(200, done);
    });
});