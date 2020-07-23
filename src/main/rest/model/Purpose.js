export default class Purpose {
    //D-DAY 필요
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
        this.startAt = new Date(startAt);
        this.decimalDay = new Date(decimalDay);
        this.detailPlanHeaderId = detailPlanHeaderId;

        this.isSpecific = false;

    }

    get entryProgress() {
        if (!this.isSpecific)
            throw Error('Must add a DetailPlans first.');

        let entryCurrentPerfectTime = 0;

        this.detailPlans.forEach((detailPlan) => {
            if(detailPlan.type == 'G')
                entryCurrentPerfectTime += detailPlan.performsCurrentPerfectTime;
        })

        return Math.round(entryCurrentPerfectTime / this.entryMaxTime).toFixed(2);
    }

    get entryAcheive() {
        if (!this.isSpecific)
            throw Error('Must add a DetailPlans first.');

        let entryBriefingCount = 0;

        this.detailPlans.forEach((detailPlan) => {
            if(detailPlan.type == 'G')
                entryBriefingCount += detailPlan.performsBriefingCount;
        })

        return Math.round(entryBriefingCount / this.entryMaxTime).toFixed(2);
    }

    get leftDay(){
        return DeteUtil.betweenDayCount(this.decimalDay , Date.now());
    }

    addBriefing = (key, briefing) => {
        if(!this.isSpecific)
            throw Error('Must add a DetailPlans first.');

        this.entryBriefingCount++;
        this.detailPlans[key].addBriefing(briefing);

    }

    setDetailPlans = (detailPlans) => {          
        this.detailPlans = detailPlans;

        this.entryMaxTime = 0;

        detailPlans.forEach(detailPlan => {
            if(detailPlan.type == 'G')
                this.entryMaxTime += detailPlan.performsMaxTime;
        });

        this.isSpecific = true;
    }

}