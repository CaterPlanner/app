import { inject } from 'mobx-react';
import { action } from 'mobx';


@inject(stores => ({
    sqliteManager: stores.sqliteManager,
    purposeRepository : stores.repository.purposeRepository,
    detailPlansService : stores.service.detailPlansService
}))
class PurposeService {
    
    constructor(props){
        super(props);

        //DI
        this.connection = this.props.sqliteManager.connection;
        this.purposeRepository = this.props.purposeRepository;
        this.detailPlanService = this.props.detailPlanService;
    }


    @action
    create = (purpose) => {
        this.connection.transaction((tx) => {
            let detailPlanHeaderId = this.detailPlansService.register(purpose.detailPlans);

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
            let detailPlans = this.detailPlansService.findAllByHeaderId(purpose.detailPlanHeaderId);
            
            purpose.setDetailPlans(detailPlans);

        });
        return purpose;
    }

    @action
    activeReadAll = () => {
        let purposes;
        this.connection.transaction((tx)=>{
            purposes = this.purposeRepository.selectByStatIsActive();
            if(purposes){
                purposes.forEach((purpose) => {
                    purpose.setDetailPlans(this.detailPlanService.findAllByHeaderId(purpose.detailPlanHeaderId));
                })
            }
        })
        return purposes;
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

    @action
    delete = (id) => {
        this.connection.transaction((tx) => {
            let purpose = this.purposeRepository.selectById(id);

            if(!purpose)
                throw 'Not Exist Purpose';
            
            this.purposeRepository.deleteById(id);
            this.detailPlanService.delete(purpose.detailPlanHeaderId);
        })
    }


}