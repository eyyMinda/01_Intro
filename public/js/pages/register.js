import { isValid } from "../components/isValid.js";

const formDOM = document.querySelector('.form');
const inputsDOM = formDOM.querySelectorAll('input');
const submitDOM = formDOM.querySelector('button');
const notificationsDOM = formDOM.querySelector('.notifications');

if (submitDOM) {
    submitDOM.addEventListener('click', (e) => {
        e.preventDefault();
        notificationsDOM.classList.remove('show');

        const data = {};
        const errors = [];
        for (const inputDOM of inputsDOM) {
            if (inputDOM.type !== 'checkbox') {
                const rule = inputDOM.dataset.validation;
                const [err, msg] = isValid[rule](inputDOM.value);
                if (err) {
                    errors.push(msg);
                } else {
                    data[inputDOM.name] = inputDOM.value;
                }
            } else {
                data[inputDOM.name] = inputDOM.checked;
            }
        }
        if (errors.length) {
            notificationsDOM.classList.add('show');
            notificationsDOM.innerText = errors.join('.\n') + '.';
        }
        console.log(data)
    })
}