import React from 'react'

interface BarData {
  label: string
  value: number
  color?: string
}

interface SimpleBarChartProps {
  data: BarData[]
  maxValue?: number
}

export default function SimpleBarChart({ data, maxValue }: SimpleBarChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value))
  
  return (
    <div className="flex flex-col h-full justify-end">
      <div className="flex items-end justify-between h-full gap-2">
        {data.map((item, index) => {
          const height = (item.value / max) * 100
          return (
            <div key={index} className="flex-1 flex flex-col items-center justify-end">
              <div 
                className="w-full rounded-t transition-all duration-500 hover:opacity-80"
                style={{ 
                  height: `${height}%`, 
                  backgroundColor: item.color || '#4169E1',
                  minHeight: '4px'
                }}
              />
              <p className="text-xs text-gray-600 mt-2 text-center">{item.label}</p>
              <p className="text-sm font-semibold text-gray-900">${item.value.toLocaleString()}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}