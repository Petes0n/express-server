import express from 'express';
import routes from './routes/rootRoute.js';
import session from "express-session";
import pkg from "pg" ;


const {Pool} = pkg;
const app = express();
app.use(express.json());
// const connectionPool = new Pool({
//   connectionString:process.env.LOCAL_DATABASE_URL
// });
// const PgSession = connectPgSimple(session);
app.use(
  session({
    // store: new PgSession({
    //   pool: connectionPool, 
    // }),
    secret: process.env.SESSION_SECRET_KEY, 
    resave: false,
    saveUninitialized: true,
    cookie: { 
      secure: false ,// Set to true in production if using HTTPS
      maxAge: 30 * 24 * 60 * 60 * 1000 , // 1 day
       sameSite: "lax"
    }, 
  })
);
const PORT = process.env.PORT || 8080;
// const localDatabaseURL = process.env.LOCAL_DATABASE_URL;
// const onlineDatabaseURL = process.env.ONLINE_DATABSE_URL;
// runMigrations()
// .then(() => {
//   console.log('Migrations applied successfully');
  
 
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  // })
  // .catch((error) => {
  //   console.error('Failed to apply migrations:', error);
  //   process.exit(1); 
  // });
//  let databaseURI = process.env.NODE_ENV === "Development" ? localDatabaseURL : onlineDatabaseURL;
//  export{databaseURI}
 app.use(routes);