declare module '*.vue' {
    import Vue from 'vue'

    export default Vue
}

declare module 'vue/types/vue' {
    import {Client} from "colyseus.js";
    import store from "@/store";

    interface Vue {
        $client: Client
    }
}
