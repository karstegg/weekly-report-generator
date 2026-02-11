/**
 * Helper to resolve image paths with correct base URL for both dev and production
 * In development: /images/foo.png
 * In production (GitHub Pages): /weekly-report-generator/images/foo.png
 */
export function getImagePath(path: string): string {
  // Hardcode base path for GitHub Pages
  const base = '/weekly-report-generator/';
  // Remove leading slash from path if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}
