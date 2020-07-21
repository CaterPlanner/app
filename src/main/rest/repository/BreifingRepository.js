import connection from '../../sqlite/SQLiteManager';
import { inject } from 'mobx-react';
import { action } from 'mobx';


@inject(['sqliteManager'])
class BreifingRepository {
    
    constructor(props){
        super(props);
        this.dbConnection = this.props.sqliteManager.connection;
    }

}