export default null;

const apiUrl = 'http://localhost:8000';

// Basic Service for Api Post requests to our server

const APIpost = async (route: string, body: any) => {
  try {
    const data = await fetch(`${apiUrl}${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const parsedData = await data.json();
    return parsedData;
  } catch (error) {
    return { error };
  }
};

// Getting auth data for our app (accessToken)

export const getAuthData = async (code: string) => {
  const res = await APIpost('/login', { code });
  return res;
};
