import postgres from 'postgres';
import { backendConfig } from '../../config/index.js';

const sql = postgres({
  host: backendConfig.db.host,
  port: backendConfig.db.port,
  database: backendConfig.db.database,
  username: backendConfig.db.user,
  password: backendConfig.db.password
});

export default sql; 