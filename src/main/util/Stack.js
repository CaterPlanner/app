export default class Stack {
    constructor() {
        this.store = [];
    }

    push(item){
        this.store.push(item);
    }

    pop(){
        return this.store.pop();
    }

    isEmpty(){
        return this.store.length == 0;
    }
    
}