const localStorageKey = "__auth_provider__token__";

function handleUserResponse({ user }) {
  window.localStorage.setItem(localStorageKey, user.token);
}

function login({ email, password }) {
  return client("login", { email, password }).then(handleUserResponse);
}

const authURL = process.env.REACT_APP_AUTH_URL;

async function client(endpoint, data) {
  const config = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return window
    .fetch(`${authURL}/${endpoint}`, config)
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
}

export { login };
