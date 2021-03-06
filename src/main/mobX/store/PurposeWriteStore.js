import { observable, action } from "mobx";
import Purpose from "../../rest/model/Purpose";
import EasyDate from '../../util/EasyDate';
import { PurposeWriteType, State } from "../../AppEnum";


export default class PurposeWriteStore{


    @observable activeIndex;
    @observable permitCache;

    @observable isFinish;
    @observable isLast;

    @observable
    endIndex = 7;

    writeType; //0 Create 1 Modify 2 GROUND MODIFY


    purpose;

    //system
    isSelectPhoto;

    isChangePhoto;


    start = (endIndex, purpose, type) => {
        this.activeIndex = 0;
        this.endIndex = endIndex;
        this.purpose = new Purpose(null, "", "", null, 0,  EasyDate.now(), new EasyDate().plusDays(1), 0 );
        this.writeType = type;
        

        let diffDay;

        switch(this.writeType){
            case PurposeWriteType.CREATE:
                this.permitCache = [false, false, false, false];
                break;
            case PurposeWriteType.MODIFY:
                this.purpose = purpose;
                this.permitCache = [true, true, true, true]

                break;
            case PurposeWriteType.FOLLOW:
                this.purpose.startDate = purpose.startDate;
                this.purpose.detailPlans = purpose.detailPlans;
                this.permitCache =  [false, false, false, true]
                
                this.resetDetailPlans(this.purpose)

                break;
            case PurposeWriteType.RETRY:
            case PurposeWriteType.RISE:
                this.purpose = purpose;
                this.permitCache = [true, true, true, true];

                this.purpose.stat = State.PROCEED;
                
     
                this.resetDetailPlans(this.purpose)

                break;
        }


        // this.purpose = purpose ? purpose : new Purpose(null, "", "", null, 0,  EasyDate.now(), new EasyDate().plusDays(1), 0 );

        //date awlays true
        // this.permitCache = purpose ? [true, true, true, true] : [false, false, false, false];

        this.isSelectPhoto = false;
        this.isFinish = false;
        this.isLast = false;

        this.isChangePhoto = false;

    }

    resetDetailPlans = (purpose) => {

        
        const diffDay = EasyDate.between(EasyDate.now(), purpose.startDate).day;

        purpose.startDate = EasyDate.now();
        purpose.endDate = purpose.endDate.plusDays(diffDay)

     

        purpose.detailPlans.forEach((goal) => {
            
            goal.briefingCount = 0;
            goal.lastBriefingDate = null;
            goal.startDate = EasyDate.now();
            goal.endDate = goal.endDate.plusDays(diffDay);

            if(goal.endDate.isBefore(purpose.endDate)){
                purpose.endDate = goal.endDate;
            }
            
        });
    }

    @action
    next = (carousel) => {

        if(this.hasNext && !this.isLast){
            carousel._snapToItem(this.activeIndex + 1);
            this.activeIndex++;
            if(!this.hasNext)
                this.isLast = true;
        }

    }

    @action
    previous = (carousel) => {
        if(!this.hasPrevious)
            return;
            
        if(this.isLast)
            this.isLast = false;

        this.activeIndex--;
        carousel._snapToItem(this.activeIndex);

    }

    @action
    changePermit= (permit, index) => {
        if(this.permitCache[index] === permit)
            return;
            
        this.permitCache[index] = permit;
    }

    get isModify(){
        return this.purpose.id != null;
    }

    get hasNext() {
        return this.activeIndex + 1 != this.endIndex;
    }

    get hasPrevious() {
        return this.activeIndex != 0;
    }

    get isPermitNextScene(){
        return this.permitCache[this.activeIndex];
    }

    get resultFormData(){
        let formData = new FormData();

        
        formData.append('name', this.purpose.name);
        formData.append('description', this.purpose.description);
        if(this.isChangePhoto){
            // this.purpose.photo.uri = this.purpose.photo.uri.replace('file://', '');
            formData.append('photo', this.purpose.photo);
        }
        formData.append('disclosureScope', this.purpose.disclosureScope);
        formData.append('startDate', this.purpose.startDate.toString());
        formData.append('endDate', this.purpose.endDate.toString());
        formData.append('stat', this.purpose.stat);

        if(this.writeType != PurposeWriteType.MODIFY && this.purpose.detailPlans){
            formData.append('detailPlans', 
                JSON.stringify(
                    this.purpose.detailPlans.map((goal) => {
                        return {
                            ...goal,
                            lastBriefingDate :  goal.lastBriefingDate ?  goal.lastBriefingDate.toString() : null,
                            startDate: goal.startDate.toString(),
                            endDate: goal.endDate.toString()
                        }
                    })
                )
            );
 
        }

        if(this.writeType == PurposeWriteType.RETRY && this.writeType == PurposeWriteType.RISE && this.writeType == PurposeWriteType.GROUND_MODIFY){
            formData.append('achieve', this.purpose.achieve)
        }

        return formData;

    }


} 
//permitNextScene 에 따른 state 변화처리를 어떻게 하면 최소화 할수 있을지 생각해보자