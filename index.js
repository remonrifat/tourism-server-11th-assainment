const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tanph.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {
    try {
        await client.connect();
        const database = client.db("travelmaster");
        const usersCollection = database.collection("users");
        // post api
        app.post('/users', async (req, res) => {


            const users = {
                "title": "Cinque Terre ",
                "imageUrl": "https://media.tacdn.com/media/attractions-splice-spp-360x240/07/3c/5a/45.jpg",
                "description": "The trip to Cinque Terre was well organized and the guides were professional, fun, informative, friendly, caring, concerned for our safety and very helpful. Both Alberto, our guide, and Diego were fabulous. Having great guides makes all the difference in having a great time when on an"
            }
            const result = await usersCollection.insertOne(users);
            console.log(result);

            // const cursor = usersCollection.find({});
            // const users = await cursor.toArray();
            // res.send('users');
        });
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Emaftyut jon server is running');
});


app.listen(port, () => {
    console.log('server running port', port);
})


// use id pass
// myassainment11monserver
// VeLbW4gwu5ptI2gd



