import Purpose from "../model/Purpose";

const PurposeRepository = {

    insert : (txn, purpose) => {
        return new Promise((resolve, reject) => {
            txn.executeSql(
                'insert into purpose(id, name, description, image_url, disclosure_scope, start_date, end_date, stat) values(?,?,?,?,?,?,?,?)',
                [purpose.id, purpose.name, purpose.description, purpose.imageUrl, purpose.disclosureScope, purpose.startDate, purpose.endDate, purpose.stat],
                (tx, res) => {
                    resolve(res.insertId);
                },
                (error) => {
                    resolve(error);
                }
            )
        })
    },

    selectById : (txn, id) => {
        return new Promise((resolve, reject) => {
            txn.executeSql(
                'select id, name, description, image_url, disclosure_scope, start_date, end_date, stat from purpose where id = ?',
                [id],
                (tx, res) => {
                    const row = res.rows.item(0);
                    resolve(new Purpose( row.id, row.name, row.description, row.image_url, row.disclosure_scope, row.start_date, row.end_date, row.stat));
                },
                (error) => {
                    reject(error);
                }
            )
        })
    },
    
    selectByStatIsActive : (txn) => {
        return new Promise((resolve, reject) => {
            txn.executeSql(
                "select id, name, description, image_url, disclosure_scope, start_date, end_date, stat from purpose where stat = 1",
                [],
                (res) => {
                    let data = [];
                    for(let i = 0; i < res.rows.length; i++){
                        const row = res.rows.item(i);
                        data.push(new Purpose( row.id, row.name, row.description, row.image_url, row.disclosure_scope, row.start_date, row.end_date, row.stat))
                    }
                    resolve(data);
                },
                (error) => {
                    reject(error);
                }          
            )
        })
    },

    updatePurposeDate : (txn, id, purpose) => {
        return new Promise((resolve, reject) => {
            txn.executeSql(
                'update purpose set name = ?, description = ?, image_url = ?, disclosure_scope = ?, start_date = ?, decimal_dat = ?, stat = ? where id = ?',
                [purpose.name, purpose.description, purpose.imageUrl, purpose.disclosureScope, purpose.startDate, purpose.endDate, purpose.stat, id],
                (tx, res) => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            )
        })
    },

    updateStatById : (txn, id, stat) => {
        return new Promise((resolve, reject) => {
            txn.executeSql(
                'update purpose set stat = ? where id = ?',
                [stat, id],
                (tx, res) => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            )
        })
    },

    deleteById : async(txn, id) => {
        return new Promise((resolve, reject) => {
            txn.executeSql(
                'delete from purpose where id = ?',
                [id],
                (tx, res) => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            )
        })
    }
}

export default PurposeRepository;