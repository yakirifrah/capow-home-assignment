import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, `./env/${process.env.NODE_ENV}.env`) })
import app from './app'
import { mongooseConnection } from './providers/db'

const main = async () => {
  try {
    mongooseConnection()
    const port = process.env.PORT || 3000
    app.listen(port, () => console.log(`Listening on port ${port}`))
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
main()
