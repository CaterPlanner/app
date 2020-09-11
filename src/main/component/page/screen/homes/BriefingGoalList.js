import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import DetailPlanCheckBox from '../../../atom/checkbox/DetailPlanCheckbox';
import PurposeService from '../../../../rest/service/PurposeService';
import { inject } from 'mobx-react';
import Loader from '../../Loader';

@inject(['authStore'])
export default class BriefingGoalList extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            isLoading : false,
            goals : this.props.route.params.purpose.detailPlans.filter(g => g.isNowBriefing)
        }

        this.updateGoalIdStat = new Array(this.state.goals.length);

        this.props.navigation.setParams({
            save : this.save
        })

        this.checkCount = 0;

    }

    _briefing = async () => {
        
        //addBrieifng이 아닌 update로 변경
        try{

            let updateGoalList = [];
            this.updateGoalIdStat.map((r, index) => {
                if(r)
                    updateGoalList.push(this.state.goals[index]);
            });


            const updatedPurpose = await PurposeService.getInstance().update(this.props.route.params.purpose, 
                updateGoalList , await this.props.authStore.getToken());

            this.props.route.params.acceptData(updatedPurpose);

            this.props.navigation.goBack();

        }catch(e){
            console.log(e);
            this.setState({
                isLoading : false
            })

            this.props.navigation.setParams({
                showHeader : true
            })
        }
    }

    save = () => {
        if(this.state.isLoading)
            return;

        this.props.navigation.setParams({
            showHeader : false
        })

        this.setState({
            isLoading : true
        }, this._briefing);
    }

    componentDidUpdate(){
        if(this.state.goals.length == 0){
            this.props.navigation.goBack();
        }
    }

    render(){

        return this.state.isLoading ? <Loader style={{flex:1}}/> : (
            <FlatList
                style={{flex: 1}}
                contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 20}}
                data={this.state.goals}
                renderItem={({item, index}) => (
                    <View style={{ marginTop: 8}}>
                        <DetailPlanCheckBox
                            color={item.color}
                            name={item.name}
                            acheive={item.achieve}
                            onChange={() => {
                                this.updateGoalIdStat[index] = !this.updateGoalIdStat[index];
                                const isChecked = this.updateGoalIdStat[index];


                                if(isChecked){
                                    this.checkCount++;
                                    item.briefingCount++;
                                }else{
                                    this.checkCount--;
                                    item.briefingCount--;
                                }
                                console.log(item.achieve)

                                this.setState({
                                    goals : this.state.goals
                                }, () => {
                                    
                                    if(this.checkCount == 0){
                                        this.props.navigation.setParams({isCanSubmit : false})
                                    }else if(this.checkCount == 1){
                                        this.props.navigation.setParams({isCanSubmit : true})
                                    }
                                })

                            }}
                        />
                    </View>
                )}
            />)
    }



}
// export default function BriefingGoalList({navigation}){
    
//     const route = useRoute();
//     const [goals, setGoals] = useState(route.params.goals);

//     useEffect(() => {
//         if(goals.length == 0)
//             navigation.goBack();

//     }, [goals]);

//     return(
//         <FlatList
//             style={{flex: 1}}
//             contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 20}}
//             data={route.params.goals}
//             renderItem={({item, index}) => (
//                 <View style={{ marginTop: 8}}>
//                     <DetailPlanCheckBox
//                         color={item.color}
//                         name={item.name}
//                         acheive={item.acheive}
//                         onChange={() => {
//                             goals.splice(index, 1);
//                             setGoals(goals.slice());
//                         }}
//                     />
//                 </View>
//             )}
//         />
//     );

// }


