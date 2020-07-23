import { inject } from 'mobx-react';
import { action } from 'mobx';
import {Goal, Perform} from '../model/DetailPlan';


@inject(['sqliteManager'])
class DetailPlanRepository {

    constructor(props) {
        super(props);
        this.connection = this.props.sqliteManager.connection;
    }
    
    @action
    insert = (headerId, goal) => {
        return this.connection.executeSql(
            'insert into detailPlan values (?,?,?,?,?,?,?,?,?,?,?,?)',
            [goal.key, headerId, goal.constructorKey, goal.constructorRelationType, goal.name,
            goal.type, goal.startDate, goal.endDate, goal.hopeAchievement, goal.color, goal.stat],
            (tx, result) => {
                return result.rowsAffected > 0 ? true : false;
            }
        );
    }

    @action
    selectByKey = (key) => {
        return this.connection.executeSql(
            'select key "key", header_id "headerId", constructor_key "costructorKey", constructor_relation_type "constructorRelatioType", ' +
            'name "name", type "type", start_date "startDate", end_date "endDate", hope_achievement "hopeAchievement", color "color", ' +
            'stat "stat" ' +
            'from detailplan ' +
            'where key = ?',
            [key],
            (tx, result) => {

                if (result.rows.length == 0)
                    return null;

                let res = result.rows.get(0);
                return new DetailPlan(res.key, res.headerId, res.constructorKey, res.constructorRelationType,
                    res.name, res.type, res.startDate, res.endDate, res.hopeAchievement, res.color, res.stat);
            }
        );
    }

    @action
    selectByHeaderId = (headerId) => {
        return this.connection.executeSql(
            'select key "key", header_id "headerId", constructor_key "costructorKey", constructor_relation_type "constructorRelatioType", ' +
            'name "name", type "type", start_date "startDate", end_date "endDate", hope_achievement "hopeAchievement", color "color", ' +
            'stat "stat" ' +
            'from detailplan ' +
            'where header_Id = ?',
            [headerId],
            (tx, result) => {
                if (result.rows.length == 0)
                    return null;

                return result.rows.map((row) => {
                    if(row.type == 'G'){
                        return new Goal(res.key, res.headerId, res.constructorKey, res.constructorRelationType,
                            res.name, res.type, res.startDate, res.endDate, res.hopeAchievement, res.color, res.stat);
                    }else if(row.type == 'P'){
                        return new Perform(res.key, res.headerId, res.constructorKey, res.constructorRelationType,
                            res.name, res.type, res.startDate, res.endDate, res.hopeAchievement, res.color, res.stat);
                    }
                });
            }
        );
    }

    @action
    deleteByKey = (key) => {
        return this.connection.executeSql(
            'delete from detailplan where key = ?',
            [key],
            (tx, result) => {
                return result.rowsAffected > 0 ? true : false;
            }
        );
    }

    @action
    deleteByHeaderId = (headerId) => {
        return this.connection.executeSql(
            'delete from detailplan where header_id = ?',
            [headerId],
            (tx, result) => {
                return result.rowsAffected > 0 ? true : false;
            }
        );
    }

    //안쓰일것 같음
    // @action
    // updateDetailPlanData = (key, detailPlan) => {
    //     return this.connection.executeSql(
    //         'update detailplan ' +
    //         'name = ?, start_date = ?, end_date = ?, hope_achievement = ?, color = ? ' +
    //         'where key = ?',
    //         [detailPlan.name, detailPlan.startDate, detailPlan.endDate, detailPlan.hopeAchievement, detailPlan.color, key].color],
    //         (tx, result) => {
    //             return result.rowsAffected > 0 ? true : false;
    //         }
    //     );
    // }

}
