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
                type="password"
                id="password-input"
                class="input"
                />
                </div>
                <br />
                <button class="button" id="login-button">Войти</button>
                    </div>`
        
        appEl.innerHTML = appHtml;

        document.getElementById("login-button").addEventListener('click', () => {

            const loginEl = document.getElementById("login-input");
            const passwordEl = document.getElementById("password-input");
    
            const login = loginEl.value;
            const password = passwordEl.value;
            
            if (!login) {
                alert('Введите логин');
                return;
            }

            if (!password) {
                alert('Введите пароль');
                return;
            }

            fetchLogin({
                login: login,
                password: password,
            }).then((user) => {
                setToken(`Bearer ${user.user.token}`);
                fetchTodosAndRender();
            }).catch((error) => {
                alert(error.message);
            })

        });
}