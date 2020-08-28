import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PurposePaper from '../../../atom/button/PurposePaper';
import Loader from '../../Loader';
import PurposeService from '../../../../rest/service/PurposeService';

import BriefingNotificationManager from '../../../../util/BriefingNotificationManager';


export default class BriefingPurposeList extends Component{

    constructor(props){
        super(props);

        this.state = {
            isLoading : true,
            data : null
        }
    }

    _getData = async () => {
        try {
            const purposes = await PurposeService.getInstance().findPurposeForBrifingList();
            this.setState({
                data : purposes,
                isLoading : false
            })
        } catch (e) {
            console.log(e);
            this.props.navigation.goBack();
        }
    }

    _acceptData = async (index, unCheckedDetailPlans) => {
        this.state.data[index].detailPlans = unCheckedDetailPlans;

        this.state.data.forEach((purpose, index) => {
            if(purpose.detailPlans.length == 0)
                this.state.data.splice(index, 1);
        })

        this.setState();
    }

    componentDidMount(){
        this._getData();
    }

    componentWillUnmount(){
        BriefingNotificationManager.show(this.state.data);
    }

    render(){
        return (
            <View style={{ flex: 1 }}>
                {this.state.isLoading ? <Loader /> : (
                    <FlatList
                        style={{ flex: 1 }}
                        contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 10}}
                        data={this.state.data}
                        renderItem={({ item : purpose, index }) => {
    
                            if(purpose.detailPlans.length == 0)
                                return;
    
                            return (
                            <View style={{ marginTop: 8 }}>
                                <PurposePaper
                                    imageUri={purpose.photoUrl}
                                    name={purpose.name}
                                    count={purpose.detailPlans.length}
                                    onPress={() => {
                                        this.props.navigation.navigate('BriefingGoalList', {
                                            purpose: purpose,
                                            goals: purpose.detailPlans,
                                            acceptData : (unCheckedDetailPlans) => {
                                                this._acceptData(index, unCheckedDetailPlans)
                                            }
                                        })
                                    }}
                                />
                            </View>)
                        }}
                    />
                )
                }
            </View>
        );
    }
} 

// export default function BriefingPurposeList({ navigation }) {

//     const [isLoading, setIsLoading] = useState(true);
//     const [data, setData] = useState(null);

//     const getDate = async () => {

//         try {
//             const purposes = await PurposeService.getInstance().findPurposeForBrifingList();
//             console.log(purposes);
//             console.log(purposes.detailPlans)
//             setData(purposes);
//             setIsLoading(false);

//         } catch (e) {
//             console.log(e);
//         }
//     }

//     const acceptData = (index, unCheckedDetailPlans) => {
//         data[index].detailPlans = unCheckedDetailPlans;
//         data.forEach((purpose, index) => {
//             if(purpose.detailPlans.length == 0)
//                 data.splice(index, 1);
//         })

//         setData(data.slice())
//     }

//     useEffect(() => {
//         getDate();
//     }, [])

//     return (
//         <View style={{ flex: 1 }}>
//             {isLoading ? <Loader /> : (
//                 <FlatList
//                     style={{ flex: 1 }}
//                     contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 10}}
//                     data={data}
//                     renderItem={({ item : purpose, index }) => {

//                         if(purpose.detailPlans.length == 0)
//                             return;

//                         return (
//                         <View style={{ marginTop: 8 }}>
//                             <PurposePaper
//                                 imageUri={purpose.photoUrl}
//                                 name={purpose.name}
//                                 count={purpose.detailPlans.length}
//                                 onPress={() => {
//                                     navigation.navigate('BriefingGoalList', {
//                                         purposeName: purpose.name,
//                                         goals: purpose.detailPlans,
//                                         acceptData : (unCheckedDetailPlans) => {
//                                             acceptData(index, unCheckedDetailPlans)
//                                         }
//                                     })
//                                 }}
//                             />
//                         </View>)
//                     }}
//                 />
//             )
//             }
//         </View>
//     );
// }