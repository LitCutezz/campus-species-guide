/**
 * 模拟AI物种识别模块
 * 提供拍照识别功能（模拟返回随机物种结果）
 */

const IdentifyModule = (function() {
  
  // 模拟识别延迟时间（毫秒）
  const IDENTIFY_DELAY = 2000;
  
  // 置信度范围
  const CONFIDENCE_MIN = 85;
  const CONFIDENCE_MAX = 98;
  
  /**
   * 模拟AI识别物种
   * @param {string} imageData - 图片数据（base64 或 URL）
   * @returns {Promise<Object>} 识别结果
   */
  function identifySpecies(imageData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * speciesList.length);
        const species = speciesList[randomIndex];
        const confidence = (Math.random() * (CONFIDENCE_MAX - CONFIDENCE_MIN) + CONFIDENCE_MIN).toFixed(1);
        
        resolve({
          success: true,
          species: species,
          confidence: parseFloat(confidence),
          message: `识别成功！该物种为${species.name}`,
          alternatives: generateAlternatives(species, randomIndex)
        });
      }, IDENTIFY_DELAY);
    });
  }
  
  /**
   * 生成可能的替代结果（模拟多结果返回）
   * @param {Object} mainSpecies - 主要识别结果
   * @param {number} mainIndex - 主要结果索引
   * @returns {Array} 替代结果列表
   */
  function generateAlternatives(mainSpecies, mainIndex) {
    const alternatives = [];
    const usedIndices = new Set([mainIndex]);
    
    for (let i = 0; i < 2; i++) {
      let altIndex;
      do {
        altIndex = Math.floor(Math.random() * speciesList.length);
      } while (usedIndices.has(altIndex));
      usedIndices.add(altIndex);
      
      const altConfidence = (Math.random() * 15 + 50).toFixed(1);
      alternatives.push({
        species: speciesList[altIndex],
        confidence: parseFloat(altConfidence)
      });
    }
    
    // 按置信度降序排列
    alternatives.sort((a, b) => b.confidence - a.confidence);
    return alternatives;
  }
  
  /**
   * 压缩图片到合理尺寸
   * @param {File} file - 上传的图片文件
   * @param {number} maxWidth - 最大宽度
   * @param {number} maxHeight - 最大高度
   * @returns {Promise<string>} base64 图片数据
   */
  function compressImage(file, maxWidth = 800, maxHeight = 600) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
          const canvas = document.createElement('canvas');
          let { width, height } = img;
          
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  
  /**
   * 格式化识别结果用于显示
   * @param {Object} result - 识别结果对象
   * @returns {string} 格式化后的HTML
   */
  function formatResult(result) {
    if (!result.success) {
      return `<div class="identify-error">识别失败，请重试</div>`;
    }
    
    const { species, confidence } = result;
    return `
      <div class="identify-result">
        <div class="result-main">
          <div class="result-species-emoji">${species.emoji}</div>
          <div class="result-info">
            <h3>${species.name}</h3>
            <p class="latin-name">${species.latinName}</p>
            <div class="confidence-bar">
              <div class="confidence-fill" style="width: ${confidence}%"></div>
            </div>
            <span class="confidence-text">置信度: ${confidence}%</span>
          </div>
        </div>
        <p class="result-description">${species.description}</p>
        <a href="#" class="btn-view-detail" onclick="App.showDetail('${species.id}'); return false;">
          查看详情 →
        </a>
      </div>
    `;
  }
  
  // 公开接口
  return {
    identifySpecies,
    compressImage,
    formatResult
  };
})();
