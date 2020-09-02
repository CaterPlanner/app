import {AsyncStorage} from 'react-native'
import {observable, action} from 'mobx';
import {GoogleSignin} from '@react-native-community/google-signin';
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


    constructor(){
        this.isLogin = false;

        //socialSign
        GoogleSignin.configure({
            scopes: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email" ],
            webClientId: '824557913187-k8onrhv3nt0q5cbfvc2hf6gamspjseo1.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: false,
        });

    }

    @action
    load = async () => {
        try{

            const userToken = JSON.parse(await AsyncStorage.getItem('USER_TOKEN'));
            this.user = JSON.parse(await AsyncStorage.getItem('USER_DATA'));


            if(userToken && validate(userToken)){
                this.userToken = userToken;
                
            }else if(userToken){
                reissuanceToken(userToken);
            }

        }catch(e){
            this.clearUser();
        }
    }

    @action
    reissuanceToken = async (userToken) => {

        Request.post(GlobalConfig.CATEPLANNER_REST_SERVER.ip + '/auth/refreshToken', JSON.stringify({
            token : userToken.token,
            refreshToken : userToken.refreshToken
        }))
        .auth(userToken.token)
        .submit()
        .then(async (json) => {

            //refreshToken 인증 성공 후 새로운 refreshToken, expired 저장
            this.userToken = {
                token : json.token,
                refreshToken : json.refreshToken,
                expired: json.expired
            };

            AsyncStorage.setItem("USER_TOKEN", JSON.stringify(this.userToken));

            if(!this.isLogin){
                this.isLogin = true;
            }
        })
        .catch((error) => {
            throw error.message;
        })

    }

    validate = (userToken) => {
        return new Date(userToken.expired) < new Date();
    }

    login = async (idToken, user) => {

        const json = await Request.post(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/auth/social/google`, JSON.stringify({
            idToken : idToken,
            fcmToken : await this.getFcmToken()
        }))
        .submit();

        this.userToken = {
            token : json.data.token,
            refreshToken : json.data.refreshToken,
            expired: json.data.expired
        }

        const currentUser = {
            name : user.name,
            email : user.email,
            profileUrl: user.photo
        }

        if(!this.user || this.user.email != currentUser){
            const response = await Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/user/myPurposes`)
            .auth(this.userToken.token)
            .submit();

            console.log(response.data)

            await PurposeService.getInstance().initAll(response.data);
            this.user = currentUser;
        }

        AsyncStorage.setItem("USER_TOKEN", JSON.stringify(this.userToken));
        AsyncStorage.setItem("USER_DATA", JSON.stringify(this.user));

        this.isLogin = true;

    }

    getFcmToken = async () => {
        await firebase.messaging().requestPermission();
        return firebase.messaging().getToken();
    }

    @action
    signInByGoogle = async () => {
        try{
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            console.log(userInfo);

            await AsyncStorage.setItem("USER_SOCIAL", 'GOOGLE');
            
            await this.login(userInfo.idToken, userInfo.user);


        }catch(error){
            // this.clearUser();
            // throw error;
            console.log(error)
        }
    }

    @action
    logout = async () => {

        if(!this.isLogin)
            throw '로그인 상태가 아닙니다.';

        console.log(this.userToken.token);

        Request.get(`${GlobalConfig.CATEPLANNER_REST_SERVER.domain}/auth/logout`)
        .auth(this.userToken.token)
        .submit()
        .then(async () => {

            const socialName = AsyncStorage.getItem("USER_SOCIAL");

            switch(socialName){
                case "GOOGLE" :
                    if(await GoogleSignin.isSignedIn()){
                        await GoogleSignin.revokeAccess();
                        await GoogleSignin.signOut();
                    }
                    break;
            }

            this.clearUser();
        })
        .catch((error) => {
            throw error.message ? error.message : error; 
        });

    }

    clearUser = async () => {
        this.isLogin = false;
        this.userToken = null;
        this.user = null;

        AsyncStorage.removeItem("USER_TOKEN");
        AsyncStorage.removeItem("USER_DATA");
        AsyncStorage.removeItem("USER_SOCIAL");
    }

    @action
    getToken = async () => {
        await this.vaildate(this.userToken);
        return this.userToken.token;
    }
}