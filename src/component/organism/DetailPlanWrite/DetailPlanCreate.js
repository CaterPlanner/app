import React, {Component} from 'react'
import {View, Text} from 'react-native'
import { observer } from 'mobx-react';
import useStores from '../../../mobX/helper/useStores'

const DetailPlanCreate = observer(() => {
    const {detailPlanStroe} = useStores();
    const data = detailPlanStroe.listByActiveShowKey;
    return(
        {
            data
        }
    )
})

export default DetailPlanCreate;


