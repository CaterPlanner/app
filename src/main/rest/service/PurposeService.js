import State from '../State';
import PurposeRepository from '../repository/PurposeRepository';
import GoalRepository from '../repository/GoalRepository';
import BriefingRepository from '../repository/BriefingRepository';
import EasyDate from '../../util/EasyDate';
import SQLiteManager from '../../util/SQLiteManager';

const db = SQLiteManager.getConnection();

const PurposeService = {

    create: (purpose, detailPlans) => {
        return new Promise((resolve, reject) => {
            db.transaction(
                async (txn) => {
                    purpose.stat = State.WAIT;
                    let id = await PurposeRepository.insert(txn, purpose);
                    if(detailPlans){
                        for(goal of detailPlans){
                            goal.purposeId = id;
                            await GoalRepository.insert(txn, goal);
                        }
                    }
                    resolve(id);
                }
                , reject)
        });
    },

    read: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const purpose = await PurposeRepository.selectById(db, id);
                const goals = GoalRepository.selectByPurposeId(db, id);
                const briefings = await BriefingRepository.selectByPurposeId(db, id);

                briefings.forEach((briefing) => {
                    briefing.purposeId = purpose.id;
                    goals[briefing.goalId].briefings.push(briefing);
                })

                purpose.setDetailPlans(goals);
                resolve(purpose);
            } catch (e) {
                reject(e);
            }
        });
    },

    readAllActive: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let purposes = await PurposeRepository.selectByStatIsActive(db);
                resolve(
                    purposes.map((purpose) => {

                        const goals = GoalRepository.selectByPurposeId(db, purpose.id);
                        const briefings = await BriefingRepository.selectByPurposeId(db, purpose.id);
        
                        briefings.forEach((briefing) => {
                            briefing.purposeId = purpose.id;
                            goals[briefing.goalId].briefings.push(briefing);
                        })      

                        purpose.setDetailPlans(goals);
                    })
                )
            } catch (e) {
                reject(e);
            }
        })
    },

    update: (id, purpose, detailPlans) => {
        return new Promise(async (resolve, reject) => {
            db.transaction(
                async (txn) => {
                    await PurposeRepository.updatePurposeDate(txn, purpose);

                    if (detailPlans) {
                        await GoalRepository.deleteByPurposeId(txn, id);

                        for(goal of detailPlans){
                            goal.purposeId = id;
                            await GoalRepository.insert(txn, goal);
                        }
                    }
                }
                , reject)
        })
    },

    delete: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                await PurposeRepository.deleteById(db, id);
            } catch (e) {
                reject(e);
            }
        })
    },

    startSchedule: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                await PurposeRepository.updateStatById(db, id, State.PROCEED);
            } catch (e) {
                reject(e);
            }
        })
    },

    stopSchedule: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                await PurposeRepository.updateStatById(db, id, State.PROCEED);
            } catch (e) {
                reject(e);
            }
        })
    },

    refresh: () => {
        return new Promise(async (resolve, reject) => {
            db.transaction(async (txn) => {
                purposes = await PurposeRepository.selectByStatIsActive(txn);
                today = EasyDate.now();

                for (purpose of purposes) {

                    const goals = GoalRepository.selectByPurposeId(db, purpose.id);
                    const briefings = await BriefingRepository.selectByPurposeId(db, purpose.id);
    

                    briefings.forEach((briefing) => {
                        briefing.purposeId = purpose.id;
                        goals[briefing.goalId].briefings.push(briefing);
                    })

                    for (goal of goals) {
                        if (State.isPass(goal.stat))
                            continue;

                        if (today.isAfter(goal.endDate)) {
                            goal.stat = goal.achieve >= 80 ? State.SUCCEES : State.FAIL;
                        } else if (goal.stat == State.WAIT && goal.isActive) {
                            goal.stat = State.PROCEED;
                        }

                        await GoalRepository.updateStatByKey(txn, purpose.id, goal.id, goal.stat);
                    }

                    if (today.isAfter(purpose.decimalDay)) {
                        purpose.stat = detailPlans.achieve >= 80 ? State.SUCCEES : State.FAIL;
                        await PurposeRepository.updateStatById(purpose.id, purpose.stat);
                    }
                }

            }, reject);
        })
    },
    addBriefing: (id, goalId, performId) => {
        return new Promise(async (resolve, reject) => {
            
            db.transaction(async (txn) => {
                const purpose = await PurposeRepository.selectById(txn, id);

                await BriefingRepository.insert(txn, purposes.id, performId);

                const goals = GoalRepository.selectByPurposeId(db, purpose.id);
                const briefings = await BriefingRepository.selectByPurposeId(db, purpose.id);

                briefings.forEach((briefing) => {
                    briefing.purposeId = purpose.id;
                    goals[briefing.goalId].briefings.push(briefing);
                })


                purpose.setDetailPlans(goals);
                
                const goal = purpose.detailPlans[goalId];

                if(goal.achieve == 100 && goal.stat == State.PROCEED){
                    goal.stat = State.SUCCEES;
                    await GoalRepository.updateStatByKey(txn, purposes.id, goal.id, State.SUCCEES);
                }
                if(purposes.achieve == 100 && purposes.stat == State.PROCEED){
                    purposes.stat = State.SUCCEES;
                    await PurposeRepository.updateStatByKey(txn, purposes.id, purposes.stat);
                }

            }, reject);
        })
    }



}

export default PurposeService;