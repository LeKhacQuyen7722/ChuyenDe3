import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  Bell,
  Menu,
  ChevronDown,
  Filter
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line 
} from 'recharts';

// --- Dữ liệu giả lập (Mock Data) dựa trên cấu trúc Firestore của bạn ---
const MOCK_DATA = [
  {
    id: 'campaign-001',
    campaign: 'Autumn Growth',
    source: 'Google',
    cost: 150,
    revenue: 2000,
    leads: 80,
    traffic: 800,
    conversion_rate: 0.1,
    status: 'active',
    last_updated: '2025-11-29T09:48:04+07:00'
  },
  {
    id: 'campaign-002',
    campaign: 'Summer Promo',
    source: 'Facebook',
    cost: 500,
    revenue: 3500,
    leads: 120,
    traffic: 1500,
    conversion_rate: 0.08,
    status: 'completed',
    last_updated: '2025-08-15T14:30:00+07:00'
  },
  {
    id: 'campaign-003',
    campaign: 'Winter Sale',
    source: 'TikTok',
    cost: 300,
    revenue: 1200,
    leads: 45,
    traffic: 2000,
    conversion_rate: 0.0225,
    status: 'active',
    last_updated: '2025-12-01T10:00:00+07:00'
  },
  {
    id: 'campaign-004',
    campaign: 'Spring Launch',
    source: 'Email',
    cost: 50,
    revenue: 800,
    leads: 30,
    traffic: 400,
    conversion_rate: 0.075,
    status: 'pending',
    last_updated: '2026-03-01T09:00:00+07:00'
  },
  {
    id: 'campaign-005',
    campaign: 'Brand Awareness',
    source: 'Youtube',
    cost: 1000,
    revenue: 1500,
    leads: 200,
    traffic: 5000,
    conversion_rate: 0.04,
    status: 'active',
    last_updated: '2025-10-20T16:45:00+07:00'
  }
];

// --- Helper Functions ---
const formatCurrency = (value) => 
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

const formatNumber = (value) => 
  new Intl.NumberFormat('en-US').format(value);

const formatPercent = (value) => 
  `${(value * 100).toFixed(1)}%`;

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

// --- Components ---

