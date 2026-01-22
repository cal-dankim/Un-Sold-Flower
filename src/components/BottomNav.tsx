import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, User } from 'lucide-react';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Simple helper to check active
    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 pb-safe pt-2 px-6 z-50">
            <div className="flex justify-center items-center h-14 gap-12">
                <NavItem
                    icon={<Home size={24} />}
                    label="홈"
                    active={isActive('/home')}
                    onClick={() => navigate('/home')}
                />
                <NavItem
                    icon={<Search size={24} />}
                    label="검색"
                    active={isActive('/search')}
                    onClick={() => navigate('/search')}
                />
                <NavItem
                    icon={<ShoppingBag size={24} />}
                    label="장바구니"
                    active={isActive('/cart')}
                    onClick={() => navigate('/cart')}
                />
                <NavItem
                    icon={<User size={24} />}
                    label="마이"
                    active={isActive('/my')}
                    onClick={() => navigate('/my')}
                />
            </div>
        </div>
    );
};

const NavItem = ({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center gap-1 transition-colors duration-300 ${active ? 'text-[#2C2C2C]' : 'text-gray-300 hover:text-gray-500'}`}
    >
        <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'scale-100'}`}>
            {icon}
        </div>
        <span className="text-[10px] font-medium tracking-tight">{label}</span>
        {/* Active Indicator Dot */}
        {active && <div className="w-1 h-1 bg-[#2C2C2C] rounded-full mt-1 animate-fadeIn"></div>}
    </button>
);

export default BottomNav;
