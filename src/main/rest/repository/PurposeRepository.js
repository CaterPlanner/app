import connection from '../../sqlite/SQLiteManager';
import { inject } from 'mobx-react';
import { action } from 'mobx';
import Purpose from '../model/Purpose';


@inject(['sqliteManager'])
class PurposeRepository {
    
    constructor(props){
        super(props);
        this.dbConnection = this.props.sqliteManager.connection;
    }

    @action
    save = (purpose) => {
       this.dbConnection.sql(
           'insert into purpose values (? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)',
           [purpose.id, purpose.authorName, purpose.authorId, purpose.groupName, purpose.groupId,
            purpose.name, purpose.description, purpose.imageUrl, purpose.disclosureScope,
            purpose.startAt, purpose.decimalDay, purpose.detailPlanHeaderId]
       );
    }

    @action
    selectById = (id) => {
        return this.dbConnection.sql(
            'select * from purpose where id = ?',
            [id],
            (tx, result) => {
                return new Purpose(id,authorName,authorId, groupName, groupId, name, description, imageUrl, disclosureScope, startAt, decimalDay, detailPlanHeaderId);
            }
        )
    }

    @action
    updatePurposeData = (id, purpose) => {
        return this.dbConnection.sql(
            'update purpose '+
            'set name = ?, description = ?, image_url = ?, disclosure_scope = ?, start_at = ?, decimal_day = ?, detailplan_header_id = ? '+
            'from purpose '+
            'where id = ?',
            [purpose.name, purpose.description, purpose.imageUrl, purpose.disclosureScope, purpose.startAt, purpose.decimalDay, purpose.detailPlanHeaderId, id]
        )
    }

    @action
    deleteById = (id) => {
        return this.dbConnection.sql(
            'delete from where id = ?',
            [id]
        )
    }
    

}