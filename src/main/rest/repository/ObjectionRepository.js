import connection from '../../sqlite/SQLiteManager';
import { inject } from 'mobx-react';
import { action } from 'mobx';
import Objection from '../model/Objection';


@inject(['sqliteManager'])
class ObjectionRepository {
    
    constructor(props){
        super(props);
        this.dbConnection = this.props.sqliteManager.connection;
    }

    @action
    save = (objection) => {
       this.dbConnection.executeSql(
           'insert into objection' +
           '(author_name, author_id, group_name, group_id, name, description, image_url '+
           'disclosure_scope, start_at, decimal_day, goal_hedaer_id) '+
           'values (? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)',
           [objection.authorName, objection.authorId, objection.groupName, objection.groupId,
            objection.name, objection.description, objection.imageUrl, objection.disclosureScope,
            objection.startAt, objection.decimalDay, objection.goalHeaderId]
       );
    }

    @action
    selectById = (id) => {
        return this.dbConnection.executeSql(
            'select * from objection where id = ?',
            [id],
            (tx, result) => {
                return new Objection(id,authorName,authorId, groupName, groupId, name, description, imageUrl, disclosureScope, startAt, decimalDay, goalHeaderId);
            }
        )
    }

}