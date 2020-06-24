import server from '../server';

const port = process.env.PORT || 3000;

const runServer = () => {
  server.listen(port, () => {
    console.log(`Server started using ${port} port!`);
  });  
};

runServer();
