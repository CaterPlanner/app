import Goal from '../model/Goal'

const GoalRepository = {


    insertAll : (txn, goals) => {
        let query = 'insert into goal(id, purpose_id, name, description, start_date, end_date, color, cycle, briefing_count, last_briefing_date) values';
        goals.forEach((goal, index) => {
            query += `(${goal.id} , ${goal.purposeId}, '${goal.name}', '${goal.description}', '${goal.startDate.toString()}', '${goal.endDate.toString()}', '${goal.color}', '${goal.cycle}', ${goal.briefingCount}, ${goal.lastBriefingDate ? '\''+goal.lastBriefingDate.toString()+'\'' : null} )`
            query += index + 1 != goals.length ? ', ' : '';
        });

   
        return new Promise((resolve, reject) => {
            txn.executeSql(
                query,
                [],
                resolve,
                reject
            );
        })

    },

    insert : (txn, goal) => {
        return new Promise((resolve, reject) => {
            txn.executeSql(
                'insert into goal(id, purpose_id, name, description, start_date, end_date, color, cycle, briefing_count, last_briefing_date) values(?,?,?,?,?,?,?,?,?,?)',
                [goal.id, goal.purposeId, goal.name, goal.description, goal.startDate.toString(), goal.endDate.toString(), goal.color, goal.cycle, goal.briefingCount, goal.lastBriefingDate ? goal.lastBriefingDate.toString() : null],
                resolve,
                reject
            );
        })
    },
    
    selectByHeaderIdAndStat : (txn, purposeId, stat) => {
        return new Promise((resolve, reject) => {
            txn.executeSql(
                'select id, purpose_id, name, description, start_date, end_date, color, cycle, briefing_count, last_briefing_date from goal where purpose_id = ?',
                [purposeId, stat],
                (res) => {
                    let data = [];
                    for(let i =0; i < res.rows.length; i++){
                        const row = res.rows.item(i);
                        data.push(new Goal(row.id, row.purpose_id, row.name, row.description, row.start_date, row.end_date, row.color, row.cycle, row.briefing_count, row.last_briefing_date))
                    }
                    resolve(data);
                },
                reject)
        })
    },

    selectByPurposeId : (txn, purposeId) => {
        return new Promise((resolve, reject) => {
            txn.executeSql(
                'select id, purpose_id, name, description, start_date, end_date, color, cycle, briefing_count, last_briefing_date from goal where purpose_id = ?',
                [purposeId],
                (res) => {
                    let data = [];
                    for(let i =0; i < res.rows.length; i++){
                        const row = res.rows.item(i);
                        data.push(new Goal(row.id, row.purpose_id, row.name, row.description, row.start_date, row.end_date, row.color, row.cycle, row.briefing_count, row.last_briefing_date))
                    }
                    resolve(data);
                },
                reject
            );
        })
    },

    selectInPurposeId : (txn, purposeIdList) => {
        let ext = purposeIdList[0];
        for(let i = 1; i< purposeIdList.length; i++){
            ext += "," + purposeIdList[i];
        }
        return new Promise((resolve, reject) => {
            txn.executeSql(
                `select id, purpose_id, name, description, start_date, end_date, color, cycle, briefing_count, last_briefing_date from goal where purpose_id in (${ext})`,
                [],
                (res) => {
                    let data = [];
                    for(let i =0; i < res.rows.length; i++){
                        const row = res.rows.item(i);
                        data.push(new Goal(row.id, row.purpose_id, row.name, row.description, row.start_date, row.end_date, row.color, row.cycle, row.briefing_count, row.last_briefing_date))
                    }
                    resolve(data);
                },
                reject
            );
        })   
    },

    deleteByPurposeId : (txn, purposeId) => {
        return new Promise((resolve, reject) => {
            txn.executeSql(
                'delete from goal where purpose_id = ?',
                [purposeId],
                resolve,
                reject
            )
        })
    },

    updateByKey : (txn, purposeId, id, goal) => {
        console.log(goal);
        return new Promise((resolve, reject) => {
            txn.executeSql(
                'update goal set stat = ?, briefing_count = ?, last_briefing_date = ? where purpose_id = ? and id = ?',
                [goal.stat, goal.briefingCount, goal.lastBriefingDate ? goal.lastBriefingDate.toString() : null, purposeId, id],
                resolve,
                reject
            );
        })
    }

}

export default GoalRepository;