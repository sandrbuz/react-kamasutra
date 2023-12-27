import axios from "axios";



export const axiosInstance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "59f84030-c446-4a6c-adc2-2bc5e3751fd7"
    }

})


export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => { return response.data })
    },
    follow(userId) {                                        
        return axiosInstance.post(`follow/${userId}`)
            .then(response => { return response.data })
    },
    unfollow(userId) {                                       
        return axiosInstance.delete(`follow/${userId}`)
            .then(response => { return response.data })
    },
    getProfile(userId) {
        console.warn('Obsolete method.Please profileApi object')
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId) {
        return axiosInstance.get(`profile/` + userId)
            .then(response => { return response.data })
    },
    getStatus(userId){
       return axiosInstance.get(`profile/status/` + userId)
       .then(response => { return response.data})
    },
    updateStatus(status){
       return axiosInstance.put('profile/status', {status: status})
    }
}

export const authAPI = {
    me() {              
        return axiosInstance.get(`auth/me`)
            .then(response => { return response.data })              
    },
    login(email, password, rememberMe = false) {
        return axiosInstance.post('auth/login', {email, password, rememberMe})
    },
    logout() {
        return axiosInstance.delete('auth/login')
    }
}





