import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const escapeCsv = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`

export const downloadCsv = ({ headers, rows, fileName }) => {
  const csvContent = [headers.map(escapeCsv).join(','), ...rows.map((row) => row.map(escapeCsv).join(','))].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const exportRowsToPdf = ({ title, headers, rows, fileName }) => {
  const doc = new jsPDF()
  
  // Add Title
  doc.setFontSize(18)
  doc.text(title, 14, 22)
  
  // Add Export Info
  doc.setFontSize(11)
  doc.setTextColor(100)
  doc.text(`Rows exported: ${rows.length}`, 14, 30)
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 36)

  // Add Table
  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 45,
    styles: { fontSize: 8, cellPadding: 3 },
    headStyles: { fillColor: [15, 23, 42], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { top: 45 },
  })

  // Download the PDF
  doc.save(fileName)
}
