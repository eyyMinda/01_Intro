import { isValid } from "../components/isValid.js";

const formDOM = document.querySelector('.form');
const formControlsDOM = formDOM.querySelectorAll('.form-control')
const inputsDOM = formDOM.querySelectorAll('input');
const submitDOM = formDOM.querySelector('button');
const notificationsDOM = formDOM.querySelector('.notifications');

if (submitDOM) {
    submitDOM.addEventListener('click', async (e) => {
        e.preventDefault();
        notificationsDOM.classList.remove('show');
        formControlsDOM.forEach(contr => {
            contr.classList.remove('success');
            contr.classList.remove('error');
        });

        const data = {};
        const errors = [];
        let i = 0;
        for (const inputDOM of inputsDOM) {
            if (inputDOM.type !== 'checkbox') {
                const rule = inputDOM.dataset.validation;
                const [err, msg] = isValid[rule](inputDOM.value);
                if (err) {
                    errors.push(msg);
                    formControlsDOM[i].classList.add('error');
                } else {
                    data[inputDOM.name] = inputDOM.value;
                    formControlsDOM[i].classList.add('success');
                }
            } else {
                data[inputDOM.name] = inputDOM.checked;
                if (!inputDOM.checked) errors.push('Must agree to terms of service');
            }
            i++;
        }
        if (inputsDOM[2].value !== inputsDOM[3].value) {
            errors.push('Passwords do not match');
            formControlsDOM[2].classList.add('error');
            formControlsDOM[3].classList.add('error');
        }
        if (errors.length) {
            notificationsDOM.classList.add('show');
            notificationsDOM.innerText = errors.join('.\n') + '.';
        } else {
            delete data.repass;
            delete data.tos;

            const response = await fetch(formDOM.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();

            console.log(res);

        }
        console.log(data)
    })
}