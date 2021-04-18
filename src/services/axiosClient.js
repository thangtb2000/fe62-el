import axios from 'axios';
import qs from 'qs';

const axiosClient = axios.create({
    baseURL: "https://elearning0706.cybersoft.edu.vn/api",
    // Tự cấu hình cách lấy params mặc định của axios
    //BỎ qua giá trị null và undefinded trong params
    paramsSerializer: (params) => qs.stringify(params, {skipNulls: true}),
    
    
});
axiosClient.interceptors.request.use(
    (config) => {
        //xử lý trước khi request trước kho gửi lên server
        //Thêm Authorization vào header
        const userInfor = localStorage.getItem("userInfor");
        if(userInfor){
            const {accessToken} = JSON.parse(userInfor);
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        //xử lý khi request bị lỗi
        return Promise.reject(error);
    }
    
)

axiosClient.interceptors.response.use(
    (response) => {
        //Xử lý kết quả trả về server
        return response;
    },
         //Xử lý nếu kết quả bị lỗi
    (error) => {
        if(error.status === 401){
            //xử lý logout: clear localStorage, đẩy người dùng về trang login
        }
        if(error.status === 500){
            //Xử lý thông báo cho người dùng server đang bị lỗi
        }
   
        return Promise.reject(error);
        
    }
    
)

export default axiosClient;