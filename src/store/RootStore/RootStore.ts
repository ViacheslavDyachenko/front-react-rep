import { ApiStore } from "./ApiStore/ApiStore";

export default class RootStore {
    readonly apiStore = new ApiStore('https://api.github.com');
}