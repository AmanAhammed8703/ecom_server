import { Sequelize } from "sequelize"

export const sequelize = new Sequelize("ecom_db", "postgres","1234", {
    host: "localhost",
    dialect: "postgres",
    logging: false, // disable SQL logs
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
};
