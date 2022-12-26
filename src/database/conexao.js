import pg from "pg";

export default new pg.Pool({
    user:"postgres",
    host:"localhost",
    database:"postgres",
    password:"postgres",
    port:5432
})