import connection from '../../sqlite/SQLiteManager';
import { inject } from 'mobx-react';
import { action } from 'mobx';


@inject(stores => ({
    sqliteManager: stores.sqliteManager,
    purposeRepository : stores.repository.purposeRepository,
    detailPlanHeaderRepository : stores.repository.detailPlanHeaderRepository,
    detailPlanService : stores.service.detailPlanService
}))
class PurposeService {
    
    constructor(props){
        super(props);

        //DI
        this.connection = this.props.sqliteManager.connection;
        this.purposeRepository = this.props.purposeRepository;
        this.detailPlanHeaderRepository = this.props.detailPlanHeaderRepository;
        this.detailPlanService = this.props.detailPlanService;
    }


    @action
    create = (purpose) => {
        this.connection.transaction((tx) => {

            //1. detailPlanHeaderId 생성
            let detailPlanHeaderId = this.detailPlanHeaderRepository.insert();
            
            //2. detailPlans bulk insert
            this.detailPlanService.bulkCreate(detailPlanHeaderId, purpose.detailPlans);

            //3. purpose insert
            this.purposeRepository.insert(purpose, null, null, detailPlanHeaderId)

        });
    }

    @action
    read = (id) => {
        this.connection.transaction((tx) => {
            
        });
    }

    @action
    update = (id, purpose) => {
        this.connection.transaction((tx) => {
            this.purposeRepository.updatePurposeData(id, purpose);
        });

    }


}