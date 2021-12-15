import app from './index';
import supertest from 'supertest';

//@ts-ignore
import session from 'supertest-session';

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

  test('should return correct counter on POST to /api/counter', async () => {
    api = session(app);

    await api
      .post('/api/counter')
      .send({
        value: 5,
      })
      .expect(201)
      .expect(function (res) {
        expect(res.text).toMatch('1');
      });

    await api
      .post('/api/counter')
      .send({
        value: 5,
      })
      .expect(201)
      .expect(function (res) {
        expect(res.text).toMatch('6');
      });
  });
});
