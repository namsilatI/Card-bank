var visaIcon = "img/visa.png";
var masterIcon = "img/mastercard.png";
var pay = document.getElementById('variety-list');
var cardSelect = /** @class */ (function () {
    function cardSelect(cardNumber, expiration, name, cvvNumber) {
        this.cardNumber = cardNumber;
        this.expiration = expiration;
        this.name = name;
        this.cvvNumber = cvvNumber;
        this.logo = this.getLogoFromNumber(cardNumber);
        this.expInfo = this.checkExpiration(expiration) ? "Expired" : "Expires";
    }
    cardSelect.prototype.getLogoFromNumber = function (cardNumber) {
        var firstDigit = cardNumber.toString()[0];
        if (firstDigit === '4') {
            return visaIcon;
        }
        else if (firstDigit === '5') {
            return masterIcon;
        }
        else {
            return 'img/alert-circle-outline.svg';
        }
    };
    cardSelect.prototype.checkExpiration = function (expiration) {
        var _a = expiration.split('/').map(Number), expMonth = _a[0], expYear = _a[1];
        var expDate = new Date(expYear + 2000, expMonth - 1, 1);
        var currentDate = new Date();
        return expDate < currentDate;
    };
    cardSelect.prototype.addCard = function () {
        var name = document.getElementById('nameField').value;
        var cardNumber = document.getElementById('numberField').value;
        var expiration = document.getElementById('expField').value;
        var cvvNumber = document.getElementById('cvvField').value;
        if (!cardNumber || !expiration || !cvvNumber) {
            alert("Please fill in all fields correctly.");
            return;
        }
        function formattedCardNumber(cardNumber) {
            return cardNumber.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
        }
        function maskCardNumber(cardNumber) {
            var cleanCardNumber = cardNumber.replace(/\s+/g, '');
            var maskedCardNumber = 'XXXX XXXX XXXX ' + cleanCardNumber.slice(-4);
            return maskedCardNumber;
        }
        var formattedNumber = formattedCardNumber(cardNumber);
        var maskedNumber = maskCardNumber(formattedNumber);
        var newCard = new cardSelect(maskedNumber, expiration, name, cvvNumber);
        cards.push(newCard);
        displayCard(newCard);
        localStorage.setItem("cards", JSON.stringify(cards));
        updatePadding();
        return this.getLogoFromNumber(cardNumber);
    };
    return cardSelect;
}());
var cards = [];
var addButton = document.getElementById('buttSubmit');
addButton.addEventListener('click', function () {
    var newCard = new cardSelect('', '', '', ''); // Pass empty strings or default values as placeholders
    newCard.addCard();
});
var savedCards = localStorage.getItem('cards');
if (savedCards) {
    cards = JSON.parse(savedCards);
}
cards.forEach(function (card) {
    displayCard(card);
});
updatePadding();
var cardAdd = document.getElementById('cardAdd');
var cardAddButton = document.getElementById('buttonAdd');
var buttonBlock = document.getElementById('buttonBlock');
var cancelButton = document.getElementById('buttCancel');
cardAddButton.addEventListener('click', function () {
    cardAdd.style.display = "block";
});
cancelButton.addEventListener('click', function () {
    cardAdd.style.display = "none";
});
function displayCard(card) {
    var cardLogo = document.createElement("img");
    var cardNum = document.createElement("p");
    var cardStatus = document.createElement("p");
    var cardDate = document.createElement("p");
    var li = document.createElement("li");
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
    cardNum.innerHTML = card.cardNumber;
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
function updatePadding() {
    if (cards.length > 0) {
        pay.classList.add('with-padding');
    }
    else {
        pay.classList.remove('with-padding');
    }
}
