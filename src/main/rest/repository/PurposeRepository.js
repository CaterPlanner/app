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
       return this.connection.executeSql(
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
        return this.connection.executeSql(
            'select id "id", author_name "authorName", author_id "authorId", group_name "groupName", group_id "groupId", name "name" '+
            'description "description", image_url "imageUrl", disclosure_scope "disclosureScope", decimal_day "decimalDay", detailplan_heder_id "detailPlanHeaderId" '+
            'from purpose where id = ?',
            [id],
            (tx, result) => {
                if(result.rows.length == 0)
                    return null;
                let res = result.rows.get(0);
                return new Purpose(res.id,res.authorName,res.authorId, res.groupName, res.groupId, res.name, 
                    res.description, res.imageUrl, res.disclosureScope, res.startAt, res.decimalDay, res.detailPlanHeaderId);
            }
        );
    }

    @action
    selectByStatIsActive = () => {
        return this.connection.executeSql(
            'select id "id", author_name "authorName", author_id "authorId", group_name "groupName", group_id "groupId", name "name" '+
            'description "description", image_url "imageUrl", disclosure_scope "disclosureScope", decimal_day "decimalDay", detailplan_heder_id "detailPlanHeaderId" '+
            'from purpose where stat = 0',
            [],
            (tx, result) => {
                if(result.rows.length == 0)
                    return null;
                return result.rows.map((row) => {
                    return new Purpose(row.id, row.authorName, row.authorId, row.groupName, row.groupId, row.name,
                        row.description, row.imageUrl, row.disclosureScope, row.startAt, row.decimalDay, row.detailPlanHeaderId);
                })
            }
        );
    }


    @action
    updatePurposeData = (id, purpose) => {
        return this.connection.executeSql(
            'update purpose '+
            'set name = ?, description = ?, image_url = ?, disclosure_scope = ?, start_at = ?, decimal_day = ?, detailplan_header_id = ? '+
            'from purpose '+
            'where id = ?',
            [purpose.name, purpose.description, purpose.imageUrl, purpose.disclosureScope, purpose.startAt, purpose.decimalDay, purpose.detailPlanHeaderId, id],
            (tx, result) =>{
                return result.rowsAffected > 0 ? true : false; 
            }
        );
    }

    @action
    deleteById = (id) => {
        return this.connection.executeSql(
            'delete from where id = ?',
            [id],
            (tx, result) =>{
                return result.rowsAffected > 0 ? true : false; 
            }
        );
    }
    

}