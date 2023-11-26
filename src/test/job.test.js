const request = require('supertest');
const app = require('../app');

describe('Job API', () => {
  //Success Test Case
  it('Should return all unpaid jobs for a user (client or contractor)', async () => {
    const expectedResponse = [
      {
        "id": 3,
        "description": "work",
        "price": 202,
        "paid": null,
        "paymentDate": null,
        "createdAt": expect.any(String),
        "updatedAt": expect.any(String),
        "ContractId": 3
      },
      {
        "id": 4,
        "description": "work",
        "price": 200,
        "paid": null,
        "paymentDate": null,
        "createdAt": expect.any(String),
        "updatedAt": expect.any(String),
        "ContractId": 4
      }
    ]


    const response = await request(app).get(`/jobs/unpaid`).set('profile_id', 2);;
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });

  //Failure test case
  it('should return an empty array when there are no unpaid jobs for the user', async () => {
    const response = await request(app).get(`/jobs/unpaid`).set('profile_id', 5);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });


  it('Should pay for a job and amount should be moved from the clients balance to the contractor balance.', async () => {

    const job_id = 2;

    const response = await request(app).post(`/jobs/${job_id}/pay`).set('profile_id', 1);
    expect(response.status).toBe(200);
  });


});
