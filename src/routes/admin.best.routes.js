const express = require('express');
const { getBestProfession, getBestClients } = require('../controller/admin.best.controller.js');

const adminRouter = express.Router();

adminRouter.get('/best-profession', getBestProfession);
adminRouter.get('/best-clients', getBestClients);

module.exports = adminRouter;
