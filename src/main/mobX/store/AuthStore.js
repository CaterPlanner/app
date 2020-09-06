import AsyncStorage from '@react-native-community/async-storage'
import { observable, action } from 'mobx';
import { GoogleSignin } from '@react-native-community/google-signin';
import Request from '../../util/Request';

import firebase from 'react-native-firebase';
import PurposeService from '../../rest/service/PurposeService';
import Purpose from '../../rest/model/Purpose';
import GlobalConfig from '../../GlobalConfig';

//소셜 로그인은 담당하지 않고 외부 서버와의 로그인만 담당
export default class AuthStore {

    @observable
    isLogin;

    user;

    userToken;


    constructor() {
        this.isLogin = false;

        //socialSign
        GoogleSignin.configure({
            scopes: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"],
            webClientId: '824557913187-k8onrhv3nt0q5cbfvc2hf6gamspjseo1.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: false,
        });

    }

    @action
    load = async () => {
        try {

            const userToken = JSON.parse(await AsyncStorage.getItem('USER_TOKEN'));
            this.user = JSON.parse(await AsyncStorage.getItem('USER_DATA'));


            if (userToken && validate(userToken)) {
                this.userToken = userToken;

            } else if (userToken) {
                await reissuanceToken(userToken);
            }

        } catch (e) {
            this.clearUser();
        }
    }

    @action
    reissuanceToken = async (userToken) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await Request.post(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/auth/refreshToken`, JSON.stringify({
                    token: userToken.token,
                    refreshToken: userToken.refreshToken
                }))
                    .submit();

                this.userToken = {
                    token: response.data.token,
                    refreshToken: response.data.refreshToken,
                    expired: response.data.expired
                }

                await AsyncStorage.setItem("USER_TOKEN", JSON.stringify(this.userToken));

                if (!this.isLogin) {
                    this.isLogin = true;
                }

                resolve();

            } catch (e) {
                reject(e);
            }
        })
    }

    vaildate = (userToken) => {
        return new Date(userToken.expired) < new Date();
    }

    login = (idToken, user) => {
        return new Promise(async (resolve, reject) => {
            const json = await Request.post(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/auth/social/google`, JSON.stringify({
                idToken: idToken,
                fcmToken: await this.getFcmToken()
            }))
                .submit();
    
            this.userToken = {
                token: json.data.token,
                refreshToken: json.data.refreshToken,
                expired: json.data.expired
            }
    
            const currentUser = {
                name: user.name,
                email: user.email,
                profileUrl: user.photo
            }
    
            if (!this.user || this.user.email != currentUser) {
                const response = await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/user/myActivePurposes`)
                    .auth(this.userToken.token)
                    .submit();
    
                await PurposeService.getInstance().initAll(response.data);
                this.user = currentUser;
            }
    
            await AsyncStorage.setItem("USER_TOKEN", JSON.stringify(this.userToken));
            await AsyncStorage.setItem("USER_DATA", JSON.stringify(this.user));
    
            this.isLogin = true;
        })
    }

    getFcmToken = async () => {
        await firebase.messaging().requestPermission();
        return firebase.messaging().getToken();
    }

    @action
    signInByGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            console.log(userInfo);

            await AsyncStorage.setItem("USER_SOCIAL", 'GOOGLE');

            await this.login(userInfo.idToken, userInfo.user);
            
        } catch (error) {
            this.clearUser();
            console.log(error)
        }
    }

    @action
    logout = async () => {
        try {
            if (!this.isLogin)
                throw '로그인 상태가 아닙니다.';

            await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/auth/logout`)
                .auth(this.userToken.token)
                .submit()

            const socialName = await AsyncStorage.getItem("USER_SOCIAL");

            switch (socialName) {
                case "GOOGLE":
                    if (await GoogleSignin.isSignedIn()) {
                        await GoogleSignin.revokeAccess();
                        await GoogleSignin.signOut();
                    }
                    break;
            }

           this.clearUser();

        } catch (e) {
            console.log(e);
            throw '로그아웃에 실패하였습니다.'
        }

    }

    clearUser = () => {
        return new Promise(async (resolve, reject) => {
            this.isLogin = false;
            this.userToken = null;
            this.user = null;
    
            await AsyncStorage.removeItem("USER_TOKEN");
            await AsyncStorage.removeItem("USER_DATA");
            await AsyncStorage.removeItem("USER_SOCIAL");

            resolve();
        })
    }

    @action
    getToken = () => {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this.vaildate(this.userToken)) {
                    await this.reissuanceToken(this.userToken);
                }
                resolve(this.userToken.token);
            } catch (e) {
                console.log(e);
                this.clearUser();
                reject();
            }
        })
    }
}