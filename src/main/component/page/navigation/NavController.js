import React, { Component } from 'react';
import { AsyncStorage, View, StatusBar } from 'react-native'
import { inject, observer } from 'mobx-react'

import SignIn from '../screen/auth/SignIn';
import AppNavigation from './AppNavigation';
import BeginNavigation from './BeginNavigation'
import App from '../../../../../App';


@inject(stores => {
    return {
        authStore: stores.authStore,
        appStore: stores.appStore
    }
})
@observer
export default class NavController extends Component {

    constructor(props) {
        super(props);

        this.authStore = this.props.authStore;
        this.appStore = this.props.appStore;
        // this.appStore.onScheduler();

;
    }

    async componentDidMount() {
        try {
            await this.appStore.boot();
            await this.authStore.load();
        } catch (e) {
            console.log(e);
        }
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    barStyle="white-content"
                    backgroundColor="#000000"
             />
                {/* <AppNavigation />     */}
                {this.appStore.isBegin ?
                    <BeginNavigation /> :  
                        this.authStore.isLogin || this.appStore.offlineMode ?  <AppNavigation /> : <SignIn/>
                }
            </View>
        );
    }
}