require('dotenv').config();
const express=require('express');const cors=require('cors');
const app=express();app.use(cors({origin:process.env.CLIENT_URL||'http://localhost:5173'}));app.use(express.json({limit:'2mb'}));
app.get('/api/health',(req,res)=>res.json({status:'ok',app:'Wattie API'}));
app.use('/api/auth',require('./routes/auth'));app.use('/api/stories',require('./routes/stories'));
app.use((req,res)=>res.status(404).json({message:'Ruta no encontrada.'}));
const port=process.env.PORT||3000;app.listen(port,()=>console.log(`Wattie API en http://localhost:${port}`));
