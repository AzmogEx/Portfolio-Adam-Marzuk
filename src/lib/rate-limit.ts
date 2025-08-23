interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export function rateLimit(identifier: string, limit: number = 5, windowMs: number = 15 * 60 * 1000) {
  const now = Date.now()
  
  // Nettoyer les entrées expirées
  for (const key in store) {
    if (store[key].resetTime <= now) {
      delete store[key]
    }
  }
  
  if (!store[identifier]) {
    store[identifier] = {
      count: 1,
      resetTime: now + windowMs
    }
    return { success: true, remaining: limit - 1 }
  }
  
  if (store[identifier].count >= limit) {
    return { 
      success: false, 
      remaining: 0, 
      resetTime: store[identifier].resetTime 
    }
  }
  
  store[identifier].count++
  return { 
    success: true, 
    remaining: limit - store[identifier].count 
  }
}