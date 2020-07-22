import { openDatabase } from 'react-native-sqlite-storage';


//참고 https://stackoverflow.com/questions/44264955/react-native-async-await-in-react-native-sqlite-storage
//https://stackoverflow.com/questions/44264955/react-native-async-await-in-react-native-sqlite-storage

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

//     sql = (statement, params, succees) 
//         => new Promise((resolve, reject) => {
//             this.connection.executeSql(
//                 statement,
//                 params,
//                 (tx, result) => {
//                     return resolve( succees ? succees(this, result) : result);
//                 },
//                 error ? (tx, error) => {
//                     return reject(error)
//                 } : null
//             )
//     });
    
//     transaction = (fn) 
//             => new Promise((resolve, reject) => {
//                 this.connection.transaction(
//                     () => {
//                         resolve(fn());
//                     },
//                     (error) => {
//                         console.log(error)
//                         return reject(false);
//                     }
//                 )
//             });
// }


