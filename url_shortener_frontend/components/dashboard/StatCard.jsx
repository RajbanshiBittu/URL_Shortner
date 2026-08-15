import { cn } from '@/lib/utils';

export function StatCard({ icon: Icon, label, value, trend, trendUp = true, className }) {
  return (
    <div className={cn(
      'bg-white rounded-xl border border-gray-200 p-6 hover:shadow-sm transition',
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-indigo-50">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
        {trend && (
          <div className={cn(
            'text-xs font-semibold px-2.5 py-1 rounded-full',
            trendUp 
              ? 'bg-green-50 text-green-700' 
              : 'bg-red-50 text-red-700'
          )}>
            {trendUp ? '+' : '-'}{trend}%
          </div>
        )}
      </div>
      <p className="text-gray-600 text-sm mb-1">{label}</p>
      <p className="text-2xl md:text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
