const visaIcon: string = "img/visa.png";
const masterIcon: string = "img/mastercard.png";
const pay = document.getElementById('variety-list') as HTMLElement;

class cardSelect {
    cardNumber: string;
    expiration: string;
    logo: string;
    expInfo: string;
    name: string;
    cvvNumber: string;

    constructor(cardNumber: string, expiration: string, name: string, cvvNumber: string) {
        this.cardNumber = cardNumber;
        this.expiration = expiration;
        this.name = name;
        this.cvvNumber = cvvNumber;
        this.logo = this.getLogoFromNumber(cardNumber);
        this.expInfo = this.checkExpiration(expiration) ? "Expired" : "Expires";
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
        function maskCardNumber(cardNumber: string): string{
            let cleanCardNumber = cardNumber.replace(/\s+/g, '');
            let maskedCardNumber = 'XXXX XXXX XXXX ' + cleanCardNumber.slice(-4);
            return maskedCardNumber;
        }
    
        const formattedNumber = formattedCardNumber(cardNumber);
        const maskedNumber = maskCardNumber(formattedNumber);
    
        const newCard = new cardSelect(maskedNumber, expiration, name, cvvNumber);
        cards.push(newCard);
        displayCard(newCard);
        localStorage.setItem("cards", JSON.stringify(cards));
        updatePadding();
    }
}

type TypeArray = cardSelect[];

let cards: TypeArray = [];

const addButton = document.getElementById('buttSubmit') as HTMLBodyElement;
addButton.addEventListener('click', function() {
    const newCard = new cardSelect('', '', '', ''); // Pass empty strings or default values as placeholders
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
    cardAdd.style.display = "block";
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

    const cardInfoContainerRigth = document.createElement("div");
    const cardInfoContainerleft = document.createElement("div");

    li.classList.add('border-gradient');
    li.classList.add('border-gradient_purple');
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
    cardNum.innerHTML = card.cardNumber;
    cardStatus.innerHTML = card.expInfo;
    cardDate.innerHTML = card.expiration;
    li.appendChild(cardInfoContainerleft);
    li.appendChild(cardInfoContainerRigth);

    pay.appendChild(li);

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
        pay.classList.add('with-padding');
    } else {
        pay.classList.remove('with-padding');
    }
}



