const request = require('supertest');
const app = require('../app');

describe('Job API', () => {
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

  it('should return an empty array when there are no unpaid jobs for the user', async () => {
    const response = await request(app).get(`/jobs/unpaid`).set('profile_id', 5);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });


  it('Should pay for a job and amount should be moved from the clients balance to the contractor balance.', async () => {
    const expectedResponse = {
      "message": "Payment of 201 for work has been made successfully."
    }
    const job_id = 2;

    const response = await request(app).post(`/jobs/${job_id}/pay`).set('profile_id', 1);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(expectedResponse));
  });

  it('Should return Insufficient balance to pay', async () => {
    const expectedResponse = {
      "message": "Insufficient balance to pay for work."
    }

    const job_id = 5;

    const response = await request(app).post(`/jobs/${job_id}/pay`).set('profile_id', 4);
    expect(response.status).toBe(409);
    expect(response.body).toEqual(expect.objectContaining(expectedResponse));
  });

});
