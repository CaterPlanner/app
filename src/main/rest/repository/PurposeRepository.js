import Purpose from "../model/Purpose";

const PurposeRepository = {

    insert : (txn, purpose, callback) => {
        txn.executeSql(
            'insert into purpose(id, name, description, photo_url, disclosure_scope, start_date, end_date, stat) values(?,?,?,?,?,?,?,?)',
            [purpose.id, purpose.name, purpose.description, purpose.photoUrl, purpose.disclosureScope, purpose.startDate.toString(), purpose.endDate.toString(), purpose.stat],
            callback);
    },

    selectById : (txn, id, callback) => {
        txn.executeSql(
            'select id, name, description, photo_url, disclosure_scope, start_date, end_date, stat from purpose where id = ?',
            [id],
            (tx, res) => {
                if(!res)
                    res = tx;
               const row = res.rows.item(0);
               callback(new Purpose( row.id, row.name, row.description, row.photo_url, row.disclosure_scope, row.start_date, row.end_date, row.stat));
            }
        )
    },

    selectAll : (txn, callback) => {
        txn.executeSql(
            "select id, name, description, photo_url, disclosure_scope, start_date, end_date, stat from purpose",
            [],
            (tx, res) => {
                if(!res)
                    res = tx;
                let data = [];
                for(let i = 0; i < res.rows.length; i++){
                    const row = res.rows.item(i);
                    data.push(new Purpose( row.id, row.name, row.description, row.photo_url, row.disclosure_scope, row.start_date, row.end_date, row.stat))
                }
                callback(data);
            }
        );
    },
    
    selectByStatIsActive : (txn, callback) => {
        txn.executeSql(
            "select id, name, description, photo_url, disclosure_scope, start_date, end_date, stat from purpose where stat = 0",
            [],
            (tx, res) => {
                if(!res)
                    res = tx;
                let data = [];
                for(let i = 0; i < res.rows.length; i++){
                    const row = res.rows.item(i);
                    data.push(new Purpose( row.id, row.name, row.description, row.photo_url, row.disclosure_scope, row.start_date, row.end_date, row.stat))
                }
                callback(data);
            }
        )
    },

    updatePurposeDate : (txn, id, purpose, callback) => {
        console.log(purpose);
        txn.executeSql(
            'update purpose set name = ?, description = ?, photo_url = ?, disclosure_scope = ?, start_date = ?, end_date = ?, stat = ? where id = ?',
            [purpose.name, purpose.description, purpose.photoUrl, purpose.disclosureScope, purpose.startDate.toString(), purpose.endDate.toString(), purpose.stat, id],
            (tx, res) => {
                if(!res)
                res = tx;
                callback(res);
            }
        )
    },

    updateStatById : (txn, id, stat, callback) => {
        txn.executeSql(
            'update purpose set stat = ? where id = ?',
            [stat, id],
            callback
        )
    },

    deleteById : (txn, id, callback) => {
        txn.executeSql(
            'delete from purpose where id = ?',
            [id],
            callback
        )
    },

    deleteAll : (txn, callback) => {
        txn.executeSql('delete from purpose', [] , callback);
    }
}

export default PurposeRepository;