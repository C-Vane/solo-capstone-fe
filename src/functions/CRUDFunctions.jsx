const url = process.env.REACT_APP_URL;

export const tokenRefresh = async (func, endp, data) => {
  const response = await postFunction("users/refreshToken");
  if (response.ok) {
    return await func(endp, data);
  } else {
    console.log(response);
    return false;
  }
};

export const getFunction = async (endp) => {
  try {
    const response = await fetch(url + endp, { credentials: "include" });
    if (response.ok) {
      return await response.json();
    } else {
      const data = response.status === 401 && tokenRefresh(getFunction, endp);
      if (data) return data;
      return await response.text();
    }
  } catch (error) {
    console.log(error);
  }
};

export const postFunction = async (endp, data) => {
  try {
    const response = await fetch(url + endp, {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    if (response.ok) {
      return await response.json();
    } else {
      if (response.status === 401) {
        const refetch = tokenRefresh(postFunction, endp, data);
        if (refetch) return refetch;
      }
      return await response.text();
    }
  } catch (error) {
    console.log(error);
  }
};

export const putFunction = async (endp, data) => {
  try {
    const response = await fetch(url + endp, {
      method: "PUT",
      body: JSON.stringify(data),
      credentials: "include",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    if (response.ok) {
      return await response.json();
    } else {
      if (response.status === 401) {
        const refetch = tokenRefresh(putFunction, endp, data);
        if (refetch) return refetch;
      }
      return response.status === 400 ? await response.json() : await response.text();
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteFunction = async (endp) => {
  try {
    const response = await fetch(url + endp, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      return await response.json();
    } else {
      if (response.status === 401) {
        const refetch = tokenRefresh(deleteFunction, endp);
        if (refetch) return refetch;
      }
      return await response.text();
    }
  } catch (error) {
    console.log(error);
  }
};
