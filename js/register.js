export class Register {
    constructor() {

        this.mode = document.getElementById('mode');
        this.mode.addEventListener('click', this.changeMode.bind(this));
        this.getMode();

        this.inputs = document.querySelectorAll('input');
        this.btnRegister = document.getElementById('btnRegister');

        this.btnRegister.addEventListener('click', this.preventDefaultBtn.bind(this));

        this.inputs[0].addEventListener('input', this.validationName.bind(this, this.inputs[0]), false)
        this.inputs[1].addEventListener('input', this.validationName.bind(this, this.inputs[1]), false)
        this.inputs[2].addEventListener('input', this.validationEmail.bind(this));
        this.inputs[3].addEventListener('input', this.validationPass.bind(this));
        this.inputs[4].addEventListener('input', this.validationAge.bind(this));

        this.formData = document.querySelector('form');
        // this.formData.addEventListener('input', this.validationForm.bind(this));

        this.alertMsg = document.getElementById('msg');

        this.isValid = false;
    }

    getMode() {
        if (localStorage.getItem("theme") != null) {
            const theme = localStorage.getItem("theme");

            if (theme === "light") {
                this.mode.classList.replace("fa-sun", "fa-moon");
            } else {
                this.mode.classList.replace("fa-moon", "fa-sun");
            }

            document.documentElement.setAttribute('data-theme', theme);
        }
    }

    changeMode() {

        // documentElement ==> كله html كده انا ماسك الاب الى هو ال 
        if (this.mode.classList.contains('fa-sun')) {
            document.documentElement.setAttribute('data-theme', 'light');
            this.mode.classList.replace('fa-sun', 'fa-moon')
            localStorage.setItem("theme", "light");
        }
        else {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.mode.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem("theme", "dark");
        }
    }

    preventDefaultBtn() {
        this.formData.addEventListener('submit', function (e) {
            e.preventDefault();
        })

        if (this.validationForm()) {
            this.setForm();
        }
    }

    setForm() {
        const user = {
            first_name: this.inputs[0].value,
            last_name: this.inputs[1].value,
            email: this.inputs[2].value,
            password: this.inputs[3].value,
            age: this.inputs[4].value,
        }
        this.registerForm(user);
    }

    async registerForm(userData) {
        const api = await fetch('https://sticky-note-fe.vercel.app/signup', {
            method: 'Post',
            body: JSON.stringify(userData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const response = await api.json();

        if (response.message === 'success') {
            this.alertMsg.classList.add('d-none');
            location.href = `./index.html`;
        }
        else {
            this.alertMsg.innerHTML = response.errors?.email.message; // undifine او null راجع ب  response.errors علشان لو ال ?
            this.alertMsg.classList.remove('d-none');
        }
    }

    // =============> Validation ===============>
    validationForm() {

        if (this.validationName(this.inputs[0]) & this.validationName(this.inputs[1]) &
            this.validationEmail() & this.validationPass() & this.validationAge()) {
            this.isValid = true;
            return true;
        }
        else {
            this.isValid = false;
            return false;
        }
    }

    validationName(input) {
        const regexStyle = /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/
        if (regexStyle.test(input.value)) {

            input.classList.add('is-valid');
            input.classList.remove('is-invalid');
            return true;
        }
        else {

            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            return false;
        }
    }

    validationEmail() {
        const regexStyle = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

        if (regexStyle.test(this.inputs[2].value)) {

            this.inputs[2].classList.add('is-valid');
            this.inputs[2].classList.remove('is-invalid');
            return true;
        }
        else {

            this.inputs[2].classList.add('is-invalid');
            this.inputs[2].classList.remove('is-valid');
            return false;
        }
    }

    validationPass() {
        const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

        if (regexStyle.test(this.inputs[3].value)) {

            this.inputs[3].classList.add('is-valid');
            this.inputs[3].classList.remove('is-invalid');
            return true;
        }
        else {

            this.inputs[3].classList.add('is-invalid');
            this.inputs[3].classList.remove('is-valid');
            return false;
        }
    }

    validationAge() {
        const regexStyle = /^([1-7][0-9]|80)$/

        if (regexStyle.test(this.inputs[4].value)) {

            this.inputs[4].classList.add('is-valid');
            this.inputs[4].classList.remove('is-invalid');
            return true;
        }
        else {

            this.inputs[4].classList.add('is-invalid');
            this.inputs[4].classList.remove('is-valid');
            return false;
        }
    }
}

let register = new Register();
