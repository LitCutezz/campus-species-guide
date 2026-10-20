/**
 * 物种收集成就系统
 * 使用 localStorage 持久化数据
 */
const Collection = (function() {
  
  const STORAGE_KEY = 'campus_species_collection';
  
  // 成就定义
  const achievements = [
    { id: 'first_view', name: '初次探索', desc: '查看第一个物种详情', icon: '🌱', requirement: 1 },
    { id: 'explorer_10', name: '探索者', desc: '查看10个不同物种', icon: '🔍', requirement: 10 },
    { id: 'explorer_30', name: '博物学家', desc: '查看30个不同物种', icon: '🎓', requirement: 30 },
    { id: 'explorer_60', name: '生态达人', desc: '查看60个不同物种', icon: '🌟', requirement: 60 },
    { id: 'master', name: '物种大师', desc: '查看全部物种', icon: '👑', requirement: 'all' },
    { id: 'plant_lover', name: '绿植爱好者', desc: '查看全部绿植', icon: '🌳', requirement: 'all_plants' },
    { id: 'bird_watcher', name: '观鸟达人', desc: '查看全部鸟类', icon: '🐦', requirement: 'all_birds' },
    { id: 'bug_fan', name: '昆虫迷', desc: '查看全部昆虫', icon: '🦋', requirement: 'all_insects' },
    { id: 'fungi_finder', name: '菌物猎人', desc: '查看全部真菌', icon: '🍄', requirement: 'all_fungi' },
    { id: 'herp_master', name: '两栖爬行专家', desc: '查看全部两栖/爬行类', icon: '🐸', requirement: 'all_amphibian' },
    { id: 'mammal_expert', name: '哺乳动物学家', desc: '查看全部哺乳类', icon: '🐿️', requirement: 'all_mammal' },
    { id: 'quiz_ace', name: '问答高手', desc: '问答正确率达到80%以上', icon: '🧠', requirement: 'quiz_80' },
    { id: 'quiz_master', name: '知识王者', desc: '问答正确率达到100%', icon: '💎', requirement: 'quiz_100' }
  ];
  
  /**
   * 获取收集数据
   */
  function getData() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {
        viewedSpecies: [],
        quizHistory: [],
        achievementsUnlocked: []
      };
    } catch (e) {
      return { viewedSpecies: [], quizHistory: [], achievementsUnlocked: [] };
    }
  }
  
  /**
   * 保存收集数据
   */
  function saveData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('无法保存到 localStorage');
    }
  }
  
  /**
   * 记录查看物种
   * @param {string} speciesId - 物种ID
   */
  function recordView(speciesId) {
    const data = getData();
    if (!data.viewedSpecies.includes(speciesId)) {
      data.viewedSpecies.push(speciesId);
      saveData(data);
      checkAchievements(data);
    }
  }
  
  /**
   * 记录问答成绩
   * @param {number} correct - 正确数
   * @param {number} total - 总题数
   */
  function recordQuiz(correct, total) {
    const data = getData();
    const rate = Math.round((correct / total) * 100);
    data.quizHistory.push({
      correct,
      total,
      rate,
      date: new Date().toISOString()
    });
    saveData(data);
    checkAchievements(data);
  }
  
  /**
   * 检查并解锁成就
   * @param {Object} data - 收集数据
   * @returns {Array} 新解锁的成就列表
   */
  function checkAchievements(data) {
    const newlyUnlocked = [];
    
    for (const achievement of achievements) {
      if (data.achievementsUnlocked.includes(achievement.id)) continue;
      
      let unlocked = false;
      
      switch (achievement.requirement) {
        case 'all':
          unlocked = data.viewedSpecies.length >= speciesList.length;
          break;
        case 'all_plants':
          const plants = speciesList.filter(s => s.category === 'plant');
          unlocked = plants.length > 0 && plants.every(p => data.viewedSpecies.includes(p.id));
          break;
        case 'all_birds':
          const birds = speciesList.filter(s => s.category === 'bird');
          unlocked = birds.length > 0 && birds.every(b => data.viewedSpecies.includes(b.id));
          break;
        case 'all_insects':
          const insects = speciesList.filter(s => s.category === 'insect');
          unlocked = insects.length > 0 && insects.every(i => data.viewedSpecies.includes(i.id));
          break;
        case 'all_fungi':
          const fungi = speciesList.filter(s => s.category === 'fungi');
          unlocked = fungi.length > 0 && fungi.every(f => data.viewedSpecies.includes(f.id));
          break;
        case 'all_amphibian':
          const amphibians = speciesList.filter(s => s.category === 'amphibian');
          unlocked = amphibians.length > 0 && amphibians.every(a => data.viewedSpecies.includes(a.id));
          break;
        case 'all_mammal':
          const mammals = speciesList.filter(s => s.category === 'mammal');
          unlocked = mammals.length > 0 && mammals.every(m => data.viewedSpecies.includes(m.id));
          break;
        case 'quiz_80':
          unlocked = data.quizHistory.some(q => q.rate >= 80);
          break;
        case 'quiz_100':
          unlocked = data.quizHistory.some(q => q.rate === 100);
          break;
        default:
          if (typeof achievement.requirement === 'number') {
            unlocked = data.viewedSpecies.length >= achievement.requirement;
          }
      }
      
      if (unlocked) {
        data.achievementsUnlocked.push(achievement.id);
        newlyUnlocked.push(achievement);
      }
    }
    
    if (newlyUnlocked.length > 0) {
      saveData(data);
    }
    
    return newlyUnlocked;
  }
  
  /**
   * 获取收集进度
   */
  function getProgress() {
    const data = getData();
    const total = speciesList.length;
    const viewed = data.viewedSpecies.length;
    const percentage = Math.round((viewed / total) * 100);
    
    // 动态计算每个类别的进度
    const categories = {};
    speciesList.forEach(s => {
      if (!categories[s.category]) {
        categories[s.category] = { viewed: 0, total: 0, label: s.categoryLabel };
      }
      categories[s.category].total++;
      if (data.viewedSpecies.includes(s.id)) {
        categories[s.category].viewed++;
      }
    });
    
    return {
      total,
      viewed,
      percentage,
      remaining: total - viewed,
      categories,
      // 兼容旧的属性名
      plantsViewed: categories.plant?.viewed || 0,
      plantsTotal: categories.plant?.total || 0,
      birdsViewed: categories.bird?.viewed || 0,
      birdsTotal: categories.bird?.total || 0,
      insectsViewed: categories.insect?.viewed || 0,
      insectsTotal: categories.insect?.total || 0
    };
  }
  
  /**
   * 获取已解锁成就
   */
  function getUnlockedAchievements() {
    const data = getData();
    return achievements.filter(a => data.achievementsUnlocked.includes(a.id));
  }
  
  /**
   * 检查物种是否已查看
   * @param {string} speciesId - 物种ID
   */
  function isViewed(speciesId) {
    const data = getData();
    return data.viewedSpecies.includes(speciesId);
  }
  
  /**
   * 获取最佳问答记录
   */
  function getBestQuizRecord() {
    const data = getData();
    if (data.quizHistory.length === 0) return null;
    return data.quizHistory.reduce((best, q) => q.rate > best.rate ? q : best);
  }
  
  return {
    recordView,
    recordQuiz,
    getProgress,
    getUnlockedAchievements,
    isViewed,
    getBestQuizRecord,
    achievements
  };
})();
