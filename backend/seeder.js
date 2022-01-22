import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Colors from 'colors'
import Users from './data/users.js'
import Product from './models/productModel.js'
import User from './models/userModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'
import products from './data/products.js'


dotenv.config()
connectDB()

const importData = async ()=>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(Users)

        const adminUser = createdUsers [0]._id

        const sampleProducts = products.map(Product=>{
            return{ ...Product,user:adminUser}
        })
        await Product.insertMany(sampleProducts)

        console.log('DATA IMPORTED'.green.invers)
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}


const destroyData = async ()=>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('DATA DESTROYED !'.red.inverse)
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}