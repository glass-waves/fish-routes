const { request } = require('express');
const pool = require('../utils/pool')

module.exports = class Fish {
    id;
    fishName;
    size;
    freshwater;
    region;

    constructor(row){
        this.id = row.id;
        this.fishName = row.fish_name;
        this.size = row.size;
        this.freshwater = row.freshwater;
        this.region = row.region;
    }

    static async insert({ fishName, size, freshwater, region }) {

        const { rows } = await pool.query(`
        INSERT INTO fishes (fish_name, size, freshwater, region )
        VALUES ($1, $2, $3, $4)
        RETURNING *`, [fishName, size, freshwater, region]
        );
        return new Fish(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(`
        SELECT * from fishes`
        );
        return rows.map(row => new Fish(row));
    }

    static async getOne(id) {
        const { rows } = await pool.query(`
        SELECT * from fishes
        WHERE id = $1`, [id]
        );
        return new Fish(rows[0]);
    }

    static async changeOne({ column, value, id }) {
        console.log(column, value, id )
        const { rows } = await pool.query(`
        UPDATE fishes 
        SET size = $1
        WHERE id = $2
        RETURNING *`, [value, id]
        );
        return new Fish(rows[0])
    }
}