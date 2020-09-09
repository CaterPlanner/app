import React, {Component } from 'react';
import { View, Image, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import Loader from '../../Loader';

//https://stackoverflow.com/questions/43824261/react-native-fetch-file-upload-error

export default class SelectPhoto extends Component{


    constructor(props) {
        super(props)

        this.numColumns = 3;

        this.state = {
            isLoading : false,
            photos : null
        }

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
            assertType: 'Photos',
            include: ['filename']
        })).edges.map((photo) => {
            return {
                isEmpty : false,
                uri : photo.node.image.uri,
                name: photo.node.image.filename,
                type: photo.node.type
            };
        })


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
                                    this.props.route.params.setPurposePhoto({
                                        uri : item.uri,
                                        name : item.name,
                                        type: item.type
                                    });
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
                    <Loader/>
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