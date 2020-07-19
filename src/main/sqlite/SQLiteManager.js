import { openDatabase } from 'react-native-sqlite-storage';


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

}


