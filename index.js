const express =  require('express');
const Startup = require('./middlewares/startup');
const { User } = require('./models/user');

const app = express();
Startup(app);


app.post("/api/register", async (req,res)=>{
    const isExist = await User.findOne({nik: req.body.nik});
    if(isExist) return res.status(400).send({error: "Pasien dengan NIK ini sudah terdaftar"})
    const newUser = new User({
        nik:req.body.nik,
        password: req.body.password,
        name: req.body.name
    });

    const result = await newUser.save()

    res.send(result);
});

app.post("/api/login", async (req,res)=>{
    const isExist= await User.findOne({nik:req.body.nik});
    if (!isExist) return res.status(400).send({error: "NIK dan Password tidak valid !!"});

    if (isExist.password !== req.body.password) 
        return res.status(400).send({error: "NIK dan Password tidak valid !!"});

    res.send(isExist);
});


app.post("/api/data/:nik", async (req,res)=>{
    const isExist = await User.findOne({nik:req.params.nik});
    if (!isExist) return res.status(404).send({error: "pasien dengan nik ini tidak ditemukan"});

    isExist.data.push({
        suhu: req.body.suhu || 0,
        tinggi: req.body.tinggi || 0,
        berat: req.body.berat || 0,
        detak: req.body.detak || 0,
    });
    const result = await isExist.save();

    res.send(result);
});

app.get("/api/data/:nik", async (req, res) => {
    const result = await User.find({nik: req.params.nik});
    if (!result) return res.status(404).send({error: "pasien dengan nik ini tidak ditemukan"});

    res.send(result);
})


app.listen(8888, () => console.log("This app is listening on port 8888"));