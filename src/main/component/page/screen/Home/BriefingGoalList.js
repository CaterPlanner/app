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
    }

    _saveCheck(){
        this.props.route.params.acceptData(this.state.goals, this.clearGoalIdList);
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

                                PurposeService.getInstance().addBriefing(this.props.route.params.purpose.id, item.id)
                                .then(() => {
                                    this.clearGoalIdList.push(item.id);
                                    this.setState({
                                        goals : [
                                        ...this.state.goals.slice(0, index),
                                        ...this.state.goals.slice(index + 1)]
                                    })
                                })
                                .catch((e) => {
                                    console.log(e);
                                })
                                
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


