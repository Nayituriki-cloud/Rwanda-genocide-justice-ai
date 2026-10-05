/**
 * Utility functions for 1-click downloading of judicial reports, evidence certificates,
 * case dossiers, audit logs, and timelines in multiple formats (TXT, MD, CSV, JSON).
 */

export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain') {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadJSON(data: any, filename: string) {
  const jsonStr = JSON.stringify(data, null, 2);
  downloadFile(jsonStr, filename.endsWith('.json') ? filename : `${filename}.json`, 'application/json');
}

export function downloadCSV(rows: (string | number)[][], headers: string[], filename: string) {
  const escapeCell = (cell: string | number) => {
    const str = String(cell ?? '').replace(/"/g, '""');
    return `"${str}"`;
  };

  const csvContent = [
    headers.map(escapeCell).join(','),
    ...rows.map(row => row.map(escapeCell).join(','))
  ].join('\r\n');

  downloadFile(csvContent, filename.endsWith('.csv') ? filename : `${filename}.csv`, 'text/csv');
}

export function downloadText(text: string, filename: string) {
  downloadFile(text, filename.endsWith('.txt') ? filename : `${filename}.txt`, 'text/plain');
}

export function downloadMarkdown(markdown: string, filename: string) {
  downloadFile(markdown, filename.endsWith('.md') ? filename : `${filename}.md`, 'text/markdown');
}
