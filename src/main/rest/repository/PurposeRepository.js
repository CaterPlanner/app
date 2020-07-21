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
       this.dbConnection.executeSql(
           'insert into purpose values (? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)',
           [purpose.id, purpose.authorName, purpose.authorId, purpose.groupName, purpose.groupId,
            purpose.name, purpose.description, purpose.imageUrl, purpose.disclosureScope,
            purpose.startAt, purpose.decimalDay, purpose.goalHeaderId]
       );
    }

    @action
    selectById = (id) => {
        return this.dbConnection.executeSql(
            'select * from purpose where id = ?',
            [id],
            (tx, result) => {
                return new Purpose(id,authorName,authorId, groupName, groupId, name, description, imageUrl, disclosureScope, startAt, decimalDay, goalHeaderId);
            }
        )
    }

}