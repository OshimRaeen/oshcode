/** 
 * An array of routes that are accessible to the public 
 * these routes do not require authentication and can be accessed by anyone
 * @type {string[]}

 */

export const publicRoutes: string[] = []

/**
 * An array of routes that are accessible to authenticated users 
 * these routes require authentication and can only be accessed by logged-in users
 * @type {string[]}
 */

export const protectedRoutes: string[] = []

/**
 * an array of routes which are accessible to public
 * routes that starts with (api/auth) prefix do not require authentication 
 * @type {string[]}
 */

export const authRoutes: string[] = [
    "/auth/sign-in",  //added leading slash
]


/**
 * an array of routes which are accessible to public
 * routes that starts with (api/auth) prefix do not require authentication 
 * @type {string[]}
 */
export const apiAuthPrefix: string= "/api/auth"


export const DEFAULT_LOGIN_REDIRECT= "/" //changed to redirect to home page after login




 