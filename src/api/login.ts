import http from '@/utils/http';
interface LoginData {
  username: string,
  password: string
}

const login = (data : LoginData | null) => {
  return http.request({
    url: '/login',
    method: 'post',
    data
  });
};

export {
  login
};
