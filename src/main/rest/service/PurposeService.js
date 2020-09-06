import PurposeRepository from '../repository/PurposeRepository';
import GoalRepository from '../repository/GoalRepository';
import BriefingRepository from '../repository/BriefingRepository';
import EasyDate from '../../util/EasyDate';
import SQLiteManager from '../../util/SQLiteManager';
import Goal from '../model/Goal';
import Purpose from '../model/Purpose';
import PurposeWriteBoard from '../../component/page/screen/purposeWrite/PurposeWriteBoard';
import GlobalConfig from '../../GlobalConfig';
import Request from '../../util/Request';

export default class PurposeService {

    static instance = null;

    static getInstance = () => {
        if (!this.instance)
            this.instance = new PurposeService();
        return this.instance;
    }

    constructor() {
        this.db = SQLiteManager.getConnection()
    }


    create = (purpose, detailPlans) => {
        return new Promise((resolve, reject) => {
            SQLiteManager.transaction(this.db, async (resolve, reject) => {
                try{
                    await PurposeRepository.insert(this.db, purpose);
                
                    if(detailPlans){
    
                        for(goal of detailPlans){
                            await GoalRepository.insert(this.db, goal);
                        }
                    }
    
                    resolve();
                }catch(e){
                    console.log(e);
                    reject(e);
                }

            })
            .then((data) => resolve(data))
            .catch(e => reject(e));
        });
    }

    initAll = (responsePurposes) => {
        return new Promise((resolve, reject) => {
            SQLiteManager.transaction(this.db, async (resolve, reject) => {   
                try{
                    await PurposeRepository.deleteAll(this.db);
                    console.log('ehllo');
                    for(purpose of responsePurposes){
                        await PurposeRepository.insert(this.db, new Purpose(purpose.id, purpose.name, purpose.description, purpose.photoUrl, purpose.disclosureScope, purpose.startDate, purpose.endDate, purpose.stat))

    
                        if(purpose.detailPlans.length == 0)
                            continue;
    
                       await GoalRepository.insertAll(this.db, purpose.detailPlans.map((goal) => (
                            new Goal(goal.id, goal.purposeId, goal.name, goal.description, goal.startDate, goal.endDate, goal.color, goal.cycle, goal.briefingCount, goal.lastBriefingDate)
                        )));
    
                    }
                }catch(e){
                    reject(e);
                }
                resolve();
            })
            .then(data => resolve(data))
            .catch(e => reject(e))
        })
    }

    

    read = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const purpose = await PurposeRepository.selectById(this.db, id);
                const goals = await GoalRepository.selectByPurposeId(this.db, id);

