const quizData = [
  {
    question: "You're faced with a new AI tool for your classroom. What's your first instinct?",
    options: [
      { text: "Dive right in and experiment with every feature", type: "explorer" },
      { text: "Research its pedagogical impact and alignment with learning goals first", type: "architect" },
      { text: "Check privacy policies and potential biases before letting students use it", type: "guardian" },
      { text: "Ask colleagues for their experiences and recommendations", type: "collaborator" }
    ]
  },
  {
    question: "A student uses AI to write an essay. How do you respond?",
    options: [
      { text: "See it as an opportunity to discuss AI capabilities and limitations", type: "explorer" },
      { text: "Redesign the assignment to require critical thinking AI can't replicate", type: "architect" },
      { text: "Facilitate a class discussion on academic integrity and AI ethics", type: "guardian" },
      { text: "Work with other teachers to develop a shared policy", type: "collaborator" }
    ]
  },
  {
    question: "Your school wants to adopt an AI tutoring system. Your priority is:",
    options: [
      { text: "Piloting it with a small group to see what happens", type: "explorer" },
      { text: "Mapping how it fits into the broader curriculum strategy", type: "architect" },
      { text: "Ensuring it protects student data and doesn't reinforce inequities", type: "guardian" },
      { text: "Getting input from teachers, students, and parents before deciding", type: "collaborator" }
    ]
  },
  {
    question: "Which statement resonates most with your teaching philosophy?",
    options: [
      { text: "Learning happens through discovery and experimentation", type: "explorer" },
      { text: "Every tool should serve a clear learning objective", type: "architect" },
      { text: "Technology must be evaluated through an ethical lens first", type: "guardian" },
      { text: "The best solutions emerge from collective wisdom", type: "collaborator" }
    ]
  },
  {
    question: "You have 30 minutes to learn a new AI tool. You spend it:",
    options: [
      { text: "Clicking around and trying different features intuitively", type: "explorer" },
      { text: "Reading documentation and planning how to integrate it", type: "architect" },
      { text: "Investigating who built it and what data it collects", type: "guardian" },
      { text: "Watching tutorial videos and joining community forums", type: "collaborator" }
    ]
  }
];

const results = {
  explorer: {
    emoji: "🚀",
    title: "The Curious Explorer",
    desc: "You learn by doing, experimenting, and discovering. In the AI era, you're the early adopter who finds creative ways to engage students with new tools. Your superpower is adaptability — you turn uncertainty into opportunity. Just remember to pause occasionally and reflect on the 'why' behind the tools you adopt.",
    traits: ["Experimental", "Adaptable", "Creative", "Risk-tolerant"]
  },
  architect: {
    emoji: "🏗️",
    title: "The Strategic Architect",
    desc: "You see the big picture. Every AI tool is evaluated against learning outcomes and curriculum goals. You're the bridge between innovation and pedagogy, ensuring technology serves education — not the other way around. Your methodical approach prevents shiny-object syndrome, but don't forget to leave room for serendipity.",
    traits: ["Strategic", "Goal-oriented", "Systematic", "Visionary"]
  },
  guardian: {
    emoji: "🛡️",
    title: "The Ethical Guardian",
    desc: "You put people before technology. Privacy, equity, and ethical considerations are your north star. In a world rushing to adopt AI, you're the essential voice asking: 'At what cost?' Your students benefit from your protective wisdom. Challenge yourself to also embrace AI's potential when safeguards are in place.",
    traits: ["Principled", "Protective", "Analytical", "Advocate"]
  },
  collaborator: {
    emoji: "🤝",
    title: "The Connected Collaborator",
    desc: "You believe the best learning happens together. You build networks, share discoveries, and create collective knowledge. In the AI age, you're the community builder who ensures no one is left behind. Your collaborative spirit is infectious. Remember that sometimes quick individual exploration can complement group learning.",
    traits: ["Social", "Empathetic", "Networked", "Inclusive"]
  }
};

let currentQ = 0;
let scores = { explorer: 0, architect: 0, guardian: 0, collaborator: 0 };

function initQuiz() {
  currentQ = 0;
  scores = { explorer: 0, architect: 0, guardian: 0, collaborator: 0 };
  document.getElementById('progress').style.display = 'flex';
  renderQuestion();
}

function renderQuestion() {
  const q = quizData[currentQ];
  const progress = ((currentQ) / quizData.length) * 100;
  document.getElementById('progressFill').style.width = progress + '%';
  
  let html = `<div class="quiz-question">${currentQ + 1}. ${q.question}</div><div class="quiz-options">`;
  q.options.forEach((opt, i) => {
    html += `
      <div class="quiz-option" data-type="${opt.type}">
        <div class="quiz-option-letter">${String.fromCharCode(65 + i)}</div>
        <div class="quiz-option-text">${opt.text}</div>
      </div>
    `;
  });
  html += '</div>';
  document.getElementById('quizContent').innerHTML = html;
  
  // Add click listeners
  document.querySelectorAll('.quiz-option').forEach(el => {
    el.addEventListener('click', function() {
      selectOption(this.getAttribute('data-type'));
    });
  });
}

function selectOption(type) {
  scores[type]++;
  currentQ++;
  
  if (currentQ < quizData.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const r = results[winner];
  document.getElementById('progress').style.display = 'none';
  
  const shareText = `I am ${r.title} 🎯 Discover your AI Learning Style!`;
  
  document.getElementById('quizContent').innerHTML = `
    <div class="result-card">
      <div class="result-emoji">${r.emoji}</div>
      <h2 class="result-title">${r.title}</h2>
      <p class="result-desc">${r.desc}</p>
      <div class="result-traits">
        ${r.traits.map(t => `<span class="result-trait">${t}</span>`).join('')}
      </div>
      <button class="quiz-restart" id="restartBtn">Take Quiz Again</button>
      <div class="share-section">
        <p>Share your result:</p>
        <a class="share-btn" href="https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}" target="_blank">𝕏 Share</a>
        <a class="share-btn" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}" target="_blank">🔗 LinkedIn</a>
      </div>
    </div>
  `;
  
  document.getElementById('restartBtn').addEventListener('click', initQuiz);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initQuiz);
