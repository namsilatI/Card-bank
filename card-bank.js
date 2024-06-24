var visaIcon = "img/visa.png";
var masterIcon = "img/mastercard.png";
var pay = document.getElementById('variety-list');
var cardSelect = /** @class */ (function () {
    function cardSelect(cardNumber, expiration, logo) {
        this.cardNumber = cardNumber;
        this.expiration = expiration;
        var splitCardNumber = cardNumber.toString().split('');
        if (splitCardNumber[0] === '4') {
            this.logo = visaIcon;
        }
        else if (splitCardNumber[0] === '5') {
            this.logo = masterIcon;
        }
    }
    return cardSelect;
}());
var card = new cardSelect(434234234, "09/27");
var cardLogo = document.createElement("img");
var cardNum = document.createElement("p");
var cardDate = document.createElement("p");
cardLogo.src = card.logo;
pay.appendChild(cardLogo);
cardNum.innerHTML = card.cardNumber.toString();
pay.appendChild(cardNum);
cardDate.innerHTML = "Expiries " + card.expiration;
pay.appendChild(cardDate);
