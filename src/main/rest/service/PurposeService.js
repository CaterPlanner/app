import connection from '../../sqlite/SQLiteManager';
import { inject } from 'mobx-react';
import { action } from 'mobx';


@inject(stores => ({
    sqliteManager: stores.sqliteManager,
    purposeRepository : stores.repository.purposeRepository,
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
            let detailPlanHeaderId = this.detailPlanService.register(purpose.detailPlans);

            if(detailPlanHeaderId)
                throw 'failed register the detailPlans';

            this.purposeRepository.insert(purpose, null, null, detailPlanHeaderId)
        });
    }

    @action
    read = (id) => {
        let purpose;
        this.connection.transaction((tx) => {
            purpose = this.purposeRepository.selectById(id);
            let detailPlans = this.detailPlanService.findAllByHeaderId(purpose.headerId);
            
            purpose.setDetailPlans(detailPlans);

        });
        return purpose;
    }

    @action
    shortRead = (id) => {
        return this.purposeRepository.selectById(id);
    }

    @action
    update = (id, purpose) => {
        this.connection.transaction((tx) => {
            this.purposeRepository.updatePurposeData(id, purpose);
        });

    }


}