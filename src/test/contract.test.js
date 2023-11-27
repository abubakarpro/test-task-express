const request = require('supertest');
const app = require('../app');

describe('Contract API', () => {
  it('Should return the contract only if it belongs to the profile calling', async () => {
    const expectedResponse = {
      "id": 8,
      "terms": "bla bla bla",
      "status": "in_progress",
      "createdAt": expect.any(String),
      "updatedAt": expect.any(String),
      "ContractorId": 6,
      "ClientId": 4
    }

    const contractId = 8;

    const response = await request(app).get(`/contracts/${contractId}`).set('profile_id', 4);;
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(expectedResponse));
  });

  it('should return a 404 for a non-existing contract belongs to the profile calling', async () => {
    const nonExistingContractId = 1;

    const response = await request(app).get(`/contracts/${nonExistingContractId}`).set('profile_id', 4);
    expect(response.status).toBe(404);

  });

  it('Should returns a list of non-terminated contracts belonging to a user', async () => {
    const expectedResponse = [
      {
        "id": 2,
        "terms": "bla bla bla",
        "status": "in_progress",
        "createdAt": expect.any(String),
        "updatedAt": expect.any(String),
        "ContractorId": 6,
        "ClientId": 1
      }
    ]
    const response = await request(app).get(`/contracts`).set('profile_id', 1);;
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });

  it('Should returns an empty array belonging to a user', async () => {
    const response = await request(app).get(`/contracts`).set('profile_id', 5);;
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

});
