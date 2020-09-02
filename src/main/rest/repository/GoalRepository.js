import Goal from '../model/Goal'
import { call } from 'react-native-reanimated';

const GoalRepository = {
    insert : (txn, goal, callback) => {
        console.log(goal)
        txn.executeSql(
            'insert into goal(id, purpose_id, name, description, start_date, end_date, color, cycle, briefing_count, last_briefing_date, stat) values(?,?,?,?,?,?,?,?,?,?,?)',
            [goal.id, goal.purposeId, goal.name, goal.description, goal.startDate.toString(), goal.endDate.toString(), goal.color, goal.cycle, goal.briefingCount, goal.lastBriefingDate.toString(), goal.stat],
            callback,
            (e) => {console.log(e)}
        );
    },
    
    selectByHeaderIdAndStat : (txn, purposeId, stat, callback) => {
        txn.executeSql(
            'select id, purpose_id, name, description, start_date, end_date, color, cycle, briefing_count, last_briefing_date, stat from goal where purpose_id = ? and stat = ?',
            [purposeId, stat],
            (tx, res) => {
                let data = [];
                for(let i =0; i < res.rows.length; i++){
                    const row = res.rows.item(i);
                    data.push(new Goal(row.id, row.purpose_id, row.name, row.description, row.start_date, row.end_date, row.color, row.cycle, row.briefing_count, row.last_briefing_date, row.stat))
                }
                callback(data);
            })
    },

    selectByPurposeId : (txn, purposeId, callback) => {
        txn.executeSql(
            'select id, purpose_id, name, description, start_date, end_date, color, cycle, briefing_count, last_briefing_date, stat from goal where purpose_id = ?',
            [purposeId],
            (tx, res) => {
                if(!res)
                res = tx;
                let data = [];
                for(let i =0; i < res.rows.length; i++){
                    const row = res.rows.item(i);
                    data.push(new Goal(row.id, row.purpose_id, row.name, row.description, row.start_date, row.end_date, row.color, row.cycle, row.briefing_count, row.last_briefing_date, row.stat))
                }
                callback(data);
            }
        );
    },

    selectByStatIsActiveInPurposeId : (txn, purposeIdList, callback) => {
        let ext = purposeIdList[0];
        for(let i = 1; i< purposeIdList.length; i++){
            ext += "," + purposeIdList[i];
        }

        txn.executeSql(
            'select id, purpose_id, name, description, start_date, end_date, color, cycle, briefing_count, last_briefing_date, stat from goal where purpose_id in (?) and stat = 0',
            [ext],
            (tx, res) => {
                if(!res)
                res = tx;
                let data = [];
                for(let i =0; i < res.rows.length; i++){
                    const row = res.rows.item(i);
                    data.push(new Goal(row.id, row.purpose_id, row.name, row.description, row.start_date, row.end_date, row.color, row.cycle, row.briefing_count, row.last_briefing_date, row.stat))
                }
                callback(data);
            }
        );
        
    },

    deleteByPurposeId : (txn, purposeId, callback) => {
        txn.executeSql(
            'delete from goal where purpose_id = ?',
            [purposeId],
            callback
        )
    },

    updateByKey : (txn, purposeId, id, goal, callback) => {
        txn.executeSql(
            'update goal set stat = ?, briefing_count = ?, last_briefing_date = ? where purpose_id = ? and id = ?',
            [goal.stat, goal.briefingCount, goal.lastBriefingDate.toString(), purposeId, id],
            callback
        );
    }

}

export default GoalRepository;