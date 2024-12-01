const{createUser:createUser,getAllUsers:getAllUsers}=require("../services/userServices"),supabase=require("../config/database");module.exports={createUser:async(s,e)=>{const{adminId:r,email:a,name:t,avatar_url:n,phone:c,institution:o,type:u,password:i}=s.body;if(!r)return e.status(400).json({success:0,message:"Admin ID is required"});if(!a||!t||!i)return e.status(400).json({success:0,message:"Email, name, and password are required"});try{const{data:s,error:l}=await supabase.from("users").select("id, type").eq("id",r).single();if(l||!s||"admin"!==s.type)return e.status(403).json({success:0,message:"Only admins can create users."});createUser({email:a,name:t,avatar_url:n,phone:c,institution:o,type:u||"user",password:i},((s,r)=>s?(console.error(s),e.status(500).json({success:0,message:"Error creating user"})):e.status(201).json({success:1,message:"User created successfully"})))}catch(s){return console.error("Error during admin check:",s.message),e.status(500).json({success:0,message:"Internal Server Error"})}},getAllUsers:(s,e)=>{getAllUsers(((s,r)=>s?(console.log(s),e.status(500).json({success:0,message:"Internal Server Error",error:s.message})):e.status(200).json(r)))}};