import Goal from '../model/Goal'

const GoalRepository = {
    insert : (txn, goal) => {
        return new Promise((resolve, reject) => {
            txn.executeSql(
                'insert into goal(id, purpose_id, name, start_date, end_date, color, stat) values(?,?,?,?,?,?,?,?)',
                [goal.id, goal.purposeId, goal.name, goal.startDate, goal.endDate, goal.color, goal.cycle, goal.stat],
                (tx, res) => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            )
        })
    },
    
    selectByHeaderIdAndStat : (txn, purposeId, stat) => {
        return new Promise((resolve, reject) => {
            txn.executeSql(
                'select id, purpose_id, name, start_date, end_date, color, stat from goal where purpose_id = ? and stat = ?',
                [purposeId, stat],
                (tx, res) => {
                    let data = [];
                    for(let i =0; i < res.rows.length; i++){
                        const row = res.rows.item(i);
                        data.push(new Goal(row.id, row.purposeId, row.name, row.start_date, row.end_date, row.color, row.stat))
                    }
                    resolve(data);
                },
                (error) => {reject(error)}
            )
        })
    },

    selectByPurposeId : (txn, purposeId) => {
        return new Promise((resolve, reject) => {
            txn.executeSql(
                'select id, purpose_id, name, start_date, end_date, color, stat from goal where purpose_id = ?',
                [purposeId],
                (res) => {
                    let data = [];
                    for(let i =0; i < res.rows.length; i++){
                        const row = res.rows.item(i);
                        data.push(new Goal(row.id, row.purposeId, row.name, row.start_date, row.end_date, row.color, row.stat))
                    }
                    resolve(data);
                },
                (error) => {
                    reject(error);
                }
            );
        })
    },

    deleteByPurposeId : (txn, purposeId) => {
        return new Promise((resolve, reject) => {
            txn.executeSql(
                'delete from goal where purpose_id = ?',
                [purposeId],
                (tx, res) => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            )
        })
    },

    updateStatByKey : (txn, purposeId, id, stat) => {
        return new Promise((resolve, reject) => {
            txn.executeSql(
                'update goal set stat = ? where purpose_id = ? and id = ?',
                [stat, purposeId, id],
                (tx, res) => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            );
        })
    }
}

export default GoalRepository;