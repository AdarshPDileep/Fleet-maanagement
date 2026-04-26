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
  const popup = window.open('', '_blank', 'width=1200,height=800')

  if (!popup) {
    window.alert('Please allow pop-ups to export PDF.')
    return
  }

  const headerCells = headers.map((header) => `<th>${escapeHtml(header)}</th>`).join('')
  const bodyRows = rows
    .map(
      (row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`
    )
    .join('')

  popup.document.write(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(fileName)}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; color: #0f172a; }
          h1 { margin: 0 0 8px; font-size: 24px; }
          p { margin: 0 0 24px; color: #475569; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; vertical-align: top; }
          th { background: #e2e8f0; font-weight: 700; }
          tr:nth-child(even) td { background: #f8fafc; }
          @media print {
            body { padding: 0; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(title)}</h1>
        <p>Rows exported: ${rows.length}</p>
        <table>
          <thead>
            <tr>${headerCells}</tr>
          </thead>
          <tbody>
            ${bodyRows}
          </tbody>
        </table>
        <script>
          window.onload = function () {
            window.print();
          };
        </script>
      </body>
    </html>
  `)
  popup.document.close()
}
