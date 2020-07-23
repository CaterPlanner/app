import { inject } from 'mobx-react';
import { action } from 'mobx';

/**
 *  DetailPlans에 대한 서비스처리 하나 유의해야할 점이 있다면 단수가 아니라 복수라는것
 *  서비스에서 여러개를 같이 처리하는 경우가 많은 이유로 작성
 */
@inject(stores => ({
    sqliteManager: stores.sqliteManager,
    detailPlanRespository: stores.repository.detailPlanRespository,
    detailPlanHeaderRepository: stores.repository.detailPlanHeaderRepository,
    briefingRespository: stores.repository.briefingRespository
}))
class DetailPlansService {

    constructor(props) {
        super(props);

        //DI
        this.connection = this.props.sqliteManager.connection;
        this.detailPlanRespository = this.props.detailPlanRespository;
        this.detailPlanHeaderRepository = stores.repository.detailPlanHeaderRepository;
        this.briefingRespository = stores.repository.briefingRespository;
    }

    @action
    create = (detailPlans, author, baseId) => {
        let detailPlanHeaderId;
        this.connection.transaction((tx) => {

            detailPlanHeaderId = this.detailPlanHeaderRepository.insert(author, baseId);

            detailPlans.forEach((detailPlan) => {
                this.detailPlanRespository.insert(detailPlanHeaderId, detailPlan);
            })
        });
        return detailPlanHeaderId;
    }

    @action
    read = (detailPlanHeaderId) => {
        let detailPlans;
        this.connection.transaction((tx) => {
            detailPlans = this.detailPlanRespository.selectByHeaderId(detailPlanHeaderId);

            detailPlans.forEach((detailPlan) => {
                switch (detailPlan.type) {
                    case 'G':
                        detailPlan.setPerforms(detailPlans.filter(element => element.constructorRelationType === 0 && element.constructorKey === detailPlan.key));
                        break;
                    case 'P':
                        detailPlan.setBriefins(
                            this.briefingRespository.selectByHeaderIdAndDetilPlanKey(detailPlanHeaderId, detailPlan.key));
                        break;
                }
            })

        });
        return detailPlans;
    }

    @action
    update = (detailPlanHeaderId, detailPlans) => {
        this.connection.transaction((tx) => {
            if (!this.detailPlanRespository.deleteByHeaderId(detailPlanHeaderId))
                throw 'Not Exist detailPlanHeaderId';

            detailPlans.forEach((detailPlan) => {
                this.detailPlanRespository.insert(detailPlanHeaderId, detailPlan);
            })

        })
    }

    @action
    delete = (detailPlanHeaderId) => {
        this.connection.transaction((tx) => {
            this.detailPlanHeaderRepository.deleteById(detailPlanHeaderId); //detailplan에서 pk로 CASCADE 되어 있기 때문에 header만 삭제한다.
        })
    }


}