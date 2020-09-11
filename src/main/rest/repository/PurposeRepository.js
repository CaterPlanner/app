import Purpose from "../model/Purpose";

const PurposeRepository = {

   
    insert : (txn, purpose) => {
        return new Promise((resolve, reject) => {
    
            txn.executeSql(
                'insert into purpose(id, name, description, photo_url, disclosure_scope, start_date, end_date, stat) values(?,?,?,?,?,?,?,?)',
                [purpose.id, purpose.name, purpose.description, purpose.photoUrl, purpose.disclosureScope, purpose.startDate.toString(), purpose.endDate.toString(), purpose.stat],
                resolve,
                reject);
        })
    },

    selectById : (txn, id) => {
        return new Promise((resolve, reject) => {
            txn.executeSql(
                'select id, name, description, photo_url, disclosure_scope, start_date, end_date, stat from purpose where id = ?',
                [id],
                (res) => {
                   const row = res.rows.item(0);
                   resolve(new Purpose( row.id, row.name, row.description, row.photo_url, row.disclosure_scope, row.start_date, row.end_date, row.stat));
                },
                reject
            )
        })
    },

    selectAll : (txn) => {
        return new Promise((resolve, reject) => {
            txn.executeSql(
                "select id, name, description, photo_url, disclosure_scope, start_date, end_date, stat from purpose",
                [],
                (res) => {
                    let data = [];
                    for(let i = 0; i < res.rows.length; i++){
                        const row = res.rows.item(i);
                        data.push(new Purpose( row.id, row.name, row.description, row.photo_url, row.disclosure_scope, row.start_date, row.end_date, row.stat))
                    }
                    resolve(data);
                },
                reject
            );
        })
    },
    
    selectByStatIsActive : (txn) => {
        return new Promise((resolve, reject) => {
            txn.executeSql(
                "select id, name, description, photo_url, disclosure_scope, start_date, end_date, stat from purpose where stat = 0",
                [],
                (res) => {
                    let data = [];
                    for(let i = 0; i < res.rows.length; i++){
                        const row = res.rows.item(i);
                        data.push(new Purpose( row.id, row.name, row.description, row.photo_url, row.disclosure_scope, row.start_date, row.end_date, row.stat))
                    }
                    resolve(data);
                },
                reject
            )
        })
    },

    updatePurposeDate : (txn, id, purpose) => {
        return new Promise((resolve, reject) => {
            txn.executeSql(
                'update purpose set name = ?, description = ?, photo_url = ?, disclosure_scope = ?, start_date = ?, end_date = ?, stat = ? where id = ?',
                [purpose.name, purpose.description, purpose.photoUrl, purpose.disclosureScope, purpose.startDate.toString(), purpose.endDate.toString(), purpose.stat, id],
                (res) => {
                    resolve(res);
                },
                reject
            )
        })
    },

    updateStatById : (txn, id, stat) => {
        return new Promise((resolve, reject) => {
            txn.executeSql(
                'update purpose set stat = ? where id = ?',
                [stat, id],
                resolve,
                reject
            )
        })
    },

    deleteById : (txn, id) => {
        return new Promise((resolve, reject) => {
            txn.executeSql(
                'delete from purpose where id = ?',
                [id],
                resolve,
                reject
            )
        })
    },

    deleteAll : (txn) => {
        return new Promise((resolve, reject) => {
            txn.executeSql('delete from purpose', [] , resolve, reject);
        })
    }
}

export default PurposeRepository;