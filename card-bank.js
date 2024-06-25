var visaIcon = "img/visa.png";
var masterIcon = "img/mastercard.png";
var pay = document.getElementById('variety-list');
var cardSelect = /** @class */ (function () {
    function cardSelect(cardNumber, expiration, name, cvvNumber) {
        this.cardNumber = cardNumber;
        this.expiration = expiration;
        this.name = name;
        this.cvvNumber = cvvNumber;
        this.logo = this.splitCardNumber(cardNumber);
        this.expInfo = this.checkExpiration(expiration) ? "Expired" : "Expires";
    }
    cardSelect.prototype.splitCardNumber = function (cardNumber) {
        var firstDigit = cardNumber.toString()[0];
        if (firstDigit === '4') {
            return visaIcon;
        }
        else if (firstDigit === '5') {
            return masterIcon;
        }
        else {
            return 'alert("Wrong card!")';
        }
    };
    cardSelect.prototype.checkExpiration = function (expiration) {
        var _a = expiration.split('/').map(Number), expMonth = _a[0], expYear = _a[1];
        var expDate = new Date(expYear + 2000, expMonth - 1, 1);
        var currentDate = new Date();
        return expDate < currentDate;
    };
    return cardSelect;
}());
var cards = [];
var addButton = document.getElementById('buttSubmit');
addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener('click', addCard);
var savedCards = localStorage.getItem('cards');
if (savedCards) {
    cards = JSON.parse(savedCards);
}
cards.forEach(function (card) {
    displayCard(card);
});
function addCard() {
    var name = document.getElementById('nameField').value;
    var cardNumber = parseInt(document.getElementById('numberField').value);
    var expiration = document.getElementById('expField').value;
    var cvvNumber = document.getElementById('cvvField').value;
    if (isNaN(cardNumber) || !expiration || !cvvNumber) {
        alert("Please fill in all fields correctly.");
        return;
    }
    var newCard = new cardSelect(cardNumber, expiration, name, cvvNumber);
    cards.push(newCard);
    displayCard(newCard);
    localStorage.setItem("cards", JSON.stringify(cards));
}
function displayCard(card) {
    var cardLogo = document.createElement("img");
    var cardNum = document.createElement("p");
    var cardStatus = document.createElement("p");
    var cardDate = document.createElement("p");
    var li = document.createElement("li");
    cardLogo.src = card.logo;
    li.appendChild(cardLogo);
    cardNum.innerHTML = card.cardNumber.toString();
    li.appendChild(cardNum);
    cardStatus.innerHTML = card.expInfo;
    li.appendChild(cardStatus);
    cardDate.innerHTML = card.expiration;
    li.appendChild(cardDate);
    pay.appendChild(li);
}
