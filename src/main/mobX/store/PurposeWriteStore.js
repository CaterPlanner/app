import { observable, action } from "mobx";

export default class PurposeWriteStore{


    @observable activeIndex;
    @observable permitCache;

    @observable isFinish;
    @observable isLast;

    @observable
    endIndex = 7;

    purpose;

    //system
    isSelectPhoto;


    start = (endIndex) => {
        this.activeIndex = 0;
        this.endIndex = endIndex;
        this.purpose = {};

        //date awlays true
        this.permitCache = [false, false, false, true, false, false];
        this.isSelectPhoto = false;
        this.isFinish = false;
        this.isLast = false;
    }

    set = (carousel) => {
        this.carousel = carousel;
    }

    @action 
    omitted = (isLast) => {
        this.isLast = isLast;
    }

    @action
    next = (carousel) => {
        if(this.hasNext && !this.isLast){
            carousel._snapToItem(this.activeIndex + 1);
            this.activeIndex++;
            if(!this.hasNext)
                this.isLast = true;
        }else{
            this.isFinish = true;
        }

    }

    @action
    previous = (carousel) => {
        this.activeIndex--;
        carousel._snapToItem(this.activeIndex);
    }

    @action
    changePermit= (permit) => {
        if(this.permitCache[this.activeIndex] === permit)
            return;
            
        this.permitCache[this.activeIndex] = permit;
    }


    get hasNext() {
        return this.activeIndex + 1 != this.endIndex;
    }

    get hasPrevious() {
        return this.activeIndex != 0;
    }

    get isPermitNextScene(){
        return this.permitCache[this.activeIndex];
    }


} 
//permitNextScene 에 따른 state 변화처리를 어떻게 하면 최소화 할수 있을지 생각해보자