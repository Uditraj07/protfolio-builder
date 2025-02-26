// models/Script.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "../models/user.js"; // Assuming you have a User model

const Script = sequelize.define("Script", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, // Ensuring auto-increment for primary key
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER, // ✅ Match with `User.id`
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE", // Deletes scripts when user is deleted
    },
    prompt: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    generatedText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  
  // Define Associations (Optional, but recommended)
  User.hasMany(Script, { foreignKey: "userId" });
  Script.belongsTo(User, { foreignKey: "userId" });

export default Script;
