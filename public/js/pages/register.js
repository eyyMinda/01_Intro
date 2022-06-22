import { isValid } from "../components/isValid.js";

const formDOM = document.querySelector('.form');
const formControlsDOM = formDOM.querySelectorAll('.form-control')
const inputsDOM = formDOM.querySelectorAll('input');
const submitDOM = formDOM.querySelector('button');
const notificationsDOM = formDOM.querySelector('.notifications');

if (submitDOM) {
    submitDOM.addEventListener('click', (e) => {
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
                    if (!errors.includes(msg)) {
                        errors.push(msg);
                    }
                    formControlsDOM[i].classList.add('error');
                } else {
                    data[inputDOM.name] = inputDOM.value;
                    console.log(formControlsDOM[i]);
                    formControlsDOM[i].classList.add('success');
                }
            } else {
                data[inputDOM.name] = inputDOM.checked;
                if (!data[inputDOM.name]) errors.push('Must agree to terms of service');
            }
            i++;
        }
        if (errors.length) {
            notificationsDOM.classList.add('show');
            notificationsDOM.innerText = errors.join('.\n') + '.';
        }
        console.log(data)
    })
}