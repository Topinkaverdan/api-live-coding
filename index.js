
 let tasks = [];

    let token = "Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck";
    token = null;

    const host = "https://webdev-hw-api.vercel.app/api/v2/todos";

    const fetchTodosAndRender = () => {
      return fetch(host, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          if (response.status === 401) {
            // token = prompt("Введите верный пароль");
            // fetchTodosAndRender();
            throw new Error("Нет авторизации");
          }

          return response.json();
        })
        .then((responseData) => {
          tasks = responseData.todos;
          renderApp();
        })
        .catch ((error) => {
            console.log(error);
        })
    };

    const renderApp = () => {
      
      const appEl = document.getElementById("app");
      
      if (!token) {

        const appHtml = `<h3 class="form-title">Форма регистрации</h3>
                <div class="form-row">
                    Логин
                <input
                type="text"
                id="login-input"
                class="input"
                />
                <br/><br/>
                Пароль 
                <input
                type="text"
                id="login-input"
                class="input"
                />
                </div>
                <br />
                <button class="button" id="login-button">Войти</button>
                    </div>`
        
        appEl.innerHTML = appHtml;
        document.getElementById("login-button").addEventListener('click', () => {

            token = "Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck";
            fetchTodosAndRender();

        });

        return;
        
      }
      const tasksHtml = tasks
        .map((task) => {
          return `
          <li class="task">
            <p class="task-text">
              ${task.text}
              <button data-id="${task.id}" class="button delete-button">Удалить</button>
            </p>
          </li>`;
        })
        .join("");
      const appHtml = `
                <h1>Список задач</h1>
                <ul class="tasks" id="list">
                 ${tasksHtml}
                </ul>
                <br />
                <div class="form">
                <h3 class="form-title">Форма добавления</h3>
                <div class="form-row">
                Что нужно сделать:
                <input
                type="text"
                id="text-input"
                class="input"
                placeholder="Выпить кофе"
                />
                </div>
                <br />
                <button class="button" id="add-button">Добавить</button>
                    </div>`

      appEl.innerHTML = appHtml;

      const listElement = document.getElementById("list");
      const buttonElement = document.getElementById("add-button");
      const textInputElement = document.getElementById("text-input");
      const deleteButtons = document.querySelectorAll(".delete-button");

      for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener("click", (event) => {
          event.stopPropagation();

          const id = deleteButton.dataset.id;

          // подписываемся на успешное завершение запроса с помощью then
          fetch("https://webdev-hw-api.vercel.app/api/todos/" + id, {
            method: "DELETE",
            headers: {
              Authorization: token,
            },
          })
            .then((response) => {
              return response.json();
            })
            .then((responseData) => {
              // получили данные и рендерим их в приложении
              tasks = responseData.todos;
              renderApp();
            });
        });
      }

      buttonElement.addEventListener("click", () => {
        if (textInputElement.value === "") {
            return;
        }

        buttonElement.disabled = true;
        buttonElement.textContent = "Задача добавляеятся...";

        // подписываемся на успешное завершение запроса с помощью then
        fetch(host, {
            method: "POST",
            body: JSON.stringify({
            text: textInputElement.value,
            }),
            headers: {
            Authorization: token,
            },
        })
            .then((response) => {
            return response.json();
            })
            .then(() => {
            // TODO: кинуть исключение
            textInputElement.value = "";
            })
            .then(() => {
            return fetchTodosAndRender();
            })
            .then(() => {
            buttonElement.disabled = false;
            buttonElement.textContent = "Добавить";
            })
            .catch((error) => {
            console.error(error);
            alert("Кажется у вас проблемы с интернетом, попробуйте позже");
            buttonElement.disabled = false;
            buttonElement.textContent = "Добавить";
            });
        });

    };

    renderApp();