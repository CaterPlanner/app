import Goal from '../model/Goal'

const GoalRepository = {
    insert : async (txn, goal) => {
        await txn.executeSql(
            'insert into goal values(?,?,?,?,?,?,?)',
            [goal.id, goal.purposeId, goal.name, goal.startDate, goal.endDate, goal.color, goal.stat]
        )
    },
    
    selectByHeaderIdAndStat = (txn, purposeId, stat) => {
        return (await txn.executeSql(
            'select id, purpose_id, name, start_date, end_date, color, stat from goal where purpose_id = ? and stat = ?',
            [purposeId, stat]
        )).rows.map((row) => {
            return new Goal(row.id, row.purposeId, row.name, row.start_date, row.end_date, row.color, row.stat);
        })
    },

    selectByPurposeId = async (txn, purposeId) => {
        return (await txn.executeSql(
            'select id, purpose_id, name, start_date, end_date, color, stat from goal where purpose_id = ?',
            [purposeId]
        )).rows.map((row) => {
            return new Goal(row.id, row.purposeId, row.name, row.start_date, row.end_date, row.color, row.stat);
        })
    },

    deleteByPurposeId = async (txn, purposeId) => {
        await txn.executeSql(
            'delete from goal where purpose_id = ?',
            [purposeId]
        )
    },

    updateStatByKey = async (txn, purposeId, id, stat) => {
        await txn.executeSql(
            'update goal set stat = ? where purpose_id = ? and id = ?',
            [stat, purposeId, id]
        );
    }
}

export default GoalRepository;