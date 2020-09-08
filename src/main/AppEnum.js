export const State = {
    PROCEED : 0,
    WAIT : 1,
    SUCCEES : 2,
    FAIL : 3
}

State.isPass = (stat) => {
    return stat > 2;
}

export const Scope = {
    PUBLIC : 0,
    PRIVATE : 1
}


export const PurposeWriteType = {
    CREATE : 0,
    MODIFY: 1,
    GROUND_MODIFY : 2,
    FOLLOW : 3,
    RETRY: 4
}

export const Model = {
    PURPOSE : 0,
    STORY: 1
}