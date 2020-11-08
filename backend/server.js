//import package HTTP de Node
const http = require('http');

//import de app.js créé par Express
const app = require('./app');

//fonction qui renvoie un port de connection valide
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

//sur quel port l'application va tourner
const port = normalizePort(process.env.PORT || '3000');//port 3000 ou defini par lenvironnement
app.set('port', port);

//fonction pour la gestion des erreurs
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//creation serveur
const server = http.createServer(app);

//gestions des évènements du serveur
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);//port 3000




var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "p@ssw0rd1",
  database : "groupomania"

});

con.connect(function(err) {
  if (err) throw err;
  console.log("connecté à la base de donnée ");

 /* con.query("SELECT t_user.id as 'ID', t_user.nom as 'NOM', FROM t_user ", function (err, result) {

    if (err) throw err;

    console.log(result);

  });*/


});