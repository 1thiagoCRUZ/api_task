const supabase = require("../config/database");

module.exports = {
    sendMessage: async (data, callback) => {
        const { sender_id, receiver_id, message } = data;

        const { data: results, error } = await supabase
            .from("messages")
            .insert([
                {
                    sender_id,
                    receiver_id,
                    message,
                },
            ]);

        if (error) {
            return callback(error);
        }
        return callback(null, results);
    },

    getMessages: async (data, callback) => {
        const { user_id, other_user_id } = data;

        try {
            const { data: results, error } = await supabase
                .from("messages")
                .select("*")
                .or(
                    `and(sender_id.eq.${user_id},receiver_id.eq.${other_user_id}),and(sender_id.eq.${other_user_id},receiver_id.eq.${user_id})`
                )
                .order("created_at", { ascending: true });

            if (error) {
                throw error;
            }

            if (!results || results.length === 0) {
                return callback(null, {
                    success: 0,
                    message: "No messages found",
                });
            }

            return callback(null, {
                success: 1,
                data: results,
            });
        } catch (err) {
            console.error("Error fetching messages:", err.message);
            return callback({
                success: 0,
                message: "Internal Server Error",
                error: err.message,
            });
        }
    },
};