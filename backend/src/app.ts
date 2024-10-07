import express, { Express } from 'express'
import cors from 'cors'
import  getCorsConfig  from './middlewares/cors'
import  deviceRouters  from './routes/deviceRoutes'
const app: Express = express()

//------------------------------------//
//  Middleware                        //
//------------------------------------//
app.use(cors(getCorsConfig('localdev')))
app.use(express.json())

//------------------------------------//
//  Routes                            //
//------------------------------------//
app.use('/api/device',deviceRouters)
export default app
