// Knowledge Spread Counter
function initCounters() {
  document.querySelectorAll('.knowledge-counter').forEach(counter => {
    const postId = counter.getAttribute('data-post-id');
    const countEl = counter.querySelector('.count-number');
    const heartEl = counter.querySelector('.heart-icon');
    
    // Load saved count from localStorage
    const savedCount = localStorage.getItem(`knowledge_${postId}`);
    if (savedCount) {
      countEl.textContent = savedCount;
    }
    
    // Check if user already clicked
    const hasClicked = localStorage.getItem(`knowledge_clicked_${postId}`);
    if (hasClicked) {
      heartEl.classList.add('active');
    }
    
    counter.addEventListener('click', function() {
      const hasClicked = localStorage.getItem(`knowledge_clicked_${postId}`);
      
      if (!hasClicked) {
        // Increment
        let current = parseInt(countEl.textContent) || 0;
        current++;
        countEl.textContent = current;
        localStorage.setItem(`knowledge_${postId}`, current);
        localStorage.setItem(`knowledge_clicked_${postId}`, 'true');
        heartEl.classList.add('active');
        
        // Trigger burst animation
        createBurst(this);
      } else {
        // Decrement (unlike)
        let current = parseInt(countEl.textContent) || 0;
        current = Math.max(0, current - 1);
        countEl.textContent = current;
        localStorage.setItem(`knowledge_${postId}`, current);
        localStorage.removeItem(`knowledge_clicked_${postId}`);
        heartEl.classList.remove('active');
      }
    });
  });
}

function createBurst(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      width: 6px;
      height: 6px;
      background: #38bdf8;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      left: ${centerX}px;
      top: ${centerY}px;
    `;
    document.body.appendChild(particle);
    
    const angle = (i / 8) * Math.PI * 2;
    const distance = 40 + Math.random() * 20;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    particle.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
    ], {
      duration: 600,
      easing: 'cubic-bezier(0, .9, .57, 1)'
    }).onfinish = () => particle.remove();
  }
}

document.addEventListener('DOMContentLoaded', initCounters);
