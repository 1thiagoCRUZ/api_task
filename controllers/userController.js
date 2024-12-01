const { createUser, getAllUsers } = require("../services/userServices");
const supabase = require("../config/database");

module.exports = {
    createUser: async (req, res) => {
        const { adminId, email, name, avatar_url, phone, institution, type, password } = req.body;

        if (!adminId) {
            return res.status(400).json({
                success: 0,
                message: "Admin ID is required",
            });
        }

        if (!email || !name || !password) {
            return res.status(400).json({
                success: 0,
                message: "Email, name, and password are required",
            });
        }

        try {
            const { data: adminData, error } = await supabase
                .from("users")
                .select("id, type")
                .eq("id", adminId)
                .single();

            if (error || !adminData || adminData.type !== "admin") {
                return res.status(403).json({
                    success: 0,
                    message: "Only admins can create users.",
                });
            }

            const userData = {
                email,
                name,
                avatar_url,
                phone,
                institution,
                type: type || "user", 
                password
            };

            createUser(userData, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        success: 0,
                        message: "Error creating user",
                    });
                }
                return res.status(201).json({
                    success: 1,
                    message: "User created successfully",
                });
            });
        } catch (err) {
            console.error("Error during admin check:", err.message);
            return res.status(500).json({
                success: 0,
                message: "Internal Server Error",
            });
        }
    },

    getAllUsers: (req, res) => {
        const { id_user: current_user_id } = req.params;
    
        if (!current_user_id) {
            return res.status(400).json({
                success: 0,
                message: "User ID is required",
            });
        }
    
        getAllUsers(current_user_id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Internal Server Error",
                    error: err.message,
                });
            }
    
            return res.status(200).json(results);
        });
    },
    
};
