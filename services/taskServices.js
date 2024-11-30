const supabase = require("../config/database");
const { getAllTaskUser, deleteTask, createTask, getTasksByStatus, updateTaskStatus } = require("../controllers/taskController");

module.exports = {
    create: async (data, callBack) => {
        const { user_id_task, title_task, description_task, prioridade, data_final, status_task } = data;

        const { data: results, error } = await supabase
            .from('tasks_users')
            .insert([
                {
                    user_id_task,
                    title_task,
                    description_task,
                    prioridade,
                    data_final,
                    status_task,
                }
            ]);

        if (error) {
            return callBack(error);
        }

        return callBack(null, results);
    },

    deleteTask: async (data, callBack) => {
        try {
            const { id_user, id_task } = data;

            const { data: deletedData, error } = await supabase
                .from('tasks_users')
                .delete()
                .eq('user_id_task', id_user)
                .eq('id', id_task);

            if (error) {
                throw error;
            }

            if (!deletedData || deletedData.length === 0) {
                return callBack(null, {
                    success: 1,
                    message: "Task deleted successfully"
                });
            }

            return callBack(null, {
                success: 1,
                message: "Task deleted successfully",
                data: deletedData
            });

        } catch (err) {
            console.error('Error deleting task:', err.message);
            return callBack({
                success: 0,
                message: 'Internal Server Error',
                error: err.message
            });
        }
    },


    getAllTaskUser: async (id_user, callBack) => {
        try {

            const { data, error } = await supabase
                .from('tasks_users')
                .select('id, title_task, description_task, prioridade, data_final, status_task')
                .eq('user_id_task', id_user)

            if (error) {
                throw error;
            }


            if (!data || data.length === 0) {
                return callBack({
                    success: 0,
                    message: "No tasks found for this user"
                });
            }


            return callBack(null, {
                success: 1,
                data: data
            });
        } catch (err) {
            console.error('Error fetching tasks:', err.message);
            return callBack({
                success: 0,
                message: 'Internal Server Error',
                error: err.message
            });
        };
    },

    getTasksByStatus: async (id_user, status, callBack) => {
        try {
            const { data, error } = await supabase
                .from('tasks_users')
                .select('id, title_task, description_task, prioridade, data_final, status_task')
                .eq('user_id_task', id_user)
                .eq('status_task', status);

            if (error) {
                throw error;
            }

            if (!data || data.length === 0) {
                return callBack({
                    success: 0,
                    message: `No tasks found for this user with status: ${status}`
                });
            }

            return callBack(null, {
                success: 1,
                data: data
            });
        } catch (err) {
            console.error('Error fetching tasks by status:', err.message);
            return callBack({
                success: 0,
                message: 'Internal Server Error',
                error: err.message
            });
        }
    },

    updateTaskStatus: async (data, callBack) => {
        try {
            const { id_user, id_task, new_status } = data;
    
            const { error } = await supabase
                .from('tasks_users')
                .update({ status_task: new_status })
                .eq('user_id_task', id_user)
                .eq('id', id_task);
    
            if (error) {
                throw error;
            }
    
           
            return callBack(null, {
                success: 1,
                message: "Status updated successfully"
            });
            
        } catch (err) {
            console.error('Error updating task status:', err.message);
            return callBack({
                success: 0,
                message: 'Internal Server Error',
                error: err.message
            });
        }
    },    
};
