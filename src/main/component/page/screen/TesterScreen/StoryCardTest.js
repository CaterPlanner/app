import React from '../ObjectionWrite/node_modules/react';
import {View, Text, Image, StyleSheet, Dimensions} from '../ObjectionWrite/node_modules/react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Left, Row } from 'native-base';


const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

const caterIcon = '../../../../../asset/DDC.gif';

const likeGrab = 12;
const comentGrab = 7;

const UserImage_Grab = 'https://library.kissclipart.com/20180918/ove/kissclipart-account-icon-clipart-computer-icons-user-profile-c-b43be10750a4eda5.png'

export default function StoryCardTest({userImg, userName, hisTime,title,content,likes,coments}){

    

    return(

        <View style = {styles.container}>

            <View style={styles.Cardcontainer}>

            <View style={styles.TopCardContainer}>




            <View style={{flex:6, flexDirection:'row', }}>
            





            <View style={{flex:3,}}>
            <TouchableOpacity style={{flexDirection:'row'}}>
            <Image style ={{height:40, width:40, marginTop:5, marginLeft:5}} source={{uri:UserImage_Grab}}/>
            <Text numberOfLines={1}
            style={{fontSize:20, marginTop:'3%', marginLeft:8}}
            >{userName}</Text>
            </TouchableOpacity>
           </View>


            <View style={{flex:1,}}>
            <Text
            style={{marginTop:'9%', marginLeft:15, fontSize:13, 
            marginRight:'2%'}}
            >23시간 전</Text>
            </View>



            </View>



            <View style={{flex:1}}>
            <TouchableOpacity>
            <Image style ={{height:50, width:50, borderRadius:40}} source={{uri:'https://media.istockphoto.com/vectors/emergency-siren-icon-in-flat-style-police-alarm-vector-illustration-vector-id1145717300'}}/>
            </TouchableOpacity>
            </View>
</View>

<View style={styles.MidCardTitleContainer}>





    <View style={{flex:2}}>
    <Text style={{justifyContent:'center',fontSize:30, marginTop:'4%', marginLeft:20}} numberOfLines={2}>{title}</Text>
    </View>

    
    <View style={{flex:1}}>
    <View style={{borderWidth:4, borderColor:'green', marginLeft:'23%',marginTop:'3%',
        borderRadius:50,height:75, width:75, elevation:10, backgroundColor:'white'}}>
        <Image style ={{
            height:60, width:60, borderWidth:4, alignSelf:'center',justifyContent:'center',
            
            }} source={require(caterIcon)}/>
            </View>
    </View>




</View>


<TouchableOpacity style={{flexDirection:'row'}}>
<View style={styles.MidCardContentContainer}>
        <Text style={{margin:20}} numberOfLines={4}>{content}</Text>
</View></TouchableOpacity>

<View style={styles.BottCardContainer}>

    <TouchableOpacity>
    <Image 
    style={{height:45, width:45, borderRadius:30, marginLeft:'17%', marginTop:-2}}
    //바로가기
    source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRBibCuTx1Uzx9GmgTA7jzHvD8p9L8JkwrmD1OUN9oLla6vCAV2&usqp=CAU'}}/>
    </TouchableOpacity>
    
    <View style={styles.comments}>

            <TouchableOpacity style={{flexDirection:'row',
             marginRight:'10%', marginLeft:'10%'}}>
            <Image style={{width:25, height:25, marginTop:'25%', marginRight:7}} source={{uri:'https://i.pinimg.com/originals/d8/3b/09/d83b09ebec8c4ca33339cc880d6f1143.jpg'}}></Image>
        <Text style={{fontSize:20, marginTop:'17%'}}>{likeGrab}</Text>
            </TouchableOpacity>
            
            
            <TouchableOpacity style={{flexDirection:'row'}}>
            <Image style={{width:30, height:30, marginTop:'20%', marginLeft:'13%', marginRight:7}} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgeWEa9bZFVkYxojjRJIJxuJsFEdWh1F4o1JTz17t1b4hyOX3_&usqp=CAU'}}></Image>
            <Text style={{fontSize:20, marginTop:'16%'}}>{comentGrab}</Text>
            </TouchableOpacity>

    </View>
    

</View>

            </View>
        </View>
    )

    

}


const styles = StyleSheet.create({
    
    container:{
       // backgroundColor:'red',
        width:fullWidth,
        height:380,
        padding:10
        
    },

    Cardcontainer:{

        backgroundColor:'white',
        width:'100%',
        height:'100%',
        flexDirection:'column',
        borderRadius:10
        
        
    },

    TopCardContainer:{

        padding:6,

        flexDirection:'row',

        flex:1,
     //   borderWidth:1,
        borderColor:'black'
    },

    MidCardTitleContainer:{

        flexDirection:'row',

        flex:2,
      //  borderWidth:1
    },

    MidCardContentContainer:{
        flex:3,
    //    borderWidth:1
    },

    BottCardContainer:{
        flexDirection:'row',
        flex:1.2,
       // borderWidth:1
    },

    comments:{

        flexDirection:'row',

        marginLeft:'41%',
        //backgroundColor:'blue',
        height:'100%',
        width:'40%'
    }

   

})