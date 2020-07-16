import connection from '../../sqlite/Connection';

class ObjectionDao {

    static get instance(){
        if(!this[singleton]){
            this[singleton] = new ObjectionDao();
        }
        return this[singleton];
    }

    findById(id){
        
        

    }
}