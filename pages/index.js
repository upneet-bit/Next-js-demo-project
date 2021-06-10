import React, { Fragment } from 'react'
import Head from 'next/head'
import {MongoClient} from 'mongodb'
import MeetupList from '../components/meetups/MeetupList';

// const DUMMY_MEETUPS=[
//     {
//         id: 'm1',
//         title: 'A First Meetup',
//         image: 'https://thumbs.dreamstime.com/z/panorama-beautiful-green-forest-summer-nature-scenery-yellow-wild-flowers-panorama-beautiful-green-forest-landscape-131579660.jpg',
//         address: 'Some address 5,23545 Some city',
//         description: 'This is a first meetup'
//     },
//     {
//         id: 'm2',
//         title: 'A Second Meetup',
//         image: 'https://images.unsplash.com/photo-1623169389761-f4c60ee92d9d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
//         address: 'Some address 5,23545 Some city',
//         description: 'This is a Second meetup'
//     },
//     {
//         id: 'm3',
//         title: 'A Third Meetup',
//         image: 'https://images.unsplash.com/photo-1623074716850-ba4c90d49f2f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=344&q=80',
//         address: 'Some address 5,23545 Some city',
//         description: 'This is a Third meetup'
//     }
// ]

function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name='description'
                content="This is  react meetups page" />
            </Head>
                <MeetupList meetups={props.meetups} />
        </Fragment>
    )
}


export async function getStaticProps(){
    // fetch data from API

    const client = await MongoClient.connect('mongodb+srv://userduo:mongodb@cluster0.og718.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollections = db.collection('meetup');

    const meetups = await meetupsCollections.find().toArray();  

    client.close();

    return{
        props:{
            meetups: meetups.map((meetup) =>({
                title: meetup.title,
                address: meetup.address,
                id: meetup._id.toString(),
                image: meetup.image
            })),
        },
    }
}

export default HomePage;