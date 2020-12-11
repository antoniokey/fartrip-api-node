import server from '../server';
import db from '../src/db/config/db.config';

const port = process.env.PORT || 3000;

const runServer = () => {
  server.listen(port, () => {
    console.log(`Server started using ${port} port!`);
  }); 
};

const handleErrors = () => {
  process.on('unhandledRejection', (exception: any, promise: Promise<any>) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', exception);
  });

  process.on('uncaughtException', error => {
    console.log(`Was caught an uncaught error - ${error.name} (${error.message})`);
  });
};

(() => {
  db.sequelize.authenticate()
    .then(() => console.log('The database connection has been successfully established!'))
    .then(() => runServer())
    .then(() => handleErrors());
})();
