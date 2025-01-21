import type React from "react"

type StatusFilterProps = {
  statusFilter: string
  setStatusFilter: (status: string) => void
}

const StatusFilter: React.FC<StatusFilterProps> = ({ statusFilter, setStatusFilter }) => {
  return (
    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="p-2 border rounded">
      <option value="All">All</option>
      <option value="Pending">Pending</option>
      <option value="Completed">Completed</option>
    </select>
  )
}

export default StatusFilter

