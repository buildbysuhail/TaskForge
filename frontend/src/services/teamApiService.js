import API from "./api";

// ----------------------------------------
// Team
// ----------------------------------------

export const getMyTeams = async () => {
    const response = await API.get("/teams");
    return response.data;
};

export const createTeam = async (teamData) => {
    const response = await API.post("/teams", teamData);
    return response.data;
};

export const getTeamMembers = async (teamId) => {
    const response = await API.get(`/teams/${teamId}/members`);
    return response.data;
};

export const changeMemberRole = async (teamId, userId, role) => {
    const response = await API.patch(`/teams/${teamId}/members/${userId}/role`,
        { role }
    );
    return response.data;
};

export const removeTeamMember = async (teamId, userId) => {
    const response = await API.delete(`/teams/${teamId}/members/${userId}`);
    return response.data;
};

export const sendTeamInvitation = async (teamId, email) => {
    const response = await API.post(`/teams/${teamId}/invitations`, 
        { email }
    );
    return response.data;
};

// ----------------------------------------
// Team Tasks
// ----------------------------------------

export const getTeamTasks = async (teamId, search = "") => {
    const response = await API.get(`/teams/${teamId}/tasks`,
        {
            params: search ? { search } : {},
        }
    );

    return response.data;
};

export const createTeamTask = async (teamId, taskData) => {
    const response = await API.post(`/teams/${teamId}/tasks`, 
        taskData
    );

    return response.data;
};

export const updateTeamTask = async (teamId, taskId, taskData) => {
    const response = await API.patch(`/teams/${teamId}/tasks/${taskId}`, 
        taskData
    );

    return response.data;
};

export const deleteTeamTask = async (teamId, taskId) => {
    const response = await API.delete(`/teams/${teamId}/tasks/${taskId}`);
    return response.data;
};