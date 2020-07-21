

export default class Purpose{
    constructor(id, authorName, authorId, groupName, groupId, name, description, imageUrl, disclosureScope, startAt, decimalDay, detailPlanHeaderId, detailPlans){
        this.id = id;
        this.authorName = authorName;
        this.authorId = authorId;
        this.groupName = groupName;
        this.groupId= groupId;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.disclosureScope = disclosureScope;
        this.startAt = startAt;
        this.decimalDay = decimalDay;
        this.detailPlanHeaderId = detailPlanHeaderId;

        this.detailPlans = detailPlans;
    }
}