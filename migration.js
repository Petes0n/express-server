import { exec } from 'child_process';

function runMigrations() {
  return new Promise((resolve, reject) => {
    // exec('npx prisma migrate dev --name init', (error, stdout, stderr) => {
      exec('npx prisma db push', (error, stdout, stderr) => {
      if (error) {
        console.error(`Migration error: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`Migration stderr: ${stderr}`);
        return reject(stderr);
      }
      console.log(`Migration output: ${stdout}`);
      resolve(stdout);
    });
  });
}
export default runMigrations;
