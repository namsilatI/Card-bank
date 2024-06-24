const visaIcon: string = "img/visa.png";
const masterIcon: string = "img/mastercard.png"
const pay = document.getElementById('variety-list') as HTMLElement;


class cardSelect{
    cardNumber: number
    expiration: string
    logo!: string;
    constructor(cardNumber: number, expiration: string, logo?: string) {
        this.cardNumber = cardNumber;
        this.expiration = expiration;
        const splitCardNumber = cardNumber.toString().split('');
        if (splitCardNumber[0] === '4') {
            this.logo = visaIcon;
        } else if (splitCardNumber[0] === '5') {
            this.logo = masterIcon;
        } 
    }
}

const card = new cardSelect(434234234, "09/27");

const cardLogo = document.createElement("img");
const cardNum = document.createElement("p");
const cardDate = document.createElement("p");

cardLogo.src = card.logo;
pay.appendChild(cardLogo);
cardNum.innerHTML = card.cardNumber.toString();
pay.appendChild(cardNum);
cardDate.innerHTML = "Expiries " + card.expiration;
pay.appendChild(cardDate);