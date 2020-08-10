import {AsyncStorage} from 'react-native'
import {observable, action} from 'mobx';
import {GoogleSignin} from '@react-native-community/google-signin';
import {request} from '../../util/Network';

import firebase from 'react-native-firebase';

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
            offlineAccess: false,
            forceCodeForRefreshToken: true,
        });

    }


    @action
    vaildate = async (userToken) => {

        try{
            if(new Date(userToken.expired) < new Date()){

                request.post('http://localhost:8080/auth/refreshToken', {
                    token : userToken.token,
                    refreshToken : userToken.refreshToken
                })
                .auth(userToken.token)
                .submit()
                .then(async (response) => {

                    console.log("BackEnd Server Return In vaildate")
                    console.log(response);
     

                    //refreshToken 인증 성공 후 새로운 refreshToken, expired 저장
                    this.userToken = {
                        token : response.token,
                        refreshToken : response.refreshToken,
                        expired: response.expired
                    };

                    AsyncStorage.setItem("USER_TOKEN", JSON.stringify(this.userToken));

                    if(!this.isLogin){
                        this.isLogin = true;
                        this.user = JSON.parse(await AsyncStorage.getItem("USER_DATA"));
                    }
                })
                .catch((error) => {
                    throw error;
                })

            }else if(!this.isLogin){
                this.isLogin = true;
                this.user = JSON.parse(await AsyncStorage.getItem("USER_DATA"));
            }

        }catch(e){
            console.log(e);
            alert('토큰 인증에 실패하였습니다.');
            
            if(this.isLogin){
               this.clearUser();
            }

            throw e;

        }
    }

    @action
    signInByGoogle = async () => {
        try{
            const userInfo = await GoogleSignin.signIn();

            console.log(userInfo);

            await firebase.messaging().requestPermission();
            const fcmToken = await firebase.messaging().getToken();

            request.post('http://localhost:5252/auth/google', {
                idToken : userInfo.idToken,
                fcmToken : fcmToken
            })
            .submit()
            .then((response) => {
 
               console.log("BackEnd Server Return IN signInByGoogle")
               console.log(response);

                this.userToken = {
                    token : response.token,
                    refreshToken : response.refreshToken,
                    expired: response.expired
                };
                AsyncStorage.setItem("USER_TOKEN", JSON.stringify(this.userToken));
                AsyncStorage.setItem("USER_DATA", JSON.stringify(userInfo.user));
                this.isLogin = true;
            })
            .catch((error) => {
                throw error;
            })

        }catch(error){
            console.log(error);
            this.clearUser();
        }
    }

    @action
    logout = async () => {

        request.post('http://localhost:5252/auth/logout')
        .auth(this.userToken.token)
        .submit()
        .then(() => {
            console.log("Logout Compelete")
            this.clearUser();
        })
        .catch((error) => {
            throw error;
        })

    }

    clearUser = () => {
        this.isLogin = false;
        this.userToken = null;
        this.user = null;

        AsyncStorage.removeItem("USER_TOKEN");
        AsyncStorage.removeItem("USER_DATA");
    }

    @action
    getToken(){
        return (async () => {
            await this.vaildate(this.userToken);
            return this.userToken.token;
        })();
    }

}