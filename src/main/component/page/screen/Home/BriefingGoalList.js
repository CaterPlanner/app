import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import DetailPlanCheckBox from '../../../atom/checkbox/DetailPlanCheckbox';
import PurposeService from '../../../../rest/service/PurposeService';
import { inject } from 'mobx-react';

@inject(['authStore'])
export default class BriefingGoalList extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            isLoading : false,
            goals : this.props.route.params.goals,
        }

        this.clearGoalIdStat = new Array(this.state.goals.length);

        this.props.navigation.setParams({
            save : this.save
        })
    }

    _briefing = async () => {
        
        try{
            let clearGoalIdList = [];
            this.clearGoalIdStat.map((r, index) => {
                if(r)
                    clearGoalIdList.push(index);
            });

            const updatedPurpose = await PurposeService.getInstance().addBriefing(this.props.route.params.purpose, 
                clearGoalIdList , await this.props.authStore.getToken());

            this.props.route.params.acceptData(updatedPurpose);

            this.props.navigation.goBack();


        }catch(e){
            console.log(e);
            this.setState({
                isLoading : false
            })
        }
    }

    save = () => {
        if(this.state.isLoading)
            return;

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
                                this.clearGoalIdStat[index] = !this.clearGoalIdStat[index];  
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


