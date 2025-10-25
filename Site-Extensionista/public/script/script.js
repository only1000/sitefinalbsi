// ===========================
// EFEITO REVEAL NAS SEÇÕES
// ===========================
(function() {
  const sections = document.querySelectorAll("section");

  function revealSections() {
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach(section => {
      const boxTop = section.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        section.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealSections);
  window.addEventListener("load", revealSections);
})();


// ===========================
// CHATBOT SEGURO + INTELIGENTE + FILTRO DE PALAVRÕES
// ===========================
(function() {
  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("chat-send");
  const chatLog = document.getElementById("chat-log");
  const maxLenEl = document.getElementById("max-len");

  const MAX_MESSAGE_LENGTH = 2000;
  const MIN_SEND_INTERVAL_MS = 300;

  if (maxLenEl) maxLenEl.textContent = MAX_MESSAGE_LENGTH;

  let lastSentAt = 0;
  let processing = false;

  // Lista ampliada de palavrões PT-BR e EN (com variações)
  const BAD_WORDS = [
    // português
    "bosta","merda","caralho","porra","puta","puto","vadia","vagabunda","vagabundo",
    "buceta","piroca","rola","pau","cu","cuzão","cuzona","arrombado","arrombada",
    "desgraça","inferno","viado","viadinho","otário","otaria","piranha","corno","corna",
    "bunda","idiota","imbecil","retardado","burro","fdp","filho da puta","merdinha",
    "pqp","cacete","carai","caramba","maldito","capeta","desgraçado","talarico","vaca","gayzinho",
    // variações censuradas comuns
    "p@u","c@","f@ck","sh!t","b!tch","p*ta","f*da","p!r@nh@","b#sta","m#rda","p@ra","c#","g@y",
    // inglês
    "fuck","shit","bitch","asshole","dick","pussy","cock","bastard","slut","whore",
    "nigger","faggot","damn","crap","jerk","moron","retard","ass","bbc","gay"
  ];

  function contemPalavrao(texto) {
    const normalized = texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    return BAD_WORDS.some(p => new RegExp(`\\b${p}\\b`, "i").test(normalized));

  }

  // Funções seguras para inserir mensagens
  function appendUserMessage(text) {
    const div = document.createElement('div');
    div.className = 'user-msg';
    div.setAttribute('data-time', new Date().toISOString());
    div.textContent = text;
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function appendBotMessage(text) {
    const div = document.createElement('div');
    div.className = 'bot-msg';
    div.setAttribute('data-time', new Date().toISOString());
    div.textContent = text;
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function validateMessage(msg) {
    if (!msg || !msg.trim()) return { ok: false, reason: 'Mensagem vazia' };
    if (msg.length > MAX_MESSAGE_LENGTH) return { ok: false, reason: `Mensagem muito longa (máx ${MAX_MESSAGE_LENGTH})` };
    if (contemPalavrao(msg)) return { ok: false, reason: 'Mensagem contém linguagem inapropriada.' };
    return { ok: true };
  }

  // Função principal da IA (respostas mais completas e naturais)
  async function chamarIA(mensagem) {
    const msgLower = mensagem.toLowerCase();

    // Perguntas sobre o que é o curso ou o que faz
    if (
      msgLower.includes("o que é bsi") ||
      msgLower.includes("o que é o curso") ||
      msgLower.includes("sobre o curso") ||
      msgLower.includes("curso bsi") ||
      msgLower.includes("bacharelado") ||
      msgLower.includes("sistemas de informação")
    ) {
      return "O curso de BSI (Bacharelado em Sistemas de Informação) forma profissionais capazes de desenvolver, gerenciar e otimizar sistemas e soluções tecnológicas para empresas e organizações.";
    }

    // Perguntas sobre disciplinas ou matérias
    if (
      msgLower.includes("disciplinas") ||
      msgLower.includes("matérias") ||
      msgLower.includes("materias") ||
      msgLower.includes("estuda o que") ||
      msgLower.includes("quais matérias") ||
      msgLower.includes("quais disciplinas") ||
      msgLower.includes("conteúdo") ||
      msgLower.includes("grade") ||
      msgLower.includes("o que se estuda")
    ) {
      return "As principais disciplinas do curso de BSI incluem: Algoritmos, Programação, Banco de Dados, Engenharia de Software, Inteligência Artificial, Análise de Sistemas, Redes de Computadores, Segurança da Informação e Gestão de Projetos de TI.";
    }

    // Perguntas sobre duração ou tempo
    if (
      msgLower.includes("tempo") ||
      msgLower.includes("duração") ||
      msgLower.includes("anos") ||
      msgLower.includes("semestres") ||
      msgLower.includes("quanto tempo")
    ) {
      return "O curso de Bacharelado em Sistemas de Informação tem duração média de 4 anos, divididos em 8 semestres.";
    }

    // Perguntas sobre linguagens ou programação
    if (
      msgLower.includes("linguagens") ||
      msgLower.includes("programação") ||
      msgLower.includes("programar") ||
      msgLower.includes("desenvolvimento") ||
      msgLower.includes("codar") ||
      msgLower.includes("tecnologias")
    ) {
      return "Durante o curso, você aprenderá linguagens e tecnologias como Python, Java, JavaScript (com React e Node.js), além de desenvolvimento mobile com Flutter ou React Native.";
    }

    // Perguntas sobre IA, dados e áreas relacionadas
    if (
      msgLower.includes("ia") ||
      msgLower.includes("inteligência artificial") ||
      msgLower.includes("dados") ||
      msgLower.includes("machine learning") ||
      msgLower.includes("data science") ||
      msgLower.includes("análise de dados")
    ) {
      return "O curso aborda Inteligência Artificial, Machine Learning, Análise de Dados e Ciência de Dados, preparando você para trabalhar com soluções inteligentes e baseadas em informação.";
    }

    // Perguntas sobre carreira, salário, mercado
    if (
      msgLower.includes("carreira") ||
      msgLower.includes("salário") ||
      msgLower.includes("salario") ||
      msgLower.includes("ganha") ||
      msgLower.includes("quanto ganha") ||
      msgLower.includes("mercado") ||
      msgLower.includes("trabalha com o que")
    ) {
      return "Os profissionais de Sistemas de Informação podem atuar como desenvolvedores, analistas de sistemas, engenheiros de dados, gerentes de TI e muito mais. Os salários variam de R$ 2.500 a mais de R$ 15.000 conforme a experiência.";
    }

    // Perguntas sobre localização, contato ou e-mail
    if (
      msgLower.includes("localização") ||
      msgLower.includes("onde fica") ||
      msgLower.includes("endereço") ||
      msgLower.includes("contato") ||
      msgLower.includes("email") ||
      msgLower.includes("telefone")
    ) {
      return "Estamos localizados em Formosa - GO. Você pode entrar em contato pelo e-mail: pixelperfect.oficial@gmail.com";
    }

    // Perguntas sobre dificuldade
    if (
      msgLower.includes("difícil") ||
      msgLower.includes("facil") ||
      msgLower.includes("dificuldade") ||
      msgLower.includes("difícil") ||
      msgLower.includes("desafio")
    ) {
      return "O curso exige dedicação, mas é acessível a quem gosta de tecnologia, lógica e inovação. O esforço é recompensado com boas oportunidades no mercado.";
    }

    // Se nada foi reconhecido:
    return "Desculpe, não entendi sua pergunta 😅. Tente reformular ou pergunte algo sobre o curso, as disciplinas, o mercado de trabalho ou as linguagens de programação.";
  }

  // Função de envio com proteção e filtro
  async function enviarMensagem() {
    const now = Date.now();
    const userMsg = input.value;

    if (now - lastSentAt < MIN_SEND_INTERVAL_MS) return;

    const v = validateMessage(userMsg);
    if (!v.ok) {
      appendBotMessage(`⚠️ ${v.reason}`);
      input.value = "";
      return;
    }

    lastSentAt = now;
    processing = true;
    sendBtn.disabled = true;

    appendUserMessage(userMsg);
    input.value = "";

    try {
      const resposta = await chamarIA(userMsg);
      appendBotMessage(resposta);
    } catch (err) {
      console.error('Erro no processamento do bot:', err);
      appendBotMessage('Ocorreu um erro interno ao processar sua mensagem.');
    } finally {
      processing = false;
      sendBtn.disabled = false;
    }
  }

  // Eventos
  if (sendBtn) sendBtn.addEventListener("click", enviarMensagem);
  if (input) input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") enviarMensagem();
  });

  if (input) {
    input.addEventListener("paste", (e) => {
      const paste = (e.clipboardData || window.clipboardData).getData('text');
      if (paste && paste.length > MAX_MESSAGE_LENGTH) {
        e.preventDefault();
        appendBotMessage(`Conteúdo colado muito grande (máx ${MAX_MESSAGE_LENGTH} caracteres).`);
      } else if (contemPalavrao(paste)) {
        e.preventDefault();
        appendBotMessage("⚠️ Conteúdo colado contém linguagem inapropriada.");
      }
    });
  }

  window.addEventListener('load', () => {
    if (input) input.focus();
  });
})();
