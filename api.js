const host = "https://webdev-hw-api.vercel.app/api/v2/todos";

 export const fetchGet = ({ token }) => {
    return fetch(host, {
    method: "GET",
    headers: {
      Authorization: token,
    },

   })
    .then((response) => {
      if (response.status === 401) {

        throw new Error("Нет авторизации");
      }

      return response.json();
    });
};

export const fetchDelete = ({ token, id }) => {
   return fetch("https://webdev-hw-api.vercel.app/api/todos/" + id, {
            method: "DELETE",
            headers: {
              Authorization: token,
            },
          })
            .then((response) => {
              return response.json();
            })
};

export const fetchPost = ({ token, text }) => {

    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
        text,
        }),
        headers: {
        Authorization: token,
        },
    })
        .then((response) => {
        return response.json();
        })

}

export const fetchLogin = ({ login, password }) => {

  return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
      method: "POST",
      body: JSON.stringify({
      login,
      password,
      }),
  })
      .then((response) => {
      return response.json();
      })

}