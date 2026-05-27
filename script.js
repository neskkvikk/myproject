//Бургер-меню
var hamburger = document.querySelector('.hamburger');
var navbarCollapse = document.querySelector('.navbar-collapse');
if (hamburger && navbarCollapse) {
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        navbarCollapse.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    document.addEventListener('click', function(e) {
        if (navbarCollapse.classList.contains('active') && 
            !navbarCollapse.contains(e.target) && 
            e.target !== hamburger) {
            navbarCollapse.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    var navLinks = navbarCollapse.querySelectorAll('.nav-link');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function() {
            navbarCollapse.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    }
}

//Слайдер фото на странице "Услуги"
var sliderContainers = document.querySelectorAll('.slider-container');
sliderContainers.forEach(function(container) {
    var slider = container.querySelector('.slider');
    var prevButton = container.querySelector('.prev-button');
    var nextButton = container.querySelector('.next-button');
    if (!slider || !prevButton || !nextButton) {
        return; 
    }
    var slides = Array.from(slider.querySelectorAll('img'));
    var totalSlides = slides.length;
    var currentIndex = 0;
    function updateSlider() {
        for (var i = 0; i < slides.length; i++) {
            if (i === currentIndex) {
                slides[i].style.display = 'block'; 
            } else {
                slides[i].style.display = 'none'; 
            }
        }
    }
    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });
    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
        updateSlider();
    });
    
    updateSlider();
});

//Подсказки на меню
document.addEventListener('DOMContentLoaded', function() {
    var tooltipElements = document.querySelectorAll('[data-tooltip]');
    var tooltip = document.getElementById('tooltip');
    tooltipElements.forEach(function(element) {
        element.addEventListener('mouseenter', function() {
            var tooltipText = this.getAttribute('data-tooltip');
            if (tooltipText && tooltipText.length > 0 && tooltip) {
                tooltip.textContent = tooltipText;
                var rect = this.getBoundingClientRect();
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
                tooltip.style.top = (rect.bottom + scrollTop + 5) + 'px';
                tooltip.style.left = (rect.left + scrollLeft) + 'px';
                tooltip.style.display = 'block';
            }
        });
        element.addEventListener('mouseleave', function() {
            if (tooltip) {
                tooltip.style.display = 'none';
                tooltip.textContent = '';
            }
        });
    });
});

//Валидация формы на странице "Контакты"
var form = document.querySelector('form');
var nameInput = document.getElementById('name');
var phoneInput = document.getElementById('phone');
var emailInput = document.getElementById('email');
var messageInput = document.getElementById('message');

function showError(input, msg) {
    var oldError = input.parentElement.querySelector('.error-message');
    if (oldError) {
        oldError.remove();
    }
    input.classList.add('error');
    var errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = msg;
    input.parentElement.appendChild(errorDiv);
}

function clearError(input) {
    input.classList.remove('error');
    var error = input.parentElement.querySelector('.error-message');
    if (error) {
        error.remove();
    }
}

function validateName() {
    var value = nameInput.value.trim();
    var regex = /^[a-zA-Zа-яА-ЯёЁ\s\-]{2,50}$/;
    if (!value) {
        showError(nameInput, 'Введите имя');
        return false;
    }
    if (!regex.test(value)) {
        showError(nameInput, 'Только буквы, пробелы и дефисы (2-50 символов)');
        return false;
    }
    clearError(nameInput);
    return true;
}

function validatePhone() {
    var value = phoneInput.value.trim();
    if (!value) {
        clearError(phoneInput);
        return true;
    }
    var regex = /^(\+7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    var digits = value.replace(/\D/g, '');
    if (!regex.test(value)) {
        showError(phoneInput, 'Формат: +7 123 456-78-90');
        return false;
    }
    if (digits.length !== 10 && digits.length !== 11) {
        showError(phoneInput, 'Должно быть 10 или 11 цифр');
        return false;
    }
    clearError(phoneInput);
    return true;
}

function validateEmail() {
    var value = emailInput.value.trim();
    var regex = /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,6}$/;
    
    if (!value) {
        showError(emailInput, 'Введите email');
        return false;
    }
    if (!regex.test(value)) {
        showError(emailInput, 'Пример: name@mail.ru (только латиница, цифры, точки, дефисы)');
        return false;
    }
    clearError(emailInput);
    return true;
}

function validateMessage() {
    var value = messageInput.value.trim();
    if (!value) {
        showError(messageInput, 'Напишите сообщение');
        return false;
    }
    if (value.length < 10) {
        showError(messageInput, 'Минимум 10 символов');
        return false;
    }
    if (value.length > 500) {
        showError(messageInput, 'Максимум 500 символов');
        return false;
    }
    clearError(messageInput);
    return true;
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    var isNameValid = validateName();
    var isPhoneValid = validatePhone();
    var isEmailValid = validateEmail();
    var isMessageValid = validateMessage();
    
    if (isNameValid && isPhoneValid && isEmailValid && isMessageValid) {
        alert('Форма заполнена верно!');
        location.reload();
    }
});

nameInput.addEventListener('input', function() { 
    clearError(nameInput);
});

phoneInput.addEventListener('input', function() { 
    clearError(phoneInput);
});

emailInput.addEventListener('input', function() { 
    clearError(emailInput);
});

messageInput.addEventListener('input', function() { 
    clearError(messageInput);
});