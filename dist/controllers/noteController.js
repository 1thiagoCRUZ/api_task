const{create:create,getAllNoteUser:getAllNoteUser,deleteNote:deleteNote}=require("../services/notesServices");module.exports={createNote:(e,s)=>{const t=e.body;create(t,((e,t)=>e?(console.log(e),s.status(500).json({success:0,message:"Database connection error"})):s.status(201).json({success:1,message:"Insert note success"})))},getAllNoteUser:(e,s)=>{const t=e.params.id_user;getAllNoteUser(t,((e,t)=>{if(!e)return t?s.json({success:1,data:t}):s.json({success:0,message:"Record not found"});console.log(e)}))},deleteNote:(e,s)=>{const{id_user:t,id_note:o}=e.params;deleteNote({id_user:t,id_note:o},((e,t)=>e?(console.log(e),s.status(500).json({success:0,message:"Internal Server Error",error:e.message})):s.status(200).json({success:1,message:t.message})))}};