import React from 'react';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  CreditCard 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, members: 24 },
  { name: 'Feb', revenue: 3000, members: 28 },
  { name: 'Mar', revenue: 5000, members: 32 },
  { name: 'Apr', revenue: 4500, members: 35 },
  { name: 'May', revenue: 6000, members: 40 },
  { name: 'Jun', revenue: 5500, members: 42 },
];

const StatCard: React.FC<{ 
  title: string; 
  value: string; 
  icon: React.ElementType; 
  trend: string; 
  trendType: 'up' | 'down';
}> = ({ title, value, icon: Icon, trend, trendType }) => (
  <Card className="border-slate-200">
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <Icon className="w-5 h-5" />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
          trendType === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
        )}>
          {trendType === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      </div>
    </CardContent>
  </Card>
);

import { cn } from '@/lib/utils';

const Dashboard: React.FC = () => {
  const { members, invoices } = useStore();
  const activeMembers = members.filter(m => m.status === 'active').length;
  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((acc, curr) => acc + curr.amount, 0);
  const pendingRevenue = invoices.filter(i => i.status === 'pending').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500">Welcome to the association management cockpit.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Current Period</p>
            <p className="text-sm font-bold text-slate-900">Oct 2023 - Nov 2023</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Members" 
          value={members.length.toString()} 
          icon={Users} 
          trend="+12%" 
          trendType="up" 
        />
        <StatCard 
          title="Active Members" 
          value={activeMembers.toString()} 
          icon={TrendingUp} 
          trend="+8%" 
          trendType="up" 
        />
        <StatCard 
          title="Revenue (Paid)" 
          value={`$${totalRevenue.toLocaleString()}`} 
          icon={CreditCard} 
          trend="+15%" 
          trendType="up" 
        />
        <StatCard 
          title="Pending Invoices" 
          value={`$${pendingRevenue.toLocaleString()}`} 
          icon={FileText} 
          trend="-3%" 
          trendType="down" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Revenue Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{ fill: '#f8fafc' }}
                  />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Member Acquisition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="members" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'payment', title: 'Payment Received', desc: 'Tech Corp paid Invoice #INV-22', time: '2 hours ago', icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { type: 'member', title: 'New Member Joined', desc: 'Alice Freeman added as Corporate Member', time: '5 hours ago', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                { type: 'invoice', title: 'Invoice Generated', desc: 'Bulk invoices sent to 12 members', time: '1 day ago', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className={cn("p-2 rounded-lg", activity.bg)}>
                    <activity.icon className={cn("w-5 h-5", activity.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{activity.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{activity.desc}</p>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Fund Allocation</CardTitle>
          </CardHeader>
          <CardContent>
             <div 
              className="h-[240px] rounded-2xl bg-cover bg-center mb-4 flex items-center justify-center text-center p-6"
              style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://storage.googleapis.com/dala-prod-public-storage/generated-images/0a0fb4e7-229e-4a64-bc24-85e78146f4a9/dashboard-hero-3ebcf34b-1777971462344.webp")` }}
            >
              <div className="text-white">
                <p className="text-xs font-medium uppercase tracking-widest opacity-80">Total Fund Assets</p>
                <h4 className="text-3xl font-bold mt-2">$245,800</h4>
                <p className="text-xs mt-4 opacity-70">Across all 3 major fund categories</p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { name: 'General Fund', value: '65%', color: 'bg-blue-600' },
                { name: 'Events Fund', value: '25%', color: 'bg-emerald-500' },
                { name: 'Projects Fund', value: '10%', color: 'bg-amber-500' },
              ].map((fund) => (
                <div key={fund.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-600">{fund.name}</span>
                    <span className="text-slate-900">{fund.value}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", fund.color)} style={{ width: fund.value }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;