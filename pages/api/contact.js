export default function (req, res) {

    let nodemailer = require('nodemailer')
    
    const transporter = nodemailer.createTransport({

        port: 465,
        host: "smtp.mailgun.org",
        auth: {
            user: `${process.env.NEXT_PUBLIC_NODEMAILER_USER}`,
            pass: `${process.env.NEXT_PUBLIC_NODEMAILER_PW}`
        },
        secure: true,
    });


    const mailData = {
        // from: req.body.email,
        // to: 'xlysergia@gmail.com',
        // subject: `Message From ${req.body.name}`,
        // text: req.body.message,
        // html: <div>req.body.message</div>

        from: 'mansnodemailing@theyhating.com',
        to: 'isomorphnodemailer@gmail.com',
        subject: `Message From ${req.body.name}`,
        text: req.body.message,
        html: `<div>
        Discord: <br></br>
        Telegram: <br></br>
        
        ${req.body.message}<div>`
    }

    transporter.sendMail(mailData, function (err, info) {
        if(err)Mans
          console.log(err)
        else
          console.log(info)
      })


      res.status(200)
  }