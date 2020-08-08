import React, {Component} from 'react';

import ProfileNavigation from '../../navigation/ProfileNavigation'

export default class MyProfile extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <ProfileNavigation/>
        )
    }
}
