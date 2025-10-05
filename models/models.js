import { DataTypes } from 'sequelize'
import { sequelize } from  "../config/db.js"

 export const Product = sequelize.define("product",{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    price:{
    type:DataTypes.FLOAT,
    allowNull : false
    }
})

export const User = sequelize.define("user",{
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

export const Cart = sequelize.define("cart", {
  quantity: DataTypes.INTEGER,
});

User.hasMany(Cart);
Cart.belongsTo(User);
Product.hasMany(User);
Cart.belongsTo(Product);

export const Order = sequelize.define("order", {
  totalAmount: DataTypes.FLOAT,
  status: { type: DataTypes.STRING, defaultValue: "Pending" },
});

User.hasMany(Order);
Order.belongsTo(User);