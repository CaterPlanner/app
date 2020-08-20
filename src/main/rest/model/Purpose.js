import EasyDate from "../../util/EasyDate";

export default class Purpose {

    constructor(id, name, description, imageUrl, disclosureScope, startDate, endDate, stat){
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.disclosureScope = disclosureScope;
        this.startDate = new EasyDate(startDate);
        this.endDate = new EasyDate(endDate);
        this.stat = stat; 

        this.detailPlans = [];
    }

    setDetailPlans = (detailPlans) => {
        this.detailPlans = detailPlans;
    }

    get leftDay(){
        return EasyDate.between(EasyDate.now(), this.endDate).day;
    }

    get progress() {
        return detailPlans.progress;
    }

    get achieve() {
        return detailPlans.achieve;
    }


}