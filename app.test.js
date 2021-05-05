process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('./app');
const dbConnection = require('./db/dbConnection');
afterAll(() => dbConnection.destroy());

beforeEach(() => dbConnection.seed.run());

describe('/readings', () => {
  describe('POST', () => {
    test('status: 201, post a meter reading CSV', () => {
      return request(app)
        .post('/api/readings')
        .send([
          {
            data: ['meter_reading_id', 'account_id', 'reading']
          },

          {
            data: [
              '6a68108b-9ec2-4020-9b54-9fbd319c59f6',
              '6f98771c-00d8-4a3d-a179-d5e3b028b54e',
              6705
            ]
          },
          {
            data: [
              '0966665b-bb10-4f94-b903-bd0fb38762d6',
              '5e345cff-fb8f-4ed6-a961-8818a65392c9',
              7084
            ]
          },
          {
            data: [
              'f2c7b7d2-44d1-4a2d-b2d3-5a7351900fb5',
              '7353476a-1d35-4391-a532-47862fb9069d',
              1986
            ]
          }
        ])
        .expect(201)
        .then(({ body }) => {
          expect(body).toEqual({
            invalidSubmissions: [],
            validSubmissions: [
              {
                meter_reading_id: '6a68108b-9ec2-4020-9b54-9fbd319c59f6',
                account_id: '6f98771c-00d8-4a3d-a179-d5e3b028b54e',
                reading: 6705
              },
              {
                meter_reading_id: '0966665b-bb10-4f94-b903-bd0fb38762d6',
                account_id: '5e345cff-fb8f-4ed6-a961-8818a65392c9',
                reading: 7084
              },
              {
                meter_reading_id: 'f2c7b7d2-44d1-4a2d-b2d3-5a7351900fb5',
                account_id: '7353476a-1d35-4391-a532-47862fb9069d',
                reading: 1986
              }
            ]
          });
        });
    });
    test('status: 201, post a meter reading CSV', () => {
      return request(app)
        .post('/api/readings')
        .send([
          {
            data: ['meter_reading_id', 'account_id', 'reading']
          },

          {
            data: [
              '6a68108b-9ec2-4020-9b54-9fbd319c59f6',
              '6f98771c-00d8-4a3d-a179-d5e3b028b54e',
              670566
            ]
          },
          {
            data: [
              '0966665b-bb10-4f94-b903-bd0fb38762d6',
              '5e345cff-fb8f-4ed6-a961-8818a65392c9',
              7084
            ]
          },
          {
            data: [
              '0966665b-bb10-4f94-b903-bd0fb38762d6',
              '5e345cff-fb8f-4ed6-a961-8818a65392c9',
              7084
            ]
          },
          {
            data: [
              'f2c7b7d2-44d1-4a2d-b2d3-5a7351900fb5',
              '7353476a-1d35-4391-a532-47862fb9069d',
              1986
            ]
          }
        ])
        .expect(201)
        .then(({ body }) => {
          expect(body).toEqual({
            invalidSubmissions: [
              {
                meter_reading_id: '0966665b-bb10-4f94-b903-bd0fb38762d6',
                account_id: '5e345cff-fb8f-4ed6-a961-8818a65392c9',
                reading: 7084
              },
              {
                meter_reading_id: '6a68108b-9ec2-4020-9b54-9fbd319c59f6',
                account_id: '6f98771c-00d8-4a3d-a179-d5e3b028b54e',
                reading: 670566
              }
            ],
            validSubmissions: [
              {
                meter_reading_id: '0966665b-bb10-4f94-b903-bd0fb38762d6',
                account_id: '5e345cff-fb8f-4ed6-a961-8818a65392c9',
                reading: 7084
              },
              {
                meter_reading_id: 'f2c7b7d2-44d1-4a2d-b2d3-5a7351900fb5',
                account_id: '7353476a-1d35-4391-a532-47862fb9069d',
                reading: 1986
              }
            ]
          });
        });
    });
    describe('Error handling', () => {
      test('should return 400', () => {
        return request(app)
          .post('/api/readings')
          .expect(400)
          .send([
            {
              data: ['account_id', 'meter_reading_id', 'reading']
            },

            {
              data: [
                '6a68108b-9ec2-4020-9b54-9fbd319c59f6',
                '6f98771c-00d8-4a3d-a179-d5e3b028b54e',
                6705
              ]
            }
          ])
          .then(({ body: { msg } }) => {
            expect(msg).toBe(
              'Invalid format. Please refer to the template CSV'
            );
          });
      });
    });
  });
  describe('/GET', () => {
    test('status: 200, returns all accounts ', () => {
      return request(app)
        .get('/api/readings')
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveLength(7);
          expect(body[0]).toMatchObject({
            account_id: expect.any(String),
            meter_reading_id: expect.any(String),
            reading: expect.any(String)
          });
        });
    });
  });
});

describe('/accounts', () => {
  describe('GET', () => {
    test('status: 200, should return a list of the accounts', () => {
      return request(app)
        .get('/api/accounts')
        .expect(200)
        .then(({ body }) => {
          expect(body).toHaveLength(7);
          expect(body[0]).toMatchObject({
            account_id: expect.any(String),
            first_name: expect.any(String),
            surname: expect.any(String),
            email: expect.any(String)
          });
        });
    });
  });
});
