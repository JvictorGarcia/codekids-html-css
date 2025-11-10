// assets/js/app.js

(function () {
  // ===== MENU MOBILE =====
  const btn = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (btn && sidebar) {
    btn.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('sidebar-open');
      btn.setAttribute('aria-expanded', isOpen);
    });
  }

  // ===== PROGRESSO DAS AULAS =====
  const STORAGE_KEY = 'codekids-progress';

  // Lê do localStorage
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  // Marca na sidebar o que já estava salvo
  document.querySelectorAll('.lesson-list a[data-lesson]').forEach(link => {
    const id = link.dataset.lesson;
    if (saved.includes(id)) {
      link.classList.add('lesson-done');
    }
  });

  // Descobrir qual página estamos
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf('/') + 1);

  // Mapa de página -> id da aula
  const lessonMap = {
    'intro-html.html': 'intro-html',
    'tags-basicas.html': 'tags-basicas',
    'estrutura-pagina.html': 'estrutura-pagina',
    'introducao-css.html': 'introducao-css',
    'desafio-pessoal.html': 'desafio-pessoal',
    'gabarito-desafio.html': 'desafio-pessoal',
    // se quiser marcar index também:
    // 'index.html': 'inicio'
  };

  const currentLesson = lessonMap[page];

  // Botão de concluir (se existir)
  const concluirBtn = document.getElementById('concluir-aula');

  function salvarProgresso(id) {
    if (!saved.includes(id)) {
      saved.push(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    }
  }

  function marcarLink(id) {
    const link = document.querySelector('.lesson-list a[data-lesson="' + id + '"]');
    if (link) link.classList.add('lesson-done');
  }

  // Se a aula atual já está concluída, atualiza o botão
  if (currentLesson && saved.includes(currentLesson) && concluirBtn) {
    concluirBtn.textContent = 'Concluída ✅';
  }

  // Clique no botão
  if (concluirBtn && currentLesson) {
    concluirBtn.addEventListener('click', () => {
      salvarProgresso(currentLesson);
      marcarLink(currentLesson);
      concluirBtn.textContent = 'Concluída ✅';
    });
  }

})();
