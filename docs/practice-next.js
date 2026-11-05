"use strict";
// Candidate only: integrate AFTER focused-methods.js and BEFORE coverage-map.js, following editorial review.
// No storage, network, deployment or changes to old questions. Common text is embedded once per stem.
(() => {
 const C = window.STUDY_CONTENT;
 if (!C || !Array.isArray(C.questions) || !Array.isArray(C.lessons)) throw new Error("Load STUDY_CONTENT first");
 const data = {
  "packageVersion": 1,
  "date": "2026-11-05",
  "status": "candidate-not-integrated",
  "summary": "27道原创候选题，3个知识专题，三种训练目标各9题；另含3组专题引用，不是完整模拟卷。",
  "limits": [
    "非历年真题，非官方预测，无真实考试年份、题号或标定难度。",
    "语义复核和程序检查不能取代考生试测或专家审定。",
    "资料全为虚构教学数据；没有外部统计事实或题目转载。",
    "材料嵌入题干以兼容当前渲染，materialGroup只用于关联和去重分析。"
  ],
  "lessons": [
    {
      "id": "pn-context-contrast",
      "category": "言语理解",
      "title": "语境辨析：范围、程度与句义约束",
      "subtitle": "原创专项候选；适用福建省考备考，不是真题出处、官方预测或难度标定。",
      "minutes": 25,
      "tags": [
        "语境照应",
        "近义表达",
        "程度",
        "否定范围"
      ],
      "questionType": "语境辨析",
      "formula": "依据题干范围、条件与口径逐项核对",
      "sections": [
        [
          "识别：把动作和结果对上",
          "说明事实、改变事实、推测事实不是同一动作。先标出材料已经完成的动作，再看空缺所指向的工作；不要只因某词语与主题相关就选它。"
        ],
        [
          "识别：区分主动限定与消极回避",
          "暂不作判断可能源于证据不足，也可能源于拒绝回应。题干说明原因后，选项应保留这一原因，不能把审慎直接说成推诿。"
        ],
        [
          "识别：近义表达还要看对象",
          "校正设备读数针对测量偏差，核验记录针对真实性或准确性，补充材料针对信息缺口。相关动作可能先后进行，但不能在一个明确的具体语境中互相顶替。"
        ],
        [
          "迁移：两空互相校验",
          "先用最明确的一空排除，再把候选整组放回。两个词分别看似合理，不代表它们组成的关系符合原文；尤其留意不是、而是、尚未等限制。"
        ],
        [
          "迁移：保留程度和阶段",
          "发现线索、形成假说、核实事实、证明因果对应不同的证据强度。材料只到前一步时，不把后一步当作已经完成；反过来也不要弱化题干明说的成果。"
        ],
        [
          "迁移：语体不替代准确性",
          "表达简洁不等于省去条件，语气坚定不等于把可能写成必然。精简和转述应保留限定对象、适用时期与判断强度。"
        ],
        [
          "边界：否定词的作用范围",
          "不是所有都符合，只能说明至少有一个不符合；不能直接改写成所有都不符合。部分对象得到验证，也不能推出其余对象一定无效。"
        ],
        [
          "边界：谨慎不等于全盘否定",
          "尚不能证明某方法普遍适用，可能只是样本或场景不足。既不要外推为普遍有效，也不要倒过来判为普遍无效。"
        ],
        [
          "边界：多来源分歧先对齐口径",
          "两份报告的时间、对象、分母不同，数字不一致未必互相否定。仅凭差异不能判定哪一方造假或错误；先检查可比性，再讨论结论。"
        ]
      ],
      "practice": [
        "pn-context-contrast-01",
        "pn-context-contrast-02",
        "pn-context-contrast-03",
        "pn-context-contrast-04",
        "pn-context-contrast-05",
        "pn-context-contrast-06",
        "pn-context-contrast-07",
        "pn-context-contrast-08",
        "pn-context-contrast-09"
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
            "pn-context-contrast-01",
            "pn-context-contrast-02",
            "pn-context-contrast-03"
          ],
          "goal": "识别词语对应的具体动作与对象"
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
            "pn-context-contrast-04",
            "pn-context-contrast-05",
            "pn-context-contrast-06"
          ],
          "goal": "把两空放入完整语境，保留程度和适用范围"
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
            "pn-context-contrast-07",
            "pn-context-contrast-08",
            "pn-context-contrast-09"
          ],
          "goal": "检验转述是否改变否定范围、证据强度或比较口径"
        }
      }
    },
    {
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
          "title": "入门：识别概念",
          "stage": "识别概念",
          "sections": [
            0,
            1,
            2
          ],
          "questionIds": [
            "pn-compound-logic-01",
            "pn-compound-logic-02",
            "pn-compound-logic-03"
          ],
          "goal": "把恰好人数与蕴含、互斥条件联立"
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
            "pn-compound-logic-04",
            "pn-compound-logic-05",
            "pn-compound-logic-06"
          ],
          "goal": "在同一排列条件组上推导附加条件的结果"
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
            "pn-compound-logic-07",
            "pn-compound-logic-08",
            "pn-compound-logic-09"
          ],
          "goal": "用可行模型与反例检查逆向推断和数量限制"
        }
      }
    },
    {
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
          "title": "入门：识别概念",
          "stage": "识别概念",
          "sections": [
            0,
            1,
            2
          ],
          "questionIds": [
            "pn-share-scope-01",
            "pn-share-scope-02",
            "pn-share-scope-03"
          ],
          "goal": "区分现期比重、百分点变化和相对增幅"
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
            "pn-share-scope-04",
            "pn-share-scope-05",
            "pn-share-scope-06"
          ],
          "goal": "按分母合并地区，并检验固定权重与真实结构"
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
            "pn-share-scope-07",
            "pn-share-scope-08",
            "pn-share-scope-09"
          ],
          "goal": "去除重复计数后比较两期占比与增长"
        }
      }
    }
  ],
  "questions": [
    {
      "id": "pn-context-contrast-01",
      "lesson": "pn-context-contrast",
      "stem": "某份公示中的人数已经逐项核实，数值无误；争议源于“登记人数”和“实际到场人数”被读者当成了同一口径。发布者需要（ ）两种口径的差别，而不是重新调查已经确认的人数。",
      "options": [
        "补足",
        "说明",
        "修正",
        "预测"
      ],
      "answer": 1,
      "explanation": "争议在于读者未区分统计口径，任务是把已有口径解释清楚，因此用“说明”；题干未表明数据缺失、错误或有待预测。",
      "optionReviews": [
        "“补足”指填补缺漏；题干未说数据不全。",
        "“说明”对应解释已有差别，直接处理误解。",
        "“修正”意味着改正错误；已有数据经核实无误。",
        "“预测”针对尚未发生或未知的情况，不是解释既有口径。"
      ],
      "trainingStage": "识别概念",
      "trainingGoal": "根据已知问题选择对应动作",
      "graphic": null,
      "meta": {
        "module": "言语理解",
        "type": "语境辨析",
        "trainingStage": "识别概念",
        "trainingGoal": "根据已知问题选择对应动作",
        "knowledgeIds": [
          "pn-context-contrast"
        ],
        "tags": [
          "语境照应",
          "近义表达",
          "程度",
          "否定范围"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-context-contrast-02",
      "lesson": "pn-context-contrast",
      "stem": "一个团队在证据不足时主动交代疑点和后续核验安排。另一个团队没有直接拒答，却反复转向无关话题，也不给后续安排，始终不正面回应。后者体现的不是审慎，而是对所问问题的（ ）。",
      "options": [
        "延后",
        "拒绝",
        "保留",
        "回避"
      ],
      "answer": 3,
      "explanation": "第二个团队反复转向无关话题而不正面回应，也不给后续安排，具体行为指向回避问题。题干明确未直接拒答，亦未给出只是延后答复的安排。",
      "optionReviews": [
        "“延后”只说明时间推迟，不能完整概括反复转向无关话题、始终不正面回应的行为。",
        "“拒绝”指明确不接受请求或不作答；题干已排除直接拒答，重点是迂回躲开所问问题。",
        "“保留”通常指留存或暂不改变，不能准确概括这里迂回躲开所问问题的行为。",
        "“回避”准确对应反复转向无关话题、始终不正面回应，与第一团队主动交代形成反差。"
      ],
      "trainingStage": "识别概念",
      "trainingGoal": "区分推迟判断与回避回应",
      "graphic": null,
      "meta": {
        "module": "言语理解",
        "type": "语境辨析",
        "trainingStage": "识别概念",
        "trainingGoal": "区分推迟判断与回避回应",
        "knowledgeIds": [
          "pn-context-contrast"
        ],
        "tags": [
          "语境照应",
          "近义表达",
          "程度",
          "否定范围"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-context-contrast-03",
      "lesson": "pn-context-contrast",
      "stem": "一台温度计显示的数值总比标准温度高2摄氏度。技术员依据标准值调整仪器，使其读数恢复准确。这里的工作宜称为对仪器进行（ ）。",
      "options": [
        "校正",
        "核验",
        "检索",
        "补录"
      ],
      "answer": 0,
      "explanation": "题干不止检查是否有偏差，还依据标准调整仪器，核心动作是校正。",
      "optionReviews": [
        "“校正”对应依据标准值改正仪器的读数偏差；这里不借用严格计量术语“校准”的定义。",
        "“核验”着重核查验证，不能完整表达题干中的标准调整。",
        "“检索”指查找信息，不是调整仪器。",
        "“补录”指补充录入记录，不改变仪器读数。"
      ],
      "trainingStage": "识别概念",
      "trainingGoal": "用对象和操作区分相关动词",
      "graphic": null,
      "meta": {
        "module": "言语理解",
        "type": "语境辨析",
        "trainingStage": "识别概念",
        "trainingGoal": "用对象和操作区分相关动词",
        "knowledgeIds": [
          "pn-context-contrast"
        ],
        "tags": [
          "语境照应",
          "近义表达",
          "程度",
          "否定范围"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-context-contrast-04",
      "lesson": "pn-context-contrast",
      "stem": "为避免仅凭一句话就替发言者设定意图，工作人员先保留原始表述，不急于（ ）其言外之意；再把内容相近的意见归为一组，从不同说法中（ ）共同问题。依次填入最恰当的是（ ）。",
      "options": [
        "核实／回避",
        "复述／解决",
        "推断／识别",
        "转述／淡化"
      ],
      "answer": 2,
      "explanation": "第一空是根据有限话语推定尚未明说的意图；第二空是从相近内容中发现共同问题。“推断／识别”分别对应这两个动作。",
      "optionReviews": [
        "核实本意不是此处要避免的误读，且归组是为了发现而非回避问题。",
        "“复述”指重复已说出的内容，而“言外之意”是尚未明说、需推知的含义；后空“解决”也没有“识别”贴近从不同说法中发现共同问题这一动作。",
        "“推断”对应避免过早推定本意，“识别”对应发现共同问题，两空都贴合。",
        "保留原话可避免失真转述，但“淡化共同问题”与整理目的相反，整组不合。"
      ],
      "trainingStage": "迁移运用",
      "trainingGoal": "用后半句反查双空整体含义",
      "graphic": null,
      "meta": {
        "module": "言语理解",
        "type": "语境辨析",
        "trainingStage": "迁移运用",
        "trainingGoal": "用后半句反查双空整体含义",
        "knowledgeIds": [
          "pn-context-contrast"
        ],
        "tags": [
          "语境照应",
          "近义表达",
          "程度",
          "否定范围"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-context-contrast-05",
      "lesson": "pn-context-contrast",
      "stem": "初步观察发现，改用新流程后等候时间缩短了，但同期还增加了工作人员。现有结果可以作为进一步研究的（ ），尚不足以把时间缩短完全（ ）于流程变化。依次填入最恰当的是（ ）。",
      "options": [
        "线索／归因",
        "结论／归纳",
        "证明／归属",
        "假说／归并"
      ],
      "answer": 0,
      "explanation": "前后相关的观察是进一步研究的线索；另有人员增加这一共同变化，不能把效果全部归因于流程。",
      "optionReviews": [
        "“线索”保留证据阶段，“归因于”准确表达不能确认的原因判断。",
        "“结论”用于进一步研究虽不必然错误，但“归纳于流程变化”不表达原因归属，整组不合。",
        "“证明”强于当前证据，且“归属于”在此不如因果判断准确。",
        "观察本身不是完整假说；“归并”用于合并类别，不表达因果解释。"
      ],
      "trainingStage": "迁移运用",
      "trainingGoal": "保留观察与因果结论之间的证据距离",
      "graphic": null,
      "meta": {
        "module": "言语理解",
        "type": "语境辨析",
        "trainingStage": "迁移运用",
        "trainingGoal": "保留观察与因果结论之间的证据距离",
        "knowledgeIds": [
          "pn-context-contrast"
        ],
        "tags": [
          "语境照应",
          "近义表达",
          "程度",
          "否定范围"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-context-contrast-06",
      "lesson": "pn-context-contrast",
      "stem": "压缩服务说明的篇幅，不应靠删除“适用于首次申请者”等限制条件来（ ）文字，而应在保留适用范围的前提下（ ）重复表达。依次填入最恰当的是（ ）。",
      "options": [
        "充实／辨别",
        "简化／删减",
        "润饰／增补",
        "修订／保留"
      ],
      "answer": 1,
      "explanation": "题干要缩短篇幅，同时保留适用范围。“简化文字”是表面目标，“删减重复表达”是符合约束的具体做法。",
      "optionReviews": [
        "“充实文字”不对应压缩篇幅，“辨别”也未表达删去重复内容。",
        "前空对应变短，后空明确删去重复而保留条件，整体匹配。",
        "“增补重复表达”与压缩篇幅相反，且不是所述处理方式。",
        "“保留重复表达”延续了要处理的冗余，不能对应题设以处理重复来压缩篇幅的做法。"
      ],
      "trainingStage": "迁移运用",
      "trainingGoal": "双空同时满足目标与限制条件",
      "graphic": null,
      "meta": {
        "module": "言语理解",
        "type": "语境辨析",
        "trainingStage": "迁移运用",
        "trainingGoal": "双空同时满足目标与限制条件",
        "knowledgeIds": [
          "pn-context-contrast"
        ],
        "tags": [
          "语境照应",
          "近义表达",
          "程度",
          "否定范围"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-context-contrast-07",
      "lesson": "pn-context-contrast",
      "stem": "报告写道：“并非所有参加测试的设备都能在低温下稳定运行。”仅就这句话，以下转述保持原意的是（ ）。",
      "options": [
        "尚无参测设备能在低温下保持稳定运行",
        "全部参测设备在低温下都不能稳定运行",
        "只有少数参测设备可以在低温下稳定运行",
        "至少一台参测设备不能在低温下稳定运行"
      ],
      "answer": 3,
      "explanation": "“并非所有P都Q”等价于“至少有一个P不是Q”，并不说明失败设备占多少，也不排除全部都失败。",
      "optionReviews": [
        "相当于没有一台能稳定运行，比原句强。",
        "把否定“所有都能”改成“所有都不能”，范围扩大。",
        "原句没有给出能稳定运行者的数量比例。",
        "准确否定全称命题，保留至少存在一个反例。"
      ],
      "trainingStage": "检查边界",
      "trainingGoal": "把否定全称准确转为存在反例",
      "graphic": null,
      "meta": {
        "module": "言语理解",
        "type": "语境辨析",
        "trainingStage": "检查边界",
        "trainingGoal": "把否定全称准确转为存在反例",
        "knowledgeIds": [
          "pn-context-contrast"
        ],
        "tags": [
          "语境照应",
          "近义表达",
          "程度",
          "否定范围"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-context-contrast-08",
      "lesson": "pn-context-contrast",
      "stem": "某方法在两个样本较小的社区试点中减少了办事环节。报告同时指出，尚未检验人口规模、人员配置明显不同的其他社区。以下概括最贴切的是（ ）。",
      "options": [
        "试点结果已表明该方法可在各类社区推广",
        "其他社区不能采用这种已成功的试点方法",
        "试点取得一定成效，适用范围仍待检验",
        "试点样本太小，现有观察均无参考价值"
      ],
      "answer": 2,
      "explanation": "已观察到试点内环节减少，应保留局部成效；其他场景尚未检验，因此适用范围仍待验证。",
      "optionReviews": [
        "把局部试点结果外推到各类社区，超出证据范围。",
        "未经检验不等于已证明不能采用，否定过强。",
        "同时保留局部观察和外推限制，没有增添成败判断。",
        "样本有限限制外推，不意味着已有观察毫无参考价值。"
      ],
      "trainingStage": "检查边界",
      "trainingGoal": "在概括中同时保留成效与外推边界",
      "graphic": null,
      "meta": {
        "module": "言语理解",
        "type": "语境辨析",
        "trainingStage": "检查边界",
        "trainingGoal": "在概括中同时保留成效与外推边界",
        "knowledgeIds": [
          "pn-context-contrast"
        ],
        "tags": [
          "语境照应",
          "近义表达",
          "程度",
          "否定范围"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-context-contrast-09",
      "lesson": "pn-context-contrast",
      "stem": "甲报告统计工作日到馆人数，乙报告统计周末到馆人数，两者都只描述自己统计的时段，数值并不一致。有人据此认定至少有一份报告失实。对该认定最准确的评价是（ ）。",
      "options": [
        "只要统计时段不同，就不必核对任何数据",
        "统计时段不同，差异本身不足以认定失实",
        "两份报告的数值不同，说明两者均不准确",
        "只要各自注明时段，两份报告就必然属实"
      ],
      "answer": 1,
      "explanation": "两份报告不具有相同时间范围，数值不同并不构成直接矛盾；只能说差异本身不足以判失实，不能因此保证二者真实。",
      "optionReviews": [
        "口径不同不取消核查真实性的必要，这一结论过度。",
        "准确指出比较口径差异，且没有反向保证两份报告属实。",
        "不同口径的不同数值可以同时真实，不能推出两者都不准。",
        "标注统计时段不等于数据已经核实，不能保证真实。"
      ],
      "trainingStage": "检查边界",
      "trainingGoal": "区分不可直接比较与事实必然真实",
      "graphic": null,
      "meta": {
        "module": "言语理解",
        "type": "语境辨析",
        "trainingStage": "检查边界",
        "trainingGoal": "区分不可直接比较与事实必然真实",
        "knowledgeIds": [
          "pn-context-contrast"
        ],
        "tags": [
          "语境照应",
          "近义表达",
          "程度",
          "否定范围"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-compound-logic-01",
      "lesson": "pn-compound-logic",
      "stem": "【原创共同条件】五名志愿者甲、乙、丙、丁、戊中恰好选出三人。①若甲入选，则乙入选；②丙、丁恰好一人入选；③丁、戊不能同时入选。除上述条件外没有其他限制。\n以下哪位一定入选？",
      "options": [
        "甲",
        "丙",
        "乙",
        "戊"
      ],
      "answer": 2,
      "explanation": "若乙不入选，甲也不能入选，只能从丙丁戊中选三人，与丙丁恰好一人冲突。因此乙必入选。可行三人组恰为甲乙丙、甲乙丁、乙丙戊。",
      "optionReviews": [
        "乙丙戊是甲未入选的可行组。",
        "甲乙丁是丙未入选的可行组。",
        "否定乙会迫使甲不入选，剩余对象无法合法选满三人。",
        "甲乙丙是戊未入选的可行组。"
      ],
      "trainingStage": "识别概念",
      "trainingGoal": "由总人数与条件联立识别必然人选",
      "graphic": null,
      "materialGroup": "pn-logic-selection",
      "meta": {
        "module": "判断推理",
        "type": "复合条件",
        "trainingStage": "识别概念",
        "trainingGoal": "由总人数与条件联立识别必然人选",
        "knowledgeIds": [
          "pn-compound-logic"
        ],
        "tags": [
          "条件链",
          "恰好",
          "排列约束",
          "反例"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-compound-logic-02",
      "lesson": "pn-compound-logic",
      "stem": "【原创共同条件】五名志愿者甲、乙、丙、丁、戊中恰好选出三人。①若甲入选，则乙入选；②丙、丁恰好一人入选；③丁、戊不能同时入选。除上述条件外没有其他限制。\n若戊入选，另外两名入选者是（ ）。",
      "options": [
        "乙和丙",
        "乙和丁",
        "甲和乙",
        "甲和丙"
      ],
      "answer": 0,
      "explanation": "戊入选排除丁；丙丁恰一使丙入选。第三人若为甲就还须乙，共四人，超出恰好三人的限制，所以第三人为乙。",
      "optionReviews": [
        "乙丙戊满足所有条件且恰好三人。",
        "丁戊同时入选违反条件③。",
        "甲乙戊缺少丙丁中的一人，违反条件②。",
        "甲丙戊中甲入选却乙未入选，违反条件①。"
      ],
      "trainingStage": "识别概念",
      "trainingGoal": "加入人选后继续保留恰好三人的限制",
      "graphic": null,
      "materialGroup": "pn-logic-selection",
      "meta": {
        "module": "判断推理",
        "type": "复合条件",
        "trainingStage": "识别概念",
        "trainingGoal": "加入人选后继续保留恰好三人的限制",
        "knowledgeIds": [
          "pn-compound-logic"
        ],
        "tags": [
          "条件链",
          "恰好",
          "排列约束",
          "反例"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-compound-logic-03",
      "lesson": "pn-compound-logic",
      "stem": "【原创共同条件】五名志愿者甲、乙、丙、丁、戊中恰好选出三人。①若甲入选，则乙入选；②丙、丁恰好一人入选；③丁、戊不能同时入选。除上述条件外没有其他限制。\n若丁入选，另外两名入选者是（ ）。",
      "options": [
        "乙和戊",
        "甲和丙",
        "丙和戊",
        "甲和乙"
      ],
      "answer": 3,
      "explanation": "丁入选排除丙与戊，剩下可选的仅甲乙。要恰好选三人，另外两人只能是甲和乙。",
      "optionReviews": [
        "丁戊不能同时入选，违反条件③。",
        "丙丁不能同时入选，且甲入选必须有乙。",
        "同时违反丙丁恰一和丁戊互斥。",
        "丁排除丙戊，选满三人只能再选甲乙。"
      ],
      "trainingStage": "识别概念",
      "trainingGoal": "检查人数限制对剩余人选的强制作用",
      "graphic": null,
      "materialGroup": "pn-logic-selection",
      "meta": {
        "module": "判断推理",
        "type": "复合条件",
        "trainingStage": "识别概念",
        "trainingGoal": "检查人数限制对剩余人选的强制作用",
        "knowledgeIds": [
          "pn-compound-logic"
        ],
        "tags": [
          "条件链",
          "恰好",
          "排列约束",
          "反例"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-compound-logic-04",
      "lesson": "pn-compound-logic",
      "stem": "【原创共同条件】甲、乙、丙、丁、戊、己六场活动分别占据第1至第6时段，每个时段恰好一场。①甲在丁之前；②丙紧挨着排在戊之前；③乙不在第1或第6时段；④己在乙之前。除此之外没有其他限制。\n以下从第1至第6时段的安排，哪项可行？",
      "options": [
        "甲、丁、己、丙、乙、戊",
        "己、乙、甲、丁、丙、戊",
        "丙、戊、乙、己、甲、丁",
        "己、甲、乙、丁、戊、丙"
      ],
      "answer": 1,
      "explanation": "己乙甲丁丙戊同时满足甲先于丁、丙戊相邻且丙在前、乙不在两端、己先于乙。其余方案分别违反相邻、己乙先后或丙戊顺序。",
      "optionReviews": [
        "丙与戊之间有乙，不符合紧挨要求。",
        "四项条件均满足。",
        "乙在己之前，违反条件④。",
        "戊在丙之前，违反条件②。"
      ],
      "trainingStage": "迁移运用",
      "trainingGoal": "逐条核对可行排列而非只看局部条件",
      "graphic": null,
      "materialGroup": "pn-logic-order",
      "meta": {
        "module": "判断推理",
        "type": "复合条件",
        "trainingStage": "迁移运用",
        "trainingGoal": "逐条核对可行排列而非只看局部条件",
        "knowledgeIds": [
          "pn-compound-logic"
        ],
        "tags": [
          "条件链",
          "恰好",
          "排列约束",
          "反例"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-compound-logic-05",
      "lesson": "pn-compound-logic",
      "stem": "【原创共同条件】甲、乙、丙、丁、戊、己六场活动分别占据第1至第6时段，每个时段恰好一场。①甲在丁之前；②丙紧挨着排在戊之前；③乙不在第1或第6时段；④己在乙之前。除此之外没有其他限制。\n若乙在第2时段，则丁可能占据的时段恰好为（ ）。",
      "options": [
        "第3或第6时段",
        "第3或第5时段",
        "第4或第5时段",
        "第4或第6时段"
      ],
      "answer": 3,
      "explanation": "乙第2使己第1，余下甲丁丙戊占3—6位。丙戊可占3—4、4—5或5—6位，对应丁分别在6、6或4位，因此可能位置恰为4和6。",
      "optionReviews": [
        "丁不能在第3时段，因为甲必须在丁之前而第1、2已满。",
        "两个位置均不可行，理由分别为甲的先后与丙戊相邻限制。",
        "丁在5会让甲、丙戊占3、4、6而无法同时满足甲在丁前和丙戊相邻。",
        "例如己乙甲丁丙戊使丁在4，己乙丙戊甲丁使丁在6；分类无其他位置。"
      ],
      "trainingStage": "迁移运用",
      "trainingGoal": "由固定位置进行不重不漏的分类",
      "graphic": null,
      "materialGroup": "pn-logic-order",
      "meta": {
        "module": "判断推理",
        "type": "复合条件",
        "trainingStage": "迁移运用",
        "trainingGoal": "由固定位置进行不重不漏的分类",
        "knowledgeIds": [
          "pn-compound-logic"
        ],
        "tags": [
          "条件链",
          "恰好",
          "排列约束",
          "反例"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-compound-logic-06",
      "lesson": "pn-compound-logic",
      "stem": "【原创共同条件】甲、乙、丙、丁、戊、己六场活动分别占据第1至第6时段，每个时段恰好一场。①甲在丁之前；②丙紧挨着排在戊之前；③乙不在第1或第6时段；④己在乙之前。除此之外没有其他限制。\n若丙在第3时段，则丁一定在第几时段？",
      "options": [
        "第2时段",
        "第4时段",
        "第6时段",
        "第5时段"
      ],
      "answer": 2,
      "explanation": "丙3使戊4，甲乙丁己占1、2、5、6。丁不能在1；若在2则甲1，己乙只余5、6而乙不能6；若丁5，甲只能1或2，己乙也无法在余位满足己先于乙且乙不在6。因此丁6。",
      "optionReviews": [
        "丁在2迫使甲1，己乙只能占5、6而违反乙不在6。",
        "第4时段已由戊占据。",
        "可行例为甲己丙戊乙丁；排除其他位置后丁必须在6。",
        "丁在5时，若让甲在其前、己在乙前，乙最终只能占第6时段，违反条件③。"
      ],
      "trainingStage": "迁移运用",
      "trainingGoal": "检验两条先后链在固定空位中的兼容性",
      "graphic": null,
      "materialGroup": "pn-logic-order",
      "meta": {
        "module": "判断推理",
        "type": "复合条件",
        "trainingStage": "迁移运用",
        "trainingGoal": "检验两条先后链在固定空位中的兼容性",
        "knowledgeIds": [
          "pn-compound-logic"
        ],
        "tags": [
          "条件链",
          "恰好",
          "排列约束",
          "反例"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-compound-logic-07",
      "lesson": "pn-compound-logic",
      "stem": "【原创共同条件】甲、乙、丙、丁、戊五项功能，每项只有启用或未启用两种状态。①甲启用则乙启用；②丙、丁恰好一项启用；③乙启用则丙启用；④丁启用则戊启用；⑤戊启用当且仅当甲未启用。除上述条件外没有其他限制。\n下列推断必然成立的是（ ）。",
      "options": [
        "丁启用，则甲未启用",
        "甲未启用，则丁启用",
        "丁未启用，则乙启用",
        "乙启用，则甲启用"
      ],
      "answer": 0,
      "explanation": "丁启用推出戊启用，戊启用又推出甲未启用，所以最后一项成立。只启用丙戊或启用乙丙戊，可反驳其余推断。",
      "optionReviews": [
        "由条件④和⑤依次推出，方向均合法。",
        "只启用丙戊时甲未启用而丁也未启用，反驳此项。",
        "只启用丙戊时丁未启用而乙也未启用，反驳此项。",
        "启用乙丙戊、停用甲丁满足全部原条件，是逆推失败的反例。"
      ],
      "trainingStage": "检查边界",
      "trainingGoal": "识别条件链与非法逆推",
      "graphic": null,
      "materialGroup": "pn-logic-switch",
      "meta": {
        "module": "判断推理",
        "type": "复合条件",
        "trainingStage": "检查边界",
        "trainingGoal": "识别条件链与非法逆推",
        "knowledgeIds": [
          "pn-compound-logic"
        ],
        "tags": [
          "条件链",
          "恰好",
          "排列约束",
          "反例"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-compound-logic-08",
      "lesson": "pn-compound-logic",
      "stem": "【原创共同条件】甲、乙、丙、丁、戊五项功能，每项只有启用或未启用两种状态。①甲启用则乙启用；②丙、丁恰好一项启用；③乙启用则丙启用；④丁启用则戊启用；⑤戊启用当且仅当甲未启用。除上述条件外没有其他限制。\n若恰有三项功能启用，则必然同时启用的是（ ）。",
      "options": [
        "甲和乙",
        "乙和丙",
        "丙和戊",
        "丁和戊"
      ],
      "answer": 1,
      "explanation": "满足原条件的启用集合恰为丁戊、丙戊、乙丙戊、甲乙丙。限制恰有三项后只剩乙丙戊和甲乙丙，公共启用项为乙丙。",
      "optionReviews": [
        "乙丙戊方案中甲未启用。",
        "两个三项方案都启用乙丙。",
        "甲乙丙方案中戊未启用。",
        "两个三项方案均不启用丁，不能必然同时启用丁戊。"
      ],
      "trainingStage": "检查边界",
      "trainingGoal": "保留全部可行方案后取共同结论",
      "graphic": null,
      "materialGroup": "pn-logic-switch",
      "meta": {
        "module": "判断推理",
        "type": "复合条件",
        "trainingStage": "检查边界",
        "trainingGoal": "保留全部可行方案后取共同结论",
        "knowledgeIds": [
          "pn-compound-logic"
        ],
        "tags": [
          "条件链",
          "恰好",
          "排列约束",
          "反例"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-compound-logic-09",
      "lesson": "pn-compound-logic",
      "stem": "【原创共同条件】甲、乙、丙、丁、戊五项功能，每项只有启用或未启用两种状态。①甲启用则乙启用；②丙、丁恰好一项启用；③乙启用则丙启用；④丁启用则戊启用；⑤戊启用当且仅当甲未启用。除上述条件外没有其他限制。\n有人断言：“只要丁未启用，甲就一定启用。”以下哪一启用集合符合原条件，并能反驳该断言？（未列出的功能均未启用）",
      "options": [
        "仅甲、乙、丙启用",
        "仅丁、戊启用",
        "仅乙、丙、戊启用",
        "仅甲、丙启用"
      ],
      "answer": 2,
      "explanation": "反例必须满足原条件，并使丁未启用而甲也未启用。乙丙戊方案符合这些要求；其余分别使结论为真、前件为假，或违反原条件。",
      "optionReviews": [
        "合法，但甲启用，不能使所断言的后件为假。",
        "合法，但丁启用，所断言的前件不成立，不能构成反例。",
        "合法且丁甲均未启用，前件真、后件假。",
        "甲启用而乙未启用，违反原条件①，不能用非法方案反驳。"
      ],
      "trainingStage": "检查边界",
      "trainingGoal": "区分合法反例、无关情形与非法方案",
      "graphic": null,
      "materialGroup": "pn-logic-switch",
      "meta": {
        "module": "判断推理",
        "type": "复合条件",
        "trainingStage": "检查边界",
        "trainingGoal": "区分合法反例、无关情形与非法方案",
        "knowledgeIds": [
          "pn-compound-logic"
        ],
        "tags": [
          "条件链",
          "恰好",
          "排列约束",
          "反例"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-share-scope-01",
      "lesson": "pn-share-scope",
      "stem": "【原创虚构资料，非真实统计】某服务平台上期共处理600万件业务，本期共处理750万件。业务分为互不重叠且覆盖全部业务的甲、乙、丙三类。上期三类分别为180、240、180万件，本期分别为270、300、180万件；两期分类和统计口径一致。\n本期甲类业务占全部业务的比重为（ ）。",
      "options": [
        "30%",
        "45%",
        "40%",
        "36%"
      ],
      "answer": 3,
      "explanation": "本期甲类270万件除以本期全部750万件，得到0.36，即36%。",
      "optionReviews": [
        "180÷600=30%，是上期甲类比重。",
        "270÷600=45%，混用了本期分子和上期分母。",
        "300÷750=40%，是本期乙类比重。",
        "270÷750=36%，期别和分母均正确。"
      ],
      "trainingStage": "识别概念",
      "trainingGoal": "定位现期部分和同口径总体",
      "graphic": null,
      "materialGroup": "pn-data-category",
      "meta": {
        "module": "资料分析",
        "type": "比重口径",
        "trainingStage": "识别概念",
        "trainingGoal": "定位现期部分和同口径总体",
        "knowledgeIds": [
          "pn-share-scope"
        ],
        "tags": [
          "现期比重",
          "百分点",
          "结构效应",
          "交集去重"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-share-scope-02",
      "lesson": "pn-share-scope",
      "stem": "【原创虚构资料，非真实统计】某服务平台上期共处理600万件业务，本期共处理750万件。业务分为互不重叠且覆盖全部业务的甲、乙、丙三类。上期三类分别为180、240、180万件，本期分别为270、300、180万件；两期分类和统计口径一致。\n甲类业务占比本期比上期提高了多少个百分点？",
      "options": [
        "4个百分点",
        "6个百分点",
        "9个百分点",
        "20个百分点"
      ],
      "answer": 1,
      "explanation": "上期180÷600=30%，本期270÷750=36%，直接相减提高6个百分点。",
      "optionReviews": [
        "本期占比差为36%−30%，不是4个百分点。",
        "36%−30%=6个百分点，单位符合题问。",
        "9个百分点不符合两期比重差；业务数量之差不能直接当占比差。",
        "20%是占比的相对增幅，不是20个百分点。"
      ],
      "trainingStage": "识别概念",
      "trainingGoal": "用两期比重之差求百分点",
      "graphic": null,
      "materialGroup": "pn-data-category",
      "meta": {
        "module": "资料分析",
        "type": "比重口径",
        "trainingStage": "识别概念",
        "trainingGoal": "用两期比重之差求百分点",
        "knowledgeIds": [
          "pn-share-scope"
        ],
        "tags": [
          "现期比重",
          "百分点",
          "结构效应",
          "交集去重"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-share-scope-03",
      "lesson": "pn-share-scope",
      "stem": "【原创虚构资料，非真实统计】某服务平台上期共处理600万件业务，本期共处理750万件。业务分为互不重叠且覆盖全部业务的甲、乙、丙三类。上期三类分别为180、240、180万件，本期分别为270、300、180万件；两期分类和统计口径一致。\n甲类业务的占比本期比上期相对增长了（ ）。",
      "options": [
        "20%",
        "6%",
        "25%",
        "50%"
      ],
      "answer": 0,
      "explanation": "占比从30%变为36%，相对增长率为(36%−30%)÷30%=20%。这里分母是上期比重，不是上期甲类件数。",
      "optionReviews": [
        "占比增加6个百分点，除以上期30%得20%。",
        "6是提高的百分点数，不能直接作为相对增长率。",
        "(750−600)÷600=25%，是业务总量增长率。",
        "(270−180)÷180=50%，是甲类业务量增长率。"
      ],
      "trainingStage": "识别概念",
      "trainingGoal": "区分占比相对变化与部分数量增长",
      "graphic": null,
      "materialGroup": "pn-data-category",
      "meta": {
        "module": "资料分析",
        "type": "比重口径",
        "trainingStage": "识别概念",
        "trainingGoal": "区分占比相对变化与部分数量增长",
        "knowledgeIds": [
          "pn-share-scope"
        ],
        "tags": [
          "现期比重",
          "百分点",
          "结构效应",
          "交集去重"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-share-scope-04",
      "lesson": "pn-share-scope",
      "stem": "【原创虚构资料，非真实统计】某区域仅含东区和西区。上期东区受理1200件、办结960件，西区受理800件、办结720件；本期东区受理1500件、办结1230件，西区受理500件、办结460件。每件业务只归属一个地区，办结数均为同一期受理事项中已办结的件数，无跨期结转；两期统计口径一致。办结率＝办结件数÷受理件数。\n全区办结率本期比上期提高了多少个百分点？",
      "options": [
        "2.0个百分点",
        "1.0个百分点",
        "0.5个百分点",
        "2.5个百分点"
      ],
      "answer": 2,
      "explanation": "上期全区1680÷2000=84%；本期1690÷2000=84.5%，提高0.5个百分点。虽然两区各提高2个百分点，受理量结构改变后，全区提高幅度并非2。",
      "optionReviews": [
        "东区80%到82%、西区90%到92%均提高2，但这不是全区真实变化。",
        "按题设两期合计计算得0.5，不是1.0个百分点。",
        "合并实际分母后84.5%−84%=0.5个百分点。",
        "把局部变化与总体变化混加，不能得到全区差值。"
      ],
      "trainingStage": "迁移运用",
      "trainingGoal": "按受理数加权后比较总体率",
      "graphic": null,
      "materialGroup": "pn-data-regions",
      "meta": {
        "module": "资料分析",
        "type": "比重口径",
        "trainingStage": "迁移运用",
        "trainingGoal": "按受理数加权后比较总体率",
        "knowledgeIds": [
          "pn-share-scope"
        ],
        "tags": [
          "现期比重",
          "百分点",
          "结构效应",
          "交集去重"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-share-scope-05",
      "lesson": "pn-share-scope",
      "stem": "【原创虚构资料，非真实统计】某区域仅含东区和西区。上期东区受理1200件、办结960件，西区受理800件、办结720件；本期东区受理1500件、办结1230件，西区受理500件、办结460件。每件业务只归属一个地区，办结数均为同一期受理事项中已办结的件数，无跨期结转；两期统计口径一致。办结率＝办结件数÷受理件数。\n若本期两区受理数分别保持为上期的受理数，而两区办结率分别保持本期水平，则这一假定下全区办结率为（ ）。",
      "options": [
        "84.0%",
        "86.0%",
        "84.5%",
        "87.0%"
      ],
      "answer": 1,
      "explanation": "本期两区办结率为82%和92%，按上期受理量1200、800加权：(1200×82%+800×92%)÷2000=86%。这是题设假定结果，不是本期实际值。",
      "optionReviews": [
        "84%是上期实际总体办结率，没有换用本期地区比率。",
        "按上期60%和40%的受理权重加权本期比率，得86%。",
        "84.5%是本期实际值，没有把受理量权重固定到上期。",
        "87%是82%与92%的简单平均，错误地假定两区受理量相等。"
      ],
      "trainingStage": "迁移运用",
      "trainingGoal": "区分固定结构假设与当期真实总体",
      "graphic": null,
      "materialGroup": "pn-data-regions",
      "meta": {
        "module": "资料分析",
        "type": "比重口径",
        "trainingStage": "迁移运用",
        "trainingGoal": "区分固定结构假设与当期真实总体",
        "knowledgeIds": [
          "pn-share-scope"
        ],
        "tags": [
          "现期比重",
          "百分点",
          "结构效应",
          "交集去重"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-share-scope-06",
      "lesson": "pn-share-scope",
      "stem": "【原创虚构资料，非真实统计】某区域仅含东区和西区。上期东区受理1200件、办结960件，西区受理800件、办结720件；本期东区受理1500件、办结1230件，西区受理500件、办结460件。每件业务只归属一个地区，办结数均为同一期受理事项中已办结的件数，无跨期结转；两期统计口径一致。办结率＝办结件数÷受理件数。\n本期东区办结件数占全区办结件数的比重约为（ ）。",
      "options": [
        "61.5%",
        "82.0%",
        "75.0%",
        "72.8%"
      ],
      "answer": 3,
      "explanation": "分母应为全区本期办结件数1230+460=1690件，比重1230÷1690≈72.78%，约72.8%。",
      "optionReviews": [
        "1230÷2000=61.5%，分母错用了全区受理件数。",
        "1230÷1500=82%，是东区自身办结率，不是其占全区办结数的比重。",
        "1500÷2000=75%，是东区受理件数占全区受理件数的比重。",
        "1230÷1690≈72.8%，分子分母均为本期办结件数。"
      ],
      "trainingStage": "迁移运用",
      "trainingGoal": "辨别办结率、受理占比与办结占比",
      "graphic": null,
      "materialGroup": "pn-data-regions",
      "meta": {
        "module": "资料分析",
        "type": "比重口径",
        "trainingStage": "迁移运用",
        "trainingGoal": "辨别办结率、受理占比与办结占比",
        "knowledgeIds": [
          "pn-share-scope"
        ],
        "tags": [
          "现期比重",
          "百分点",
          "结构效应",
          "交集去重"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-share-scope-07",
      "lesson": "pn-share-scope",
      "stem": "【原创虚构资料，非真实统计】某区域上期共完成200项任务，本期共完成240项任务。甲站点参与完成的任务上期70项、本期84项；乙站点参与完成的任务上期60项、本期66项。其中由甲乙共同参与完成的任务上期8项、本期10项，这些共同任务已分别计入甲、乙两站点的数据。每期全部任务按任务编号去重，所列甲乙任务均包含在该期全区完成任务内，两期统计口径一致。\n本期至少由甲、乙两站点中的一个参与完成的任务，占全区完成任务的比重约为（ ）。",
      "options": [
        "58.3%",
        "54.2%",
        "62.5%",
        "66.7%"
      ],
      "answer": 0,
      "explanation": "甲乙任务有交集，至少一个参与的任务数为84+66−10=140项，140÷240≈58.33%。",
      "optionReviews": [
        "去重并集140÷240≈58.3%。",
        "(84+66−2×10)÷240≈54.2%，算成了甲乙中恰好一个站点参与。",
        "(84+66)÷240=62.5%，没有扣除重复计数的共同任务。",
        "(84+66+10)÷240≈66.7%，重复部分反而又加了一次。"
      ],
      "trainingStage": "检查边界",
      "trainingGoal": "从重复计数得到并集分子",
      "graphic": null,
      "materialGroup": "pn-data-overlap",
      "meta": {
        "module": "资料分析",
        "type": "比重口径",
        "trainingStage": "检查边界",
        "trainingGoal": "从重复计数得到并集分子",
        "knowledgeIds": [
          "pn-share-scope"
        ],
        "tags": [
          "现期比重",
          "百分点",
          "结构效应",
          "交集去重"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-share-scope-08",
      "lesson": "pn-share-scope",
      "stem": "【原创虚构资料，非真实统计】某区域上期共完成200项任务，本期共完成240项任务。甲站点参与完成的任务上期70项、本期84项；乙站点参与完成的任务上期60项、本期66项。其中由甲乙共同参与完成的任务上期8项、本期10项，这些共同任务已分别计入甲、乙两站点的数据。每期全部任务按任务编号去重，所列甲乙任务均包含在该期全区完成任务内，两期统计口径一致。\n至少由甲、乙两站点中的一个参与完成的任务，占全区任务的比重本期比上期约（ ）。",
      "options": [
        "提高2.7个百分点",
        "提高3.3个百分点",
        "下降2.7个百分点",
        "下降3.3个百分点"
      ],
      "answer": 2,
      "explanation": "上期去重并集70+60−8=122，占比61%；本期140÷240≈58.33%，相差−2.67个百分点，即下降约2.7个百分点。",
      "optionReviews": [
        "绝对差约2.7，但方向错误。",
        "比重既未提高，差值也不是3.3个百分点。",
        "58.33%−61%≈−2.67个百分点，方向与数值均正确。",
        "下降方向正确，但差值不是3.3个百分点。"
      ],
      "trainingStage": "检查边界",
      "trainingGoal": "在两期分别去重后比较百分点",
      "graphic": null,
      "materialGroup": "pn-data-overlap",
      "meta": {
        "module": "资料分析",
        "type": "比重口径",
        "trainingStage": "检查边界",
        "trainingGoal": "在两期分别去重后比较百分点",
        "knowledgeIds": [
          "pn-share-scope"
        ],
        "tags": [
          "现期比重",
          "百分点",
          "结构效应",
          "交集去重"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    },
    {
      "id": "pn-share-scope-09",
      "lesson": "pn-share-scope",
      "stem": "【原创虚构资料，非真实统计】某区域上期共完成200项任务，本期共完成240项任务。甲站点参与完成的任务上期70项、本期84项；乙站点参与完成的任务上期60项、本期66项。其中由甲乙共同参与完成的任务上期8项、本期10项，这些共同任务已分别计入甲、乙两站点的数据。每期全部任务按任务编号去重，所列甲乙任务均包含在该期全区完成任务内，两期统计口径一致。\n根据资料，下列说法正确的是（ ）。",
      "options": [
        "甲乙至少一站参与的任务量同比增长约14.8%",
        "两站点数据直接相加所得占比提高了2个百分点",
        "甲参与而乙未参与的任务占全区比重本期更高",
        "两站点共同参与的任务量占全区比重上期与本期相同"
      ],
      "answer": 0,
      "explanation": "去重并集由122增至140，增长18÷122≈14.75%。甲参与而乙未参与的任务占比从62÷200=31%变为74÷240≈30.83%，略降；共同任务占比由4%变为约4.17%，并非相同。",
      "optionReviews": [
        "去重后(140−122)÷122≈14.8%，正确。",
        "两站点直接相加的比值由130÷200=65%变为150÷240=62.5%，下降2.5个百分点，且并非去重占比。",
        "甲参与而乙未参与的任务上期62项、本期74项，占比分别31%、约30.83%，不是更高。",
        "共同任务占比上期8÷200=4%，本期10÷240≈4.17%，并不相同。"
      ],
      "trainingStage": "检查边界",
      "trainingGoal": "区分甲乙并集、甲有乙无与交集的两期变化",
      "graphic": null,
      "materialGroup": "pn-data-overlap",
      "meta": {
        "module": "资料分析",
        "type": "比重口径",
        "trainingStage": "检查边界",
        "trainingGoal": "区分甲乙并集、甲有乙无与交集的两期变化",
        "knowledgeIds": [
          "pn-share-scope"
        ],
        "tags": [
          "现期比重",
          "百分点",
          "结构效应",
          "交集去重"
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
        "purpose": "原创专项练习；层次是教学目标，非实测难度",
        "source": {
          "kind": "original",
          "title": "原创语境、条件与比重专项",
          "url": null,
          "referenceIds": []
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、解析及虚构数据独立编写；未引用或改写真题、商业题或第三方图表。"
        },
        "answerReview": {
          "status": "reviewed",
          "date": "2026-11-05",
          "basis": "作者逐项推导，独立审查者盲解并逐项复核；逻辑穷尽枚举与资料精确分数另算通过。非外部专家认证或考生校准。"
        },
        "methodIds": []
      }
    }
  ],
  "papers": [
    {
      "id": "pn-context-contrast-set",
      "revision": 1,
      "title": "语境辨析：范围、程度与句义约束专题组",
      "kind": "editorial-training",
      "availability": "candidate-not-integrated",
      "description": "9道原创专题题，三种训练目标各3题。不是完整模拟卷，不设置官方题量、限时或分值。",
      "applicableExams": [
        "national",
        "fujian"
      ],
      "examSource": {
        "system": null,
        "year": null,
        "paper": null
      },
      "durationSeconds": null,
      "scoring": {
        "kind": "count-only",
        "perQuestionPoints": null,
        "totalScore": null,
        "officialScale": false
      },
      "sections": [
        {
          "id": "s1",
          "title": "言语理解",
          "questionIds": [
            "pn-context-contrast-01",
            "pn-context-contrast-02",
            "pn-context-contrast-03",
            "pn-context-contrast-04",
            "pn-context-contrast-05",
            "pn-context-contrast-06",
            "pn-context-contrast-07",
            "pn-context-contrast-08",
            "pn-context-contrast-09"
          ]
        }
      ],
      "questionCount": 9,
      "limitations": [
        "专题训练引用不增加独立题量。",
        "原始材料组内题目共享信息，不视为独立样本。",
        "训练目标非难度标定，不预测真实考试分数。"
      ]
    },
    {
      "id": "pn-compound-logic-set",
      "revision": 1,
      "title": "复合条件：联立、附加条件与反例专题组",
      "kind": "editorial-training",
      "availability": "candidate-not-integrated",
      "description": "9道原创专题题，三种训练目标各3题。不是完整模拟卷，不设置官方题量、限时或分值。",
      "applicableExams": [
        "national",
        "fujian"
      ],
      "examSource": {
        "system": null,
        "year": null,
        "paper": null
      },
      "durationSeconds": null,
      "scoring": {
        "kind": "count-only",
        "perQuestionPoints": null,
        "totalScore": null,
        "officialScale": false
      },
      "sections": [
        {
          "id": "s1",
          "title": "判断推理",
          "questionIds": [
            "pn-compound-logic-01",
            "pn-compound-logic-02",
            "pn-compound-logic-03",
            "pn-compound-logic-04",
            "pn-compound-logic-05",
            "pn-compound-logic-06",
            "pn-compound-logic-07",
            "pn-compound-logic-08",
            "pn-compound-logic-09"
          ]
        }
      ],
      "questionCount": 9,
      "limitations": [
        "专题训练引用不增加独立题量。",
        "原始材料组内题目共享信息，不视为独立样本。",
        "训练目标非难度标定，不预测真实考试分数。"
      ]
    },
    {
      "id": "pn-share-scope-set",
      "revision": 1,
      "title": "比重口径：两期、结构与重复计数专题组",
      "kind": "editorial-training",
      "availability": "candidate-not-integrated",
      "description": "9道原创专题题，三种训练目标各3题。不是完整模拟卷，不设置官方题量、限时或分值。",
      "applicableExams": [
        "national",
        "fujian"
      ],
      "examSource": {
        "system": null,
        "year": null,
        "paper": null
      },
      "durationSeconds": null,
      "scoring": {
        "kind": "count-only",
        "perQuestionPoints": null,
        "totalScore": null,
        "officialScale": false
      },
      "sections": [
        {
          "id": "s1",
          "title": "资料分析",
          "questionIds": [
            "pn-share-scope-01",
            "pn-share-scope-02",
            "pn-share-scope-03",
            "pn-share-scope-04",
            "pn-share-scope-05",
            "pn-share-scope-06",
            "pn-share-scope-07",
            "pn-share-scope-08",
            "pn-share-scope-09"
          ]
        }
      ],
      "questionCount": 9,
      "limitations": [
        "专题训练引用不增加独立题量。",
        "原始材料组内题目共享信息，不视为独立样本。",
        "训练目标非难度标定，不预测真实考试分数。"
      ]
    }
  ]
};
 const qids=new Set(C.questions.map(q=>q.id)), lids=new Set(C.lessons.map(l=>l.id));
 if(data.questions.some(q=>qids.has(q.id)) || data.lessons.some(l=>lids.has(l.id))) throw new Error("Duplicate candidate IDs; no data appended");
 for(const lesson of data.lessons){
  lesson.versionNote="原创专项；同一材料/条件组内题目相关，题数不等于独立测量样本。";
  for(const [level,guide] of Object.entries(lesson.learningLevels)) lesson.learningLevels[level]={...(C.learningPaths?.[level]||{}),...guide};
 }
 window.STUDY_CONTENT={...C,lessons:[...C.lessons,...data.lessons],questions:[...C.questions,...data.questions]};
 // Deliberately does not mutate STUDY_PAPERS. Catalog integration needs explicit review.
 window.STUDY_PRACTICE_NEXT={packageVersion:data.packageVersion,papers:data.papers};
})();
