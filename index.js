const express=require('express')
const ejs=require('ejs')
const path=require('path')
const qrcode=require('qrcode')
const app=express()
const port=process.env.port||3000;

app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs')       //telling the app to use ejs as a  view engine
app.set('views',path.join(__dirname,'view'))   //this tells that views will be finded under __dirname,view
app.use(express.static("public"))
app.get('/',(req,res,next)=>{
    res.render('index')   //we used render because we are using ejs
})


app.post('/scan',(req,res,next)=>{
    const input_text=req.body.text      //because textarea has name text
    console.log(input_text);
    qrcode.toDataURL(input_text,(err,src)=>{
        res.render('scan',{
            qr_code:src,
        })
    })
})
app.listen(port,console.log(`Listening on port ${port}`)) 