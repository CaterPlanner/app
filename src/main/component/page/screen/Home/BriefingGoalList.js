import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import DetailPlanCheckBox from '../../../atom/checkbox/DetailPlanCheckbox';
import PurposeService from '../../../../rest/service/PurposeService';

export default class BriefingGoalList extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            goals : this.props.route.params.goals,
        }

        this.clearGoalIdList = [];

        this.props.navigation.setParams({
            save : this.save
        })
    }

    save = async () => {

        try{
            const purpose = this.route.params.purpose;
            let checkedGoals = [];

            for(id of this.clearGoalIdList){
                try{
                    await PurposeService.getInstance().addBriefing(id, purpose); //참조 이용
                    checkedGoals.push(purpose.detailPlans[id]);
                }catch(e){
                    console.log(e);
                }
            }

            const updatedPurpose = PurposeService.read(purpose.id);
    
            await Request.patch(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/purpose/${updatedPurpose.id}/update`, JSON.stringify({
                achieve: updatedPurpose.achieve,
                stat: updatedPurpose.stat,
                modifiedGoalAchieve: checkedGoals.map((goal) => ({
                    id: goal.id,
                    briefingCount: goal.briefingCount,
                    lastBriefingDate: goal.lastBriefingDate.toString(),
                    stat: goal.stat
                }))
            })).auth(this.props.authStore.userToken.token).submit();


            this.props.route.params.acceptData(updatedPurpose);

        }catch(e){
            console.log(e);
        }
    }

    componentDidUpdate(){
        if(this.state.goals.length == 0){
            this.props.navigation.goBack();
        }
    }

    componentWillUnmount(){
        this._saveCheck();
    }

    render(){
        return(
            <FlatList
                style={{flex: 1}}
                contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 20}}
                data={this.state.goals}
                renderItem={({item, index}) => (
                    <View style={{ marginTop: 8}}>
                        <DetailPlanCheckBox
                            color={item.color}
                            name={item.name}
                            acheive={item.acheive}
                            onChange={() => {

                                this.clearGoalIdList.push(item.id);
                                // this.setState({
                                //     goals : [
                                //     ...this.state.goals.slice(0, index),
                                //     ...this.state.goals.slice(index + 1)]
                                // })

                                // PurposeService.getInstance().addBriefing(this.props.route.params.purpose.id, item.id)
                                // .then(() => {
                                //     this.clearGoalIdList.push(item.id);
                                //     this.setState({
                                //         goals : [
                                //         ...this.state.goals.slice(0, index),
                                //         ...this.state.goals.slice(index + 1)]
                                //     })
                                // })
                                // .catch((e) => {
                                //     console.log(e);
                                // })
                                
                            }}
                        />
                    </View>
                )}
            />
        );
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


