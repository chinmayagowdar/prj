'use client'

import { motion } from 'framer-motion'
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

export interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: unknown, row: T) => React.ReactNode
  width?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  onRowClick?: (row: T) => void
  searchable?: boolean
  onSearch?: (query: string) => void
}

type SortOrder = 'asc' | 'desc' | null

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  onRowClick,
  searchable = false,
  onSearch,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : sortOrder === 'desc' ? null : 'asc')
      if (sortOrder === 'desc') setSortKey(null)
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  let sortedData = [...data]
  if (sortKey && sortOrder) {
    sortedData.sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
      return sortOrder === 'asc' ? comparison : -comparison
    })
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch?.(query)
  }

  const getSortIcon = (key: keyof T) => {
    if (sortKey !== key) return <ChevronsUpDown className="w-4 h-4" />
    return sortOrder === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    )
  }

  return (
    <div className="space-y-4">
      {searchable && (
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-cyan-400 focus:outline-none"
        />
      )}

      <div className="overflow-x-auto border border-slate-700 rounded-lg">
        <table className="w-full">
          <thead className="bg-slate-800/50 border-b border-slate-700">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`px-6 py-3 text-left text-sm font-semibold text-slate-300 ${col.width || ''}`}
                >
                  {col.sortable ? (
                    <button
                      onClick={() => handleSort(col.key)}
                      className="flex items-center gap-2 hover:text-white transition"
                    >
                      {col.label}
                      {getSortIcon(col.key)}
                    </button>
                  ) : (
                    col.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, idx) => (
              <motion.tr
                key={row.id || idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => onRowClick?.(row)}
                className={`border-b border-slate-700/50 hover:bg-slate-700/30 transition ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className={`px-6 py-4 text-sm text-slate-300 ${col.width || ''}`}>
                    {col.render ? col.render(row[col.key], row) : String(row[col.key])}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
