/**
 * 校园物种识别图鉴 - 主应用模块
 * 管理页面路由、渲染和交互
 */

const App = (function() {
  
  // 当前页面状态
  let currentPage = 'home';
  let currentCategory = 'all';
  
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
    return `
      <div class="home-banner">
        <h1 class="home-title">🌿 校园物种识别图鉴</h1>
        <p class="home-subtitle">探索校园生态环境，发现身边的生物多样性</p>
        <div class="home-stats">
          <div class="stat-item">
            <span class="stat-number">20</span>
            <span class="stat-label">收录物种</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">3</span>
            <span class="stat-label">物种类别</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">10+</span>
            <span class="stat-label">校园区域</span>
          </div>
        </div>
      </div>
      
      <div class="feature-cards">
        <div class="feature-card" onclick="App.navigate('gallery')">
          <div class="feature-icon">📖</div>
          <h3>浏览图鉴</h3>
          <p>查看校园内20种常见物种的详细信息，包括绿植、鸟类和昆虫</p>
        </div>
        
        <div class="feature-card" onclick="App.navigate('identify')">
          <div class="feature-icon">📷</div>
          <h3>拍照识别</h3>
          <p>拍摄或上传物种照片，AI智能识别物种信息</p>
        </div>
        
        <div class="feature-card" onclick="App.navigate('scan')">
          <div class="feature-icon">📱</div>
          <h3>扫码查看</h3>
          <p>扫描校园内物种旁的二维码，快速查看物种详细信息</p>
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
    const filteredSpecies = getSpeciesByCategory(currentCategory);
    
    return `
      <div class="page-header">
        <button class="btn-back" onclick="App.navigate('home')">← 返回</button>
        <h2>物种图鉴</h2>
      </div>
      
      <div class="category-tabs">
        ${categories.map(cat => `
          <button class="tab-btn ${cat.id === currentCategory ? 'active' : ''}" 
                  onclick="App.filterCategory('${cat.id}')">
            ${cat.label} <span class="tab-count">${cat.count}</span>
          </button>
        `).join('')}
      </div>
      
      <div class="species-grid">
        ${filteredSpecies.map(species => `
          <div class="species-card" onclick="App.showDetail('${species.id}')">
            <div class="card-image">
              <span class="card-emoji">${species.emoji}</span>
            </div>
            <div class="card-info">
              <h4>${species.name}</h4>
              <p class="card-latin">${species.latinName}</p>
              <span class="card-tag">${species.categoryLabel}</span>
            </div>
          </div>
        `).join('')}
      </div>
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
  
  // 公开接口
  return {
    init,
    navigate,
    showDetail,
    goBack,
    filterCategory,
    handleFileSelect,
    openCamera,
    startIdentify
  };
})();

// 页面加载完成后初始化（兼容脚本延迟加载的情况）
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.init);
} else {
  App.init();
}
