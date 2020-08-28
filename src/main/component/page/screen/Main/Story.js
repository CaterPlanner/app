import React, {useState} from 'react';
import StoryListView from '../common/story/StoryListView';
import useStores from '../../../../mobX/helper/useStores';
import GlobalConfig from '../../../../GlobalConfig';
import Request from '../../../../util/Request';


export default function Story(){

    const [data, setData] = useState([]);
    const [type ,setType] = useState(0);

    let page = 0;
    let isFinish = false;

    const {authStore} = useStores();

    return(
        <StoryListView
            data={data}
            promiseLoadData={() => {
                return new Promise(async (resolve, reject) => {
                    const response =  await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/stories?page=${page + (type ? `&type=${type}` : '')}`, null, null, 8000)
                    .auth(authStore.userToken.token)
                    .submit()
                    isFinish = response.data.isFinal;

                    setData(data.concat(response.data.elements));
                    resolve();
                })
            }}
            onEndReached={() => {
                if(isFinish){
                    return false;
                }else{
                    page++;
                    return true;
                }
            }}
        />
    )
}

// import React, {Component} from 'react';
// import {View, Text, FlatList} from 'react-native'
// import StoryBlock from '../../../atom/StoryBlock';
// import GlobalConfig from '../../../../GlobalConfig';
// import useStores from '../../../../mobX/helper/useStores';
// import Loader from '../../Loader';
// import Request from '../../../../util/Request';
// import EasyDate from '../../../../util/EasyDate';
// import { inject } from 'mobx-react';

// //https://www.youtube.com/watch?v=Jc2MX0Ew3PE&t=284s

// @inject(['authStore'])
// export default class Story extends Component{

//     constructor(props){
//         super(props);

//         this.state = {
//             data : [],
//             isLoading : false,
//             page: 0,
//             type: 0
//         }

//         this.page = 0;
//         this.type = null;

//         this.authStore = this.props.authStore;

//     }

//     _loadData = async () => {
//         try{
//             const response = await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/story?page=${this.state.page + (this.state.type ? `&type=${this.state.type}` : '')}`, null, null, 8000)
//             .auth(this.authStore.userToken.token)
//             .submit();

//             this.setState({
//                 data : this.state.data.concat(response.data),
//                 isLoading : false
//             })

//         }catch(e){
//             console.log(e);
        
//             this.setState({
//                 isLoading : false
//             })

//         }
    
//     }

//     _handleLoadMore = () => {
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
//         console.log('render')

//         return(
//             <View style={{flex: 1}}>
//             <FlatList
//                 style={{flex: 1}}
//                 data={this.state.data}
//                 renderItem={({item}) => {
//                     item.createDate = new EasyDate(item.createDate);
//                     return <StoryBlock data={item}/>
//                 }}
//                 keyExtractor={(item) => item.id}
//                 onEndReached={this._handleLoadMore}
//                 onEndReachedThreshold={0.4}
//                 ListFooterComponent={this._renderFooter}
//             />
//         </View>  
//         )
//     }
// }


// export default function Story(){
    
//     const [data, setData] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);

//     const {authStore} = useStores();

//     let page = 0;
//     let type = null;


//     console.log('hello')

//     const loadData = async () => {
//         try{
//             const response = await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/story?page=${page + (type ? `&type=${type}` : '')}`, null, null, 8000)
//             .auth(authStore.userToken.token)
//             .submit();


//             setData(data.concat(response.data));
//             setIsLoading(false);
//         }catch(e){
//             console.log(e);
//             setIsLoading(false);
//         }
    
//     }

//     const handleLoadMore = () => {
//         // if(isLoading)
//         //     return;
//         setIsLoading(true);
//         console.log('change')
//         page++;
//         loadData();
//     }

//     const renderFooter = () => {
//         return(
//              isLoading ? 
//              <View style={{height: 210, width: '100%'}}>
//                 <Loader/>
//              </View> : null
//         );
//     }

//     useEffect(() => {
//         console.log('useEffect')
//         setIsLoading(true);
//         loadData();
//     }, [])

//     return(
//         <View style={{flex: 1}}>
//             <FlatList
//                 style={{flex: 1}}
//                 data={data}
//                 renderItem={({item}) => {
//                     item.createDate = new EasyDate(item.createDate);
//                     return <StoryBlock data={item}/>
//                 }}
//                 keyExtractor={(item) => item.id}
//                 onEndReached={handleLoadMore}
//                 onEndReachedThreshold={0}
//                 ListFooterComponent={renderFooter}
//             />
//         </View>
//     )
// }
