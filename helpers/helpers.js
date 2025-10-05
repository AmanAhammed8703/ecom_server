
import { resolve } from 'path';
import { Product, User, Cart, Order } from '../models/models.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { where } from 'sequelize';


export const helpers = {
    addProduct: async (data) => {
        return new Promise(async (resolve, reject) => {
            const { name, price } = data;
            await Product.create({ name, price }).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })

        })

    },

    deleteProduct: (productId) => {
        return new Promise(async (resolve, reject) => {
            const deleted = await Product.destroy({
                where: { id: productId }
            })
            if (deleted) {
                resolve({ message: "product successfully deleted" })
            } else {
                reject({ message: "product not found" })
            }
        })
    },

    updateProduct: (data) => {
        return new Promise(async (resolve, reject) => {
            const { id, name, price } = data;
            const updated = await Product.update({ name, price },
                {
                    where: {
                        id: id
                    }
                }
            )
            if (updated) {
                resolve({ message: "product successfully updated" })
            } else {
                reject({ message: "product not found" })
            }

        })
    },
    getProducts: () => {
        return new Promise(async (resolve, reject) => {
            const allProducts = await Product.findAll()

            if (allProducts.length > 0) {
                resolve({ count: allProducts.length, data: allProducts });
            } else {
                resolve({ message: "No products found", data: [] });
            }
        })

    },
    getProductById: (id) => {
        return new Promise(async (resolve, reject) => {
            const productById = await Product.findByPk(id)
            if (productById) {
                resolve({ data: productById });
            } else {
                reject({ message: "Product not found!" });
            }
        })
    },

    userSignUp: (data) => {
        return new Promise(async (resolve, reject) => {
            const { name, email, password } = data
            const existingUser = await User.findOne({ where: { email } })
            if (existingUser) {
                reject({ message: "User already exist in the email id" })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                await User.create({ name, email, password: hashedPassword }).then(() => {
                    resolve({ message: "User SignUp successfull" })
                }).catch((error) => {
                    reject(error)
                })
            }
        })
    },

    userLogin: (data) => {
        return new Promise(async (resolve, reject) => {
            const { email, password } = data
            const userData = await User.findOne({ where: { email } })
            const isExist = await User.findOne({ where: { email } })
            if (!isExist) {
                reject({ message: "User does not exist with given email id" })
            }
            const isMatch = await bcrypt.compare(password, userData.password)
            if (!isMatch) {
                reject({ message: "User does not exist with given email id" })
            } else {
                const token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, {
                    expiresIn: "7d",
                });
                resolve({ message: "login successfull", token: token })
            }

        })
    },

    addToCart: (data) => {
        return new Promise(async (resolve, reject) => {
            const { userId, productId, quantity } = data

            const productExist = await Product.findByPk(productId)
            if (!productExist) {
                reject({ message: "Product Not Found" })
            }
            const existingItem = await Cart.findOne({
                where: {
                    userId, productId
                }
            })


            if (existingItem) {

                existingItem.quantity += quantity
                await existingItem.save()
                resolve({ message: "Quantity updated", cartItem: existingItem });
            } else {

                await Cart.create({ userId, productId, quantity }).then(() => {
                    resolve({ message: "Item added to the cart" })
                }).catch((err) => {

                    reject((err.message))
                })
            }
        })
    },

    placeOrder: (userId) => {
        return new Promise(async (resolve, reject) => {
 
            const cartItems = await Cart.findAll({ where: { userId }, include: [Product], })
     
            
            if (!cartItems.length) {
                reject({ message: "The cart is empty" })
            }

            let totalAmount = 0
            
            for (const item of cartItems) {
                const product = item.Product; // ✅ correct key
        if (!product) continue;
                totalAmount += product.price * item.quantity
                await Order.create({
                    userId,
                    productId:product.id,
                    totalAmount: product.price * item.quantity,
                    status: "Pending",
                });
            }
            
            await Cart.destroy({where:{userId}}).then(() => {
                resolve({ message: "Order placed successfully", totalAmount });
            }).catch((err) => {
                reject(err)
            })

        })
    }

}
