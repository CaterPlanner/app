import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Left, Row } from 'native-base';


const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

const caterIcon = '../../../../../../asset/DDC.gif';

const likeGrab = 12;
const comentGrab = 7;

const UserImage_Grab = 'https://library.kissclipart.com/20180918/ove/kissclipart-account-icon-clipart-computer-icons-user-profile-c-b43be10750a4eda5.png'

export default function StoryCardTest({ userImg, userName, hisTime, title, content, likes, coments }) {



    return (

        <View style={styles.container}>

            <View style={styles.Cardcontainer}>

                <View style={styles.TopCardContainer}>

                    <View style={{ flex: 6, flexDirection: 'row', }}>

                        <View style={{ flex: 3, }}>
                            <TouchableOpacity style={{ flexDirection: 'row' }}>
                                <Image style={{ height: 40, width: 40, marginTop: 5, marginLeft: 5 }} source={{ uri: UserImage_Grab }} />
                                <Text numberOfLines={1}
                                    style={{ fontSize: 20, marginTop: '3%', marginLeft: 8 }}
                                >{userName}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1, }}>
                            <Text
                                style={{
                                    marginTop: '9%', marginLeft: 15, fontSize: 13,
                                    marginRight: '2%'
                                }}
                            >23시간 전</Text>
                        </View>



                    </View>



                    <View style={{ flex: 1 }}>
                        <TouchableOpacity>
                            <Image style={{ height: 50, width: 50, borderRadius: 40 }} source={{ uri: 'https://media.istockphoto.com/vectors/emergency-siren-icon-in-flat-style-police-alarm-vector-illustration-vector-id1145717300' }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.MidCardTitleContainer}>





                    <View style={{ flex: 2 }}>
                        <Text style={{ justifyContent: 'center', fontSize: 30, marginTop: '4%', marginLeft: 20 }} numberOfLines={2}>{title}</Text>
                    </View>


                    <View style={{ flex: 1 }}>
                        <View style={{
                            borderWidth: 4, borderColor: 'green', marginLeft: '23%', marginTop: '3%',
                            borderRadius: 50, height: 75, width: 75, elevation: 10, backgroundColor: 'white'
                        }}>
                            <Image style={{
                                height: 60, width: 60, borderWidth: 4, alignSelf: 'center', justifyContent: 'center',

                            }} source={require(caterIcon)} />
                        </View>
                    </View>




                </View>


                <TouchableOpacity style={{ flexDirection: 'row' }}>
                    <View style={styles.MidCardContentContainer}>
                        <Text style={{ margin: 20 }} numberOfLines={4}>{content}</Text>
                    </View></TouchableOpacity>

                <View style={styles.BottCardContainer}>

                    <TouchableOpacity>
<<<<<<< HEAD