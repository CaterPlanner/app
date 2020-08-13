import Perform from '../model/Perform'

const PerfromRepository = {
    insert : async (txn, perform) => {
        await txn.executeSql(
            'insert into perfrom values(?,?,?,?,?,?,?)',
            [perform.id, perform.purposeId, perform.goalId, perform.name, perform.cycle, perform.startDate, perform.endDate]
        )
    },

    selectByPurposeId : async (txn, purposeId) => {

        return (await txn.executeSql(
            'select id, purpose_id, goal_id, name, cycle, start_date, end_date from perform where purpose_id = ?',
            [purposeId],
        )).rows.map((row) => {
            return res.rows.map((row) => {
                return new Perform(row.id, row.purpose_id, row.goal_id, row.name, row.start_date, row.end_date);
            })
        })
    },

    selectByPurposeIdAndGoalId : async (txn, purposeId, goals) => {
        param = goals[0].id;
        for(let i = 1; i < goals.length; i++){
            param += ', ' + goals[i].id;
        }

        return (await txn.executeSql(
            'select id, purpose_id, goal_id, name, cycle, start_date, end_date from perform where purpose_id = ? and goal_id in (?)',
            [purposeId, param],
        )).rows.map((row) => {
            return res.rows.map((row) => {
                return new Perform(row.id, row.purpose_id, row.goal_id, row.name, row.start_date, row.end_date);
            })
        })
    }
}

export default PerfromRepository;