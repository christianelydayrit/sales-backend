import 'dotenv/config';
import { buildApp } from './app.js';

const app = buildApp();
const port = process.env.PORT;

const start = async () => {
    try {
      await app.listen({ port: port })
      app.log.info(`Server running on port:${port}`)
    } catch (err) {
      app.log.error(err)
      process.exit(1)
    }
  }
start()