const State = {
    PROCEED : 0,
    WAIT : 1,
    SUCCEES : 2,
    FAIL : 3
}

State.isPass = (stat) => {
    return stat > 2;
}

export default State;


