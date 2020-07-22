import connection from '../../sqlite/SQLiteManager';
import { inject } from 'mobx-react';
import { action } from 'mobx';

//DetailPlanHeader 부분까지 쓰이게 하고 싶음
@inject(stores => ({
    sqliteManager: stores.sqliteManager,
    detailPlanRespository : stores.repository.detailPlanRespository,
    detailPlanHeaderRepository : stores.repository.detailPlanHeaderRepository
}))
class DetailPlanService {
    
    constructor(props){
        super(props);

        //DI
        this.connection = this.props.sqliteManager.connection;
        this.detailPlanRespository = this.props.detailPlanRespository;
        this.detailPlanHeaderRepository = stores.repository.detailPlanHeaderRepository;
    }

    @action
    read = (headerId, key) => {  
        this.connection.transaction((tx) => {

        });
    } 

    @action
    findAllByHeaderId = (detailPlanHeaderId) => {
        let detailPlans;
        this.connection.transaction((tx) => {
            detailPlans = this.detailPlanRespository.selectByHeaderIdWithBriefingCount(detailPlanHeaderId);
        });
        return detailPlans;
    }

    @action
    register = (detailPlans, author, baseId) => {
        let detailPlanHeaderId;
        this.connection.transaction((tx) => {
            
            detailPlanHeaderId = this.detailPlanHeaderRepository.insert(author, baseId);

            detailPlans.forEach((detailPlan) => {
                this.detailPlanRespository.insert(detailPlanHeaderId, detailPlan);
            })
        });
        return detailPlanHeaderId;
    }


}