const express = require('express');
const { getBestProfession } = require('../controller/admin.best.profession.controller.js');

const adminRouter = express.Router();

adminRouter.get('/best-profession', getBestProfession);

module.exports = adminRouter;
