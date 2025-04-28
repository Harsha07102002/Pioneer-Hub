const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectDB = require('./utils/db')
const userRoute = require('./routes/userRoutes')
const companyRoute = require('./routes/companyRoutes')
const jobRoute = require('./routes/jobRoutes')
const applicationRoute = require('./routes/applicationRoutes')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions))

app.get('/home',(req,res)=>{
    return res.status(200).json({
        message:"I am coming from backend",
        success:true
    })
})

app.use('/api/v1/user',userRoute)
app.use('/api/v1/company',companyRoute)
app.use('/api/v1/jobs',jobRoute)
app.use('/api/v1/application',applicationRoute)

const PORT = process.env.PORT || 8800

app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is running at http://localhost:${PORT}`)
})