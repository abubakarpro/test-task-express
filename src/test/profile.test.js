const request = require('supertest');
const app = require('../app');

describe('Profile API', () => {
  //Success Test Case
  it('Should deposits money into the the the balance of a client', async () => {
    const expectedResponse = {
      "id": 2,
      "firstName": "Mr",
      "lastName": "Robot",
      "profession": "Hacker",
      "balance": 241.11,
      "type": "client",
      "createdAt": expect.any(String),
      "updatedAt": expect.any(String),
    }

    const client_id = 2;

    const response = await request(app).post(`/balances/deposit/${client_id}`)
      .send({ amount: 10 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(expectedResponse));
  });

});
