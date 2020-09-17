import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native'
import StoryBlock from '../../../molecule/StoryBlock';
import GlobalConfig from '../../../../GlobalConfig';
import Loader from '../../Loader';
import Request from '../../../../util/Request';
import EasyDate from '../../../../util/EasyDate';
import { inject } from 'mobx-react';
import CaterPlannerResult from '../../../organism/CaterPlannerResult';
import { ResultState, LoadType } from '../../../../AppEnum';

//https://www.youtube.com/watch?v=Jc2MX0Ew3PE&t=284s

@inject(['authStore'])
export default class Story extends Component{

    constructor(props){
        super(props);

        this.state = {
            data : [],
            isLoading : false,
            isFinish : false,
            loadType : null,
            page: 0,
            type: 0,
            isTimeout : false,
        }


        this.authStore = this.props.authStore;
        this.isFinish = false;
    }

    _refreshing = () => {

        if(this.state.isLoading)
            return;


        this.setState({
            page : 0,
            isLoading : true,
            loadType : LoadType.REFRESH
        },this._loadData)

    }

    _loadData = async () => {

        // if(this.isFinish || this.state.isLoading)
        //     return;

        try{

            const response = await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/story?page=${this.state.page + (this.state.type ? `&type=${this.state.type}` : '')}`, null, null, 8000)
            .auth(await this.authStore.getToken())
            .submit();

            this.isFinish = response.data.final;


            this.setState({
                data : this.state.loadType == LoadType.REFRESH ? response.data.elements : this.state.data.concat(response.data.elements),
                isLoading : false,
                isFinish : response.data.final
            });

        }catch(e){
            console.log(e);

            this.setState({
                isLoading : false,
                isTimeout : true,
                loadType : null
            })
        }
    }
    
    _handleLoadMore = () => {
        if(this.state.isFinish || this.state.isLoading)
            return;

        this.setState({
            page : this.state.page + 1,
            loadType : LoadType.MORE,
            isLoading : true
        }, this._loadData)
    }

    _renderFooter = () => {
        return(
            this.state.isLoading && this.state.loadType == LoadType.MORE? 
            <View style={{height: 210, width: '100%'}}>
               <Loader/>
            </View> : null
       );
    }

    componentDidMount(){
        this.setState({
            isLoading : true,
            loadType : LoadType.MORE
        }, this._loadData)
    }

    render(){
        return(
            <View style={{flex: 1}}>
            {!this.state.isLoading && this.state.isTimeout ? 
            <CaterPlannerResult
                state={ResultState.TIMEOUT}
                reRequest={() => {
                    this.setState({
                        isTimeout : false,
                        isLoading:true,
                        loadType : LoadType.MORE
                    }, this._loadData)
                }}
            /> : 
            <FlatList
                style={{flex: 1}}
                data={this.state.data}
                renderItem={({item}) => {
                    item.createDate = new EasyDate(item.createDate);
                    return (<View style={{ marginBottom: 10, marginHorizontal: 10}}>
                        <StoryBlock data={item}
                            onPress={() => {this.props.navigation.push('DetailStory', {
                                id : item.id
                            })}}
                            navigation={this.props.navigation}
                        /></View>)
                }}
                keyExtractor={(item) => item.id}
                onEndReached={this._handleLoadMore}
                onEndReachedThreshold={0.4}
                ListFooterComponent={this._renderFooter}
                onRefresh={this._refreshing}
                refreshing={this.state.isLoading && this.state.loadType == LoadType.REFRESH}
            />}
        </View>  
        )
    }
}



// import React, {Component} from 'react';
// import {View, Text, FlatList} from 'react-native'
// import StoryBlock from '../../../molecule/StoryBlock';
// import GlobalConfig from '../../../../GlobalConfig';
// import Loader from '../../Loader';
// import Request from '../../../../util/Request';
// import EasyDate from '../../../../util/EasyDate';
// import { inject } from 'mobx-react';
// import CaterPlannerResult from '../../../organism/CaterPlannerResult';
// import { ResultState } from '../../../../AppEnum';

// //https://www.youtube.com/watch?v=Jc2MX0Ew3PE&t=284s

// @inject(['authStore'])
// export default class Story extends Component{

//     constructor(props){
//         super(props);

//         this.state = {
//             data : [],
//             isLoading : false,
//             isRefreshing : false,
//             isFinish : false,
//             page: 0,
//             type: 0,
//             isTimeout : false,
//         }


//         this.authStore = this.props.authStore;
//         this.isFinish = false;
//     }

//     _refreshing = () => {

//         if(this.state.isLoading || this.state.isRefreshing)
//             return;


//         this.setState({
//             page : 0,
//             isRefreshing : true
//         },this._loadData)

//     }

//     _loadData = async () => {

//         // if(this.isFinish || this.state.isLoading)
//         //     return;

//         try{

//             const response = await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/story?page=${this.state.page + (this.state.type ? `&type=${this.state.type}` : '')}`, null, null, 8000)
//             .auth(await this.authStore.getToken())
//             .submit();

//             this.isFinish = response.data.final;

//             this.setState({
//                 data : this.state.isRefreshing ? response.data.elements : this.state.data.concat(response.data.elements),
//                 isLoading : false,
//                 isRefreshing : false,
//                 isFinish : response.data.final
//             })
//         }catch(e){
//             console.log(e);

//             this.setState({
//                 isLoading : false,
//                 isRefreshing : false,
//                 isTimeout : true
//             })
//         }
//     }
    
//     _handleLoadMore = () => {
//         if(this.state.isFinish || this.state.isLoading || this.state.isRefreshing)
//             return;

//         this.setState({
//             page : this.state.page + 1,
//             isLoading : true
//         }, this._loadData)
//     }

//     _renderFooter = () => {
//         return(
//             this.state.isLoading ? 
//             <View style={{height: 210, width: '100%'}}>
//                <Loader/>
//             </View> : null
//        );
//     }

//     componentDidMount(){
//         this.setState({
//             isLoading : true
//         }, this._loadData)
//     }

//     render(){
//         return(
//             <View style={{flex: 1}}>
//             {!this.state.isLoading && this.state.isTimeout ? 
//             <CaterPlannerResult
//                 state={ResultState.TIMEOUT}
//                 reRequest={() => {
//                     this.setState({
//                         isTimeout : false,
//                         isLoading:true
//                     }, this._loadData)
//                 }}
//             /> : 
//             <FlatList
//                 style={{flex: 1}}
//                 data={this.state.data}
//                 renderItem={({item}) => {
//                     item.createDate = new EasyDate(item.createDate);
//                     return (<View style={{ marginBottom: 10, marginHorizontal: 10}}>
//                         <StoryBlock data={item}
//                             onPress={() => {this.props.navigation.push('DetailStory', {
//                                 id : item.id
//                             })}}
//                         /></View>)
//                 }}
//                 keyExtractor={(item) => item.id}
//                 onEndReached={this._handleLoadMore}
//                 onEndReachedThreshold={0.4}
//                 ListFooterComponent={this._renderFooter}
//                 onRefresh={this._refreshing}
//                 refreshing={this.state.isRefreshing}
//             />}
//         </View>  
//         )
//     }
// }

