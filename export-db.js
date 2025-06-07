import { exec } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const user = process.env.DB_USER ;
const password = process.env.DB_PASSWORD  ;
const database = process.env.DB_NAME ;


// if (!user || !password || !database) {
//   console.error('❌ Missing DB_USER, DB_PASSWORD or DB_NAME in .env');
//   process.exit(1);
// }
const dumpFile = join(__dirname, 'backup.sql');
const mysqldumpPath = `"C:\\xampp\\mysql\\bin\\mysqldump.exe"`; // adjust this path
const cmd = `${mysqldumpPath} -u ${user} -p"${password}" ${database} > "${dumpFile}"`;


exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Error during backup: ${error.message}`);
    return;
  }
  console.log(`✅ Database exported to: ${dumpFile}`);
});
