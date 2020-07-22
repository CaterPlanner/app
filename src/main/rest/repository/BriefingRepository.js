import { inject } from 'mobx-react';
import { action } from 'mobx';


@inject(['sqliteManager'])
class BriefingRepository {
    
    constructor(props){
        super(props);
        this.connection = this.props.sqliteManager.connection;
    }

    @action
    insert = (headerId, detailPlanKey) => {
        return this.connection.executeSql(
            'insert into briefing values(?, ?, datetime(\'now\'), 0)',
            [headerId, detailPlanKey],
            (tx, result) =>{
                return result.rowsAffected > 0 ? true : false; 
            }
        )
    }

}