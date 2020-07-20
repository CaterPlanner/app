import React, {Component} from 'react'
import {View, Text, FlatList} from 'react-native'
import StoryCardTest from './StoryCardTest'
import Header_Main from '../../../molecule/Header_Main';

const time = 3;
const hour = '시간';


export default class PullTest extends Component{
    constructor(props) {
        super(props) 

        this.state = {
            isLoading: false,
            items:[],

        }

    }

    componentDidMount(){
        this.getData()
    }
    
    getData = () => {
        let apiURL = 'https://jsonplaceholder.typicode.com/posts'
        this.setState({isLoading:true})
        fetch(apiURL).then(res => res.json()).then(res => {
            this.setState({items: res})
            console.log('로딩 - 새로고침 완료 ----' + this.state.isLoading)

        }).finally(() => this.setState({isLoading:false}))
        console.log('로딩 - 새로고침 하기 ----' + this.state.isLoading)
    }

    renderItem({item}){
        return(
            <StoryCardTest
             userImg = {item.userImg} hisTime = {item.hisTime} 

             //요 세놈 
             title = {item.title} content={item.body} userName = {item.title}
             
             
             likes={item.likes} coments={item.coments}
            ></StoryCardTest>
        )
    }
    
    render(){
        return(
       

            <View style={{flex:1, backgroundColor:'#E6E6E6'}}>

            <Header_Main/>

                <FlatList
                data = {this.state.items}
                renderItem={this.renderItem}
                keyExtractor={(i, k) => k.toString()}
                refreshing={this.state.isLoading}
                onRefresh={this.getData}
                ></FlatList>
            

            </View>
        )
    }


}