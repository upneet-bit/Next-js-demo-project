//  /api/new-meetup
import {MongoClient} from 'mongodb'

async function Handler(req, res){
    if(req.method =='POST'){
        const data = req.body;

        const { title,image,description, address } = data;
        const client = await MongoClient.connect('mongodb+srv://userduo:mongodb@cluster0.og718.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();

        const meetupsCollections = db.collection('meetup');

        const result = await meetupsCollections.insertOne(data);
        console.log(result);

        client.close();

        res.status(201).json({ message: 'Meetup Inserted'});
    }
}

export default Handler; 