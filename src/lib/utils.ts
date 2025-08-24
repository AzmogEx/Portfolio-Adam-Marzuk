/**
 * Safely parse JSON with fallback
 */
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    console.error('Failed to parse JSON:', error)
    return fallback
  }
}

/**
 * Check if a string is valid JSON
 */
export function isValidJson(str: string): boolean {
  try {
    JSON.parse(str)
    return true
  } catch (_error) {
    return false
  }
}