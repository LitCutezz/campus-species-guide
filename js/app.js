/**
 * 校园物种识别图鉴 - 主应用模块
 * 管理页面路由、渲染和交互
 */

const App = (function() {
  
  // 当前页面状态
  let currentPage = 'home';
  let currentCategory = 'all';
  let searchQuery = '';
  
  // 问答状态
  let quizState = {
    questions: [],
    currentIndex: 0,
    correct: 0,
    answers: []
  };
  
  /**
   * 初始化应用
   */
  function init() {
    // 检查URL参数，支持扫码直接跳转
    const urlParams = new URLSearchParams(window.location.search);
    const speciesId = urlParams.get('species');
    
    if (speciesId) {
      const species = getSpeciesById(speciesId);
      if (species) {
        showDetail(speciesId);
        return;
      }
    }
    
    // 默认显示首页
    navigate('home');
  }
  
  /**
   * 页面切换
   * @param {string} pageName - 页面名称
   */
  function showPage(pageName) {
    currentPage = pageName;
    
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });
    
    // 显示目标页面
    const targetPage = document.getElementById(`page-${pageName}`);
    if (targetPage) {
      targetPage.classList.add('active');
    }
    
    // 滚动到顶部
    window.scrollTo(0, 0);
  }
  
  /**
   * 渲染首页
   */
  function renderHome() {
    const progress = Collection.getProgress();
    const unlockedCount = Collection.getUnlockedAchievements().length;
    
    return `
      <div class="home-banner">
        <h1 class="home-title">🌿 校园物种识别图鉴</h1>
        <p class="home-subtitle">探索校园生态环境，发现身边的生物多样性</p>
        <div class="home-stats">
          <div class="stat-item">
            <span class="stat-number">${speciesList.length}</span>
            <span class="stat-label">收录物种</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${Object.keys(progress.categories).length}</span>
            <span class="stat-label">物种类别</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${progress.percentage}%</span>
            <span class="stat-label">探索进度</span>
          </div>
        </div>
      </div>
      
      <!-- 收集进度条 -->
      <div class="home-progress-card">
        <div class="progress-header">
          <span>🎯 收集进度</span>
          <span>${progress.viewed}/${progress.total}</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progress.percentage}%"></div>
        </div>
        <div class="progress-detail">
          ${Object.entries(progress.categories).map(([key, cat]) => {
            const icons = { plant: '🌳', bird: '🐦', insect: '🦋', fungi: '🍄', amphibian: '🐸', mammal: '🐿️' };
            return `<span>${icons[key] || '📋'} ${cat.viewed}/${cat.total} ${cat.label}</span>`;
          }).join('')}
        </div>
      </div>
      
      <div class="feature-cards">
        <div class="feature-card" onclick="App.navigate('gallery')">
          <div class="feature-icon">📖</div>
          <h3>浏览图鉴</h3>
          <p>查看校园内20种常见物种的详细信息</p>
        </div>
        
        <div class="feature-card" onclick="App.navigate('identify')">
          <div class="feature-icon">📷</div>
          <h3>拍照识别</h3>
          <p>拍摄或上传物种照片，AI智能识别</p>
        </div>
        
        <div class="feature-card" onclick="App.navigate('quiz')">
          <div class="feature-icon">🧠</div>
          <h3>知识问答</h3>
          <p>测试你的物种知识，解锁趣味成就</p>
        </div>
        
        <div class="feature-card" onclick="App.navigate('collection')">
          <div class="feature-icon">🏆</div>
          <h3>收集成就</h3>
          <p>查看探索进度和已解锁的徽章成就</p>
        </div>
        
        <div class="feature-card" onclick="App.navigate('stats')">
          <div class="feature-icon">📊</div>
          <h3>物种统计</h3>
          <p>查看校园物种分布数据概览</p>
        </div>
        
        <div class="feature-card" onclick="App.navigate('scan')">
          <div class="feature-icon">📱</div>
          <h3>扫码查看</h3>
          <p>扫描校园内物种旁的二维码</p>
        </div>
      </div>
      
      <div class="home-footer">
        <p>🌍 Track3 · 生态与生物多样性</p>
        <p>立足校园生态环境，低成本可落地</p>
      </div>
    `;
  }
  
  /**
   * 渲染图鉴列表页
   */
  function renderGallery() {
    const categories = getCategories();
    let filteredSpecies = getSpeciesByCategory(currentCategory);
    
    // 搜索过滤
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filteredSpecies = filteredSpecies.filter(s => 
        s.name.includes(q) || 
        s.latinName.toLowerCase().includes(q) ||
        s.description.includes(q) ||
        s.categoryLabel.includes(q)
      );
    }
    
    return `
      <div class="page-header">
        <button class="btn-back" onclick="App.navigate('home')">← 返回</button>
        <h2>物种图鉴</h2>
      </div>
      
      <!-- 搜索框 -->
      <div class="search-bar">
        <span class="search-icon">🔍</span>
        <input type="text" id="search-input" class="search-input" 
               placeholder="搜索物种名称..." 
               value="${searchQuery}"
               oninput="App.handleSearch(this.value)">
        ${searchQuery ? '<button class="search-clear" onclick="App.clearSearch()">&times;</button>' : ''}
      </div>
      
      <div class="category-tabs">
        ${categories.map(cat => `
          <button class="tab-btn ${cat.id === currentCategory ? 'active' : ''}" 
                  onclick="App.filterCategory('${cat.id}')">
            ${cat.label} <span class="tab-count">${cat.count}</span>
          </button>
        `).join('')}
      </div>
      
      ${filteredSpecies.length === 0 ? `
        <div class="empty-state">
          <p>😔 未找到匹配的物种</p>
          <p>试试其他关键词</p>
        </div>
      ` : `
        <div class="species-grid">
          ${filteredSpecies.map(species => `
            <div class="species-card ${Collection.isViewed(species.id) ? 'viewed' : ''}" 
                 onclick="App.showDetail('${species.id}')">
              <div class="card-image">
                <span class="card-emoji">${species.emoji}</span>
                ${Collection.isViewed(species.id) ? '<span class="viewed-badge">✓</span>' : ''}
              </div>
              <div class="card-info">
                <h4>${species.name}</h4>
                <p class="card-latin">${species.latinName}</p>
                <span class="card-tag">${species.categoryLabel}</span>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    `;
  }
  
  /**
   * 渲染物种详情页
   * @param {string} speciesId - 物种ID
   */
  function renderDetail(speciesId) {
    const species = getSpeciesById(speciesId);
    if (!species) {
      return `
        <div class="page-header">
          <button class="btn-back" onclick="App.navigate('gallery')">← 返回</button>
          <h2>未找到物种</h2>
        </div>
        <div class="empty-state">
          <p>😔 未找到该物种的信息</p>
          <p>请检查二维码或链接是否正确</p>
        </div>
      `;
    }
    
    return `
      <div class="page-header">
        <button class="btn-back" onclick="App.goBack()">← 返回</button>
        <h2>物种详情</h2>
      </div>
      
      <div class="detail-content">
        <div class="detail-hero">
          <span class="detail-emoji">${species.emoji}</span>
          <div class="detail-title">
            <h2>${species.name}</h2>
            <p class="detail-latin">${species.latinName}</p>
            <span class="detail-category">${species.categoryLabel}</span>
          </div>
        </div>
        
        <div class="detail-sections">
          <section class="detail-section">
            <h3>📋 物种简介</h3>
            <p>${species.description}</p>
          </section>
          
          <section class="detail-section">
            <h3>🌱 生长习性</h3>
            <p>${species.habitat}</p>
          </section>
          
          <section class="detail-section">
            <h3>🌍 生态作用</h3>
            <p>${species.ecologicalRole}</p>
          </section>
          
          <section class="detail-section">
            <h3>📍 校园分布</h3>
            <p>${species.campusDistribution}</p>
          </section>
          
          <section class="detail-section">
            <h3>✨ 特征标签</h3>
            <div class="feature-tags">
              ${species.features.map(f => `<span class="feature-tag">${f}</span>`).join('')}
            </div>
          </section>
          
          <section class="detail-section fun-fact">
            <h3>💡 趣味小知识</h3>
            <p>${species.funFact}</p>
          </section>
        </div>
        
        <div class="detail-qrcode">
          <h3>📱 扫码查看</h3>
          <p>扫描下方二维码可快速查看此物种信息</p>
          <div id="qrcode-container"></div>
        </div>
      </div>
    `;
  }
  
  /**
   * 渲染识别页面
   */
  function renderIdentify() {
    return `
      <div class="page-header">
        <button class="btn-back" onclick="App.navigate('home')">← 返回</button>
        <h2>拍照识别</h2>
      </div>
      
      <div class="identify-content">
        <div class="identify-upload-area" id="upload-area">
          <div class="upload-placeholder" id="upload-placeholder">
            <span class="upload-icon">📷</span>
            <h3>上传或拍摄照片</h3>
            <p>支持 JPG、PNG 格式</p>
            <div class="upload-buttons">
              <button class="btn-upload" onclick="document.getElementById('file-input').click()">
                📁 从相册选择
              </button>
              <button class="btn-camera" onclick="App.openCamera()">
                📸 直接拍摄
              </button>
            </div>
          </div>
          <img id="preview-image" class="preview-image" style="display:none" alt="预览图片">
          <input type="file" id="file-input" accept="image/*" style="display:none" onchange="App.handleFileSelect(event)">
          <input type="file" id="camera-input" accept="image/*" capture="environment" style="display:none" onchange="App.handleFileSelect(event)">
        </div>
        
        <button class="btn-identify" id="btn-identify" onclick="App.startIdentify()" disabled>
          🔍 开始识别
        </button>
        
        <div id="identify-result" class="identify-result-area"></div>
      </div>
    `;
  }
  
  /**
   * 渲染扫码页面
   */
  function renderScan() {
    return `
      <div class="page-header">
        <button class="btn-back" onclick="App.navigate('home')">← 返回</button>
        <h2>扫码查看</h2>
      </div>
      
      <div class="scan-content">
        <div class="scan-intro">
          <span class="scan-icon">📱</span>
          <h3>如何使用扫码功能</h3>
          <div class="scan-steps">
            <div class="scan-step">
              <span class="step-number">1</span>
              <p>在校园内寻找物种旁边的二维码标牌</p>
            </div>
            <div class="scan-step">
              <span class="step-number">2</span>
              <p>使用手机相机或微信扫描二维码</p>
            </div>
            <div class="scan-step">
              <span class="step-number">3</span>
              <p>自动跳转到物种详情页面查看信息</p>
            </div>
          </div>
        </div>
        
        <div class="scan-demo">
          <h3>二维码示例</h3>
          <p>以下是樟树的二维码示例，可打印贴在校园对应植物旁</p>
          <div id="scan-demo-qrcode"></div>
          <p class="qr-label">樟树 - Cinnamomum camphora</p>
        </div>
        
        <div class="scan-tip">
          <h3>💡 建议</h3>
          <ul>
            <li>将二维码打印在防水标牌上</li>
            <li>张贴在物种旁边约1米高度</li>
            <li>标牌上注明"扫码查看物种信息"</li>
            <li>定期检查二维码是否清晰可扫</li>
          </ul>
        </div>
      </div>
    `;
  }
  
  /**
   * 导航到指定页面
   * @param {string} pageName - 页面名称
   */
  function navigate(pageName) {
    const pageContainer = document.getElementById('page-container');
    let html = '';
    
    switch(pageName) {
      case 'home':
        html = renderHome();
        break;
      case 'gallery':
        html = renderGallery();
        break;
      case 'identify':
        html = renderIdentify();
        break;
      case 'scan':
        html = renderScan();
        break;
      case 'quiz':
        html = renderQuiz();
        break;
      case 'collection':
        html = renderCollection();
        break;
      case 'stats':
        html = renderStats();
        break;
      case 'quizResult':
        html = renderQuizResult();
        break;
      default:
        html = renderHome();
        pageName = 'home';
    }
    
    pageContainer.innerHTML = `<div class="page active">${html}</div>`;
    currentPage = pageName;
    window.scrollTo(0, 0);
    
    // 页面渲染后的处理
    if (pageName === 'scan') {
      generateScanDemoQR();
    }
  }
  
  /**
   * 显示物种详情页
   * @param {string} speciesId - 物种ID
   */
  function showDetail(speciesId) {
    const pageContainer = document.getElementById('page-container');
    const html = renderDetail(speciesId);
    pageContainer.innerHTML = `<div class="page active">${html}</div>`;
    currentPage = 'detail';
    window.scrollTo(0, 0);
    
    // 记录收集进度
    Collection.recordView(speciesId);
    
    // 生成二维码
    const species = getSpeciesById(speciesId);
    if (species) {
      setTimeout(() => generateQRCode(species), 100);
    }
  }
  
  /**
   * 返回上一页
   */
  function goBack() {
    if (currentPage === 'detail') {
      navigate('gallery');
    } else {
      navigate('home');
    }
  }
  
  /**
   * 分类筛选
   * @param {string} categoryId - 分类ID
   */
  function filterCategory(categoryId) {
    currentCategory = categoryId;
    navigate('gallery');
  }
  
  /**
   * 处理文件选择
   * @param {Event} event - 文件选择事件
   */
  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    IdentifyModule.compressImage(file).then(imageData => {
      const preview = document.getElementById('preview-image');
      const placeholder = document.getElementById('upload-placeholder');
      const btnIdentify = document.getElementById('btn-identify');
      
      preview.src = imageData;
      preview.style.display = 'block';
      placeholder.style.display = 'none';
      btnIdentify.disabled = false;
    });
  }
  
  /**
   * 打开相机
   */
  function openCamera() {
    document.getElementById('camera-input').click();
  }
  
  /**
   * 开始识别
   */
  function startIdentify() {
    const preview = document.getElementById('preview-image');
    const resultArea = document.getElementById('identify-result');
    const btnIdentify = document.getElementById('btn-identify');
    
    if (!preview.src) return;
    
    // 显示加载状态
    btnIdentify.disabled = true;
    resultArea.innerHTML = `
      <div class="loading-state">
        <div class="loading-spinner"></div>
        <p>AI 识别中，请稍候...</p>
      </div>
    `;
    
    // 模拟识别
    IdentifyModule.identifySpecies(preview.src).then(result => {
      resultArea.innerHTML = IdentifyModule.formatResult(result);
      btnIdentify.disabled = false;
    });
  }
  
  /**
   * 生成物种二维码
   * @param {Object} species - 物种对象
   */
  function generateQRCode(species) {
    const container = document.getElementById('qrcode-container');
    if (!container || typeof QRCode === 'undefined') return;
    
    container.innerHTML = '';
    const baseUrl = window.location.href.split('?')[0];
    const url = `${baseUrl}?species=${species.id}`;
    
    new QRCode(container, {
      text: url,
      width: 150,
      height: 150,
      typeNumber: 10,
      correctLevel: 0,  // M level - 平衡容错与容量
      colorDark: "#2E7D32",
      colorLight: "#ffffff"
    });
  }
  
  /**
   * 生成扫码示例二维码
   */
  function generateScanDemoQR() {
    const container = document.getElementById('scan-demo-qrcode');
    if (!container || typeof QRCode === 'undefined') return;
    
    container.innerHTML = '';
    const baseUrl = window.location.href.split('?')[0];
    const url = `${baseUrl}?species=camphor-tree`;
    
    new QRCode(container, {
      text: url,
      width: 180,
      height: 180,
      typeNumber: 10,
      correctLevel: 0,  // M level
      colorDark: "#2E7D32",
      colorLight: "#ffffff"
    });
  }
  
  // ========== 新功能页面 ==========
  
  /**
   * 搜索处理
   */
  function handleSearch(value) {
    searchQuery = value.trim();
    navigate('gallery');
    // 保持焦点
    setTimeout(() => {
      const input = document.getElementById('search-input');
      if (input) { input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
    }, 50);
  }
  
  /**
   * 清除搜索
   */
  function clearSearch() {
    searchQuery = '';
    navigate('gallery');
  }
  
  /**
   * 渲染问答页面
   */
  function renderQuiz() {
    if (quizState.questions.length === 0 || quizState.currentIndex >= quizState.questions.length) {
      // 开始页面
      const bestRecord = Collection.getBestQuizRecord();
      return `
        <div class="page-header">
          <button class="btn-back" onclick="App.navigate('home')">← 返回</button>
          <h2>知识问答</h2>
        </div>
        <div class="quiz-intro">
          <span class="quiz-intro-icon">🧠</span>
          <h3>校园物种知识挑战</h3>
          <p>测试你对校园物种的了解程度，每局随机抽取10道题</p>
          ${bestRecord ? `<p class="best-record">🏅 最佳成绩：${bestRecord.correct}/${bestRecord.total} (${bestRecord.rate}%)</p>` : ''}
          <button class="btn-start-quiz" onclick="App.startQuiz()">开始挑战</button>
        </div>
      `;
    }
    
    const q = quizState.questions[quizState.currentIndex];
    const total = quizState.questions.length;
    const current = quizState.currentIndex + 1;
    
    return `
      <div class="page-header">
        <button class="btn-back" onclick="App.quitQuiz()">← 退出</button>
        <h2>第 ${current}/${total} 题</h2>
      </div>
      <div class="quiz-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${(current/total)*100}%"></div>
        </div>
        <span class="quiz-score">已得分：${quizState.correct}</span>
      </div>
      <div class="quiz-question">
        <h3>${q.question}</h3>
        <div class="quiz-options">
          ${q.options.map((opt, i) => `
            <button class="quiz-option" onclick="App.answerQuiz(${i})">
              <span class="option-label">${String.fromCharCode(65+i)}</span>
              <span class="option-text">${opt}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  /**
   * 开始问答
   */
  function startQuiz() {
    quizState = {
      questions: getRandomQuestions(10),
      currentIndex: 0,
      correct: 0,
      answers: []
    };
    navigate('quiz');
  }
  
  /**
   * 退出问答
   */
  function quitQuiz() {
    quizState = { questions: [], currentIndex: 0, correct: 0, answers: [] };
    navigate('home');
  }
  
  /**
   * 回答问题
   */
  function answerQuiz(optionIndex) {
    const q = quizState.questions[quizState.currentIndex];
    const isCorrect = optionIndex === q.answer;
    
    if (isCorrect) quizState.correct++;
    quizState.answers.push({ question: q.question, selected: optionIndex, correct: q.answer, isCorrect });
    
    // 显示反馈
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((opt, i) => {
      opt.disabled = true;
      if (i === q.answer) opt.classList.add('correct');
      if (i === optionIndex && !isCorrect) opt.classList.add('wrong');
    });
    
    // 显示解释
    const explanationEl = document.createElement('div');
    explanationEl.className = 'quiz-explanation ' + (isCorrect ? 'correct' : 'wrong');
    explanationEl.innerHTML = `<p>${isCorrect ? '✅ 正确！' : '❌ 错误'} ${q.explanation}</p>`;
    document.querySelector('.quiz-question').appendChild(explanationEl);
    
    // 下一题按钮
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn-next-question';
    nextBtn.textContent = quizState.currentIndex < quizState.questions.length - 1 ? '下一题 →' : '查看结果';
    nextBtn.onclick = () => {
      quizState.currentIndex++;
      if (quizState.currentIndex >= quizState.questions.length) {
        Collection.recordQuiz(quizState.correct, quizState.questions.length);
        navigate('quizResult');
      } else {
        navigate('quiz');
      }
    };
    document.querySelector('.quiz-question').appendChild(nextBtn);
  }
  
  /**
   * 渲染问答结果页
   */
  function renderQuizResult() {
    const total = quizState.questions.length;
    const rate = Math.round((quizState.correct / total) * 100);
    let grade = '';
    if (rate === 100) grade = '🏆 完美！物种知识王者';
    else if (rate >= 80) grade = '🌟 优秀！生态达人';
    else if (rate >= 60) grade = '👍 不错！继续加油';
    else grade = '💪 加油！多看看图鉴吧';
    
    return `
      <div class="page-header">
        <button class="btn-back" onclick="App.quitQuiz()">← 返回首页</button>
        <h2>问答结果</h2>
      </div>
      <div class="quiz-result">
        <div class="result-score-circle">
          <span class="score-number">${quizState.correct}</span>
          <span class="score-total">/${total}</span>
        </div>
        <p class="result-rate">正确率 ${rate}%</p>
        <p class="result-grade">${grade}</p>
        <div class="result-answers">
          <h4>答题回顾</h4>
          ${quizState.answers.map((a, i) => `
            <div class="answer-item ${a.isCorrect ? 'correct' : 'wrong'}">
              <span class="answer-icon">${a.isCorrect ? '✅' : '❌'}</span>
              <span class="answer-text">第${i+1}题：${a.question.slice(0, 15)}...</span>
            </div>
          `).join('')}
        </div>
        <div class="result-actions">
          <button class="btn-retry" onclick="App.startQuiz()">再来一局</button>
          <button class="btn-review" onclick="App.navigate('gallery')">去看看图鉴</button>
        </div>
      </div>
    `;
  }
  
  /**
   * 渲染收集成就页
   */
  function renderCollection() {
    const progress = Collection.getProgress();
    const unlocked = Collection.getUnlockedAchievements();
    const unlockedIds = unlocked.map(a => a.id);
    
    return `
      <div class="page-header">
        <button class="btn-back" onclick="App.navigate('home')">← 返回</button>
        <h2>收集成就</h2>
      </div>
      
      <div class="collection-progress">
        <div class="progress-circle">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#E8F5E9" stroke-width="8"/>
            <circle cx="50" cy="50" r="45" fill="none" stroke="#4CAF50" stroke-width="8"
                    stroke-dasharray="${progress.percentage * 2.83} 283" stroke-linecap="round"
                    transform="rotate(-90 50 50)"/>
          </svg>
          <div class="circle-text">
            <span class="circle-number">${progress.percentage}%</span>
            <span class="circle-label">完成度</span>
          </div>
        </div>
        <div class="progress-breakdown">
          ${Object.entries(progress.categories).map(([key, cat]) => {
            const icons = { plant: '🌳', bird: '🐦', insect: '🦋', fungi: '🍄', amphibian: '🐸', mammal: '🐿️' };
            const pct = cat.total > 0 ? (cat.viewed/cat.total)*100 : 0;
            return `
              <div class="breakdown-item">
                <span class="breakdown-icon">${icons[key] || '📋'}</span>
                <div class="breakdown-bar">
                  <div class="breakdown-fill" style="width: ${pct}%"></div>
                </div>
                <span class="breakdown-text">${cat.viewed}/${cat.total} ${cat.label}</span>
              </div>`;
          }).join('')}
        </div>
      </div>
      
      <div class="achievements-section">
        <h3>🏅 成就徽章 (${unlocked.length}/${Collection.achievements.length})</h3>
        <div class="achievements-grid">
          ${Collection.achievements.map(a => `
            <div class="achievement-card ${unlockedIds.includes(a.id) ? 'unlocked' : 'locked'}">
              <span class="achievement-icon">${unlockedIds.includes(a.id) ? a.icon : '🔒'}</span>
              <span class="achievement-name">${a.name}</span>
              <span class="achievement-desc">${a.desc}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  /**
   * 渲染统计页面
   */
  function renderStats() {
    // 动态统计类别
    const categoryStats = {};
    speciesList.forEach(s => {
      if (!categoryStats[s.category]) {
        categoryStats[s.category] = { count: 0, label: s.categoryLabel };
      }
      categoryStats[s.category].count++;
    });
    const catIcons = { plant: '🌳', bird: '🐦', insect: '🦋', fungi: '🍄', amphibian: '🐸', mammal: '🐿️' };
    const catColors = { plant: '#4CAF50', bird: '#2196F3', insect: '#FF9800', fungi: '#9C27B0', amphibian: '#00BCD4', mammal: '#795548' };
    
    // 收集校园分布关键词
    const locations = new Set();
    speciesList.forEach(s => {
      s.campusDistribution.split('、').forEach(loc => locations.add(loc.trim()));
    });
    
    return `
      <div class="page-header">
        <button class="btn-back" onclick="App.navigate('home')">← 返回</button>
        <h2>物种统计</h2>
      </div>
      
      <div class="stats-overview">
        <div class="stats-card large">
          <span class="stats-number">${speciesList.length}</span>
          <span class="stats-label">收录物种总数</span>
        </div>
        ${Object.entries(categoryStats).map(([key, cat]) => `
          <div class="stats-card">
            <span class="stats-number">${cat.count}</span>
            <span class="stats-label">${catIcons[key] || '📋'} ${cat.label}</span>
          </div>
        `).join('')}
      </div>
      
      <div class="stats-section">
        <h3>📊 类别占比</h3>
        <div class="stats-chart">
          <div class="chart-bar-container">
            ${Object.entries(categoryStats).map(([key, cat]) => {
              const pct = Math.round((cat.count/speciesList.length)*100);
              return `<div class="chart-bar" style="width: ${pct}%; background: ${catColors[key] || '#607D8B'};">
                <span>${cat.label} ${pct}%</span>
              </div>`;
            }).join('')}
          </div>
        </div>
      </div>
      
      <div class="stats-section">
        <h3>📍 校园分布区域 (${locations.size}个)</h3>
        <div class="location-tags">
          ${[...locations].slice(0, 40).map(loc => `<span class="location-tag">${loc}</span>`).join('')}
          ${locations.size > 40 ? `<span class="location-tag">+${locations.size - 40}个...</span>` : ''}
        </div>
      </div>
      
      <div class="stats-section">
        <h3>🌱 物种速览 (${speciesList.length}种)</h3>
        <div class="species-mini-list">
          ${speciesList.map(s => `
            <div class="mini-item" onclick="App.showDetail('${s.id}')">
              <span>${s.emoji}</span>
              <span class="mini-name">${s.name}</span>
              <span class="mini-tag ${s.category}">${s.categoryLabel}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  // 公开接口
  return {
    init,
    navigate,
    showDetail,
    goBack,
    filterCategory,
    handleFileSelect,
    openCamera,
    startIdentify,
    handleSearch,
    clearSearch,
    startQuiz,
    quitQuiz,
    answerQuiz
  };
})();

// 页面加载完成后初始化（兼容脚本延迟加载的情况）
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.init);
} else {
  App.init();
}
