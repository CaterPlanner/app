import React from '../../component/page/screen/ObjectionWrite/node_modules/react';
import {MobXProviderContext} from 'mobx-react'

export default function useStores(){
    return React.useContext(MobXProviderContext);
}
