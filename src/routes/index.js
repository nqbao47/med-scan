import Guide from '../pages/Guide';
import MedScan from '../pages/MedScan';
import Other from '../pages/Other';

//Khong can quyen (dang nhap) van su dung duoc
const publicRoutes = [
    { path: '/', component: Guide },
    { path: '/medscan', component: MedScan },
    { path: '/others', component: Other },
];

//bat buoc phai co quyen (dang nhap), neu khong se route ve trang dang nhap
const privateRoutes = [];

export { publicRoutes, privateRoutes };
