let scrollPosition = 0;
let isBodyLocked = false;

// Adiciona funcionalidade ao navbar-burger
document.addEventListener('DOMContentLoaded', () => {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    
    $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
            const target = el.dataset.target;
            const $target = document.getElementById(target);
            
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
        });
    });

    // Implementação simples do carrossel
    document.querySelectorAll('.carousel').forEach(carousel => {
        const items = carousel.querySelectorAll('.carousel-item');
        let currentItem = 0;
        
        carousel.querySelector('.carousel-next').addEventListener('click', () => {
            items[currentItem].classList.remove('is-active');
            currentItem = (currentItem + 1) % items.length;
            items[currentItem].classList.add('is-active');
        });
        
        carousel.querySelector('.carousel-prev').addEventListener('click', () => {
            items[currentItem].classList.remove('is-active');
            currentItem = (currentItem - 1 + items.length) % items.length;
            items[currentItem].classList.add('is-active');
        });
    });
});

document.addEventListener('click', function (event) {
    createPopup(event.clientX, event.clientY);
});

function createPopup(x, y) {
    if (!isBodyLocked) {
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    }

    if (!document.body.classList.contains('body-locked')) {
        document.body.classList.add('body-locked');
        document.body.style.top = `-${scrollPosition}px`;
        isBodyLocked = true;
    }

    const modal = document.createElement('div');
    modal.className = 'modal is-active';
    modal.innerHTML = `
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Atenção</p>
                <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <img src="https://i.pinimg.com/736x/80/f1/77/80f177e52d4cea3ba457d66fe82fc7ed.jpg" style="width:120px;height:auto;display:block;margin:0 auto 1rem;">
                <p class="card-text">Sistema invadido<br>Deseja obter nosso Antivírus ${getRandomQuestionMarks()}</p>
                <div class="buttons">
                    <button class="button is-primary">Sim</button>
                    <button class="button is-danger" id="noButton">Não</button>
                </div>
            </section>
        </div>
    `;

    document.body.appendChild(modal);

    // Fechar modal
    modal.querySelector('.modal-background, .delete').addEventListener('click', () => {
        modal.remove();
        document.body.classList.remove('body-locked');
        window.scrollTo(0, scrollPosition);
        isBodyLocked = false;
    });

    // Botão "Não" com notificação
    modal.querySelector('#noButton').addEventListener('click', () => {
        showNotification();
        modal.remove();
        document.body.classList.remove('body-locked');
        window.scrollTo(0, scrollPosition);
        isBodyLocked = false;
    });
}

function getRandomQuestionMarks() {
    const qtd_question_mark = ["?", "??", "???", "????", "?????", "??????", "???????", "?????????"];
    return qtd_question_mark[Math.floor(Math.random() * qtd_question_mark.length)];
}

function showNotification() {
    const loading = [
        "[          ]  0%",
        "[█         ] 10%",
        "[██        ] 20%",
        "[███       ] 30%",
        "[████      ] 40%",
        "[█████     ] 50%",
        "[██████    ] 60%",
        "[███████   ] 70%",
        "[████████  ] 80%",
        "[█████████ ] 90%",
        "[██████████] 99%"
    ];
    
    const loadingText = loading[Math.floor(Math.random() * loading.length)];
    
    const notification = document.createElement('div');
    notification.className = 'notification is-danger';
    notification.innerHTML = `
        <button class="delete"></button>
        <strong>Agradecemos a preferência</strong><br>
        <div style="font-family: monospace; white-space: pre">Carregando... ${loadingText}</div>
    `;
    
    document.body.appendChild(notification);
    
    notification.querySelector('.delete').addEventListener('click', () => {
        notification.remove();
    });
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}