import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const connection = SQLite.openDatabase({
    name: 'CaterPlanner.db',
    location: '/rest/CaterPlanner.db'
},
    shchema,
    error => { console.log(error); }
)

function shchema(db) {
    db.transaction(async (txn) => {
        await txn.executeSql(
            `
            create table if not exists purpose(
                id integer primary key,
                name text,
                description text,
                image_url text,
                disclosure_scope integer,
                start_at text,
                decimal_day text,
                stat intger
            )
            `
        );

        await txn.executeSql(
            `
            create table if not exists goal(
                id integer primary key,
                purpose_id integer,
                name textn
                description text,
                start_date text,
                end_date text,
                color text,
                cycle text,
                stat integer,
                foreign key(purpose_id) references purpose(id) on update cascade on delete cascade
            )
            `
        );

        await txn.executeSql(
            `
            create table if not exists briefing(
                purpose_id integer,
                goal_id integer,
                create_at text,
                score integer,
                foreign key(purpose_id) references purpose(id) on update cascade on delete cascade
                foreign key(goal_id) references goal(id) on update cascade on delete cascade,
                primary key(purpose_id, goal_id) 
            )
            `
        )
    })
    .catch((error) => {
        console.log(error);
    })
}

export default {
    getConnection: () => connection
}