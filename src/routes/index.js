import Home from '../pages/Home';
import Following from '../pages/Following';
import Search from '../pages/Search';

//Khong can quyen (dang nhap) van su dung duoc
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/search', component: Search },
    { path: '/following', component: Following },
];

//bat buoc phai co quyen (dang nhap), neu khong se route ve trang dang nhap
const privateRoutes = [];

export { publicRoutes, privateRoutes };
