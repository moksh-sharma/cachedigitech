import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { TrendingUp, Users, Target, DollarSign } from "lucide-react";

const revenueClientData = [
  { year: "2019", clients: 45, revenue: 1 },
  { year: "2020", clients: 60, revenue: 2 },
  { year: "2021", clients: 85, revenue: 3 },
  { year: "2022", clients: 130, revenue: 5 },
  { year: "2023", clients: 190, revenue: 8 },
  { year: "2024", clients: 250, revenue: 12 },
];

const projectPerformanceData = [
  { month: "Jan", completed: 8, ongoing: 15 },
  { month: "Feb", completed: 10, ongoing: 18 },
  { month: "Mar", completed: 13, ongoing: 22 },
  { month: "Apr", completed: 15, ongoing: 25 },
  { month: "May", completed: 20, ongoing: 28 },
  { month: "Jun", completed: 23, ongoing: 25 },
];

function GrowthSection() {
  const StatCard = ({ icon: Icon, value, growth, subtitle, title, color }) => (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${color}`}>
        <Icon className="w-8 h-8 text-red-500" />
      </div>
      <div className="text-green-600 text-sm font-semibold mb-2 flex items-center justify-center gap-1">
        <TrendingUp className="w-4 h-4" />
        {growth}
      </div>
      <p className="text-4xl font-bold text-gray-900 mb-2">{value}</p>
      <p className="text-gray-500 text-sm mb-1">{subtitle}</p>
      <p className="text-gray-800 font-semibold">{title}</p>
    </div>
  );

  return (
    <div className="w-full bg-gray-50 py-20 px-6 md:px-20">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Driving <span className="text-red-500">Exponential Growth</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Our track record speaks for itself. Consistent growth, exceptional
          results, and unwavering commitment to client success.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <StatCard
          icon={TrendingUp}
          value="508%"
          growth="+42% YoY"
          subtitle="5-Year CAGR"
          title="Revenue Growth"
          color="bg-red-50"
        />
        
        <StatCard
          icon={Users}
          value="245+"
          growth="+31% YoY"
          subtitle="Active Clients"
          title="Client Base"
          color="bg-red-50"
        />
        
        <StatCard
          icon={Target}
          value="98.5%"
          growth="+2.3% YoY"
          subtitle="Completion Rate"
          title="Project Success"
          color="bg-red-50"
        />
        
        <StatCard
          icon={DollarSign}
          value="$50M+"
          growth="+65% YoY"
          subtitle="Client Savings"
          title="Cost Savings"
          color="bg-red-50"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Revenue & Client Growth */}
        <div className="bg-white p-8 border border-gray-100 rounded-3xl shadow-sm">
          <h3 className="text-2xl font-semibold mb-8 text-gray-900">
            Revenue & Client Growth
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={revenueClientData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="year" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 14 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 14 }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="clients" 
                stroke="#64748b" 
                strokeWidth={3}
                dot={{ fill: '#64748b', strokeWidth: 0, r: 6 }}
                activeDot={{ r: 8, stroke: '#64748b', strokeWidth: 2, fill: 'white' }}
                name="Active Clients"
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', strokeWidth: 0, r: 6 }}
                activeDot={{ r: 8, stroke: '#ef4444', strokeWidth: 2, fill: 'white' }}
                name="Revenue ($M)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Project Performance */}
        <div className="bg-white p-8 border border-gray-100 rounded-3xl shadow-sm">
          <h3 className="text-2xl font-semibold mb-8 text-gray-900">
            Monthly Project Performance
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={projectPerformanceData}>
              <defs>
                <linearGradient id="completed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="ongoing" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748b" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#64748b" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 14 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748b', fontSize: 14 }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="completed"
                stackId="1"
                stroke="#ef4444"
                strokeWidth={2}
                fill="url(#completed)"
                name="Completed Projects"
              />
              <Area
                type="monotone"
                dataKey="ongoing"
                stackId="1"
                stroke="#64748b"
                strokeWidth={2}
                fill="url(#ongoing)"
                name="Ongoing Projects"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default GrowthSection;