import { observable, action } from "mobx";

export default class PurposeWriteStore{


    @observable activeIndex;
    @observable permitCache;

    endIndex = 7;
    purpose;

    isSelectPhoto;


    start = (endIndex) => {
        this.activeIndex = 0;
        this.endIndex = endIndex;
        this.purpose = {};

        //date awlays true
        this.permitCache = [false, false, false, false, false, false, false];
        this.isSelectPhoto = false;
    }

    set = (carousel) => {
        this.carousel = carousel;
    }

    @action
    next = (carousel) => {
        carousel._snapToItem(this.activeIndex + 1);
        this.activeIndex++;

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