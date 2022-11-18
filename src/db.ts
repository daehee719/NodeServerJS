import MySQL from "mysql2/promise";

const poolOption : MySQL.PoolOptions = 
{
    host:"gondr.asuscomm.com",
    user:"daehee719",
    password:"fucking0719@@",
    database:"daehee719",
    connectionLimit:10
}

export const Pool : MySQL.Pool = MySQL.createPool(poolOption);