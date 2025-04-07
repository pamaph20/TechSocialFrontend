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

export async function requestFriend(userID, friendID){
    //when you request to follow someone
    collection.updateOne({"username" : friendID},
        {$push:{
            "pendingFriends" : userID
    }}
    )
}

export async function addFriend(userID, friendID){
    //when someone accepts a friend request, have to both to update both friend lists
    collection.updateOne({"username" : userID},{
        $push:{
            "friends": friendID
        }
    })
    collection.updateOne({"username" : friendID},{
        $push:{
            "friends": userID
        }
    })
}
main();
    

    
