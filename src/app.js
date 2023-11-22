const express = require('express');
const bodyParser = require('body-parser');

const { sequelize } = require('./model/model')
const { getProfile } = require('./middleware/getProfile')

const app = express();

app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)


const contractRoutes = require('./routes/contract.routes');
// const adminRoutes = require('./routes/admin.routes');
// const jobRoutes = require('./routes/job.routes');
// const profileRoutes = require('./routes/profile.routes');

// app.use('/admin', adminRoutes);
app.use('/contracts', contractRoutes);
// app.use('/balances', profileRoutes);
// app.use('/jobs', jobRoutes);

module.exports = app;
