"use strict";
// Editorial-reviewed candidate-only loader; parent must explicitly integrate. No network/storage.
// Load after curriculum-v037.js and policy-v037.js, before coverage-map.js.
(() => {
  const B = {
  "packageVersion": 1,
  "batchId": "diagnostic-transfer-original-20261105-v037",
  "date": "2026-11-05",
  "status": "editorial-reviewed-candidate-not-integrated-not-published",
  "baseline": {
    "version": "0.37.0",
    "commit": "38d99cbf1b9b404bfa2224625b5e38950910b565",
    "questionCount": 717,
    "lessonCount": 105
  },
  "summary": "24道原创单选题，8个现有知识点各3题，24份不同完整材料/条件；识别、迁移、边界各8题。",
  "limits": [
    "不是历年真题、预测题或官方考纲覆盖证明；所有难度保持未知。",
    "24个材料/条件组是编辑分组，不保证统计独立；与旧题同概念练习也不等于能力测量独立样本。",
    "本批已在作者自查后另行逐题计算、逻辑、语义与接线编辑复核；不是盲审、专家认证、考生试测或难度标定。",
    "旧课已有2–3组，本批各加3组；仅使8课题库可用组数达到5或6，不代表用户已有足够作答日或掌握证据。",
    "无实际用户作答记录，选择依据为站内候选组覆盖缺口，不推断用户具体薄弱知识。",
    "空间题为文字和坐标模型，不包含视觉图形识别，不替代图示空间训练。",
    "本文件为经编辑复核的候选，未据此修改主站、安装、发布或付费；未做线上、浏览器或手机验收。"
  ],
  "lessons": [],
  "questions": [
    {
      "id": "d37-transfer-01",
      "lesson": "multi-table",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n某配送中心甲、乙两条线路本月承运的包裹互不重叠，且每个包裹至多退回一次。表一统计承运量，表二的退件率均以该线路本月承运量为分母，各数为精确值。\n表一：甲线路承运量为0.24万件，乙线路为1600件。\n表二：甲线路退件率为2.5%，乙线路为5.0%。\n【问题】两条线路本月合计退回多少件包裹？",
      "options": [
        "140件",
        "86件",
        "150件",
        "200件"
      ],
      "answer": 0,
      "explanation": "甲退回2400×2.5%=60件，乙退回1600×5%=80件，合计140件。不同线路的率要分别乘各自承运量，不能先简单平均。",
      "optionReviews": [
        "甲退回2400×2.5%=60件，乙退回1600×5%=80件，合计140件。不同线路的率要分别乘各自承运量，不能先简单平均。",
        "86件是把0.24万件误作240件，再算240×2.5%+1600×5%得到的；0.24万件实际为2400件，须先统一单位。",
        "150件等于把两线路退件率简单平均为3.75%，再乘4000件；两线路承运量不相等，不能等权平均。",
        "200件等于把全部4000件都按乙线路的5%计算，忽略甲线路退件率仅为2.5%。"
      ],
      "trainingStage": "识别概念",
      "trainingGoal": "跨表对齐对象、分母和万件单位",
      "graphic": null,
      "materialGroup": "d37-transfer-01-condition",
      "materialIds": [
        "d37-transfer-01-material"
      ],
      "meta": {
        "module": "资料分析",
        "type": "多表联读",
        "trainingStage": "识别概念",
        "trainingGoal": "跨表对齐对象、分母和万件单位",
        "knowledgeIds": [
          "multi-table",
          "multi-table/aligned-denominators"
        ],
        "tags": [
          "多表联读",
          "包裹量与退件率"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "d37-transfer-02",
      "lesson": "multi-table",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n甲、乙两处咨询点本月的业务均只在所列开放时段办理，每笔业务只计一次。每天所有窗口都全程开放，各数为精确值。\n表一（本月业务）：甲点900笔，乙点1200笔。\n表二（开放配置）：甲点开放5天、每天3个窗口；乙点开放8天、每天2个窗口。\n本题将“每窗口日平均业务量”定义为业务总笔数÷（开放天数×每天窗口数）。\n【问题】乙点每窗口日平均业务量比甲点高多少？",
      "options": [
        "20%",
        "25%",
        "约33.3%",
        "50%"
      ],
      "answer": 1,
      "explanation": "甲为900÷(5×3)=60笔/窗口日，乙为1200÷(8×2)=75笔/窗口日；乙比甲高(75−60)÷60=25%。",
      "optionReviews": [
        "20%使用了乙点75作为差额15的分母，算的是甲比乙低多少，不是乙比甲高多少。",
        "甲为900÷(5×3)=60笔/窗口日，乙为1200÷(8×2)=75笔/窗口日；乙比甲高(75−60)÷60=25%。",
        "约33.3%是业务总量1200相对900的增幅，忽略窗口数与开放天数，指标不一致。",
        "50%不能由所给定义得到。比较时必须同时除以天数和窗口数，不能只选表二的一个因素。"
      ],
      "trainingStage": "迁移运用",
      "trainingGoal": "联读两表，以窗口日为明确分母比较相对量",
      "graphic": null,
      "materialGroup": "d37-transfer-02-condition",
      "materialIds": [
        "d37-transfer-02-material"
      ],
      "meta": {
        "module": "资料分析",
        "type": "多表联读",
        "trainingStage": "迁移运用",
        "trainingGoal": "联读两表，以窗口日为明确分母比较相对量",
        "knowledgeIds": [
          "multi-table",
          "multi-table/window-day-product"
        ],
        "tags": [
          "多表联读",
          "窗口开放与业务办理"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "d37-transfer-03",
      "lesson": "multi-table",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n某地甲年度有如下两张同口径统计表，金额均为精确值。\n表一：全体企业设备购置费用为120亿元；其中规模以上工业企业设备购置费用为80亿元。\n表二：规模以上工业企业中，绿色设备购置费用为48亿元；其余设备购置费用为32亿元。\n规模以上工业企业是全体企业的子集，每笔费用只归入一个企业、一个设备类别；其他企业的绿色设备费用未提供，所有费用均非负。\n【问题】仅依据两表，全体企业绿色设备购置费用占全部设备购置费用的比重，哪项一定成立？",
      "options": [
        "恰好为40%",
        "恰好为60%",
        "至少为40%",
        "低于40%"
      ],
      "answer": 2,
      "explanation": "全体企业绿色设备费用至少包含已知的48亿元，故比重至少为48÷120=40%。其他企业共40亿元的设备费用中，绿色部分未知，不能确定精确比重。",
      "optionReviews": [
        "48÷120=40%只能确定已知绿色设备费用对全体费用的贡献；其他企业还可能购置绿色设备，因此未必恰好40%。",
        "48÷80=60%是规模以上工业企业内部的绿色设备比重，不能替代全体企业的比重。",
        "全体企业绿色设备费用至少包含已知的48亿元，故比重至少为48÷120=40%。其他企业共40亿元的设备费用中，绿色部分未知，不能确定精确比重。",
        "已知子集已有48亿元绿色设备费用，除以全体120亿元就是40%，非负的其他绿色费用不会把比重降至40%以下。"
      ],
      "trainingStage": "检查边界",
      "trainingGoal": "区分子集内比重与全体比重，保留未披露部分的边界",
      "graphic": null,
      "materialGroup": "d37-transfer-03-condition",
      "materialIds": [
        "d37-transfer-03-material"
      ],
      "meta": {
        "module": "资料分析",
        "type": "多表联读",
        "trainingStage": "检查边界",
        "trainingGoal": "区分子集内比重与全体比重，保留未披露部分的边界",
        "knowledgeIds": [
          "multi-table",
          "multi-table/subset-boundary"
        ],
        "tags": [
          "多表联读",
          "购置费用的嵌套口径"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "d37-transfer-04",
      "lesson": "pn-compound-logic",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n一场交流会把甲、乙、丙、丁四场报告分别安排在第1至第4时段，每时段恰好一场，全部规则如下：\n①甲在乙之前；②如果丙在第1时段，则丁在第4时段；③丁不在第4时段；④乙不在第3时段。\n“之前”只要求时段编号较小，不要求紧邻。\n【问题】以下哪项必然成立？",
      "options": [
        "甲在第1时段",
        "乙在第4时段",
        "丙不在第1时段",
        "丁在甲之前"
      ],
      "answer": 2,
      "explanation": "若丙在第1时段，规则②要求丁在第4时段，与规则③矛盾。因此丙一定不在第1时段。两种合法顺序可分别反驳其余选项。",
      "optionReviews": [
        "丁、甲、丙、乙是一个合法顺序，甲在第2时段，所以甲不必在第1时段。",
        "甲、乙、丁、丙是一个合法顺序，乙在第2时段，所以乙不必在第4时段。",
        "若丙在第1时段，规则②要求丁在第4时段，与规则③矛盾。因此丙一定不在第1时段。两种合法顺序可分别反驳其余选项。",
        "甲、乙、丁、丙合法，丁在甲之后，故“丁在甲之前”不必成立。"
      ],
      "trainingStage": "识别概念",
      "trainingGoal": "联立条件命题与否定事实，用反例区分必然与可能",
      "graphic": null,
      "materialGroup": "d37-transfer-04-condition",
      "materialIds": [
        "d37-transfer-04-material"
      ],
      "meta": {
        "module": "判断推理",
        "type": "复合条件",
        "trainingStage": "识别概念",
        "trainingGoal": "联立条件命题与否定事实，用反例区分必然与可能",
        "knowledgeIds": [
          "pn-compound-logic",
          "pn-compound-logic/contradiction-slot"
        ],
        "tags": [
          "复合条件",
          "四场报告的排序"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "d37-transfer-05",
      "lesson": "pn-compound-logic",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n某次活动对每一份有效报名记录都满足以下条件：\n①“线上报名”和“现场报名”至少有一项为真；②线上报名必有电子归档；③现场报名必已人工核验；④电子归档和已人工核验不能同时为真。\n记录状态只有真或假，除此以外没有其他限制。现知某份有效报名记录“已人工核验”为真。\n【问题】以下哪项可以必然推出？",
      "options": [
        "该记录同时采用线上和现场报名",
        "该记录已有电子归档",
        "该记录不是现场报名",
        "该记录是现场报名，且不是线上报名"
      ],
      "answer": 3,
      "explanation": "已核验→未电子归档；由线上报名→电子归档取逆否，得非线上报名。再由至少线上或现场报名，推出现场报名。因此该记录只能是现场报名，且不是线上报名。",
      "optionReviews": [
        "已人工核验排除了电子归档，线上报名又必有电子归档，所以线上报名不可能为真，更不可能两种方式同时采用。",
        "根据规则④，已人工核验为真时，电子归档必为假。",
        "不能只把“现场报名→已核验”逆推；但本题还有规则①、②、④。先排除线上报名后，至少一种报名方式为真会迫使现场报名为真。",
        "已核验→未电子归档；由线上报名→电子归档取逆否，得非线上报名。再由至少线上或现场报名，推出现场报名。因此该记录只能是现场报名，且不是线上报名。"
      ],
      "trainingStage": "迁移运用",
      "trainingGoal": "把互斥、充分条件与至少其一联立，避免单独逆推",
      "graphic": null,
      "materialGroup": "d37-transfer-05-condition",
      "materialIds": [
        "d37-transfer-05-material"
      ],
      "meta": {
        "module": "判断推理",
        "type": "复合条件",
        "trainingStage": "迁移运用",
        "trainingGoal": "把互斥、充分条件与至少其一联立，避免单独逆推",
        "knowledgeIds": [
          "pn-compound-logic",
          "pn-compound-logic/disjunction-linked"
        ],
        "tags": [
          "复合条件",
          "两种报名方式与核验"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "d37-transfer-06",
      "lesson": "pn-compound-logic",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n展馆的甲、乙、丙、丁四个展区各有“开放”或“关闭”两种状态，允许出现的状态只受以下规则限制：\n①甲开放则乙开放；②丙开放则甲关闭；③甲、丁至少有一个开放。\n有人据此断言：“只要丙开放，乙就一定关闭。”\n【问题】下列哪一种状态符合全部原规则，并能反驳该断言？",
      "options": [
        "甲关、乙开、丙开、丁开",
        "甲开、乙关、丙关、丁开",
        "甲关、乙开、丙开、丁关",
        "甲关、乙关、丙开、丁开"
      ],
      "answer": 0,
      "explanation": "丙开放、乙也开放，恰好使断言的前件真而后件假；甲关闭满足规则②，丁开放满足规则③，甲关闭不触发规则①。故这是合法反例。",
      "optionReviews": [
        "丙开放、乙也开放，恰好使断言的前件真而后件假；甲关闭满足规则②，丁开放满足规则③，甲关闭不触发规则①。故这是合法反例。",
        "甲开放而乙关闭，违反规则①；并且丙关闭也不满足反例所需的“丙开放”。",
        "甲、丁均关闭，违反规则③。反例必须先是符合原条件的可能状态，不能只看丙与乙。",
        "这组状态符合原规则，但丙开放时乙确实关闭，并未使所要反驳的断言为假。"
      ],
      "trainingStage": "检查边界",
      "trainingGoal": "同时核验反例的合法性、前件和结论否定",
      "graphic": null,
      "materialGroup": "d37-transfer-06-condition",
      "materialIds": [
        "d37-transfer-06-material"
      ],
      "meta": {
        "module": "判断推理",
        "type": "复合条件",
        "trainingStage": "检查边界",
        "trainingGoal": "同时核验反例的合法性、前件和结论否定",
        "knowledgeIds": [
          "pn-compound-logic",
          "pn-compound-logic/valid-counterexample"
        ],
        "tags": [
          "复合条件",
          "展区开放状态的反例"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "d37-transfer-07",
      "lesson": "pn-share-scope",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n某店本期共有1500笔订单，比上期增长25%；本期线上订单450笔，比上期增长50%。每笔订单只计一次，线上订单是全部订单的子集，两期统计口径相同，各数均为精确值。\n【问题】线上订单占全部订单的比重，本期比上期提高多少个百分点？",
      "options": [
        "5个百分点",
        "25个百分点",
        "10个百分点",
        "20个百分点"
      ],
      "answer": 0,
      "explanation": "上期总订单为1500÷1.25=1200笔，上期线上为450÷1.5=300笔。上期比重25%，本期比重30%，相差5个百分点。",
      "optionReviews": [
        "上期总订单为1500÷1.25=1200笔，上期线上为450÷1.5=300笔。上期比重25%，本期比重30%，相差5个百分点。",
        "25个百分点是把线上订单增长率50%与全部订单增长率25%直接相减；增长率之差不是线上订单占比之差。应先分别还原基期分子、分母，再比较两期比重。",
        "10个百分点可由把基期线上300笔误除以本期总量1500笔、得到20%，再与30%相减产生；这混用了两期分母。基期总量应为1200笔，正确比重差为5个百分点。",
        "20%是比重从25%到30%的相对增幅，不是提高20个百分点；百分点差为5。"
      ],
      "trainingStage": "识别概念",
      "trainingGoal": "从不同增长率还原基期分子分母，区分百分点与相对变化",
      "graphic": null,
      "materialGroup": "d37-transfer-07-condition",
      "materialIds": [
        "d37-transfer-07-material"
      ],
      "meta": {
        "module": "资料分析",
        "type": "比重口径",
        "trainingStage": "识别概念",
        "trainingGoal": "从不同增长率还原基期分子分母，区分百分点与相对变化",
        "knowledgeIds": [
          "pn-share-scope",
          "pn-share-scope/share-from-two-growths"
        ],
        "tags": [
          "比重口径",
          "线上订单两期比重"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "d37-transfer-08",
      "lesson": "pn-share-scope",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n一个社区共调查300户家庭，每户只填一份问卷。其中90户使用太阳能热水器，120户使用智能温控设备，同时使用这两种设备的有30户。除上述两种设备外是否还有其他设备，不影响本题分类。\n【问题】至少使用上述两种设备中一种的家庭，占全部受访家庭的多少？",
      "options": [
        "70%",
        "50%",
        "60%",
        "40%"
      ],
      "answer": 2,
      "explanation": "至少一种的并集为90+120−30=180户，占180÷300=60%。同时使用的家庭只需从相加结果中减去一次。",
      "optionReviews": [
        "(90+120)÷300=70%重复计入了同时使用两种设备的30户，未作去重。",
        "若把交集30户减两次，会得到150户、50%；但交集家庭仍应在“至少一种”中保留一次。",
        "至少一种的并集为90+120−30=180户，占180÷300=60%。同时使用的家庭只需从相加结果中减去一次。",
        "120÷300=40%只是使用智能温控设备的家庭比重，漏掉了只使用太阳能热水器的60户。"
      ],
      "trainingStage": "迁移运用",
      "trainingGoal": "把至少一种转为并集，交集去重一次",
      "graphic": null,
      "materialGroup": "d37-transfer-08-condition",
      "materialIds": [
        "d37-transfer-08-material"
      ],
      "meta": {
        "module": "资料分析",
        "type": "比重口径",
        "trainingStage": "迁移运用",
        "trainingGoal": "把至少一种转为并集，交集去重一次",
        "knowledgeIds": [
          "pn-share-scope",
          "pn-share-scope/overlap-union"
        ],
        "tags": [
          "比重口径",
          "家庭设备使用的去重"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "d37-transfer-09",
      "lesson": "pn-share-scope",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n某厂只生产精密型和普通型两类产品，类别互不重叠。甲期、乙期的产量均为1000件。甲期精密型占20%，乙期精密型占50%。两期各类别的合格率都保持不变：精密型90%，普通型60%。所有数值均为精确值，未提供技术改造或人员变化情况。\n【问题】下列关于总体合格率变化的判断，哪项有充分依据？",
      "options": [
        "总体提高15个百分点，说明每类产品质量都改善",
        "总体提高9%，说明普通型质量改善",
        "总体提高9个百分点；这种变化可由产品构成变化解释",
        "两类合格率都不变，所以总体合格率不变"
      ],
      "answer": 2,
      "explanation": "甲期0.2×90%+0.8×60%=66%，乙期0.5×90%+0.5×60%=75%，提高9个百分点。类别内合格率未变，已知产品构成变化足以解释此算术差异，但不支持技术改造等表外原因。",
      "optionReviews": [
        "甲期总体为66%，乙期为75%，相差9个百分点而非15；题干已明确两类合格率均不变，不能说每类都改善。",
        "总体相对增幅为9÷66，约13.6%，不是9%；且普通型合格率始终60%，不支持其质量改善。",
        "甲期0.2×90%+0.8×60%=66%，乙期0.5×90%+0.5×60%=75%，提高9个百分点。类别内合格率未变，已知产品构成变化足以解释此算术差异，但不支持技术改造等表外原因。",
        "总体合格率需要按当期产量占比加权。合格率较高的精密型占比提高，即使组内率不变，总体也会改变。"
      ],
      "trainingStage": "检查边界",
      "trainingGoal": "区分结构权重改变与组内表现改变，不从总体变化补造原因",
      "graphic": null,
      "materialGroup": "d37-transfer-09-condition",
      "materialIds": [
        "d37-transfer-09-material"
      ],
      "meta": {
        "module": "资料分析",
        "type": "比重口径",
        "trainingStage": "检查边界",
        "trainingGoal": "区分结构权重改变与组内表现改变，不从总体变化补造原因",
        "knowledgeIds": [
          "pn-share-scope",
          "pn-share-scope/fixed-rates-changing-mix"
        ],
        "tags": [
          "比重口径",
          "合格率与产品构成"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "d37-transfer-10",
      "lesson": "on-source-reading",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n一所图书馆的两份文件如下，均为本题虚构文本。\n文件甲，3月1日《讨论稿》：“拟从4月起连续六周，每周三18时至20时开放夜间阅读；对象及预约方式待定。”\n文件乙，3月20日正式《试行通知》：“原讨论稿仅作筹备参考。首轮只在4月第一个、第二个周三18时至19时开放；参加者须提前预约且预约成功。后续是否继续，另行通知。”\n除这两份文件外没有其他已发布安排。\n【问题】截至3月20日，下面哪种转述准确保留了已确定安排？",
      "options": [
        "4月起连续六周，每周三18时至20时都开放，预约方式以后再定",
        "首轮为4月前两个周三18至19时，须提前预约成功",
        "首轮两个周三18时至20时开放，任何参加者均无须提前预约",
        "六周活动已经被永久取消，图书馆明确决定今后都不举办夜间阅读"
      ],
      "answer": 1,
      "explanation": "正式通知明确首轮为4月第一个、第二个周三18至19时，参加者须提前预约且预约成功。这一转述保留了具体日期、时段和参加条件，未补写后续承诺。",
      "optionReviews": [
        "“六周”来自被明确降为筹备参考的讨论稿；正式通知只确定首轮两次，不能把拟议范围当作生效安排。",
        "正式通知明确首轮为4月第一个、第二个周三18至19时，参加者须提前预约且预约成功。这一转述保留了具体日期、时段和参加条件，未补写后续承诺。",
        "正式通知结束时间为19时，且须预约成功；该项把旧时间与不存在的免预约规则混合。",
        "“后续另行通知”表示尚未确定，不等于已决定今后不再举办，不能从当前有限安排推出永久取消。"
      ],
      "trainingStage": "识别概念",
      "trainingGoal": "按文本地位与时间核对版本，保留条件和未定事项",
      "graphic": null,
      "materialGroup": "d37-transfer-10-condition",
      "materialIds": [
        "d37-transfer-10-material"
      ],
      "meta": {
        "module": "言语理解",
        "type": "多来源阅读",
        "trainingStage": "识别概念",
        "trainingGoal": "按文本地位与时间核对版本，保留条件和未定事项",
        "knowledgeIds": [
          "on-source-reading",
          "on-source-reading/notice-vs-draft"
        ],
        "tags": [
          "多来源阅读",
          "夜间阅读活动的两版文件"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "d37-transfer-11",
      "lesson": "on-source-reading",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n社区书房讨论开放时段时收到两份记录。\n记录甲：“在宣传页上自愿填答的100份问卷中，70份表示更希望书房晚间开放；问卷未记录答题者是否曾到访。”\n记录乙：“本周共100次到访记录，其中晚间20次、白天80次；同一个人可能多次到访，未记录到访者是否填写过上述问卷。”\n两份记录本身均被如实转录，未提供抽样代表性或个人身份对应表。\n【问题】综合两份记录，以下哪项判断最稳妥？",
      "options": [
        "两份记录对象、计量单位和指标不同，不能据此断言同一批人改变了偏好",
        "问卷中至少50名受访者虽希望书房晚间开放，却在本周改为白天到访",
        "晚间20次到访说明问卷中只有20人说了实话",
        "问卷中70%的支持率已经足以说明，全社区至少70%的居民希望晚间开放"
      ],
      "answer": 0,
      "explanation": "甲是自愿填写问卷中的偏好，乙是可重复的到访人次；既不保证同一批人，也不是同一指标。它们可分别提供线索，却不足以推出个人偏好变化。",
      "optionReviews": [
        "甲是自愿填写问卷中的偏好，乙是可重复的到访人次；既不保证同一批人，也不是同一指标。它们可分别提供线索，却不足以推出个人偏好变化。",
        "70份意愿问卷与20次晚间到访不能直接相减来确定50名具体受访者；材料未建立身份对应，也未保证每位填答者本周都到访。即使有人白天到访，也未必改变了晚间开放偏好，更无此前夜间到访的证据支持“改为白天”。",
        "有晚间偏好的人本周未必能到访，一人也可能多次到访；到访人次不能反推回答真假，更不能锁定20名答题者。",
        "70%仅是自愿填答的100份问卷内部比例，未证明代表全社区居民，不能推广为全社区下限。"
      ],
      "trainingStage": "迁移运用",
      "trainingGoal": "跨来源比较前核对人、份、人次及态度与行为指标",
      "graphic": null,
      "materialGroup": "d37-transfer-11-condition",
      "materialIds": [
        "d37-transfer-11-material"
      ],
      "meta": {
        "module": "言语理解",
        "type": "多来源阅读",
        "trainingStage": "迁移运用",
        "trainingGoal": "跨来源比较前核对人、份、人次及态度与行为指标",
        "knowledgeIds": [
          "on-source-reading",
          "on-source-reading/different-population-metric"
        ],
        "tags": [
          "多来源阅读",
          "意愿问卷与到访记录"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "d37-transfer-12",
      "lesson": "on-source-reading",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n资料员拿到以下三段文字。\n技术要求节选：“本次尺寸抽检只检查连接孔间距。标称间距为40毫米，允许误差为正负2毫米；不涉及承重、耐久或其他尺寸指标。”\n检测记录：“从该批产品中抽取20件，孔间距均在38至42毫米内。本记录未作全批逐件检验。”\n宣传初稿：“经过检验，本批所有产品的各项质量指标均已达标。”\n假定技术要求和检测记录准确、完整，暂不使用其他资料。\n【问题】以下哪种修改，使宣传表述与现有证据范围一致？",
      "options": [
        "本批所有产品，无论是否被抽中，连接孔间距均已达标",
        "20件样品的承重和耐久性能均达标",
        "由于没有逐件检测，本批产品的孔间距均不合格",
        "本次抽取的20件样品，连接孔间距符合所列要求"
      ],
      "answer": 3,
      "explanation": "20件样品的孔间距落在允许区间内，恰好支持“这些样品、这一指标、符合所列要求”。该项同时收窄对象范围与指标范围。",
      "optionReviews": [
        "20件抽样结果不能直接改为全批逐件均合格；材料未给出足以作该种全称推断的抽检判定规则。",
        "技术要求和检测记录都只涉及孔间距，不能跨指标推出承重和耐久合格。",
        "缺少全批逐件检验并不证明不合格，且20件样品的孔间距已有合格证据；未知不是否定事实。",
        "20件样品的孔间距落在允许区间内，恰好支持“这些样品、这一指标、符合所列要求”。该项同时收窄对象范围与指标范围。"
      ],
      "trainingStage": "检查边界",
      "trainingGoal": "区分证据对象、检验指标与全称质量承诺",
      "graphic": null,
      "materialGroup": "d37-transfer-12-condition",
      "materialIds": [
        "d37-transfer-12-material"
      ],
      "meta": {
        "module": "言语理解",
        "type": "多来源阅读",
        "trainingStage": "检查边界",
        "trainingGoal": "区分证据对象、检验指标与全称质量承诺",
        "knowledgeIds": [
          "on-source-reading",
          "on-source-reading/test-scope-vs-overclaim"
        ],
        "tags": [
          "多来源阅读",
          "检测摘录与宣传初稿"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "d37-transfer-13",
      "lesson": "on-period-scope",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n某工作室本年度一季度累计完成420件，1至6月累计完成1100件，第三季度单季完成580件。各季度不重叠，完成件数按完成日期记录，不重复计数，均为精确值。\n【问题】第三季度完成量比第二季度约变化多少？保留一位小数。",
      "options": [
        "增长约38.1%",
        "下降约47.3%",
        "下降约9.1%",
        "下降约14.7%"
      ],
      "answer": 3,
      "explanation": "第二季度=1100−420=680件；第三季度比它减少100件，降幅100÷680≈14.7%。先把累计量拆为同长度单季量，再作环比。",
      "optionReviews": [
        "(580−420)÷420约为38.1%，比较的是第三季度与第一季度，错把第一季度当第二季度。",
        "(580−1100)÷1100约为−47.3%，使用的是上半年累计量而非第二季度单季量。",
        "把100件的下降除以1100件会得到约9.1%，分母仍错误地使用了上半年累计量。",
        "第二季度=1100−420=680件；第三季度比它减少100件，降幅100÷680≈14.7%。先把累计量拆为同长度单季量，再作环比。"
      ],
      "trainingStage": "识别概念",
      "trainingGoal": "把累计量还原为当期量后再比较环比",
      "graphic": null,
      "materialGroup": "d37-transfer-13-condition",
      "materialIds": [
        "d37-transfer-13-material"
      ],
      "meta": {
        "module": "资料分析",
        "type": "期间口径",
        "trainingStage": "识别概念",
        "trainingGoal": "把累计量还原为当期量后再比较环比",
        "knowledgeIds": [
          "on-period-scope",
          "on-period-scope/cumulative-to-quarter"
        ],
        "tags": [
          "期间口径",
          "季度完成量的环比"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "d37-transfer-14",
      "lesson": "on-period-scope",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n某预约平台月初有260笔待处理预约。本月新进入待处理队列180笔，完成处理140笔，另有32笔在处理前由申请人撤回。撤回与完成处理是互不重叠的出队原因，每笔只出队一次；没有其他进出队、重复记录或期末跨账处理。\n【问题】月末待处理预约与月初相比如何变化？",
      "options": [
        "减少8笔",
        "增加8笔",
        "增加40笔",
        "减少40笔"
      ],
      "answer": 1,
      "explanation": "净变化=新增180−完成140−撤回32=增加8笔，月末268笔。完成与撤回都使待处理存量减少，且两者不重复。",
      "optionReviews": [
        "本月全部出队172笔，少于新增180笔，所以存量增加而非减少；不能把净变化方向写反。",
        "净变化=新增180−完成140−撤回32=增加8笔，月末268笔。完成与撤回都使待处理存量减少，且两者不重复。",
        "180−140=40只扣除了完成处理，遗漏了另有32笔撤回，也应从待处理队列移除。",
        "该项既未完整扣除撤回，又反转了新增多于完成的方向。按完整存量恒等式，净增加8笔。"
      ],
      "trainingStage": "迁移运用",
      "trainingGoal": "按明确互斥的进出流量核对期初、期末存量",
      "graphic": null,
      "materialGroup": "d37-transfer-14-condition",
      "materialIds": [
        "d37-transfer-14-material"
      ],
      "meta": {
        "module": "资料分析",
        "type": "期间口径",
        "trainingStage": "迁移运用",
        "trainingGoal": "按明确互斥的进出流量核对期初、期末存量",
        "knowledgeIds": [
          "on-period-scope",
          "on-period-scope/stock-disjoint-outflows"
        ],
        "tags": [
          "期间口径",
          "预约待处理量的增减"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "d37-transfer-15",
      "lesson": "on-period-scope",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n某店以连续12个完整自然月的销售额之和作为“滚动12个月销售额”。截至本年5月末，该指标为980万元，覆盖上年6月至本年5月；上年6月销售额80万元，本年6月销售额120万元。销售额按月归属，口径相同且无修订。\n【问题】截至本年6月末的滚动12个月销售额是多少？",
      "options": [
        "1100万元",
        "1020万元",
        "1060万元",
        "40万元"
      ],
      "answer": 1,
      "explanation": "新窗口为上年7月至本年6月，应从980中减去移出的80，再加上进入的120，得1020万元。窗口总额增加40万元，不等于本月销售只有40万元。",
      "optionReviews": [
        "980+120=1100只加入新进入窗口的本年6月，未移出窗口中的上年6月，会变成13个月之和。",
        "新窗口为上年7月至本年6月，应从980中减去移出的80，再加上进入的120，得1020万元。窗口总额增加40万元，不等于本月销售只有40万元。",
        "980+80=1060加上了将被移出的旧月份，既没有正确扣旧，也没有加入本年6月的120。",
        "120−80=40是滚动总额的净增量，而非新的12个月总额；还须加上原指标980。"
      ],
      "trainingStage": "检查边界",
      "trainingGoal": "滚动窗口一进一出，区分新总额、净增量和当月量",
      "graphic": null,
      "materialGroup": "d37-transfer-15-condition",
      "materialIds": [
        "d37-transfer-15-material"
      ],
      "meta": {
        "module": "资料分析",
        "type": "期间口径",
        "trainingStage": "检查边界",
        "trainingGoal": "滚动窗口一进一出，区分新总额、净增量和当月量",
        "knowledgeIds": [
          "on-period-scope",
          "on-period-scope/rolling-window-in-out"
        ],
        "tags": [
          "期间口径",
          "十二个月滚动销售额"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "d37-transfer-16",
      "lesson": "t35-context-reading",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n①一支方言记录小组为旧城的日常对话录音，整理了读音、词义和说话情境。负责人说，档案能使后来者反复聆听已经记录的声音，却不能让未被记录的交谈自动留下。\n②有人认为，有了完整录音库，方言就不需要在日常生活中继续使用。另一名成员指出，档案固定的是某次说话，实际交谈还会产生新的搭配、情境与表达。没有使用者之间的往来，保存再多声音也不能替代这种生成过程。\n③不过，成员们也反对以“活的语言”为由轻视记录。老一辈不再使用的表达，有时正靠旧录音被重新理解。他们主张把可追溯的档案与能持续交谈的场景放在一起考虑：前者帮助回看，后者让表达继续发生，两者服务不同但相互联系的需要。\n【问题】对全文主要观点的概括，最恰当的是哪一项？",
      "options": [
        "方言只要保留足量录音，就能持续产生新的表达",
        "方言记录只能保存旧声音，对当下交流没有作用",
        "方言档案与日常使用作用不同，应相互补充",
        "只有日常仍被使用的表达才值得进入档案"
      ],
      "answer": 2,
      "explanation": "三段依次说明档案的保存作用、不能替代实际交谈的边界，以及两者互补的主张。该项同时保留作用与边界，覆盖全文中心。",
      "optionReviews": [
        "第②段明确反对用录音库替代现实交谈；保存旧声音并不会自动产生新的交流。",
        "第③段举出旧录音帮助重新理解表达的作用，未把记录说成对当下完全无用。",
        "三段依次说明档案的保存作用、不能替代实际交谈的边界，以及两者互补的主张。该项同时保留作用与边界，覆盖全文中心。",
        "第③段恰提到已不再使用的表达仍有记录价值，本文没有以当前是否使用作为唯一收录标准。"
      ],
      "trainingStage": "识别概念",
      "trainingGoal": "整合多段论述，保留正面作用与替代边界",
      "graphic": null,
      "materialGroup": "d37-transfer-16-condition",
      "materialIds": [
        "d37-transfer-16-material"
      ],
      "meta": {
        "module": "言语理解",
        "type": "长语境辨析",
        "trainingStage": "识别概念",
        "trainingGoal": "整合多段论述，保留正面作用与替代边界",
        "knowledgeIds": [
          "t35-context-reading",
          "t35-context-reading/complement-not-replacement"
        ],
        "tags": [
          "长语境辨析",
          "方言存档与日常使用"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "d37-transfer-17",
      "lesson": "t35-context-reading",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n①一家教学园把种子按发芽时的主要环境要求分组，标签写有“需较长湿润期”“需较大昼夜温差”等。本题中的标签只概括各组在该园观察条件下较突出的发芽要求，不表示全部需求。\n②参观者提出，既然已经分组，园方可以把某组称为“优等种子”，其余称为“次等种子”。讲解员不同意：分类是在回答“培养时应留意什么”，并未比较产量、风味或生态适应性，也没有为这些指标确定共同的评价尺度。\n③讲解员补充，同组也不等于每一种种子的所有要求都相同。标签是开始查阅记录的入口，实际培养时仍要查看具体品种的温度、湿度和处理时长。删去标签会使查阅失去线索，把标签当成完整配方则会遗漏条件。\n【问题】以下哪种做法最符合讲解员的意见？",
      "options": [
        "先按标签定位相关记录，再核对具体品种的培养条件",
        "按标签把种子排出固定质量名次后统一售价",
        "对同一组的所有种子采用完全相同的培养配方",
        "为避免误用标签，删除全部分组信息，仅保留名称"
      ],
      "answer": 0,
      "explanation": "标签提供查阅线索，具体记录补足品种条件。这一做法同时保留分类的用途与其不完整性，符合第②、③段。",
      "optionReviews": [
        "标签提供查阅线索，具体记录补足品种条件。这一做法同时保留分类的用途与其不完整性，符合第②、③段。",
        "标签服务于发芽培养注意事项，并未提供质量综合评价尺度，更没有售价依据，把用途分类改成质量排名超出原文。",
        "第③段明确“同组不等于全部要求相同”，统一配方会把概括标签误作完整条件。",
        "第③段指出删除标签会失去查阅线索。作者反对的是误用标签，并不主张撤销有用分类。"
      ],
      "trainingStage": "迁移运用",
      "trainingGoal": "把概念的用途、适用范围迁移到新的操作方案",
      "graphic": null,
      "materialGroup": "d37-transfer-17-condition",
      "materialIds": [
        "d37-transfer-17-material"
      ],
      "meta": {
        "module": "言语理解",
        "type": "长语境辨析",
        "trainingStage": "迁移运用",
        "trainingGoal": "把概念的用途、适用范围迁移到新的操作方案",
        "knowledgeIds": [
          "t35-context-reading",
          "t35-context-reading/classification-purpose"
        ],
        "tags": [
          "长语境辨析",
          "种子的分类标签"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "d37-transfer-18",
      "lesson": "t35-context-reading",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n①一支维修队整理旧记录，发现表格中“已修复”的勾选很齐全，故障原因一栏却常为空白。有人建议增加一个“再次故障”的勾选框，希望借此知道哪些维修方法可靠。\n②负责人说，新框能记录故障是否再出现，却仍不能单独解释为什么。有的设备换了零件，有的同时调整了工作负载；若只看再次故障与否，方法差异和使用条件差异就混在一起。更完整的表格也不意味着已有足够材料，关键是过去实际留下了什么。\n③团队因此暂缓设计统一的新表。下一步先抽取几份已结束工单，逐项核对维修动作、设备使用变化和后续观察分别记在哪里，找出哪些信息可追溯、哪些只能重新询问。完成这一步后，才讨论新增字段及记录责任。\n【问题】若文章紧接着介绍团队下一步实际工作，最自然的内容是哪一项？",
      "options": [
        "展示几份工单的信息核对过程及尚缺的记录",
        "介绍新表正式上线后故障率已大幅下降",
        "说明新增勾选框已经足以查明全部故障原因",
        "宣布某种维修方法对所有设备都最有效"
      ],
      "answer": 0,
      "explanation": "末段已明确即将抽取工单核对维修动作、使用变化和观察记录。继续展示核对过程与缺口，直接承接尚未完成的任务，未跳到设计或成效阶段。",
      "optionReviews": [
        "末段已明确即将抽取工单核对维修动作、使用变化和观察记录。继续展示核对过程与缺口，直接承接尚未完成的任务，未跳到设计或成效阶段。",
        "第③段明确暂缓设计新表，尚未上线；直接介绍上线后的成效会跨越未完成步骤并补造结果。",
        "第②段正是否定单一勾选框能够解释原因，该项与已确立的论证方向相反。",
        "材料未比较所有维修方法的效果，下一步也尚在补证据阶段，不能跳到普遍有效的结论。"
      ],
      "trainingStage": "检查边界",
      "trainingGoal": "依据结尾待完成任务推断下文，不跳到尚无依据的成效",
      "graphic": null,
      "materialGroup": "d37-transfer-18-condition",
      "materialIds": [
        "d37-transfer-18-material"
      ],
      "meta": {
        "module": "言语理解",
        "type": "长语境辨析",
        "trainingStage": "检查边界",
        "trainingGoal": "依据结尾待完成任务推断下文，不跳到尚无依据的成效",
        "knowledgeIds": [
          "t35-context-reading",
          "t35-context-reading/next-step-evidence-gap"
        ],
        "tags": [
          "长语境辨析",
          "维修记录为什么找不到原因"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "d37-transfer-19",
      "lesson": "t35-spatial-transform",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n一个刚性长方体箱子最初放在水平桌面上，沿桌面东西方向的边长为2厘米、南北方向为3厘米、竖直高度为5厘米。所有翻倒均绕与桌面接触的一条棱转90°，无滑动、变形或额外旋转。\n先向东翻倒一次，即绕南北方向的棱翻倒，使东西长度与高度互换；再从该状态向北翻倒一次，即绕东西方向的棱翻倒，使南北长度与高度互换。桌面东、北方向始终固定。\n【问题】完成两次翻倒后，箱子的竖直高度是多少厘米？",
      "options": [
        "2厘米",
        "6厘米",
        "5厘米",
        "3厘米"
      ],
      "answer": 3,
      "explanation": "初始（东西、南北、高）为(2,3,5)，向东后为(5,3,2)，再向北后为(5,2,3)，因此高度3厘米。每步只交换与翻倒有关的两个轴向长度。",
      "optionReviews": [
        "2厘米是第一次向东翻倒后的高度；第二次向北翻倒还会将当时的南北长度3厘米转成高度。",
        "翻倒只改变方向，不会生成新的边长；竖直高度最终只能取某条原有边的长度2、3、5之一，6厘米无依据。",
        "5厘米初始是高度，第一次已转为东西方向长度，第二次绕东西方向棱翻倒不会把它改回高度。",
        "初始（东西、南北、高）为(2,3,5)，向东后为(5,3,2)，再向北后为(5,2,3)，因此高度3厘米。每步只交换与翻倒有关的两个轴向长度。"
      ],
      "trainingStage": "识别概念",
      "trainingGoal": "按固定坐标逐次更新轴向长度，避免只记第一步",
      "graphic": null,
      "materialGroup": "d37-transfer-19-condition",
      "materialIds": [
        "d37-transfer-19-material"
      ],
      "meta": {
        "module": "判断推理",
        "type": "空间变换",
        "trainingStage": "识别概念",
        "trainingGoal": "按固定坐标逐次更新轴向长度，避免只记第一步",
        "knowledgeIds": [
          "t35-spatial-transform",
          "t35-spatial-transform/box-axis-length"
        ],
        "tags": [
          "空间变换",
          "长方体箱子的连续翻倒"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "d37-transfer-20",
      "lesson": "t35-spatial-transform",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n一个实心长方体在互相垂直的坐标轴下满足0≤x≤3、0≤y≤2、0≤z≤4，长度单位为厘米。用平面z=2y切开它。\n截面指平面与长方体的交集，面积按截面自身平面内的真实面积计算，不按投影面积计算。\n【问题】该截面的面积是多少平方厘米？",
      "options": [
        "6",
        "12",
        "6√5",
        "12√5"
      ],
      "answer": 2,
      "explanation": "截面四个顶点为(0,0,0)、(3,0,0)、(0,2,4)、(3,2,4)。沿x方向的边长3，与向量(0,2,4)垂直；后者长度√(2²+4²)=2√5。截面为矩形，面积3×2√5=6√5。",
      "optionReviews": [
        "6是截面在xy平面的投影面积3×2；斜向的一条边从(y,z)=(0,0)到(2,4)，真实长度不是2。",
        "12是按3×4把z方向高度当成截面斜边，漏掉斜边同时沿y方向延伸2厘米。",
        "截面四个顶点为(0,0,0)、(3,0,0)、(0,2,4)、(3,2,4)。沿x方向的边长3，与向量(0,2,4)垂直；后者长度√(2²+4²)=2√5。截面为矩形，面积3×2√5=6√5。",
        "12√5把斜边2√5重复乘了2，或把三角形/矩形面积关系误用；实际矩形只有3与2√5两条相邻边。"
      ],
      "trainingStage": "迁移运用",
      "trainingGoal": "用坐标恢复截面真实边长与垂直关系，不把投影当实形",
      "graphic": null,
      "materialGroup": "d37-transfer-20-condition",
      "materialIds": [
        "d37-transfer-20-material"
      ],
      "meta": {
        "module": "判断推理",
        "type": "空间变换",
        "trainingStage": "迁移运用",
        "trainingGoal": "用坐标恢复截面真实边长与垂直关系，不把投影当实形",
        "knowledgeIds": [
          "t35-spatial-transform",
          "t35-spatial-transform/rectangular-oblique-section"
        ],
        "tags": [
          "空间变换",
          "长方体的斜截面面积"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "d37-transfer-21",
      "lesson": "t35-spatial-transform",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n一个实心正方体的中心为O。现用一个穿过O的平面切它，得到面积大于0的多边形截面。平面可任意倾斜，不要求平行于某个面。\n可使用以下几何事实：正方体关于O中心对称；过O的平面也关于O中心对称；中心对称把每个点P映为O另一侧等距离的点P′。截面的边只计外轮廓，不计内部辅助线。\n【问题】关于任意这样的截面，以下哪项必然成立？",
      "options": [
        "一定是正方形",
        "一定有六条边",
        "可以是不退化的三角形",
        "外轮廓的边数一定是偶数"
      ],
      "answer": 3,
      "explanation": "任取截面上的点，其关于O的对称点既在正方体内也在切面内，因此仍在截面。截面为中心对称多边形，顶点与边均成对，边数必为偶数；具体可以为4或6，不能固定一种。",
      "optionReviews": [
        "以边长1的正方体0≤x,y,z≤1为例，过中心的平面x=y与它的交集是边长1和√2的矩形，不是正方形。",
        "取经过中心且平行于一对相对面的切面，会得到四边形，所以不一定有六条边。",
        "过O的截面关于O中心对称，且O在截面内部。不退化三角形不能把三个顶点成对对应，故不可能是三角形。",
        "任取截面上的点，其关于O的对称点既在正方体内也在切面内，因此仍在截面。截面为中心对称多边形，顶点与边均成对，边数必为偶数；具体可以为4或6，不能固定一种。"
      ],
      "trainingStage": "检查边界",
      "trainingGoal": "利用整体对称性质检查所有允许切面的边界，不把某一例当普遍结论",
      "graphic": null,
      "materialGroup": "d37-transfer-21-condition",
      "materialIds": [
        "d37-transfer-21-material"
      ],
      "meta": {
        "module": "判断推理",
        "type": "空间变换",
        "trainingStage": "检查边界",
        "trainingGoal": "利用整体对称性质检查所有允许切面的边界，不把某一例当普遍结论",
        "knowledgeIds": [
          "t35-spatial-transform",
          "t35-spatial-transform/central-symmetry-section"
        ],
        "tags": [
          "空间变换",
          "经过中心的正方体切面"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "d37-transfer-22",
      "lesson": "t35-group-statistics",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n一次同卷测验中，甲班30名学生的平均成绩为72分，乙班20名学生的平均成绩为87分。两班学生互不重叠，全部学生均参加且每人只计一次，平均成绩均为精确值。\n【问题】两班全部50名学生的平均成绩为多少分？",
      "options": [
        "79.5分",
        "78分",
        "81分",
        "75分"
      ],
      "answer": 1,
      "explanation": "甲班总分30×72=2160，乙班20×87=1740；合计3900分除以50人，平均78分。权重应是学生人数。",
      "optionReviews": [
        "(72+87)÷2=79.5是把两个班等权平均，但甲班30人、乙班20人，学生数不同。",
        "甲班总分30×72=2160，乙班20×87=1740；合计3900分除以50人，平均78分。权重应是学生人数。",
        "81分相当于给高均分的乙班更高权重，但乙班人数20少于甲班30；实际平均更靠近72分。",
        "75分不是按30与20的人数权重合成的结果；甲乙总分已能精确得到3900，除50为78。"
      ],
      "trainingStage": "识别概念",
      "trainingGoal": "先还原分组总量，再按实际人数合并均值",
      "graphic": null,
      "materialGroup": "d37-transfer-22-condition",
      "materialIds": [
        "d37-transfer-22-material"
      ],
      "meta": {
        "module": "资料分析",
        "type": "分组统计",
        "trainingStage": "识别概念",
        "trainingGoal": "先还原分组总量，再按实际人数合并均值",
        "knowledgeIds": [
          "t35-group-statistics",
          "t35-group-statistics/weight-by-count"
        ],
        "tags": [
          "分组统计",
          "两个班的平均成绩"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "d37-transfer-23",
      "lesson": "t35-group-statistics",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n共有100袋物品，按实际重量w（克）分为两组：40袋满足400≤w<500，另60袋满足500≤w≤600。每袋只在一组中；重量可为区间内任意实数，未给各袋具体值，也不把组中点当作实际重量。\n【问题】这100袋物品的平均重量m，以下哪个区间恰好覆盖其全部可能值？",
      "options": [
        "400≤m≤600",
        "460<m≤560",
        "460≤m≤560",
        "460≤m<560"
      ],
      "answer": 3,
      "explanation": "下界(40×400+60×500)÷100=460且可取到；上确界(40×500+60×600)÷100=560，但前40袋必须严格小于500，所以均值严格小于560。对任意0≤t<1，分别取400+100t与500+100t，可得到m=460+100t，故区间内每个值均能达到。",
      "optionReviews": [
        "这个区间虽包含实际可能值，但过宽，不能恰好描述全部可能值。例如平均400不可能，因为60袋均至少500克。",
        "下端460可以达到（40袋全为400、60袋全为500），上端560却不能达到，所以两端的开闭均写反。",
        "下界正确，但把560纳入了可能值。要均值560，必须两组都达到各自上限，而前40袋不允许等于500。",
        "下界(40×400+60×500)÷100=460且可取到；上确界(40×500+60×600)÷100=560，但前40袋必须严格小于500，所以均值严格小于560。对任意0≤t<1，分别取400+100t与500+100t，可得到m=460+100t，故区间内每个值均能达到。"
      ],
      "trainingStage": "迁移运用",
      "trainingGoal": "按人数加权求上下界，并证明端点及区间内部可达性",
      "graphic": null,
      "materialGroup": "d37-transfer-23-condition",
      "materialIds": [
        "d37-transfer-23-material"
      ],
      "meta": {
        "module": "资料分析",
        "type": "分组统计",
        "trainingStage": "迁移运用",
        "trainingGoal": "按人数加权求上下界，并证明端点及区间内部可达性",
        "knowledgeIds": [
          "t35-group-statistics",
          "t35-group-statistics/interval-mean-bounds"
        ],
        "tags": [
          "分组统计",
          "两档袋装物品重量"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "d37-transfer-24",
      "lesson": "t35-group-statistics",
      "stem": "【原创虚构教学材料；不对应真实机构、调查、政策或考试题】\n同一批100台设备在甲、乙两次检查中全部受检，每次只分合格或不合格。甲次合格70台、乙次合格85台。两次检查对象完全相同，未提供逐台结果对应表，也没有规定设备不能由合格变不合格。\n【问题】由甲次不合格变为乙次合格的设备台数x，全部可能范围是：",
      "options": [
        "只能是15台",
        "15至30台之间的任意整数",
        "只能是30台",
        "0至15台之间的任意整数"
      ],
      "answer": 1,
      "explanation": "设从合格变不合格的台数为y，则x−y=85−70=15，所以x≥15；甲次不合格仅30台，故x≤30。对任意整数x∈[15,30]，令y=x−15，即可形成合法对应：持续合格85−x、改善x、变差x−15、持续不合格30−x，四格均非负且合计100。因此范围恰为15至30台。",
      "optionReviews": [
        "净增加15台不等于只有15台改善；若同时有部分原合格设备变为不合格，改善台数会更多。",
        "设从合格变不合格的台数为y，则x−y=85−70=15，所以x≥15；甲次不合格仅30台，故x≤30。对任意整数x∈[15,30]，令y=x−15，即可形成合法对应：持续合格85−x、改善x、变差x−15、持续不合格30−x，四格均非负且合计100。因此范围恰为15至30台。",
        "所有30台原不合格设备都改善只是可能情况之一，并非必然；若没有原合格变差，则只需15台改善。",
        "净合格台数已增加15台，改善不可能少于15；同时可能有合格变差，故改善也可能超过15，不能把范围写为0至15。"
      ],
      "trainingStage": "检查边界",
      "trainingGoal": "用同对象边际总数约束个体转移，不把净增加等同改善人数",
      "graphic": null,
      "materialGroup": "d37-transfer-24-condition",
      "materialIds": [
        "d37-transfer-24-material"
      ],
      "meta": {
        "module": "资料分析",
        "type": "分组统计",
        "trainingStage": "检查边界",
        "trainingGoal": "用同对象边际总数约束个体转移，不把净增加等同改善人数",
        "knowledgeIds": [
          "t35-group-statistics",
          "t35-group-statistics/paired-marginal-bounds"
        ],
        "tags": [
          "分组统计",
          "同一批设备的两次检查"
        ],
        "applicableExams": [
          "fujian",
          "national"
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
        "purpose": "补充不同材料和条件的迁移练习；教学目标不是实测难度",
        "source": {
          "kind": "original",
          "title": "原创薄弱点迁移候选批次 v037",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "本批题干、选项、完整材料及逐项解析独立编写；未转载、检索或改写第三方题库。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "reviewId": "d38-practice-editorial-review-v1",
          "basis": "作者自查后另行逐题复算资料数据、穷举逻辑条件、证明空间边界并核对96项解析；仅本24题通过编辑复核，非盲审、专家认证、试测或难度标定。"
        },
        "methodIds": []
      }
    }
  ],
  "materials": [
    {
      "id": "d37-transfer-01-material",
      "title": "包裹量与退件率",
      "text": "某配送中心甲、乙两条线路本月承运的包裹互不重叠，且每个包裹至多退回一次。表一统计承运量，表二的退件率均以该线路本月承运量为分母，各数为精确值。\n表一：甲线路承运量为0.24万件，乙线路为1600件。\n表二：甲线路退件率为2.5%，乙线路为5.0%。",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-01"
      ]
    },
    {
      "id": "d37-transfer-02-material",
      "title": "窗口开放与业务办理",
      "text": "甲、乙两处咨询点本月的业务均只在所列开放时段办理，每笔业务只计一次。每天所有窗口都全程开放，各数为精确值。\n表一（本月业务）：甲点900笔，乙点1200笔。\n表二（开放配置）：甲点开放5天、每天3个窗口；乙点开放8天、每天2个窗口。\n本题将“每窗口日平均业务量”定义为业务总笔数÷（开放天数×每天窗口数）。",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-02"
      ]
    },
    {
      "id": "d37-transfer-03-material",
      "title": "购置费用的嵌套口径",
      "text": "某地甲年度有如下两张同口径统计表，金额均为精确值。\n表一：全体企业设备购置费用为120亿元；其中规模以上工业企业设备购置费用为80亿元。\n表二：规模以上工业企业中，绿色设备购置费用为48亿元；其余设备购置费用为32亿元。\n规模以上工业企业是全体企业的子集，每笔费用只归入一个企业、一个设备类别；其他企业的绿色设备费用未提供，所有费用均非负。",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-03"
      ]
    },
    {
      "id": "d37-transfer-04-material",
      "title": "四场报告的排序",
      "text": "一场交流会把甲、乙、丙、丁四场报告分别安排在第1至第4时段，每时段恰好一场，全部规则如下：\n①甲在乙之前；②如果丙在第1时段，则丁在第4时段；③丁不在第4时段；④乙不在第3时段。\n“之前”只要求时段编号较小，不要求紧邻。",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-04"
      ]
    },
    {
      "id": "d37-transfer-05-material",
      "title": "两种报名方式与核验",
      "text": "某次活动对每一份有效报名记录都满足以下条件：\n①“线上报名”和“现场报名”至少有一项为真；②线上报名必有电子归档；③现场报名必已人工核验；④电子归档和已人工核验不能同时为真。\n记录状态只有真或假，除此以外没有其他限制。现知某份有效报名记录“已人工核验”为真。",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-05"
      ]
    },
    {
      "id": "d37-transfer-06-material",
      "title": "展区开放状态的反例",
      "text": "展馆的甲、乙、丙、丁四个展区各有“开放”或“关闭”两种状态，允许出现的状态只受以下规则限制：\n①甲开放则乙开放；②丙开放则甲关闭；③甲、丁至少有一个开放。\n有人据此断言：“只要丙开放，乙就一定关闭。”",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-06"
      ]
    },
    {
      "id": "d37-transfer-07-material",
      "title": "线上订单两期比重",
      "text": "某店本期共有1500笔订单，比上期增长25%；本期线上订单450笔，比上期增长50%。每笔订单只计一次，线上订单是全部订单的子集，两期统计口径相同，各数均为精确值。",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-07"
      ]
    },
    {
      "id": "d37-transfer-08-material",
      "title": "家庭设备使用的去重",
      "text": "一个社区共调查300户家庭，每户只填一份问卷。其中90户使用太阳能热水器，120户使用智能温控设备，同时使用这两种设备的有30户。除上述两种设备外是否还有其他设备，不影响本题分类。",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-08"
      ]
    },
    {
      "id": "d37-transfer-09-material",
      "title": "合格率与产品构成",
      "text": "某厂只生产精密型和普通型两类产品，类别互不重叠。甲期、乙期的产量均为1000件。甲期精密型占20%，乙期精密型占50%。两期各类别的合格率都保持不变：精密型90%，普通型60%。所有数值均为精确值，未提供技术改造或人员变化情况。",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-09"
      ]
    },
    {
      "id": "d37-transfer-10-material",
      "title": "夜间阅读活动的两版文件",
      "text": "一所图书馆的两份文件如下，均为本题虚构文本。\n文件甲，3月1日《讨论稿》：“拟从4月起连续六周，每周三18时至20时开放夜间阅读；对象及预约方式待定。”\n文件乙，3月20日正式《试行通知》：“原讨论稿仅作筹备参考。首轮只在4月第一个、第二个周三18时至19时开放；参加者须提前预约且预约成功。后续是否继续，另行通知。”\n除这两份文件外没有其他已发布安排。",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-10"
      ]
    },
    {
      "id": "d37-transfer-11-material",
      "title": "意愿问卷与到访记录",
      "text": "社区书房讨论开放时段时收到两份记录。\n记录甲：“在宣传页上自愿填答的100份问卷中，70份表示更希望书房晚间开放；问卷未记录答题者是否曾到访。”\n记录乙：“本周共100次到访记录，其中晚间20次、白天80次；同一个人可能多次到访，未记录到访者是否填写过上述问卷。”\n两份记录本身均被如实转录，未提供抽样代表性或个人身份对应表。",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-11"
      ]
    },
    {
      "id": "d37-transfer-12-material",
      "title": "检测摘录与宣传初稿",
      "text": "资料员拿到以下三段文字。\n技术要求节选：“本次尺寸抽检只检查连接孔间距。标称间距为40毫米，允许误差为正负2毫米；不涉及承重、耐久或其他尺寸指标。”\n检测记录：“从该批产品中抽取20件，孔间距均在38至42毫米内。本记录未作全批逐件检验。”\n宣传初稿：“经过检验，本批所有产品的各项质量指标均已达标。”\n假定技术要求和检测记录准确、完整，暂不使用其他资料。",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-12"
      ]
    },
    {
      "id": "d37-transfer-13-material",
      "title": "季度完成量的环比",
      "text": "某工作室本年度一季度累计完成420件，1至6月累计完成1100件，第三季度单季完成580件。各季度不重叠，完成件数按完成日期记录，不重复计数，均为精确值。",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-13"
      ]
    },
    {
      "id": "d37-transfer-14-material",
      "title": "预约待处理量的增减",
      "text": "某预约平台月初有260笔待处理预约。本月新进入待处理队列180笔，完成处理140笔，另有32笔在处理前由申请人撤回。撤回与完成处理是互不重叠的出队原因，每笔只出队一次；没有其他进出队、重复记录或期末跨账处理。",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-14"
      ]
    },
    {
      "id": "d37-transfer-15-material",
      "title": "十二个月滚动销售额",
      "text": "某店以连续12个完整自然月的销售额之和作为“滚动12个月销售额”。截至本年5月末，该指标为980万元，覆盖上年6月至本年5月；上年6月销售额80万元，本年6月销售额120万元。销售额按月归属，口径相同且无修订。",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-15"
      ]
    },
    {
      "id": "d37-transfer-16-material",
      "title": "方言存档与日常使用",
      "text": "①一支方言记录小组为旧城的日常对话录音，整理了读音、词义和说话情境。负责人说，档案能使后来者反复聆听已经记录的声音，却不能让未被记录的交谈自动留下。\n②有人认为，有了完整录音库，方言就不需要在日常生活中继续使用。另一名成员指出，档案固定的是某次说话，实际交谈还会产生新的搭配、情境与表达。没有使用者之间的往来，保存再多声音也不能替代这种生成过程。\n③不过，成员们也反对以“活的语言”为由轻视记录。老一辈不再使用的表达，有时正靠旧录音被重新理解。他们主张把可追溯的档案与能持续交谈的场景放在一起考虑：前者帮助回看，后者让表达继续发生，两者服务不同但相互联系的需要。",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-16"
      ]
    },
    {
      "id": "d37-transfer-17-material",
      "title": "种子的分类标签",
      "text": "①一家教学园把种子按发芽时的主要环境要求分组，标签写有“需较长湿润期”“需较大昼夜温差”等。本题中的标签只概括各组在该园观察条件下较突出的发芽要求，不表示全部需求。\n②参观者提出，既然已经分组，园方可以把某组称为“优等种子”，其余称为“次等种子”。讲解员不同意：分类是在回答“培养时应留意什么”，并未比较产量、风味或生态适应性，也没有为这些指标确定共同的评价尺度。\n③讲解员补充，同组也不等于每一种种子的所有要求都相同。标签是开始查阅记录的入口，实际培养时仍要查看具体品种的温度、湿度和处理时长。删去标签会使查阅失去线索，把标签当成完整配方则会遗漏条件。",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-17"
      ]
    },
    {
      "id": "d37-transfer-18-material",
      "title": "维修记录为什么找不到原因",
      "text": "①一支维修队整理旧记录，发现表格中“已修复”的勾选很齐全，故障原因一栏却常为空白。有人建议增加一个“再次故障”的勾选框，希望借此知道哪些维修方法可靠。\n②负责人说，新框能记录故障是否再出现，却仍不能单独解释为什么。有的设备换了零件，有的同时调整了工作负载；若只看再次故障与否，方法差异和使用条件差异就混在一起。更完整的表格也不意味着已有足够材料，关键是过去实际留下了什么。\n③团队因此暂缓设计统一的新表。下一步先抽取几份已结束工单，逐项核对维修动作、设备使用变化和后续观察分别记在哪里，找出哪些信息可追溯、哪些只能重新询问。完成这一步后，才讨论新增字段及记录责任。",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-18"
      ]
    },
    {
      "id": "d37-transfer-19-material",
      "title": "长方体箱子的连续翻倒",
      "text": "一个刚性长方体箱子最初放在水平桌面上，沿桌面东西方向的边长为2厘米、南北方向为3厘米、竖直高度为5厘米。所有翻倒均绕与桌面接触的一条棱转90°，无滑动、变形或额外旋转。\n先向东翻倒一次，即绕南北方向的棱翻倒，使东西长度与高度互换；再从该状态向北翻倒一次，即绕东西方向的棱翻倒，使南北长度与高度互换。桌面东、北方向始终固定。",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-19"
      ]
    },
    {
      "id": "d37-transfer-20-material",
      "title": "长方体的斜截面面积",
      "text": "一个实心长方体在互相垂直的坐标轴下满足0≤x≤3、0≤y≤2、0≤z≤4，长度单位为厘米。用平面z=2y切开它。\n截面指平面与长方体的交集，面积按截面自身平面内的真实面积计算，不按投影面积计算。",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-20"
      ]
    },
    {
      "id": "d37-transfer-21-material",
      "title": "经过中心的正方体切面",
      "text": "一个实心正方体的中心为O。现用一个穿过O的平面切它，得到面积大于0的多边形截面。平面可任意倾斜，不要求平行于某个面。\n可使用以下几何事实：正方体关于O中心对称；过O的平面也关于O中心对称；中心对称把每个点P映为O另一侧等距离的点P′。截面的边只计外轮廓，不计内部辅助线。",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-21"
      ]
    },
    {
      "id": "d37-transfer-22-material",
      "title": "两个班的平均成绩",
      "text": "一次同卷测验中，甲班30名学生的平均成绩为72分，乙班20名学生的平均成绩为87分。两班学生互不重叠，全部学生均参加且每人只计一次，平均成绩均为精确值。",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-22"
      ]
    },
    {
      "id": "d37-transfer-23-material",
      "title": "两档袋装物品重量",
      "text": "共有100袋物品，按实际重量w（克）分为两组：40袋满足400≤w<500，另60袋满足500≤w≤600。每袋只在一组中；重量可为区间内任意实数，未给各袋具体值，也不把组中点当作实际重量。",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-23"
      ]
    },
    {
      "id": "d37-transfer-24-material",
      "title": "同一批设备的两次检查",
      "text": "同一批100台设备在甲、乙两次检查中全部受检，每次只分合格或不合格。甲次合格70台、乙次合格85台。两次检查对象完全相同，未提供逐台结果对应表，也没有规定设备不能由合格变不合格。",
      "provenance": "original-fictional",
      "questionIds": [
        "d37-transfer-24"
      ]
    }
  ],
  "index": [
    {
      "questionId": "d37-transfer-01",
      "indexRevision": 1,
      "moduleId": "资料分析",
      "typeIds": [
        "multi-table"
      ],
      "knowledgeIds": [
        "multi-table",
        "multi-table/aligned-denominators"
      ],
      "skillIds": [
        "aligned-denominators"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "识别概念",
      "levelKey": "intro",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-01-material"
      ],
      "conditionGroup": "d37-transfer-01-condition"
    },
    {
      "questionId": "d37-transfer-02",
      "indexRevision": 1,
      "moduleId": "资料分析",
      "typeIds": [
        "multi-table"
      ],
      "knowledgeIds": [
        "multi-table",
        "multi-table/window-day-product"
      ],
      "skillIds": [
        "window-day-product"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "迁移运用",
      "levelKey": "practice",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-02-material"
      ],
      "conditionGroup": "d37-transfer-02-condition"
    },
    {
      "questionId": "d37-transfer-03",
      "indexRevision": 1,
      "moduleId": "资料分析",
      "typeIds": [
        "multi-table"
      ],
      "knowledgeIds": [
        "multi-table",
        "multi-table/subset-boundary"
      ],
      "skillIds": [
        "subset-boundary"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "检查边界",
      "levelKey": "advanced",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-03-material"
      ],
      "conditionGroup": "d37-transfer-03-condition"
    },
    {
      "questionId": "d37-transfer-04",
      "indexRevision": 1,
      "moduleId": "判断推理",
      "typeIds": [
        "pn-compound-logic"
      ],
      "knowledgeIds": [
        "pn-compound-logic",
        "pn-compound-logic/contradiction-slot"
      ],
      "skillIds": [
        "contradiction-slot"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "识别概念",
      "levelKey": "intro",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-04-material"
      ],
      "conditionGroup": "d37-transfer-04-condition"
    },
    {
      "questionId": "d37-transfer-05",
      "indexRevision": 1,
      "moduleId": "判断推理",
      "typeIds": [
        "pn-compound-logic"
      ],
      "knowledgeIds": [
        "pn-compound-logic",
        "pn-compound-logic/disjunction-linked"
      ],
      "skillIds": [
        "disjunction-linked"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "迁移运用",
      "levelKey": "practice",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-05-material"
      ],
      "conditionGroup": "d37-transfer-05-condition"
    },
    {
      "questionId": "d37-transfer-06",
      "indexRevision": 1,
      "moduleId": "判断推理",
      "typeIds": [
        "pn-compound-logic"
      ],
      "knowledgeIds": [
        "pn-compound-logic",
        "pn-compound-logic/valid-counterexample"
      ],
      "skillIds": [
        "valid-counterexample"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "检查边界",
      "levelKey": "advanced",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-06-material"
      ],
      "conditionGroup": "d37-transfer-06-condition"
    },
    {
      "questionId": "d37-transfer-07",
      "indexRevision": 1,
      "moduleId": "资料分析",
      "typeIds": [
        "pn-share-scope"
      ],
      "knowledgeIds": [
        "pn-share-scope",
        "pn-share-scope/share-from-two-growths"
      ],
      "skillIds": [
        "share-from-two-growths"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "识别概念",
      "levelKey": "intro",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-07-material"
      ],
      "conditionGroup": "d37-transfer-07-condition"
    },
    {
      "questionId": "d37-transfer-08",
      "indexRevision": 1,
      "moduleId": "资料分析",
      "typeIds": [
        "pn-share-scope"
      ],
      "knowledgeIds": [
        "pn-share-scope",
        "pn-share-scope/overlap-union"
      ],
      "skillIds": [
        "overlap-union"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "迁移运用",
      "levelKey": "practice",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-08-material"
      ],
      "conditionGroup": "d37-transfer-08-condition"
    },
    {
      "questionId": "d37-transfer-09",
      "indexRevision": 1,
      "moduleId": "资料分析",
      "typeIds": [
        "pn-share-scope"
      ],
      "knowledgeIds": [
        "pn-share-scope",
        "pn-share-scope/fixed-rates-changing-mix"
      ],
      "skillIds": [
        "fixed-rates-changing-mix"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "检查边界",
      "levelKey": "advanced",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-09-material"
      ],
      "conditionGroup": "d37-transfer-09-condition"
    },
    {
      "questionId": "d37-transfer-10",
      "indexRevision": 1,
      "moduleId": "言语理解",
      "typeIds": [
        "on-source-reading"
      ],
      "knowledgeIds": [
        "on-source-reading",
        "on-source-reading/notice-vs-draft"
      ],
      "skillIds": [
        "notice-vs-draft"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "识别概念",
      "levelKey": "intro",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-10-material"
      ],
      "conditionGroup": "d37-transfer-10-condition"
    },
    {
      "questionId": "d37-transfer-11",
      "indexRevision": 1,
      "moduleId": "言语理解",
      "typeIds": [
        "on-source-reading"
      ],
      "knowledgeIds": [
        "on-source-reading",
        "on-source-reading/different-population-metric"
      ],
      "skillIds": [
        "different-population-metric"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "迁移运用",
      "levelKey": "practice",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-11-material"
      ],
      "conditionGroup": "d37-transfer-11-condition"
    },
    {
      "questionId": "d37-transfer-12",
      "indexRevision": 1,
      "moduleId": "言语理解",
      "typeIds": [
        "on-source-reading"
      ],
      "knowledgeIds": [
        "on-source-reading",
        "on-source-reading/test-scope-vs-overclaim"
      ],
      "skillIds": [
        "test-scope-vs-overclaim"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "检查边界",
      "levelKey": "advanced",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-12-material"
      ],
      "conditionGroup": "d37-transfer-12-condition"
    },
    {
      "questionId": "d37-transfer-13",
      "indexRevision": 1,
      "moduleId": "资料分析",
      "typeIds": [
        "on-period-scope"
      ],
      "knowledgeIds": [
        "on-period-scope",
        "on-period-scope/cumulative-to-quarter"
      ],
      "skillIds": [
        "cumulative-to-quarter"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "识别概念",
      "levelKey": "intro",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-13-material"
      ],
      "conditionGroup": "d37-transfer-13-condition"
    },
    {
      "questionId": "d37-transfer-14",
      "indexRevision": 1,
      "moduleId": "资料分析",
      "typeIds": [
        "on-period-scope"
      ],
      "knowledgeIds": [
        "on-period-scope",
        "on-period-scope/stock-disjoint-outflows"
      ],
      "skillIds": [
        "stock-disjoint-outflows"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "迁移运用",
      "levelKey": "practice",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-14-material"
      ],
      "conditionGroup": "d37-transfer-14-condition"
    },
    {
      "questionId": "d37-transfer-15",
      "indexRevision": 1,
      "moduleId": "资料分析",
      "typeIds": [
        "on-period-scope"
      ],
      "knowledgeIds": [
        "on-period-scope",
        "on-period-scope/rolling-window-in-out"
      ],
      "skillIds": [
        "rolling-window-in-out"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "检查边界",
      "levelKey": "advanced",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-15-material"
      ],
      "conditionGroup": "d37-transfer-15-condition"
    },
    {
      "questionId": "d37-transfer-16",
      "indexRevision": 1,
      "moduleId": "言语理解",
      "typeIds": [
        "t35-context-reading"
      ],
      "knowledgeIds": [
        "t35-context-reading",
        "t35-context-reading/complement-not-replacement"
      ],
      "skillIds": [
        "complement-not-replacement"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "识别概念",
      "levelKey": "intro",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-16-material"
      ],
      "conditionGroup": "d37-transfer-16-condition"
    },
    {
      "questionId": "d37-transfer-17",
      "indexRevision": 1,
      "moduleId": "言语理解",
      "typeIds": [
        "t35-context-reading"
      ],
      "knowledgeIds": [
        "t35-context-reading",
        "t35-context-reading/classification-purpose"
      ],
      "skillIds": [
        "classification-purpose"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "迁移运用",
      "levelKey": "practice",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-17-material"
      ],
      "conditionGroup": "d37-transfer-17-condition"
    },
    {
      "questionId": "d37-transfer-18",
      "indexRevision": 1,
      "moduleId": "言语理解",
      "typeIds": [
        "t35-context-reading"
      ],
      "knowledgeIds": [
        "t35-context-reading",
        "t35-context-reading/next-step-evidence-gap"
      ],
      "skillIds": [
        "next-step-evidence-gap"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "检查边界",
      "levelKey": "advanced",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-18-material"
      ],
      "conditionGroup": "d37-transfer-18-condition"
    },
    {
      "questionId": "d37-transfer-19",
      "indexRevision": 1,
      "moduleId": "判断推理",
      "typeIds": [
        "t35-spatial-transform"
      ],
      "knowledgeIds": [
        "t35-spatial-transform",
        "t35-spatial-transform/box-axis-length"
      ],
      "skillIds": [
        "box-axis-length"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "识别概念",
      "levelKey": "intro",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-19-material"
      ],
      "conditionGroup": "d37-transfer-19-condition"
    },
    {
      "questionId": "d37-transfer-20",
      "indexRevision": 1,
      "moduleId": "判断推理",
      "typeIds": [
        "t35-spatial-transform"
      ],
      "knowledgeIds": [
        "t35-spatial-transform",
        "t35-spatial-transform/rectangular-oblique-section"
      ],
      "skillIds": [
        "rectangular-oblique-section"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "迁移运用",
      "levelKey": "practice",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-20-material"
      ],
      "conditionGroup": "d37-transfer-20-condition"
    },
    {
      "questionId": "d37-transfer-21",
      "indexRevision": 1,
      "moduleId": "判断推理",
      "typeIds": [
        "t35-spatial-transform"
      ],
      "knowledgeIds": [
        "t35-spatial-transform",
        "t35-spatial-transform/central-symmetry-section"
      ],
      "skillIds": [
        "central-symmetry-section"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "检查边界",
      "levelKey": "advanced",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-21-material"
      ],
      "conditionGroup": "d37-transfer-21-condition"
    },
    {
      "questionId": "d37-transfer-22",
      "indexRevision": 1,
      "moduleId": "资料分析",
      "typeIds": [
        "t35-group-statistics"
      ],
      "knowledgeIds": [
        "t35-group-statistics",
        "t35-group-statistics/weight-by-count"
      ],
      "skillIds": [
        "weight-by-count"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "识别概念",
      "levelKey": "intro",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-22-material"
      ],
      "conditionGroup": "d37-transfer-22-condition"
    },
    {
      "questionId": "d37-transfer-23",
      "indexRevision": 1,
      "moduleId": "资料分析",
      "typeIds": [
        "t35-group-statistics"
      ],
      "knowledgeIds": [
        "t35-group-statistics",
        "t35-group-statistics/interval-mean-bounds"
      ],
      "skillIds": [
        "interval-mean-bounds"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "迁移运用",
      "levelKey": "practice",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-23-material"
      ],
      "conditionGroup": "d37-transfer-23-condition"
    },
    {
      "questionId": "d37-transfer-24",
      "indexRevision": 1,
      "moduleId": "资料分析",
      "typeIds": [
        "t35-group-statistics"
      ],
      "knowledgeIds": [
        "t35-group-statistics",
        "t35-group-statistics/paired-marginal-bounds"
      ],
      "skillIds": [
        "paired-marginal-bounds"
      ],
      "studySystems": [
        "fujian",
        "national"
      ],
      "trainingStage": "检查边界",
      "levelKey": "advanced",
      "difficulty": null,
      "provenanceId": "d37-original",
      "reviewId": "d38-practice-editorial-review-v1",
      "materialIds": [
        "d37-transfer-24-material"
      ],
      "conditionGroup": "d37-transfer-24-condition"
    }
  ],
  "provenance": [
    {
      "id": "d37-original",
      "kind": "original",
      "date": "2026-11-05",
      "examSource": null,
      "components": {
        "stems": "independently-authored",
        "materials": "independently-authored-fictional",
        "options": "independently-authored",
        "explanations": "independently-authored",
        "graphics": "none"
      },
      "basis": "本批原创，未使用外部题库或真实统计数据。"
    }
  ],
  "reviews": [
    {
      "id": "d38-practice-editorial-review-v1",
      "status": "editorial-reviewed",
      "date": "2026-11-05",
      "scope": [
        "d37-transfer-01",
        "d37-transfer-02",
        "d37-transfer-03",
        "d37-transfer-04",
        "d37-transfer-05",
        "d37-transfer-06",
        "d37-transfer-07",
        "d37-transfer-08",
        "d37-transfer-09",
        "d37-transfer-10",
        "d37-transfer-11",
        "d37-transfer-12",
        "d37-transfer-13",
        "d37-transfer-14",
        "d37-transfer-15",
        "d37-transfer-16",
        "d37-transfer-17",
        "d37-transfer-18",
        "d37-transfer-19",
        "d37-transfer-20",
        "d37-transfer-21",
        "d37-transfer-22",
        "d37-transfer-23",
        "d37-transfer-24"
      ],
      "previousReviewId": "d37-self-review-v1",
      "method": "24题逐项编辑复核；数学/逻辑另写核算脚本；仅本包与冻结v0.37基线作接线及旧指纹检查。",
      "limits": [
        "非盲审。",
        "未作考生试测、难度或区分度标定。",
        "不同材料/条件组不保证统计独立。",
        "未使用实际用户作答记录。",
        "不升级旧717题的审查等级。"
      ]
    }
  ]
};
  const C = window.STUDY_CONTENT;
  if (!C || !Array.isArray(C.questions) || !Array.isArray(C.lessons)) throw new Error("Missing STUDY_CONTENT");
  const errors = [], oldIds = new Set(C.questions.map(q => q.id));
  // Frozen v0.37 target contracts: reject unrelated lecture/path drift atomically.
  const targetSnapshots = {
  "multi-table": {
    "id": "multi-table",
    "category": "资料分析",
    "title": "多表联读：把对象、单位与分母对齐",
    "subtitle": "同一组表可以问总量、日均和证据边界。",
    "minutes": 30,
    "tags": [
      "多表联读",
      "单位换算",
      "日均量"
    ],
    "formula": "先定位表格与期间 → 换成同一单位 → 写出所求比值 → 检查结论范围。",
    "sections": [
      [
        "入门：先给每个数贴上对象和单位",
        "多表题先读表名、表头和脚注，确认对象、期间及单位，再定位数字。同一站点的服务件数、到访人次、运营天数是不同量，不能因为出现在同一行就互相替代。本站新材料用甲期、乙期两个统计期间，不暗示考试年份或真实地区统计。抄数时把“甲站、乙期、150件”写成完整短语，可在计算前抓住错行、错期和漏换单位。"
      ],
      [
        "入门：题干决定需要哪张表",
        "问甲站乙期服务量，只需到服务量表找150件；问乙站乙期每运营日平均服务量，则还要从第二表取22天，以198件÷22天=9件/天。不是每一道多表题都必须使用所有数字，额外带入无关的人次反而容易改变所求指标。先把目标写成一个有单位的式子，再找分子和分母所在的位置，比先把所有表加一遍更清楚。"
      ],
      [
        "入门：总量与日均量分别回答问题",
        "新材料甲站乙期150件、运营25天，日均6件；乙站198件、运营22天，日均9件。总量相差48件，日均相差3件/天，不能把两种差直接比较为同一指标。日均高也不自动等于服务质量高；题目没有满意度、业务难度或等待时间时，不应补出这些结论。比较前先说清问题要总量、每运营日还是每到访人次。"
      ],
      [
        "巩固：跨期总增幅先加总再计算",
        "甲期两站服务量为120+180=300件，乙期为150+198=348件，合计增长48÷300=16%。分别算甲增长25%、乙增长10%，再简单平均得到17.5%是错的，因为两站甲期规模不同。也可按甲期量120和180作权重得到同一结果；先加总是更直接的独立核对。这里已说明两站服务统计不重复，若对象重叠，应先去重而不是直接相加。"
      ],
      [
        "巩固：合并平均必须带回各自分母",
        "若指标明确定义为“乙期总服务量÷两站运营天数之和”，分母为25+22=47个站点运营日，结果348÷47约为7.40件/站日。不能把6和9直接平均成7.5，因为两站运营天数不同。“站日”把两个站在同一天运营计成两个单位，和全区域经过了多少个自然日不是一回事；题目若换定义，分母也要重新找。"
      ],
      [
        "巩固：保留计算口径再决定精度",
        "先保留348÷47这样的精确分式，最后按题目要求四舍五入到两位小数，得到7.40。过早把不同站点的日均值取整再汇总，会引入额外误差。若选项接近，核对是否单位相差100倍、是否把现期作了增长率分母，以及小数位是否足够；如果数字自身已是舍入统计，还要区别“按显示数计算”与“真实未舍入值一定如此”。"
      ],
      [
        "提升：人次不能直接恢复不同人数",
        "甲站100人次、乙站110人次，只说明累计到访210次；同一个人可以多次或跨站到访，所以不能直接说有210个不同自然人。若题目没有去重标识、每人最多到访次数或交集信息，人数不能唯一确定。服务件数也不等于人次，一次到访可能办理多件或没有办结；除非题干另给一一对应规则，不得把三种对象默认为同一个量。"
      ],
      [
        "提升：运营天数不能恢复具体日历交集",
        "甲站运营25天、乙站22天，并未给各自日期，不能直接算出两站共同运营多少个日历日。如果乙站22天都在甲站运营日内，交集可为22天；若乙期足够长且两站日期错开，也可不重合。材料没有乙期自然日总数，更不能自行套一个30天月份。应把“累计站点运营日47”与“日历并集、交集”分别建模，缺哪项就明确缺哪项。"
      ],
      [
        "提升：表内算术与表外结论分开",
        "两表能支持总量、同口径增长和明确分母的日均计算，但不能仅凭同时变化认定某项措施造成增长，也不能从到访多推断更受欢迎或质量更高。遇到信息不足，最好给两种都符合表格的情境，说明目标量为何能变，而不是空喊不能确定。本课新增一组基础双表，不代表已覆盖所有图表、复杂综合材料或真实考试难度。"
      ]
    ],
    "practice": [
      "q130",
      "q131",
      "q132",
      "q370",
      "q371",
      "q372",
      "q373",
      "q374",
      "q375"
    ],
    "sources": [
      "outline2026"
    ],
    "updated": "2026-11-05",
    "basis": "本站独立方法归纳与原创材料；大纲仅支持能力范围",
    "questionType": "多表定位与日均比较",
    "learningLevels": {
      "intro": {
        "label": "小白入门",
        "stage": "识别概念",
        "sections": [
          0,
          1,
          2
        ],
        "goal": "按对象期间定位并跨表取正确分母。",
        "questionIds": [
          "q370",
          "q371"
        ]
      },
      "practice": {
        "label": "基础巩固",
        "stage": "迁移运用",
        "sections": [
          3,
          4,
          5
        ],
        "goal": "合计总量、增长及加权日均，保留单位。",
        "questionIds": [
          "q372",
          "q373"
        ]
      },
      "advanced": {
        "label": "高手提升",
        "stage": "检查边界",
        "sections": [
          6,
          7,
          8
        ],
        "goal": "辨别人次、人数及日期交集的信息缺口。",
        "questionIds": [
          "q374",
          "q375"
        ]
      }
    }
  },
  "pn-compound-logic": {
    "id": "pn-compound-logic",
    "category": "判断推理",
    "title": "复合条件：联立、附加条件与反例",
    "subtitle": "原创专项候选；适用福建省考备考，不是真题出处、官方预测或难度标定。",
    "minutes": 25,
    "tags": [
      "条件链",
      "恰好",
      "排列约束",
      "反例"
    ],
    "questionType": "复合条件",
    "formula": "依据题干范围、条件与口径逐项核对",
    "sections": [
      [
        "识别：先确定论域",
        "入选题只涉及列明的五人，人数必须恰好满足。把条件与可选对象写在一起，不能为了满足一个条件另加题外对象。"
      ],
      [
        "识别：只在成立方向推出",
        "甲入选则乙入选，不表示乙入选则甲入选，也不表示甲未入选则乙未入选。否定后件才可逆否。"
      ],
      [
        "识别：恰好一项的两面",
        "丙丁恰好一人入选，既排除同时入选，也排除同时不入选。与总人数联立后，单条条件看不出的必然人选可能出现。"
      ],
      [
        "迁移：连续与先后分开",
        "丙紧挨着排在戊前面，要求位置差恰为1；甲在丁前面只限制先后，不要求相邻。明确区分后再排列。"
      ],
      [
        "迁移：附加条件不能改写旧条件",
        "乙在第二位后，原来的己在乙之前仍然有效，立即锁定己在第一位。后续推理始终保留全部原条件，不只使用新条件。"
      ],
      [
        "迁移：必然结论需排除反例",
        "找到一套可行安排只能证明可能，不能证明必然。可用分情况推导或穷尽枚举确认所有可行安排是否满足目标。"
      ],
      [
        "边界：当且仅当包含两向",
        "戊启用当且仅当甲未启用，可分别写成戊启用推出甲未启用，以及甲未启用推出戊启用；同时得到甲启用与戊启用互斥且必居其一。"
      ],
      [
        "边界：数量约束可缩小模型集",
        "增加恰有三项启用时，应保留所有符合三项的方案，而非只选择最先发现的一种；多个方案的公共部分才是必然结论。"
      ],
      [
        "边界：反例先合法再反驳",
        "要反驳“若P则Q”，必须找到满足全部原条件、同时P真Q假的方案。违反原条件的组合不能充当反例，P假的合法方案也不能反驳。"
      ]
    ],
    "practice": [
      "pn-compound-logic-01",
      "pn-compound-logic-02",
      "pn-compound-logic-03",
      "pn-compound-logic-04",
      "pn-compound-logic-05",
      "pn-compound-logic-06",
      "pn-compound-logic-07",
      "pn-compound-logic-08",
      "pn-compound-logic-09"
    ],
    "sources": [],
    "updated": "2026-11-05",
    "learningLevels": {
      "intro": {
        "label": "小白入门",
        "stage": "识别概念",
        "sections": [
          0,
          1,
          2
        ],
        "goal": "把恰好人数与蕴含、互斥条件联立",
        "title": "入门：识别概念",
        "questionIds": [
          "pn-compound-logic-01",
          "pn-compound-logic-02",
          "pn-compound-logic-03"
        ]
      },
      "practice": {
        "label": "基础巩固",
        "stage": "迁移运用",
        "sections": [
          3,
          4,
          5
        ],
        "goal": "在同一排列条件组上推导附加条件的结果",
        "title": "巩固：迁移运用",
        "questionIds": [
          "pn-compound-logic-04",
          "pn-compound-logic-05",
          "pn-compound-logic-06"
        ]
      },
      "advanced": {
        "label": "高手提升",
        "stage": "检查边界",
        "sections": [
          6,
          7,
          8
        ],
        "goal": "用可行模型与反例检查逆向推断和数量限制",
        "title": "提升：检查边界",
        "questionIds": [
          "pn-compound-logic-07",
          "pn-compound-logic-08",
          "pn-compound-logic-09"
        ]
      }
    },
    "versionNote": "原创专项；同一材料/条件组内题目相关，题数不等于独立测量样本。"
  },
  "pn-share-scope": {
    "id": "pn-share-scope",
    "category": "资料分析",
    "title": "比重口径：两期、结构与重复计数",
    "subtitle": "原创专项候选；适用福建省考备考，不是真题出处、官方预测或难度标定。",
    "minutes": 25,
    "tags": [
      "现期比重",
      "百分点",
      "结构效应",
      "交集去重"
    ],
    "questionType": "比重口径",
    "formula": "依据题干范围、条件与口径逐项核对",
    "sections": [
      [
        "识别：先写部分和总体",
        "比重的分子是所问部分，分母是包含该部分的同口径总体。部分的增幅、当地办结率与该部分占全区比重是不同指标。"
      ],
      [
        "识别：百分点是比重直接作差",
        "比重从30%到36%，增加6个百分点；相对原比重增长20%。题目问哪种变化，就保持对应单位。"
      ],
      [
        "识别：同口径才能跨期",
        "两期比较需要对象和分类规则可比。材料已经说明互斥、穷尽或各期同口径后，才能按题设相减或汇总；未知条件不能自行补入。"
      ],
      [
        "迁移：总体率按分母加权",
        "全区办结率等于各地区办结数之和除以受理数之和，不能直接平均两个地区的办结率，除非分母相等。"
      ],
      [
        "迁移：区分实际与固定结构",
        "把各地区本期比率放在上期受理数权重下得到的是题设假定的固定结构结果，不是本期真实总体率。说明权重保持哪一期。"
      ],
      [
        "迁移：正确变化可被结构抵消",
        "各地区比率都上升时，总体率的变化还取决于受理量在地区间的分布。不能只看局部变化就认定总体上升同样的百分点。"
      ],
      [
        "边界：合计先判断是否重复",
        "两个站点的完成量若都含共同完成任务，直接相加会重复计算交集。至少由一个站点完成的数量为两站点量之和减共同量。"
      ],
      [
        "边界：属于甲而不属于乙",
        "甲参与而乙未参与等于甲所列数量减共同完成量。在所比较的甲乙两组之间，至少一个、恰好一个、两者都有对应不同集合，不能据此判断未列出的其他组。"
      ],
      [
        "边界：数量增幅不等于比重变化",
        "部分增长仍可能导致比重下降：总量增长更快即可。可以分别算两期比重，也可以比较部分与总体增速，注意后者判断方向而非直接给百分点差。"
      ]
    ],
    "practice": [
      "pn-share-scope-01",
      "pn-share-scope-02",
      "pn-share-scope-03",
      "pn-share-scope-04",
      "pn-share-scope-05",
      "pn-share-scope-06",
      "pn-share-scope-07",
      "pn-share-scope-08",
      "pn-share-scope-09"
    ],
    "sources": [],
    "updated": "2026-11-05",
    "learningLevels": {
      "intro": {
        "label": "小白入门",
        "stage": "识别概念",
        "sections": [
          0,
          1,
          2
        ],
        "goal": "区分现期比重、百分点变化和相对增幅",
        "title": "入门：识别概念",
        "questionIds": [
          "pn-share-scope-01",
          "pn-share-scope-02",
          "pn-share-scope-03"
        ]
      },
      "practice": {
        "label": "基础巩固",
        "stage": "迁移运用",
        "sections": [
          3,
          4,
          5
        ],
        "goal": "按分母合并地区，并检验固定权重与真实结构",
        "title": "巩固：迁移运用",
        "questionIds": [
          "pn-share-scope-04",
          "pn-share-scope-05",
          "pn-share-scope-06"
        ]
      },
      "advanced": {
        "label": "高手提升",
        "stage": "检查边界",
        "sections": [
          6,
          7,
          8
        ],
        "goal": "去除重复计数后比较两期占比与增长",
        "title": "提升：检查边界",
        "questionIds": [
          "pn-share-scope-07",
          "pn-share-scope-08",
          "pn-share-scope-09"
        ]
      }
    },
    "versionNote": "原创专项；同一材料/条件组内题目相关，题数不等于独立测量样本。"
  },
  "on-source-reading": {
    "id": "on-source-reading",
    "category": "言语理解",
    "title": "多来源阅读：把立场、用途与版本分开",
    "subtitle": "原创专项训练；适合福建省考备考，不表示福建真题或完整考纲覆盖。",
    "minutes": 30,
    "tags": [
      "信息任务",
      "跨来源互证",
      "版本适用",
      "证据边界"
    ],
    "questionType": "多来源阅读",
    "formula": "对象＋任务＋范围＋证据状态",
    "sections": [
      [
        "先认文本的身份",
        "先区分报告、建议、讨论纪要和执行记录。报告中引用他人的说法不一定是作者立场；会议接受某个方案，也不等于该方案已经实施。阅读时给每一项主张注明是谁说、针对什么对象、处于什么状态。"
      ],
      [
        "分歧先看是否在回答同一问题",
        "两份材料分别谈保存历史和当前使用，未必相互否定。只有主体、对象、时期和评价标准相同，且判断不能同时成立时，才构成实质冲突。不要用相反的表面词语直接给观点判对立。"
      ],
      [
        "保留限定再概括共同立场",
        "共同立场应同时获得两份材料支持，不是把各自的全部要求混成一句。尤其核对所有与部分、保存与展出、当前操作与历史证据。正面表述也必须保留适用条件。"
      ],
      [
        "把新情境逐项接回原文",
        "设问增加编辑动作、具体时间或设备状态时，先找原文对应条件，再分开判断每个动作是否满足。若一项处理同时违背两条要求，不要只找到第一处问题便停止核对。"
      ],
      [
        "为具体解说选择对应证据",
        "母版存在只能帮助追溯，不能自动证明对某个片段的全部解释。活动记录、时间和片段位置相互对应，才更能支持具体工序判断。证据有用与证据足以支持某个结论是不同问题。"
      ],
      [
        "版本判断用事件时点与对象状态",
        "比较旧记录时，应确定事件发生时对象的状态，再匹配当时适用规则。不要以今天的状态代替过去，也不要仅看纸张新旧或印刷日期。只评价题目给出的维度，不扩大成全面合规判断。"
      ],
      [
        "把认可、实施和效果分三层",
        "签署方案可证明认可，现场记录可帮助证明实施，使用检查才可能支持效果。不同层次需要不同证据。不能凭认可倒推出上线，也不能因为没有效果证据就断言方案一定失败。"
      ],
      [
        "允许材料有限而结论也有限",
        "保留母版不代表现场已被完整记录；旧版留档不代表所有旧记录可靠。正确选项往往只是明确已知与未知的边界，但不要机械偏爱保守语气，明确给出的事实仍应承认。"
      ],
      [
        "复盘留下两条证据链",
        "每题写出正确项对应的段落，再写错项改动了哪种关系。若是跨来源题，应至少核对相关来源各一处依据。同组共材料题有相关性，不能把三题全对当成三个独立能力测量。"
      ]
    ],
    "practice": [
      "on-source-reading-01",
      "on-source-reading-02",
      "on-source-reading-03",
      "on-source-reading-04",
      "on-source-reading-05",
      "on-source-reading-06",
      "on-source-reading-07",
      "on-source-reading-08",
      "on-source-reading-09"
    ],
    "sources": [],
    "updated": "2026-11-05",
    "learningLevels": {
      "intro": {
        "label": "小白入门",
        "stage": "识别概念",
        "sections": [
          0,
          1,
          2
        ],
        "goal": "先分对象、用途与版本，再判断两份说法是否冲突",
        "title": "入门：识别概念",
        "questionIds": [
          "on-source-reading-01",
          "on-source-reading-04",
          "on-source-reading-07"
        ]
      },
      "practice": {
        "label": "基础巩固",
        "stage": "迁移运用",
        "sections": [
          3,
          4,
          5
        ],
        "goal": "对照来源、设备状态和事件时间，为具体判断找证据",
        "title": "基础：迁移运用",
        "questionIds": [
          "on-source-reading-02",
          "on-source-reading-05",
          "on-source-reading-08"
        ]
      },
      "advanced": {
        "label": "高手提升",
        "stage": "检查边界",
        "sections": [
          6,
          7,
          8
        ],
        "goal": "分清认可、实施和成效，不把局部证据外推为整体可靠",
        "title": "提高：检查边界",
        "questionIds": [
          "on-source-reading-03",
          "on-source-reading-06",
          "on-source-reading-09"
        ]
      }
    },
    "versionNote": "原创专项；共材料题相关，不把多个设问当独立测量样本。"
  },
  "on-period-scope": {
    "id": "on-period-scope",
    "category": "资料分析",
    "title": "期间口径：累计、存量与滚动窗口",
    "subtitle": "原创专项训练；适合福建省考备考，不表示福建真题或完整考纲覆盖。",
    "minutes": 30,
    "tags": [
      "累计与当期",
      "季度同比",
      "存量与流量",
      "滚动窗口",
      "日均边界"
    ],
    "questionType": "口径综合",
    "formula": "累计差＝当期；期末＝期初＋流入−流出；滚动差＝新增日−移出日",
    "sections": [
      [
        "先标出数字覆盖的时间段",
        "上半年累计包括第一季度，第三季度当期只覆盖7至9月。求当期量先用同一年相邻累计量相减，求同比再与上一年同一当期比较。不要让表头相似掩盖时间范围的差异。"
      ],
      [
        "存量等式逐期接起来",
        "期末待办等于期初待办加新收减办结，前提是没有撤销、转出或其他变化。办结量可能超过本期新收，因为也可以处理期初待办；这不等于办结占比应超过100%。"
      ],
      [
        "相邻滚动窗口消去重叠部分",
        "2日至8日减1日至7日，留下第8日减第1日。差值表示新增日与移出日的差，而非新增日的总量。先把两个日期集合写出来，再相减，能避免在连续窗口中重复累计。"
      ],
      [
        "还原两个基数后再算增长率",
        "先分别求今年和去年第三季度完成量，再以去年的第三季度为分母。累计同比通常不能直接代替当期同比，增长量同样要区分累计与当期。单位为千件时，增长量也保留千件。"
      ],
      [
        "按题设定义选择分母",
        "季度可处理工单包含期初待办与本季度新收，办结占比应使用这个合计。不要凭平时对办结率的印象换一个分母。真实统计可能有不同定义，本课只按题设明确口径训练。"
      ],
      [
        "新增条件能补足滚动窗口的缺口",
        "已知新增日与移出日的差，再给出移出日，就能求新增日。随后将已有区间与缺少的单日拼成不重叠合计。相互重叠的两个累计数直接相加会重复计算共同日期。"
      ],
      [
        "全年增速不是两半年增速简单平均",
        "全年同比以全年基期量为权重合成两个半年的变化；只有特定条件才与算术平均一致。判断高低百分点时先求两增速，再相减；百分比与百分点不交换。"
      ],
      [
        "时点记录不足以恢复日均路径",
        "月末存量只给出几个时点。相同的月收办总量若发生在不同日期，会造成不同的每日待办，因此不能据此求精确日均。期初与期末平均也需额外的变化条件，不是通用公式。"
      ],
      [
        "自查用单位、集合与回代",
        "数字题至少检查单位和分母，再把结果放回原等式。滚动窗口题用日期集合检查重叠；存量题核对期末不为负。题设全部虚构，算对模型不代表获得任何真实业务预测。"
      ]
    ],
    "practice": [
      "on-period-scope-01",
      "on-period-scope-02",
      "on-period-scope-03",
      "on-period-scope-04",
      "on-period-scope-05",
      "on-period-scope-06",
      "on-period-scope-07",
      "on-period-scope-08",
      "on-period-scope-09"
    ],
    "sources": [],
    "updated": "2026-11-05",
    "learningLevels": {
      "intro": {
        "label": "小白入门",
        "stage": "识别概念",
        "sections": [
          0,
          1,
          2
        ],
        "goal": "分清累计、存量与滚动窗口",
        "title": "入门：识别概念",
        "questionIds": [
          "on-period-scope-01",
          "on-period-scope-04",
          "on-period-scope-07"
        ]
      },
      "practice": {
        "label": "基础巩固",
        "stage": "迁移运用",
        "sections": [
          3,
          4,
          5
        ],
        "goal": "还原当期量，对齐分母，再求同比或占比",
        "title": "基础：迁移运用",
        "questionIds": [
          "on-period-scope-02",
          "on-period-scope-05",
          "on-period-scope-09"
        ]
      },
      "advanced": {
        "label": "高手提升",
        "stage": "检查边界",
        "sections": [
          6,
          7,
          8
        ],
        "goal": "检查日均是否可知，别把窗口差额当单日量",
        "title": "提高：检查边界",
        "questionIds": [
          "on-period-scope-03",
          "on-period-scope-06",
          "on-period-scope-08"
        ]
      }
    },
    "versionNote": "原创专项；共材料题相关，不把多个设问当独立测量样本。"
  },
  "t35-context-reading": {
    "category": "言语理解",
    "title": "长语境辨析：概念范围与跨段照应",
    "questionType": "语篇阅读",
    "formula": "中心任务＋概念范围＋段落作用＋结论边界",
    "tags": [
      "长语境",
      "概念辨析",
      "段落作用",
      "细节限定"
    ],
    "sections": [
      [
        "识别：先给全文写一句任务",
        "文章里的活动、接口、关闭只是话题词，中心要看作者希望纠正什么判断。先用“作者要区分什么”写一句话，再检查每段是否支持它。不能用第一段被反驳的方案代替全文立场。"
      ],
      [
        "识别：相同词语可能指不同层次",
        "活动次数描述投入，持续使用描述结果；接口规定配合条件，不必规定全部风格；完成修复也不等于满足所有开放条件。先标出词语的范围，不凭“统一”“完成”等表面词判断。"
      ],
      [
        "识别：转折不是全盘否定",
        "“可以……但不能……”通常保留前半部分的作用，再限制后半部分的推论。把限制理解成完全无用，或只记作用而丢掉限制，都会改写作者立场。"
      ],
      [
        "迁移：例子在支持哪一步",
        "先找例子前后的抽象判断。舞台占地例子不是讨论审美，而是说明追求投入可能妨碍使用。论据即使涉及很多事物，也只需为当前推理的关键关系提供支撑。"
      ],
      [
        "迁移：把新方案逐项接回原文",
        "判断公告、记录方案或制作办法时，把每个动作分别对照文本条件。一项方案可能同时具有可取与越界部分，不能凭其中一句正确就认定整体正确。"
      ],
      [
        "迁移：跨段对应要保留任务顺序",
        "下一步工作应承接结尾尚未完成的任务。若文章刚提出调查需求，下文通常先说明调查，而不是跳到全部采购与最终效果。推断应有明确衔接，不补造作者未承诺的事件。"
      ],
      [
        "边界：样品与全体不能直接互换",
        "一组样品通过某项检查，只支持该组、该项检查范围内的结论。既不能扩为全部作品合格，也不能因缺其他检验就断言全部不合格。"
      ],
      [
        "边界：辨词要回到语境中的变化",
        "“隐含”与“没有”不同，“可交流”与“只能一种做法”也不同。近义改写是否成立，取决于保留了哪些关系与范围，不依赖语气听起来是否积极或谨慎。"
      ],
      [
        "复盘：为四个选项分别找改动点",
        "正确项写出对应段落；错项指出它改变了主体、范围、层次还是事实状态。共用材料四题相互相关，不把四题全对等同四次独立测量。"
      ]
    ],
    "id": "t35-context-reading",
    "subtitle": "原创专项训练；以福建省考备考为主要使用方向，不是真题、官方考纲或考频判断。",
    "minutes": 35,
    "practice": [
      "t35-context-reading-01",
      "t35-context-reading-02",
      "t35-context-reading-03",
      "t35-context-reading-04",
      "t35-context-reading-05",
      "t35-context-reading-06",
      "t35-context-reading-07",
      "t35-context-reading-08",
      "t35-context-reading-09",
      "t35-context-reading-10",
      "t35-context-reading-11",
      "t35-context-reading-12"
    ],
    "sources": [],
    "updated": "2026-11-05",
    "learningLevels": {
      "intro": {
        "label": "小白入门",
        "stage": "识别概念",
        "sections": [
          0,
          1,
          2
        ],
        "goal": "识别中心、概念层次与保留立场",
        "title": "入门：识别概念",
        "questionIds": [
          "t35-context-reading-01",
          "t35-context-reading-05",
          "t35-context-reading-09",
          "t35-context-reading-10"
        ]
      },
      "practice": {
        "label": "基础巩固",
        "stage": "迁移运用",
        "sections": [
          3,
          4,
          5
        ],
        "goal": "依据段落任务评价新方案与例证",
        "title": "基础：迁移运用",
        "questionIds": [
          "t35-context-reading-02",
          "t35-context-reading-03",
          "t35-context-reading-06",
          "t35-context-reading-11"
        ]
      },
      "advanced": {
        "label": "高手提升",
        "stage": "检查边界",
        "sections": [
          6,
          7,
          8
        ],
        "goal": "识别样本范围、语义改写和下文边界",
        "title": "提升：边界反例",
        "questionIds": [
          "t35-context-reading-04",
          "t35-context-reading-07",
          "t35-context-reading-08",
          "t35-context-reading-12"
        ]
      }
    },
    "versionNote": "原创专项；教学分层非难度，共材料题不视为独立测量样本。"
  },
  "t35-spatial-transform": {
    "category": "判断推理",
    "title": "空间变换：水平轴翻滚与平面截面",
    "questionType": "空间推理",
    "formula": "固定坐标更新面位置；截棱求点、连面成边",
    "tags": [
      "立方体翻滚",
      "操作次序",
      "相邻面定向",
      "平面截面"
    ],
    "sections": [
      [
        "识别：固定方向，不随物体转动",
        "把上、下、东、西、北、南看成桌面的六个固定位置，甲乙等是随物体移动的标记。题目给出位置映射后，逐个搬动标记；不要让东、西跟着正方体一起转。"
      ],
      [
        "识别：问哪个位置，就追踪哪个来源",
        "一次E后上面来自原西面，一次N后北面来自原上面。先明确目标位置，再找来源，通常比在脑中旋转整个物体更稳。题间若规定重置，就不能继承前题状态。"
      ],
      [
        "识别：截面形状不是透视轮廓",
        "正方形斜看像平行四边形，真实形状仍由平面内边长和角度决定。坐标固定一个量时，其余两个方向是否独立、是否等长，可以直接判断基础截面。"
      ],
      [
        "迁移：复合操作逐步更新",
        "第二步必须用第一步后的状态。沿不同轴的翻滚一般不能交换次序，互逆操作中间夹了别的操作也不能随意抵消。可用六格状态表逐步登记。"
      ],
      [
        "迁移：先求与棱的交点",
        "截面顶点来自平面与正方体棱的交点。每条棱有两个坐标固定在0或2，代入切面条件求第三个坐标，保留0到2内的结果，并把同一个顶点去重。"
      ],
      [
        "迁移：交点不等于任意连线",
        "相邻截面顶点应在同一个原立方体面上连接。六个交点要按轮廓顺序连接，再比较相邻边长与内角；随意把对角点连起来会产生虚假的边和交叉。"
      ],
      [
        "边界：一个面复位不代表全部复位",
        "顶面相同仍可能绕竖直方向转过角度。刚性正方体两个相邻且方向确定的面通常能够锁定姿态；相对两面则不能起同样作用，题设也不允许镜面反射。"
      ],
      [
        "边界：边数相同不等于正多边形",
        "中心斜截面可以是正六边形，平移后仍可能六边但不等边。必须检验边长和角度，不能把一个特殊位置的性质推广给所有平行切面。"
      ],
      [
        "边界：上界与可达到要同时证明",
        "每个立方体面至多贡献一条非退化截面边，因此边数不超过6；还需给出实际六边形截面才证明最大值为6。本课没有覆盖所有复杂遮挡、图案朝向或任意多面体。"
      ]
    ],
    "id": "t35-spatial-transform",
    "subtitle": "原创专项训练；以福建省考备考为主要使用方向，不是真题、官方考纲或考频判断。",
    "minutes": 35,
    "practice": [
      "t35-spatial-transform-01",
      "t35-spatial-transform-02",
      "t35-spatial-transform-03",
      "t35-spatial-transform-04",
      "t35-spatial-transform-05",
      "t35-spatial-transform-06",
      "t35-spatial-transform-07",
      "t35-spatial-transform-08",
      "t35-spatial-transform-09",
      "t35-spatial-transform-10",
      "t35-spatial-transform-11",
      "t35-spatial-transform-12"
    ],
    "sources": [],
    "updated": "2026-11-05",
    "learningLevels": {
      "intro": {
        "label": "小白入门",
        "stage": "识别概念",
        "sections": [
          0,
          1,
          2
        ],
        "goal": "读懂方向映射和基础截面真实形状",
        "title": "入门：识别概念",
        "questionIds": [
          "t35-spatial-transform-01",
          "t35-spatial-transform-02",
          "t35-spatial-transform-07",
          "t35-spatial-transform-08"
        ]
      },
      "practice": {
        "label": "基础巩固",
        "stage": "迁移运用",
        "sections": [
          3,
          4,
          5
        ],
        "goal": "追踪复合翻滚并枚举切面交点",
        "title": "基础：迁移运用",
        "questionIds": [
          "t35-spatial-transform-03",
          "t35-spatial-transform-04",
          "t35-spatial-transform-09",
          "t35-spatial-transform-10"
        ]
      },
      "advanced": {
        "label": "高手提升",
        "stage": "检查边界",
        "sections": [
          6,
          7,
          8
        ],
        "goal": "区分局部复位、正多边形与最大边数",
        "title": "提升：边界反例",
        "questionIds": [
          "t35-spatial-transform-05",
          "t35-spatial-transform-06",
          "t35-spatial-transform-11",
          "t35-spatial-transform-12"
        ]
      }
    },
    "versionNote": "原创专项；教学分层非难度，共材料题不视为独立测量样本。"
  },
  "t35-group-statistics": {
    "category": "资料分析",
    "title": "分组统计：结构权重与信息边界",
    "questionType": "分组资料综合",
    "formula": "合计量÷合计份数；固定结构与实际结构分开",
    "tags": [
      "加权平均",
      "结构变化",
      "区间分组",
      "中位数",
      "百分点",
      "样本边界"
    ],
    "sections": [
      [
        "识别：分组均值先还原总量",
        "每组平均数乘该组数量得到该组总量，再合并后除以总数量。数量不同的两组不能直接平均均值；满意率也要按有效问卷数加权，而非把两个百分数相加除二。"
      ],
      [
        "识别：端点决定哪组计入",
        "读到“严格少于4”时，t=4不在范围中。表中区间若含左不含右，边界值归下一组。累计数量与中位数位置都必须沿相同端点规则处理。"
      ],
      [
        "识别：中位数用秩位置，不用组中点",
        "100个数据的中位数取第50、51位平均。若两位都在同一区间，平均也在该区间；但没有组内明细，不能把区间中点当作精确中位数或均值。"
      ],
      [
        "迁移：总体方向同时受组内与权重影响",
        "各组均值都下降时，总体仍可能上升，因为较慢组的份额可能增大。先分别计算实际总体，再解释组内变化与结构变化，不能只看两个方向词便判矛盾。"
      ],
      [
        "迁移：固定权重是一个明确的比较构造",
        "把乙期组内数值配上甲期权重，所得是统一结构下的比较值，不是乙期实际平均，也不是重新观测了甲期对象。计算时应明确替换的是数值、权重还是两者。"
      ],
      [
        "迁移：新增样本同步更新分子分母",
        "加入新订单后，满足条件的数量和总数量都可能变化。满意率差用百分点表示，相对增幅另除以原比例；单位写对是避免误用公式的第一步。"
      ],
      [
        "边界：用区间端点求可达到的范围",
        "各组下端点加权给出均值下界，上端点给出上界。若某些上端点不可取且该组人数非零，合计上界也不可取。精确界限必须说明等号是否能出现。"
      ],
      [
        "边界：平均改善不是逐人改善",
        "分组均值不提供每一件的耗时，也不能唯一识别变化原因。不同批次的满意数之差不等于转变态度的人数；即使同批人，净差也不自动等于单向改变总数。"
      ],
      [
        "复盘：样本比较不要冒充全体结论",
        "两轮样本结构不同，可使用固定权重作说明，但未给总体结构和代表性时不能称为真实总体校正。虚构材料仅用于方法训练，不是现实机构的绩效或民意结论。"
      ]
    ],
    "id": "t35-group-statistics",
    "subtitle": "原创专项训练；以福建省考备考为主要使用方向，不是真题、官方考纲或考频判断。",
    "minutes": 35,
    "practice": [
      "t35-group-statistics-01",
      "t35-group-statistics-02",
      "t35-group-statistics-03",
      "t35-group-statistics-04",
      "t35-group-statistics-05",
      "t35-group-statistics-06",
      "t35-group-statistics-07",
      "t35-group-statistics-08",
      "t35-group-statistics-09",
      "t35-group-statistics-10",
      "t35-group-statistics-11",
      "t35-group-statistics-12"
    ],
    "sources": [],
    "updated": "2026-11-05",
    "learningLevels": {
      "intro": {
        "label": "小白入门",
        "stage": "识别概念",
        "sections": [
          0,
          1,
          2
        ],
        "goal": "匹配总量分母、端点和秩位置",
        "title": "入门：识别概念",
        "questionIds": [
          "t35-group-statistics-01",
          "t35-group-statistics-05",
          "t35-group-statistics-06",
          "t35-group-statistics-09"
        ]
      },
      "practice": {
        "label": "基础巩固",
        "stage": "迁移运用",
        "sections": [
          3,
          4,
          5
        ],
        "goal": "比较实际结构与固定权重并更新统计口径",
        "title": "基础：迁移运用",
        "questionIds": [
          "t35-group-statistics-02",
          "t35-group-statistics-03",
          "t35-group-statistics-08",
          "t35-group-statistics-10"
        ]
      },
      "advanced": {
        "label": "高手提升",
        "stage": "检查边界",
        "sections": [
          6,
          7,
          8
        ],
        "goal": "检验均值界限、个体推断和总体外推",
        "title": "提升：边界反例",
        "questionIds": [
          "t35-group-statistics-04",
          "t35-group-statistics-07",
          "t35-group-statistics-11",
          "t35-group-statistics-12"
        ]
      }
    },
    "versionNote": "原创专项；教学分层非难度，共材料题不视为独立测量样本。"
  }
};
  const canonical = x => x === null || typeof x !== 'object' ? JSON.stringify(x) : Array.isArray(x) ? '[' + x.map(canonical).join(',') + ']' : '{' + Object.keys(x).sort().map(k => JSON.stringify(k) + ':' + canonical(x[k])).join(',') + '}';
  const normalized = x => x.normalize('NFKC').replace(/[\p{P}\p{Z}\s]/gu, '');
  const stems = new Set(C.questions.map(q => normalized(q.stem)));
  for (const [id, expected] of Object.entries(targetSnapshots)) if (canonical(C.lessons.find(l => l.id === id)) !== canonical(expected)) errors.push('Target drift: ' + id);

  const oldLessons = new Map(C.lessons.map(l => [l.id, l]));
  const newIds = new Set(), materials = new Map(B.materials.map(m => [m.id, m]));
  const byLesson = new Map();
  for (const q of B.questions) {
    if (stems.has(normalized(q.stem))) errors.push("Stem conflict: " + q.id);
    stems.add(normalized(q.stem));
    if (oldIds.has(q.id) || newIds.has(q.id)) errors.push("Question ID conflict: " + q.id);
    newIds.add(q.id);
    const row = B.index.find(x => x.questionId === q.id), lesson = oldLessons.get(q.lesson);
    if (!lesson || !row || !lesson.learningLevels?.[row.levelKey]) errors.push("Missing target lesson/level: " + q.id);
    if (q.options.length !== 4 || new Set(q.options).size !== 4 || q.optionReviews.length !== 4 || !Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3 || q.explanation !== q.optionReviews[q.answer]) errors.push("Invalid answer/options: " + q.id);
    if (!q.materialIds.every(id => materials.has(id) && q.stem.includes(materials.get(id).text))) errors.push("Missing material: " + q.id);
    if (!byLesson.has(q.lesson)) byLesson.set(q.lesson, []);
    byLesson.get(q.lesson).push(q);
  }
  if (errors.length) throw new Error("Diagnostic candidate rejected:\n" + errors.join("\n"));
  const lessons = C.lessons.map(lesson => {
    const additions = byLesson.get(lesson.id);
    if (!additions) return lesson;
    const learningLevels = Object.fromEntries(Object.entries(lesson.learningLevels).map(([key, guide]) => [key, {
      ...guide, questionIds: [...guide.questionIds, ...additions.filter(q => B.index.find(r => r.questionId === q.id).levelKey === key).map(q => q.id)]
    }]));
    return {...lesson, practice: [...lesson.practice, ...additions.map(q => q.id)], learningLevels};
  });
  window.STUDY_CONTENT = {...C, lessons, questions: [...C.questions, ...B.questions]};
})();
