import { getSession } from "next-auth/react";

// Type for our custom session data
type AuthSession = {
  user: {
    id: string;
    access_token: string;
    refreshToken?: string;
    [key: string]: any;
  };
  expires: string;
  error?: string;
};

/**
 * Gets the current session with proper typing
 */
const getAuthSession = async (): Promise<AuthSession> => {
  console.log('Getting session for authenticated request...');
  const session = await getSession();
  console.log('Session data:', {
    hasSession: !!session,
    hasUser: !!session?.user,
    hasToken: !!session?.user?.access_token,
    tokenStart: session?.user?.access_token?.substring(0, 10) + '...',
    tokenExpiresAt: session?.expires
  });
  
  if (!session?.user?.access_token) {
    console.error('No active session or access token found');
    // Don't redirect, just throw an error
    throw new Error('NO_SESSION: No active session. Please log in.');
  }
  return session as unknown as AuthSession;
};

/**
 * Makes an authenticated API request with automatic token handling
 */
export const authenticatedRequest = async <T = any>(
  url: string,
  data: any = {},
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    [key: string]: any;
  } = {}
): Promise<T> => {
  try {
    // Get the current session
    const session = await getAuthSession();
    
    // Prepare headers with authorization
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.user.access_token}`,
      ...options.headers,
    };

    // Make the request
    console.log('Making request to:', url, {
      method: options.method || 'POST',
      headers: {
        ...headers,
        // Ensure we don't accidentally expose the token in logs
        'Authorization': headers['Authorization'] ? 'Bearer [REDACTED]' : undefined,
      },
      hasBody: !!data,
    });

    const response = await fetch(url, {
      method: options.method || 'POST',
      headers,
      body: data ? JSON.stringify(data) : undefined,
      credentials: 'include', // Important for sending cookies with CORS
      ...options,
    });

    console.log('Response status:', response.status, response.statusText);

    // Handle 401 Unauthorized (token expired) and 403 Forbidden (access denied)
    if (response.status === 401 || response.status === 403) {
      // For 403, we'll just reject with the error message
      if (response.status === 403) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Access denied. You do not have permission to perform this action.');
      }
      
      // Only redirect on 401 (Unauthorized)
      if (response.status === 401) {
        // Clear any existing session data
        if (typeof window !== 'undefined') {
          localStorage.removeItem('session');
          sessionStorage.removeItem('session');
        }
        // Redirect to login page with error message
        const returnUrl = encodeURIComponent(window.location.pathname);
        window.location.href = `/login?returnUrl=${returnUrl}&error=Session expired. Please log in again.`;
        throw new Error('Session expired. Please log in again.');
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

/**
 * Wrapper for POST requests
 */
export const authenticatedPostRequest = async <T = any>(
  url: string,
  data: any = {},
  options: any = {}
): Promise<{ data: T }> => {
  try {
    const response = await authenticatedRequest<T>(url, data, {
      method: 'POST',
      ...options,
    });
    return { data: response };
  } catch (error: any) {
    console.error('Post request failed:', error);
    throw error;
  }
};

/**
 * Wrapper for GET requests
 */
export const authenticatedGetRequest = async <T = any>(
  url: string,
  params: Record<string, any> = {},
  options: any = {}
): Promise<{ data: T }> => {
  try {
    // Convert params to query string
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    
    const response = await authenticatedRequest<T>(fullUrl, undefined, {
      method: 'GET',
      ...options,
    });
    
    return { data: response };
  } catch (error: any) {
    console.error('Get request failed:', error);
    throw error;
  }
};
