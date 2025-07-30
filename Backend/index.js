const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const routes = require('./routes/routes')

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
app.use(routes)


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`))
