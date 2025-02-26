const app = require("./app");
const sequelize = require("./config/database");

const PORT = process.env.PORT || 5000;

// Connect Database and Start Server
sequelize.sync().then(() => {
  console.log("✅ Database Synced! All tables have been dropped and recreated.");
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});

