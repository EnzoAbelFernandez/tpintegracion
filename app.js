require('dotenv').config();
const express = require('express');
const app = express();
const contactRoutes = require('./routes/contactRoutes');

app.use(express.json());

app.use('/contacts', contactRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
