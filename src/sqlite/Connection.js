import { openDatabase } from 'react-native-sqlite-storage';

const Connection = openDatabase({ name: 'CaterPlanner.db'}, 
    (db) => {
      db.transaction( tx => {
        tx.exeuteSql('DROP TABLE IF EXISTS goal_header')
        tx.exeuteSql(
            `
            CREATE TABLE goal_header(
                id integer primary key,
                author_id integer,
                author_name text,
                base_id integer
            )
            `
        )
        tx.exeuteSql('DROP TABLE IF EXISTS goal')
        tx.exeuteSql(
            `
            CREATE TABLE goal(
                key integer auto_increment,
                header_id integer not null,
                constructor_key integer not null,
                constructor_relation_type text not null,
                name text not null,
                type text not null,
                start_date text not null,
                end_date date not null,
                color text not null,
                cycle text not null,
                stat integer not null,
                foreign key(header_id) references goal_header(id)
                primary key (key, header_id)
            )
            `
        )
        tx.exeuteSql('DROP TABLE IF EXISTS briefing')
        tx.exeuteSql(
            `
            CREATE TABLE briefing(
                header_id integer,
                goal_key id integer,
                create_at text not null,
                score text not null,
                primary key (header_id, goal_key)
                foreign key(header_id) references goal_header(id)
            )
            `
        )
        tx.exeuteSql('DROP TABLE IF EXISTS objection')
        tx.exeuteSql(
            `
            CREATE TABLE objection(
                id integer primary key,
                author_name text,
                author_id integer,
                group_name text,
                group_id integer,
                name text not null
                description text not null,
                image_url text not null,
                disclosure_scope integer not null,
                start_at text not null,
                decimal_day text not null,
                goal_id integer,
                foreign key(goal_id) references goal_header(id)
            )
            `
        )

      });

    }
);

export default Connection;