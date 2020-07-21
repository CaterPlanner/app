import DetailPlanTreeStore from './DetailPlanTreeStore'
import SQLiteManager from '../../sqlite/SQLiteManager';

export default class RootStore {
    constructor(){
        this.detailPlanTreeStore = new DetailPlanTreeStore(this);
        this.sqliteManager = new SQLiteManager(this);
    }
}