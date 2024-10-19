"use strict";

// Imports
const express = require("express");
const http = require("http");  // Declaración única de HTTP
const socketIO = require("socket.io");
const session = require("express-session");
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const cons = require('consolidate');
const path = require('path');
var unalib = require('./unalib/index')

// Inicializar Express
let app = express();

// Crear el servidor HTTP una sola vez, antes de usarlo en Socket.IO
const server = http.createServer(app);

// Configuración de Auth0
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: '6iHZ2Y-_tg-10iLDLgC1puxQlB-vUJftP9nRKio-uc3Stto4Dl79FlR9nZe9bsAo',
  baseURL: 'http://localhost:3000',
  clientID: 'JPHIkgennB5iIiAA5IebvpXIcg2ek4MH',
  issuerBaseURL: 'https://dev-4mfpfxm4d0ccvxkm.us.auth0.com'
};

// Configuración de Auth0 middleware
app.use(auth(config));  // Esto debe estar antes de usar res.oidc.logout

// Agregar la ruta de logout
app.get("/logout", (req, res) => {
  res.oidc.logout({
    returnTo: 'http://localhost:3000'  // Redirigir a la página de inicio después de logout
  });
});

// Configuración de vistas
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use("/static", express.static("static"));  // Servir archivos estáticos (CSS, JS, etc.)

app.use(session({
  cookie: { httpOnly: true },
  secret: 'hjsadfghjakshdfg87sd8f76s8d7f68s7f632342ug44gg423636346f',
  resave: false,
  saveUninitialized: true
}));

// Rutas de la aplicación
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/dashboard", requiresAuth(), (req, res) => {
  const userInfo = req.oidc.user;  // Obtener los datos del usuario autenticado desde Auth0
  res.render("dashboard", { user: userInfo });  // Pasar los datos del usuario a la vista
});

// Inicializar Socket.IO
const io = socketIO(server, {
  cors: {
    origin: "*",  // Asegúrate de permitir el CORS si es necesario
    methods: ["GET", "POST"]
  }
});

// Socket.IO: Manejo de conexiones de chat
io.on('connection', function(socket){
  // si se escucha "chat message"
  socket.on('Evento-Mensaje-Server', function(msg){
    // volvemos a emitir el mismo mensaje, antes de emitirlo, ahora se hara un sanitizado
    const msgJSON = JSON.parse(msg)
    msgJSON.mensaje = unalib.sanitizeMessage(msgJSON.mensaje)
    msgJSON.url = unalib.sanitizeMessage(msgJSON.url)
    msgJSON.nombre = unalib.sanitizeMessage(msgJSON.nombre)
    console.log(msgJSON)

    io.emit('Evento-Mensaje-Server', JSON.stringify(msgJSON));
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
