const supabase = require("../config/database");

module.exports = {
    create: async (data, callBack) => {
        const { user_id_task, title_task, description_task, prioridade, data_final } = data;

        const { data: results, error } = await supabase
            .from('tasks_users')
            .insert([
                {
                    user_id_task,
                    title_task,
                    description_task,
                    prioridade,
                    data_final,
                }
            ]);

        if (error) {
            return callBack(error);
        }
        
        return callBack(null, results);
    },
    
};
