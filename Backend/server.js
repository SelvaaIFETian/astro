// server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const userRoutes = require('./Routes/userRoutes');
const superAdminRoutes = require('./Routes/superAdminRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/api/superadmin', superAdminRoutes);

const adminRoutes = require('./Routes/adminRoutes');
app.use('/api/admins', adminRoutes);

const palanRoutes = require('./Routes/palanRoutes');
app.use('/api/palan', palanRoutes);
const flowerRoutes = require('./Routes/flowerRoutes');
app.use('/api', flowerRoutes);
const mantrigamRoutes = require('./Routes/mantrigamRoutes');
app.use('/api/mantrigam', mantrigamRoutes);
const pariharamRoutes = require('./Routes/pariharamRoutes');
app.use('/api', pariharamRoutes);





// 🛠️ Alter DB schema to match updated models
sequelize.sync({alter:true}).then(() => {
  app.listen(5001, () => console.log('✅ Server running on port 5001 & DB synced'));
}).catch((err) => {
  console.error('❌ DB sync failed:', err);
});
