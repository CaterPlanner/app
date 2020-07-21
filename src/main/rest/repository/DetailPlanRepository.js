import connection from '../../sqlite/SQLiteManager';
import { inject } from 'mobx-react';
import { action } from 'mobx';
import DetailPlan from '../model/DetailPlan';


@inject(['sqliteManager'])
class DetailPlanRepository {
    
    constructor(props){
        super(props);
        this.dbConnection = this.props.sqliteManager.connection;
    }

    @action
    insert = (detailPlan, error) => {
        return this.dbConnection.sql(
            'insert into detailPlan values (?,?,?,?,?,?,?,?,?,?,?,?)',
            [goal.key, goal.headerId, goal.constructorKey, goal.constructorRelationType, goal.name,
            goal.type, goal.startDate, goal.endDate, goal.hopeAchievement, goal.color, goal.stat],
            error
        );
    }

    @action
    selectByKeyWithBriefingCount = (key) => {
        return this.dbConnection.sql(
            'select d.key "key", d.header_id "headerId", d.constructor_key "costructorKey", d.constructor_relation_type "constructorRelatioType", '+
            'd.name "name", d.type "type", d.start_date "startDate", d.end_date "endDate", d.hope_achievement "hopeAchievement", d.color "color", '+
            'd.stat "stat", b.briefingCount "briefingCount" '+
            'from (select * from detailplan where key = ?) d, (select header_id , count(*) "briefingCount" from briefing group by header_id ) b '+
            'where d.header_id = b.header_id',
            [key],
            (tx, result) => {
                return result.rows.length == 0 ? null : new DetailPlan(result.key, result.headerId, result.constructorKey, result.constructorRelationType, 
                    result.name, result.type, result.startDate, result.endDate, result.hopeAchievement, result.color, result.tat, result.briefingCount);
            },
        );
    }

    @action
    deleteByKey = (key) => {
        return this.dbConnection.executeSql(
            'delete from detailplan where key = ?',
            [key]
        );
    }


    @action
    updateDetailPlanData = (key, detailPlan) => {
        return this.dboConnection.executeSql(
            'update detailplan '+
            'name = ?, start_date = ?, end_date = ?, hope_achievement = ?, color = ? '+
            'where key = ?',
            [detailPlan.name, detailPlan.startDate, detailPlan.endDate, detailPlan.hopeAchievement, detailPlan.color, key]
        );
    }

}
