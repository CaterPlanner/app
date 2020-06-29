export class DetailPlan {

    constructor(key, constructorKey, constructorRelationType,  name, type, startDate, endDate, color, cycle, stat){
        this.key = key;
        this.constructorKey = constructorKey;
        this.constructorRelationType = constructorRelationType;
        this.name = name;
        this.type = type;
        this.startDate = startDate;
        this.endDate = endDate;
        this.color = color;
        this.cycle = cycle;
        this.stat = stat;
    }

}

export function createEmptyDetailPlan(constructorKey, constructorRelationType){
    return new DetailPlan(
        -1,
        constructorKey,
        constructorRelationType,
        "Unknown",
        "P",
        "2020-02-03",
        "2020-02-03",
        "gray",
        "unknown",
        0
    );
}