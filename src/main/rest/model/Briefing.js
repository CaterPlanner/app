class Briefing {

    constructor(headerId, detailPlanKey, createAt, score){
        this.headerId = headerId;
        this.detailPlanKey = detailPlanKey;
        this.createAt = new Date(createAt);
        this.score = score;
    }

}