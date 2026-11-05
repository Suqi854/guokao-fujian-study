"use strict";
// Optional candidate import. Add after content modules and BEFORE catalog.js only after editorial review.
// No network, storage, publication or renderer changes. Reading passages are self-contained in each stem.
(() => {
  const C = window.STUDY_CONTENT;
  if (!C || !Array.isArray(C.questions) || !Array.isArray(C.lessons)) throw new Error("STUDY_CONTENT must exist before candidate import");
  const data = {
  "packageVersion": 1,
  "date": "2026-11-05",
  "status": "candidate-not-published",
  "summary": "36道原创选择题，4个新知识点，3组虚构多段材料；识别、迁移、边界各12题。",
  "limits": [
    "不是历年真题或官方评分依据",
    "难度全部未标定",
    "新增题未写入主站、未发布",
    "无新增外部事实来源，指数口径均由题设明示",
    "独立验算指另法核对，不是独立第三方审定"
  ],
  "lessons": [
    {
      "id": "fq-dynamic-stock",
      "category": "数量关系",
      "title": "动态存量：净消耗与时间顺序",
      "subtitle": "新增原创专题；福建省考备考适用方向，不表示真实试卷来源或完整考纲覆盖。",
      "minutes": 25,
      "tags": [
        "初始存量",
        "新增量",
        "净消耗",
        "离散时点"
      ],
      "questionType": "动态存量",
      "formula": "剩余量 = 初始量 + 累计进入量 − 累计处理量",
      "sections": [
        [
          "识别：把库存与流量分开",
          "初始存量是开始时已经存在的数量。进入速度和处理速度是每单位时间的变化量；在连续、恒速且计量一致的模型中，剩余量为初始量加新增量减处理量。"
        ],
        [
          "识别：先看能否清空",
          "初始量为正时，只有处理速度大于进入速度，恒速连续模型才有正的首次清空时间。两速相等库存不变，处理更慢则库存增加。"
        ],
        [
          "识别：两次实验共享什么",
          "初始量和进入速度只有在题目明说相同后才能共用未知数。分别列初始量等于净处理速度乘清空时间，再联立；不要把总处理量当成初始量。"
        ],
        [
          "迁移：变速就分段记账",
          "先求变速时点的剩余量，再使用新阶段的进入与处理速度。首次清空前的状态必须非负；不得跨过已经清空的时点继续机械相减。"
        ],
        [
          "迁移：人数进入处理速度",
          "若每人效率相同且恒定，总处理速度是人数乘单人效率。先由已知安排求新增速度和初始积压，再代入新安排，而非直接用人数与天数作反比。"
        ],
        [
          "迁移：至少与不超过",
          "时限题先列净处理量不少于初始量的不等式，再按人数或设备数的整数要求取值；用低一个整数不满足、所取整数满足来证明最小。"
        ],
        [
          "边界：检查模型相容性",
          "同一正初始量、同一进入速度下，能清空时更快处理应更早清空。联立出现负初始量或条件矛盾时，应指出记录不相容，不强行取绝对值。"
        ],
        [
          "边界：到货时点会改答案",
          "每天先处理后到货是离散过程，上午库存和晚上库存不同。题目要求在哪个时点观察，就逐步记账；不能把全天净差直接当作所有时点的库存变化。"
        ],
        [
          "边界：说明适用前提",
          "这些题是虚构恒速模型。实际排队、流量和效率可能变化；未经题设允许，不把模型结论推广为真实运营预测。"
        ]
      ],
      "practice": [
        "fq-dynamic-stock-01",
        "fq-dynamic-stock-02",
        "fq-dynamic-stock-03",
        "fq-dynamic-stock-04",
        "fq-dynamic-stock-05",
        "fq-dynamic-stock-06",
        "fq-dynamic-stock-07",
        "fq-dynamic-stock-08",
        "fq-dynamic-stock-09"
      ],
      "sources": [],
      "updated": "2026-11-05",
      "learningLevels": {
        "intro": {
          "title": "入门：识别概念",
          "stage": "识别概念",
          "sections": [
            0,
            1,
            2
          ],
          "questionIds": [
            "fq-dynamic-stock-01",
            "fq-dynamic-stock-02",
            "fq-dynamic-stock-03"
          ],
          "goal": "将持续新增从处理速度中扣除；判断处理速度等于新增速度的存量变化；由两次排空实验分离初始存量和新增速度"
        },
        "practice": {
          "title": "巩固：迁移运用",
          "stage": "迁移运用",
          "sections": [
            3,
            4,
            5
          ],
          "questionIds": [
            "fq-dynamic-stock-04",
            "fq-dynamic-stock-05",
            "fq-dynamic-stock-06"
          ],
          "goal": "在处理速度改变时分段记录剩余量；利用两组清空条件推算第三种安排；将截止时限转为不等式并向上取整"
        },
        "advanced": {
          "title": "提升：检查边界",
          "stage": "检查边界",
          "sections": [
            6,
            7,
            8
          ],
          "questionIds": [
            "fq-dynamic-stock-07",
            "fq-dynamic-stock-08",
            "fq-dynamic-stock-09"
          ],
          "goal": "处理速度低于新增速度时检查能否清空；判断观测数据是否符合恒定新增模型；区分离散到货时点和连续净消耗"
        }
      }
    },
    {
      "id": "fq-integer-count",
      "category": "数量关系",
      "title": "整数约束：先定取值域，再分类计数",
      "subtitle": "新增原创专题；福建省考备考适用方向，不表示真实试卷来源或完整考纲覆盖。",
      "minutes": 25,
      "tags": [
        "非负整数",
        "捆绑",
        "插空",
        "分类计数"
      ],
      "questionType": "整数约束与分类计数",
      "formula": "先列整数取值域，再按限制分类或使用补集",
      "sections": [
        [
          "识别：先写整数域",
          "人数、册数、张数常须为非负整数；至少购买一件则改为正整数。方程的实数解不自动是可行方案，还要核对上限、总量和全部限制。"
        ],
        [
          "识别：捆绑保留内部顺序",
          "若指定对象必须相邻，可暂时捆成整体，再数整体与其他对象的外部排列；内部顺序若可变，要另乘内部排列数。"
        ],
        [
          "识别：补集要同一总体",
          "不相邻可从全部排列中扣相邻排列，前提是两类覆盖全部且互不重叠。选取与排列不是同一总体，不能一边按组合一边按排列。"
        ],
        [
          "迁移：先安排限制最强的位置",
          "组成偶数时个位先选偶数字，再安排剩余位置。若有数字0，还需单独限制首位，不能把无0题目的乘法直接照搬。"
        ],
        [
          "迁移：插空的槽位含两端",
          "先排列不受相邻限制的一组，在其前、后及相邻两人间形成空隙。要求目标对象互不相邻时每个空隙最多放一个，目标对象若不同还需计算其顺序。"
        ],
        [
          "迁移：优化要给可达安排",
          "求最少数量先找下界，再展示达到下界的整数解；若下界不能实现，继续检查下一候选。仅用总量除以最大容量再向上取整未必保证恰好坐满。"
        ],
        [
          "边界：公因数是必要条件",
          "6和10的整数组合一定是偶数，因此奇数不可达。但金额是偶数不代表任意小金额都可达，例如2元仍不能由非负张数组成；必要条件不冒充充分条件。"
        ],
        [
          "边界：不能同时不等于恰有一个",
          "甲乙不能同时入选允许两人都不选，除非另有至少一人入选条件。先把文字翻译成允许与禁止的情况，再分类或求补集。"
        ],
        [
          "边界：上下限不能漏",
          "相同物品分到不同盒子按数量组合计数。先满足下限再处理上限，或列互斥数量类型并计算位置排列；避免把相同数值的排列重复计数。"
        ]
      ],
      "practice": [
        "fq-integer-count-01",
        "fq-integer-count-02",
        "fq-integer-count-03",
        "fq-integer-count-04",
        "fq-integer-count-05",
        "fq-integer-count-06",
        "fq-integer-count-07",
        "fq-integer-count-08",
        "fq-integer-count-09"
      ],
      "sources": [],
      "updated": "2026-11-05",
      "learningLevels": {
        "intro": {
          "title": "入门：识别概念",
          "stage": "识别概念",
          "sections": [
            0,
            1,
            2
          ],
          "questionIds": [
            "fq-integer-count-01",
            "fq-integer-count-02",
            "fq-integer-count-03"
          ],
          "goal": "按同余限制枚举非负整数解；区分捆绑后的外部排列与内部顺序；用全部减违规计算不相邻排列"
        },
        "practice": {
          "title": "巩固：迁移运用",
          "stage": "迁移运用",
          "sections": [
            3,
            4,
            5
          ],
          "questionIds": [
            "fq-integer-count-04",
            "fq-integer-count-05",
            "fq-integer-count-06"
          ],
          "goal": "通过整数约束优化总件数并验证可达；优先安排受奇偶限制的位置；用空隙法保留全部个体顺序"
        },
        "advanced": {
          "title": "提升：检查边界",
          "stage": "检查边界",
          "sections": [
            6,
            7,
            8
          ],
          "questionIds": [
            "fq-integer-count-07",
            "fq-integer-count-08",
            "fq-integer-count-09"
          ],
          "goal": "先用公因数判断整数可达性；辨别不得同时入选与必须只选一个；在有上下限的分配中使用互斥分类"
        }
      }
    },
    {
      "id": "fq-index-caliber",
      "category": "资料分析",
      "title": "指数口径：基准、权重和合成规则",
      "subtitle": "新增原创专题；福建省考备考适用方向，不表示真实试卷来源或完整考纲覆盖。",
      "minutes": 25,
      "tags": [
        "同基指数",
        "环比连接",
        "固定权重",
        "不可直接相加"
      ],
      "questionType": "指数与统计口径",
      "formula": "先核基准与定义，再比较、加权或连接倍数",
      "sections": [
        [
          "识别：指数先找基准",
          "指数100通常是题目约定的基准值，而非实际数量100。按本组明确给定的比值定义，指数112表示现期为基期的1.12倍，不表示上涨112%。"
        ],
        [
          "识别：同基比较仍要除",
          "同一对象、同一基期、同一口径的两个指数可以相除求两期倍数。指数点差不等于两期相对涨幅，后者以比较起点的指数为分母。"
        ],
        [
          "识别：环比倍数需要连接",
          "连续两段变化的基数不同，应把倍数相乘。涨10%再降10%得到原来的0.99倍；本组不把任意不同品类的指数当作连续两段来相乘。"
        ],
        [
          "迁移：只按题设权重合成",
          "题目定义按基期金额加权，就先求基期金额权重。不同指数可采用不同编制方法，不能未经说明一律使用简单平均或某一权重。"
        ],
        [
          "迁移：固定篮子保持指定数量",
          "按固定基期数量核算现期费用时，现期实际购买量不是所需权重。写明价格与数量各用哪个时期，有助于发现口径混用。"
        ],
        [
          "迁移：按已给关系拆分",
          "单一同质商品且题设保证金额指数等于价格指数乘销量指数再除以100时，可据此还原销量指数。复杂真实综合统计不自动适用这一简化关系。"
        ],
        [
          "边界：未知权重只给范围",
          "两个不同指标以正权重取算术平均，结果严格落在两者之间。权重允许0时才可能取端点；未给权重不能擅自给唯一中点。"
        ],
        [
          "边界：不同基准不能比水平",
          "两个商品各自的指数高低，不直接代表现期价格高低。基期价格、时间或指标口径不同，跨对象比较还需补足信息。"
        ],
        [
          "边界：总体不变仍可能抵消",
          "综合指数保持100不代表每个分项保持100。先看具体合成定义及正负变化；本组全部是明确给定公式的虚构算术练习，不声称覆盖真实统计指数编制。"
        ]
      ],
      "practice": [
        "fq-index-caliber-01",
        "fq-index-caliber-02",
        "fq-index-caliber-03",
        "fq-index-caliber-04",
        "fq-index-caliber-05",
        "fq-index-caliber-06",
        "fq-index-caliber-07",
        "fq-index-caliber-08",
        "fq-index-caliber-09"
      ],
      "sources": [],
      "updated": "2026-11-05",
      "learningLevels": {
        "intro": {
          "title": "入门：识别概念",
          "stage": "识别概念",
          "sections": [
            0,
            1,
            2
          ],
          "questionIds": [
            "fq-index-caliber-01",
            "fq-index-caliber-02",
            "fq-index-caliber-03"
          ],
          "goal": "把基准为100的指数转为相对变化；在同基指数之间另找比较分母；连接连续两段各以上期为100的指数"
        },
        "practice": {
          "title": "巩固：迁移运用",
          "stage": "迁移运用",
          "sections": [
            3,
            4,
            5
          ],
          "questionIds": [
            "fq-index-caliber-04",
            "fq-index-caliber-05",
            "fq-index-caliber-06"
          ],
          "goal": "依据给定基期金额权重合成指数；按指定固定数量核算指数并排除无关现期数量；由题设合成关系剔除价格变化"
        },
        "advanced": {
          "title": "提升：检查边界",
          "stage": "检查边界",
          "sections": [
            6,
            7,
            8
          ],
          "questionIds": [
            "fq-index-caliber-07",
            "fq-index-caliber-08",
            "fq-index-caliber-09"
          ],
          "goal": "在未知权重时保留可确定的范围；不同基准的指数不能直接比较价格水平；综合指数不变不等于各分项不变"
        }
      }
    },
    {
      "id": "fq-multi-paragraph",
      "category": "言语理解",
      "title": "多段阅读：跨段找依据，区分说明与结论",
      "subtitle": "新增原创专题；福建省考备考适用方向，不表示真实试卷来源或完整考纲覆盖。",
      "minutes": 25,
      "tags": [
        "段落关系",
        "跨段证据",
        "指代",
        "结论边界"
      ],
      "questionType": "多段阅读",
      "formula": "段落任务 → 跨段证据 → 选项范围与强度",
      "sections": [
        [
          "识别：先给每段标任务",
          "简写每段在做什么，如提出问题、说明方法、给出观察、限制结论。中心概括应能解释主要段落为何放在一起，而不是只复制某段醒目的关键词。"
        ],
        [
          "识别：总量与细分信息分开",
          "材料若先给总体指标，再指出型号、状态或路线差异，常是在限制单一指标的解释范围。不能因为总体上升就推断所有部分都改善。"
        ],
        [
          "识别：未来计划不是既成事实",
          "计划测试、准备比较和已经证明的时态不同。结构题与主旨题都要保留计划性质，不能把拟开展的工作改写成已经获得的结论。"
        ],
        [
          "迁移：跨段为选项找证据",
          "把选项拆成两三项主张，分别定位支持句。若只有前半项在文中出现，后半项需要自行添加因果、效果或范围，该选项仍不成立。"
        ],
        [
          "迁移：指代要看前后共同限制",
          "指代通常承接前文，但后一句将如何处理该问题，也能进一步锁定范围。不要只按最近名词机械判断，更不能把局部缺口扩大成整个领域的所有问题。"
        ],
        [
          "迁移：措施和评价对象一一对应",
          "材料保留多个使用群体、多个约束时，评价标准也应照顾这些对象。新增一种指标，不等于原有群体和条件被取消。"
        ],
        [
          "边界：观察与因果证明不同",
          "两组用时不同或指标上升，是观察到的现象。材料明确存在分组、季节或其他限制时，不能把未排除的解释改写成已证实的唯一原因。"
        ],
        [
          "边界：标题不能偷换结论强度",
          "好标题覆盖主要话题和核心关系。把不单独依赖写成完全无用、把局部改善写成普遍成功，虽然醒目，却超过全文。"
        ],
        [
          "边界：比较最受支持的一项",
          "阅读题应以所给材料为证据，不需要用题外经验补成完整政策或研究结论。能指出每个干扰项在哪个范围、时态或逻辑关系上改变原文，比只凭语感排除更可靠。"
        ]
      ],
      "practice": [
        "fq-multi-paragraph-01",
        "fq-multi-paragraph-02",
        "fq-multi-paragraph-03",
        "fq-multi-paragraph-04",
        "fq-multi-paragraph-05",
        "fq-multi-paragraph-06",
        "fq-multi-paragraph-07",
        "fq-multi-paragraph-08",
        "fq-multi-paragraph-09"
      ],
      "sources": [],
      "updated": "2026-11-05",
      "learningLevels": {
        "intro": {
          "title": "入门：识别概念",
          "stage": "识别概念",
          "sections": [
            0,
            1,
            2
          ],
          "questionIds": [
            "fq-multi-paragraph-01",
            "fq-multi-paragraph-04",
            "fq-multi-paragraph-07"
          ],
          "goal": "结合开头问题、中段方法和结尾限制概括中心；识别三段从问题到方法再到验证的结构；区分总量指标与可供使用指标"
        },
        "practice": {
          "title": "巩固：迁移运用",
          "stage": "迁移运用",
          "sections": [
            3,
            4,
            5
          ],
          "questionIds": [
            "fq-multi-paragraph-02",
            "fq-multi-paragraph-05",
            "fq-multi-paragraph-08"
          ],
          "goal": "由分散在两段的措施解释作用；结合前后文确定指代所承接的具体问题；跨段核对措施与评价对象是否对应"
        },
        "advanced": {
          "title": "提升：检查边界",
          "stage": "检查边界",
          "sections": [
            6,
            7,
            8
          ],
          "questionIds": [
            "fq-multi-paragraph-03",
            "fq-multi-paragraph-06",
            "fq-multi-paragraph-09"
          ],
          "goal": "区分试用现象和可推广的效果结论；选择能保留全文中心和证据边界的标题；判断补充信息能否支持成功结论"
        }
      }
    }
  ],
  "questions": [
    {
      "id": "fq-dynamic-stock-01",
      "lesson": "fq-dynamic-stock",
      "stem": "一个虚构蓄水池起初有180立方米水。进水始终为每小时12立方米，排水设备始终为每小时30立方米，同时连续进排水，直到首次排空。不计其他变化，经过多少小时首次排空？",
      "options": [
        "10小时",
        "6小时",
        "15小时",
        "18小时"
      ],
      "answer": 0,
      "optionReviews": [
        "净减少速度为30−12=18立方米/小时，180÷18=10小时；回代180+12×10−30×10=0。",
        "6小时只按180÷30计算，忽略期间仍在进水；此时尚有72立方米。",
        "15小时误把进水速度当作净减少速度；按题设到10小时已首次排空。",
        "18是净减少速度的数值，单位是立方米/小时，不是排空时间。"
      ],
      "explanation": "净减少速度为30−12=18立方米/小时，180÷18=10小时；回代180+12×10−30×10=0。",
      "trainingStage": "识别概念",
      "trainingGoal": "将持续新增从处理速度中扣除",
      "graphic": null,
      "meta": {
        "module": "数量关系",
        "type": "动态存量",
        "trainingStage": "识别概念",
        "trainingGoal": "将持续新增从处理速度中扣除",
        "knowledgeIds": [
          "fq-dynamic-stock"
        ],
        "tags": [
          "初始存量",
          "新增量",
          "净消耗",
          "离散时点"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-dynamic-stock-02",
      "lesson": "fq-dynamic-stock",
      "stem": "某资料室有84份待整理文件，新文件以每小时6份的速度持续进入，工作人员也以每小时6份的速度连续整理。所有文件按同一单位计量，没有其他进出。下列判断正确的是：",
      "options": [
        "14小时后待整理文件清零",
        "每小时净增加6份",
        "7小时后剩42份",
        "待整理文件总数始终为84份"
      ],
      "answer": 3,
      "optionReviews": [
        "84÷6忽略了每小时另有6份进入，不能据此清零。",
        "进入与整理相互抵消，净增加为0，不是6份。",
        "7小时整理42份，也新进入42份，因此仍有84份。",
        "任意t小时后的待整理量为84+6t−6t=84，初始积压不会因此减少。"
      ],
      "explanation": "任意t小时后的待整理量为84+6t−6t=84，初始积压不会因此减少。",
      "trainingStage": "识别概念",
      "trainingGoal": "判断处理速度等于新增速度的存量变化",
      "graphic": null,
      "meta": {
        "module": "数量关系",
        "type": "动态存量",
        "trainingStage": "识别概念",
        "trainingGoal": "判断处理速度等于新增速度的存量变化",
        "knowledgeIds": [
          "fq-dynamic-stock"
        ],
        "tags": [
          "初始存量",
          "新增量",
          "净消耗",
          "离散时点"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-dynamic-stock-03",
      "lesson": "fq-dynamic-stock",
      "stem": "两次独立实验的初始存量相同，且物料都以同一恒定速度连续进入。第一次以每小时6单位的速度处理，12小时恰好清空；第二次以每小时10单位的速度处理，6小时恰好清空。初始存量为正，进入速度非负。每小时进入多少单位？",
      "options": [
        "1单位",
        "2单位",
        "4单位",
        "6单位"
      ],
      "answer": 1,
      "optionReviews": [
        "若进入速度为1，两次反推初始存量分别为60和54，不相同。",
        "设进入速度r、初始量S，S=(6−r)×12=(10−r)×6，解得r=2，且S=48。",
        "若进入速度为4，两次反推初始存量分别为24和36，不相同。",
        "进入速度等于第一次处理速度时，正初始存量无法在12小时清空。"
      ],
      "explanation": "设进入速度r、初始量S，S=(6−r)×12=(10−r)×6，解得r=2，且S=48。",
      "trainingStage": "识别概念",
      "trainingGoal": "由两次排空实验分离初始存量和新增速度",
      "graphic": null,
      "meta": {
        "module": "数量关系",
        "type": "动态存量",
        "trainingStage": "识别概念",
        "trainingGoal": "由两次排空实验分离初始存量和新增速度",
        "knowledgeIds": [
          "fq-dynamic-stock"
        ],
        "tags": [
          "初始存量",
          "新增量",
          "净消耗",
          "离散时点"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-dynamic-stock-04",
      "lesson": "fq-dynamic-stock",
      "stem": "某仓库起初积压120单位物料，始终以每小时8单位的速度连续到货。先以每小时20单位的速度连续处理4小时，再立即改为每小时26单位，直至首次清空。自开始处理共需多少小时？",
      "options": [
        "8小时",
        "7小时",
        "6小时",
        "10小时"
      ],
      "answer": 0,
      "optionReviews": [
        "第一段净减少(20−8)×4=48，剩72；第二段需72÷(26−8)=4小时，总计8小时。",
        "前4小时后还有72单位，再处理3小时净减少54单位，尚余18单位。",
        "前4小时后还有72单位，再处理2小时只能净减少36单位，尚未清空。",
        "10小时是始终按第一段净速度12处理的用时，未计入后续提速。"
      ],
      "explanation": "第一段净减少(20−8)×4=48，剩72；第二段需72÷(26−8)=4小时，总计8小时。",
      "trainingStage": "迁移运用",
      "trainingGoal": "在处理速度改变时分段记录剩余量",
      "graphic": null,
      "meta": {
        "module": "数量关系",
        "type": "动态存量",
        "trainingStage": "迁移运用",
        "trainingGoal": "在处理速度改变时分段记录剩余量",
        "knowledgeIds": [
          "fq-dynamic-stock"
        ],
        "tags": [
          "初始存量",
          "新增量",
          "净消耗",
          "离散时点"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-dynamic-stock-05",
      "lesson": "fq-dynamic-stock",
      "stem": "一个虚构档案处理模型中，初始积压相同，新任务以恒定速度持续进入，每名工作人员始终每天处理1单位任务。5人连续工作8天恰好清空，7人连续工作4天恰好清空；不计休息和其他变化。若从同样的初始状态改由4人工作，需要多少天清空？",
      "options": [
        "8天",
        "16天",
        "12天",
        "20天"
      ],
      "answer": 1,
      "optionReviews": [
        "8天时4人完成32单位，但初始16单位加新增24单位共40，仍积压8单位。",
        "由(5−r)×8=(7−r)×4得r=3、初始量16；4人净处理1单位/天，需16天。",
        "12天时净处理12单位，尚有4单位初始积压未消除。",
        "按题设第16天已首次清空，20天不是所求首次清空时间。"
      ],
      "explanation": "由(5−r)×8=(7−r)×4得r=3、初始量16；4人净处理1单位/天，需16天。",
      "trainingStage": "迁移运用",
      "trainingGoal": "利用两组清空条件推算第三种安排",
      "graphic": null,
      "meta": {
        "module": "数量关系",
        "type": "动态存量",
        "trainingStage": "迁移运用",
        "trainingGoal": "利用两组清空条件推算第三种安排",
        "knowledgeIds": [
          "fq-dynamic-stock"
        ],
        "tags": [
          "初始存量",
          "新增量",
          "净消耗",
          "离散时点"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-dynamic-stock-06",
      "lesson": "fq-dynamic-stock",
      "stem": "水池初有90立方米水，持续进水每小时5立方米。每台泵每小时排水10立方米，各泵同时开启后保持运行，直到首次排空。要在不超过4小时内首次排空，至少需要几台泵？",
      "options": [
        "1台",
        "2台",
        "3台",
        "4台"
      ],
      "answer": 2,
      "optionReviews": [
        "1台的净排水速度为5，需18小时，超过4小时。",
        "2台的净排水速度为15，需6小时，超过4小时。",
        "设n台，需(10n−5)×4≥90，得n≥2.75；最小整数为3，实际用时90÷25=3.6小时。",
        "4台也能满足时限，但3台已能满足，4台不是至少数。"
      ],
      "explanation": "设n台，需(10n−5)×4≥90，得n≥2.75；最小整数为3，实际用时90÷25=3.6小时。",
      "trainingStage": "迁移运用",
      "trainingGoal": "将截止时限转为不等式并向上取整",
      "graphic": null,
      "meta": {
        "module": "数量关系",
        "type": "动态存量",
        "trainingStage": "迁移运用",
        "trainingGoal": "将截止时限转为不等式并向上取整",
        "knowledgeIds": [
          "fq-dynamic-stock"
        ],
        "tags": [
          "初始存量",
          "新增量",
          "净消耗",
          "离散时点"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-dynamic-stock-07",
      "lesson": "fq-dynamic-stock",
      "stem": "初始存量80单位，物料以每小时6单位持续进入。设备先以每小时14单位处理4小时，随后永久改为每小时4单位，期间无中断和其他变化。下列判断正确的是：",
      "options": [
        "共6小时首次清空",
        "共12小时首次清空",
        "按该安排以后不能清空",
        "第4小时末已经清空"
      ],
      "answer": 2,
      "optionReviews": [
        "前4小时剩48单位；此后每小时反而增加2单位，第6小时末为52单位。",
        "改速后存量增加，不存在再用8小时清空的过程。",
        "第4小时末剩48单位，此后进入6、处理4，每小时净增加2，无法清空。",
        "前4小时净减少32单位，仍剩48单位。"
      ],
      "explanation": "第4小时末剩48单位，此后进入6、处理4，每小时净增加2，无法清空。",
      "trainingStage": "检查边界",
      "trainingGoal": "处理速度低于新增速度时检查能否清空",
      "graphic": null,
      "meta": {
        "module": "数量关系",
        "type": "动态存量",
        "trainingStage": "检查边界",
        "trainingGoal": "处理速度低于新增速度时检查能否清空",
        "knowledgeIds": [
          "fq-dynamic-stock"
        ],
        "tags": [
          "初始存量",
          "新增量",
          "净消耗",
          "离散时点"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-dynamic-stock-08",
      "lesson": "fq-dynamic-stock",
      "stem": "记录称：两次实验有相同的正初始存量和相同的非负恒定进入速度，处理全程连续。处理速度每小时10单位时5小时首次清空；处理速度每小时14单位时6小时首次清空。对这份记录的判断正确的是：",
      "options": [
        "初始量为120单位，记录相容",
        "进入速度为4单位/小时，记录相容",
        "可以直接平均用时为5.5小时作为真实清空时间",
        "两条记录不能同时满足给定模型"
      ],
      "answer": 3,
      "optionReviews": [
        "联立S=(10−r)×5=(14−r)×6得到r=34、S=−120，不是正120。",
        "代r=4时，两次初始量应分别为30和60，不相同。",
        "两次处理速度不同，且数据已与模型矛盾，平均用时不能修复矛盾。",
        "相同初始量和进入速度下，能够清空时处理更快应更早清空；联立还会得负初始量，故不相容。"
      ],
      "explanation": "相同初始量和进入速度下，能够清空时处理更快应更早清空；联立还会得负初始量，故不相容。",
      "trainingStage": "检查边界",
      "trainingGoal": "判断观测数据是否符合恒定新增模型",
      "graphic": null,
      "meta": {
        "module": "数量关系",
        "type": "动态存量",
        "trainingStage": "检查边界",
        "trainingGoal": "判断观测数据是否符合恒定新增模型",
        "knowledgeIds": [
          "fq-dynamic-stock"
        ],
        "tags": [
          "初始存量",
          "新增量",
          "净消耗",
          "离散时点"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-dynamic-stock-09",
      "lesson": "fq-dynamic-stock",
      "stem": "某柜起初有10盒物品。每天上午先尝试取出6盒，若不足6盒则全部取出；每天晚上再补入5盒。除此以外没有进出。把每个上午取物后、当晚补货前的数量作为观察值，第一次观察到0盒是第几天？",
      "options": [
        "第5天",
        "第6天",
        "第10天",
        "永远不会出现"
      ],
      "answer": 0,
      "optionReviews": [
        "第1至5天上午取出后的数量依次为4、3、2、1、0，因此第5天首次为0；当晚才再补5盒。",
        "第5天上午取物前恰有6盒，取出后已为0，不必等第6天。",
        "每天净减1不能直接用于上午观察值；初始10盒在首日上午先减少6盒。",
        "虽然晚上补货后有货，但题目观察的是上午取物后的时点，第5天确实为0。"
      ],
      "explanation": "第1至5天上午取出后的数量依次为4、3、2、1、0，因此第5天首次为0；当晚才再补5盒。",
      "trainingStage": "检查边界",
      "trainingGoal": "区分离散到货时点和连续净消耗",
      "graphic": null,
      "meta": {
        "module": "数量关系",
        "type": "动态存量",
        "trainingStage": "检查边界",
        "trainingGoal": "区分离散到货时点和连续净消耗",
        "knowledgeIds": [
          "fq-dynamic-stock"
        ],
        "tags": [
          "初始存量",
          "新增量",
          "净消耗",
          "离散时点"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-integer-count-01",
      "lesson": "fq-integer-count",
      "stem": "购买甲、乙两种同类练习册，甲每本3元、乙每本5元，恰好花31元。两种均允许不买，数量须为非负整数。不同的购买数量组合共有多少种？",
      "options": [
        "1种",
        "2种",
        "3种",
        "6种"
      ],
      "answer": 1,
      "optionReviews": [
        "乙买2本、甲买7本，以及乙买5本、甲买2本，两种都可行，不止1种。",
        "3x+5y=31给出y≡2（mod 3），且0≤y≤6，所以y只能为2或5，对应两种。",
        "允许的y范围内只有2、5满足余数条件，没有第三组。",
        "不能把可能的乙册数量随意都算入；每组还必须恰好花31元。"
      ],
      "explanation": "3x+5y=31给出y≡2（mod 3），且0≤y≤6，所以y只能为2或5，对应两种。",
      "trainingStage": "识别概念",
      "trainingGoal": "按同余限制枚举非负整数解",
      "graphic": null,
      "meta": {
        "module": "数量关系",
        "type": "整数约束与分类计数",
        "trainingStage": "识别概念",
        "trainingGoal": "按同余限制枚举非负整数解",
        "knowledgeIds": [
          "fq-integer-count"
        ],
        "tags": [
          "非负整数",
          "捆绑",
          "插空",
          "分类计数"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-integer-count-02",
      "lesson": "fq-integer-count",
      "stem": "甲、乙、丙、丁四本互不相同的手册排成一行，要求甲、乙相邻，且甲乙之间的先后顺序不限。共有多少种排法？",
      "options": [
        "6种",
        "8种",
        "12种",
        "24种"
      ],
      "answer": 2,
      "optionReviews": [
        "把甲乙视为一个整体时有3!=6种外部排法，但每种还含甲乙、乙甲两种内部顺序。",
        "不能把四个对象和两种内部顺序直接相乘；捆绑后需排列三个单位。",
        "把甲乙捆成一组，与丙、丁共三个单位，外部3!种，内部2种，共12种。",
        "4!=24包含甲乙不相邻的排法，不符合相邻限制。"
      ],
      "explanation": "把甲乙捆成一组，与丙、丁共三个单位，外部3!种，内部2种，共12种。",
      "trainingStage": "识别概念",
      "trainingGoal": "区分捆绑后的外部排列与内部顺序",
      "graphic": null,
      "meta": {
        "module": "数量关系",
        "type": "整数约束与分类计数",
        "trainingStage": "识别概念",
        "trainingGoal": "区分捆绑后的外部排列与内部顺序",
        "knowledgeIds": [
          "fq-integer-count"
        ],
        "tags": [
          "非负整数",
          "捆绑",
          "插空",
          "分类计数"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-integer-count-03",
      "lesson": "fq-integer-count",
      "stem": "甲、乙、丙、丁、戊五名不同的人排成一行，要求甲与乙不相邻。共有多少种排法？",
      "options": [
        "48种",
        "60种",
        "120种",
        "72种"
      ],
      "answer": 3,
      "optionReviews": [
        "48=2×4!是甲乙相邻的排法数，与要求相反。",
        "不能简单把全部120种除以2；相邻与不相邻并非各占一半。",
        "120种没有排除甲乙相邻的情况。",
        "全部5!=120种；甲乙相邻有2×4!=48种，所以不相邻有72种。"
      ],
      "explanation": "全部5!=120种；甲乙相邻有2×4!=48种，所以不相邻有72种。",
      "trainingStage": "识别概念",
      "trainingGoal": "用全部减违规计算不相邻排列",
      "graphic": null,
      "meta": {
        "module": "数量关系",
        "type": "整数约束与分类计数",
        "trainingStage": "识别概念",
        "trainingGoal": "用全部减违规计算不相邻排列",
        "knowledgeIds": [
          "fq-integer-count"
        ],
        "tags": [
          "非负整数",
          "捆绑",
          "插空",
          "分类计数"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-integer-count-04",
      "lesson": "fq-integer-count",
      "stem": "某活动恰有60人，安排4人桌和7人桌，每桌必须坐满，允许某一种桌不使用。至少要安排多少桌？",
      "options": [
        "8桌",
        "9桌",
        "10桌",
        "15桌"
      ],
      "answer": 1,
      "optionReviews": [
        "即使8桌全是7人桌也只有56个座位，容不下60人。",
        "4x+7y=60要求y为4的倍数；可行(x,y)为(15,0)、(8,4)、(1,8)，总桌数最少为9。",
        "10桌若全坐满，则4x+7(10−x)=60得到x=10/3，不是整数；而9桌已有可行安排。",
        "15张4人桌可行，但1张4人桌加8张7人桌只需9桌。"
      ],
      "explanation": "4x+7y=60要求y为4的倍数；可行(x,y)为(15,0)、(8,4)、(1,8)，总桌数最少为9。",
      "trainingStage": "迁移运用",
      "trainingGoal": "通过整数约束优化总件数并验证可达",
      "graphic": null,
      "meta": {
        "module": "数量关系",
        "type": "整数约束与分类计数",
        "trainingStage": "迁移运用",
        "trainingGoal": "通过整数约束优化总件数并验证可达",
        "knowledgeIds": [
          "fq-integer-count"
        ],
        "tags": [
          "非负整数",
          "捆绑",
          "插空",
          "分类计数"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-integer-count-05",
      "lesson": "fq-integer-count",
      "stem": "从数字1、2、3、4、5中选三个不同数字组成三位偶数，数字不得重复。这样的三位偶数共有多少个？",
      "options": [
        "12个",
        "24个",
        "20个",
        "60个"
      ],
      "answer": 1,
      "optionReviews": [
        "个位有2或4两种选择，不是只能固定为其中一个。",
        "个位可选2或4；选定后百位4种、十位3种，共2×4×3=24。",
        "确定个位后百位有4种、十位有3种；不能把剩余两个位置当作无序组合后遗漏顺序。",
        "5×4×3=60包含奇数，未限制个位为偶数。"
      ],
      "explanation": "个位可选2或4；选定后百位4种、十位3种，共2×4×3=24。",
      "trainingStage": "迁移运用",
      "trainingGoal": "优先安排受奇偶限制的位置",
      "graphic": null,
      "meta": {
        "module": "数量关系",
        "type": "整数约束与分类计数",
        "trainingStage": "迁移运用",
        "trainingGoal": "优先安排受奇偶限制的位置",
        "knowledgeIds": [
          "fq-integer-count"
        ],
        "tags": [
          "非负整数",
          "捆绑",
          "插空",
          "分类计数"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-integer-count-06",
      "lesson": "fq-integer-count",
      "stem": "甲、乙、丙三名讲解员与另外四名工作人员共七名不同的人排成一行，要求任何两名讲解员都不相邻。共有多少种排法？",
      "options": [
        "240种",
        "720种",
        "1440种",
        "5040种"
      ],
      "answer": 2,
      "optionReviews": [
        "240=4!×C(5,3)遗漏了三名不同讲解员在选中空隙中的3!种顺序。",
        "三名讲解员的合法位置组合有10组，每组对应3!×4!=144种个体安排；720只相当于5组，遗漏一半。",
        "先排四名工作人员4!种，形成5个空隙；选3个空隙并排列三名讲解员，得4!×C(5,3)×3!=1440。",
        "7!=5040包含讲解员相邻情况，不满足限制。"
      ],
      "explanation": "先排四名工作人员4!种，形成5个空隙；选3个空隙并排列三名讲解员，得4!×C(5,3)×3!=1440。",
      "trainingStage": "迁移运用",
      "trainingGoal": "用空隙法保留全部个体顺序",
      "graphic": null,
      "meta": {
        "module": "数量关系",
        "type": "整数约束与分类计数",
        "trainingStage": "迁移运用",
        "trainingGoal": "用空隙法保留全部个体顺序",
        "knowledgeIds": [
          "fq-integer-count"
        ],
        "tags": [
          "非负整数",
          "捆绑",
          "插空",
          "分类计数"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-integer-count-07",
      "lesson": "fq-integer-count",
      "stem": "仅用面额6元和10元的代金券付款，张数均可为非负整数且不能找零。下列哪个金额不能恰好付出？",
      "options": [
        "30元",
        "34元",
        "50元",
        "43元"
      ],
      "answer": 3,
      "optionReviews": [
        "30=3×10，可以恰好付出。",
        "34=4×6+1×10，可以恰好付出。",
        "50=5×10，可以恰好付出。",
        "6和10都是偶数，任意非负整数张合计仍为偶数，所以不能付出奇数43。"
      ],
      "explanation": "6和10都是偶数，任意非负整数张合计仍为偶数，所以不能付出奇数43。",
      "trainingStage": "检查边界",
      "trainingGoal": "先用公因数判断整数可达性",
      "graphic": null,
      "meta": {
        "module": "数量关系",
        "type": "整数约束与分类计数",
        "trainingStage": "检查边界",
        "trainingGoal": "先用公因数判断整数可达性",
        "knowledgeIds": [
          "fq-integer-count"
        ],
        "tags": [
          "非负整数",
          "捆绑",
          "插空",
          "分类计数"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-integer-count-08",
      "lesson": "fq-integer-count",
      "stem": "从甲、乙、丙、丁、戊五本不同的书中选三本，唯一限制是甲和乙不能同时入选，允许甲乙都不选。不计所选三本的排列顺序。共有多少种选法？",
      "options": [
        "7种",
        "6种",
        "9种",
        "10种"
      ],
      "answer": 0,
      "optionReviews": [
        "全部C(5,3)=10种；同时选甲乙时第三本有3种，排除后为7种。",
        "6种只算恰好选甲乙之一的情况，遗漏丙丁戊这一种两者都不选的情况。",
        "同时含甲乙的违规组合有3种，不是只排除1种。",
        "10种是无限制选法数，包含甲乙同时入选。"
      ],
      "explanation": "全部C(5,3)=10种；同时选甲乙时第三本有3种，排除后为7种。",
      "trainingStage": "检查边界",
      "trainingGoal": "辨别不得同时入选与必须只选一个",
      "graphic": null,
      "meta": {
        "module": "数量关系",
        "type": "整数约束与分类计数",
        "trainingStage": "检查边界",
        "trainingGoal": "辨别不得同时入选与必须只选一个",
        "knowledgeIds": [
          "fq-integer-count"
        ],
        "tags": [
          "非负整数",
          "捆绑",
          "插空",
          "分类计数"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-integer-count-09",
      "lesson": "fq-integer-count",
      "stem": "将12个完全相同的标记分入甲、乙、丙三个有区别的盒子，每盒至少2个、至多5个，标记必须全部分完。只按各盒数量区分分法。共有多少种分法？",
      "options": [
        "10种",
        "6种",
        "18种",
        "28种"
      ],
      "answer": 0,
      "optionReviews": [
        "不计盒子顺序的数量类型只有(2,5,5)、(3,4,5)、(4,4,4)，对应3、6、1种，共10种。",
        "6种只覆盖数量为3、4、5的不同排列，遗漏2、5、5和4、4、4。",
        "18是在先各放2个后，违反每盒至多5个条件的分法数，不是合法数。",
        "28只保证每盒至少2个，尚未扣除某盒超过5个的18种。"
      ],
      "explanation": "不计盒子顺序的数量类型只有(2,5,5)、(3,4,5)、(4,4,4)，对应3、6、1种，共10种。",
      "trainingStage": "检查边界",
      "trainingGoal": "在有上下限的分配中使用互斥分类",
      "graphic": null,
      "meta": {
        "module": "数量关系",
        "type": "整数约束与分类计数",
        "trainingStage": "检查边界",
        "trainingGoal": "在有上下限的分配中使用互斥分类",
        "knowledgeIds": [
          "fq-integer-count"
        ],
        "tags": [
          "非负整数",
          "捆绑",
          "插空",
          "分类计数"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-index-caliber-01",
      "lesson": "fq-index-caliber",
      "stem": "虚构材料明确把某产品基期单价设为指数100，同一产品现期单价指数为112，指数定义为“现期单价÷基期单价×100”。据此现期单价比基期：",
      "options": [
        "上涨112%",
        "上涨12%",
        "上涨12个百分点的价格",
        "下降约10.71%"
      ],
      "answer": 1,
      "optionReviews": [
        "112表示现期是基期的112%，上涨部分只有12%。",
        "112÷100−1=12%，对应现期单价比基期上涨12%。",
        "单价的相对变化用百分比表示；百分点用于两个百分率的差，不能称价格上涨12个百分点。",
        "这里现期高于基期，不是下降；10.71%是由现期反看基期少多少的相对比例。"
      ],
      "explanation": "112÷100−1=12%，对应现期单价比基期上涨12%。",
      "trainingStage": "识别概念",
      "trainingGoal": "把基准为100的指数转为相对变化",
      "graphic": null,
      "meta": {
        "module": "资料分析",
        "type": "指数与统计口径",
        "trainingStage": "识别概念",
        "trainingGoal": "把基准为100的指数转为相对变化",
        "knowledgeIds": [
          "fq-index-caliber"
        ],
        "tags": [
          "同基指数",
          "环比连接",
          "固定权重",
          "不可直接相加"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-index-caliber-02",
      "lesson": "fq-index-caliber",
      "stem": "某虚构同质商品的单价指数均以同一固定基期为100，甲期为120，乙期为132。乙期单价比甲期上涨：",
      "options": [
        "20%",
        "12%",
        "10%",
        "32%"
      ],
      "answer": 2,
      "optionReviews": [
        "20%是甲期相对固定基期的涨幅，不是乙期相对甲期的涨幅。",
        "132−120=12是指数点差，不是相对甲期上涨12%。",
        "两期同基可以相除，132÷120−1=10%，比较分母是甲期指数120。",
        "32%是乙期相对固定基期的涨幅，不是相对甲期的涨幅。"
      ],
      "explanation": "两期同基可以相除，132÷120−1=10%，比较分母是甲期指数120。",
      "trainingStage": "识别概念",
      "trainingGoal": "在同基指数之间另找比较分母",
      "graphic": null,
      "meta": {
        "module": "资料分析",
        "type": "指数与统计口径",
        "trainingStage": "识别概念",
        "trainingGoal": "在同基指数之间另找比较分母",
        "knowledgeIds": [
          "fq-index-caliber"
        ],
        "tags": [
          "同基指数",
          "环比连接",
          "固定权重",
          "不可直接相加"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-index-caliber-03",
      "lesson": "fq-index-caliber",
      "stem": "同一虚构商品，第二期单价以前一期为100的指数为110，第三期单价以第二期为100的指数为90。第三期相对第一期的单价变化为：",
      "options": [
        "下降1%",
        "上涨1%",
        "不变",
        "下降10%"
      ],
      "answer": 0,
      "optionReviews": [
        "把第一期单价设为100，第二期110，第三期99，因此相对第一期下降1%。",
        "连续倍数为1.1×0.9=0.99，小于1，不是上涨。",
        "上涨10%再下降10%的分母不同，不能直接抵消。",
        "下降10%只描述第三期相对第二期，没有连接第一段上涨。"
      ],
      "explanation": "把第一期单价设为100，第二期110，第三期99，因此相对第一期下降1%。",
      "trainingStage": "识别概念",
      "trainingGoal": "连接连续两段各以上期为100的指数",
      "graphic": null,
      "meta": {
        "module": "资料分析",
        "type": "指数与统计口径",
        "trainingStage": "识别概念",
        "trainingGoal": "连接连续两段各以上期为100的指数",
        "knowledgeIds": [
          "fq-index-caliber"
        ],
        "tags": [
          "同基指数",
          "环比连接",
          "固定权重",
          "不可直接相加"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-index-caliber-04",
      "lesson": "fq-index-caliber",
      "stem": "某虚构指数由甲、乙两类组成，定义为两类单项指数按各自基期金额加权的平均值。基期金额甲为300元、乙为100元；两类同基单项指数分别为110和130。综合指数为：",
      "options": [
        "240",
        "120",
        "125",
        "115"
      ],
      "answer": 3,
      "optionReviews": [
        "240是两个指数相加，指数不能按本题定义直接加总。",
        "120是两个指数的简单平均，错误地假定权重相等。",
        "125相当于把甲乙权重颠倒，未按给定基期金额合成。",
        "综合指数=(300×110+100×130)÷400=115；甲的权重为3/4、乙为1/4。"
      ],
      "explanation": "综合指数=(300×110+100×130)÷400=115；甲的权重为3/4、乙为1/4。",
      "trainingStage": "迁移运用",
      "trainingGoal": "依据给定基期金额权重合成指数",
      "graphic": null,
      "meta": {
        "module": "资料分析",
        "type": "指数与统计口径",
        "trainingStage": "迁移运用",
        "trainingGoal": "依据给定基期金额权重合成指数",
        "knowledgeIds": [
          "fq-index-caliber"
        ],
        "tags": [
          "同基指数",
          "环比连接",
          "固定权重",
          "不可直接相加"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-index-caliber-05",
      "lesson": "fq-index-caliber",
      "stem": "某虚构固定篮子价格指数定义为“按基期数量购买两种商品的现期总费用÷基期总费用×100”。甲商品基期20件、单价10元，现期单价12元；乙商品基期10件、单价20元，现期单价18元。现期实际购买甲100件、乙1件。按上述定义，指数为：",
      "options": [
        "100",
        "304.5",
        "110",
        "105"
      ],
      "answer": 3,
      "optionReviews": [
        "虽然甲单价上涨20%、乙下降10%，但给定基期金额相等，加权后不是不变。",
        "304.5来自现期实际支出(100×12+1×18)÷400×100，夹杂购买数量改变，不符合固定篮子定义。",
        "把甲涨20%与乙降10%直接相加再加100会得到110，但两项基期金额权重各为1/2，应得100+10−5=105。",
        "固定篮子基期费用20×10+10×20=400，现期费用20×12+10×18=420，指数为105。"
      ],
      "explanation": "固定篮子基期费用20×10+10×20=400，现期费用20×12+10×18=420，指数为105。",
      "trainingStage": "迁移运用",
      "trainingGoal": "按指定固定数量核算指数并排除无关现期数量",
      "graphic": null,
      "meta": {
        "module": "资料分析",
        "type": "指数与统计口径",
        "trainingStage": "迁移运用",
        "trainingGoal": "按指定固定数量核算指数并排除无关现期数量",
        "knowledgeIds": [
          "fq-index-caliber"
        ],
        "tags": [
          "同基指数",
          "环比连接",
          "固定权重",
          "不可直接相加"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-index-caliber-06",
      "lesson": "fq-index-caliber",
      "stem": "某虚构单一同质商品的销售金额指数、单价指数、销量指数均以同一基期为100，且题设保证“金额指数=单价指数×销量指数÷100”。现期金额指数132、单价指数110，销量比基期增长多少？",
      "options": [
        "20%",
        "10%",
        "22%",
        "32%"
      ],
      "answer": 0,
      "optionReviews": [
        "销量指数=132÷110×100=120，因此销量增长20%；例如基期价10量10，现期价11量12即可回代。",
        "10%是单价涨幅，不是销量涨幅。",
        "132−110=22是指数点差，不能代替除去价格倍数的计算。",
        "32%是金额涨幅，其中还包含价格变化，不能全算成销量变化。"
      ],
      "explanation": "销量指数=132÷110×100=120，因此销量增长20%；例如基期价10量10，现期价11量12即可回代。",
      "trainingStage": "迁移运用",
      "trainingGoal": "由题设合成关系剔除价格变化",
      "graphic": null,
      "meta": {
        "module": "资料分析",
        "type": "指数与统计口径",
        "trainingStage": "迁移运用",
        "trainingGoal": "由题设合成关系剔除价格变化",
        "knowledgeIds": [
          "fq-index-caliber"
        ],
        "tags": [
          "同基指数",
          "环比连接",
          "固定权重",
          "不可直接相加"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-index-caliber-07",
      "lesson": "fq-index-caliber",
      "stem": "某虚构综合指数明确为两个同基单项指数的加权算术平均，权重均为正且和为1。两个单项指数分别为105和115，未给具体权重。必然正确的是：",
      "options": [
        "综合指数恰好为110",
        "综合指数严格大于105且严格小于115",
        "综合指数为220",
        "综合指数可能等于105"
      ],
      "answer": 1,
      "optionReviews": [
        "只有权重相等时才得到110；权重1/4和3/4时得到112.5。",
        "两个不同数以正权重平均，结果严格位于两者之间；没有具体权重不能唯一确定。",
        "220是直接相加，未按权重和为1的平均定义计算。",
        "要等于105，115的权重必须为0，但题设要求两个权重均为正。"
      ],
      "explanation": "两个不同数以正权重平均，结果严格位于两者之间；没有具体权重不能唯一确定。",
      "trainingStage": "检查边界",
      "trainingGoal": "在未知权重时保留可确定的范围",
      "graphic": null,
      "meta": {
        "module": "资料分析",
        "type": "指数与统计口径",
        "trainingStage": "检查边界",
        "trainingGoal": "在未知权重时保留可确定的范围",
        "knowledgeIds": [
          "fq-index-caliber"
        ],
        "tags": [
          "同基指数",
          "环比连接",
          "固定权重",
          "不可直接相加"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-index-caliber-08",
      "lesson": "fq-index-caliber",
      "stem": "甲、乙是两种商品。甲的现期单价指数为130，以甲自己的某基期单价为100；乙的现期单价指数为110，以乙自己的某基期单价为100。两种商品的基期单价和基期时间均未给出。可以确定的是：",
      "options": [
        "甲现期单价高于乙",
        "甲现期单价比乙高约18.18%",
        "甲在任一相同时间段内的单价涨幅都高于乙",
        "甲较自身所用基期上涨30%，乙较自身所用基期上涨10%"
      ],
      "answer": 3,
      "optionReviews": [
        "指数只给各自倍数；若甲基期1元、乙基期100元，现期分别1.3元和110元，甲仍更低。",
        "130÷110不能消去不同商品、不同基期的基准价格，不能据此比较现期单价差。",
        "基期时间未给，不能把各自涨幅推广为任一共同时间段的比较。",
        "根据各自指数定义，只能分别确定相对各自所用基期的涨幅为30%与10%。"
      ],
      "explanation": "根据各自指数定义，只能分别确定相对各自所用基期的涨幅为30%与10%。",
      "trainingStage": "检查边界",
      "trainingGoal": "不同基准的指数不能直接比较价格水平",
      "graphic": null,
      "meta": {
        "module": "资料分析",
        "type": "指数与统计口径",
        "trainingStage": "检查边界",
        "trainingGoal": "不同基准的指数不能直接比较价格水平",
        "knowledgeIds": [
          "fq-index-caliber"
        ],
        "tags": [
          "同基指数",
          "环比连接",
          "固定权重",
          "不可直接相加"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-index-caliber-09",
      "lesson": "fq-index-caliber",
      "stem": "某虚构综合指数等于甲、乙两个同基单项指数各以1/2权重加权的平均值。基期两项均为100，现期分别为105和95。以下说法正确的是：",
      "options": [
        "综合指数为200",
        "综合指数为100，因此两项都没有变化",
        "综合指数为100，但两个分项都发生了变化",
        "现期两个单项指数必须先相乘才能得到综合指数"
      ],
      "answer": 2,
      "optionReviews": [
        "105+95=200没有乘权重，不符合给定合成定义。",
        "综合值不变不意味着每项不变；题干直接给出105和95而非100和100。",
        "0.5×105+0.5×95=100；甲比自身基期高5%，乙低5%，分项变化相互抵消。",
        "题设指定加权算术平均，不是连续两段变化，不能擅自改为相乘。"
      ],
      "explanation": "0.5×105+0.5×95=100；甲比自身基期高5%，乙低5%，分项变化相互抵消。",
      "trainingStage": "检查边界",
      "trainingGoal": "综合指数不变不等于各分项不变",
      "graphic": null,
      "meta": {
        "module": "资料分析",
        "type": "指数与统计口径",
        "trainingStage": "检查边界",
        "trainingGoal": "综合指数不变不等于各分项不变",
        "knowledgeIds": [
          "fq-index-caliber"
        ],
        "tags": [
          "同基指数",
          "环比连接",
          "固定权重",
          "不可直接相加"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-multi-paragraph-01",
      "lesson": "fq-multi-paragraph",
      "stem": "虚构材料一：检索旧工艺记录（原创虚构材料）\n\n①一座工艺资料馆把旧手册扫描成图片后，发现到馆者虽然能在线翻页，却仍难以找到某位师傅在特定时期使用过的工序。同一工序可能有俗称、旧称和后来统一的名称，只有图片编号的目录无法回应这些检索需求。工作人员据此提出，数字化的成果不能只用扫描页数衡量，还应考察读者能否找到所需证据。\n\n②新一轮整理为记录添加人物、时间和工序标签。遇到不同称谓，整理者先比较原件的上下文，再决定是否建立关联；不能确认的则保留“待核”标记，并提供原件位置，而不是强行归并。标签提供进入材料的路径，原件和疑点记录则让后来的读者知道这些关联是怎样形成的。\n\n③一次小规模试用中，使用标签目录的一组志愿者在多数检索任务上用时较少，但在涉及争议称谓的任务上未见明显优势。两组志愿者没有按相关经验匹配，也没有随机分组。资料馆因此只把结果视为改进线索，计划补充不同经验读者的测试，再调整标签，而不据此宣布新目录已经普遍优于旧目录。\n\n【问题】阅读“检索旧工艺记录”。最符合全文主要意思的是：",
      "options": [
        "扫描规模决定检索服务的整体质量，扩大扫描量应先于标签整理",
        "新目录的主要价值在于统一称谓，使读者不再需要查看原件",
        "数字化应回应检索需要，同时保留关联依据并审慎评价效果",
        "试用应先匹配读者经验，再据此解决不同工序命名争议"
      ],
      "answer": 2,
      "optionReviews": [
        "第①段说明只有扫描图片仍难满足具体检索需要，全文不支持扫描规模决定服务质量，也未规定先扩量再整理标签。",
        "第②段保留未决称谓和原件位置，标签提供检索路径，不是统一全部称谓后取代原件。",
        "第①段提出检索需要，第②段说明标签与证据保留，第③段限制效果结论，三段共同支持此概括。",
        "第③段匹配经验是改进试用设计的方向，不能由此解决工序命名争议，也不足以概括前两段的整理原则。"
      ],
      "explanation": "第①段提出检索需要，第②段说明标签与证据保留，第③段限制效果结论，三段共同支持此概括。",
      "trainingStage": "识别概念",
      "trainingGoal": "结合开头问题、中段方法和结尾限制概括中心",
      "graphic": null,
      "meta": {
        "module": "言语理解",
        "type": "多段阅读",
        "trainingStage": "识别概念",
        "trainingGoal": "结合开头问题、中段方法和结尾限制概括中心",
        "knowledgeIds": [
          "fq-multi-paragraph"
        ],
        "tags": [
          "段落关系",
          "跨段证据",
          "指代",
          "结论边界"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-multi-paragraph-02",
      "lesson": "fq-multi-paragraph",
      "stem": "虚构材料一：检索旧工艺记录（原创虚构材料）\n\n①一座工艺资料馆把旧手册扫描成图片后，发现到馆者虽然能在线翻页，却仍难以找到某位师傅在特定时期使用过的工序。同一工序可能有俗称、旧称和后来统一的名称，只有图片编号的目录无法回应这些检索需求。工作人员据此提出，数字化的成果不能只用扫描页数衡量，还应考察读者能否找到所需证据。\n\n②新一轮整理为记录添加人物、时间和工序标签。遇到不同称谓，整理者先比较原件的上下文，再决定是否建立关联；不能确认的则保留“待核”标记，并提供原件位置，而不是强行归并。标签提供进入材料的路径，原件和疑点记录则让后来的读者知道这些关联是怎样形成的。\n\n③一次小规模试用中，使用标签目录的一组志愿者在多数检索任务上用时较少，但在涉及争议称谓的任务上未见明显优势。两组志愿者没有按相关经验匹配，也没有随机分组。资料馆因此只把结果视为改进线索，计划补充不同经验读者的测试，再调整标签，而不据此宣布新目录已经普遍优于旧目录。\n\n【问题】阅读“检索旧工艺记录”。第②段既建立称谓关联，又保留“待核”标记和原件位置，最直接回应了哪两方面需要？",
      "options": [
        "便利材料检索，同时保留可追溯的关联依据和疑点",
        "补足旧手册中原件的缺损，同时让关联结果得到志愿者确认",
        "减少人工核验，使不同工艺的旧称可以按统一规则归并",
        "修正试用分组，使不同经验读者的检索用时可以直接比较"
      ],
      "answer": 0,
      "optionReviews": [
        "第①段的不同称谓阻碍检索由关联标签回应；第②段的原件位置和疑点记录保留判断依据及未决部分。",
        "第②段没有修复原件缺损或由志愿者确认关联的内容；原件位置用于追溯，志愿者参加的是第③段的检索试用。",
        "整理者仍需比较原件上下文，无法确认的称谓保留待核，不是减少核验后按统一规则归并。",
        "保留关联记录不能改变试用的分组方式；第③段仍指出未匹配经验、未随机分组的限制。"
      ],
      "explanation": "第①段的不同称谓阻碍检索由关联标签回应；第②段的原件位置和疑点记录保留判断依据及未决部分。",
      "trainingStage": "迁移运用",
      "trainingGoal": "由分散在两段的措施解释作用",
      "graphic": null,
      "meta": {
        "module": "言语理解",
        "type": "多段阅读",
        "trainingStage": "迁移运用",
        "trainingGoal": "由分散在两段的措施解释作用",
        "knowledgeIds": [
          "fq-multi-paragraph"
        ],
        "tags": [
          "段落关系",
          "跨段证据",
          "指代",
          "结论边界"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-multi-paragraph-03",
      "lesson": "fq-multi-paragraph",
      "stem": "虚构材料一：检索旧工艺记录（原创虚构材料）\n\n①一座工艺资料馆把旧手册扫描成图片后，发现到馆者虽然能在线翻页，却仍难以找到某位师傅在特定时期使用过的工序。同一工序可能有俗称、旧称和后来统一的名称，只有图片编号的目录无法回应这些检索需求。工作人员据此提出，数字化的成果不能只用扫描页数衡量，还应考察读者能否找到所需证据。\n\n②新一轮整理为记录添加人物、时间和工序标签。遇到不同称谓，整理者先比较原件的上下文，再决定是否建立关联；不能确认的则保留“待核”标记，并提供原件位置，而不是强行归并。标签提供进入材料的路径，原件和疑点记录则让后来的读者知道这些关联是怎样形成的。\n\n③一次小规模试用中，使用标签目录的一组志愿者在多数检索任务上用时较少，但在涉及争议称谓的任务上未见明显优势。两组志愿者没有按相关经验匹配，也没有随机分组。资料馆因此只把结果视为改进线索，计划补充不同经验读者的测试，再调整标签，而不据此宣布新目录已经普遍优于旧目录。\n\n【问题】阅读“检索旧工艺记录”。关于第③段的试用，可以从材料推出的是：",
      "options": [
        "多数任务用时较少，表明争议称谓的检索障碍也得到解决",
        "小规模试用已显示普遍优势，后续测试只需调整标签形式",
        "两组未按经验匹配，因此用时差异只能由经验差异造成",
        "部分任务上的表现值得继续检验，但目前不足以作普遍优劣结论"
      ],
      "answer": 3,
      "optionReviews": [
        "第③段虽报告多数任务用时较少，却明确争议称谓任务未见明显优势，不能据此认定该类检索障碍已经解决。",
        "第③段明确不宣布普遍优于旧目录，并计划补充不同经验读者的测试，不只是调整标签形式。",
        "未匹配经验意味着尚未排除其影响，不等于证实它是用时差异的唯一原因。",
        "多数任务用时较少提供改进线索，未随机分组、未匹配经验及争议任务结果又限制了推广结论。"
      ],
      "explanation": "多数任务用时较少提供改进线索，未随机分组、未匹配经验及争议任务结果又限制了推广结论。",
      "trainingStage": "检查边界",
      "trainingGoal": "区分试用现象和可推广的效果结论",
      "graphic": null,
      "meta": {
        "module": "言语理解",
        "type": "多段阅读",
        "trainingStage": "检查边界",
        "trainingGoal": "区分试用现象和可推广的效果结论",
        "knowledgeIds": [
          "fq-multi-paragraph"
        ],
        "tags": [
          "段落关系",
          "跨段证据",
          "指代",
          "结论边界"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-multi-paragraph-04",
      "lesson": "fq-multi-paragraph",
      "stem": "虚构材料二：把绿荫连成路（原创虚构材料）\n\n①某城步行环境方案最初把“新增绿地面积”作为主要考察指标。走访却发现，一条步行线路两端都有树木，中间通往公交站的数百米路段仍缺少遮阴。对要完整走过这条路的人而言，两端各有一片绿地，并不等于一路都能在树荫下行走。于是，方案把遮阴是否沿实际步行线路连续分布，也纳入考察。\n\n②评估小组把路线画在同一张图上，标出已有树荫、无遮阴路段和行人经常停留的位置。针对这种缺口，他们准备优先比较几处中断路段的补种方案，而不是仅按新增面积大小排序。报告同时注明，现有走访在冬季完成，不能直接当作夏季遮阴范围和行人感受的结论。\n\n③后续评估计划在夏季记录不同时段的遮阴情况，并让实际使用这些路线的人描述体验。面积仍是一项记录指标，但不再单独承担“步行环境是否改善”的判断。新增绿地有多少、布局能否接上常用路线、不同时间是否有作用，需要放在一起考察。\n\n【问题】阅读“把绿荫连成路”。三段内容的展开关系最恰当的是：",
      "options": [
        "介绍城市绿化—比较补种方案—确认步行体验改善",
        "提出线路问题—完成夏季验证—推荐现有方案推广",
        "发现指标遗漏—设计路线评估—安排后续综合考察",
        "反思面积指标—取消原有面积记录—改用单一布局指标"
      ],
      "answer": 2,
      "optionReviews": [
        "第①段提出面积指标的遗漏，第③段仍是后续评估计划；全文没有确认步行体验已经改善。",
        "第②段明确冬季走访不能直接给出夏季结论，第③段才计划夏季记录，未完成夏季验证或推荐推广。",
        "第①段指出面积不足以反映线路遮阴，第②段给路线标注与冬季局限，第③段安排夏季和多指标评估。",
        "第③段明确面积仍是一项记录指标，要求与布局、时段综合考察，并非取消面积后改用单一指标。"
      ],
      "explanation": "第①段指出面积不足以反映线路遮阴，第②段给路线标注与冬季局限，第③段安排夏季和多指标评估。",
      "trainingStage": "识别概念",
      "trainingGoal": "识别三段从问题到方法再到验证的结构",
      "graphic": null,
      "meta": {
        "module": "言语理解",
        "type": "多段阅读",
        "trainingStage": "识别概念",
        "trainingGoal": "识别三段从问题到方法再到验证的结构",
        "knowledgeIds": [
          "fq-multi-paragraph"
        ],
        "tags": [
          "段落关系",
          "跨段证据",
          "指代",
          "结论边界"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-multi-paragraph-05",
      "lesson": "fq-multi-paragraph",
      "stem": "虚构材料二：把绿荫连成路（原创虚构材料）\n\n①某城步行环境方案最初把“新增绿地面积”作为主要考察指标。走访却发现，一条步行线路两端都有树木，中间通往公交站的数百米路段仍缺少遮阴。对要完整走过这条路的人而言，两端各有一片绿地，并不等于一路都能在树荫下行走。于是，方案把遮阴是否沿实际步行线路连续分布，也纳入考察。\n\n②评估小组把路线画在同一张图上，标出已有树荫、无遮阴路段和行人经常停留的位置。针对这种缺口，他们准备优先比较几处中断路段的补种方案，而不是仅按新增面积大小排序。报告同时注明，现有走访在冬季完成，不能直接当作夏季遮阴范围和行人感受的结论。\n\n③后续评估计划在夏季记录不同时段的遮阴情况，并让实际使用这些路线的人描述体验。面积仍是一项记录指标，但不再单独承担“步行环境是否改善”的判断。新增绿地有多少、布局能否接上常用路线、不同时间是否有作用，需要放在一起考察。\n\n【问题】阅读“把绿荫连成路”。第②段“针对这种缺口”中的“缺口”，主要指：",
      "options": [
        "全城绿地总面积与法定最低要求之间的差距",
        "常用步行线路中连接两端绿地的无遮阴路段",
        "评估地图没有记录行人停留位置留下的空白",
        "公交站没有公布沿线各片绿地名称造成的信息不足"
      ],
      "answer": 1,
      "optionReviews": [
        "全文没有提供法定绿地面积要求，也未判断全城与该要求的差距。",
        "前段描述两端有树、中间数百米缺遮阴；后句又提出比较中断路段补种，前后共同锁定这一指代。",
        "第②段明确已在地图上标出行人经常停留的位置，缺口不是这类位置记录缺失。",
        "材料没有沿线绿地名称未公布的信息；前后文谈的是路段遮阴中断，不是名称信息不足。"
      ],
      "explanation": "前段描述两端有树、中间数百米缺遮阴；后句又提出比较中断路段补种，前后共同锁定这一指代。",
      "trainingStage": "迁移运用",
      "trainingGoal": "结合前后文确定指代所承接的具体问题",
      "graphic": null,
      "meta": {
        "module": "言语理解",
        "type": "多段阅读",
        "trainingStage": "迁移运用",
        "trainingGoal": "结合前后文确定指代所承接的具体问题",
        "knowledgeIds": [
          "fq-multi-paragraph"
        ],
        "tags": [
          "段落关系",
          "跨段证据",
          "指代",
          "结论边界"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-multi-paragraph-06",
      "lesson": "fq-multi-paragraph",
      "stem": "虚构材料二：把绿荫连成路（原创虚构材料）\n\n①某城步行环境方案最初把“新增绿地面积”作为主要考察指标。走访却发现，一条步行线路两端都有树木，中间通往公交站的数百米路段仍缺少遮阴。对要完整走过这条路的人而言，两端各有一片绿地，并不等于一路都能在树荫下行走。于是，方案把遮阴是否沿实际步行线路连续分布，也纳入考察。\n\n②评估小组把路线画在同一张图上，标出已有树荫、无遮阴路段和行人经常停留的位置。针对这种缺口，他们准备优先比较几处中断路段的补种方案，而不是仅按新增面积大小排序。报告同时注明，现有走访在冬季完成，不能直接当作夏季遮阴范围和行人感受的结论。\n\n③后续评估计划在夏季记录不同时段的遮阴情况，并让实际使用这些路线的人描述体验。面积仍是一项记录指标，但不再单独承担“步行环境是否改善”的判断。新增绿地有多少、布局能否接上常用路线、不同时间是否有作用，需要放在一起考察。\n\n【问题】阅读“把绿荫连成路”。以下标题最适合全文的是：",
      "options": [
        "新增面积决定步行环境",
        "以连续的绿荫取代面积记录",
        "冬季走访揭示夏季遮阴",
        "让新增绿荫接上行人的路"
      ],
      "answer": 3,
      "optionReviews": [
        "第①段指出面积无法反映路线遮阴是否连续，第③段要求综合考察，不支持新增面积决定步行环境。",
        "第③段仍保留面积指标，连续性是补充考察内容，不是取代面积记录。",
        "第②段明确冬季走访不能直接当作夏季遮阴和感受的结论，第③段尚待夏季记录。",
        "既呼应路线遮阴连续性，也保留增绿布局须服务实际步行的中心，没有把待验证计划说成已证实效果。"
      ],
      "explanation": "既呼应路线遮阴连续性，也保留增绿布局须服务实际步行的中心，没有把待验证计划说成已证实效果。",
      "trainingStage": "检查边界",
      "trainingGoal": "选择能保留全文中心和证据边界的标题",
      "graphic": null,
      "meta": {
        "module": "言语理解",
        "type": "多段阅读",
        "trainingStage": "检查边界",
        "trainingGoal": "选择能保留全文中心和证据边界的标题",
        "knowledgeIds": [
          "fq-multi-paragraph"
        ],
        "tags": [
          "段落关系",
          "跨段证据",
          "指代",
          "结论边界"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-multi-paragraph-07",
      "lesson": "fq-multi-paragraph",
      "stem": "虚构材料三：共享工具怎样可用（原创虚构材料）\n\n①一个共享工具站的账面工具数量逐年增加，借用者却仍反映周末常借不到合适的工具。逐项核对后发现，少数型号频繁借出，另一些长期闲置；部分热门工具归还后还需检查，不能立刻再次出借。因此，“库存总件数”和“当天实际可借件数”不是同一个数，汇总数据也未必能呈现型号之间的差异。\n\n②试行方案把热门工具的一部分纳入预约，另一部分仍留给现场借用者；归还记录同时注明是否已经完成检查，不把“已归还”直接视为“可再次借出”。在试行期内，工作人员仍记录未被满足的具体借用需求，再据此判断是否要改变型号配置。\n\n③方案没有预先规定必须多采购，也没有把取消现场借用当作提高效率的前提。报告提出，应分别考察预约者、现场借用者及维护人员的情况；若预约率上升却使现场需求更难满足，或者压缩了必要检查时间，就不能仅凭预约率宣布方案成功。\n\n【问题】阅读“共享工具怎样可用”。第①段区分“库存总件数”和“当天实际可借件数”，主要是为了说明：",
      "options": [
        "库存增长使管理负担增加，进而造成周末借用困难",
        "应查看型号和可用状态，不能只以库存总量判断供需情况",
        "工具一经归还即可再次出借，借用缺件主要源于库存统计滞后",
        "减少长期闲置工具，就能消除热门型号的周末借用短缺"
      ],
      "answer": 1,
      "optionReviews": [
        "第①段未提管理负担增加，也未建立库存增长导致借用困难的因果关系；它实际指出型号差异和归还待检问题。",
        "热门与闲置型号并存，以及归还待检的状态，共同说明总量不能替代具体供需和可用性判断。",
        "第①段明确归还后可能仍需检查，不能立即出借；材料也没有把借用缺件主要归因于统计滞后。",
        "减少闲置型号不能直接推出热门型号短缺消失，材料要求核对具体需求与可用状态，未给出这种保证。"
      ],
      "explanation": "热门与闲置型号并存，以及归还待检的状态，共同说明总量不能替代具体供需和可用性判断。",
      "trainingStage": "识别概念",
      "trainingGoal": "区分总量指标与可供使用指标",
      "graphic": null,
      "meta": {
        "module": "言语理解",
        "type": "多段阅读",
        "trainingStage": "识别概念",
        "trainingGoal": "区分总量指标与可供使用指标",
        "knowledgeIds": [
          "fq-multi-paragraph"
        ],
        "tags": [
          "段落关系",
          "跨段证据",
          "指代",
          "结论边界"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-multi-paragraph-08",
      "lesson": "fq-multi-paragraph",
      "stem": "虚构材料三：共享工具怎样可用（原创虚构材料）\n\n①一个共享工具站的账面工具数量逐年增加，借用者却仍反映周末常借不到合适的工具。逐项核对后发现，少数型号频繁借出，另一些长期闲置；部分热门工具归还后还需检查，不能立刻再次出借。因此，“库存总件数”和“当天实际可借件数”不是同一个数，汇总数据也未必能呈现型号之间的差异。\n\n②试行方案把热门工具的一部分纳入预约，另一部分仍留给现场借用者；归还记录同时注明是否已经完成检查，不把“已归还”直接视为“可再次借出”。在试行期内，工作人员仍记录未被满足的具体借用需求，再据此判断是否要改变型号配置。\n\n③方案没有预先规定必须多采购，也没有把取消现场借用当作提高效率的前提。报告提出，应分别考察预约者、现场借用者及维护人员的情况；若预约率上升却使现场需求更难满足，或者压缩了必要检查时间，就不能仅凭预约率宣布方案成功。\n\n【问题】阅读“共享工具怎样可用”。下列哪项最符合试行方案及其评价思路？",
      "options": [
        "预约与现场借用并行，评价兼顾借用者和维护人员",
        "以预约替代现场借用，再用预约率检验型号配置",
        "工具归还即计为可借，以提高周末工具周转率",
        "试行前确定采购规模，再用未满足需求调整型号"
      ],
      "answer": 0,
      "optionReviews": [
        "第②段明确两种借用途径并行；第③段要求关注预约者、现场借用者和维护人员，前后对应。",
        "第②段保留现场借用份额，第③段也要求考察不同群体，既非预约替代现场，也非仅凭预约率判断。",
        "第②段要求注明检查是否完成，不把已归还直接视为可再次借出，周转目标不能取消该条件。",
        "第②段先记录未满足需求，再判断是否改变型号配置；第③段未预先规定必须多采购，不支持先确定采购规模。"
      ],
      "explanation": "第②段明确两种借用途径并行；第③段要求关注预约者、现场借用者和维护人员，前后对应。",
      "trainingStage": "迁移运用",
      "trainingGoal": "跨段核对措施与评价对象是否对应",
      "graphic": null,
      "meta": {
        "module": "言语理解",
        "type": "多段阅读",
        "trainingStage": "迁移运用",
        "trainingGoal": "跨段核对措施与评价对象是否对应",
        "knowledgeIds": [
          "fq-multi-paragraph"
        ],
        "tags": [
          "段落关系",
          "跨段证据",
          "指代",
          "结论边界"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "fq-multi-paragraph-09",
      "lesson": "fq-multi-paragraph",
      "stem": "虚构材料三：共享工具怎样可用（原创虚构材料）\n\n①一个共享工具站的账面工具数量逐年增加，借用者却仍反映周末常借不到合适的工具。逐项核对后发现，少数型号频繁借出，另一些长期闲置；部分热门工具归还后还需检查，不能立刻再次出借。因此，“库存总件数”和“当天实际可借件数”不是同一个数，汇总数据也未必能呈现型号之间的差异。\n\n②试行方案把热门工具的一部分纳入预约，另一部分仍留给现场借用者；归还记录同时注明是否已经完成检查，不把“已归还”直接视为“可再次借出”。在试行期内，工作人员仍记录未被满足的具体借用需求，再据此判断是否要改变型号配置。\n\n③方案没有预先规定必须多采购，也没有把取消现场借用当作提高效率的前提。报告提出，应分别考察预约者、现场借用者及维护人员的情况；若预约率上升却使现场需求更难满足，或者压缩了必要检查时间，就不能仅凭预约率宣布方案成功。\n\n【问题】阅读“共享工具怎样可用”。若补充记录显示试行期预约率上升，仅结合全文，最稳妥的判断是：",
      "options": [
        "预约率上升表明试行取得整体成效，可以减少其他需求记录",
        "预约率上升说明检查时间被压缩，应把维护不足视为主因",
        "仍需核对现场需求和检查情况，预约率本身不足以判定整体成功",
        "预约率与现场借用需求同步改善，说明两种方式已经兼顾"
      ],
      "answer": 2,
      "optionReviews": [
        "第③段明确不能仅凭预约率宣布整体成功，仍须核对其他需求与维护情况，不能据此减少相关记录。",
        "压缩检查时间只是材料提醒警惕的情形，补充信息没有证明它发生，更没有证明它是预约率上升的主因。",
        "评价标准包含不同借用方式和维护条件，单一预约率信息不能覆盖这些条件。",
        "补充记录只给出预约率上升，不能推出现场需求同步改善；第③段还指出二者可能发生冲突。"
      ],
      "explanation": "评价标准包含不同借用方式和维护条件，单一预约率信息不能覆盖这些条件。",
      "trainingStage": "检查边界",
      "trainingGoal": "判断补充信息能否支持成功结论",
      "graphic": null,
      "meta": {
        "module": "言语理解",
        "type": "多段阅读",
        "trainingStage": "检查边界",
        "trainingGoal": "判断补充信息能否支持成功结论",
        "knowledgeIds": [
          "fq-multi-paragraph"
        ],
        "tags": [
          "段落关系",
          "跨段证据",
          "指代",
          "结论边界"
        ],
        "applicableExams": [
          "national",
          "fujian"
        ],
        "examSource": {
          "system": null,
          "year": null,
          "paper": null,
          "number": null
        },
        "difficulty": {
          "level": null,
          "basis": null
        },
        "purpose": "原创专项训练；训练目标不是经样本标定的难度",
        "source": {
          "kind": "original",
          "title": "并行新增原创练习",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析和虚构材料独立编写；未引用或改写商业真题。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "数学题另用方程回代、有限枚举或精确分数复核；阅读题逐项核对材料证据。非第三方审定。"
        },
        "methodIds": []
      }
    }
  ]
};
  const ids = new Set(C.questions.map(q => q.id));
  const lessons = new Set(C.lessons.map(l => l.id));
  if (data.questions.some(q => ids.has(q.id)) || data.lessons.some(l => lessons.has(l.id))) throw new Error("Candidate IDs already exist; refusing duplicate import");
  for (const lesson of data.lessons) {
    for (const [level, guide] of Object.entries(lesson.learningLevels)) lesson.learningLevels[level] = { ...(C.learningPaths?.[level] || {}), ...guide };
    C.lessons.push(lesson);
  }
  C.questions.push(...data.questions);
})();
