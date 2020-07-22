import { inject } from 'mobx-react';
import { action } from 'mobx';
import Purpose from '../model/Purpose';


@inject(['sqliteManager'])
class PurposeRepository {
    
    constructor(props){
        super(props);
        this.connection = this.props.sqliteManager.connection;
    }

    @action
    insert = (purpose, author, group, detailPlanHeaderId) => {
       this.connection.executeSql(
           'insert into purpose values (? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)',
           [purpose.id, author ? author.name : null , author ? author.Id : null , group ? group.name : null, group ? group.id : null,
            purpose.name, purpose.description, purpose.imageUrl, purpose.disclosureScope,
            purpose.startAt, purpose.decimalDay, detailPlanHeaderId],
            (tx, result) =>{
                return result.rowsAffected > 0 ? true : false; 
            }
       );
    }

    @action
    selectById = (id) => {
        this.connection.executeSql(
            'select * from purpose where id = ?',
            [id],
            (tx, result) => {
                if(result.rows.length == 0)
                    return null;
                let res = result.rows.get(0);
                return new Purpose(res.id,res.authorName,res.authorId, res.groupName, res.groupId, res.name, 
                    res.description, res.imageUrl, res.disclosureScope, res.startAt, res.decimalDay, res.detailPlanHeaderId);
            }
        )
    }



    @action
    updatePurposeData = (id, purpose) => {
        this.connection.executeSql(
            'update purpose '+
            'set name = ?, description = ?, image_url = ?, disclosure_scope = ?, start_at = ?, decimal_day = ?, detailplan_header_id = ? '+
            'from purpose '+
            'where id = ?',
            [purpose.name, purpose.description, purpose.imageUrl, purpose.disclosureScope, purpose.startAt, purpose.decimalDay, purpose.detailPlanHeaderId, id],
            (tx, result) =>{
                return result.rowsAffected > 0 ? true : false; 
            }
        )
    }

    @action
    deleteById = (id) => {
        this.connection.executeSql(
            'delete from where id = ?',
            [id],
            (tx, result) =>{
                return result.rowsAffected > 0 ? true : false; 
            }
        )
    }
    

}