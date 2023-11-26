const request = require('supertest');
const app = require('../app');


describe('Admin API', () => {
  //Success Test Case
  it('Shoud returns the profession that earned the most money (sum of jobs paid) for any contactor', async () => {
    const expectedResponse = {
      "profession": "Programmer",
      "earned": 2483
    }

    const startDate = "2020-08-15";
    const endDate = "2020-08-17"

    const response = await request(app).get(`/admin/best-profession?startDate=${startDate}&endDate=${endDate}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(expectedResponse));
  });

  //Failure Case 
  it('Shoud returns the no best profession that earned the most money (sum of jobs paid) for any contactor', async () => {
    const expectedResponse = {
      "message": "No best profession found"
    }

    const startDate = "2020-09-15";
    const endDate = "2020-09-17"

    const response = await request(app).get(`/admin/best-profession?startDate=${startDate}&endDate=${endDate}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual(expect.objectContaining(expectedResponse));
  });


  //Success Test Case
  it('Shoud returns the best clients', async () => {
    const expectedResponse = [
      {
        "id": 4,
        "firstName": "Ash",
        "lastName": "Kethcum",
        "paid": 2020
      },
      {
        "id": 2,
        "firstName": "Mr",
        "lastName": "Robot",
        "paid": 242
      },
      {
        "id": 1,
        "firstName": "Harry",
        "lastName": "Potter",
        "paid": 221
      }
    ]

    const startDate = "2020-08-15";
    const endDate = "2020-08-17"

    const response = await request(app).get(`/admin/best-clients?startDate=${startDate}&endDate=${endDate}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(expectedResponse));

  });


  //
  it('Shoud returns emapty array for the best clients', async () => {

    const startDate = "2020-09-15";
    const endDate = "2020-09-17"

    const response = await request(app).get(`/admin/best-clients?startDate=${startDate}&endDate=${endDate}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });





});
