document.addEventListener("DOMContentLoaded", function() {
    //обновление нумерации
    function updateNumbers() {
        var cards = document.querySelectorAll('.cards .card');
        cards.forEach(function(card, index) {
            var numberDiv = card.querySelector('.number');
            if (numberDiv) {
                numberDiv.textContent = index + 1;
            }
        });
    }

    //сохранение в localStorage
    function saveToLocalStorage() {
        var cards = [];
        var allCards = document.querySelectorAll('.cards .card');
        for (var i = 0; i < allCards.length; i++) {
            var card = allCards[i];
            var nameElement = card.querySelector('.name');
            var textElement = card.querySelector('.text');
            var name = nameElement ? nameElement.textContent : '';
            var text = textElement ? textElement.textContent : '';
            cards.push({ name: name, text: text });
        }
        localStorage.setItem('cards', JSON.stringify(cards));
    }

    //загрузка из localStorage
    function loadFromLocalStorage() {
        var saved = localStorage.getItem('cards');
        if (saved) {
            var cards = JSON.parse(saved);
            var container = document.querySelector('.cards');
            if (container) {
                container.innerHTML = '';
                for (var i = 0; i < cards.length; i++) {
                    addCardToDOM(cards[i].name, cards[i].text, false);
                }
                updateNumbers();
            }
        }
    }

    //добавление карточки
    function addCardToDOM(name, text, save) {
        if (save === undefined) {
            save = true;
        }
        var cardsContainer = document.querySelector('.cards');
        if (!cardsContainer) return;
        
        var newCard = document.createElement('div');
        newCard.className = 'card';
        newCard.innerHTML = '<div class="number"></div><h4 class="name">' + name + '</h4><p class="text">' + text + '</p>';
        cardsContainer.appendChild(newCard);
        
        updateNumbers();
        
        if (save) {
            saveToLocalStorage();
        }
    }

    //валидация формы
    function validateForm(nameInput, textInput) {
        var isValid = true;
        
        if (!nameInput.value.trim()) {
            nameInput.classList.add('error');
            isValid = false;
        } else {
            nameInput.classList.remove('error');
        }
        
        if (!textInput.value.trim()) {
            textInput.classList.add('error');
            isValid = false;
        } else {
            textInput.classList.remove('error');
        }
        
        return isValid;
    }

    //отправка формы
    var form = document.getElementById('add-card');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var nameInput = document.getElementById('in-name');
            var textInput = document.getElementById('in-text');
            
            if (!nameInput || !textInput) return;
            
            if (validateForm(nameInput, textInput)) {
                addCardToDOM(nameInput.value.trim(), textInput.value.trim(), true);
                
                nameInput.value = '';
                textInput.value = '';
                nameInput.classList.remove('error');
                textInput.classList.remove('error');
                
                var submitBtn = form.querySelector('button[type="submit"]');
                var originalText = submitBtn.textContent;
                submitBtn.textContent = 'Добавлено!';
                setTimeout(function() {
                    submitBtn.textContent = originalText;
                }, 1500);
            }
        });
        
        var nameInput = document.getElementById('in-name');
        var textInput = document.getElementById('in-text');
        
        if (nameInput) {
            nameInput.addEventListener('input', function() {
                if (nameInput.value.trim()) {
                    nameInput.classList.remove('error');
                }
            });
        }
        
        if (textInput) {
            textInput.addEventListener('input', function() {
                if (textInput.value.trim()) {
                    textInput.classList.remove('error');
                }
            });
        }
    }
    
    updateNumbers();
    loadFromLocalStorage();

    //слайдер
    var slider = document.querySelector('.slider');
    var track = document.querySelector('.anim');
    var slides = document.querySelectorAll('.slider img');
    
    if (slider && track && slides.length > 0) {
        var currentIndex = 0;
        var startX = 0;
        var endX = 0;
        var isDragging = false;
        
        function moveSlider() {
            if (track) {
                track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
            }
        }
        
        function handleSwipe() {
            var swipeThreshold = 50;
            var diff = startX - endX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    currentIndex = (currentIndex + 1) % slides.length;
                } else {
                    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                }
                moveSlider();
            }
        }
        slider.addEventListener('mousedown', function(e) {
            startX = e.clientX;
            isDragging = true;
            slider.style.cursor = 'grabbing';
        });
        slider.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            e.preventDefault();
        });
        slider.addEventListener('mouseup', function(e) {
            if (!isDragging) return;
            endX = e.clientX;
            handleSwipe();
            isDragging = false;
            slider.style.cursor = 'grab';
        });
        slider.addEventListener('mouseleave', function() {
            if (isDragging) {
                isDragging = false;
                slider.style.cursor = 'grab';
            }
        });
        slider.style.cursor = 'grab';
    }
});