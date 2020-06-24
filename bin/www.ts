import server from '../server';
import db from '../src/db/config/db.config';

const port = process.env.PORT || 3000;

const runServer = () => {
  db.sequelize.authenticate()
      .then(() => {
        console.log('The database connection has been successfully established!');

        server.listen(port, () => {
          console.log(`Server started using ${port} port!`);
        });  
      });
};

runServer();