// 1. Sidebar Navigation
const Sidebar = ({ isOpen, toggleSidebar }) => (
  <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-auto`}>
    <div className="flex items-center justify-between h-16 px-6 border-b border-slate-100">
      <div className="flex items-center gap-2 font-bold text-xl text-slate-800">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
          <Activity size={20} />
        </div>
        <span>ROI Master</span>
      </div>
      <button onClick={toggleSidebar} className="lg:hidden text-slate-500 hover:text-slate-700">
        <Menu size={24} />
      </button>
    </div>

    <nav className="p-4 space-y-1">
      <NavItem icon={<LayoutDashboard size={20} />} label="Tổng quan" active />
      <NavItem icon={<TrendingUp size={20} />} label="Chiến dịch" />
      <NavItem icon={<Users size={20} />} label="Khách hàng" />
      <NavItem icon={<DollarSign size={20} />} label="Tài chính" />
      <NavItem icon={<Calendar size={20} />} label="Lịch biểu" />
    </nav>

    <div className="absolute bottom-0 w-full p-4 border-t border-slate-100">
      <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
        <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
        <div>
          <p className="text-sm font-medium text-slate-700">Nguyễn Nhật Bảo</p>
          <p className="text-xs text-slate-500">Quản trị viên</p>
        </div>
      </div>
    </div>
  </aside>
);

const NavItem = ({ icon, label, active = false }) => (
  <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
    {icon}
    {label}
  </a>
);

// 2. Stat Card
const StatCard = ({ title, value, change, icon, trend }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
        {icon}
      </div>
    </div>
    <div className="flex items-center text-sm">
      <span className={`flex items-center font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {change >= 0 ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
        {Math.abs(change)}%
      </span>
      <span className="text-slate-400 ml-2">so với tháng trước</span>
    </div>
  </div>
);

// 3. Main Dashboard
const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Tính toán tổng hợp từ dữ liệu giả lập
  const stats = useMemo(() => {
    const totalRevenue = MOCK_DATA.reduce((acc, curr) => acc + curr.revenue, 0);
    const totalCost = MOCK_DATA.reduce((acc, curr) => acc + curr.cost, 0);
    const totalLeads = MOCK_DATA.reduce((acc, curr) => acc + curr.leads, 0);
    const avgROI = totalCost > 0 ? ((totalRevenue - totalCost) / totalCost) * 100 : 0;

    return { totalRevenue, totalCost, totalLeads, avgROI };
  }, []);

  // Dữ liệu biểu đồ
  const sourceData = useMemo(() => {
    const data = {};
    MOCK_DATA.forEach(item => {
      data[item.source] = (data[item.source] || 0) + item.revenue;
    });
    return Object.keys(data).map(key => ({ name: key, value: data[key] }));
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => setIsSidebarOpen(true)} className="text-slate-500">
              <Menu size={24} />
            </button>
            <span className="font-bold text-lg">ROI Master</span>
          </div>

          <div className="hidden lg:flex items-center bg-slate-100 rounded-lg px-3 py-2 w-96">
            <Search size={18} className="text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Tìm kiếm chiến dịch, nguồn..." 
              className="bg-transparent border-none outline-none text-sm w-full placeholder-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-1 hidden lg:block"></div>
            <button className="hidden lg:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900">
              <span>Tháng này</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </header>

        {/* Content Scrollable Area */}
        <div className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Tổng quan hiệu suất</h1>
                <p className="text-slate-500 mt-1">Cập nhật dữ liệu từ hệ thống ROI Tracking Real-time.</p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2 shadow-sm">
                  <Filter size={16} />
                  Bộ lọc
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm shadow-blue-200">
                  Xuất báo cáo
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard 
                title="Tổng doanh thu" 
                value={formatCurrency(stats.totalRevenue)} 
                change={12.5} 
                trend="up" 
                icon={<DollarSign size={20} />} 
              />
              <StatCard 
                title="Chi phí quảng cáo" 
                value={formatCurrency(stats.totalCost)} 
                change={-2.4} 
                trend="down" 
                icon={<Activity size={20} />} 
              />
              <StatCard 
                title="ROI Trung bình" 
                value={`${stats.avgROI.toFixed(1)}%`} 
                change={5.8} 
                trend="up" 
                icon={<TrendingUp size={20} />} 
              />
              <StatCard 
                title="Tổng Leads" 
                value={formatNumber(stats.totalLeads)} 
                change={18.2} 
                trend="up" 
                icon={<Users size={20} />} 
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Chart */}
              <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-slate-800">Doanh thu & Chi phí theo chiến dịch</h3>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MOCK_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={32}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis 
                        dataKey="campaign" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748B', fontSize: 12 }} 
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748B', fontSize: 12 }} 
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip 
                        cursor={{ fill: '#F1F5F9' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="revenue" name="Doanh thu" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="cost" name="Chi phí" fill="#E2E8F0" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Chart */}
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-6">Nguồn doanh thu</h3>
                <div className="h-64 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sourceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-xs text-slate-400 font-medium">Tổng</span>
                    <span className="text-xl font-bold text-slate-800">{formatCurrency(stats.totalRevenue)}</span>
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  {sourceData.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="text-slate-600">{entry.name}</span>
                      </div>
                      <span className="font-medium text-slate-900">{formatPercent(entry.value / stats.totalRevenue)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800">Chi tiết chiến dịch</h3>
                <a href="#" className="text-sm text-blue-600 font-medium hover:text-blue-700">Xem tất cả</a>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="px-6 py-4 font-semibold">Tên chiến dịch</th>
                      <th className="px-6 py-4 font-semibold">Nguồn</th>
                      <th className="px-6 py-4 font-semibold text-right">Traffic</th>
                      <th className="px-6 py-4 font-semibold text-right">Leads</th>
                      <th className="px-6 py-4 font-semibold text-right">Tỷ lệ CĐ</th>
                      <th className="px-6 py-4 font-semibold text-right">Chi phí</th>
                      <th className="px-6 py-4 font-semibold text-right">Doanh thu</th>
                      <th className="px-6 py-4 font-semibold text-center">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MOCK_DATA.filter(item => item.campaign.toLowerCase().includes(searchTerm.toLowerCase())).map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900">{row.campaign}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                            ${row.source === 'Google' ? 'bg-blue-100 text-blue-800' : 
                              row.source === 'Facebook' ? 'bg-indigo-100 text-indigo-800' : 
                              row.source === 'Youtube' ? 'bg-red-100 text-red-800' : 
                              'bg-slate-100 text-slate-800'}`}>
                            {row.source}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600 text-right">{formatNumber(row.traffic)}</td>
                        <td className="px-6 py-4 text-slate-600 text-right">{formatNumber(row.leads)}</td>
                        <td className="px-6 py-4 text-slate-600 text-right">{formatPercent(row.conversion_rate)}</td>
                        <td className="px-6 py-4 text-slate-600 text-right">{formatCurrency(row.cost)}</td>
                        <td className="px-6 py-4 font-medium text-slate-900 text-right">{formatCurrency(row.revenue)}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex w-2 h-2 rounded-full ${row.status === 'active' ? 'bg-green-500' : row.status === 'completed' ? 'bg-blue-500' : 'bg-slate-300'}`}></span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
