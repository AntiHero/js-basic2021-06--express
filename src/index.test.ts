import app from './index';
import supertest from 'supertest';
import dotenv from 'dotenv';

//@ts-ignore
import session from 'supertest-session';
import mongoose from 'mongoose';
import Book from './models/book';
import connectDB from './utils/connectDB';

dotenv.config();

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

  describe('testing db', () => {
    api = supertest(app);

    const initialBooks = [
      {
        author: 'Mark Twain',
        date: 1876,
        title: 'The Adventures of Tom Sawyer',
      },
    ];

    beforeAll(() => {
      const url = process.env.MONGODB_URI_TEST as string;
      connectDB(url);
    });

    beforeEach(async () => {
      await Book.deleteMany({});
      let bookObj = new Book(initialBooks[0]);
      await bookObj.save();
    });

    test('should return books as json', async () => {
      await api
        .get('/api/books')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('should return one book', async () => {
      const response = await api.get('/api/books');

      expect(response.body).toHaveLength(1);
    });

    afterAll(() => {
      mongoose.connection.close();
    });
  });
});
