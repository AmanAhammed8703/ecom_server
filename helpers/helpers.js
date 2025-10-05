
import { resolve } from 'path';
import { product, user } from '../models/models.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";


export const helpers = {
    addProduct: async (data) => {
        return new Promise(async (resolve, reject) => {
            const { name, price } = data;
            await product.create({ name, price }).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error)
            })

        })

    },

    deleteProduct: (productId) => {
        return new Promise(async (resolve, reject) => {
            const deleted = await product.destroy({
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
            const updated = await product.update({ name, price },
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
            const allProducts = await product.findAll()
            console.log(allProducts);

            if (allProducts.length > 0) {
                resolve({ count: allProducts.length, data: allProducts });
            } else {
                resolve({ message: "No products found", data: [] });
            }
        })

    },
    getProductById: (id) => {
        return new Promise(async (resolve, reject) => {
            const productById = await product.findByPk(id)
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
            const existingUser = await user.findOne({ where: { email } })
            if (existingUser) {
                reject({ message: "User already exist in the email id" })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                await user.create({ name, email, password: hashedPassword }).then(() => {
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
            console.log(data);
            const userData = await user.findOne({ where: { email } })
            const isExist = await user.findOne({ where: { email } })
            if (!isExist) {
                reject({ message: "User does not exist with given email id" })
            }
            const isMatch = await bcrypt.compare(password, userData.password)
            if (!isMatch) {
                reject({ message: "User does not exist with given email id" })
            } else {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                    expiresIn: "7d",
                });
                resolve({ message: "login successfull",token:token })
            }

        })
    }

}
