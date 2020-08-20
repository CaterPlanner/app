import Briefing from "../model/Briefing";


const BriefingRepository = {

    selectByPurposeId : (txn, purposeId) => {
        return new Promise((resolve, reject) => {
            txn.executeSql(
                'select purpose_id, goal_id, create_at, score from briefing where purpose_id = ?',
                [purposeId],
                (tx, res) => {
                    let data = [];
                    for(let i =0; i < res.rows.length; i++){
                        const row = res.rows.item(i);
                        data.push(new Briefing(row.purpose_id, row.goal_id, row.create_date, row.score))
                    }

                    resolve(data);
                },
                (error) => {
                    reject(error);
                }
            )
        })
    },

    insert : (txn, purposeId, goalId) => {
        return new Promise((resolve, reject) => {
            txn.executeSql(
                'insert into briefing(purpose_id, goal_id, create_at, score) values(?, ?, datetime(\'now\'), 0',
                [purposeId, goalId],
                (tx, res) => {
                    resolve();
                },
                (error) => {
                    reject(error);
                }
            )
        })
    }

}

export default BriefingRepository;