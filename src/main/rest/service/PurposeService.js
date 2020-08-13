const { defineBoundAction } = require("mobx/lib/internal");

import State from '../State';
import PurposeRepository from '../repository/PurposeRepository';
import PerfromRepository from '../repository/PerformRepository';
import GoalRepository from '../repository/GoalRepository';
import DetailPlans from '../model/DetailPlans';
import BriefingRepository from '../repository/BriefingRepository';
import EasyDate from '../../util/EasyDate';


const PurposeService = {

    create: (purpose, detailPlans) => {
        return new Promise((resolve, reject) => {
            db.transaction(
                async (txn) => {
                    purpose.stat = State.WAIT;
                    let id = await PurposeRepository.insert(txn, purpose);
                    if (detailPlans) {
                        await detailPlans.foreach(async (goal) => {
                            await goal.performs.foreach(async (perform) => {
                                perform.purposeId = id;
                                perform.goalId = goal.id;
                                await PerfromRepository.insert(txn, perform);
                            });
                            goal.purposeId = id;
                            await GoalRepository.insert(txn, goal);
                        })
                    }
                    resolve(id);
                }
                , reject)
        });
    },

    read: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let purpose = await PurposeRepository.selectById(db, id);
                purpose.setDetailPlans(
                    DetailPlans.valueOf(
                        await GoalRepository.selectByPurposeId(db, id),
                        await PerfromRepository.selectByPurposeId(db, id),
                        await BriefingRepository.selectByPurposeId(db, id)
                    )
                );
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
                        purpose.setDetailPlans(
                            DetailPlans.valueOf(
                                await GoalRepository.selectByPurposeId(db, id),
                                await PerfromRepository.selectByPurposeId(db, id),
                                await BriefingRepository.selectByPurposeId(db, id)
                            )
                        );
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
                        await detailPlans.foreach(async (goal) => {
                            goal.performs.foreach((perform) => {
                                perform.purposeId = id;
                                perform.goalId = goal.id;
                                await PerfromRepository.insert(txn, perform);
                            });
                            goal.purposeId = id;
                            await GoalRepository.insert(txn, goal);
                        });
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

                for (purpose in purposes) {
                    detailPlans = DetailPlans.valueOf(
                        await GoalRepository.selectByPurposeId(txn, purposes.id),
                        await PerfromRepository.selectByPurposeId(txn, purposes.id),
                        await BriefingRepository.selectByPurposeId(txn, purposes.id)
                    );

                    for (goal in detailPlans.entryData) {
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
                const detailPlans = DetailPlans.valueOf(
                    await GoalRepository.selectByPurposeId(txn, id),
                    await PerfromRepository.selectByPurposeId(txn, id),
                    await BriefingRepository.selectByPurposeId(txn, id)
                )
                purpose.setDetailPlans(detailPlans);
                
                const goal = detailPlans.entryData[goalId];

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