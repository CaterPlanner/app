import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import ImageButton from '../../../atom/button/ImageButton';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function PurposeCard({purpose}){

    const navigation = useNavigation();

    return(
        <View style={{paddingBottom:20, alignItems:'center', width:127}}>
            <TouchableOpacity style={{height: 200, width: 130,elevation: 5, borderRadius: 5}}
                onPress={() => {
                        navigation.push('LoadUserPurpose', {
                            id: purpose.id
                        })
                }}
            >
                <Image
                    style={{
                        flex:1, height: undefined,  borderRadius: 5
                    }}
                    source={{uri : purpose.photoUrl}}
                />
            </TouchableOpacity>
            <Text 
            numberOfLines={1}
            style={{marginTop : 5, width:'95%', textAlign:'center', fontSize: 16}}>
                {purpose.name}
            </Text>
        </View>
    )
}

export default class Search extends Component{

    constructor(props){
        super(props);

        this.state = {
            suggesPurposes: null,
            popluarData: null
        }
    }


    componentDidMount(){
        this.setState({
            suggestPurposes : [
                {
                    id : 30,
                    name : 'testt',
                    photoUrl : 'https://i.sodiummedia.com/img/obrazovanie/311/kak-nauchitsya-chitat-po-anglijski.jpg'
                },
                {
                    id : 30,
                    name : 'testtettestseeaetatststestt',
                    photoUrl : 'https://i.sodiummedia.com/img/obrazovanie/311/kak-nauchitsya-chitat-po-anglijski.jpg'
                },
                {
                    id : 30,
                    name : 'testtettestseeaetatststestt',
                    photoUrl : 'https://i.sodiummedia.com/img/obrazovanie/311/kak-nauchitsya-chitat-po-anglijski.jpg'
                }
            ] 
        })
    }

    render(){
        return(
            <ScrollView style={{flex: 1}}>
                <View style={{backgroundColor: 'white'}}>
                    <View style={{    paddingVertical:18 ,flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', paddingHorizontal: 12}}>
                        <Text style={styles.title}>회원님과 같은 카테고리의 목적</Text>
                        <Text style={{
                            fontWeight: 'bold',
                            color : '#00B412',
                        }}>더보기 &gt;</Text>
                    </View>
                    <ScrollView horizontal={true} >
                        {this.state.suggestPurposes && this.state.suggestPurposes.map((purpose) => (
                        <View style={{marginHorizontal: 10}}>
                            <PurposeCard purpose={purpose}/>
                        </View>)
                        )}
                    </ScrollView>
                </View>
            </ScrollView>
        )
    }


}

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
    }
})