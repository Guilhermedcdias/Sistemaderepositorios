import { db } from "../config/db";


class Database {
    constructor() {
        this.syncbd();
    }
    async syncbd() {
        await db.sync();
    }
}

export default new Database;