

export default class Objection{
    constructor(id, authorName, authorId, groupName, groupId, name, description, imageUrl, disclosureScope, startAt, decimalDay, goalHeaderId, goals){
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
        this.goalHeaderId = goalHeaderId;

        this.goals = goals;
    }
}