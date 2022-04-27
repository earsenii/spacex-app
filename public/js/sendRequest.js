export const sendRequest = async (method, url, body) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: headers,
    });

    return response.json();
  } catch (err) {
    console.error('Error', err);
  }
};
