import Vue from "vue";
import {Room} from "colyseus.js";

export interface GameState {
    connected: boolean;
    roomId?: string | null;
    sessionId?: string | null;
    connectionState: ConnectionState;
    room?: Room | null;
}

export enum ConnectionState {
    NOT_CONNECTED,
    JOINING,
    JOINED
}

const store =  Vue.observable<GameState>({
    connected: false,
    connectionState: ConnectionState.NOT_CONNECTED,
    roomId: null,
    room: null,
    sessionId: null,
})


export const getters = {
    isNotJoined() {
        return store.connectionState === ConnectionState.NOT_CONNECTED;
    },

    room() {
        return store.room;
    }
}

export default store;
