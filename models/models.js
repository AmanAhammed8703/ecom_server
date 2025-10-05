import { DataTypes } from 'sequelize'
import { sequelize } from  "../config/db.js"

 export const product = sequelize.define("product",{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    price:{
    type:DataTypes.FLOAT,
    allowNull : false
    }
})

export const user = sequelize.define("user",{
    name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})