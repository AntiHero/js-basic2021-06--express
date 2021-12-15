import app from './index';
import supertest from 'supertest';

describe('testing api', () => {
  let api: supertest.SuperTest<supertest.Test>;

  beforeEach(() => {
    api = supertest(app);
  });

  test('should return index.html on GET to /', async () => {
    await api
      .get('/')
      .expect('content-type', /html/)
      .expect(200)
      .expect(function (res) {
        expect(res.text).toMatch('Когда сдал проект');
      });
  });
});
