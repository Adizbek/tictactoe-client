// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 0.5.37
// 

import { Schema, type, ArraySchema, MapSchema, DataChange } from "@colyseus/schema";
import { Player } from "./Player"

export class GameState extends Schema {
    @type([ "uint8" ]) public map: ArraySchema<number> = new ArraySchema<number>();
    @type("boolean") public waitingForOpponent: boolean;
    @type("number") public turn: number;
    @type("boolean") public started: boolean;
    @type("boolean") public finished: boolean;
    @type("boolean") public opDeserted: boolean;
    @type("uint8") public winner: number;
    @type("uint8") public winType: number;
    @type("number") public nextTurn: number;
    @type({ map: Player }) public entities: MapSchema<Player> = new MapSchema<Player>();
}
