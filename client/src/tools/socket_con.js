import  socketIOClient  from "socket.io-client";

function get_socket_connection() {
    const URL = "http://localhost:3001";
    if (this.socket) this.socket = socketIOClient(URL);
    return (this.socket);
}
let socket = {
    socket : get_socket_connection()
}
export default socket