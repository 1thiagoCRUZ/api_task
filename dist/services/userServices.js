const supabase=require("../config/database");module.exports={createUser:async(e,r)=>{const{email:s,name:a,avatar_url:t,phone:n,institution:o,type:u,password:c}=e;try{const{data:e,error:i}=await supabase.auth.signUp({email:s,password:c});return i?r(i):(await supabase.from("users").insert([{email:s,name:a,avatar_url:t,phone:n,institution:o,type:u||"user",user_id:e.user.id}]),r(null,e))}catch(e){return console.error("Error creating user:",e.message),r({success:0,message:"Internal Server Error",error:e.message})}},getAllUsers:async e=>{try{const{data:r,error:s}=await supabase.from("users").select("email, name, avatar_url, phone, institution, type");if(s)throw s;return r&&0!==r.length?e(null,{success:1,data:r}):e({success:0,message:"No users found"})}catch(r){return console.error("Error fetching users:",r.message),e({success:0,message:"Internal Server Error",error:r.message})}}};