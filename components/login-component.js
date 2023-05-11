import { fetchLogin } from "../api.js";

export function renderLoginComponent({ appEl, setToken, fetchTodosAndRender}) {
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

            fetchLogin({
                login: "glebka",
                password: "123456",
            }).then((user) => {
                setToken(`Bearer ${user.user.token}`);
                fetchTodosAndRender();
            })

        });
}