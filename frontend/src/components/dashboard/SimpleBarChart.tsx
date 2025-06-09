import React from 'react'

interface ChartData {
  [key: string]: string | number
}

interface SimpleBarChartProps {
  data: ChartData[]
  dataKeys: string[]
  colors: string[]
}

export function SimpleBarChart({ data, dataKeys, colors }: SimpleBarChartProps) {
  // Find max value across all data keys
  const maxValue = Math.max(
    ...data.flatMap(item => 
      dataKeys.map(key => Number(item[key]) || 0)
    )
  )

  // Get the x-axis key (usually the first non-data key)
  const xAxisKey = Object.keys(data[0] || {}).find(key => !dataKeys.includes(key)) || 'label'

  return (
    <div className="h-full flex flex-col">
      {/* Chart area */}
      <div className="flex-1 flex items-end justify-between gap-2 mb-4">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex items-end justify-center gap-1">
            {dataKeys.map((dataKey, keyIndex) => {
              const value = Number(item[dataKey]) || 0
              const height = (value / maxValue) * 100
              
              return (
                <div
                  key={dataKey}
                  className="flex-1 rounded-t transition-all duration-500 hover:opacity-80 relative group"
                  style={{
                    height: `${height}%`,
                    backgroundColor: colors[keyIndex] || '#4169E1',
                    minHeight: '4px'
                  }}
                >
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                    ${value.toLocaleString()}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
      
      {/* X-axis labels */}
      <div className="flex justify-between">
        {data.map((item, index) => (
          <div key={index} className="flex-1 text-center">
            <p className="text-xs text-gray-600">{item[xAxisKey]}</p>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      {dataKeys.length > 1 && (
        <div className="flex justify-center gap-4 mt-4">
          {dataKeys.map((key, index) => (
            <div key={key} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded"
                style={{ backgroundColor: colors[index] || '#4169E1' }}
              />
              <span className="text-xs text-gray-600 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}