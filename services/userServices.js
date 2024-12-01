const supabase = require("../config/database");


module.exports = {
    createUser: async (data, callback) => {
        const { email, name, avatar_url, phone, institution, type, password } = data;

        try {
            // Usando o método supabase.auth.signUp para incluir a senha
            const { data: result, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                return callback(error);
            }

            // Após criar o usuário com a senha, podemos salvar dados adicionais no banco
            await supabase
                .from("users")
                .insert([{
                    email,
                    name,
                    avatar_url,
                    phone,
                    institution,
                    type: type || "user", // Define padrão como 'user', se não for fornecido
                    user_id: result.user.id, // Associando o ID do usuário criado
                }]);

            return callback(null, result);
        } catch (err) {
            console.error("Error creating user:", err.message);
            return callback({
                success: 0,
                message: "Internal Server Error",
                error: err.message,
            });
        }
    },

    getAllUsers: async (current_user_id, callback) => {
        try {
            const { data: users, error } = await supabase
                .from("users")
                .select("id, email, name, avatar_url, phone, institution, type")
                .neq("id", current_user_id); // Exclui o usuário atual
    
            if (error) {
                throw error;
            }
    
            if (!users || users.length === 0) {
                return callback({
                    success: 0,
                    message: "No users found",
                });
            }
    
            return callback(null, {
                success: 1,
                data: users,
            });
        } catch (err) {
            console.error("Error fetching users:", err.message);
            return callback({
                success: 0,
                message: "Internal Server Error",
                error: err.message,
            });
        }
    },    
    
};
