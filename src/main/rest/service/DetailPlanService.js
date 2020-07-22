import connection from '../../sqlite/SQLiteManager';
import { inject } from 'mobx-react';
import { action } from 'mobx';


@inject(stores => ({
    sqliteManager: stores.sqliteManager,
    detailPlanRespository : stores.repository.detailPlanRespository
}))
class DetailPlanService {
    
    constructor(props){
        super(props);

        //DI
        this.connection = this.props.sqliteManager.connection;
        this.detailPlanRespository - this.props.detailPlanRespository;
    }

    @action
    read = (headerId, key) => {
        this.connection.transaction((tx) => {

        });
    } 

    @action
    bulkCreate = (headerId, detailPlans) => {
        this.connection.transaction((tx) => {
            detailPlans.forEach((detailPlan) => {
                this.detailPlanRespository.insert(headerId, detailPlan);
            })
        });
    }


}