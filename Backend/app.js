const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());


const dotenv = require('dotenv');
const mongoose = require('mongoose');

{/*===== Koneksi Database =====*/ }
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(connetion => {
    console.log('Terkoneksi...')
});


{/*===== Shcema dan Model mongoose ke Mongodb ======*/ }

const UsersDB = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Masukan Name "],
        unique: true
    },
    email: {
        type: String,
        require: [true, "Masukan email "],
    },
    phone: {
        type: Number,
        require: [true, "Masukan phone"]
    },
    address: {
        type: String,
        require: [true, "Masukan address"]
    }
});

const Users = mongoose.model('Users', UsersDB);




{/*===== Endpoint =====*/ }


const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ exteded: true });


app.get('/', (req, res) => {
    res.status(200)
        .json({ Message: "Welcome To Webservice userApp" })
});

app.post('/user', urlencodedParser, (req, res) => {

    let { name, email, phone, address } = req.body;
    let AddUser = new Users({
        name: name,
        email: email,
        phone: phone,
        address: address
    });

    AddUser.save().then(data => {
        res.status(200).send("User Berhasil Ditambahkan" + data);
    }).catch(err => {
        res.status(500).send("User Gagal Ditambahkan :( " + err)
    });

});


app.get('/user/list', async (req, res) => {
    let data = await Users.find();
    res.status(200).send(data)
});




app.get('/user/:name', async (req, res) => {
    console.log("ini Query " + req.query);
    console.log("ini params " + req.params.name)

    let name = req.params.name;


    let dataHasil = await Users.find({ name: { $regex: name, $options: 'i' } });
    res.status(200).json(dataHasil)
});




app.listen(port, () => {
    console.log(`Server sedang berjalan :)`);
}); 