process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('./app');
const dbConnection = require('./db/dbConnection');
afterAll(() => dbConnection.destroy());

beforeEach(() => dbConnection.seed.run());

describe('/readings', () => {
  describe('POST', () => {
    test('status: 201, should post a meter reading CSV', () => {
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
    test('status: 201, should post a meter reading CSV and filter invalid meter reading format', () => {
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
          }
        ])
        .expect(201)
        .then(({ body }) => {
          expect(body).toEqual({
            invalidSubmissions: [
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
              }
            ]
          });
        });
    });
    test('status: 201, should post a meter reading CSV and filter duplicate entries ', () => {
      return request(app)
        .post('/api/readings')
        .send([
          {
            data: ['meter_reading_id', 'account_id', 'reading']
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
              }
            ],
            validSubmissions: [
              {
                meter_reading_id: '0966665b-bb10-4f94-b903-bd0fb38762d6',
                account_id: '5e345cff-fb8f-4ed6-a961-8818a65392c9',
                reading: 7084
              }
            ]
          });
        });
    });
    test('status: 201, should post a meter reading CSV and filter invalid Accounts IDs', () => {
      return request(app)
        .post('/api/readings')
        .send([
          {
            data: ['meter_reading_id', 'account_id', 'reading']
          },

          {
            data: [
              '6a68108b-9ec2-4020-9b54-9fbd319c59f6',
              '6f9ff8771testc-00d8-4a3d-a179-d5e3b028b54e',
              6705
            ]
          },
          {
            data: [
              '0966665b-bb10-4f94-b903-bd0fb38762d6',
              '5e345cff-fb8f-4ed6-a961-8818a65392c9',
              7084
            ]
          }
        ])
        .expect(201)
        .then(({ body }) => {
          expect(body).toEqual({
            invalidSubmissions: [
              {
                meter_reading_id: '6a68108b-9ec2-4020-9b54-9fbd319c59f6',
                account_id: '6f9ff8771testc-00d8-4a3d-a179-d5e3b028b54e',
                reading: 6705
              }
            ],
            validSubmissions: [
              {
                meter_reading_id: '0966665b-bb10-4f94-b903-bd0fb38762d6',
                account_id: '5e345cff-fb8f-4ed6-a961-8818a65392c9',
                reading: 7084
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
    test('status: 200, returns all readings sorted by meter reading id ', () => {
      return request(app)
        .get('/api/readings')
        .expect(200)
        .then(({ body }) => {
          expect(body.readings).toHaveLength(6);
          expect(body.readings[0]).toMatchObject({
            account_id: expect.any(String),
            meter_reading_id: expect.any(String),
            reading: expect.any(String)
          });
          expect(body.readings).toBeSortedBy('meter_reading_id', {
            descending: false
          });
        });
    });

    test('status: 200, should accept a query sort by account_id', () => {
      return request(app)
        .get('/api/readings?sort_by=account_id')
        .expect(200)
        .then(({ body }) => {
          expect(body.readings[0]).toMatchObject({
            account_id: expect.any(String),
            meter_reading_id: expect.any(String),
            reading: expect.any(String)
          });
          expect(body.readings).toBeSortedBy('account_id', {
            descending: false
          });
        });
    });
    test('status: 200, should accept a query sort by reading', () => {
      return request(app)
        .get('/api/readings?sort_by=reading')
        .expect(200)
        .then(({ body }) => {
          console.log(body.readings);
          expect(body.readings[0]).toMatchObject({
            account_id: expect.any(String),
            meter_reading_id: expect.any(String),
            reading: expect.any(String)
          });
          expect(body.readings).toBeSortedBy('reading', {
            descending: false
          });
        });
    });
    test('status: 200, should accept a query order desc', () => {
      return request(app)
        .get('/api/readings?order=desc')
        .expect(200)
        .then(({ body }) => {
          expect(body.readings[0]).toMatchObject({
            account_id: expect.any(String),
            meter_reading_id: expect.any(String),
            reading: expect.any(String)
          });
          expect(body).toBeSortedBy('meter_reading_id', {
            descending: true
          });
        });
    });
    test('status: 200, should accept a query sort_by account_id and order desc', () => {
      return request(app)
        .get('/api/readings?sort_by=account_id&order=desc')
        .expect(200)
        .then(({ body }) => {
          expect(body.readings[0]).toMatchObject({
            account_id: expect.any(String),
            meter_reading_id: expect.any(String),
            reading: expect.any(String)
          });
          expect(body.readings).toBeSortedBy('account_id', {
            descending: true
          });
        });
    });
  });
});

describe('/accounts', () => {
  describe('GET', () => {
    test('status: 200, should return a list of the accounts sorted by asc account_id', () => {
      return request(app)
        .get('/api/accounts')
        .expect(200)
        .then(({ body }) => {
          expect(body.accounts).toHaveLength(7);
          expect(body.accounts[0]).toMatchObject({
            account_id: expect.any(String),
            first_name: expect.any(String),
            surname: expect.any(String),
            email: expect.any(String)
          });
          expect(body.accounts).toBeSortedBy('account_id', {
            descending: false
          });
        });
    });
    test('status: 200, should accept a query sort by surname', () => {
      return request(app)
        .get('/api/accounts?sort_by=surname')
        .expect(200)
        .then(({ body }) => {
          expect(body.accounts[0]).toMatchObject({
            account_id: expect.any(String),
            first_name: expect.any(String),
            surname: expect.any(String),
            email: expect.any(String)
          });
          expect(body.accounts).toBeSortedBy('surname', {
            descending: false
          });
        });
    });
    test('status: 200, should accept a query order desc', () => {
      return request(app)
        .get('/api/accounts?order=desc')
        .expect(200)
        .then(({ body }) => {
          expect(body.accounts).toHaveLength(7);
          expect(body.accounts[0]).toMatchObject({
            account_id: expect.any(String),
            first_name: expect.any(String),
            surname: expect.any(String),
            email: expect.any(String)
          });
          expect(body).toBeSortedBy('account_id', {
            descending: true
          });
        });
    });
    test('status: 200, should accept a query sort_by surname and order desc', () => {
      return request(app)
        .get('/api/accounts?sort_by=surname&order=desc')
        .expect(200)
        .then(({ body }) => {
          expect(body.accounts[0]).toMatchObject({
            account_id: expect.any(String),
            first_name: expect.any(String),
            surname: expect.any(String),
            email: expect.any(String)
          });
          expect(body.accounts).toBeSortedBy('surname', {
            descending: true
          });
        });
    });
  });
  describe('PATCH', () => {
    test('should update the email by account id ', () => {
      return request(app)
        .patch('/api/accounts/5e345cff-fb8f-4ed6-a961-8818a65392c9')
        .send({ email: 'newtestemail@gmail.com' })
        .expect(200)
        .then(({ body }) => {
          expect(body.account).toMatchObject({
            account_id: '5e345cff-fb8f-4ed6-a961-8818a65392c9',
            first_name: expect.any(String),
            surname: expect.any(String),
            email: 'newtestemail@gmail.com'
          });
        });
    });

    test('should update the name by account id ', () => {
      return request(app)
        .patch('/api/accounts/5e345cff-fb8f-4ed6-a961-8818a65392c9')
        .send({ first_name: 'newtestname' })
        .expect(200)
        .then(({ body }) => {
          expect(body.account).toMatchObject({
            account_id: '5e345cff-fb8f-4ed6-a961-8818a65392c9',
            first_name: 'newtestname',
            surname: expect.any(String),
            email: expect.any(String)
          });
        });
    });
    test('should update the surname by account id ', () => {
      return request(app)
        .patch('/api/accounts/5e345cff-fb8f-4ed6-a961-8818a65392c9')
        .send({ surname: 'newtestsurname' })
        .expect(200)
        .then(({ body }) => {
          expect(body.account).toMatchObject({
            account_id: '5e345cff-fb8f-4ed6-a961-8818a65392c9',
            first_name: expect.any(String),
            surname: 'newtestsurname',
            email: expect.any(String)
          });
        });
    });
    test('should update multiple fields by account id ', () => {
      return request(app)
        .patch('/api/accounts/5e345cff-fb8f-4ed6-a961-8818a65392c9')
        .send({
          surname: 'newtestsurname',
          email: 'newtestemail@gmail.com',
          first_name: 'newtestname'
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.account).toMatchObject({
            account_id: '5e345cff-fb8f-4ed6-a961-8818a65392c9',
            first_name: 'newtestname',
            surname: 'newtestsurname',
            email: 'newtestemail@gmail.com'
          });
        });
    });
  });
  describe('Error handling', () => {
    test('should return 400 if input is invalid ', () => {
      return request(app)
        .patch('/api/accounts/5e345cff-fb8f-4ed6-a961-8818a65392c9')
        .send({
          name: 'newtestsurname'
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe('Invalid entry');
        });
    });
    test('should return 404 if account ID is not found', () => {
      return request(app)
        .patch('/api/accounts/5e345ctestff-fb8f-4ed6-a961-8818a65392c9')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe(
            'Account ID 5e345ctestff-fb8f-4ed6-a961-8818a65392c9 not found'
          );
        });
    });
  });
});
