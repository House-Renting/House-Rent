export const shouldShowNavbar = (pathname: string) => {
    // Add all paths where navbar should be hidden
    const excludedPaths = [
      '/',
      '/sign-up',
      '/sign-in'
      // Add more paths here
    ]
  
    // For exact matches
    if (excludedPaths.includes(pathname)) {
      return false
    }
  
    // For path patterns (e.g., all paths starting with /auth/)
    const excludedPatterns = [
      /^\/auth\//,  // This will match all routes starting with /auth/
      /^\/admin\/private\// // This will match all routes starting with /admin/private/
      // Add more patterns here
    ]
  
    return !excludedPatterns.some(pattern => pattern.test(pathname))
  }