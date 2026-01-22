import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

const Layout = () => {
    return (
        <div className="w-full min-h-screen relative bg-[#F4F1EA]">
            <Outlet />
            <BottomNav />
        </div>
    );
};

export default Layout;
