import connection from '../../sqlite/SQLiteManager';
import { inject } from 'mobx-react';
import { action } from 'mobx';


@inject(['sqliteManager'])
class BriefingRepository {
    
    constructor(props){
        super(props);
        this.dbConnection = this.props.sqliteManager.connection;
    }

    @action
    insert = (headerId, detailPlanKey) => {
        return this.dbConnection.sql(
            'insert into briefing values(?, ?, datetime(\'now\'), 0)',
            [headerId, detailPlanKey]
        )
    }

}