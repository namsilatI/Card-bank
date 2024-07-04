const visaIcon: string = "img/visa.png";
const masterIcon: string = "img/mastercard.png";
const check: string = "img/icons8-symantec-64.png";
const pay = document.getElementById('variety-list') as HTMLElement;

class cardSelect {
    originalCardNumber: string;
    cardNumber: string;
    expiration: string;
    logo: string;
    expInfo: string;
    name: string;
    cvvNumber: string;
    checkMark: string;

    constructor(originalCardNumber: string, expiration: string, name: string, cvvNumber: string) {
        this.originalCardNumber = originalCardNumber;
        this.expiration = expiration;
        this.name = name;
        this.cvvNumber = cvvNumber;
        this.logo = this.getLogoFromNumber(originalCardNumber);
        this.cardNumber = this.maskCardNumber(originalCardNumber);
        this.expInfo = this.checkExpiration(expiration) ? "Expired" : "Expires";
        this.checkMark = check;
    }
    
    getLogoFromNumber(cardNumber: string) {
        const firstDigit = cardNumber.toString()[0];
        if (firstDigit  === '4') {
            return visaIcon;
        } else if (firstDigit  === '5') {
            return masterIcon;
        } else {
            return 'img/alert-circle-outline.svg';
        }
    }

    checkExpiration(expiration: string): boolean {
        const [expMonth, expYear] = expiration.split('/').map(Number);
        const expDate = new Date(expYear + 2000, expMonth - 1, 1);
        const currentDate = new Date();
        return expDate < currentDate;
    }

    maskCardNumber(cardNumber: string): string{
        let cleanCardNumber = cardNumber.replace(/\s+/g, '');
        let maskedCardNumber = 'XXXX XXXX XXXX ' + cleanCardNumber.slice(-4);
        return maskedCardNumber;
    }

    addCard() {
        const name = (document.getElementById('nameField') as HTMLInputElement).value;
        const cardNumber = (document.getElementById('numberField') as HTMLInputElement).value;
        const expiration = (document.getElementById('expField') as HTMLInputElement).value;
        const cvvNumber = (document.getElementById('cvvField') as HTMLInputElement).value;
                
        if (!cardNumber || !expiration || !cvvNumber) {
            alert("Please fill in all fields correctly.");
            return;
        }
        function formattedCardNumber(cardNumber: string): string{
            return cardNumber.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
        }
    
        const formattedNumber = formattedCardNumber(cardNumber);
    
        const newCard = new cardSelect(formattedNumber, expiration, name, cvvNumber);
        cards.push(newCard);
        displayCard(newCard);
        localStorage.setItem("cards", JSON.stringify(cards));
        updatePadding();
    }
}

type TypeArray = cardSelect[];

let cards: TypeArray = [];

const paymentVariety = document.getElementById('paymentVariety') as HTMLBodyElement;
const addButton = document.getElementById('buttSubmit') as HTMLBodyElement;
addButton.addEventListener('click', function() {
    paymentVariety.style.display = "block";
    const newCard = new cardSelect('', '', '', '');
    newCard.addCard();
});

const savedCards = localStorage.getItem('cards');
if (savedCards) {
    cards = JSON.parse(savedCards);
}

cards.forEach(function(card){
    displayCard(card)
})
updatePadding();

const cardAdd = document.getElementById('cardAdd') as HTMLBodyElement;
const cardAddButton = document.getElementById('buttonAdd') as HTMLBodyElement;
const buttonBlock = document.getElementById('buttonBlock') as HTMLBodyElement;
const cancelButton = document.getElementById('buttCancel') as HTMLBodyElement;


cardAddButton.addEventListener('click', function() {
    cardAdd.style.display = "flex";
})
cancelButton.addEventListener('click', function(){
    cardAdd.style.display = "none";
});


function displayCard(card: cardSelect) {
    const cardLogo = document.createElement("img");
    const cardNum = document.createElement("p");
    const cardStatus = document.createElement("p");
    const cardDate = document.createElement("p");
    const li = document.createElement("li");
    const checkMark = document.createElement("img");

    const cardInfoContainerRigth = document.createElement("div");
    const cardInfoContainerleft = document.createElement("div");

    li.classList.add('border-gradient');
    li.classList.add('border-gradient_purple');
    cardNum.classList.add('items_cardNumber');
    cardStatus.classList.add('items_cardStatus');
    cardDate.classList.add('items_cardDate');
    checkMark.classList.add('items_checkMark');
    cardInfoContainerRigth.classList.add('items_cardInfoContainerRigth');
    cardInfoContainerleft.classList.add('items_cardInfoContainerLeft')

    cardInfoContainerRigth.appendChild(cardStatus);
    cardInfoContainerRigth.appendChild(cardDate);
    cardInfoContainerleft.appendChild(cardLogo);
    cardInfoContainerleft.appendChild(cardNum);

    cardLogo.src = card.logo;
    cardNum.innerHTML = card.cardNumber;
    cardStatus.innerHTML = card.expInfo;
    cardDate.innerHTML = card.expiration;
    checkMark.src = card.checkMark;
    li.appendChild(checkMark);
    li.appendChild(cardInfoContainerleft);
    li.appendChild(cardInfoContainerRigth);

    pay.insertBefore(li, pay.firstChild);

    li.addEventListener('click', function() {
        const allCardItems = document.querySelectorAll('.variety-list_items li');
        allCardItems.forEach(e => {
            if (e !== li) {
                e.classList.remove('active');
            }
        });
        li.classList.toggle('active');
    });
}

function updatePadding() {
    if (cards.length > 0) {
        paymentVariety.style.display = "block";
        pay.classList.add('with-padding');
    } else {
        pay.classList.remove('with-padding');
    }
}

const numberField = document.getElementById('numberField') as HTMLInputElement;
numberField.addEventListener('input', function(e){
    let input = e.target as HTMLInputElement;
    let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let cursorPosition = input.selectionStart as number;
    let beforeCursor = value.substring(0, cursorPosition).replace(/\D/g, '');
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    let formattedBeforeCursor = '';
    for (let i = 0; i < beforeCursor.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedBeforeCursor += ' ';
        }
        formattedBeforeCursor += beforeCursor[i];
    }
    input.value = formattedValue;
    cursorPosition = formattedBeforeCursor.length;
    input.setSelectionRange(cursorPosition, cursorPosition);
});

const expField = document.getElementById('expField') as HTMLInputElement;
expField.addEventListener('input', function(e){
    let input = e.target as HTMLInputElement;
    let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 2 === 0) {
            formattedValue += '/';
        }
        formattedValue += value[i];
    }
    input.value = formattedValue;
});




