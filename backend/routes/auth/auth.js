// this file aims to manage the accounts registration process
// >>> SIGN IN / SIGN UP
app.use('/auth', authRouter); //where authRouter is imported

const  app  =  express();
app.get("/", (req,res)=>{
    res.send("youhou");
})

