import Briefing from "../model/Briefing";

const BriefingRepository = {

    selectByPurposeId : async (txn, purposeId) => {
        return (await txn.executeSql(
            'select header_id, perform_id, create_at, score from briefing where header_id = ?',
            [purposeId],
        )).rows.map((row) => {
            return res.rows.map((row) => {
                return new Briefing(row.header_id, row.perform_id, row.creat_at, row.score);
            })
        })
    },

    insert : async (txn, headerId, performId) => {
        await txn.executeSql(
            'insert into briefing values(?, ?, datetime(\'now\'), 0',
            [headerId, performId]
        );
    }

}

export default BriefingRepository;