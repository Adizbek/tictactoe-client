import {Room} from "colyseus.js";
import client from "@/client";
import store, {ConnectionState} from "@/store";

export function leaveRoom(room: Room) {
    localStorage.removeItem('sessionId')
    localStorage.removeItem('roomId')

    room.leave(true)
    store.room = null;
    store.connectionState = ConnectionState.NOT_CONNECTED;
}

export function initGame(room: Room, cb: (state: any) => void) {
    saveRoomData(room)

    store.room = room;
    store.connectionState = ConnectionState.JOINED;

    room.onStateChange(cb)
}


export function saveRoomData(room: Room) {
    localStorage.setItem("sessionId", room.sessionId);
    localStorage.setItem("roomId", room.id);
}

export async function reconnectLastRoom() {
    const sessionId = localStorage.getItem('sessionId');
    const roomId = localStorage.getItem('roomId');

    if (sessionId && roomId) {
        console.log("Reconnecting")
        return client.reconnect(roomId, sessionId)
    } else
        throw new Error("Last game not found")
}