                purpose.setDetailPlans(goals);
                resolve(purpose);
            } catch (e) {
                reject(e);
            }
        });
    }

    findActivePurposes = () => {
        return new Promise(async (resolve, reject) => {
            try {
                let purposes = await PurposeRepository.selectByStatIsActive(this.db);

                console.log(purposes);

                if(purposes.length == 0){
                    resolve();
                    return;
                }

                let activePurposes = purposes.filter(p => !p.isProcceedEnd);

                if(activePurposes.length == 0){
                    resolve();
                    return;
                }

                purposes = purposes.filter(p => !p.isProcceedEnd);

                const activePurposeIdList = purposes.map((purpose) => purpose.id);

                const goalList = await GoalRepository.selectInPurposeId(this.db, activePurposeIdList);


                purposes.forEach((purpose) => {
                    purpose.detailPlans = goalList.filter(g => g.purposeId == purpose.id);
                })
            
                resolve(purposes);
            } catch (e) {
                console.log(e);
                reject(e);
            }
        })
    }

    findPurposesForCard = () => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(
                    await PurposeRepository.selectAll(this.db)
                );
            } catch (e) {
                reject(e);
            }
        })
    }

    modify = (id, purpose) => {
        return new Promise(async (resolve, reject) => {
            try{
                await PurposeRepository.updatePurposeDate(this.db, id, purpose);
                resolve();
            }catch(e){
                reject(e);
            }
        });
    }

    groundModify = (id, purpose) => {
        return new Promise(async (resolve, reject) => {
            SQLiteManager.transaction(this.db, async (resolve, reject) => {
                try{
                    await PurposeRepository.updatePurposeDate(this.db, id, purpose);
                    await GoalRepository.deleteByPurposeId(this.db, id);
                    await GoalRepository.insertAll(this.db, purpose.detailPlans);
                    resolve();
                }catch(e){
                    reject(e);
                }
            })
            .then(() => resolve())
            .catch(e => reject(e))
        })
    }

    delete = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                await PurposeRepository.deleteById(this.db, id);
                resolve();
            } catch (e) {
                reject(e);
            }
        })
    }

    startSchedule = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                await PurposeRepository.updateStatById(this.db, id, State.PROCEED);
                resolve();
            } catch (e) {
                reject(e);
            }
        })
    }

    stopSchedule = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                await PurposeRepository.updateStatById(this.db, id, State.PROCEED);
                resolve();

            } catch (e) {
                reject(e);
            }
        })
    }

    refresh = () => {
        return new Promise((resolve, reject) => {
            SQLiteManager.transaction(this.db, async (resolve, reject) => {
                try{
                    const today = EasyDate.now();
                    const purposes = await PurposeRepository.selectByStatIsActive(this.db);
    
                    for(purpose of purposes){
                        if(purposes.isProcceedEnd)
                            continue;

                        const goals = await GoalRepository.selectByPurposeId(this.db, purpose.id);
                        // for(goal of goals){


                        //     if (State.isPass(goal.stat))
                        //         continue;
                        //     if (today.isBefore(goal.endDate)) {
                        //         goal.stat = goal.achieve >= 80 ? State.SUCCEES : State.FAIL;
                        //     } else if (goal.stat == State.WAIT && goal.isActive) {
                        //         goal.stat = State.PROCEED;
                        //     }

                        //     await GoalRepository.updateByKey(this.db, purpose.id, goal.id, goal);
                        // }

                        purpose.setDetailPlans(goals);

                        // if (today.isBefore(purpose.endDate)) {
                        //     purpose.stat = State.END;
                        //     await PurposeRepository.updateStatById(this.db, purpose.id, purpose.stat);
                        // }
                    }

                    resolve(purposes);

                }catch(e){
                    console.log(e);
                    reject(e);
                }
            })
            .then((purposes) => resolve(purposes))
            .catch(e => reject(e))
        })
    }
    addBriefing = (purpose, clearGoalIdList, token) => {
        return new Promise((resolve, reject) => {
            SQLiteManager.transaction(this.db, async (resolve, reject) => {
                try{
                    let checkedGoals = [];
                    for(goalId of clearGoalIdList){


                        const goal = purpose.detailPlans[goalId];
                        await BriefingRepository.insert(this.db, purpose.id, goal.id);
                        

                        goal.lastBriefingDate = EasyDate.now();
                        goal.briefingCount = goal.briefingCount + 1;
    
                        // if (goal.achieve == 100 && goal.stat == State.PROCEED) {
                        //     goal.stat = State.SUCCEES;
                        // }
    
                        // await GoalRepository.updateByKey(this.db, purpose.id, goal.id, goal);
    
                        // if (purpose.achieve == 100 && purpose.stat == State.PROCEED) {
                        //     purpose.stat = State.END;
                        //     await PurposeRepository.updateStatById(this.db, purpose.id, purpose.stat);
                        // }

                        checkedGoals.push(purpose.detailPlans[goalId])
                    }

                    await Request.patch(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${purpose.id}/update`, JSON.stringify({
                        achieve: purpose.achieve,
                        stat : purpose.stat,
                        modifiedGoalAchieve: checkedGoals.map((goal) => ({
                            id: goal.id,
                            briefingCount: goal.briefingCount,
                            lastBriefingDate: goal.lastBriefingDate.toString(),
                            stat: goal.stat
                        }))
                    })).auth(token).submit();

                    resolve(purpose);    

                }catch(e){
                    reject(e);
                }

            })
            .then((data) => resolve(data))
            .catch(e => reject(e));
        })
    }


}


