import React, {Component } from 'react';
import { View, Image, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import defaultHeaderStyle from '../../../organism/header/defaultHeaderStyle';


export default class SelectPhoto extends Component{

    static navigationOptions = ({navigation, screenProps}) => {
        return {
            title : 'HELLO'
        }
        // return {
        // ...defaultHeaderStyle,
        // title : screenProps.photoName,
        // headerRight : () => {
        //     // const enable = route.params.purposeWriteStore.isSelectPh
            
        //     // const {purposeStore} = useStores();

        //     return <Button
        //         title="완료"
        //         // disabled={!purposeStore.isSelectPhoto}
        //         onPress={() => {
        //             navigation.navigator('DetailPlanNavigation');
        //         }}
        //     />
        // }

    };

    constructor(props) {
        super(props)

        this.numColumns = 3;

        this.state = {
            isLoading : false,
            photos : null
        }

        console.log(this.props.route.params)
    }

    _formatData = (data, numColumns) => {
        const lastColumnDataLength = data.length % numColumns;

        if(lastColumnDataLength != 0){
            const emptyBlockCount = numColumns - lastColumnDataLength;
            for(let i = 0; i < emptyBlockCount; i++){
                data.push({isEmpty : true, uri : null})
            }
        }

        return data;

    }

    _getPhotos = async () => {
        
        const photos = (await CameraRoll.getPhotos({
            first: this.props.route.params.photoCount,
            groupName: this.props.route.params.albumName,
            assertType: 'Photos'
        })).edges.map((photo) => {
            return {
                isEmpty : false,
                uri : photo.node.image.uri
            };
        })

        console.log(photos);

        this.setState({
            isLoading : true,
            photos : photos
        });
    }

    componentDidMount() {
        this._getPhotos();
    }


    render(){
        return (
            <View style={styles.container}>
                {this.state.isLoading ? (
                    <FlatList
                        style={{flex: 1}}
                        data={this._formatData(this.state.photos, this.numColumns)}
                        renderItem={({item}) => (
                            <View style={styles.item} >
                                {!item.isEmpty && (
                                <TouchableOpacity style={{flex: 1}} onPress={() => {
                                    this.props.route.params.setPurposeTumbnailUri(item.uri);
                                    this.props.navigation.navigate('PurposeWriteBoard');
                                }}>
                                    <Image
                                        source={{uri : item.uri}}
                                        resizeMode="stretch"
                                        style={{flex:1, width: "100%", height: undefined}}
                                    />
                                </TouchableOpacity>
                                )}
                            </View>
                        )}
                        numColumns={this.numColumns}
                    />
                ) :
                (
                    <Text>
                        isLoadings
                    </Text>
                )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        marginVertical : 10
    },
    item : {
        flex : 1,
        margin : 1,
        height : Dimensions.get('window').width / 3,
    }

})