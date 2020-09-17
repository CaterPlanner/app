import SQLite from 'react-native-sqlite-storage';


const connection = SQLite.openDatabase({
    name: 'CaterPlanner.db',
    createFromLocation : 1 
},
    (db) => {
        db.executeSql("PRAGMA foreign_keys = ON");
        },
    error => { console.log(error); }
)

export default {
    getConnection: () => connection,
    transaction : (db, task) => {
        let data;
        return new Promise(async (resolve, reject) => {
            try{
                db.executeSql('BEGIN TRANSACTION')
                data = await (new Promise((resolve, reject) => {
                    task(resolve, reject)
                }))              
                db.executeSql('COMMIT');
                resolve(data);
            }catch(e){
                db.executeSql('ROLLBACK')
                reject(e);
            }finally{
                db.transaction('END')
            }
        })
    }
}