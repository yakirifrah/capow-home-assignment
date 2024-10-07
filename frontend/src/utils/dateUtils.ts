export function formatDate(date: string | Date): string {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); 
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
}

export function parseDate(dateStr: string): Date {
  const [month, day, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day); 
}