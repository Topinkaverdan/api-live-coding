import { fetchLogin, fetchRegister } from "../api.js";

export function renderLoginComponent({ appEl, setToken, fetchTodosAndRender}) {

    let logeMode = true;

    const renderLoge = () => {

        const appHtml = `<h3 class="form-title">Форма ${logeMode ? "входа" : "регистрации"}</h3>
                <div class="form-row">
                ${logeMode ? "" : ` Имя 
                <input
                type="text"
                id="name-input"
                class="input"
                />
                <br/><br/>`}
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
                <button class="button" id="toggle-button">Перейти ${logeMode ? "к регистрации" : "ко входу"}</button>
                    </div>`
        
        appEl.innerHTML = appHtml;

        document.getElementById("login-button").addEventListener('click', () => {

            const loginEl = document.getElementById("login-input");
            const passwordEl = document.getElementById("password-input");
    
            const login = loginEl.value;
            const password = passwordEl.value;
            const name = document.getElementById("name-input").value;
            

            if (logeMode) {
                fetchLogin({
                    login: login,
                    password: password,
                }).then((user) => {
                    setToken(`Bearer ${user.user.token}`);
                    fetchTodosAndRender();
                }).catch((error) => {
                    alert(error.message);
                })
            } else {
                fetchRegister({
                    login: login,
                    password: password,
                    name: name,
                }).then((user) => {
                    setToken(`Bearer ${user.user.token}`);
                    fetchTodosAndRender();
                }).catch((error) => {
                    alert(error.message);
                })
            }
            if (!name) {

                alert("Введите имя");
                return;
                
            }
            if (!login) {
                alert('Введите логин');
                return;
            }

            if (!password) {
                alert('Введите пароль');
                return;
            }

           

        });

        document.getElementById("toggle-button").addEventListener("click", () => {
            logeMode = !logeMode;
            renderLoge();
        })

    }

    renderLoge();

}