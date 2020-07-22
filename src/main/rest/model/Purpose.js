import { TouchableWithoutFeedback } from "react-native-gesture-handler";


export default class Purpose {

    constructor(id, authorName, authorId, groupName, groupId, name, description, imageUrl, disclosureScope, startAt, decimalDay, detailPlanHeaderId) {

        this.id = id;
        this.authorName = authorName;
        this.authorId = authorId;
        this.groupName = groupName;
        this.groupId = groupId;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.disclosureScope = disclosureScope;
        this.startAt = startAt;
        this.decimalDay = decimalDay;
        this.detailPlanHeaderId = detailPlanHeaderId;

        this.isSpecific = false;

    }

    get entryProgress() {
        return this.isSpecific ? Math.round(this.entryCurrentPerfectTime / this.entryMaxTime).toFixed(2) : null;
    }

    get entryAcheive() {
        return this.isSpecific ? Math.round(this.briefingCount / this.maxTime).toFixed(2) : null;
    }

    addBriefing = (key) => {
        if(!this.isSpecific)
            return false;

        this.entryBriefingCount++;
        this.detailPlans[key].briefingCount++;

        return true;
    }

    setDetailPlans = (detailPlans) => {
        if(!detailPlans)
            return;
            
        this.detailPlans = detailPlans;

        this.entryMaxTime = 0;
        this.entryBriefingCount = 0;
        this.entryCurrentPerfectTime = 0;

        detailPlans.forEach(detailPlan => {
            this.entryMaxTime += detailPlan.maxTime;
            this.entryBriefingCount += detailPlan.briefingCount;
            this.entryCurrentPerfectTime += detailPlan.currentPerfectTime;
        });

        this.isSpecific = true;
    }

}