// const { INET } = require('sequelize/types');
// const { DESCRIBE } = require('sequelize/types/lib/query-types');
const request = require('supertest');
const { app, sequelize } = require('./app');


describe('GET /data', () => {
  beforeAll(async () => { 
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
  });

  it('responds with json with key', async (done) => {
    request(app)
      .get('/data?key=12345')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((err, resp) => {
        if (err) return done(err);
        expect(resp.text).toEqual('[]');
        return done();
      });
  });

  it('responds with 403 without key', async (done) => {
    request(app)
      .get('/data')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect(403)
      .end((err, resp) => {
        if (err) return done(err);
        expect(resp.text).toEqual('Bad API Key');
        return done();
      });
  });

  it('responds with 403 bad API key', async (done) => {
    request(app)
      .get('/data?key=54321')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect(403)
      .end((err, resp) => {
        if (err) return done(err);
        expect(resp.text).toEqual('Bad API Key');
        return done();
      });
  });
});