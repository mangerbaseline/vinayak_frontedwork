// export const refreshToken = async (): Promise<string | null> => {
//   try {
//     const refreshToken = localStorage.getItem('refreshToken');
//     if (!refreshToken) {
//       console.log('No refresh token found');
//       return null;
//     }

//     const res = await fetch('http://localhost:5000/api/auth/refresh', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ refreshToken }),
//     });

//     if (res.ok) {
//       const data = await res.json();
//       localStorage.setItem('token', data.token);
//       console.log('Token refreshed successfully');
//       return data.token;
//     }
    
//     console.log('Token refresh failed');
//     return null;
//   } catch (error) {
//     console.error('Token refresh error:', error);
//     return null;
//   }
// };

// export const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}): Promise<Response> => {
//   let token = localStorage.getItem('token');
  
//   const headers = {
//     'Content-Type': 'application/json',
//     ...options.headers,
//     Authorization: token ? `Bearer ${token}` : '',
//   };

//   let response = await fetch(url, { ...options, headers });

//   // If token expired, try to refresh and retry
//   if (response.status === 401) {
//     console.log('Token expired, attempting refresh...');
//     const newToken = await refreshToken();
//     if (newToken) {
//       headers.Authorization = `Bearer ${newToken}`;
//       response = await fetch(url, { ...options, headers });
//     } else {
//       // Force logout if refresh fails
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       localStorage.removeItem('refreshToken');
//       window.location.href = '/login';
//     }
//   }
//   return response;
// };

// export const handleLogout = (): void => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('user');
//   localStorage.removeItem('refreshToken');
//   window.location.href = '/login';
// };




export const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.log('No refresh token found');
      return null;
    }

    const res = await fetch('http://localhost:5000/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      console.log('Token refreshed successfully');
      return data.token;
    }

    console.log('Token refresh failed');
    return null;
  } catch (error) {
    console.error('Token refresh error:', error);
    return null;
  }
};

export const makeAuthenticatedRequest = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : '',
  };

  let response = await fetch(url, { ...options, headers });

  // If token expired, try to refresh and retry
  if (response.status === 401) {
    console.log('Token expired, attempting refresh...');
    const newToken = await refreshToken();
    if (newToken) {
      headers.Authorization = `Bearer ${newToken}`;
      response = await fetch(url, { ...options, headers });
    } else {
      // Force logout if refresh fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');
      globalThis.location.href = '/login';  
    }
  }
  return response;
};

export const handleLogout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('refreshToken');
  globalThis.location.href = '/login'; 
};
