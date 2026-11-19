const questions = [
  {
    question: "Uma mensagem urgente chegou no seu grupo.",
    prompt: "Ela não informa a fonte e pede que você encaminhe imediatamente. Qual é a melhor atitude?",
    options: [
      "Encaminhar logo para alertar todo mundo.",
      "Pausar, procurar a origem e comparar com fontes confiáveis.",
      "Acreditar porque muitas pessoas já compartilharam."
    ],
    answer: 1,
    explanation: "Urgência e popularidade não comprovam uma informação. Verifique a origem antes de compartilhar."
  },
  {
    question: "Uma foto impressionante está sendo compartilhada como se fosse de hoje.",
    prompt: "Como você pode verificar se ela representa o acontecimento atual?",
    options: [
      "Conferir a data, procurar versões anteriores da imagem e comparar o contexto.",
      "Acreditar na legenda se ela tiver muitos comentários.",
      "Olhar apenas se a imagem parece recente."
    ],
    answer: 0,
    explanation: "Imagens antigas podem ser reutilizadas. A data, a origem e o contexto precisam ser confirmados."
  },
  {
    question: "Um vídeo parece mostrar uma pessoa conhecida dizendo algo surpreendente.",
    prompt: "Qual é a forma mais responsável de avaliar se o vídeo é autêntico?",
    options: [
      "Confiar no vídeo porque parece real.",
      "Decidir apenas com base em um detector automático de IA.",
      "Buscar a publicação original e confirmações em fontes independentes."
    ],
    answer: 2,
    explanation: "Vídeos podem ser manipulados, e detectores podem falhar. Procure a origem e outras evidências."
  },
  {
    question: "Uma publicação apresenta um dado alarmante, mas não cita de onde veio.",
    prompt: "O que é melhor fazer antes de acreditar no dado?",
    options: [
      "Compartilhar com um aviso de que talvez seja verdade.",
      "Procurar o estudo ou documento original e conferir data e método.",
      "Acreditar se o número estiver escrito em um gráfico."
    ],
    answer: 1,
    explanation: "Consultar a fonte original ajuda a verificar o contexto, a data e como o dado foi obtido."
  },
  {
    question: "Uma agência de checagem publica uma verificação sobre uma afirmação.",
    prompt: "O que ajuda você a avaliar a qualidade dessa checagem?",
    options: [
      "Ler as fontes, as evidências e a explicação do método usado.",
      "Confiar somente no título ou no rótulo final.",
      "Compartilhar porque a checagem apareceu muitas vezes."
    ],
    answer: 0,
    explanation: "Uma boa checagem apresenta as evidências, explica o método e deixa claras as conclusões."
  }
];

const progress = document.getElementById("quiz-progress");
const title = document.getElementById("titulo-quiz");
const instructions = document.getElementById("quiz-instructions");
const optionsContainer = document.getElementById("quiz-options");
const feedback = document.getElementById("quiz-feedback");
const nextButton = document.getElementById("quiz-next");

let currentQuestion = 0;
let score = 0;
let isComplete = false;

function renderQuestion() {
  const question = questions[currentQuestion];
  progress.textContent = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
  title.textContent = question.question;
  instructions.textContent = question.prompt;
  feedback.textContent = "";
  optionsContainer.replaceChildren();
  nextButton.hidden = true;

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => answerQuestion(index));
    optionsContainer.append(button);
  });
}

function answerQuestion(selectedAnswer) {
  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.answer;

  if (isCorrect) {
    score += 1;
  }

  optionsContainer.querySelectorAll("button").forEach((button, index) => {
    button.disabled = true;
    button.setAttribute("aria-pressed", String(index === selectedAnswer));
  });

  feedback.textContent = `${isCorrect ? "Correto!" : "Ainda não."} ${question.explanation}`;
  nextButton.textContent = currentQuestion === questions.length - 1
    ? "Ver resultado"
    : "Próxima pergunta";
  nextButton.hidden = false;
  nextButton.focus();
}

function showResult() {
  isComplete = true;
  progress.textContent = "Resultado final";
  title.textContent = "Quiz concluído!";
  instructions.textContent = `Você acertou ${score} de ${questions.length} perguntas.`;
  optionsContainer.replaceChildren();
  feedback.textContent = score === questions.length
    ? "Excelente! Você demonstrou atenção à origem, ao contexto e às evidências."
    : "Continue verificando fontes e contexto antes de compartilhar. Você pode tentar novamente.";
  nextButton.textContent = "Refazer quiz";
}

nextButton.addEventListener("click", () => {
  if (isComplete) {
    currentQuestion = 0;
    score = 0;
    isComplete = false;
    renderQuestion();
    return;
  }

  if (currentQuestion === questions.length - 1) {
    showResult();
    return;
  }

  currentQuestion += 1;
  renderQuestion();
});

renderQuestion();
