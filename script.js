  let scrollPosition = 0;
  let isBodyLocked = false;

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

    var popup = document.createElement('div');
    popup.className = 'popup';

    var randomOffsetX = (Math.random() * 200) - 100;
    var randomOffsetY = (Math.random() * 200) - 100;

    var posX = Math.max(10, Math.min(window.innerWidth - 220, x + randomOffsetX));
    var posY = Math.max(10, Math.min(window.innerHeight - 150, y + randomOffsetY));

    popup.style.left = `${posX}px`;
    popup.style.top = `${posY}px`;

    var qtd_question_mark = ["?", "??", "???", "????", "?????", "??????", "???????", "?????????"];
    var question = qtd_question_mark[Math.floor(Math.random() * qtd_question_mark.length)];

    var loading = [
      "[&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]&nbsp;&nbsp;0%",
      "[█&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]&nbsp;10%",
      "[██&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]&nbsp;20%",
      "[███&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]&nbsp;30%",
      "[████&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]&nbsp;40%",
      "[█████&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]&nbsp;50%",
      "[██████&nbsp;&nbsp;&nbsp;&nbsp;]&nbsp;60%",
      "[███████&nbsp;&nbsp;&nbsp;]&nbsp;70%",
      "[████████&nbsp;&nbsp;]&nbsp;80%",
      "[█████████&nbsp;]&nbsp;90%",
      "[██████████]&nbsp;99%"
    ];

    var loadingText = loading[Math.floor(Math.random() * loading.length)];

    popup.innerHTML = `
      <div class="card popup-card">
          <img src="https://i.pinimg.com/736x/80/f1/77/80f177e52d4cea3ba457d66fe82fc7ed.jpg" class="card-img-top" alt="Warning sign">
          <div class="card-body">
              <h5 class="card-title">Atenção</h5>
              <p class="card-text">Sistema invadido<br>Deseja obter nosso Antivírus ${question}</p>
              <div class="buttons-container">
                  <button type="button" class="btn btn-primary">Sim</button>
                  <button type="button" class="btn btn-danger" data-bs-toggle="popover" 
                          data-bs-title="Agradecemos a preferência" 
                          data-bs-content="<div style='font-family: monospace; white-space: pre'>Carregando... ${loadingText}</div>"
                          data-bs-html="true">
                      Não
                  </button>
              </div>
          </div>
      </div>
    `;

    document.body.appendChild(popup);

    if (typeof bootstrap !== 'undefined') {
      var popoverTrigger = popup.querySelector('[data-bs-toggle="popover"]');
      new bootstrap.Popover(popoverTrigger, {
        sanitize: false,
        html: true
      });
    }
  }