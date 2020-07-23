import DetailPlanTreeStore from './DetailPlanTreeStore'
import SQLiteManager from '../../sqlite/SQLiteManager';

import DetailPlanService from '../../rest/service/DetailPlansService';
import PurposeService from '../../rest/service/PurposeService';

import BriefingRepository from '../../rest/repository/BriefingRepository';
import DetailPlanHeaderRepository from '../../rest/repository/DetailPlanHeaderRepository';
import DetailPlanRepository from '../../rest/repository/DetailPlanRepository';
import PurposeRepository from '../../rest/repository/PurposeRepository';

export default class RootStore {
    constructor(){
        this.detailPlanTreeStore = new DetailPlanTreeStore(this);
        this.sqliteManager = new SQLiteManager(this);

        //rest
        this.service = {
            detailPlanService : new DetailPlanService(this),
            purposeService : new PurposeService(this)
        };
        this.repository = {
            briefingRepository : new BriefingRepository(this),
            detailPlanHeaderRepository : new DetailPlanHeaderRepository(this),
            detailPlanRepository : new DetailPlanRepository(this),
            purposeRepository : new PurposeRepository(this)
        }
    }
}