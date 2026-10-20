/**
 * 校园常见物种数据
 * 包含20种校园常见物种：绿植(10种)、鸟类(5种)、昆虫(5种)
 */
const speciesList = [
  // ========== 绿植类 (10种) ==========
  {
    id: "camphor-tree",
    name: "樟树",
    latinName: "Cinnamomum camphora",
    category: "plant",
    categoryLabel: "绿植",
    description: "常绿大乔木，高可达30米，树冠广展，枝叶有樟脑香气。叶片革质，卵形或椭圆形，先端渐尖，基部宽楔形。花期4-5月，果期8-11月。",
    habitat: "喜温暖湿润气候，适应性强，耐修剪，对土壤要求不严，在深厚肥沃的酸性土壤中生长良好。",
    ecologicalRole: "净化空气、吸附粉尘、降低噪音，为鸟类提供栖息地和食物来源，是城市绿化的重要树种。",
    features: ["树冠广展如伞", "枝叶有樟脑香气", "四季常绿", "树皮纵裂"],
    campusDistribution: "教学楼前广场、主干道两侧、图书馆周边",
    funFact: "樟树可提取樟脑和樟油，是天然防虫剂，古人常用樟木箱保存衣物防虫蛀。",
    emoji: "🌳"
  },
  {
    id: "osmanthus",
    name: "桂花树",
    latinName: "Osmanthus fragrans",
    category: "plant",
    categoryLabel: "绿植",
    description: "常绿灌木或小乔木，高3-5米。叶片对生，椭圆形或长椭圆形，边缘有锯齿。花期9-10月，花朵小而密集，香气浓郁。",
    habitat: "喜温暖湿润环境，耐半阴，不耐寒。适宜在排水良好的微酸性土壤中生长。",
    ecologicalRole: "花香吸引蜜蜂等传粉昆虫，四季常绿保持水土，是优良的园林绿化树种。",
    features: ["秋季花香浓郁", "花朵金黄或银白", "叶片深绿光亮", "树形优美"],
    campusDistribution: "教学楼中庭、学生宿舍区、校园花园",
    funFact: "桂花是中国传统十大名花之一，可制作桂花糕、桂花茶、桂花酒等美食。",
    emoji: "🌸"
  },
  {
    id: "mondo-grass",
    name: "麦冬",
    latinName: "Ophiopogon japonicus",
    category: "plant",
    categoryLabel: "绿植",
    description: "多年生常绿草本植物，植株低矮，高10-30厘米。叶片细长如麦苗，深绿色。花淡紫色或白色，果实蓝色球形。",
    habitat: "喜半阴环境，耐寒耐旱，适应性强。常生于林下、溪边或阴湿的山坡。",
    ecologicalRole: "优秀的地被植物，能有效防止水土流失，抑制杂草生长，维持土壤湿度。",
    features: ["叶片细长翠绿", "耐阴性强", "蓝紫色果实", "四季常绿"],
    campusDistribution: "花坛边缘、道路两侧绿化带、树荫下",
    funFact: "麦冬的块根是中药材，有养阴生津、润肺清心的功效，是常见的中药饮片。",
    emoji: "🌿"
  },
  {
    id: "ginkgo",
    name: "银杏",
    latinName: "Ginkgo biloba",
    category: "plant",
    categoryLabel: "绿植",
    description: "落叶大乔木，高可达40米。叶片扇形，春夏翠绿，秋季金黄。雌雄异株，种子白色，外种皮肉质有臭味。",
    habitat: "喜光，耐寒耐旱，对气候和土壤适应范围较广。深根性树种，生长缓慢但寿命极长。",
    ecologicalRole: "净化空气、抗病虫害能力强，秋叶景观效果极佳，是活化石级的孑遗植物。",
    features: ["扇形叶片独特", "秋季叶片金黄", "寿命可达千年", "活化石植物"],
    campusDistribution: "校园主干道、行政楼前、银杏大道",
    funFact: "银杏是2.7亿年前就存在的古老物种，被称为植物界的'活化石'，是与恐龙同时代的生物。",
    emoji: "🍂"
  },
  {
    id: "crape-myrtle",
    name: "紫薇",
    latinName: "Lagerstroemia indica",
    category: "plant",
    categoryLabel: "绿植",
    description: "落叶灌木或小乔木，高3-7米。树皮光滑，灰褐色。叶片互生，椭圆形。花期6-9月，花色丰富，有紫、红、粉、白等。",
    habitat: "喜光，稍耐阴，耐寒耐旱。在温暖湿润的环境中生长良好，对土壤要求不严。",
    ecologicalRole: "花期长，为传粉昆虫提供食物，美化环境，吸收有害气体。",
    features: ["花期长达百日", "树皮光滑", "花色丰富", "耐修剪"],
    campusDistribution: "校园花坛、行政楼花坛、景观步道旁",
    funFact: "紫薇又叫'百日红'，因为花期可达100天以上。树干光滑，猴子都爬不上去，又叫'猴刺脱'。",
    emoji: "🌺"
  },
  {
    id: "red-leaf-photinia",
    name: "红叶石楠",
    latinName: "Photinia × fraseri",
    category: "plant",
    categoryLabel: "绿植",
    description: "常绿灌木，高2-4米。新梢和嫩叶鲜红色，老叶深绿色。叶片革质，长椭圆形。花白色，果实红色。",
    habitat: "喜光，稍耐阴，耐寒耐旱，生长速度快，耐修剪造型。适宜在肥沃疏松的土壤中生长。",
    ecologicalRole: "常绿保持水土，红色新叶美化环境，果实为鸟类提供食物。",
    features: ["新叶鲜红如火", "生长速度快", "耐修剪造型", "四季观赏"],
    campusDistribution: "道路中央隔离带、围墙边、花坛中",
    funFact: "红叶石楠的红色新叶每年可出现2-3次，每次新叶持续时间约一个月，是园林中'红色'担当。",
    emoji: "🍁"
  },
  {
    id: "azalea",
    name: "杜鹃",
    latinName: "Rhododendron simsii",
    category: "plant",
    categoryLabel: "绿植",
    description: "常绿或落叶灌木，高1-2米。叶片卵形，表面有棕色绒毛。花期4-5月，花朵漏斗形，颜色有红、粉、白、紫等。",
    habitat: "喜半阴湿润环境，不耐暴晒。适宜在酸性土壤中生长，忌碱性土壤。",
    ecologicalRole: "春季为传粉昆虫提供大量花蜜，根系保持水土，是优良的园林观赏植物。",
    features: ["春季开花繁盛", "花色丰富艳丽", "喜酸性土壤", "品种繁多"],
    campusDistribution: "教学楼后花园、景观池塘边、山坡绿化带",
    funFact: "杜鹃花又叫映山红，传说杜鹃鸟啼叫时嘴角会流血，血滴在山上就变成了杜鹃花。",
    emoji: "🌺"
  },
  {
    id: "gardenia",
    name: "栀子花",
    latinName: "Gardenia jasminoides",
    category: "plant",
    categoryLabel: "绿植",
    description: "常绿灌木，高1-2米。叶片对生，革质有光泽。花期5-7月，花朵白色，芳香浓郁，花瓣肉质。果实橙黄色。",
    habitat: "喜温暖湿润气候，喜光也耐阴。适宜在疏松肥沃的酸性土壤中生长。",
    ecologicalRole: "花香吸引传粉昆虫，果实可作天然染料，常绿叶片净化空气。",
    features: ["花朵洁白芳香", "叶片油绿光亮", "果实可入药", "夏季开花"],
    campusDistribution: "学生宿舍楼下、图书馆前花坛、校园步道旁",
    funFact: "栀子花的果实是传统中药'栀子'，也是天然黄色染料，古代用它来染制黄色布料。",
    emoji: "🤍"
  },
  {
    id: "camellia",
    name: "茶花",
    latinName: "Camellia japonica",
    category: "plant",
    categoryLabel: "绿植",
    description: "常绿灌木或小乔木，高2-6米。叶片革质，椭圆形，深绿色有光泽。花期1-4月，花朵大而艳丽，多为红色或粉色。",
    habitat: "喜半阴环境，耐寒，不耐烈日暴晒。适宜在排水良好的微酸性土壤中生长。",
    ecologicalRole: "冬末春初开花，为早春传粉昆虫提供重要食物来源，丰富冬季景观。",
    features: ["冬春开花", "花朵大而艳丽", "叶片常绿光亮", "品种丰富"],
    campusDistribution: "教学楼前花坛、行政楼门口、校园景观区",
    funFact: "茶花是中国十大名花之一，花期长达3个月，一朵花可开放20-30天不凋谢。",
    emoji: "🌹"
  },
  {
    id: "boston-ivy",
    name: "爬山虎",
    latinName: "Parthenocissus tricuspidata",
    category: "plant",
    categoryLabel: "绿植",
    description: "多年生落叶藤本植物，茎蔓可延伸20米以上。叶片三裂，春夏翠绿，秋季变红。卷须先端有吸盘，可攀附墙壁。",
    habitat: "适应性极强，耐寒耐旱耐阴。可生长在各种土壤上，向阳或背阴处均能生长。",
    ecologicalRole: "覆盖墙面隔热降温，减少建筑能耗。吸收二氧化碳和粉尘，为昆虫和小鸟提供栖息空间。",
    features: ["攀附能力强", "秋季叶色变红", "隔热降温", "生长迅速"],
    campusDistribution: "老教学楼外墙、围墙、体育馆侧墙",
    funFact: "爬山虎覆盖的墙面夏天可降低室内温度3-5°C，是天然的'绿色空调'，还能吸附PM2.5颗粒。",
    emoji: "🌿"
  },

  // ========== 鸟类 (5种) ==========
  {
    id: "sparrow",
    name: "麻雀",
    latinName: "Passer montanus",
    category: "bird",
    categoryLabel: "鸟类",
    description: "小型鸟类，体长14厘米左右。头顶栗色，脸颊白色有明显黑斑，背部棕褐色有纵纹。喜群居，常见于人类活动区域。",
    habitat: "与人类伴居，栖息于建筑物缝隙、屋檐下、树洞中。适应城市和乡村环境。",
    ecologicalRole: "捕食害虫，传播植物种子，是城市生态链中重要的初级消费者。",
    features: ["脸颊白斑黑斑", "喜群居活动", "叫声叽叽喳喳", "与人类伴居"],
    campusDistribution: "食堂附近、宿舍楼周围、操场边树木上",
    funFact: "麻雀飞行时走波浪形路线，在地面上是双脚跳跃前进的，而不是像大多数鸟一样交替行走。",
    emoji: "🐦"
  },
  {
    id: "pigeon",
    name: "鸽子",
    latinName: "Columba livia domestica",
    category: "bird",
    categoryLabel: "鸟类",
    description: "中型鸟类，体长30-35厘米。羽色多变，常见灰蓝色、白色、褐色。颈部有紫绿色金属光泽。善飞行，归巢能力强。",
    habitat: "栖息于建筑物屋檐、阳台、广场等开阔区域。常在地面觅食，喜集群活动。",
    ecologicalRole: "传播植物种子，控制昆虫数量，是城市生态系统的重要组成部分。",
    features: ["归巢能力极强", "颈部金属光泽", "羽色丰富多样", "善于飞行"],
    campusDistribution: "教学楼主楼广场、图书馆前广场、体育馆屋顶",
    funFact: "鸽子的归巢能力极强，可以飞行上千公里后准确回到出生地。古代用信鸽传递书信。",
    emoji: "🕊️"
  },
  {
    id: "magpie",
    name: "喜鹊",
    latinName: "Pica pica",
    category: "bird",
    categoryLabel: "鸟类",
    description: "中型鸟类，体长40-50厘米（含长尾）。体羽黑白相间，肩羽和腹部白色，其余部分黑色泛蓝紫色金属光泽。",
    habitat: "栖息于开阔的林地、农田和城镇公园。在高大的树木上筑巢，巢呈球形。",
    ecologicalRole: "杂食性，捕食害虫和小型动物，清除腐肉，有助于控制害虫种群。",
    features: ["黑白羽毛对比鲜明", "长尾巴", "聪明善模仿", "叫声响亮"],
    campusDistribution: "高大乔木上、操场周边、校门口大树上",
    funFact: "喜鹊是鸟类中最聪明的物种之一，能通过镜像测试（自我认知能力），还会使用工具和解决问题。",
    emoji: "🐦"
  },
  {
    id: "chinese-bulbul",
    name: "白头鹎",
    latinName: "Pycnonotus sinensis",
    category: "bird",
    categoryLabel: "鸟类",
    description: "中小型鸟类，体长17-22厘米。头顶黑色，后枕部有一大块白斑（白头），背部黄绿色，尾羽末端白色。",
    habitat: "栖息于低海拔的树林、果园、公园和花园。喜欢人类活动区域，不怕人。",
    ecologicalRole: "杂食性，食用水果帮助传播种子，也捕食昆虫控制害虫数量。",
    features: ["头顶白斑显著", "鸣声悦耳", "不怕人", "喜食果实"],
    campusDistribution: "校园果园、食堂附近树上、宿舍楼下绿化带",
    funFact: "白头鹎又叫'白头翁'，因其头顶白色羽毛像白发而得名，是中国南方最常见的鸟类之一。",
    emoji: "🐦"
  },
  {
    id: "blackbird",
    name: "乌鸫",
    latinName: "Turdus mandarinus",
    category: "bird",
    categoryLabel: "鸟类",
    description: "中型鸟类，体长25-28厘米。雄鸟全身黑色，喙和眼圈橙黄色，非常醒目。雌鸟深褐色，胸部有斑纹。",
    habitat: "栖息于林地、公园、花园和草坪。喜在湿润的草地上觅食蚯蚓和昆虫。",
    ecologicalRole: "控制蚯蚓和昆虫数量，传播植物种子，是城市绿地生态系统的重要成员。",
    features: ["雄鸟全黑黄喙", "鸣声婉转悠扬", "喜在草地觅食", "胆小谨慎"],
    campusDistribution: "草坪上、花园中、雨后常见于步道上",
    funFact: "乌鸫的歌声是鸟类中最悦耳的之一，能模仿多种鸟叫声，常在清晨和傍晚鸣唱。",
    emoji: "🐦"
  },

  // ========== 昆虫类 (5种) ==========
  {
    id: "cabbage-butterfly",
    name: "菜粉蝶",
    latinName: "Pieris rapae",
    category: "insect",
    categoryLabel: "昆虫",
    description: "中型蝴蝶，翅展4-5厘米。翅膀白色，前翅顶角黑色，雌蝶翅面有两个黑斑。幼虫青绿色，俗称菜青虫。",
    habitat: "栖息于菜园、花园、公园等有十字花科植物的区域。成虫喜在阳光下飞舞。",
    ecologicalRole: "成虫是重要的传粉者，帮助多种植物完成授粉。是食物链中鸟类和蜘蛛的食物来源。",
    features: ["翅膀白色", "飞行缓慢优雅", "喜访花吸蜜", "幼虫食十字花科"],
    campusDistribution: "校园花圃、景观花坛、实验菜园附近",
    funFact: "菜粉蝶能看到紫外线光，它们通过花瓣上的紫外线图案来定位花蜜的位置。",
    emoji: "🦋"
  },
  {
    id: "honeybee",
    name: "蜜蜂",
    latinName: "Apis cerana",
    category: "insect",
    categoryLabel: "昆虫",
    description: "社会性昆虫，体长1-1.5厘米。身体黄褐色与黑色条纹相间，全身有绒毛。工蜂有花粉篮和蜜囊。",
    habitat: "在树洞、屋檐下等避风处筑巢。活跃于有开花植物的区域，飞行范围广。",
    ecologicalRole: "最重要的传粉昆虫之一，维持植物繁殖和生态系统平衡。蜂蜜和蜂蜡对人类有重要价值。",
    features: ["社会性群居", "重要传粉者", "可生产蜂蜜", "有舞蹈通信行为"],
    campusDistribution: "校园花圃、果园、绿化灌木丛中",
    funFact: "蜜蜂通过'8字舞'告诉同伴食物的方向和距离，一次可飞行5公里采集花蜜。",
    emoji: "🐝"
  },
  {
    id: "dragonfly",
    name: "蜻蜓",
    latinName: "Anax parthenope",
    category: "insect",
    categoryLabel: "昆虫",
    description: "大型蜻蜓，体长7-8厘米，翅展10厘米左右。复眼巨大，占据头部大部分。胸部绿色或褐色，翅膀透明有脉络。",
    habitat: "栖息于池塘、湖泊、水渠等水域附近。幼虫（水虿）在水中生活1-2年。",
    ecologicalRole: "捕食蚊子等飞行昆虫，是天然的害虫控制者。幼虫捕食蚊幼虫，控制蚊虫数量。",
    features: ["复眼巨大", "飞行技巧高超", "可悬停倒飞", "捕食蚊蝇"],
    campusDistribution: "校园景观池塘、喷水池附近、草坪上空",
    funFact: "蜻蜓是昆虫界的'飞行之王'，可以悬停、倒飞、急速转向，飞行速度可达每小时60公里。",
    emoji: "🪰"
  },
  {
    id: "ladybug",
    name: "瓢虫",
    latinName: "Harmonia axyridis",
    category: "insect",
    categoryLabel: "昆虫",
    description: "小型甲虫，体长5-8毫米。鞘翅橙红色或黄色，有数量不等的黑色斑点（通常5-19个）。身体半球形。",
    habitat: "栖息于各种有蚜虫的植物上。冬季群集在建筑物缝隙、落叶层中越冬。",
    ecologicalRole: "重要的天敌昆虫，一只瓢虫一生可捕食数千只蚜虫，是生物防治的明星物种。",
    features: ["鞘翅红/黄带黑点", "捕食蚜虫", "遇险装死", "冬季群集越冬"],
    campusDistribution: "校园花坛灌木上、教学楼窗台、花圃植物叶片上",
    funFact: "瓢虫遇到危险时会装死并从腿关节分泌黄色液体（含苦味毒素），让捕食者觉得不好吃。",
    emoji: "🐞"
  },
  {
    id: "ant",
    name: "蚂蚁",
    latinName: "Formica japonica",
    category: "insect",
    categoryLabel: "昆虫",
    description: "社会性昆虫，工蚁体长4-6毫米。身体黑色或红褐色，分头、胸、腹三部分，有触角和强壮的上颚。",
    habitat: "在土壤中筑巢，巢穴结构复杂。活跃于地面、树干、石块下等各种环境中。",
    ecologicalRole: "分解有机物，改善土壤结构（翻松土壤），传播植物种子，是生态系统的重要分解者。",
    features: ["社会性分工明确", "力量巨大(举起体重50倍)", "化学通讯", "改善土壤"],
    campusDistribution: "校园道路缝隙、树根周围、花坛土壤中",
    funFact: "蚂蚁能举起自身体重50倍的物体，按体重比是地球上力量最大的动物之一。一个蚁巢可有数万只蚂蚁。",
    emoji: "🐜"
  }
];

// 获取所有分类
function getCategories() {
  return [
    { id: "all", label: "全部", count: speciesList.length },
    { id: "plant", label: "绿植", count: speciesList.filter(s => s.category === "plant").length },
    { id: "bird", label: "鸟类", count: speciesList.filter(s => s.category === "bird").length },
    { id: "insect", label: "昆虫", count: speciesList.filter(s => s.category === "insect").length }
  ];
}

// 根据分类筛选物种
function getSpeciesByCategory(categoryId) {
  if (categoryId === "all") return speciesList;
  return speciesList.filter(s => s.category === categoryId);
}

// 根据ID获取物种
function getSpeciesById(id) {
  return speciesList.find(s => s.id === id);
}
