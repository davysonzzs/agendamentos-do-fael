const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: "http://localhost:5173"}});
io.on('connection', socket => {
    console.log("usuario " + socket.id + " conectado")

    socket.on('message', agenda =>{
        io.emit('recebendo_agendamento', {
            assunto: agenda.assunto,
            dia: agenda.dia,
            hora: agenda.hora
        })
    })
});
server.listen(3000);