/**
 * Formats a date string to dd/mm/yyyy format
 * @param dateString - Date string in ISO format or any valid date string
 * @returns Formatted date string in dd/mm/yyyy format or empty string if invalid
 */
export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return '';

  const date = new Date(dateString);

  // Check if date is valid
  if (Number.isNaN(date.getTime())) return dateString;

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

/**
 * Formats a date string to YYYY-MM-DD format for HTML date inputs
 * @param dateString - Date string in ISO format or any valid date string
 * @returns Formatted date string in YYYY-MM-DD format or empty string if invalid
 */
export const formatDateForInput = (dateString: string | undefined): string => {
  if (!dateString) return '';

  const date = new Date(dateString);

  // Check if date is valid
  if (Number.isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
