import { Fragment } from "react";
import {MongoClient, ObjectId} from 'mongodb'
import MeetupDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";

function MeetupDetails(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name='description'
                content={props.meetupData.description} />
            </Head>
        <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        description={props.meetupData.description}
        address={props.meetupData.address}
        />
        </Fragment>

    )
}

export async function getStaticPaths(){

    const client = await MongoClient.connect('mongodb+srv://userduo:mongodb@cluster0.og718.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollections = db.collection('meetup');

    const meetups = await meetupsCollections.find({}, {_id: 1}).toArray();

    client.close();
    return{
        fallback: false,
        paths: meetups.map(meetup =>(
            {
                params:{
                    meetupId: meetup._id.toString()
                }
            }
        ))
        
        
        // [
        //     {
        //         params:{
        //             meetupId: 'm1'
        //         },
        //     },
        //     {
        //         params:{
        //             meetupId: 'm2'
        //         },
        //     }
        // ]
    }
}

export async function getStaticProps(context){

    const meetupId = context.params.meetupId;
    
    const client = await MongoClient.connect('mongodb+srv://userduo:mongodb@cluster0.og718.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollections = db.collection('meetup');

    const selectedMeetup = await meetupsCollections.findOne({_id: ObjectId(meetupId)})


    console.log(meetupId);
    return{
        props:{
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                description: selectedMeetup.description,
                address: selectedMeetup.address,
                image: selectedMeetup.image
            }
            // meetupData:{ 
            //     image: 'https://images.unsplash.com/photo-1623074716850-ba4c90d49f2f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=344&q=80',
            //     id: meetupId,
            //     title: 'A First Meetup',
            //     desciption: 'The meetup description',
            //     address: '35627, Some Street, City'
            // }
        }
    }
}

export default MeetupDetails;