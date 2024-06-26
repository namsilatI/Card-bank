const visaIcon: string = "img/visa.png";
const masterIcon: string = "img/mastercard.png";
const pay = document.getElementById('variety-list') as HTMLElement;

class cardSelect {
    cardNumber: number;
    expiration: string;
    logo: string;
    expInfo: string;
    name: string;
    cvvNumber: string;

    constructor(cardNumber: number, expiration: string, name: string, cvvNumber: string) {
        this.cardNumber = cardNumber;
        this.expiration = expiration;
        this.name = name;
        this.cvvNumber = cvvNumber;
        this.logo = this.splitCardNumber(cardNumber);
        this.expInfo = this.checkExpiration(expiration) ? "Expired" : "Expires";
    }
    
    splitCardNumber(cardNumber: number): string {
        const firstDigit = cardNumber.toString()[0];
        if (firstDigit  === '4') {
            return visaIcon;
        } else if (firstDigit  === '5') {
            return masterIcon;
        } else {
            return 'alert("Wrong card!")';
        }
    }

    checkExpiration(expiration: string): boolean {
        const [expMonth, expYear] = expiration.split('/').map(Number);
        const expDate = new Date(expYear + 2000, expMonth - 1, 1);
        const currentDate = new Date();
        return expDate < currentDate;
    }

    
}

type TypeArray = cardSelect[];

let cards: TypeArray = [];

const addButton = document.getElementById('buttSubmit');
addButton?.addEventListener('click', addCard);

const savedCards = localStorage.getItem('cards');
if (savedCards) {
    cards = JSON.parse(savedCards);
}

cards.forEach(function(card){
    displayCard(card)
})


function addCard() {
    const name = (document.getElementById('nameField') as HTMLInputElement).value;
    const cardNumber = parseInt((document.getElementById('numberField') as HTMLInputElement).value);
    const expiration = (document.getElementById('expField') as HTMLInputElement).value;
    const cvvNumber = (document.getElementById('cvvField') as HTMLInputElement).value;

    if (isNaN(cardNumber) || !expiration || !cvvNumber) {
        alert("Please fill in all fields correctly.");
        return;
    }

    const newCard = new cardSelect(cardNumber, expiration, name, cvvNumber);
    cards.push(newCard);
    displayCard(newCard);

    localStorage.setItem("cards", JSON.stringify(cards));
}

function displayCard(card: cardSelect) {
    const cardLogo = document.createElement("img");
    const cardNum = document.createElement("p");
    const cardStatus = document.createElement("p");
    const cardDate = document.createElement("p");
    const li = document.createElement("li");

    const cardInfoContainerRigth = document.createElement("div");
    const cardInfoContainerleft = document.createElement("div");

    cardNum.classList.add('items_cardNumber');
    cardStatus.classList.add('items_cardStatus');
    cardDate.classList.add('items_cardDate');
    cardInfoContainerRigth.classList.add('items_cardInfoContainerRigth');
    cardInfoContainerleft.classList.add('items_cardInfoContainerLeft')

    cardInfoContainerRigth.appendChild(cardStatus);
    cardInfoContainerRigth.appendChild(cardDate);
    cardInfoContainerleft.appendChild(cardLogo);
    cardInfoContainerleft.appendChild(cardNum);

    cardLogo.src = card.logo;
    cardNum.innerHTML = card.cardNumber.toString();
    cardStatus.innerHTML = card.expInfo;
    cardDate.innerHTML = card.expiration;
    li.appendChild(cardInfoContainerleft);
    li.appendChild(cardInfoContainerRigth);

    pay.appendChild(li);
}

