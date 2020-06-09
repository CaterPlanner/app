import {observable, action} from 'mobx';
import Goal from '../model/Goal'

export default class MainGoalStore{
    @observable mainGoal = new Goal();

    @action setName = (name) => {
        this.mainGoal.name = name;
    }

    @action getName = () => {
        return this.mainGoal.name;
    }

    @action getMainGoal = () => {
        return this.goal;
    }

}