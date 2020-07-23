import { inject } from 'mobx-react';
import { action } from 'mobx';


@inject(['sqliteManager'])
class BriefingRepository {
    
    constructor(props){
        super(props);
        this.connection = this.props.sqliteManager.connection;
    }

    @action
    selectByHeaderIdAndDetilPlanKey = (headerId, detailPlanKey) => {
        return this.connection.executeSql(
            'select header_id "headerId", detailplan_key "detilPlanKey", create_at "creatAt", score "score" '+
            'from briefing '+
            'where header_id = ? and detilplan_key = ?',
            [headerId, detailPlanKey],
            (tx, result) => {
                if(result.rows.length == 0)
                    return null;
                return result.rows.forEach((row) => {
                    return new Briefing(row.headerId, row.detailPlanKey, row.createAt, row.score);
                })
            }
        )
    }

    @action
    insert = (headerId, detailPlanKey) => {
        return this.connection.executeSql(
            'insert into briefing values(?, ?, datetime(\'now\'), 0)',
            [headerId, detailPlanKey],
            (tx, result) =>{
                return result.rowsAffected > 0 ? true : false; 
            }
        );
    }

}