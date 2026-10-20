/**
 * 物种图片动态加载模块
 * 数据来源：iNaturalist API (api.inaturalist.org)
 * 通过拉丁名查询获取真实物种照片，自动缓存避免重复请求
 */
const SpeciesImageLoader = (function() {
  
  // 图片缓存
  const cache = {};
  
  // 加载状态跟踪
  const loading = new Set();
  
  /**
   * 从 iNaturalist API 获取物种图片 URL
   * @param {string} latinName - 物种拉丁名
   * @returns {Promise<string|null>} 图片 URL
   */
  async function fetchImageUrl(latinName) {
    try {
      const response = await fetch(
        `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(latinName)}`
      );
      if (!response.ok) return null;
      const data = await response.json();
      const result = data.results && data.results[0];
      if (result && result.default_photo) {
        return result.default_photo.medium_url || result.default_photo.square_url || null;
      }
      return null;
    } catch (e) {
      return null;
    }
  }
  
  /**
   * 获取物种图片 URL（带缓存）
   * @param {string} speciesId - 物种 ID
   * @param {string} latinName - 物种拉丁名
   * @returns {Promise<string|null>} 图片 URL
   */
  async function getImageUrl(speciesId, latinName) {
    // 已缓存
    if (cache[speciesId] !== undefined) {
      return cache[speciesId];
    }
    // 正在加载中
    if (loading.has(speciesId)) {
      return null;
    }
    
    loading.add(speciesId);
    const url = await fetchImageUrl(latinName);
    cache[speciesId] = url;
    loading.delete(speciesId);
    return url;
  }
  
  /**
   * 批量预加载物种图片
   * @param {Array} speciesArray - 物种数组
   * @param {Function} onLoaded - 每张图片加载完的回调 (speciesId, url)
   */
  async function preloadImages(speciesArray, onLoaded) {
    const batchSize = 8;
    for (let i = 0; i < speciesArray.length; i += batchSize) {
      const batch = speciesArray.slice(i, i + batchSize);
      const promises = batch.map(async (species) => {
        if (cache[species.id] !== undefined) {
          if (cache[species.id] && onLoaded) onLoaded(species.id, cache[species.id]);
          return;
        }
        const url = await getImageUrl(species.id, species.latinName);
        if (url && onLoaded) onLoaded(species.id, url);
      });
      await Promise.all(promises);
      // 轻微延迟避免 API 限速
      if (i + batchSize < speciesArray.length) {
        await new Promise(r => setTimeout(r, 200));
      }
    }
  }
  
  /**
   * 为卡片图片元素加载图片
   * @param {string} speciesId - 物种 ID
   * @param {string} latinName - 拉丁名
   * @param {HTMLElement} container - 包含 img 和 emoji 的容器
   */
  function loadCardImage(speciesId, latinName, container) {
    if (cache[speciesId]) {
      applyCardImage(container, cache[speciesId]);
      return;
    }
    getImageUrl(speciesId, latinName).then(url => {
      if (url) applyCardImage(container, url);
    });
  }
  
  function applyCardImage(container, url) {
    if (!container) return;
    const img = container.querySelector('.card-photo');
    const emoji = container.querySelector('.card-emoji');
    if (img) {
      img.src = url;
      img.style.display = 'block';
      img.onload = function() {
        container.classList.add('loaded');
      };
      img.onerror = function() {
        this.style.display = 'none';
        if (emoji) emoji.style.display = 'flex';
        container.classList.add('loaded');
      };
      if (emoji) emoji.style.display = 'none';
    }
  }
  
  /**
   * 为详情页加载图片
   * @param {string} speciesId - 物种 ID
   * @param {string} latinName - 拉丁名
   * @param {string} emoji - 回退 emoji
   * @param {HTMLElement} container - detail-hero 容器
   */
  function loadDetailImage(speciesId, latinName, emoji, container) {
    if (cache[speciesId]) {
      applyDetailImage(container, cache[speciesId], emoji, latinName, speciesId);
      return;
    }
    getImageUrl(speciesId, latinName).then(url => {
      if (url) applyDetailImage(container, url, emoji, latinName, speciesId);
    });
  }
  
  function applyDetailImage(container, url, emoji, latinName, speciesId) {
    if (!container) return;
    const titleHtml = container.querySelector('.detail-title') ? container.querySelector('.detail-title').outerHTML : '';
    const heroDiv = document.createElement('div');
    heroDiv.className = 'detail-hero-img';
    heroDiv.innerHTML = `
      <img class="detail-photo" src="${url}" alt="${latinName}">
      <div class="detail-title-overlay">${titleHtml}</div>
    `;
    // 图片加载失败时回退到 emoji
    const img = heroDiv.querySelector('.detail-photo');
    img.onerror = function() {
      container.style.animation = 'none';
      container.style.background = '';
    };
    img.onload = function() {
      container.parentElement.insertBefore(heroDiv, container);
      container.remove();
    };
  }
  
  // 公开接口
  return {
    getImageUrl,
    preloadImages,
    loadCardImage,
    loadDetailImage,
    cache
  };
})();
