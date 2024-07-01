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
var cardAdd = document.getElementById('cardAdd');
var cardAddButton = document.getElementById('buttonAdd');
var buttonBlock = document.getElementById('buttonBlock');
cardAddButton.addEventListener('click', function () {
    cardAdd.style.display = "block";
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
    buttonBlock.style.paddingTop = "40px";
    displayCard(newCard);
    localStorage.setItem("buttonBlockPaddingTop", buttonBlock.style.paddingTop);
    localStorage.setItem("cards", JSON.stringify(cards));
    var savedPaddingTop = localStorage.getItem("buttonBlockPaddingTop");
    if (savedPaddingTop) {
        buttonBlock.style.paddingTop = savedPaddingTop;
    }
}
function displayCard(card) {
    var cardLogo = document.createElement("img");
    var cardNum = document.createElement("p");
    var cardStatus = document.createElement("p");
    var cardDate = document.createElement("p");
    var li = document.createElement("li");
    var checkMark = document.createElement("img");
    var cardInfoContainerRigth = document.createElement("div");
    var cardInfoContainerleft = document.createElement("div");
    li.classList.add('border-gradient');
    li.classList.add('border-gradient_purple');
    cardNum.classList.add('items_cardNumber');
    cardStatus.classList.add('items_cardStatus');
    cardDate.classList.add('items_cardDate');
    cardInfoContainerRigth.classList.add('items_cardInfoContainerRigth');
    cardInfoContainerleft.classList.add('items_cardInfoContainerLeft');
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
    li.addEventListener('click', function () {
        var allCardItems = document.querySelectorAll('.variety-list_items li');
        allCardItems.forEach(function (e) {
            if (e !== li) {
                e.classList.remove('active');
            }
        });
        li.classList.toggle('active');
    });
}
