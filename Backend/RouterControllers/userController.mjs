import {connectToDatabase, client} from "../db.mjs"
let collection;
async function main(){
    await connectToDatabase();
    const db = client.db("SLUSOCIAL");
    collection = db.collection("Users");
}
export async function checkUser(User){
    //make sure the user does not already exist
    console.log(User.email)
    let item = await collection.findOne({
        "email" : User.email
    })
    
    return (item == null)
    //if item is null the user does not exist
}
export async function addUser(User){
    const result = await collection.insertOne(User);
    console.log(result);
    return result;
}

export async function updateUser(User){
    //gets all the keys => array[keys]
    const keys = Object.keys(User._doc);
    //for each key that does not have a null value (End user does not want to change it) update it in the db. 
    for(const key of keys) {
        if(User[key] == null || key == '_id'){
            continue;
        }
        console.log(key)
        collection.updateOne({"email" : User.email },{
            $set:{
                [key] : User[key]
            }
        })
    }
}
main();
    

    
