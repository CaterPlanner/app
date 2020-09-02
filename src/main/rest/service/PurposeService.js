import State from '../State';
import PurposeRepository from '../repository/PurposeRepository';
import GoalRepository from '../repository/GoalRepository';
import BriefingRepository from '../repository/BriefingRepository';
import EasyDate from '../../util/EasyDate';
import SQLiteManager from '../../util/SQLiteManager';
import Goal from '../model/Goal';
import Purpose from '../model/Purpose';

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
            this.db.transaction(
                async (txn) => {     
                    PurposeRepository.insert(txn, purpose, 
                        async (txn, res) => {
                            if(detailPlans){
                                if(purpose.stat == 1)
                                    throw '대기 중인 목적은 세부목적을 지정할 수 없습니다'

                                for(goal of detailPlans){
                                    await (new Promise( (resolve) => {
                                        GoalRepository.insert(txn, goal, 
                                            () => resolve())
                                    }));
                                }
                            }
                        })

                    resolve();
                }
                , reject)
        });
    }

    initAll = (responsePurposes) => {
        return new Promise((resolve, reject) => {
            this.db.transaction(
                async (txn) => {
                    PurposeRepository.deleteAll(txn,
                        async (txn, res) => {
                            for (purpose of responsePurposes) {
                                await (new Promise((resolve) => {
                                    this.db.transaction(async (txn) => {
                                        PurposeRepository.insert(txn, new Purpose(purpose.id, purpose.name, purpose.description, purpose.photoUrl, purpose.disclosureScope, purpose.startDate, purpose.endDate, purpose.stat),
                                        async (txn, res) => {

                                            if (purpose.detailPlans) {
                                                if (purpose.stat == 1)
                                                    throw '대기 중인 목적은 세부목적을 지정할 수 없습니다'
                                                for (goal of purpose.detailPlans) {
                                                    await (new Promise((resolve) => {

                                                        GoalRepository.insert(txn, new Goal(goal.id, goal.purposeId, goal.name, goal.description, goal.startDate, goal.endDate, goal.color, goal.cycle, goal.briefingCount, goal.lastBriefingDate, goal.stat),
                                                            () => { console.log('sdf'); resolve(); }
                                                        );
                                                    }))
                                                }
                                            }
                                            resolve();
                                        }, reject)
                                    })
            
                                }))
                            }


                            resolve();
                        });
                },
                reject)
        })
    }

    read = (id) => {
        return new Promise((resolve, reject) => {
            try {
                PurposeRepository.selectById(this.db, id, (purpose) => {
                    GoalRepository.selectByPurposeId(this.db, id, (goals) => {
                        purpose.setDetailPlans(goals);
                        resolve(purpose);
                    })
                })
            } catch (e) {
                reject(e);
            }
        });
    }

    findPurposeForBrifingList = () => {
        return new Promise((resolve, reject) => {
            try {
                PurposeRepository.selectByStatIsActive(this.db, async (purposes) => {
                    
                    const activePurposeIdList = purposes.map((purpose) => purpose.id);


                    const goalList = await (new Promise((resolve) => {
                        GoalRepository.selectByStatIsActiveInPurposeId(this.db, activePurposeIdList, (res) => resolve(res));
                    }));

                    purposes.forEach((purpose) => {
                        purpose.detailPlans = goalList.filter(g => g.purposeId == purpose.id && g.isNowBriefing);
                    })
                
                    resolve(purposes);
                    
                });
            } catch (e) {
                console.log('hello');
                reject(e);
            }
        })
    }

    findPurposesForCard = () => {
        return new Promise((resolve, reject) => {
            try {
                PurposeRepository.selectByStatIsActive(this.db, (res) => {
                    resolve(res);
                })

            } catch (e) {
                reject(e);
            }
        })
    }

    modify = (id, purpose) => {
        return new Promise(async (resolve, reject) => {
            this.db.transaction(
                async (txn) => {
                    
                }
            )
        });
    }

    groundModify = (id, purpose) => {
        return new Promise(async (resolve, reject) => {
            this.db.transaction(
                async (txn) => {
                    PurposeRepository.updatePurposeDate(txn, purpose, () => {
                        if(purpose.detailPlnas){
                            GoalRepository.deleteByPurposeId(txn, id, async () => {
                                for(goal of detailPlans){
                                    await (new Promise((resolve) => {
                                        goal.purposeId = id;
                                        GoalRepository.insert(txn, goal, () => resolve())
                                    }));
                                }
                                resolve();
                            })
                        }
                    });
                }
                , reject)
        })
    }

    delete = (id) => {
        return new Promise((resolve, reject) => {
            try {
                PurposeRepository.deleteById(this.db, id, () => {
                    resolve();
                });
            } catch (e) {
                reject(e);
            }
        })
    }

    startSchedule = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                PurposeRepository.updateStatById(this.db, id, State.PROCEED, () => resolve());
            } catch (e) {
                reject(e);
            }
        })
    }

    stopSchedule = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                PurposeRepository.updateStatById(this.db, id, State.PROCEED, () => resolve());
            } catch (e) {
                reject(e);
            }
        })
    }

    refresh = () => {
        return new Promise((resolve, reject) => {
            this.db.transaction((txn) => {
                const today = EasyDate.now();
                PurposeRepository.selectByStatIsActive(txn, async (purposes) => {

                    for(purpose of purposes){
                        await (new Promise((resolve) => {
                            GoalRepository.selectByPurposeId(txn, purposes.id, async (goals) => {
                                for(goal of goals){
                                    if (State.isPass(goal.stat))
                                        continue;
        
                                    if (today.isAfter(goal.endDate)) {
                                        goal.stat = goal.achieve >= 80 ? State.SUCCEES : State.FAIL;
                                    } else if (goal.stat == State.WAIT && goal.isActive) {
                                        goal.stat = State.PROCEED;
                                    }

                                    await (new Promise((resolve) => {
                                        GoalRepository.updateStatByKey(txn, purpose.id, goal.id, goal.stat, () => resolve() )
                                    }))

                                }
                                resolve();
                            })
                        }))

                        if (today.isAfter(purpose.endDate)) {
                            purpose.stat = detailPlans.achieve >= 80 ? State.SUCCEES : State.FAIL;
                            await (new Promise((resolve) => {
                                PurposeRepository.updateStatById(purpose.id, purpose.stat, () => resolve());
                            }))
                        }

                        
                    }

                    resolve();

                });
            }, reject);
        })
    }

    //수정 필요
    addBriefing = (id, goalId) => {
        return new Promise((resolve, reject) => {

            this.db.transaction((txn) => {

                PurposeRepository.selectById(txn, id, (purpose) => {
                    BriefingRepository.insert(txn, purpose.id, goalId, () => {
                        GoalRepository.selectByPurposeId(txn, purpose.id, async (goals) => {
                    
                            purpose.setDetailPlans(goals);
                            const goal = purpose.detailPlans[goalId];

                            goal.lastBriefingDate = EasyDate.now();
                            goal.briefingCount = goal.briefingCount + 1;

                            if (goal.achieve == 100 && goal.stat == State.PROCEED) {
                                goal.stat = State.SUCCEES;
                            }

                            await (new Promise((resolve) => {
                                GoalRepository.updateByKey(txn, purpose.id, goal.id, goal, () => resolve());
                            }));

                            if (purpose.achieve == 100 && purpose.stat == State.PROCEED) {
                                purpose.stat = State.SUCCEES;
                                await (new Promise((resolve) => {
                                    PurposeRepository.updateStatByKey(txn, purpose.id, purpose.stat, () => resolve());
                                }));
                            }


                            resolve();

                        })
                    });
                })
            }, reject);
        })
    }

}


