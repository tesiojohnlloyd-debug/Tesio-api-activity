// server.js
require('dotenv').config();
const express = require('express');
const app = express();

// midlleware
app.use(express.json());

// load config
const PORT = process.env.PORT || 30000;
const BASE_URI = process.env.BASE_URI || '/api/v1';

// import routes
const apiRoutes = require('./src/routes/apiRoutes');
app.use(BASE_URI, apiRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Base URI: http://localhost:${PORT}${BASE_URI}`);
});