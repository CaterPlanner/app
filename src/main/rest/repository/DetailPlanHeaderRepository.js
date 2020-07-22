import { inject } from 'mobx-react';
import { action } from 'mobx';


@inject(['sqliteManager'])
class DetailPlanHeaderRepository {
    
    constructor(props){
        super(props);
        this.connection = this.props.sqliteManager.connection
    }

    @action
    insert = (author, baseId) => {
        return this.connection.executeSql(
            'insert into detailplan_header values(?, ?, ?)',
            [author ? author.Id : null, author ? author.name : null, baseId],
            (tx, result) => {
                return this.connection.sql(
                    'select last_insert_rowid() "id"',
                    [],
                    (tx, result) => {
                        return result.rows.item(0).id;
                    }
                ) 
            }
        )
    }


}