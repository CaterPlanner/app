import DetailPlanStore from './DetailPlanStore'
import SQLiteManager from '../../sqlite/SQLiteManager';

export default class RootStore {
    constructor(){
        this.detailPlanStore = new DetailPlanStore(this);
        this.sqliteManager = new SQLiteManager(this);
    }
}