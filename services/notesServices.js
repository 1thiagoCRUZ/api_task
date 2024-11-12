const supabase = require("../config/database")

module.exports = {
    create: async (data, callback) => {
        const { title_note, description_note, user_id_note } = data;

        const { data: results, error } = await supabase
            .from('notes_users')
            .insert([
                {
                    title_note,
                    description_note,
                    user_id_note,
                }
        ]);
    
    if (error) {
        return callback(error);
    }
    return callback(null, results);
    },

    deleteNote: async (data, callback) => {
        try {
            const { id_user, id_note } = data;

            const { data: deletedData, error } = await supabase
                .from('notes_users')
                .delete()
                .eq('user_id_note', id_user)
                .eq('id', id_note);
            
            if (error) {
                throw error;
            }

            if (!deletedData || deletedData.length === 0) {
                return callback(null, {
                    success: 1,
                    message: "Note deleted successfully"
                });
            }
            
            return callback(null, {
                success: 1,
                message: "Note deleted successfully",
                data: deletedData
            });
        } catch (err) {
            console.error('Error deleting note:', err.message);
            return callback({
                success: 0,
                message: 'Internal Server Error',
                error: err.message
            });
        }
    },

    getAllNoteUser: async (id_user, callBack) => {
        try {
            const { data, error } = await supabase
                .from('notes_users')
                .select('id, title_note, description_note')
                .eq('user_id_note', id_user)
            
            if (error) {
                throw error;
            }

            if (!data || data.length === 0) {
                return callBack({
                    success: 0,
                    message: "No notes found for this user"
                })
            }

            return callBack(null, {
                success: 1,
                data: data
            });
        } catch (err) {
            console.error('Error fetching notes:', err.message);
            return callBack({
                success: 0,
                message: 'Internal Server Error',
                error: err.message
            });
        };
    },
};