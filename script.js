const billInput = document.querySelector('.bill');
const tipButtons = document.querySelectorAll('.button-left');
const customTipInput = document.querySelector('.button-left-custom');
const numberOfPeopleInput = document.querySelector('.people');
const resetButton = document.querySelector('.button-right');

let tip = 0;

function resetResults() {
    const tipResult = document.querySelector('.tip-result');
    const totalResult = document.querySelector('.total-result');
    tipResult.innerHTML = '$0.00';
    totalResult.innerHTML = '$0.00';
};

function updateResults(tipAmount, billAmount, peopleAmount) {
    const tipPerTable = (tipAmount / 100) * Number(billAmount.value);
    const tipPerPerson = tipPerTable / Number(peopleAmount.value);
    const totalAmount = Number(billAmount.value) + tipPerTable;
    const totalPerPerson = totalAmount / Number(peopleAmount.value);
    const tipResult = document.querySelector('.tip-result');
    const totalResult = document.querySelector('.total-result');
    tipResult.innerHTML = '$' + tipPerPerson.toFixed(2);
    totalResult.innerHTML = '$' + totalPerPerson.toFixed(2);
};

billInput.addEventListener('input', e => {
    billInput.classList.add('input-colored');
    billInput.value = Number(e.target.value);
    if(numberOfPeopleInput.value > 0 && tip > 0) {
        updateResults(tip, billInput, numberOfPeopleInput);
    };
});

numberOfPeopleInput.addEventListener('input', e => {
    numberOfPeopleInput.classList.add('input-colored');
    numberOfPeopleInput.value = Number(e.target.value);
    if(billInput.value > 0 && tip > 0 && Number(e.target.value) > 0) {
        updateResults(tip, billInput, numberOfPeopleInput);
       } else if(Number(e.target.value) == 0) {
        resetResults();
       };
});

tipButtons.forEach(button => {
    button.addEventListener('click', e => {
    tipButtons.forEach(button => {
        button.classList.remove('button-clicked');
    });
    e.target.classList.add('button-clicked')
    tip = Number(parseInt(e.target.innerHTML, 10));
    if(billInput.value > 0 && numberOfPeopleInput.value > 0) {
        updateResults(tip, billInput, numberOfPeopleInput);
    };
});
});

customTipInput.addEventListener('input', e => {
    tipButtons.forEach(button => {
        button.classList.remove('button-clicked');
    });
    customTipInput.classList.add('input-colored');
    tip = Number(parseInt(e.target.value, 10));
    if(Number(e.target.value) == 0) {
        resetResults();
    }   else if(billInput.value > 0 && numberOfPeopleInput.value > 0) {
        updateResults(tip, billInput, numberOfPeopleInput);
    };
});

resetButton.addEventListener('click', () => {
    billInput.value = '';
    numberOfPeopleInput.value = '';
    tipButtons.forEach(button => {
        button.classList.remove('button-clicked');
    });
    resetResults();
});