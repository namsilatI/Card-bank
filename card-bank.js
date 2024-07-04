var visaIcon = "img/visa.png";
var masterIcon = "img/mastercard.png";
var check = "img/icons8-symantec-64.png";
var pay = document.getElementById('variety-list');
var cardSelect = /** @class */ (function () {
    function cardSelect(originalCardNumber, expiration, name, cvvNumber) {
        this.originalCardNumber = originalCardNumber;
        this.expiration = expiration;
        this.name = name;
        this.cvvNumber = cvvNumber;
        this.logo = this.getLogoFromNumber(originalCardNumber);
        this.cardNumber = this.maskCardNumber(originalCardNumber);
        this.expInfo = this.checkExpiration(expiration) ? "Expired" : "Expires";
        this.checkMark = check;
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
    cardSelect.prototype.maskCardNumber = function (cardNumber) {
        var cleanCardNumber = cardNumber.replace(/\s+/g, '');
        var maskedCardNumber = 'XXXX XXXX XXXX ' + cleanCardNumber.slice(-4);
        return maskedCardNumber;
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
        var formattedNumber = formattedCardNumber(cardNumber);
        var newCard = new cardSelect(formattedNumber, expiration, name, cvvNumber);
        cards.push(newCard);
        displayCard(newCard);
        localStorage.setItem("cards", JSON.stringify(cards));
        updatePadding();
    };
    return cardSelect;
}());
var cards = [];
var paymentVariety = document.getElementById('paymentVariety');
var addButton = document.getElementById('buttSubmit');
addButton.addEventListener('click', function () {
    paymentVariety.style.display = "block";
    var newCard = new cardSelect('', '', '', '');
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
    cardAdd.style.display = "flex";
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
    var checkMark = document.createElement("img");
    var cardInfoContainerRigth = document.createElement("div");
    var cardInfoContainerleft = document.createElement("div");
    li.classList.add('border-gradient');
    li.classList.add('border-gradient_purple');
    cardNum.classList.add('items_cardNumber');
    cardStatus.classList.add('items_cardStatus');
    cardDate.classList.add('items_cardDate');
    checkMark.classList.add('items_checkMark');
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
    checkMark.src = card.checkMark;
    li.appendChild(checkMark);
    li.appendChild(cardInfoContainerleft);
    li.appendChild(cardInfoContainerRigth);
    pay.insertBefore(li, pay.firstChild);
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
        paymentVariety.style.display = "block";
        pay.classList.add('with-padding');
    }
    else {
        pay.classList.remove('with-padding');
    }
}
var numberField = document.getElementById('numberField');
numberField.addEventListener('input', function (e) {
    var input = e.target;
    var value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    var cursorPosition = input.selectionStart;
    var beforeCursor = value.substring(0, cursorPosition).replace(/\D/g, '');
    var formattedValue = '';
    for (var i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    var formattedBeforeCursor = '';
    for (var i = 0; i < beforeCursor.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedBeforeCursor += ' ';
        }
        formattedBeforeCursor += beforeCursor[i];
    }
    input.value = formattedValue;
    cursorPosition = formattedBeforeCursor.length;
    input.setSelectionRange(cursorPosition, cursorPosition);
});
var expField = document.getElementById('expField');
expField.addEventListener('input', function (e) {
    var input = e.target;
    var value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    var formattedValue = '';
    for (var i = 0; i < value.length; i++) {
        if (i > 0 && i % 2 === 0) {
            formattedValue += '/';
        }
        formattedValue += value[i];
    }
    input.value = formattedValue;
});
