import EasyDate from "../../util/EasyDate";

export default class Purpose {

    constructor(id, name, description, imageUrl, disclosureScope, startAt, decimalday, stat){
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.disclosureScope = disclosureScope;
        this.startAt = new EasyDate(startAt);
        this.decimalday = new EasyDate(decimalday);
        this.stat = stat;
    }

    setDetailPlans = (detailPlans) => {
        this.detailPlans = detailPlans;
    }

    get LeftDay(){
        return EasyDate.between(EasyDate.now(), this.decimalday).day;
    }

    get progress() {
        return detailPlans.progress;
    }

    get achieve() {
        return detailPlans.achieve;
    }


}