import React, {Component} from 'react';
import {View, FlatList} from 'react-native';


export default class StoryListVew extends Component{

    constructor(props){
        super(props);

        this.state = {
            isLoading : false,
        }

        this.authStore = this.props.authStore;

        this.loadData = this.props.promiseLoadData;
        this.onEndReached = this.props.onEndReached;

    }

    //state만 변경됬을때 변경
    shouldComponentUpdate(nextProps, nextState){
        return this.state.isLoading != nextState.isLoading
    }

    _loadData = async () => {
        try{
           await this.loadData();
        }catch(e){
            console.log(e);
        }

        this.setState({
            isLoading : false
        })
    
    }

    _handleLoadMore = () => {
        if(!this.onEndReached())
            return;

        this.setState({
            isLoading : true
        }, this._loadData);

    }

    _renderFooter = () => {
        return(
            this.state.isLoading ? 
            <View style={{height: 210, width: '100%'}}>
               <Loader/>
            </View> : null
       );
    }

    componentDidMount(){
        this.setState({
            isLoading : true
        }, this._loadData)
    }

    render(){
        return(
            <View style={{flex: 1}}>
            <FlatList
                style={{flex: 1}}
                data={this.props.data}
                renderItem={({item}) => {
                    item.createDate = new EasyDate(item.createDate);
                    return <StoryBlock data={item}/>
                }}
                keyExtractor={(item) => item.id}
                onEndReached={this._handleLoadMore}
                onEndReachedThreshold={0.4}
                ListFooterComponent={this._renderFooter}
            />
        </View>  
        )
    }
}



// export default class StoryListView({data, loadData, onEndReached}){
    



//     const [isLoading ,setIsLoading] = useState(true);

//     const _loadData = async () => {
//         try{
//             await loadData();

//         }catch(e){
//             console.log(e);
//         }

//         setIsLoading(false);

//     }

//     const _handleLoadMore = () => {
//         if(!onEndReached())
//             return;

//         setIsLoading(true);

//         _loadData();
//     }

//     const _renderFooter = () => {
//         return(
//             isLoading ? 
//             <View style={{height: 210, width: '100%'}}>
//                <Loader/>
//             </View> : null
//        );
//     }

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
//                 onEndReached={_handleLoadMore}
//                 onEndReachedThreshold={0.4}
//                 ListFooterComponent={_renderFooter}
//             />
//         </View>  
//     )

// }
