import { openDatabase } from 'react-native-sqlite-storage';


//참고 https://stackoverflow.com/questions/44264955/react-native-async-await-in-react-native-sqlite-storage

export default class SQLiteManager {
    
    constructor(){
        this.connection = openDatabase({
            name: 'CaterPlanner.db',
            location: '/rest/CaterPlanner.db'
        },
        () => {console.log("sqlite connected!")},
        error => {console.log(error);}
        );
    }

    sql = (statement, params, success, error) 
        => new Promise((resolve, reject) => {
            this.connection.executeSql(
                statement,
                params,
                (tx, result) => {
                    return resolve(success(result));
                },
                error ? (tx, error) => {
                    return reject(error(error))
                } : null
            )
    });
    
    transaction = (fn, params) 
            => new Promise((resolve, reject) => {
                this.connection.transaction(
                    fn,
                    params,
                    (error) => {
                        console.log(error)
                        return reject(false);
                    },
                    () => {
                        return resolve(true);
                    }
                )
            });
}


