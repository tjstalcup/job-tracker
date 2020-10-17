const app = require('../src/app');

describe('App', () => {
    it('GET / responds with 200 that says Hello', () => {
        return supertest(app).get('/').expect(200,'JobTracker');
    })
})