const express = require('express')
const app = express()
const port = process.env.PORT
const nodemailer = require("nodemailer");
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const smtp_login = process.env.SMTP_LOGIN || ''
const smtp_password = process.env.SMTP_PASSWORD || ''

app.get('/', (req, res) => {
    res.send('Hello World!')
})


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password, // generated ethereal password
    },
});

// let {massage, name, mail} = req.body

app.post('/sendMassage', async (req, res) => {
    // send mail with defined transport object
    let {name, email, message} = req.body
    await transporter.sendMail({
        from: 'may be HR', // sender address
        to: 'dailinet10@gmail.com', // list of receivers
        subject: "Hello from HR ✔", // Subject line
        html: `<b>Massage from My Portfolio</b>
    <div>name: ${name}</div>
    <div>from mail: ${email}</div>
    <div>${message}</div>`
})
    res.send(req.body)

})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})