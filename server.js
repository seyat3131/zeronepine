const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');

dotenv.config();
require('./config/passport')(passport);

const app = express();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Bağlantısı Başarılı: ${conn.connection.host}`);
    } catch (err) {
        console.error(`MongoDB Bağlantı Hatası: ${err}`);
        process.exit(1); 
    }
}
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/api/cekilis', require('./routes/cekilis'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Sunucu ${process.env.NODE_ENV} ortamında ${PORT} portunda çalışıyor.`));
