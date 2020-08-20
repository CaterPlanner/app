import State from '../State';
import PurposeRepository from '../repository/PurposeRepository';
import GoalRepository from '../repository/GoalRepository';
import BriefingRepository from '../repository/BriefingRepository';
import EasyDate from '../../util/EasyDate';
import SQLiteManager from '../../util/SQLiteManager';


export default class PurposeService{
    
 
    constructor(){
        this.db = SQLiteManager.getConnection()
    }

    create = (purpose, detailPlans) => {
        return new Promise((resolve, reject) => {
            this.db.transaction(
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
    }

    read = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const purpose = await PurposeRepository.selectById(this.db, id);
                const goals = GoalRepository.selectByPurposeId(this.db, id);
                const briefings = await BriefingRepository.selectByPurposeId(this.db, id);

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
    }

    findPurposeForBrifingList = () => {
        return new Promise(async (resolve, reject) => {
            try {
                let purposes = await PurposeRepository.selectByStatIsActive(this.db);

                let result = [];

                for(purpose of purposes){

                    const goals = (await GoalRepository.selectByPurposeId(this.db, purpose.id)).filter(
                        g => g.isNowBriefing()
                    );

                    if(goals.length == 0)
                        continue;

                    const briefings = await BriefingRepository.selectByPurposeId(this.db, purpose.id);
        
                    briefings.forEach((briefing) => {
                        briefing.purposeId = purpose.id;
                        goals[briefing.goalId].briefings.push(briefing);
                    })
                    
                    purpose.setDetailPlans(goals);
                    result.push(purpose);
                }

                resolve(result);
                
            } catch (e) {
                reject(e);
            }
        })
    }

    findPurposesForCard = () => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await PurposeRepository.selectByStatIsActive(this.db))
                
            } catch (e) {
                reject(e);
            }
        })
    }

    update = (id, purpose, detailPlans) => {
        return new Promise(async (resolve, reject) => {
            this.db.transaction(
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
    }

    delete = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                await PurposeRepository.deleteById(this.db, id);
            } catch (e) {
                reject(e);
            }
        })
    }

    startSchedule = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                await PurposeRepository.updateStatById(this.db, id, State.PROCEED);
            } catch (e) {
                reject(e);
            }
        })
    }

    stopSchedule = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                await PurposeRepository.updateStatById(this.db, id, State.PROCEED);
            } catch (e) {
                reject(e);
            }
        })
    }

    refresh = () => {
        return new Promise(async (resolve, reject) => {
            this.db.transaction(async (txn) => {
                purposes = await PurposeRepository.selectByStatIsActive(txn);
                today = EasyDate.now();

                for (purpose of purposes) {

                    const goals = GoalRepository.selectByPurposeId(this.db, purpose.id);
                    const briefings = await BriefingRepository.selectByPurposeId(this.db, purpose.id);
    

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

                    if (today.isAfter(purpose.endDate)) {
                        purpose.stat = detailPlans.achieve >= 80 ? State.SUCCEES : State.FAIL;
                        await PurposeRepository.updateStatById(purpose.id, purpose.stat);
                    }
                }

            }, reject);
        })
    }

    addBriefing = (id, goalId, performId) => {
        return new Promise(async (resolve, reject) => {
            
            this.db.transaction(async (txn) => {
                const purpose = await PurposeRepository.selectById(txn, id);

                await BriefingRepository.insert(txn, purposes.id, performId);

                const goals = GoalRepository.selectByPurposeId(this.db, purpose.id);
                const briefings = await BriefingRepository.selectByPurposeId(this.db, purpose.id);

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


