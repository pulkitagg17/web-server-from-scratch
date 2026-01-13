// Create a Listening Socket
import net from "net";

// let server = net.createServer();
// server.listen({ host: '127.0.0.1', port: 1234 });

// Accept New Connections
function newConn(socket) {
    console.log("new connection", socket.remoteAddress, socket.remotePort);

    socket.on("end", () => {
        console.log("connection closed FIN");
    });

    socket.on("data", (data) => {
        console.log("data", data);
        socket.write(data);

        if (data.includes("q")) {
            console.log("closing connection");
            socket.end();
        }
    });
}

const server = net.createServer();

server.on("error", (err) => {
    throw err;
});

server.on("connection", newConn);

server.listen({ host: '127.0.0.1', port: 1234 }, () => {
    console.log("listening on 127.0.0.1:1234");
});