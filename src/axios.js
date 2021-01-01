import axios from 'axios';
import router from './router';
/*
import getUrl from './getPath'
export default {
    Get: (config) => {
        axios({
            methods: "get",
            url: getUrl(config.url),
            params: config.params
        }).then((res) => {
            stateDetection(res);
            config.callback && config.callback(res);
        })

    },
    Post: () => {
        axios({
            methods: "post",
            url: getUrl(config.url)
        }).then((res) => {
            stateDetection(res);
            config.callback && config.callback(res);
        })
    }

}
//状态检测
let stateDetection = (data, callback) => {
    let status = data.status_code;
    switch (status) {
        case 102:
            break;
        case 103:
            alert(data.content);
            break;
        case 404:
            window.location.href = data.url;
            break;
    }
}*/
// axios 配置
/*
// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (localStorage.token) { //判断token是否存在
            config.headers.Authorization = localStorage.token;  //将token设置成请求头
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.errno === 999) {
            router.replace('/');
            console.log("token过期");
        }
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);*/
export default axios;
