const supabase=require("../config/database");module.exports={create:async(e,s)=>{const{title_note:r,description_note:t,user_id_note:o,color_note:n}=e,{data:a,error:c}=await supabase.from("notes_users").insert([{title_note:r,description_note:t,user_id_note:o,color_note:n}]);return c?s(c):s(null,a)},deleteNote:async(e,s)=>{try{const{id_user:r,id_note:t}=e,{data:o,error:n}=await supabase.from("notes_users").delete().eq("user_id_note",r).eq("id",t);if(n)throw n;return o&&0!==o.length?s(null,{success:1,message:"Note deleted successfully",data:o}):s(null,{success:1,message:"Note deleted successfully"})}catch(e){return console.error("Error deleting note:",e.message),s({success:0,message:"Internal Server Error",error:e.message})}},getAllNoteUser:async(e,s)=>{try{const{data:r,error:t}=await supabase.from("notes_users").select("id, title_note, description_note, color_note").eq("user_id_note",e);if(t)throw t;return r&&0!==r.length?s(null,{success:1,data:r}):s({success:0,message:"No notes found for this user"})}catch(e){return console.error("Error fetching notes:",e.message),s({success:0,message:"Internal Server Error",error:e.message})}}};