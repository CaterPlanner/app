import Briefing from "../model/Briefing";


const BriefingRepository = {

    selectByPurposeId : async (txn, purposeId) => {
        return (await txn.executeSql(
            'select purpose_id, goal_id, create_at, score from briefing where purpose_id = ?',
            [purposeId],
        )).rows.map((row) => {
            return res.rows.map((row) => {
                return new Briefing(row.purpose_id, row.goal_id, row.creat_at, row.score);
            })
        })
    },

    insert : async (txn, purposeId, goalId) => {
        await txn.executeSql(
            'insert into briefing values(?, ?, datetime(\'now\'), 0',
            [purposeId, goalId]
        );
    }

}

export default BriefingRepository;