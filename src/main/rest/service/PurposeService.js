import connection from '../../sqlite/SQLiteManager';
import { inject } from 'mobx-react';
import { action } from 'mobx';


@inject(stores => ({
    sqliteManager: stores.sqliteManager,
    purposeRepository : stores.repository.purposeRepository
}))
class PurposeService {
    
    constructor(props){
        super(props);
        this.dbConnection = this.props.sqliteManager.connection;
        this.purposeRepository = this.props.purposeRepository;
    }


}