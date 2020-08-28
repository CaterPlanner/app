import React, {useState} from 'react';
import StoryListView from '../../common/story/StoryListView';
import useStores from '../../../../../mobX/helper/useStores';
import GlobalConfig from '../../../../../GlobalConfig';

export default function PurposeStories({purpose}){
    
    const [data, setData] = useState([]);
    let page = 0;

    let isFinish = false;

    const {authStore} = useStores();

    return(
        <StoryListView
            data={data}
            promiseLoadData={() => {
                return new Promise(async (resolve, reject) => {
                    const response = await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/${purpose.id}/stories?page=${page}`, null, null, 8000)
                    .auth(authStore.userToken.token)
                    .submit();

                    isFinish = response.data.isFinal;

                    setData(data.concat(response.data.elements));
                    resolve();
                }) 
            }}
            onEndReached={() =>{
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