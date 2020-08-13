const { default: Purpose } = require("../model/Purpose");

const PurposeRepository = {

    insert : async (txn, purpose) => {
        const result = await txn.executeSql(
            'insert into purpose values(?,?,?,?,?,?,?,?)',
            [purpose.id, purpose.name, purpose.description, purpose.imageUrl, purpose.disclosureScope, purpose.startAt, purpose.decimalDay, purpose.stat]
        )
        return result.insertId;
    },

    selectById : async (txn, id) => {
        const result = await txn.executeSql(
            'select id, name, description, image_url, disclosureScope, start_at, decimal_day, stat from purpose where id = ?',
            [id]
        )
        return result.rows.item(0);
    },

    selectByStatIsActive : async (txn) => {
        return (await txn.executeSql(
            'select id, name, description, image_url, disclosureScope, start_at, decimal_day, stat from purpose where stat = 1'
        )).rows.map((row) => {
            return new Purpose( row.id, row,name, row.description, row.image_url, row.disclosure_scope, row.start_at, row.deicmal_day, row.stat);
        })
    },

    updatePurposeDate : async (txn, id, purpose) => {
        await txn.executeSql(
            'update purpose set name = ?, description = ?, image_url = ?, disclosure_scope = ?, start_at = ?, decimal_dat = ?, stat = ? where id = ?',
            [purpose.name, purpose.description, purpose.imageUrl, purpose.disclosureScope, purpose.startAt, purpose.decimalDay, purpose.stat, id]
        );
    },

    updateStatById : async (txn, id, stat) => {
        await txn.executeSql(
            'update purpose set stat = ? where id = ?',
            [stat, id]
        );
    },

    deleteById : async(txn, id) => {
        await txn.executeSql(
            'delete from purpose where id = ?',
            [id]
        );
    }
}

export default PurposeRepository;