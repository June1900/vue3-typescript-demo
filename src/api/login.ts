import http from '@/utils/http';

const login = (data : any) => {
  return http.request({
    url: '/login',
    method: 'post',
    data
  });
};

export {
  login
};
