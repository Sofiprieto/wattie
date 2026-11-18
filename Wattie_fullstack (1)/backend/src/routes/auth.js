const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

router.post('/register', async (req, res) => {
 try {
  const { username, email, password } = req.body;
  if (!username || !email || !password || password.length < 8) return res.status(400).json({message:'Completa los campos. La contraseña debe tener al menos 8 caracteres.'});
  const hash = await bcrypt.hash(password, 12);
  const [result] = await db.execute('INSERT INTO users(username,email,password_hash) VALUES(?,?,?)',[username.trim(),email.trim().toLowerCase(),hash]);
  const token = jwt.sign({id:result.insertId,username},process.env.JWT_SECRET,{expiresIn:'7d'});
  res.status(201).json({token,user:{id:result.insertId,username,email}});
 } catch(e) { res.status(e.code==='ER_DUP_ENTRY'?409:500).json({message:e.code==='ER_DUP_ENTRY'?'Ese usuario o correo ya existe.':'No fue posible crear la cuenta.'}); }
});
router.post('/login', async (req,res)=>{
 try { const {email,password}=req.body; const [rows]=await db.execute('SELECT id,username,email,password_hash FROM users WHERE email=?',[String(email||'').toLowerCase()]);
 if(!rows.length || !(await bcrypt.compare(password||'',rows[0].password_hash))) return res.status(401).json({message:'Correo o contraseña incorrectos.'});
 const user=rows[0]; const token=jwt.sign({id:user.id,username:user.username},process.env.JWT_SECRET,{expiresIn:'7d'}); delete user.password_hash; res.json({token,user});
 } catch {res.status(500).json({message:'Error al iniciar sesión.'});}
});
module.exports=router;
