"use strict";
// Editorial whole-topic recall summaries, not verbatim political quotations or new exam questions.
// Source references identify the existing lesson and zero-based section used for each authored group.
// Load after topic-recall-cards.js and before the summary renderer; preserve the original 28 blanks.
(() => {
 const cards = window.STUDY_TOPIC_RECALL_CARDS;
 if (!cards) throw new Error("Load topic-recall-cards.js first");
 const additions = {
  "share-analysis": [
    {
      "id": "r-share-analysis-1",
      "part": 0,
      "title": "先定分母与单位",
      "quizTitle": "综合回忆 1",
      "core": "比重＝部分÷**同口径总体**；比重直接作差用**百分点**。",
      "boundary": "普通非负数量构成中，总体须大于0，部分量介于0与总体之间；部分增长不保证比重上升。",
      "prompt": "占比由20%升至25%，提高{{0}}个百分点；相对原占比增长{{1}}。",
      "blanks": [
        {
          "answer": "5",
          "accept": []
        },
        {
          "answer": "25%",
          "accept": [
            "0.25"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "share",
          "sectionIndex": 0,
          "sectionTitle": "入门：比重中的部分必须属于总体"
        },
        {
          "lessonId": "share",
          "sectionIndex": 1,
          "sectionTitle": "入门：百分数与百分点分开"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-share-analysis-2",
      "part": 0,
      "title": "跨期与合并",
      "quizTitle": "综合回忆 2",
      "core": "基期部分与总体均为正、现期总体为正时，部分增速高于总体则比重**上升**；合并率按对应**分母**加权。",
      "boundary": "增速之差不是比重的百分点差；各组变化还可能被结构权重变化抵消。",
      "prompt": "合并办结率应以各组{{0}}为权重；同比条件齐全时，部分增速低于总体，比重{{1}}。",
      "blanks": [
        {
          "answer": "受理数",
          "accept": [
            "受理量"
          ]
        },
        {
          "answer": "下降",
          "accept": [
            "降低"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "pn-share-scope",
          "sectionIndex": 3,
          "sectionTitle": "迁移：总体率按分母加权"
        },
        {
          "lessonId": "share",
          "sectionIndex": 6,
          "sectionTitle": "提升：方向与幅度要不同信息"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-share-analysis-3",
      "part": 0,
      "title": "贡献率与拉动",
      "quizTitle": "综合回忆 3",
      "core": "贡献率＝部分增量÷**总体增量**；拉动百分点数＝部分增量÷**总体基期量**×100。",
      "boundary": "同口径、不重不漏、可加总；总体基期量不为0。总体零增长时贡献率无定义；贡献率可为负或超过100%，不证明现实因果。",
      "prompt": "总体基期200、增量50，部分增量20；贡献率{{0}}，拉动{{1}}个百分点。",
      "blanks": [
        {
          "answer": "40%",
          "accept": [
            "0.4"
          ]
        },
        {
          "answer": "10",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "growth-contribution",
          "sectionIndex": 1,
          "sectionTitle": "入门：贡献率分配的是总体增加量"
        },
        {
          "lessonId": "growth-contribution",
          "sectionIndex": 2,
          "sectionTitle": "入门：拉动百分点使用总体基期"
        },
        {
          "lessonId": "growth-contribution",
          "sectionIndex": 6,
          "sectionTitle": "提升：总体零增长不等于部分无变化"
        },
        {
          "lessonId": "growth-contribution",
          "sectionIndex": 8,
          "sectionTitle": "提升：区分数学分解与现实因果"
        },
        {
          "lessonId": "growth-contribution",
          "sectionIndex": 4,
          "sectionTitle": "巩固：用加总关系做第二次核验"
        }
      ],
      "editorial": true
    }
  ],
  "average-analysis": [
    {
      "id": "r-average-analysis-1",
      "part": 0,
      "title": "总量与份数",
      "quizTitle": "综合回忆 1",
      "core": "平均数＝总量÷**总份数**；合并前先还原各组总量。",
      "boundary": "人数、人次不能混用。两组份数相等或均值相等时，直接平均恰好正确。",
      "prompt": "8项任务均耗15分钟，12项均耗10分钟；总耗时{{0}}分钟，合并均值{{1}}分钟/项。",
      "blanks": [
        {
          "answer": "240",
          "accept": []
        },
        {
          "answer": "12",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "average",
          "sectionIndex": 0,
          "sectionTitle": "概念：平均数必须与份数一起读"
        },
        {
          "lessonId": "average",
          "sectionIndex": 2,
          "sectionTitle": "步骤与完整例解"
        },
        {
          "lessonId": "average",
          "sectionIndex": 4,
          "sectionTitle": "直接平均的精确边界"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-average-analysis-2",
      "part": 0,
      "title": "两期分子分母",
      "quizTitle": "综合回忆 2",
      "core": "两期量均为正时，均值增长率＝**(a−b)/(1+b)**，a为总量增速，b为份数增速。",
      "boundary": "不能只算a−b；金额均值的数量差不叫百分点。",
      "prompt": "总量增长32%、份数增长20%，均值增长{{0}}。",
      "blanks": [
        {
          "answer": "10%",
          "accept": [
            "0.1"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "average",
          "sectionIndex": 5,
          "sectionTitle": "平均数增长：分子分母都在变"
        },
        {
          "lessonId": "average",
          "sectionIndex": 6,
          "sectionTitle": "百分数与百分点分开"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-average-analysis-3",
      "part": 0,
      "title": "误差与范围",
      "quizTitle": "综合回忆 3",
      "core": "正份数权重下，合并均值位于组均值之间；准确权重下误差界也按**份数加权**。",
      "boundary": "显示精度不能恢复原始尾数，估计区间跨选项分界就需保留更多信息。",
      "prompt": "准确权重为1/4与3/4，均值绝对误差界分别0.2与0.6，合并误差最多{{0}}。",
      "blanks": [
        {
          "answer": "0.5",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "average",
          "sectionIndex": 7,
          "sectionTitle": "误差：准确权重下怎样传递"
        },
        {
          "lessonId": "average",
          "sectionIndex": 11,
          "sectionTitle": "提升导读：结论精度由输入精度限制"
        }
      ],
      "editorial": true
    }
  ],
  "estimation": [
    {
      "id": "r-estimation-1",
      "part": 0,
      "title": "先确定任务",
      "quizTitle": "综合回忆 1",
      "core": "分清**精确数、显示数、舍入原数**；最近选项不等于精确相等。",
      "boundary": "按显示数计算与比较未知原数是不同任务。",
      "prompt": "984÷199在4.9与5之间，从3、5、7、9选最接近值，应选{{0}}；这{{1}}说明原比值恰等于它。",
      "blanks": [
        {
          "answer": "5",
          "accept": []
        },
        {
          "answer": "不能",
          "accept": [
            "不"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "estimation-boundary",
          "sectionIndex": 0,
          "sectionTitle": "入门：先标精确数、显示数和单位"
        },
        {
          "lessonId": "estimation-boundary",
          "sectionIndex": 1,
          "sectionTitle": "入门：选最近值不等于求精确相等"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-estimation-2",
      "part": 0,
      "title": "误差区间与分界",
      "quizTitle": "综合回忆 2",
      "core": "按绝对差选最近值，相邻选项的**中点**是分界；区间必须落在同一侧。",
      "boundary": "正分子、正分母的独立范围可交叉端点夹住比值；有关联时宽界未必可达。",
      "prompt": "4.01与4.03的分界是{{0}}；若结果区间跨过它，则仅凭这个区间{{1}}唯一确定最近选项。",
      "blanks": [
        {
          "answer": "4.02",
          "accept": []
        },
        {
          "answer": "不能",
          "accept": [
            "无法"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "estimation-boundary",
          "sectionIndex": 2,
          "sectionTitle": "入门：看选项的分界，不只看区间宽度"
        },
        {
          "lessonId": "estimation-boundary",
          "sectionIndex": 3,
          "sectionTitle": "巩固：正分母比值用交叉端点保守夹住"
        },
        {
          "lessonId": "estimation-boundary",
          "sectionIndex": 6,
          "sectionTitle": "提升：保守界与可达的精确范围有区别"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-estimation-3",
      "part": 0,
      "title": "舍入的信息边界",
      "quizTitle": "综合回忆 3",
      "core": "正整数四舍五入到百位显示700，对应**650至749**。",
      "boundary": "比值误差通过除法传播，分子增1%、分母减1%并非恰增2%。",
      "prompt": "正整数按通常规则四舍五入到百位为700，最大原数为{{0}}。",
      "blanks": [
        {
          "answer": "749",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "estimation-boundary",
          "sectionIndex": 5,
          "sectionTitle": "巩固：四舍五入给出范围，不能恢复原数"
        },
        {
          "lessonId": "estimation-boundary",
          "sectionIndex": 7,
          "sectionTitle": "提升：相对误差通过比值传播，不直接相减"
        }
      ],
      "editorial": true
    }
  ],
  "data-materials": [
    {
      "id": "r-data-materials-1",
      "part": 0,
      "title": "对象与时间对齐",
      "quizTitle": "综合回忆 1",
      "core": "多表先读**表头、脚注、单位、期间**；同口径、同起点的相邻累计量相减，得到两终点之间的当期量。",
      "boundary": "滚动窗口作差只留下移入日减移出日，不是新一天的总量。",
      "prompt": "2日至8日累计减1日至7日累计，等于第{{0}}日减第{{1}}日。",
      "blanks": [
        {
          "answer": "8",
          "accept": []
        },
        {
          "answer": "1",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "multi-table",
          "sectionIndex": 0,
          "sectionTitle": "入门：先给每个数贴上对象和单位"
        },
        {
          "lessonId": "on-period-scope",
          "sectionIndex": 0,
          "sectionTitle": "先标出数字覆盖的时间段"
        },
        {
          "lessonId": "on-period-scope",
          "sectionIndex": 2,
          "sectionTitle": "相邻滚动窗口消去重叠部分"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-data-materials-2",
      "part": 0,
      "title": "指数与存量",
      "quizTitle": "综合回忆 2",
      "core": "指数按题设基准解释；期末待办＝期初＋新收−**办结**。",
      "boundary": "存量等式以无其他变化为前提。指数合成只用题设权重，指数点差不是相对涨幅。",
      "prompt": "按基期100的比值指数定义，指数112表示增长{{0}}；无其他变化时，期初10、新收20、办结25，期末待办{{1}}。",
      "blanks": [
        {
          "answer": "12%",
          "accept": [
            "0.12"
          ]
        },
        {
          "answer": "5",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "fq-index-caliber",
          "sectionIndex": 0,
          "sectionTitle": "识别：指数先找基准"
        },
        {
          "lessonId": "fq-index-caliber",
          "sectionIndex": 3,
          "sectionTitle": "迁移：只按题设权重合成"
        },
        {
          "lessonId": "on-period-scope",
          "sectionIndex": 1,
          "sectionTitle": "存量等式逐期接起来"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-data-materials-3",
      "part": 0,
      "title": "分组与结构",
      "quizTitle": "综合回忆 3",
      "core": "合并均值先还原总量；中位数看**秩位置**，分组端点遵守开闭区间。",
      "boundary": "固定旧权重得到比较构造，不是本期实际均值；只知组区间不能用中点冒充精确中位数。",
      "prompt": "将100个观测按数值排序后，中位数取第{{0}}位与第{{1}}位的平均。",
      "blanks": [
        {
          "answer": "50",
          "accept": []
        },
        {
          "answer": "51",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "t35-group-statistics",
          "sectionIndex": 0,
          "sectionTitle": "识别：分组均值先还原总量"
        },
        {
          "lessonId": "t35-group-statistics",
          "sectionIndex": 1,
          "sectionTitle": "识别：端点决定哪组计入"
        },
        {
          "lessonId": "t35-group-statistics",
          "sectionIndex": 2,
          "sectionTitle": "识别：中位数用秩位置，不用组中点"
        },
        {
          "lessonId": "t35-group-statistics",
          "sectionIndex": 4,
          "sectionTitle": "迁移：固定权重是一个明确的比较构造"
        }
      ],
      "editorial": true
    }
  ],
  "formal-logic": [
    {
      "id": "r-formal-logic-1",
      "part": 0,
      "title": "箭头与否定",
      "quizTitle": "综合回忆 1",
      "core": "如果P则Q写**P→Q**；只有P才Q写**Q→P**。有效推法是肯定前件、否定后件。",
      "boundary": "不能肯定后件或否定前件；串联需同对象、同时间、同含义。",
      "prompt": "P→Q的否定为{{0}}；“只有登记才能入场”中，登记是入场的{{1}}条件。",
      "blanks": [
        {
          "answer": "P且非Q",
          "accept": [
            "P且不Q",
            "P∧¬Q",
            "P成立且Q不成立"
          ]
        },
        {
          "answer": "必要",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "logic",
          "sectionIndex": 1,
          "sectionTitle": "入门：如果与只有的箭头不同"
        },
        {
          "lessonId": "logic",
          "sectionIndex": 2,
          "sectionTitle": "入门：两种有效推法与两种误推"
        },
        {
          "lessonId": "logic",
          "sectionIndex": 3,
          "sectionTitle": "巩固：串联必须对齐中间条件"
        },
        {
          "lessonId": "logic",
          "sectionIndex": 6,
          "sectionTitle": "提升：否定条件句只需一个违例"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-formal-logic-2",
      "part": 0,
      "title": "量词与连接",
      "quizTitle": "综合回忆 2",
      "core": "“有些”表示**至少一个**，可以是全部；“并非所有”是**至少一个不**。",
      "boundary": "全称限制不自动断言对象存在；不同存在句的见证不能默认同一人。普通“或”允许同时成立。",
      "prompt": "否定“所有A是B”得到至少一个A{{0}}B；两项命题中“恰好一项为真”同时排除全真和{{1}}。",
      "blanks": [
        {
          "answer": "不是",
          "accept": [
            "不属于"
          ]
        },
        {
          "answer": "全假",
          "accept": [
            "都不成立",
            "同时不成立"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "quantified-logic",
          "sectionIndex": 0,
          "sectionTitle": "入门：所有与有些的数量含义"
        },
        {
          "lessonId": "quantified-logic",
          "sectionIndex": 1,
          "sectionTitle": "入门：全称句未必带来存在"
        },
        {
          "lessonId": "quantified-logic",
          "sectionIndex": 3,
          "sectionTitle": "巩固：否定量词时同时改变范围"
        },
        {
          "lessonId": "pn-compound-logic",
          "sectionIndex": 2,
          "sectionTitle": "识别：恰好一项的两面"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-formal-logic-3",
      "part": 0,
      "title": "约束与结论强度",
      "quizTitle": "综合回忆 3",
      "core": "固定位置、相邻块、相对先后需**同时**满足；必然要求全部合法方案成立。",
      "boundary": "找到一个例子只证明可能；“在前”不等于紧挨着。需先确认至少有合法方案。",
      "prompt": "至少有合法排列时，反驳一个必然结论，只需{{0}}个合法反例。",
      "blanks": [
        {
          "answer": "1",
          "accept": [
            "一"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "arrangement",
          "sectionIndex": 1,
          "sectionTitle": "入门：在左边与紧挨右边不是一回事"
        },
        {
          "lessonId": "arrangement",
          "sectionIndex": 3,
          "sectionTitle": "巩固：把条件叠加到同一个排列里"
        },
        {
          "lessonId": "arrangement",
          "sectionIndex": 6,
          "sectionTitle": "提升：必然、可能和不可能用不同标准检查"
        }
      ],
      "editorial": true
    }
  ],
  "definition-analysis": [
    {
      "id": "r-definition-analysis-1",
      "part": 0,
      "title": "本题规则优先",
      "quizTitle": "综合回忆 1",
      "core": "先看属于、**不属于**还是不能确定，再提取条件及且、或、非。",
      "boundary": "熟悉的名称不能替代题干自定义；条件表不是固定六要素硬套。",
      "prompt": "A且B且C的定义要求{{0}}条件同时满足；只满足一个必要条件{{1}}判定符合。",
      "blanks": [
        {
          "answer": "全部",
          "accept": [
            "所有",
            "三个"
          ]
        },
        {
          "answer": "不能",
          "accept": [
            "不足以"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "definition",
          "sectionIndex": 0,
          "sectionTitle": "任务边界：先服从题目给定定义"
        },
        {
          "lessonId": "definition",
          "sectionIndex": 1,
          "sectionTitle": "概念：要素与连接关系要一起读"
        },
        {
          "lessonId": "definition",
          "sectionIndex": 2,
          "sectionTitle": "方法一：完整条件表逐项核对"
        },
        {
          "lessonId": "definition",
          "sectionIndex": 3,
          "sectionTitle": "方法二：先查容易确证的必要条件"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-definition-analysis-2",
      "part": 0,
      "title": "保留三种状态",
      "quizTitle": "综合回忆 2",
      "core": "逐项标**满足、不满足、未说明**；未知不能当作失败。",
      "boundary": "尚未说明期限是否已过，不等于明确未过期限。",
      "prompt": "关键条件未交代且无明确失败项，应保留{{0}}状态。",
      "blanks": [
        {
          "answer": "未知",
          "accept": [
            "未说明",
            "不能确定"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "definition",
          "sectionIndex": 2,
          "sectionTitle": "方法一：完整条件表逐项核对"
        },
        {
          "lessonId": "definition",
          "sectionIndex": 6,
          "sectionTitle": "未说明与明确没有不同"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-definition-analysis-3",
      "part": 0,
      "title": "组合与例外",
      "quizTitle": "综合回忆 3",
      "core": "先确定括号范围；双定义交集保留双方全部条件；**除外条件**也是规则。",
      "boundary": "（持码或在名单内）且核验，不能只凭身份依据就省略核验。",
      "prompt": "定义要求登记、培训且排除处罚期者，处罚状态未说明时，{{0}}直接判符合。",
      "blanks": [
        {
          "answer": "不能",
          "accept": [
            "不可"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "definition-conditions",
          "sectionIndex": 3,
          "sectionTitle": "巩固：括号决定条件的组合范围"
        },
        {
          "lessonId": "definition-conditions",
          "sectionIndex": 4,
          "sectionTitle": "巩固：两个定义分别建表再求交集"
        },
        {
          "lessonId": "definition-conditions",
          "sectionIndex": 6,
          "sectionTitle": "提升：例外条件也是规则的一部分"
        }
      ],
      "editorial": true
    }
  ],
  "analogy-analysis": [
    {
      "id": "r-analogy-analysis-1",
      "part": 0,
      "title": "说清关系",
      "quizTitle": "综合回忆 1",
      "core": "“是一种”辨**种属**，“是组成部分”辨**组成**，用途与工具另列。",
      "boundary": "相关不等于同关系；包含图形相似也不能混用含义。",
      "prompt": "正方形与四边形是{{0}}关系；车轮与汽车是{{1}}关系。",
      "blanks": [
        {
          "answer": "种属",
          "accept": [
            "种属包含"
          ]
        },
        {
          "answer": "组成",
          "accept": [
            "组成关系"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "analogy",
          "sectionIndex": 0,
          "sectionTitle": "入门：相关还不够，要说清关系"
        },
        {
          "lessonId": "analogy",
          "sectionIndex": 1,
          "sectionTitle": "入门：种属与组成用两个句式区别"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-analogy-analysis-2",
      "part": 0,
      "title": "位置与层级",
      "quizTitle": "综合回忆 2",
      "core": "按题干角色核对**方向、层级、全部词项**，三项链不能只配两项。",
      "boundary": "对称关系不强加方向；同层级并列未必穷尽讨论范围。",
      "prompt": "全体整数中的正整数和负整数遗漏了{{0}}，所以不构成穷尽划分。",
      "blanks": [
        {
          "answer": "0",
          "accept": [
            "零"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "analogy",
          "sectionIndex": 2,
          "sectionTitle": "入门：方向也是题干的一部分"
        },
        {
          "lessonId": "analogy",
          "sectionIndex": 3,
          "sectionTitle": "巩固：同层级并列还要查是否穷尽"
        },
        {
          "lessonId": "analogy",
          "sectionIndex": 4,
          "sectionTitle": "巩固：三项关系逐位置核对"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-analogy-analysis-3",
      "part": 0,
      "title": "细分而不改题",
      "quizTitle": "综合回忆 3",
      "core": "**主关系相同再按题干已有属性细分**；连续种属包含可传递。",
      "boundary": "不能为凑选项临时改词义；连续组成不是连续分类链。",
      "prompt": "甲类属于乙类、乙类属于丙类，则甲类{{0}}丙类。",
      "blanks": [
        {
          "answer": "属于",
          "accept": [
            "包含于"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "analogy",
          "sectionIndex": 5,
          "sectionTitle": "巩固：多候选时保留同一标准"
        },
        {
          "lessonId": "analogy",
          "sectionIndex": 6,
          "sectionTitle": "提升：连续包含不是连续组成"
        }
      ],
      "editorial": true
    }
  ],
  "argument-analysis": [
    {
      "id": "r-argument-analysis-1",
      "part": 0,
      "title": "找论证缺口",
      "quizTitle": "综合回忆 1",
      "core": "按**结论—证据—缺口—选项**判断，保留对象、时间、指标和程度。",
      "boundary": "加强不等于证明，削弱不等于证明相反；正负情绪不是作用方向。",
      "prompt": "评价选项前，应先区分用于支持的{{0}}和作者要推出的{{1}}。",
      "blanks": [
        {
          "answer": "证据",
          "accept": [
            "论据"
          ]
        },
        {
          "answer": "结论",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "argument",
          "sectionIndex": 0,
          "sectionTitle": "任务边界：评价证据怎样支持结论"
        },
        {
          "lessonId": "argument",
          "sectionIndex": 1,
          "sectionTitle": "原理：把没有说出的连接找出来"
        },
        {
          "lessonId": "argument",
          "sectionIndex": 2,
          "sectionTitle": "步骤：结论、证据、缺口、选项"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-argument-analysis-2",
      "part": 0,
      "title": "因果与可比",
      "quizTitle": "综合回忆 2",
      "core": "相关、先后都不自动证明**因果**；核对选择、测量、同期变化和反向解释。",
      "boundary": "有对照组也不自动排除一切差异；排除一个他因不代表全部排除。",
      "prompt": "错误多导致复核多，若反推复核造成错误，就混淆了{{0}}方向。",
      "blanks": [
        {
          "answer": "因果",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "argument",
          "sectionIndex": 6,
          "sectionTitle": "因果论证：他因、倒因与共同变化"
        },
        {
          "lessonId": "argument-controls",
          "sectionIndex": 0,
          "sectionTitle": "入门：差异事实与因果解释分开"
        },
        {
          "lessonId": "argument-controls",
          "sectionIndex": 1,
          "sectionTitle": "入门：原因也可能影响措施选择"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-argument-analysis-3",
      "part": 0,
      "title": "桥梁与外推",
      "quizTitle": "综合回忆 3",
      "core": "从记录到实际状态、再到原因及推广，逐段查桥梁；必要前提可用**否定检验**。",
      "boundary": "必要前提的否定须使当前论证的必要连接不成立，不能仅凭有所削弱就认定必要；这不等于结论在现实中绝不可能成立。推广还查对象条件。",
      "prompt": "若研究只覆盖试点，推广到其他对象还需检查对象间的{{0}}。",
      "blanks": [
        {
          "answer": "可比性",
          "accept": [
            "可比条件",
            "可比程度"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "argument",
          "sectionIndex": 3,
          "sectionTitle": "方法一：沿论证链定位断点"
        },
        {
          "lessonId": "on-argument-chain",
          "sectionIndex": 1,
          "sectionTitle": "必要前提用否定检验"
        },
        {
          "lessonId": "on-argument-chain",
          "sectionIndex": 6,
          "sectionTitle": "受限实验不支持无限外推"
        }
      ],
      "editorial": true
    }
  ],
  "plane-figures": [
    {
      "id": "r-plane-figures-1",
      "part": 0,
      "title": "先定观察规则",
      "quizTitle": "综合回忆 1",
      "core": "区分黑格、连通部分与孔洞；本课连通按**共边**，角点不算。",
      "boundary": "辅助网格不计入图线；对称要逐格重合，不是两边数量一样。",
      "prompt": "按共边标准，对角排列的3个黑格有{{0}}个连通部分。",
      "blanks": [
        {
          "answer": "3",
          "accept": [
            "三"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "figure-features",
          "sectionIndex": 0,
          "sectionTitle": "入门：先说清楚数的是什么"
        },
        {
          "lessonId": "figure-features",
          "sectionIndex": 1,
          "sectionTitle": "入门：连通必须固定接触标准"
        },
        {
          "lessonId": "figure-features",
          "sectionIndex": 4,
          "sectionTitle": "巩固：轴对称要逐格镜像重合"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-plane-figures-2",
      "part": 0,
      "title": "追踪位置和方向",
      "quizTitle": "综合回忆 2",
      "core": "平移保持朝向；整体旋转各元素共享**中心、转向、角度**。",
      "boundary": "独立运动的元素须分别追踪；数学坐标与屏幕坐标不可混用。",
      "prompt": "向上箭头顺时针90°后朝{{0}}；再转3次90°后回到{{1}}朝向。",
      "blanks": [
        {
          "answer": "右",
          "accept": [
            "右方"
          ]
        },
        {
          "answer": "起始",
          "accept": [
            "原来",
            "向上"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "rotation",
          "sectionIndex": 1,
          "sectionTitle": "入门：平移与旋转分别改变什么"
        },
        {
          "lessonId": "rotation",
          "sectionIndex": 2,
          "sectionTitle": "入门：用交互演示验证一整圈"
        },
        {
          "lessonId": "rotation",
          "sectionIndex": 3,
          "sectionTitle": "巩固：分别追踪多个元素再合并"
        },
        {
          "lessonId": "rotation",
          "sectionIndex": 4,
          "sectionTitle": "巩固：用坐标法复核方向"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-plane-figures-3",
      "part": 0,
      "title": "逐格运算并验证",
      "quizTitle": "综合回忆 3",
      "core": "并集任一黑，交集都黑，**异或不同色才黑**；规则要解释全部已知格。",
      "boundary": "先对齐位置。异或可反推，但并集一般不能唯一反推输入。",
      "prompt": "两输入均黑时，异或结果为{{0}}色。",
      "blanks": [
        {
          "answer": "白",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "overlay",
          "sectionIndex": 0,
          "sectionTitle": "入门：先让位置一一对应"
        },
        {
          "lessonId": "overlay",
          "sectionIndex": 1,
          "sectionTitle": "入门：三种规则分别怎样判黑"
        },
        {
          "lessonId": "overlay",
          "sectionIndex": 3,
          "sectionTitle": "巩固：先验证规则，再应用问号组"
        },
        {
          "lessonId": "overlay",
          "sectionIndex": 4,
          "sectionTitle": "巩固：异或可以反推缺失输入"
        }
      ],
      "editorial": true
    }
  ],
  "spatial-figures": [
    {
      "id": "r-spatial-figures-1",
      "part": 0,
      "title": "折叠先看关系",
      "quizTitle": "综合回忆 1",
      "core": "正方体每面有**四邻一对**；顶点三面不含相对面。",
      "boundary": "纸面没相接不代表空间相对；面集合可行不等于观察朝向正确，镜像不是旋转。",
      "prompt": "正方体每面有{{0}}个邻面、{{1}}个相对面。",
      "blanks": [
        {
          "answer": "4",
          "accept": [
            "四"
          ]
        },
        {
          "answer": "1",
          "accept": [
            "一"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "cube-net",
          "sectionIndex": 2,
          "sectionTitle": "入门：每面有四个邻面和一个对面"
        },
        {
          "lessonId": "cube-net",
          "sectionIndex": 3,
          "sectionTitle": "巩固：共顶点先筛面集合"
        },
        {
          "lessonId": "cube-net",
          "sectionIndex": 4,
          "sectionTitle": "巩固：固定顶面和前面后再看右面"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-spatial-figures-2",
      "part": 0,
      "title": "视图与数量",
      "quizTitle": "综合回忆 2",
      "core": "连续无空洞柱模型：俯视看非零位置，正视同列取**最大高度**。",
      "boundary": "投影格数不是总小方块数；读侧视需固定近远方向。",
      "prompt": "前后两柱高度2和5，正视轮廓高度取{{0}}，不是相加。",
      "blanks": [
        {
          "answer": "5",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "solid-views",
          "sectionIndex": 0,
          "sectionTitle": "入门：先固定地面网格和观察方向"
        },
        {
          "lessonId": "solid-views",
          "sectionIndex": 1,
          "sectionTitle": "入门：俯视数有柱的位置"
        },
        {
          "lessonId": "solid-views",
          "sectionIndex": 2,
          "sectionTitle": "入门：正视轮廓取同列最大值"
        },
        {
          "lessonId": "solid-views",
          "sectionIndex": 3,
          "sectionTitle": "巩固：侧视需说明沿哪个方向排列"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-spatial-figures-3",
      "part": 0,
      "title": "翻滚与截面",
      "quizTitle": "综合回忆 3",
      "core": "翻滚逐步更新六面；截面由平面与**棱的交点**形成并需去重。",
      "boundary": "不同轴操作一般不交换；透视轮廓不能代替截面真实形状。",
      "prompt": "第二次翻滚使用第{{0}}次翻滚后的状态。",
      "blanks": [
        {
          "answer": "1",
          "accept": [
            "一"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "t35-spatial-transform",
          "sectionIndex": 2,
          "sectionTitle": "识别：截面形状不是透视轮廓"
        },
        {
          "lessonId": "t35-spatial-transform",
          "sectionIndex": 3,
          "sectionTitle": "迁移：复合操作逐步更新"
        },
        {
          "lessonId": "t35-spatial-transform",
          "sectionIndex": 4,
          "sectionTitle": "迁移：先求与棱的交点"
        }
      ],
      "editorial": true
    }
  ],
  "profit": [
    {
      "id": "r-profit-1",
      "part": 0,
      "title": "钱与分母",
      "quizTitle": "综合回忆 1",
      "core": "利润＝实际收入−题设成本费用；成本利润率分母是**成本**，毛利率分母是售价。",
      "boundary": "标价不等于收入，九折作用于标价而非成本。",
      "prompt": "成本80、售价100、无其他费用，利润{{0}}元，成本利润率{{1}}。",
      "blanks": [
        {
          "answer": "20",
          "accept": []
        },
        {
          "answer": "25%",
          "accept": [
            "0.25"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "profit-discount",
          "sectionIndex": 0,
          "sectionTitle": "入门：先分清成本、标价与售价"
        },
        {
          "lessonId": "profit-discount",
          "sectionIndex": 1,
          "sectionTitle": "入门：利润率先写分母"
        },
        {
          "lessonId": "profit-bases",
          "sectionIndex": 0,
          "sectionTitle": "入门① 先给每笔钱找位置"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-profit-2",
      "part": 0,
      "title": "按顺序算",
      "quizTitle": "综合回忆 2",
      "core": "加价、折扣、满减、手续费按**各自基数及顺序**列式。",
      "boundary": "特值100只换尺度，不能据此确定真实金额。",
      "prompt": "成本加价50%后八折，无其他费用，成本利润率为{{0}}。",
      "blanks": [
        {
          "answer": "20%",
          "accept": [
            "0.2"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "profit-discount",
          "sectionIndex": 3,
          "sectionTitle": "巩固：按时间顺序建立收入链"
        },
        {
          "lessonId": "profit-bases",
          "sectionIndex": 1,
          "sectionTitle": "入门② 加成和折扣不是在同一处加减"
        },
        {
          "lessonId": "profit-bases",
          "sectionIndex": 2,
          "sectionTitle": "入门③ 设成本100是换尺度，不是发现真实金额"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-profit-3",
      "part": 0,
      "title": "总体按钱加权",
      "quizTitle": "综合回忆 3",
      "core": "总体利润率＝总利润÷**总成本**；单位成本相同时数量权重才可替代。",
      "boundary": "各批件数相同不代表成本相同，未售部分与额外费用按题设保留。",
      "prompt": "两批成本100、300，成本利润率30%、10%，总体利润率{{0}}。",
      "blanks": [
        {
          "answer": "15%",
          "accept": [
            "0.15"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "profit-discount",
          "sectionIndex": 4,
          "sectionTitle": "巩固：多批商品按成本加权"
        },
        {
          "lessonId": "profit-bases",
          "sectionIndex": 3,
          "sectionTitle": "基础① 同成本分批，数量权重才可代替成本权重"
        },
        {
          "lessonId": "profit-bases",
          "sectionIndex": 4,
          "sectionTitle": "基础② 不同成本分批，回到总利润与总成本"
        }
      ],
      "editorial": true
    }
  ],
  "concentration": [
    {
      "id": "r-concentration-1",
      "part": 0,
      "title": "质量分数与守恒",
      "quizTitle": "综合回忆 1",
      "core": "质量分数＝溶质质量÷**溶液总质量**；分别记溶质与总量。",
      "boundary": "质量口径不能直接混用体积；按题设检查无反应、无损失、完全溶解。",
      "prompt": "120克25%溶液含溶质{{0}}克，分母是{{1}}质量。",
      "blanks": [
        {
          "answer": "30",
          "accept": []
        },
        {
          "answer": "溶液",
          "accept": [
            "溶液总"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "mixture",
          "sectionIndex": 0,
          "sectionTitle": "入门：浓度先按题目确定口径"
        },
        {
          "lessonId": "mixture",
          "sectionIndex": 1,
          "sectionTitle": "入门：把溶质与总量分两栏"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-concentration-2",
      "part": 0,
      "title": "操作决定哪栏变",
      "quizTitle": "综合回忆 2",
      "core": "加纯水只增总量；加入并**完全溶解**的纯溶质两栏都增；均匀取出后剩余浓度**不变**。",
      "boundary": "均匀取出结论不适用于分层、沉淀或选择性损失。",
      "prompt": "充分混匀后只取走部分溶液，余液浓度{{0}}。",
      "blanks": [
        {
          "answer": "不变",
          "accept": [
            "保持不变"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "mixture",
          "sectionIndex": 1,
          "sectionTitle": "入门：把溶质与总量分两栏"
        },
        {
          "lessonId": "mixture",
          "sectionIndex": 2,
          "sectionTitle": "入门：均匀取出不改变剩余浓度"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-concentration-3",
      "part": 0,
      "title": "混合与回代",
      "quizTitle": "综合回忆 3",
      "core": "同种溶质、无反应无损失时按**溶液质量**加权；原溶质质量m、溶液总质量M，加入并完全溶解纯溶质x后浓度为(m+x)/(M+x)。",
      "boundary": "两浓度不同、质量均正时混合浓度严格居中；不能只给分子加x。",
      "prompt": "200克10%溶液加入纯溶质并完全溶解至20%，需加入{{0}}克。",
      "blanks": [
        {
          "answer": "25",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "mixture",
          "sectionIndex": 3,
          "sectionTitle": "巩固：混合用质量作权重"
        },
        {
          "lessonId": "mixture",
          "sectionIndex": 4,
          "sectionTitle": "巩固：加纯溶质时分母也增加"
        }
      ],
      "editorial": true
    }
  ],
  "geometry": [
    {
      "id": "r-geometry-1",
      "part": 0,
      "title": "相似才用幂次",
      "quizTitle": "综合回忆 1",
      "core": "相似图形长度比k，周长比**k**、面积比**k²**；相似立体体积比**k³**。",
      "boundary": "只拉长一个方向不叫整体相似放大。",
      "prompt": "相似图形长度比3:2，面积比{{0}}；相似立体体积比{{1}}。",
      "blanks": [
        {
          "answer": "9:4",
          "accept": [
            "9：4",
            "9/4"
          ]
        },
        {
          "answer": "27:8",
          "accept": [
            "27：8",
            "27/8"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "geometry-scale",
          "sectionIndex": 0,
          "sectionTitle": "入门：先确认图形关系，再谈放大倍数"
        },
        {
          "lessonId": "geometry-scale",
          "sectionIndex": 3,
          "sectionTitle": "巩固：相似缩放既可正推，也可反推"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-geometry-2",
      "part": 0,
      "title": "量纲和对应",
      "quizTitle": "综合回忆 2",
      "core": "三角形底配**垂直高**；圆面积用半径；单位换算随维度乘方。",
      "boundary": "斜边不自动是高，直径不能直接当半径。",
      "prompt": "1平方米＝{{0}}平方厘米。",
      "blanks": [
        {
          "answer": "10000",
          "accept": [
            "一万"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "geometry-scale",
          "sectionIndex": 1,
          "sectionTitle": "入门：面积公式要配对正确的长度"
        },
        {
          "lessonId": "geometry-scale",
          "sectionIndex": 2,
          "sectionTitle": "入门：单位换算要和维度一起改变"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-geometry-3",
      "part": 0,
      "title": "非相似分别相乘",
      "quizTitle": "综合回忆 3",
      "core": "长方形长宽分别变化时，面积倍率＝**长倍率×宽倍率**。",
      "boundary": "先统一原始基准；涨跌百分比直接相加会漏乘积项。",
      "prompt": "长方形长增50%、宽减20%，面积增长{{0}}。",
      "blanks": [
        {
          "answer": "20%",
          "accept": [
            "0.2"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "geometry-scale",
          "sectionIndex": 4,
          "sectionTitle": "巩固：两个方向变化不同，就分别相乘"
        }
      ],
      "editorial": true
    }
  ],
  "work-process": [
    {
      "id": "r-work-process-1",
      "part": 0,
      "title": "统一量与效率",
      "quizTitle": "综合回忆 1",
      "core": "**恒效时工作量＝效率×时间**；同一任务可设总量1或方便的公倍数。",
      "boundary": "仅独立分工、成果不重复且无协作损耗时，效率才可直接相加。",
      "prompt": "同一任务甲12天、乙18天完成，设总量36，日效率分别为{{0}}和{{1}}。",
      "blanks": [
        {
          "answer": "3",
          "accept": []
        },
        {
          "answer": "2",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "work",
          "sectionIndex": 0,
          "sectionTitle": "入门：工作量、效率、时间是什么"
        },
        {
          "lessonId": "work",
          "sectionIndex": 1,
          "sectionTitle": "入门：相加的是效率，不是时间"
        },
        {
          "lessonId": "work",
          "sectionIndex": 2,
          "sectionTitle": "入门：用时间反推效率"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-work-process-2",
      "part": 0,
      "title": "变动即分段",
      "quizTitle": "综合回忆 2",
      "core": "**人员、效率、损耗变化处画时间线，各段完成量相加**；问剩余时长只计后段，问总工期还须加上前段。",
      "boundary": "损耗仅作用于指定阶段，效率降到80%并非时间加20%。",
      "prompt": "同一任务甲12天、乙18天，甲先做3天后合作且效率相加，总工期为{{0}}天。",
      "blanks": [
        {
          "answer": "8.4",
          "accept": [
            "42/5"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "work-stages",
          "sectionIndex": 2,
          "sectionTitle": "入门③ 先做多少与之后还要多久分两栏"
        },
        {
          "lessonId": "work-stages",
          "sectionIndex": 3,
          "sectionTitle": "基础① 每逢条件变化，重新写这一段的效率"
        },
        {
          "lessonId": "work-stages",
          "sectionIndex": 4,
          "sectionTitle": "基础② 合作损耗只施加在题设指定阶段"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-work-process-3",
      "part": 0,
      "title": "存量扣净流量",
      "quizTitle": "综合回忆 3",
      "core": "恒速积压＝初始量＋新增−处理；清空时间用**净处理速度**。",
      "boundary": "初始量正时，处理须快于进入；变速需先结算库存，不得越过首次清空继续减成负数。",
      "prompt": "初始积压100，每小时进入5、处理15，首次清空需{{0}}小时。",
      "blanks": [
        {
          "answer": "10",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "fq-dynamic-stock",
          "sectionIndex": 0,
          "sectionTitle": "识别：把库存与流量分开"
        },
        {
          "lessonId": "fq-dynamic-stock",
          "sectionIndex": 1,
          "sectionTitle": "识别：先看能否清空"
        },
        {
          "lessonId": "fq-dynamic-stock",
          "sectionIndex": 3,
          "sectionTitle": "迁移：变速就分段记账"
        }
      ],
      "editorial": true
    }
  ],
  "travel-topic": [
    {
      "id": "r-travel-topic-1",
      "part": 0,
      "title": "总路程配总时间",
      "quizTitle": "综合回忆 1",
      "core": "匀速路程＝速率×时间；平均速率＝**总路程÷总时间**。",
      "boundary": "停留是否计入按题问；平均速度涉及位移，不能与平均速率混用。",
      "prompt": "12千米/小时行进90分钟，路程{{0}}千米；1米/秒＝{{1}}千米/小时。",
      "blanks": [
        {
          "answer": "18",
          "accept": []
        },
        {
          "answer": "3.6",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "travel",
          "sectionIndex": 0,
          "sectionTitle": "入门：先把路程和时间配起来"
        },
        {
          "lessonId": "travel",
          "sectionIndex": 1,
          "sectionTitle": "入门：变化过程按段写清"
        },
        {
          "lessonId": "travel",
          "sectionIndex": 2,
          "sectionTitle": "入门：平均速率回到总量"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-travel-topic-2",
      "part": 0,
      "title": "等时与等距",
      "quizTitle": "综合回忆 2",
      "core": "等时平均(u+v)/2；正速率、等距无停留平均**2uv/(u+v)**。",
      "boundary": "等距慢段耗时更长，不能直接算术平均。",
      "prompt": "等距往返速度10和20千米/小时，无停留，平均速率{{0}}千米/小时。",
      "blanks": [
        {
          "answer": "40/3",
          "accept": [
            "13又1/3"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "travel",
          "sectionIndex": 3,
          "sectionTitle": "巩固：等时与等距为什么不同"
        },
        {
          "lessonId": "travel",
          "sectionIndex": 4,
          "sectionTitle": "巩固：先还原时间，再用简式复算"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-travel-topic-3",
      "part": 0,
      "title": "相遇追及看相对运动",
      "quizTitle": "综合回忆 3",
      "core": "直线上共同匀速、未折返且未提前到终点的阶段，相向按**速率和**缩短间隔；较快者在后同向追及按**速率差**缩短间隔。",
      "boundary": "统一出发时间、方向和间隔，追者不更快时常规同向追及无法发生。",
      "prompt": "直线上同向持续匀速且未提前到终点，后者每小时8千米、前者5千米，初距6千米，追上需{{0}}小时。",
      "blanks": [
        {
          "answer": "2",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "travel",
          "sectionIndex": 5,
          "sectionTitle": "巩固：相遇和追及看相对位置"
        },
        {
          "lessonId": "travel",
          "sectionIndex": 6,
          "sectionTitle": "提升：停留与平均的统计范围"
        }
      ],
      "editorial": true
    }
  ],
  "scheduling": [
    {
      "id": "r-scheduling-1",
      "part": 0,
      "title": "起点决定余数",
      "quizTitle": "综合回忆 1",
      "core": "第1天为周期首位时先算**n−1**；同起点的共同周期用最小正公倍数。",
      "boundary": "不同起点先解偏移条件，不能把公倍数当首个交点。",
      "prompt": "周期3天，第1天为首位，第7天在第{{0}}位；同起点周期4与6天下次同日发生在{{1}}天后。",
      "blanks": [
        {
          "answer": "1",
          "accept": [
            "一"
          ]
        },
        {
          "answer": "12",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "t35-period-schedule",
          "sectionIndex": 0,
          "sectionTitle": "识别：经过量和第几天不同"
        },
        {
          "lessonId": "t35-period-schedule",
          "sectionIndex": 1,
          "sectionTitle": "识别：同起点与不同起点分开"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-scheduling-2",
      "part": 0,
      "title": "区间和集合",
      "quizTitle": "综合回忆 2",
      "core": "至少一项事件用并集，减去重复日期；两项**同时发生的时长**看交集长度。",
      "boundary": "第0天是否计入、区间开闭必须明确；单个连续时间端点长度为0。",
      "prompt": "A、B日期数分别5、4，交集2天，并集共有{{0}}天。",
      "blanks": [
        {
          "answer": "7",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "t35-period-schedule",
          "sectionIndex": 3,
          "sectionTitle": "迁移：日期集合先列清再容斥"
        },
        {
          "lessonId": "t35-period-schedule",
          "sectionIndex": 6,
          "sectionTitle": "边界：区间相交算长度而非次数"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-scheduling-3",
      "part": 0,
      "title": "最短要可达",
      "quizTitle": "综合回忆 3",
      "core": "列人员机器资源、依赖和并行；前置完成时刻取**最大值**，再核验可行安排。",
      "boundary": "自动运行不必占人但仍占时间；只给理论下界未证明能实现。",
      "prompt": "某步须等两项前置完成，分别在第3、5分钟结束，最早第{{0}}分钟开始（资源可用）。",
      "blanks": [
        {
          "answer": "5",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "t35-period-schedule",
          "sectionIndex": 2,
          "sectionTitle": "识别：自动运行和等待未必占人"
        },
        {
          "lessonId": "t35-period-schedule",
          "sectionIndex": 4,
          "sectionTitle": "迁移：依赖链用最晚前置完成时刻"
        },
        {
          "lessonId": "t35-period-schedule",
          "sectionIndex": 5,
          "sectionTitle": "迁移：总量下界要配可行分配"
        }
      ],
      "editorial": true
    }
  ],
  "counting": [
    {
      "id": "r-counting-1",
      "part": 0,
      "title": "先定结果类型",
      "quizTitle": "综合回忆 1",
      "core": "有序用排列，无序选取用组合；分类**互斥且穷尽**，分步按实际可选数相乘。",
      "boundary": "无标号分组只除实际重复，重复选取不能机械除k!；相邻块保留内部顺序。",
      "prompt": "4个不同人选2人组成无职务小组，有{{0}}种；分别任两个不同职务，有{{1}}种。",
      "blanks": [
        {
          "answer": "6",
          "accept": []
        },
        {
          "answer": "12",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "count",
          "sectionIndex": 0,
          "sectionTitle": "先定义什么叫一种结果"
        },
        {
          "lessonId": "count",
          "sectionIndex": 1,
          "sectionTitle": "分类相加与分步相乘的条件"
        },
        {
          "lessonId": "count",
          "sectionIndex": 2,
          "sectionTitle": "排列与组合的推导"
        },
        {
          "lessonId": "count",
          "sectionIndex": 4,
          "sectionTitle": "无标号等分组：除掉组间重数"
        },
        {
          "lessonId": "fq-integer-count",
          "sectionIndex": 1,
          "sectionTitle": "识别：捆绑保留内部顺序"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-counting-2",
      "part": 0,
      "title": "余数与整数域",
      "quizTitle": "综合回忆 2",
      "core": "N=mq+r，**0≤r<m**；共同解找到起点后按最小公倍数推进。",
      "boundary": "公因数相容只是检查的一环；非负整数、上下限和可达构造不能漏。",
      "prompt": "除以4余1且除以6余3，20至60的合法数为21、33、45、{{0}}。",
      "blanks": [
        {
          "answer": "57",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "remainders",
          "sectionIndex": 0,
          "sectionTitle": "入门：余数先遵守除法的范围"
        },
        {
          "lessonId": "remainders",
          "sectionIndex": 3,
          "sectionTitle": "巩固：在给定区间按步长生成候选"
        },
        {
          "lessonId": "remainders",
          "sectionIndex": 4,
          "sectionTitle": "巩固：找到一个解后，用共同周期检查后续"
        },
        {
          "lessonId": "fq-integer-count",
          "sectionIndex": 0,
          "sectionTitle": "识别：先写整数域"
        },
        {
          "lessonId": "fq-integer-count",
          "sectionIndex": 6,
          "sectionTitle": "边界：公因数是必要条件"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-counting-3",
      "part": 0,
      "title": "容斥要核交集口径",
      "quizTitle": "综合回忆 3",
      "core": "三集合单项和S、含三重的两两交集和P、三重T：并集**S−P+T**，恰两项**P−3T**。",
      "boundary": "恰好两项与至少两项不同；给仅AB时不能再按含三重的AB硬减。八区均须非负整数。",
      "prompt": "S=30、P=9、T=2，则并集{{0}}人，恰好两项{{1}}人。",
      "blanks": [
        {
          "answer": "23",
          "accept": []
        },
        {
          "answer": "3",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "inclusion",
          "sectionIndex": 0,
          "sectionTitle": "入门：交集为何要减一次"
        },
        {
          "lessonId": "three-set-counting",
          "sectionIndex": 3,
          "sectionTitle": "基础① 用每个人被计几次解释公式"
        },
        {
          "lessonId": "three-set-counting",
          "sectionIndex": 5,
          "sectionTitle": "基础③ 题目给仅两项时，不套原式硬减"
        },
        {
          "lessonId": "three-set-counting",
          "sectionIndex": 6,
          "sectionTitle": "提高① 还原八区，核验数据是否成立"
        }
      ],
      "editorial": true
    }
  ],
  "probability-guarantee": [
    {
      "id": "r-probability-guarantee-1",
      "part": 0,
      "title": "概率先定样本空间",
      "quizTitle": "综合回忆 1",
      "core": "**等可能才用有利数÷总数**；同一路径用条件概率相乘，互斥路径相加。",
      "boundary": "分子分母须同为有序或无序；边际概率不自动推出独立。",
      "prompt": "两枚公平独立骰子，已知至少一枚为6，双6的条件概率为{{0}}；已知第一枚为6则为{{1}}。",
      "blanks": [
        {
          "answer": "1/11",
          "accept": []
        },
        {
          "answer": "1/6",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "probability",
          "sectionIndex": 0,
          "sectionTitle": "入门：先确定基本结果与是否等可能"
        },
        {
          "lessonId": "probability",
          "sectionIndex": 2,
          "sectionTitle": "入门：概率结果要符合基本范围"
        },
        {
          "lessonId": "probability",
          "sectionIndex": 6,
          "sectionTitle": "提升：条件概率要重新限定样本空间"
        },
        {
          "lessonId": "probability",
          "sectionIndex": 7,
          "sectionTitle": "提升：边际概率不自动给出独立性"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-probability-guarantee-2",
      "part": 0,
      "title": "不放回逐步更新",
      "quizTitle": "综合回忆 2",
      "core": "每次更新**总库存与目标库存**；至少一次可求“零次”的补事件。",
      "boundary": "未查看首抽不同于已知首抽颜色；额外移除操作须重建各分支。",
      "prompt": "4红3蓝，首抽已知红且不放回，第二抽红的概率为{{0}}。",
      "blanks": [
        {
          "answer": "1/2",
          "accept": [
            "0.5",
            "50%"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "without-replacement",
          "sectionIndex": 1,
          "sectionTitle": "入门② 每取走一个，就更新一次库存"
        },
        {
          "lessonId": "without-replacement",
          "sectionIndex": 3,
          "sectionTitle": "基础① 同一路径相乘，不同互斥路径相加"
        },
        {
          "lessonId": "without-replacement",
          "sectionIndex": 5,
          "sectionTitle": "基础③ 没有看见，不等于已经知道颜色"
        },
        {
          "lessonId": "without-replacement",
          "sectionIndex": 6,
          "sectionTitle": "提高① 加入额外操作，要重新建立路径"
        }
      ],
      "editorial": true
    },
    {
      "id": "r-probability-guarantee-3",
      "part": 0,
      "title": "保证看最坏构造",
      "quizTitle": "综合回忆 3",
      "core": "先找**最多失败数，再加1**；核验临界构造、库存和目标可达性。",
      "boundary": "任意颜色与指定颜色不同；概率大不等于保证，目标库存不足则无合法保证数。",
      "prompt": "四种颜色均有充足库存，不放回任意抽取，保证至少有一种颜色出现两张，至少抽{{0}}张。",
      "blanks": [
        {
          "answer": "5",
          "accept": []
        }
      ],
      "sources": [
        {
          "lessonId": "guarantee-count",
          "sectionIndex": 0,
          "sectionTitle": "入门：保证与有可能是两个问题"
        },
        {
          "lessonId": "guarantee-count",
          "sectionIndex": 2,
          "sectionTitle": "入门：同色成对先避开重复"
        },
        {
          "lessonId": "guarantee-count",
          "sectionIndex": 3,
          "sectionTitle": "巩固：指定颜色与任意颜色不同"
        },
        {
          "lessonId": "guarantee-count",
          "sectionIndex": 6,
          "sectionTitle": "提升：先问目标能否达到"
        },
        {
          "lessonId": "guarantee-count",
          "sectionIndex": 8,
          "sectionTitle": "提升：证明上界还要给出临界构造"
        }
      ],
      "editorial": true
    }
  ],
  "materialism": [
    {
      "id": "materialism-recall-1",
      "part": 0,
      "title": "先认理论与分类轴",
      "quizTitle": "第1组 · 回想关键关系",
      "core": "马克思主义由哲学、政治经济学、科学社会主义组成；直接理论来源依次联系德国古典哲学、英国古典政治经济学、英法空想社会主义。哲学先问**谁是本原**，再问**能否认识**。",
      "boundary": "唯物/唯心、可知/不可知、辩证/形而上学是不同分类轴。",
      "prompt": "本原问题区分{{0}}与唯心主义；能否认识的问题区分可知论与{{1}}。",
      "blanks": [
        {
          "answer": "唯物主义"
        },
        {
          "answer": "不可知论"
        }
      ],
      "sources": [
        {
          "lessonId": "marx-worldview",
          "sectionIndex": 0,
          "sectionTitle": "入门：先画三条主线"
        },
        {
          "lessonId": "marx-worldview",
          "sectionIndex": 1,
          "sectionTitle": "入门：哲学基本问题有两个方面"
        },
        {
          "lessonId": "marx-worldview",
          "sectionIndex": 7,
          "sectionTitle": "提升：唯物与辩证是不同分类轴"
        }
      ],
      "editorial": true
    },
    {
      "id": "materialism-recall-2",
      "part": 0,
      "title": "物质与意识",
      "quizTitle": "第2组 · 回想关键关系",
      "core": "物质概括**客观实在**，不等于某种物体；意识是人脑机能，是客观存在的主观映象。主观唯心主义以个人精神为本原，客观唯心主义以脱离人的精神为本原。",
      "boundary": "重视精神不等于唯心；意识内容有客观来源，不等于意识就是物质。",
      "prompt": "不依赖意识而存在的{{0}}，是哲学物质范畴的核心。",
      "blanks": [
        {
          "answer": "客观实在"
        }
      ],
      "sources": [
        {
          "lessonId": "marx-worldview",
          "sectionIndex": 2,
          "sectionTitle": "入门：物质不是只有摸得着的东西"
        },
        {
          "lessonId": "marx-worldview",
          "sectionIndex": 6,
          "sectionTitle": "提升：两种唯心主义与三种唯物主义"
        }
      ],
      "editorial": true
    },
    {
      "id": "materialism-recall-3",
      "part": 0,
      "title": "运动与规律",
      "quizTitle": "第3组 · 回想关键关系",
      "core": "**运动绝对、静止相对**；运动是物质的存在方式和根本属性，时空是运动着的物质的存在形式。规律是本质、必然、稳定的联系，可以认识利用。",
      "boundary": "相对静止须给条件与参照；人可改变规律起作用的条件，不能任意创造或消灭规律。",
      "prompt": "运动是物质的{{0}}和根本属性；静止具有{{1}}性。",
      "blanks": [
        {
          "answer": "存在方式"
        },
        {
          "answer": "相对"
        }
      ],
      "sources": [
        {
          "lessonId": "marx-worldview",
          "sectionIndex": 3,
          "sectionTitle": "巩固：运动绝对，静止相对"
        },
        {
          "lessonId": "marx-worldview",
          "sectionIndex": 4,
          "sectionTitle": "巩固：规律客观，利用规律要有条件"
        }
      ],
      "editorial": true
    },
    {
      "id": "materialism-recall-4",
      "part": 0,
      "title": "主动作为落到行动",
      "quizTitle": "第4组 · 回想关键关系",
      "core": "物质决定意识，意识通过**实践**发挥能动作用；辩证唯物主义和历史唯物主义联结唯物论、辩证法及自然观、历史观。 古代朴素唯物主义以具体物质解释世界，近代形而上学唯物主义有机械性等局限。",
      "boundary": "主动性不能越过客观条件；想法不等于现实成果。",
      "prompt": "意识改变现实的作用，要经过{{0}}这一环节。",
      "blanks": [
        {
          "answer": "实践"
        }
      ],
      "sources": [
        {
          "lessonId": "marx-worldview",
          "sectionIndex": 5,
          "sectionTitle": "巩固：意识的能动作用经过实践"
        },
        {
          "lessonId": "marx-worldview",
          "sectionIndex": 6,
          "sectionTitle": "提升：两种唯心主义与三种唯物主义"
        },
        {
          "lessonId": "marx-worldview",
          "sectionIndex": 8,
          "sectionTitle": "提升：学完先口头走一遍"
        }
      ],
      "editorial": true
    }
  ],
  "cognition": [
    {
      "id": "cognition-recall-1",
      "part": 0,
      "title": "认识从实践来",
      "quizTitle": "第1组 · 回想关键关系",
      "core": "从社会实践取得感性材料，经比较思考形成理性认识，再回到实践检验发展。**直接经验与间接经验相联系**，个人不必亲历一切。",
      "boundary": "感性不必然错，理性不保证对；阅读方案不等于检验现场效果。",
      "prompt": "认识的过程要从实践到{{0}}，再返回实践。",
      "blanks": [
        {
          "answer": "认识"
        }
      ],
      "sources": [
        {
          "lessonId": "practice-cognition",
          "sectionIndex": 0,
          "sectionTitle": "入门：先问认识从哪里来"
        },
        {
          "lessonId": "practice-cognition",
          "sectionIndex": 1,
          "sectionTitle": "入门：实践不只等于个人动手"
        },
        {
          "lessonId": "practice-cognition",
          "sectionIndex": 2,
          "sectionTitle": "入门：感性材料与理性认识分层看"
        },
        {
          "lessonId": "practice-cognition",
          "sectionIndex": 4,
          "sectionTitle": "巩固：直接经验与间接经验能够联系"
        }
      ],
      "editorial": true
    },
    {
      "id": "cognition-recall-2",
      "part": 0,
      "title": "检验与循环",
      "quizTitle": "第2组 · 回想关键关系",
      "core": "理论指导行动但不能替代行动；**实践—认识—再实践—再认识**要求在新条件下修正深化。实践检验具有确定性，具体实践又受阶段条件限制。",
      "boundary": "一次成功不能永久免检；1937年原作时间与2017年网页发布时间分开。",
      "prompt": "检验真理的标准是{{0}}；一次检验的范围仍受具体{{1}}限制。",
      "blanks": [
        {
          "answer": "实践"
        },
        {
          "answer": "条件"
        }
      ],
      "sources": [
        {
          "lessonId": "practice-cognition",
          "sectionIndex": 3,
          "sectionTitle": "巩固：从形成解释到带回现场"
        },
        {
          "lessonId": "practice-cognition",
          "sectionIndex": 5,
          "sectionTitle": "巩固：实践检验不能缩成一次顺利"
        },
        {
          "lessonId": "practice-cognition",
          "sectionIndex": 6,
          "sectionTitle": "提升：理论指导实践，不代替实践"
        },
        {
          "lessonId": "practice-cognition",
          "sectionIndex": 7,
          "sectionTitle": "提升：循环发展不是原样重复"
        },
        {
          "lessonId": "practice-cognition",
          "sectionIndex": 8,
          "sectionTitle": "提升：把原典年代与当前政策分开"
        },
        {
          "lessonId": "marx-truth-value",
          "sectionIndex": 6,
          "sectionTitle": "提升：实践标准的确定性与不确定性"
        }
      ],
      "editorial": true
    },
    {
      "id": "cognition-recall-3",
      "part": 0,
      "title": "真理有客观内容与适用范围",
      "quizTitle": "第3组 · 回想关键关系",
      "core": "真理是正确反映，**客观性**不由投票决定；绝对性与相对性是同一真理的两面，既含正确内容，又有范围程度限制。",
      "boundary": "把条件内的结论扩到条件外可能变错，不是任何人都可自造真理。",
      "prompt": "真理的绝对性与{{0}}性，是同一真理的两面。",
      "blanks": [
        {
          "answer": "相对"
        }
      ],
      "sources": [
        {
          "lessonId": "marx-truth-value",
          "sectionIndex": 0,
          "sectionTitle": "入门：真理客观，形式可以不同"
        },
        {
          "lessonId": "marx-truth-value",
          "sectionIndex": 1,
          "sectionTitle": "入门：绝对性与相对性是同一真理的两面"
        },
        {
          "lessonId": "marx-truth-value",
          "sectionIndex": 3,
          "sectionTitle": "巩固：实践检验不是投票表决"
        },
        {
          "lessonId": "marx-truth-value",
          "sectionIndex": 5,
          "sectionTitle": "巩固：改条件，原结论可能越界"
        },
        {
          "lessonId": "marx-truth-value",
          "sectionIndex": 7,
          "sectionTitle": "提升：真理与谬误有界限也会在条件变化中转化"
        }
      ],
      "editorial": true
    },
    {
      "id": "cognition-recall-4",
      "part": 0,
      "title": "真假与意义共同看",
      "quizTitle": "第4组 · 回想关键关系",
      "core": "**真理尺度**问是否符合规律，**价值尺度**问对主体需要有什么意义；价值评价须交代主体、对象、时间和社会条件。",
      "boundary": "哲学价值不同于商品价值或价格；总体改善不等于人人受益。",
      "prompt": "是否符合规律看{{0}}尺度，对主体的意义看{{1}}尺度。",
      "blanks": [
        {
          "answer": "真理"
        },
        {
          "answer": "价值"
        }
      ],
      "sources": [
        {
          "lessonId": "marx-truth-value",
          "sectionIndex": 2,
          "sectionTitle": "入门：价值不是商品价格"
        },
        {
          "lessonId": "marx-truth-value",
          "sectionIndex": 4,
          "sectionTitle": "巩固：真理尺度和价值尺度要联系"
        },
        {
          "lessonId": "marx-truth-value",
          "sectionIndex": 8,
          "sectionTitle": "提升：客观评价也要问评价谁"
        }
      ],
      "editorial": true
    }
  ],
  "historical-materialism": [
    {
      "id": "historical-materialism-recall-1",
      "part": 0,
      "title": "生产能力与经济关系",
      "quizTitle": "第1组 · 回想关键关系",
      "core": "生产力看**劳动者、劳动资料、劳动对象**；生产关系看所有制、生产中的地位关系与分配，其中所有制具有基础性。",
      "boundary": "技术进入要素组合，不是机器一出现全部关系立即改变。",
      "prompt": "生产力看现实生产能力；生产关系中具有基础性地位的是{{0}}关系。",
      "blanks": [
        {
          "answer": "生产资料所有制"
        }
      ],
      "sources": [
        {
          "lessonId": "marx-social-structure",
          "sectionIndex": 0,
          "sectionTitle": "生产力：先看现实生产能力"
        },
        {
          "lessonId": "marx-social-structure",
          "sectionIndex": 1,
          "sectionTitle": "生产关系：看生产中的人与人"
        },
        {
          "lessonId": "productive-relations",
          "sectionIndex": 0,
          "sectionTitle": "先分清两个观察角度"
        },
        {
          "lessonId": "productive-relations",
          "sectionIndex": 1,
          "sectionTitle": "一般决定作用说的是什么"
        }
      ],
      "editorial": true
    },
    {
      "id": "historical-materialism-recall-2",
      "part": 0,
      "title": "结构分层与相互作用",
      "quizTitle": "第2组 · 回想关键关系",
      "core": "**生产力决定生产关系，经济基础决定上层建筑**，同时存在有条件的反作用。经济基础是占统治地位的生产关系总和；上层建筑包括相应意识形态、制度组织设施。",
      "boundary": "基本矛盾不等于某阶段主要矛盾；反作用可促进也可阻碍，关系调整仍需物质条件。",
      "prompt": "占统治地位的生产关系总和称{{0}}；与之相应的政治思想制度属于{{1}}。",
      "blanks": [
        {
          "answer": "经济基础"
        },
        {
          "answer": "上层建筑"
        }
      ],
      "sources": [
        {
          "lessonId": "marx-social-structure",
          "sectionIndex": 2,
          "sectionTitle": "经济基础与上层建筑"
        },
        {
          "lessonId": "marx-social-structure",
          "sectionIndex": 3,
          "sectionTitle": "两对矛盾：不要串线"
        },
        {
          "lessonId": "marx-social-structure",
          "sectionIndex": 4,
          "sectionTitle": "原创例子：设备、分配、规则分层看"
        },
        {
          "lessonId": "marx-social-structure",
          "sectionIndex": 5,
          "sectionTitle": "制度有反作用：方向取决于适合情况"
        },
        {
          "lessonId": "marx-social-structure",
          "sectionIndex": 7,
          "sectionTitle": "基本矛盾不等于某一时期主要矛盾"
        },
        {
          "lessonId": "productive-relations",
          "sectionIndex": 2,
          "sectionTitle": "相适合与成为阻碍"
        },
        {
          "lessonId": "productive-relations",
          "sectionIndex": 3,
          "sectionTitle": "为什么还要讲反作用"
        },
        {
          "lessonId": "productive-relations",
          "sectionIndex": 4,
          "sectionTitle": "用一个小情境追问条件"
        },
        {
          "lessonId": "productive-relations",
          "sectionIndex": 5,
          "sectionTitle": "变化不能越过物质条件"
        },
        {
          "lessonId": "productive-relations",
          "sectionIndex": 6,
          "sectionTitle": "防止把技术写成万能原因"
        },
        {
          "lessonId": "productive-relations",
          "sectionIndex": 7,
          "sectionTitle": "一道题先读出论证层级"
        },
        {
          "lessonId": "productive-relations",
          "sectionIndex": 8,
          "sectionTitle": "把框架用于长期阅读"
        }
      ],
      "editorial": true
    },
    {
      "id": "historical-materialism-recall-3",
      "part": 0,
      "title": "物质生活与社会意识",
      "quizTitle": "第3组 · 回想关键关系",
      "core": "**社会存在决定社会意识**；意识有传承与相对独立性，并通过人的实践反作用于现实。阶级和国家属于历史范畴，不能以收入差异简单划阶级。",
      "boundary": "两个作用方向不代表同等决定；经济根本作用不排斥政治文化和人物影响。",
      "prompt": "社会意识变化不完全同步，体现其{{0}}；反作用须通过人的实践。",
      "blanks": [
        {
          "answer": "相对独立性"
        }
      ],
      "sources": [
        {
          "lessonId": "social-being-people",
          "sectionIndex": 0,
          "sectionTitle": "入门：先把“生活条件”和“怎样看待生活”分开"
        },
        {
          "lessonId": "social-being-people",
          "sectionIndex": 1,
          "sectionTitle": "入门：“决定”先回答观念的根基在哪里"
        },
        {
          "lessonId": "social-being-people",
          "sectionIndex": 3,
          "sectionTitle": "巩固：条件已经变化，观念为什么还会保留"
        },
        {
          "lessonId": "social-being-people",
          "sectionIndex": 4,
          "sectionTitle": "巩固：观念怎样反过来影响生活"
        },
        {
          "lessonId": "social-being-people",
          "sectionIndex": 5,
          "sectionTitle": "巩固：两个箭头不等于两者地位完全对称"
        },
        {
          "lessonId": "social-being-people",
          "sectionIndex": 8,
          "sectionTitle": "提升：用同一材料辨认三个不同判断"
        },
        {
          "lessonId": "marx-social-structure",
          "sectionIndex": 6,
          "sectionTitle": "国家与阶级：属于历史范畴"
        },
        {
          "lessonId": "marx-social-structure",
          "sectionIndex": 8,
          "sectionTitle": "出口检查：方向、层次、条件"
        }
      ],
      "editorial": true
    },
    {
      "id": "historical-materialism-recall-4",
      "part": 0,
      "title": "历史创造与个人贡献",
      "quizTitle": "第4组 · 回想关键关系",
      "core": "**人民群众创造历史**；个人贡献要放在社会条件、群众协作和实践中解释。依靠群众要听取、核实、提炼、再实践。",
      "boundary": "不抹杀个人作用，也不把所有个人意见都当正确结论。",
      "prompt": "群众史观强调{{0}}的历史创造作用。",
      "blanks": [
        {
          "answer": "人民群众"
        }
      ],
      "sources": [
        {
          "lessonId": "social-being-people",
          "sectionIndex": 2,
          "sectionTitle": "入门：人民群众不是历史舞台上的背景板"
        },
        {
          "lessonId": "social-being-people",
          "sectionIndex": 6,
          "sectionTitle": "提升：依靠群众，不等于照单执行每一种意见"
        },
        {
          "lessonId": "social-being-people",
          "sectionIndex": 7,
          "sectionTitle": "提升：个人贡献与社会条件一起解释"
        }
      ],
      "editorial": true
    }
  ],
  "political-economy": [
    {
      "id": "political-economy-recall-1",
      "part": 0,
      "title": "商品、劳动与货币",
      "quizTitle": "第1组 · 回想关键关系",
      "core": "商品是用于交换的劳动产品；**具体劳动形成使用价值，抽象劳动形成价值**。单位价值量取决于社会必要劳动时间；标价看价值尺度，现场用货币完成商品买卖看流通手段，延期清偿看支付手段。",
      "boundary": "个人做得慢不更值钱；社会生产率提高通常降低单位价值，价格仍受供求影响。",
      "prompt": "形成价值的是{{0}}劳动；决定单位价值量的是{{1}}。",
      "blanks": [
        {
          "answer": "抽象"
        },
        {
          "answer": "社会必要劳动时间"
        }
      ],
      "sources": [
        {
          "lessonId": "marx-commodity-value",
          "sectionIndex": 0,
          "sectionTitle": "商品：有用还要进入交换关系"
        },
        {
          "lessonId": "marx-commodity-value",
          "sectionIndex": 1,
          "sectionTitle": "劳动二重性：同一次劳动的两种观察"
        },
        {
          "lessonId": "marx-commodity-value",
          "sectionIndex": 2,
          "sectionTitle": "价值量：看社会必要而非个人拖延"
        },
        {
          "lessonId": "marx-commodity-value",
          "sectionIndex": 3,
          "sectionTitle": "劳动生产率：单位与总量分开"
        },
        {
          "lessonId": "marx-commodity-value",
          "sectionIndex": 4,
          "sectionTitle": "原创例子：两间文具作坊"
        },
        {
          "lessonId": "marx-commodity-value",
          "sectionIndex": 5,
          "sectionTitle": "货币职能：标价、成交、延期分清"
        },
        {
          "lessonId": "marx-commodity-value",
          "sectionIndex": 6,
          "sectionTitle": "价值规律：价值基础与价格波动"
        },
        {
          "lessonId": "marx-commodity-value",
          "sectionIndex": 7,
          "sectionTitle": "记忆边界：不能从有用直接推出价高"
        },
        {
          "lessonId": "marx-commodity-value",
          "sectionIndex": 8,
          "sectionTitle": "出口检查：把四个问题分开"
        }
      ],
      "editorial": true
    },
    {
      "id": "political-economy-recall-2",
      "part": 0,
      "title": "旧价值、新价值与比率",
      "quizTitle": "第2组 · 回想关键关系",
      "core": "劳动力的使用能创造超过自身价值的新价值；产品价值为c+v+m，**活劳动新创造v+m**。剩余价值率m/v，简化利润率m/(c+v)。",
      "boundary": "机器转移已有价值，不凭空创造新价值；理论价值口径不等于企业会计净利润。",
      "prompt": "活劳动新创造的价值是{{0}}；剩余价值率的分母是{{1}}。",
      "blanks": [
        {
          "answer": "v+m"
        },
        {
          "answer": "v"
        }
      ],
      "sources": [
        {
          "lessonId": "marx-surplus-capital",
          "sectionIndex": 0,
          "sectionTitle": "劳动力商品：买的是劳动能力"
        },
        {
          "lessonId": "marx-surplus-capital",
          "sectionIndex": 1,
          "sectionTitle": "必要劳动与剩余劳动"
        },
        {
          "lessonId": "marx-surplus-capital",
          "sectionIndex": 2,
          "sectionTitle": "c、v、m：先认三种位置"
        },
        {
          "lessonId": "marx-surplus-capital",
          "sectionIndex": 3,
          "sectionTitle": "剩余价值率：分母是v"
        },
        {
          "lessonId": "marx-surplus-capital",
          "sectionIndex": 4,
          "sectionTitle": "原创例子：不把旧价值算两遍"
        },
        {
          "lessonId": "marx-surplus-capital",
          "sectionIndex": 8,
          "sectionTitle": "出口检查：来源与表现、分子与分母"
        }
      ],
      "editorial": true
    },
    {
      "id": "political-economy-recall-3",
      "part": 0,
      "title": "增殖方法与积累",
      "quizTitle": "第3组 · 回想关键关系",
      "core": "必要劳动时间不变时，绝对剩余价值典型靠延长工作日；相对剩余价值在工作日不变时缩短必要劳动时间。个别效率领先可能取得超额剩余价值；**积累是剩余价值转化为资本**。",
      "boundary": "个别技术进步不等于全社会劳动力价值下降；三者不能混成一种方法。",
      "prompt": "把部分剩余价值转化为资本，称为{{0}}。",
      "blanks": [
        {
          "answer": "资本积累"
        }
      ],
      "sources": [
        {
          "lessonId": "marx-surplus-capital",
          "sectionIndex": 5,
          "sectionTitle": "两种基本方法：加长与缩短必要时间"
        },
        {
          "lessonId": "marx-surplus-capital",
          "sectionIndex": 6,
          "sectionTitle": "超额剩余价值：个别与社会分开"
        },
        {
          "lessonId": "marx-surplus-capital",
          "sectionIndex": 7,
          "sectionTitle": "积累与利润：不能把全部收入都叫剩余价值"
        }
      ],
      "editorial": true
    },
    {
      "id": "political-economy-recall-4",
      "part": 0,
      "title": "运行、结构与危机",
      "quizTitle": "第4组 · 回想关键关系",
      "core": "循环看购买—生产—销售，周转看反复速度；固定/流动按周转方式，不变/可变按增殖作用。再生产还需价值与实物补偿。基本矛盾是生产社会化与资本主义私人占有，危机为**相对有支付能力需求的过剩**，垄断不消灭竞争。",
      "boundary": "车间提速不等于整体周转提速；历史趋势不是崩溃时间表，不能据此作投资判断。",
      "prompt": "经济危机的相对过剩，是相对{{0}}的需求而言。",
      "blanks": [
        {
          "answer": "有支付能力"
        }
      ],
      "sources": [
        {
          "lessonId": "marx-capitalism-development",
          "sectionIndex": 0,
          "sectionTitle": "资本循环：经过哪些阶段"
        },
        {
          "lessonId": "marx-capitalism-development",
          "sectionIndex": 1,
          "sectionTitle": "资本周转：循环多快重复"
        },
        {
          "lessonId": "marx-capitalism-development",
          "sectionIndex": 2,
          "sectionTitle": "两套分类：问题不同，不可对号互换"
        },
        {
          "lessonId": "marx-capitalism-development",
          "sectionIndex": 3,
          "sectionTitle": "再生产：原规模与扩大规模"
        },
        {
          "lessonId": "marx-capitalism-development",
          "sectionIndex": 4,
          "sectionTitle": "原创例子：效率高仍可能堵在销售"
        },
        {
          "lessonId": "marx-capitalism-development",
          "sectionIndex": 5,
          "sectionTitle": "基本矛盾与危机：相对谁过剩"
        },
        {
          "lessonId": "marx-capitalism-development",
          "sectionIndex": 6,
          "sectionTitle": "垄断：没有消除竞争"
        },
        {
          "lessonId": "marx-capitalism-development",
          "sectionIndex": 7,
          "sectionTitle": "历史趋势不等于预测时间表"
        },
        {
          "lessonId": "marx-capitalism-development",
          "sectionIndex": 8,
          "sectionTitle": "出口检查：运行、结构、现实证据"
        }
      ],
      "editorial": true
    }
  ],
  "scientific-socialism": [
    {
      "id": "scientific-socialism-recall-1",
      "part": 0,
      "title": "科学基础",
      "quizTitle": "第1组 · 回想关键关系",
      "core": "空想社会主义有思想贡献但受历史条件限制；科学社会主义把变革放在现实结构与社会力量中研究，理论基础是**唯物史观和剩余价值学说**。",
      "boundary": "两个发现不是马克思主义三个组成部分的改名。",
      "prompt": "从空想到科学的理论基础是唯物史观和{{0}}。",
      "blanks": [
        {
          "answer": "剩余价值学说"
        }
      ],
      "sources": [
        {
          "lessonId": "marx-socialism-communism",
          "sectionIndex": 0,
          "sectionTitle": "从空想到科学：转变依据在哪里"
        },
        {
          "lessonId": "marx-socialism-communism",
          "sectionIndex": 1,
          "sectionTitle": "两个发现：不要与三个组成部分混淆"
        }
      ],
      "editorial": true
    },
    {
      "id": "scientific-socialism-recall-2",
      "part": 0,
      "title": "原则、道路与阶段",
      "quizTitle": "第2组 · 回想关键关系",
      "core": "共同原则要结合各国条件；经典理论区分共产主义第一阶段与高级阶段，前者通常称社会主义。**中国社会主义初级阶段**是社会主义阶段内的特定发展阶段。",
      "boundary": "两种阶段划分不能互换，具体道路也不能机械复制。",
      "prompt": "共产主义社会第一阶段通常称为{{0}}社会。",
      "blanks": [
        {
          "answer": "社会主义"
        }
      ],
      "sources": [
        {
          "lessonId": "marx-socialism-communism",
          "sectionIndex": 2,
          "sectionTitle": "基本原则与具体道路"
        },
        {
          "lessonId": "marx-socialism-communism",
          "sectionIndex": 3,
          "sectionTitle": "共产主义社会的两个阶段"
        }
      ],
      "editorial": true
    },
    {
      "id": "scientific-socialism-recall-3",
      "part": 0,
      "title": "分配原则看条件",
      "quizTitle": "第3组 · 回想关键关系",
      "core": "经典阶段分析中，第一阶段个人消费品分配强调**按劳分配**，高级阶段强调各尽所能、按需分配。",
      "boundary": "按劳不是人人一样，按需不是任意索取；理想阶段不能代替现实分配制度。",
      "prompt": "第一阶段强调{{0}}分配，高级阶段强调按需分配。",
      "blanks": [
        {
          "answer": "按劳"
        }
      ],
      "sources": [
        {
          "lessonId": "marx-socialism-communism",
          "sectionIndex": 4,
          "sectionTitle": "分配原则：按劳与按需辨条件"
        },
        {
          "lessonId": "marx-socialism-communism",
          "sectionIndex": 5,
          "sectionTitle": "原创例子：先问条件，不跳过阶段"
        }
      ],
      "editorial": true
    },
    {
      "id": "scientific-socialism-recall-4",
      "part": 0,
      "title": "人的发展与长期实践",
      "quizTitle": "第4组 · 回想关键关系",
      "core": "价值目标是人的**自由全面发展**，不仅是消费增加；实现须有物质条件、制度建设和人的长期实践。",
      "boundary": "不自动发生，不许诺年份；理论、历史与当前政策分层核查。",
      "prompt": "人的发展目标是{{0}}，不是单看消费多少。",
      "blanks": [
        {
          "answer": "自由全面发展"
        }
      ],
      "sources": [
        {
          "lessonId": "marx-socialism-communism",
          "sectionIndex": 6,
          "sectionTitle": "自由全面发展：不只是消费更多"
        },
        {
          "lessonId": "marx-socialism-communism",
          "sectionIndex": 7,
          "sectionTitle": "历史过程：需要人的实践"
        },
        {
          "lessonId": "marx-socialism-communism",
          "sectionIndex": 8,
          "sectionTitle": "出口检查：理论、历史、现实三层"
        }
      ],
      "editorial": true
    }
  ],
  "mao-thought": [
    {
      "id": "mao-thought-recall-1",
      "part": 0,
      "title": "形成与方法",
      "quizTitle": "第1组 · 回想关键关系",
      "core": "毛泽东思想形成于理论与中国革命实践结合，体现主要创立者贡献与集体智慧；**1945年七大确立指导地位**。活的灵魂是实事求是、群众路线、独立自主。",
      "boundary": "思想不等于个人全部言论；1937年著作时间、1945年会议、承载网页时间各有含义。群众意见需分析，借鉴不等于照搬。",
      "prompt": "七大确立指导地位在{{0}}年；实事求是、群众路线、独立自主属于{{1}}。",
      "blanks": [
        {
          "answer": "1945"
        },
        {
          "answer": "活的灵魂"
        }
      ],
      "sources": [
        {
          "lessonId": "mao-thought-context",
          "sectionIndex": 0,
          "sectionTitle": "先问思想从哪里来"
        },
        {
          "lessonId": "mao-thought-context",
          "sectionIndex": 1,
          "sectionTitle": "1945年应当记住什么"
        },
        {
          "lessonId": "mao-thought-context",
          "sectionIndex": 2,
          "sectionTitle": "主要创立者与集体智慧"
        },
        {
          "lessonId": "mao-thought-context",
          "sectionIndex": 3,
          "sectionTitle": "结合不是把现成句子搬过来"
        },
        {
          "lessonId": "mao-thought-context",
          "sectionIndex": 4,
          "sectionTitle": "1937年的实践方法入口"
        },
        {
          "lessonId": "mao-thought-context",
          "sectionIndex": 5,
          "sectionTitle": "学习经验也要经过思考"
        },
        {
          "lessonId": "mao-thought-context",
          "sectionIndex": 6,
          "sectionTitle": "一次成功还需要继续追问"
        },
        {
          "lessonId": "mao-thought-context",
          "sectionIndex": 7,
          "sectionTitle": "分清史实、承载文本和原件"
        },
        {
          "lessonId": "mao-thought-context",
          "sectionIndex": 8,
          "sectionTitle": "用三条线连接这段历史"
        },
        {
          "lessonId": "mao-living-soul",
          "sectionIndex": 0,
          "sectionTitle": "入门：先认清这一组名称在说什么"
        },
        {
          "lessonId": "mao-living-soul",
          "sectionIndex": 1,
          "sectionTitle": "入门：实事求是，不是看见现象就下结论"
        },
        {
          "lessonId": "mao-living-soul",
          "sectionIndex": 2,
          "sectionTitle": "入门：群众路线，不是开一次征求意见会"
        },
        {
          "lessonId": "mao-living-soul",
          "sectionIndex": 3,
          "sectionTitle": "基础：独立自主与学习借鉴可以并行"
        },
        {
          "lessonId": "mao-living-soul",
          "sectionIndex": 4,
          "sectionTitle": "基础：三组“三”不能互相填空"
        },
        {
          "lessonId": "mao-living-soul",
          "sectionIndex": 5,
          "sectionTitle": "基础：同一个动作可以连接几种方法"
        },
        {
          "lessonId": "mao-living-soul",
          "sectionIndex": 6,
          "sectionTitle": "提高：听见许多意见以后，还要做哪些判断"
        },
        {
          "lessonId": "mao-living-soul",
          "sectionIndex": 7,
          "sectionTitle": "提高：经验有用，适用范围仍要检查"
        },
        {
          "lessonId": "mao-living-soul",
          "sectionIndex": 8,
          "sectionTitle": "提高：历史方法课，不替代当代政策检索"
        }
      ],
      "editorial": true
    },
    {
      "id": "mao-thought-recall-2",
      "part": 0,
      "title": "革命任务与道路",
      "quizTitle": "第2组 · 回想关键关系",
      "core": "新民主主义革命面对半殖民地半封建国情，反对帝国主义、封建主义、官僚资本主义；由无产阶级及其政党领导，依靠人民大众、以工农联盟为基础。道路是农村包围城市、武装夺取政权。**三大法宝：统一战线、武装斗争、党的建设**；三大作风：理论联系实际、密切联系群众、批评和自我批评。",
      "boundary": "反官僚资本不等于反一切工商业；农村道路不排斥城市工作。法宝、作风、活的灵魂须准确归栏。",
      "prompt": "统一战线、武装斗争、党的建设属于{{0}}。",
      "blanks": [
        {
          "answer": "三大法宝"
        }
      ],
      "sources": [
        {
          "lessonId": "mao-new-democratic",
          "sectionIndex": 0,
          "sectionTitle": "入门：先看当时面对什么问题"
        },
        {
          "lessonId": "mao-new-democratic",
          "sectionIndex": 1,
          "sectionTitle": "入门：对象回答反对什么"
        },
        {
          "lessonId": "mao-new-democratic",
          "sectionIndex": 2,
          "sectionTitle": "入门：领导与参与不是同一栏"
        },
        {
          "lessonId": "mao-new-democratic",
          "sectionIndex": 3,
          "sectionTitle": "巩固：为什么先解决民主革命任务"
        },
        {
          "lessonId": "mao-new-democratic",
          "sectionIndex": 4,
          "sectionTitle": "巩固：革命对象不能换成所有经营者"
        },
        {
          "lessonId": "mao-new-democratic",
          "sectionIndex": 5,
          "sectionTitle": "巩固：用两列卡片检查概念"
        },
        {
          "lessonId": "mao-new-democratic",
          "sectionIndex": 6,
          "sectionTitle": "提升：1949与1956各回答一个问题"
        },
        {
          "lessonId": "mao-new-democratic",
          "sectionIndex": 7,
          "sectionTitle": "提升：新不是把旧任务全部取消"
        },
        {
          "lessonId": "mao-new-democratic",
          "sectionIndex": 8,
          "sectionTitle": "提升：合上讲义复述一条线"
        },
        {
          "lessonId": "mao-revolution-methods",
          "sectionIndex": 0,
          "sectionTitle": "入门：道路来自具体条件"
        },
        {
          "lessonId": "mao-revolution-methods",
          "sectionIndex": 1,
          "sectionTitle": "入门：三大法宝各管什么"
        },
        {
          "lessonId": "mao-revolution-methods",
          "sectionIndex": 2,
          "sectionTitle": "入门：三大作风不是另外三件武器"
        },
        {
          "lessonId": "mao-revolution-methods",
          "sectionIndex": 3,
          "sectionTitle": "巩固：把三套“三”摆在三行"
        },
        {
          "lessonId": "mao-revolution-methods",
          "sectionIndex": 4,
          "sectionTitle": "巩固：联系群众与群众路线不宜随意替换"
        },
        {
          "lessonId": "mao-revolution-methods",
          "sectionIndex": 5,
          "sectionTitle": "巩固：统一战线与党的建设相联系"
        },
        {
          "lessonId": "mao-revolution-methods",
          "sectionIndex": 6,
          "sectionTitle": "提升：农村道路不是不要城市"
        },
        {
          "lessonId": "mao-revolution-methods",
          "sectionIndex": 7,
          "sectionTitle": "提升：方法相通，历史动作不能硬套"
        },
        {
          "lessonId": "mao-revolution-methods",
          "sectionIndex": 8,
          "sectionTitle": "提升：做一次错位纠正"
        }
      ],
      "editorial": true
    },
    {
      "id": "mao-thought-recall-3",
      "part": 0,
      "title": "过渡时期与制度结果",
      "quizTitle": "第3组 · 回想关键关系",
      "core": "从新中国成立到改造基本完成为过渡时期；1953年正式提出总路线，以**一化三改**联结工业化和农业、手工业、资本主义工商业改造。农业手工业主要合作化，资本主义工商业采取和平赎买等方式。",
      "boundary": "土地改革不等于合作化；1949年建国与1956年改造基本完成分开，制度确立不等于现代化完成。",
      "prompt": "一化指社会主义{{0}}；社会主义改造基本完成在{{1}}年。",
      "blanks": [
        {
          "answer": "工业化"
        },
        {
          "answer": "1956"
        }
      ],
      "sources": [
        {
          "lessonId": "mao-socialist-transition",
          "sectionIndex": 0,
          "sectionTitle": "入门：过渡时期从哪里到哪里"
        },
        {
          "lessonId": "mao-socialist-transition",
          "sectionIndex": 1,
          "sectionTitle": "入门：一化主要回答怎样建设"
        },
        {
          "lessonId": "mao-socialist-transition",
          "sectionIndex": 2,
          "sectionTitle": "入门：三个改造对象要记完整"
        },
        {
          "lessonId": "mao-socialist-transition",
          "sectionIndex": 3,
          "sectionTitle": "巩固：合作化与赎买分对象记"
        },
        {
          "lessonId": "mao-socialist-transition",
          "sectionIndex": 4,
          "sectionTitle": "巩固：土地改革不等于农业合作化"
        },
        {
          "lessonId": "mao-socialist-transition",
          "sectionIndex": 5,
          "sectionTitle": "巩固：建设和改造可以并举"
        },
        {
          "lessonId": "mao-socialist-transition",
          "sectionIndex": 6,
          "sectionTitle": "提升：1956记基本完成，不记无所不能"
        },
        {
          "lessonId": "mao-socialist-transition",
          "sectionIndex": 7,
          "sectionTitle": "提升：评价意义与总结问题能并存"
        },
        {
          "lessonId": "mao-socialist-transition",
          "sectionIndex": 8,
          "sectionTitle": "提升：闭卷画四个方格"
        },
        {
          "lessonId": "mao-new-democratic",
          "sectionIndex": 6,
          "sectionTitle": "提升：1949与1956各回答一个问题"
        }
      ],
      "editorial": true
    },
    {
      "id": "mao-thought-recall-4",
      "part": 0,
      "title": "建设关系与矛盾处理",
      "quizTitle": "第4组 · 回想关键关系",
      "core": "1956年《论十大关系》从协调关系调动积极因素；1957年相关论述区分矛盾性质，人民内部矛盾重在民主说理，形成**团结—批评—团结**的过程。",
      "boundary": "抓重点不等于忽略配套，协调不等于平均；提出原则不等于每次执行都符合，不能据课堂例子作现实政治定性。",
      "prompt": "人民内部矛盾的这一处理过程为团结—{{0}}—团结。",
      "blanks": [
        {
          "answer": "批评"
        }
      ],
      "sources": [
        {
          "lessonId": "mao-socialist-exploration",
          "sectionIndex": 0,
          "sectionTitle": "入门：两篇著作分别抓什么"
        },
        {
          "lessonId": "mao-socialist-exploration",
          "sectionIndex": 1,
          "sectionTitle": "入门：重点不意味着其他方面可以不管"
        },
        {
          "lessonId": "mao-socialist-exploration",
          "sectionIndex": 2,
          "sectionTitle": "入门：先辨性质，再谈处理方法"
        },
        {
          "lessonId": "mao-socialist-exploration",
          "sectionIndex": 3,
          "sectionTitle": "巩固：团结—批评—团结是一个过程"
        },
        {
          "lessonId": "mao-socialist-exploration",
          "sectionIndex": 4,
          "sectionTitle": "巩固：把重点和配套放进同一张图"
        },
        {
          "lessonId": "mao-socialist-exploration",
          "sectionIndex": 5,
          "sectionTitle": "巩固：协调关系不等于平均分配"
        },
        {
          "lessonId": "mao-socialist-exploration",
          "sectionIndex": 6,
          "sectionTitle": "提升：不回避批评，也不靠压服统一"
        },
        {
          "lessonId": "mao-socialist-exploration",
          "sectionIndex": 7,
          "sectionTitle": "提升：理论提出与执行结果分开"
        },
        {
          "lessonId": "mao-socialist-exploration",
          "sectionIndex": 8,
          "sectionTitle": "提升：一句话对比两篇著作"
        }
      ],
      "editorial": true
    }
  ],
  "reform-theory": [
    {
      "id": "reform-theory-recall-1",
      "part": 0,
      "title": "社会主义建设主线",
      "quizTitle": "第1组 · 回想关键关系",
      "core": "邓小平理论围绕什么是社会主义、怎样建设社会主义；本质把解放发展生产力与消灭剥削、消除两极分化、最终共同富裕联系起来。初级阶段兼有性质与程度；**一个中心、两个基本点**指经济建设中心、四项基本原则与改革开放。 四项基本原则为社会主义道路、人民民主专政、中国共产党的领导、马克思列宁主义毛泽东思想。",
      "boundary": "四项原则整体是一个基本点；简记不是完整路线，课程对照2022党章。1997年确立指导地位不等于当年才形成。",
      "prompt": "基本路线的中心是{{0}}；社会主义本质目标包含最终达到{{1}}。",
      "blanks": [
        {
          "answer": "经济建设"
        },
        {
          "answer": "共同富裕"
        }
      ],
      "sources": [
        {
          "lessonId": "deng-core-framework",
          "sectionIndex": 0,
          "sectionTitle": "入门：先抓一个基本问题"
        },
        {
          "lessonId": "deng-core-framework",
          "sectionIndex": 1,
          "sectionTitle": "入门：本质把发展与共同富裕连起来"
        },
        {
          "lessonId": "deng-core-framework",
          "sectionIndex": 2,
          "sectionTitle": "入门：初级阶段既讲性质也讲程度"
        },
        {
          "lessonId": "deng-core-framework",
          "sectionIndex": 3,
          "sectionTitle": "巩固：一个中心、两个基本点"
        },
        {
          "lessonId": "deng-core-framework",
          "sectionIndex": 4,
          "sectionTitle": "巩固：四项基本原则不要和两个基本点混数"
        },
        {
          "lessonId": "deng-core-framework",
          "sectionIndex": 5,
          "sectionTitle": "巩固：用问题分类，而非只找重复词"
        },
        {
          "lessonId": "deng-core-framework",
          "sectionIndex": 6,
          "sectionTitle": "提升：基本路线的简记与完整版本"
        },
        {
          "lessonId": "deng-core-framework",
          "sectionIndex": 7,
          "sectionTitle": "提升：1997记确立地位，不说当天凭空产生"
        },
        {
          "lessonId": "deng-core-framework",
          "sectionIndex": 8,
          "sectionTitle": "提升：从主线接到改革方法"
        }
      ],
      "editorial": true
    },
    {
      "id": "reform-theory-recall-2",
      "part": 0,
      "title": "制度、手段与效果",
      "quizTitle": "第2组 · 回想关键关系",
      "core": "**计划与市场都是经济手段**；改革解放生产力，三个有利于看社会主义生产力、社会主义国家综合国力、人民生活水平。1992年南方谈话与十四大改革目标相联但有区别。",
      "boundary": "市场不等于取消政府职责，改革不等于否定基本制度；短期增产不证明全部目标。",
      "prompt": "十四大确立建立社会主义{{0}}体制的改革目标。",
      "blanks": [
        {
          "answer": "市场经济"
        }
      ],
      "sources": [
        {
          "lessonId": "deng-reform-market",
          "sectionIndex": 0,
          "sectionTitle": "入门：市场不是某种制度专属标签"
        },
        {
          "lessonId": "deng-reform-market",
          "sectionIndex": 1,
          "sectionTitle": "入门：改革为什么也谈解放生产力"
        },
        {
          "lessonId": "deng-reform-market",
          "sectionIndex": 2,
          "sectionTitle": "入门：三个有利于要记对象"
        },
        {
          "lessonId": "deng-reform-market",
          "sectionIndex": 3,
          "sectionTitle": "巩固：改变机制与增加投入不是一回事"
        },
        {
          "lessonId": "deng-reform-market",
          "sectionIndex": 4,
          "sectionTitle": "巩固：计划和市场不是二选一"
        },
        {
          "lessonId": "deng-reform-market",
          "sectionIndex": 5,
          "sectionTitle": "巩固：指标必须和结论范围对应"
        },
        {
          "lessonId": "deng-reform-market",
          "sectionIndex": 6,
          "sectionTitle": "提升：1992年区分谈话与大会决定"
        },
        {
          "lessonId": "deng-reform-market",
          "sectionIndex": 7,
          "sectionTitle": "提升：共同富裕不是只看先富"
        },
        {
          "lessonId": "deng-reform-market",
          "sectionIndex": 8,
          "sectionTitle": "提升：再用制度、手段、效果三栏复述"
        }
      ],
      "editorial": true
    },
    {
      "id": "reform-theory-recall-3",
      "part": 0,
      "title": "党的建设问题",
      "quizTitle": "第3组 · 回想关键关系",
      "core": "三个代表内容为先进生产力的发展要求、先进文化的前进方向、最广大人民的根本利益；贯彻的**关键是与时俱进、核心是党的先进性、本质是执政为民**。2002年确立指导地位。",
      "boundary": "代表内容与贯彻要求分组；发展是执政兴国第一要务，不能替换贯彻的核心。",
      "prompt": "贯彻三个代表的核心是坚持党的{{0}}，本质是坚持{{1}}。",
      "blanks": [
        {
          "answer": "先进性"
        },
        {
          "answer": "执政为民"
        }
      ],
      "sources": [
        {
          "lessonId": "three-represents-theory",
          "sectionIndex": 0,
          "sectionTitle": "入门：为什么把目光转向党的建设"
        },
        {
          "lessonId": "three-represents-theory",
          "sectionIndex": 1,
          "sectionTitle": "入门：代表什么要完整说"
        },
        {
          "lessonId": "three-represents-theory",
          "sectionIndex": 2,
          "sectionTitle": "入门：三项内容与三层要求不是同一组"
        },
        {
          "lessonId": "three-represents-theory",
          "sectionIndex": 3,
          "sectionTitle": "巩固：先进性不能只靠名称自证"
        },
        {
          "lessonId": "three-represents-theory",
          "sectionIndex": 4,
          "sectionTitle": "巩固：文化与生产力不能互相省略"
        },
        {
          "lessonId": "three-represents-theory",
          "sectionIndex": 5,
          "sectionTitle": "巩固：执政兴国第一要务与核心分开"
        },
        {
          "lessonId": "three-represents-theory",
          "sectionIndex": 6,
          "sectionTitle": "提升：最广大人民不等于少数人的短期便利"
        },
        {
          "lessonId": "three-represents-theory",
          "sectionIndex": 7,
          "sectionTitle": "提升：与时俱进不是任意放弃原则"
        },
        {
          "lessonId": "three-represents-theory",
          "sectionIndex": 8,
          "sectionTitle": "提升：2002年的节点与今天的边界"
        }
      ],
      "editorial": true
    },
    {
      "id": "reform-theory-recall-4",
      "part": 0,
      "title": "发展问题",
      "quizTitle": "第4组 · 回想关键关系",
      "core": "科学发展观：第一要义发展，**核心以人为本**，基本要求全面协调可持续，根本方法统筹兼顾。2007年相关内容写入党章，2012年确立指导地位。",
      "boundary": "统筹不是平均，可持续不是停止建设；部署与效果分开，不用经济总量代替全面发展。",
      "prompt": "科学发展观的根本方法是{{0}}。",
      "blanks": [
        {
          "answer": "统筹兼顾"
        }
      ],
      "sources": [
        {
          "lessonId": "scientific-development-theory",
          "sectionIndex": 0,
          "sectionTitle": "入门：问实现什么样的发展、怎样发展"
        },
        {
          "lessonId": "scientific-development-theory",
          "sectionIndex": 1,
          "sectionTitle": "入门：四层结构逐项归位"
        },
        {
          "lessonId": "scientific-development-theory",
          "sectionIndex": 2,
          "sectionTitle": "入门：以人为本要问为了谁、依靠谁"
        },
        {
          "lessonId": "scientific-development-theory",
          "sectionIndex": 3,
          "sectionTitle": "巩固：全面不等于只看经济一个数"
        },
        {
          "lessonId": "scientific-development-theory",
          "sectionIndex": 4,
          "sectionTitle": "巩固：统筹兼顾不是平均分资源"
        },
        {
          "lessonId": "scientific-development-theory",
          "sectionIndex": 5,
          "sectionTitle": "巩固：把目标、安排和效果区分"
        },
        {
          "lessonId": "scientific-development-theory",
          "sectionIndex": 6,
          "sectionTitle": "提升：可持续不是一切建设都停止"
        },
        {
          "lessonId": "scientific-development-theory",
          "sectionIndex": 7,
          "sectionTitle": "提升：2007与2012不要合并成一个节点"
        },
        {
          "lessonId": "scientific-development-theory",
          "sectionIndex": 8,
          "sectionTitle": "提升：与其他理论核心并排回忆"
        }
      ],
      "editorial": true
    }
  ],
  "new-era-framework": [
    {
      "id": "new-era-framework-recall-1",
      "part": 0,
      "title": "世界观与方法论",
      "quizTitle": "第1组 · 回想关键关系",
      "core": "六个必须坚持：**人民至上、自信自立、守正创新、问题导向、系统观念、胸怀天下**。从服务谁、如何自主判断、守什么改什么、问题在哪、联系怎样、世界眼光逐项回想。",
      "boundary": "六项可共同体现，不是互斥清单；自信不拒绝借鉴，系统不要求平均用力。",
      "prompt": "整体与局部、当前与长远相联系，突出六项中的{{0}}。",
      "blanks": [
        {
          "answer": "系统观念"
        }
      ],
      "sources": [
        {
          "lessonId": "six-method-principles",
          "sectionIndex": 0,
          "sectionTitle": "入门：先定位，它们不是六个部门的工作清单"
        },
        {
          "lessonId": "six-method-principles",
          "sectionIndex": 1,
          "sectionTitle": "入门：人民至上，先问为了谁、从哪里获得智慧"
        },
        {
          "lessonId": "six-method-principles",
          "sectionIndex": 2,
          "sectionTitle": "入门：自信自立，独立探索与学习借鉴并不冲突"
        },
        {
          "lessonId": "six-method-principles",
          "sectionIndex": 3,
          "sectionTitle": "巩固：守正创新，先说清守什么、改什么"
        },
        {
          "lessonId": "six-method-principles",
          "sectionIndex": 4,
          "sectionTitle": "巩固：问题导向，从真实困难组织分析"
        },
        {
          "lessonId": "six-method-principles",
          "sectionIndex": 5,
          "sectionTitle": "巩固：系统观念，看联系也看重点"
        },
        {
          "lessonId": "six-method-principles",
          "sectionIndex": 6,
          "sectionTitle": "提升：胸怀天下，不是只在国际新闻里才出现"
        },
        {
          "lessonId": "six-method-principles",
          "sectionIndex": 7,
          "sectionTitle": "提升：同一行动可体现多项，设问要求决定主答点"
        },
        {
          "lessonId": "six-method-principles",
          "sectionIndex": 8,
          "sectionTitle": "提升：把六项转成一段完整分析"
        }
      ],
      "editorial": true
    },
    {
      "id": "new-era-framework-recall-2",
      "part": 0,
      "title": "理念与现代化特色",
      "quizTitle": "第2组 · 回想关键关系",
      "core": "新发展理念为**创新、协调、绿色、开放、共享**。中国式现代化五方面特色是人口规模巨大、全体人民共同富裕、物质精神文明协调、人与自然和谐共生、走和平发展道路。",
      "boundary": "理念与特色不同层次；措施可兼具多项，依设问找重点，目标不等于已经实现。",
      "prompt": "新发展理念中，成果惠及人民突出{{0}}；现代化强调物质文明与{{1}}协调。",
      "blanks": [
        {
          "answer": "共享"
        },
        {
          "answer": "精神文明"
        }
      ],
      "sources": [
        {
          "lessonId": "development",
          "sectionIndex": 0,
          "sectionTitle": "入门：先理解五个方面各在问什么"
        },
        {
          "lessonId": "development",
          "sectionIndex": 1,
          "sectionTitle": "入门：用具体行动识别关注点"
        },
        {
          "lessonId": "development",
          "sectionIndex": 2,
          "sectionTitle": "入门：把概念读懂再做题"
        },
        {
          "lessonId": "development",
          "sectionIndex": 3,
          "sectionTitle": "巩固：同一措施可以体现多个方面"
        },
        {
          "lessonId": "development",
          "sectionIndex": 4,
          "sectionTitle": "巩固：四步定位设问重心"
        },
        {
          "lessonId": "development",
          "sectionIndex": 5,
          "sectionTitle": "巩固：完整例解与错项辨析"
        },
        {
          "lessonId": "development",
          "sectionIndex": 6,
          "sectionTitle": "提升：整体推进与重点突破并不矛盾"
        },
        {
          "lessonId": "development",
          "sectionIndex": 7,
          "sectionTitle": "提升：证据范围与时间边界"
        },
        {
          "lessonId": "development",
          "sectionIndex": 8,
          "sectionTitle": "复盘：从选对走向讲得清"
        },
        {
          "lessonId": "modernization",
          "sectionIndex": 0,
          "sectionTitle": "入门：先分清总概念与五方面特色"
        },
        {
          "lessonId": "modernization",
          "sectionIndex": 1,
          "sectionTitle": "入门：五个记忆词要还原为关系"
        },
        {
          "lessonId": "modernization",
          "sectionIndex": 2,
          "sectionTitle": "入门：从限定词识别明显误读"
        },
        {
          "lessonId": "modernization",
          "sectionIndex": 3,
          "sectionTitle": "巩固：材料对应时说明最直接依据"
        },
        {
          "lessonId": "modernization",
          "sectionIndex": 4,
          "sectionTitle": "巩固：把目标与实现状态分开"
        },
        {
          "lessonId": "modernization",
          "sectionIndex": 5,
          "sectionTitle": "巩固：多项判断逐项核对再计数"
        },
        {
          "lessonId": "modernization",
          "sectionIndex": 6,
          "sectionTitle": "提升：一个材料不等于完整概念体系"
        },
        {
          "lessonId": "modernization",
          "sectionIndex": 7,
          "sectionTitle": "提升：相似措辞需要保留范围与条件"
        },
        {
          "lessonId": "modernization",
          "sectionIndex": 8,
          "sectionTitle": "提升：用概念表复盘并保留版本"
        }
      ],
      "editorial": true
    },
    {
      "id": "new-era-framework-recall-3",
      "part": 0,
      "title": "先进生产力的变化",
      "quizTitle": "第3组 · 回想关键关系",
      "core": "高质量发展是首要任务；新质生产力以**创新主导**，推动劳动者、劳动资料、劳动对象及组合跃升，核心标志是全要素生产率大幅提升。科技要转化应用，传统产业也可升级。",
      "boundary": "新公司、新设备、产量或利润增长均不能独自证明；须因地制宜，兼顾绿色、人才和体制机制。",
      "prompt": "新质生产力的核心标志是{{0}}大幅提升。",
      "blanks": [
        {
          "answer": "全要素生产率"
        }
      ],
      "sources": [
        {
          "lessonId": "new-quality-productivity",
          "sectionIndex": 0,
          "sectionTitle": "入门：先分“发展要达到什么”和“生产力怎样变化”"
        },
        {
          "lessonId": "new-quality-productivity",
          "sectionIndex": 1,
          "sectionTitle": "入门：抓住创新主导，而非“刚出现”"
        },
        {
          "lessonId": "new-quality-productivity",
          "sectionIndex": 2,
          "sectionTitle": "入门：人、工具、对象及其组合一起看"
        },
        {
          "lessonId": "new-quality-productivity",
          "sectionIndex": 3,
          "sectionTitle": "巩固：科技成果要走向实际产业应用"
        },
        {
          "lessonId": "new-quality-productivity",
          "sectionIndex": 4,
          "sectionTitle": "巩固：传统产业升级，与新兴产业发展并举"
        },
        {
          "lessonId": "new-quality-productivity",
          "sectionIndex": 5,
          "sectionTitle": "巩固：因地制宜，不是一张产业表全国照搬"
        },
        {
          "lessonId": "new-quality-productivity",
          "sectionIndex": 6,
          "sectionTitle": "提升：全要素生产率不是产量、利润或机器数量的别名"
        },
        {
          "lessonId": "new-quality-productivity",
          "sectionIndex": 7,
          "sectionTitle": "提升：绿色方向与体制机制不能漏掉"
        },
        {
          "lessonId": "new-quality-productivity",
          "sectionIndex": 8,
          "sectionTitle": "提升：学会给材料作有限而准确的判断"
        }
      ],
      "editorial": true
    },
    {
      "id": "new-era-framework-recall-4",
      "part": 0,
      "title": "2024改革文件的层级",
      "quizTitle": "第4组 · 回想关键关系",
      "core": "2024年7月18日《决定》：进一步全面深化改革的总目标是继续完善和发展中国特色社会主义制度，推进国家治理体系和治理能力现代化；**经济体制改革为牵引，制度建设为主线**。六项原则另含党的全面领导、以人民为中心、守正创新、全面依法治国、系统观念。",
      "boundary": "2029年完成的是本决定改革任务，2035年与世纪中叶另有目标；部署、法律施行、落实成效不等同。",
      "prompt": "《决定》的牵引是{{0}}，主线是{{1}}。",
      "blanks": [
        {
          "answer": "经济体制改革"
        },
        {
          "answer": "制度建设"
        }
      ],
      "sources": [
        {
          "lessonId": "reform-framework-2024",
          "sectionIndex": 0,
          "sectionTitle": "入门：先给文件一个清楚的时间坐标"
        },
        {
          "lessonId": "reform-framework-2024",
          "sectionIndex": 1,
          "sectionTitle": "入门：总目标回答改革整体往哪里去"
        },
        {
          "lessonId": "reform-framework-2024",
          "sectionIndex": 2,
          "sectionTitle": "入门：牵引与主线不是同一个问法"
        },
        {
          "lessonId": "reform-framework-2024",
          "sectionIndex": 3,
          "sectionTitle": "巩固：六项原则，要按这份文件辨认"
        },
        {
          "lessonId": "reform-framework-2024",
          "sectionIndex": 4,
          "sectionTitle": "巩固：制度建设不是把文件数量当成成绩"
        },
        {
          "lessonId": "reform-framework-2024",
          "sectionIndex": 5,
          "sectionTitle": "巩固：改革与法治相统一，不是先改完再补手续"
        },
        {
          "lessonId": "reform-framework-2024",
          "sectionIndex": 6,
          "sectionTitle": "提升：三组时间，各自带着不同任务"
        },
        {
          "lessonId": "reform-framework-2024",
          "sectionIndex": 7,
          "sectionTitle": "提升：部署、法律生效、落地见效是三种状态"
        },
        {
          "lessonId": "reform-framework-2024",
          "sectionIndex": 8,
          "sectionTitle": "提升：用一段材料同时检查层级和范围"
        }
      ],
      "editorial": true
    }
  ],
  "market-pattern": [
    {
      "id": "market-pattern-recall-1",
      "part": 0,
      "title": "统一市场先看障碍",
      "quizTitle": "第1组 · 回想关键关系",
      "core": "全国统一大市场着重**规则、设施与信息衔接**，清除地方保护和不合理准入障碍。准入问进入条件，公平竞争审查问政策是否排除限制竞争。",
      "boundary": "统一不是商品同价、产业相同；便利流动不等于取消监管。",
      "prompt": "准入看进入市场条件；政策是否排除限制竞争，要看{{0}}。",
      "blanks": [
        {
          "answer": "公平竞争审查"
        }
      ],
      "sources": [
        {
          "lessonId": "unified-market-rules",
          "sectionIndex": 0,
          "sectionTitle": "入门：先从跨城经营遇到的问题理解"
        },
        {
          "lessonId": "unified-market-rules",
          "sectionIndex": 1,
          "sectionTitle": "入门：这里的“统一”主要指什么"
        },
        {
          "lessonId": "unified-market-rules",
          "sectionIndex": 2,
          "sectionTitle": "入门：把规则、道路和信息分开看"
        },
        {
          "lessonId": "unified-market-rules",
          "sectionIndex": 3,
          "sectionTitle": "基础：市场准入与公平竞争审查不是同一个提问"
        },
        {
          "lessonId": "unified-market-rules",
          "sectionIndex": 4,
          "sectionTitle": "基础：地方服务与地方保护要看实质"
        },
        {
          "lessonId": "unified-market-rules",
          "sectionIndex": 5,
          "sectionTitle": "基础：建设市场，不等于取消监管"
        },
        {
          "lessonId": "unified-market-rules",
          "sectionIndex": 6,
          "sectionTitle": "提高：看到“不一样”，先问差异是什么"
        }
      ],
      "editorial": true
    },
    {
      "id": "market-pattern-recall-2",
      "part": 0,
      "title": "文件日期与实施层次",
      "quizTitle": "第2组 · 回想关键关系",
      "core": "课程指引通知落款**2024年12月4日**，2025年1月7日公开，附件规定自印发之日起实施并动态调整。任务提出、平台建成、服务效果是三层。",
      "boundary": "2025公开不代表2025才印发；指定文本不能自动证明当前版本或全国执行进度。",
      "prompt": "指引的网页公开时间与{{0}}时间不能混为一谈。",
      "blanks": [
        {
          "answer": "印发"
        }
      ],
      "sources": [
        {
          "lessonId": "unified-market-rules",
          "sectionIndex": 7,
          "sectionTitle": "提高：印发、公开与实施，不是同一个日期标签"
        },
        {
          "lessonId": "unified-market-rules",
          "sectionIndex": 8,
          "sectionTitle": "提高：文件提出任务，不能自动证明任务已完成"
        }
      ],
      "editorial": true
    },
    {
      "id": "market-pattern-recall-3",
      "part": 0,
      "title": "经济循环与供需",
      "quizTitle": "第3组 · 回想关键关系",
      "core": "新发展格局是**国内大循环为主体、国内国际双循环相互促进**。循环涵盖生产交易消费再生产，需协调供给、有效需求与配套环节。",
      "boundary": "国内主体不是唯一，地方不是样样自给；增加运输或产量不保证解决供需错配。",
      "prompt": "国内大循环为{{0}}，国内国际双循环{{1}}。",
      "blanks": [
        {
          "answer": "主体"
        },
        {
          "answer": "相互促进"
        }
      ],
      "sources": [
        {
          "lessonId": "new-development-pattern",
          "sectionIndex": 0,
          "sectionTitle": "入门：循环不是只指货车跑起来"
        },
        {
          "lessonId": "new-development-pattern",
          "sectionIndex": 1,
          "sectionTitle": "入门：主体不是唯一，双循环不是各走各路"
        },
        {
          "lessonId": "new-development-pattern",
          "sectionIndex": 2,
          "sectionTitle": "入门：需求和供给不是两道互斥选择题"
        },
        {
          "lessonId": "new-development-pattern",
          "sectionIndex": 3,
          "sectionTitle": "巩固：先找断点，再选择措施"
        },
        {
          "lessonId": "new-development-pattern",
          "sectionIndex": 4,
          "sectionTitle": "巩固：地方融入全国，不是地方样样自备"
        }
      ],
      "editorial": true
    },
    {
      "id": "market-pattern-recall-4",
      "part": 0,
      "title": "安全开放与证据",
      "quizTitle": "第4组 · 回想关键关系",
      "core": "可靠产业链可与开放合作并行；统一市场有助循环，但不能替代全部战略。解释按**措施—机制—效果**，检验范围、时间与因果。",
      "boundary": "课程基于2023指定讲话，当时成果不能自动延续为2026现状；安全不等于所有环节自行包办。",
      "prompt": "新增线路是措施，缺货减少的可比记录才是{{0}}材料。",
      "blanks": [
        {
          "answer": "效果"
        }
      ],
      "sources": [
        {
          "lessonId": "new-development-pattern",
          "sectionIndex": 5,
          "sectionTitle": "巩固：可靠性和开放合作可以一起考虑"
        },
        {
          "lessonId": "new-development-pattern",
          "sectionIndex": 6,
          "sectionTitle": "提升：统一大市场与新发展格局不是同一清单"
        },
        {
          "lessonId": "new-development-pattern",
          "sectionIndex": 7,
          "sectionTitle": "提升：把措施、机制和效果分开写"
        },
        {
          "lessonId": "new-development-pattern",
          "sectionIndex": 8,
          "sectionTitle": "提升：把一段材料改写成有条件的解释"
        }
      ],
      "editorial": true
    }
  ],
  "education-policy": [
    {
      "id": "education-policy-recall-1",
      "part": 0,
      "title": "育人任务与规划时间",
      "quizTitle": "第1组 · 回想关键关系",
      "core": "《教育强国建设规划纲要（2024—2035年）》以**立德树人**为根本任务，促进全面发展；2025年1月19日网页公开，2027年看阶段性成效，2035年建成教育强国。",
      "boundary": "网页仅说近日印发，不能补造精确印发日；规划起点、公开日、目标节点分别记。",
      "prompt": "根本任务是{{0}}；建成教育强国的目标节点是{{1}}年。",
      "blanks": [
        {
          "answer": "立德树人"
        },
        {
          "answer": "2035"
        }
      ],
      "sources": [
        {
          "lessonId": "education-strong-2035",
          "sectionIndex": 0,
          "sectionTitle": "入门：教育强国不只问考了多少分"
        },
        {
          "lessonId": "education-strong-2035",
          "sectionIndex": 1,
          "sectionTitle": "入门：把三个时间格分别写清"
        }
      ],
      "editorial": true
    },
    {
      "id": "education-policy-recall-2",
      "part": 0,
      "title": "公平质量与资源",
      "quizTitle": "第2组 · 回想关键关系",
      "core": "公平看机会可获得，质量看教育支持；根据**人口变化**统筹时间、地区、学段与可达性，不能只看全市总数。",
      "boundary": "均衡不等于每校投入一样；情境推演不代替现实撤校、招生决定。",
      "prompt": "基础教育资源安排要根据{{0}}统筹。",
      "blanks": [
        {
          "answer": "人口变化"
        }
      ],
      "sources": [
        {
          "lessonId": "education-strong-2035",
          "sectionIndex": 2,
          "sectionTitle": "入门：公平与质量不是只能选一个"
        },
        {
          "lessonId": "education-strong-2035",
          "sectionIndex": 3,
          "sectionTitle": "巩固：人口变化怎样进入资源安排"
        }
      ],
      "editorial": true
    },
    {
      "id": "education-policy-recall-3",
      "part": 0,
      "title": "分类发展与协同",
      "quizTitle": "第3组 · 回想关键关系",
      "core": "不同学校按定位评价；教育、科技、人才通过**培养—研究—转化**相联系，职业教育仍需课程、师资和实践育人。",
      "boundary": "不以同一论文数量排行所有学校，合作机构挂牌不等于协同完成。",
      "prompt": "教育科技人才协同中，培养、研究与成果{{0}}要衔接。",
      "blanks": [
        {
          "answer": "转化"
        }
      ],
      "sources": [
        {
          "lessonId": "education-strong-2035",
          "sectionIndex": 4,
          "sectionTitle": "巩固：不同教育类型不必走同一条路"
        },
        {
          "lessonId": "education-strong-2035",
          "sectionIndex": 5,
          "sectionTitle": "巩固：教育、科技和人才怎样在项目里联系"
        }
      ],
      "editorial": true
    },
    {
      "id": "education-policy-recall-4",
      "part": 0,
      "title": "数字化与落实检验",
      "quizTitle": "第4组 · 回想关键关系",
      "core": "数字工具要服务学习与安全，**上传量、登录量、学习效果分开**；扎根自身与国际借鉴并行。读部署后另找执行与结果证据。",
      "boundary": "课程只核2025公开纲要选定内容，不宣称2026措施已全面实施。",
      "prompt": "平台的登录量不能直接代替{{0}}。",
      "blanks": [
        {
          "answer": "学习效果"
        }
      ],
      "sources": [
        {
          "lessonId": "education-strong-2035",
          "sectionIndex": 6,
          "sectionTitle": "提升：数字化先看能否帮助学习"
        },
        {
          "lessonId": "education-strong-2035",
          "sectionIndex": 7,
          "sectionTitle": "提升：扎根自身与学习借鉴能够相连"
        },
        {
          "lessonId": "education-strong-2035",
          "sectionIndex": 8,
          "sectionTitle": "提升：读到部署以后，还要找哪种证据"
        }
      ],
      "editorial": true
    }
  ],
  "plan15": [
    {
      "id": "plan15-recall-1",
      "part": 0,
      "title": "文件程序与时间",
      "quizTitle": "第1组 · 回想关键关系",
      "core": "2025年四中全会通过**规划建议**；国家十五五纲要于2026年3月12日获全国人大批准、3月13日受权发布。规划期2026—2030年，2035年另为现代化目标节点。",
      "boundary": "建议、纲要、年度报告程序用途不同；转载日不改变批准日，3月5日草案是当时状态。",
      "prompt": "十五五规划期为{{0}}年；四中全会通过的是规划{{1}}。",
      "blanks": [
        {
          "answer": "2026—2030",
          "accept": [
            "2026-2030",
            "2026至2030",
            "2026到2030"
          ]
        },
        {
          "answer": "建议"
        }
      ],
      "sources": [
        {
          "lessonId": "policy-fourth-plenum-2025",
          "sectionIndex": 0,
          "sectionTitle": "入门：会议与文件"
        },
        {
          "lessonId": "policy-fourth-plenum-2025",
          "sectionIndex": 1,
          "sectionTitle": "入门：十五五的时间与定位"
        },
        {
          "lessonId": "policy-plan15-official-2026",
          "sectionIndex": 0,
          "sectionTitle": "入门：建议、纲要、年度报告"
        },
        {
          "lessonId": "policy-plan15-official-2026",
          "sectionIndex": 1,
          "sectionTitle": "入门：批准、发布与转载"
        },
        {
          "lessonId": "policy-plan15-official-2026",
          "sectionIndex": 2,
          "sectionTitle": "入门：规划期与远景目标"
        }
      ],
      "editorial": true
    },
    {
      "id": "plan15-recall-2",
      "part": 0,
      "title": "指导思想与原则",
      "quizTitle": "第2组 · 回想关键关系",
      "core": "建议：经济建设为中心、**推动高质量发展为主题**、改革创新为根本动力、满足美好生活需要为根本目的、全面从严治党为根本保障。六项原则为党的全面领导、人民至上、高质量发展、全面深化改革、有效市场与有为政府结合、统筹发展安全。",
      "boundary": "这六项不等于二十大方法论或2024改革原则；七方面主要目标是待实现目标。",
      "prompt": "建议以{{0}}为主题，以{{1}}为根本动力。",
      "blanks": [
        {
          "answer": "推动高质量发展"
        },
        {
          "answer": "改革创新"
        }
      ],
      "sources": [
        {
          "lessonId": "policy-fourth-plenum-2025",
          "sectionIndex": 2,
          "sectionTitle": "入门：指导思想的五个对应"
        },
        {
          "lessonId": "policy-fourth-plenum-2025",
          "sectionIndex": 3,
          "sectionTitle": "巩固：六项原则"
        },
        {
          "lessonId": "policy-fourth-plenum-2025",
          "sectionIndex": 4,
          "sectionTitle": "巩固：三组六项怎样区分"
        },
        {
          "lessonId": "policy-fourth-plenum-2025",
          "sectionIndex": 5,
          "sectionTitle": "巩固：市场与政府怎样配合"
        },
        {
          "lessonId": "policy-fourth-plenum-2025",
          "sectionIndex": 6,
          "sectionTitle": "提升：发展与安全怎样统筹"
        },
        {
          "lessonId": "policy-fourth-plenum-2025",
          "sectionIndex": 7,
          "sectionTitle": "提升：七方面主要目标"
        },
        {
          "lessonId": "policy-fourth-plenum-2025",
          "sectionIndex": 8,
          "sectionTitle": "提升：把部署接回理论"
        }
      ],
      "editorial": true
    },
    {
      "id": "plan15-recall-3",
      "part": 0,
      "title": "纲要任务与民生创新",
      "quizTitle": "第3组 · 回想关键关系",
      "core": "纲要**18篇62章**，覆盖产业科技数字、市场体制开放、城乡区域文化、人口民生绿色、安全与实施保障。GDP增长各年度视情提出；研发投入年均增7%以上；城镇调查失业率低于5.5%，劳动年龄人口平均受教育年限提高到11.7年、人均预期寿命提高到80岁，收入与经济、劳动报酬与生产率同步。",
      "boundary": "研发增速不是占GDP比重；五年不设各年一样的固定GDP增速，各指标对象单位分开。",
      "prompt": "全社会研发经费投入年均增长{{0}}以上，不是其占GDP比重。",
      "blanks": [
        {
          "answer": "7%"
        }
      ],
      "sources": [
        {
          "lessonId": "policy-plan15-official-2026",
          "sectionIndex": 3,
          "sectionTitle": "巩固：18篇62章的任务地图"
        },
        {
          "lessonId": "policy-plan15-official-2026",
          "sectionIndex": 4,
          "sectionTitle": "巩固：发展与创新目标"
        },
        {
          "lessonId": "policy-plan15-official-2026",
          "sectionIndex": 5,
          "sectionTitle": "巩固：民生目标的口径"
        }
      ],
      "editorial": true
    },
    {
      "id": "plan15-recall-4",
      "part": 0,
      "title": "绿色安全与实施证据",
      "quizTitle": "第4组 · 回想关键关系",
      "core": "规划期单位GDP二氧化碳排放**累计降低17%**；粮食综合生产能力1.45万亿斤左右、能源综合生产能力58亿吨标准煤。强大国内市场与高水平开放并行，目标、任务、项目、成效逐层检查。",
      "boundary": "强度不是总量、能力不是实际产量；开工建成不等于有效使用。",
      "prompt": "规划期单位GDP二氧化碳排放累计降低{{0}}，不能当作每年值。",
      "blanks": [
        {
          "answer": "17%"
        }
      ],
      "sources": [
        {
          "lessonId": "policy-plan15-official-2026",
          "sectionIndex": 6,
          "sectionTitle": "提升：绿色与安全目标"
        },
        {
          "lessonId": "policy-plan15-official-2026",
          "sectionIndex": 7,
          "sectionTitle": "提升：国内循环与开放"
        },
        {
          "lessonId": "policy-plan15-official-2026",
          "sectionIndex": 8,
          "sectionTitle": "提升：目标、任务、项目与成效"
        }
      ],
      "editorial": true
    }
  ],
  "national-report": [
    {
      "id": "national-report-recall-1",
      "part": 0,
      "title": "年度层次与主要目标",
      "quizTitle": "第1组 · 回想关键关系",
      "core": "2026全国报告分开2025回顾、十五五安排、2026取向任务。2026预期GDP增**4.5%—5%**并争取更好结果，城镇调查失业率5.5%左右、城镇新增就业1200万人以上、CPI涨2%左右。",
      "boundary": "2025实际GDP增长5%不能当2026实际值；范围、左右、以上不可丢。",
      "prompt": "2026年全国GDP预期增长{{0}}；城镇新增就业{{1}}万人以上。",
      "blanks": [
        {
          "answer": "4.5%—5%",
          "accept": [
            "4.5%-5%",
            "4.5%至5%",
            "4.5%到5%"
          ]
        },
        {
          "answer": "1200"
        }
      ],
      "sources": [
        {
          "lessonId": "policy-national-report-2026",
          "sectionIndex": 0,
          "sectionTitle": "入门：四部分对应三个时间层次"
        },
        {
          "lessonId": "policy-national-report-2026",
          "sectionIndex": 1,
          "sectionTitle": "入门：增长、就业与物价目标"
        }
      ],
      "editorial": true
    },
    {
      "id": "national-report-recall-2",
      "part": 0,
      "title": "收入粮食与减排",
      "quizTitle": "第2组 · 回想关键关系",
      "core": "居民收入与经济增长同步、国际收支基本平衡；年度粮食**产量1.4万亿斤左右**、单位GDP二氧化碳排放降低3.8%左右。",
      "boundary": "年度产量不同于五年综合生产能力1.45万亿斤左右；年度降幅不同于规划期累计17%，强度不是总量。",
      "prompt": "2026单位GDP二氧化碳排放预期降低{{0}}左右。",
      "blanks": [
        {
          "answer": "3.8%"
        }
      ],
      "sources": [
        {
          "lessonId": "policy-national-report-2026",
          "sectionIndex": 2,
          "sectionTitle": "入门：收入、粮食与减排目标"
        },
        {
          "lessonId": "policy-national-report-2026",
          "sectionIndex": 8,
          "sectionTitle": "提升：年度与五年指标对照"
        }
      ],
      "editorial": true
    },
    {
      "id": "national-report-recall-3",
      "part": 0,
      "title": "宏观政策与协同",
      "quizTitle": "第3组 · 回想关键关系",
      "core": "继续**更加积极财政、适度宽松货币**；财政看预算税收债券，货币看准备金率利率流动性。赤字率拟4%左右、超长期特别国债1.3万亿元、地方专项债4.4万亿元；四稳是就业、企业、市场、预期。",
      "boundary": "财政债券不叫降准降息；拟安排不是实际完成。经济非经济、存量增量政策均需协调。",
      "prompt": "2026货币政策取向是{{0}}。",
      "blanks": [
        {
          "answer": "适度宽松"
        }
      ],
      "sources": [
        {
          "lessonId": "policy-national-report-2026",
          "sectionIndex": 3,
          "sectionTitle": "巩固：财政与货币政策"
        },
        {
          "lessonId": "policy-national-report-2026",
          "sectionIndex": 4,
          "sectionTitle": "巩固：四稳与政策协同"
        }
      ],
      "editorial": true
    },
    {
      "id": "national-report-recall-4",
      "part": 0,
      "title": "增长动力的具体链条",
      "quizTitle": "第4组 · 回想关键关系",
      "core": "促消费与扩投资联动，**投资于物与投资于人结合**；以实体经济为着力点，兼顾传统、新兴、未来产业，因地制宜发展新质生产力。企业问题、科研、中试、转化衔接教育科技人才。",
      "boundary": "不复制热门产业，不以签协议代替成果转化，不只建场所而不配服务。",
      "prompt": "投资于物要与投资于{{0}}紧密结合。",
      "blanks": [
        {
          "answer": "人"
        }
      ],
      "sources": [
        {
          "lessonId": "policy-national-report-2026",
          "sectionIndex": 5,
          "sectionTitle": "巩固：消费与投资联动"
        },
        {
          "lessonId": "policy-national-report-2026",
          "sectionIndex": 6,
          "sectionTitle": "提升：因地制宜发展新质生产力"
        },
        {
          "lessonId": "policy-national-report-2026",
          "sectionIndex": 7,
          "sectionTitle": "提升：教育科技人才一体推进"
        }
      ],
      "editorial": true
    }
  ],
  "constitutional-law": [
    {
      "id": "constitutional-law-recall-1",
      "part": 0,
      "title": "机关性质与关系",
      "quizTitle": "第1组 · 回想关键关系",
      "core": "全国人大是最高国家权力机关，常委会是其常设机关；国务院是最高国家权力机关的执行机关及最高国家行政机关。监察委是监察机关，法院是审判机关，**检察院是法律监督机关**。",
      "boundary": "全国最高层级限定不能套到各级；机关性质不代表某具体案件权限。",
      "prompt": "人民法院是{{0}}机关，人民检察院是{{1}}机关。",
      "blanks": [
        {
          "answer": "国家审判",
          "accept": [
            "审判"
          ]
        },
        {
          "answer": "国家法律监督",
          "accept": [
            "法律监督"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "state-organs",
          "sectionIndex": 0,
          "sectionTitle": "入门：机关名称与机关性质分开"
        },
        {
          "lessonId": "state-organs",
          "sectionIndex": 1,
          "sectionTitle": "入门：五种性质不要混淆"
        },
        {
          "lessonId": "state-organs",
          "sectionIndex": 2,
          "sectionTitle": "入门：建立最小知识表"
        },
        {
          "lessonId": "state-organs",
          "sectionIndex": 4,
          "sectionTitle": "巩固：常设机关与执行机关"
        },
        {
          "lessonId": "state-organs",
          "sectionIndex": 5,
          "sectionTitle": "巩固：从错误配对反查原概念"
        },
        {
          "lessonId": "state-organs",
          "sectionIndex": 7,
          "sectionTitle": "提升：限定范围与制度边界"
        }
      ],
      "editorial": true
    },
    {
      "id": "constitutional-law-recall-2",
      "part": 0,
      "title": "职权、版本与判断",
      "quizTitle": "第2组 · 回想关键关系",
      "core": "全国人大及常委会行使**国家立法权**；国务院依宪法法律制定行政法规。多分句逐项核主体、行为、对象。课程据2018年修正宪法，2026年11月5日核对。",
      "boundary": "一个分句正确不保证整项正确；核对日期不改变文本年份，也不代表排查所有配套制度。",
      "prompt": "行使国家立法权的是全国人大及其{{0}}。",
      "blanks": [
        {
          "answer": "常委会"
        }
      ],
      "sources": [
        {
          "lessonId": "state-organs",
          "sectionIndex": 3,
          "sectionTitle": "巩固：性质正确不代表具体职权正确"
        },
        {
          "lessonId": "state-organs",
          "sectionIndex": 6,
          "sectionTitle": "提升：多分句判断逐项验真"
        },
        {
          "lessonId": "state-organs",
          "sectionIndex": 8,
          "sectionTitle": "复盘：版本与知识更新"
        },
        {
          "lessonId": "constitutional-rights",
          "sectionIndex": 0,
          "sectionTitle": "入门：公民身份先看国籍条件"
        },
        {
          "lessonId": "constitutional-rights",
          "sectionIndex": 8,
          "sectionTitle": "提升：宪法框架与实施规则分层核对"
        }
      ],
      "editorial": true
    },
    {
      "id": "constitutional-law-recall-3",
      "part": 0,
      "title": "公民身份与资格",
      "quizTitle": "第3组 · 回想关键关系",
      "core": "中国公民以**中华人民共和国国籍**为条件，不以成年为条件。一般选举权与被选举权须为中国公民、满18周岁，并排除依法被剥夺政治权利者；劳动、受教育兼为权利与义务。",
      "boundary": "平等不抹去法定资格，外国居民不直接等于公民；选举权条件不替代具体职务资格。",
      "prompt": "中国公民身份看{{0}}；一般选举权的年龄条件为年满{{1}}周岁。",
      "blanks": [
        {
          "answer": "中华人民共和国国籍"
        },
        {
          "answer": "18"
        }
      ],
      "sources": [
        {
          "lessonId": "constitutional-rights",
          "sectionIndex": 0,
          "sectionTitle": "入门：公民身份先看国籍条件"
        },
        {
          "lessonId": "constitutional-rights",
          "sectionIndex": 1,
          "sectionTitle": "入门：权利和义务不是一张互斥清单"
        },
        {
          "lessonId": "constitutional-rights",
          "sectionIndex": 2,
          "sectionTitle": "入门：平等不意味着所有资格条件都消失"
        },
        {
          "lessonId": "constitutional-rights",
          "sectionIndex": 3,
          "sectionTitle": "巩固：选举权题不能只记一个18岁"
        }
      ],
      "editorial": true
    },
    {
      "id": "constitutional-law-recall-4",
      "part": 0,
      "title": "权利行使与义务适用",
      "quizTitle": "第4组 · 回想关键关系",
      "core": "批评建议与依法申诉控告检举受保护，但不得诬告陷害；自由保护保留法定条件。行使权利不得损害规定利益与他人合法权利；具体限制仍查依据权限事实程序。**依法纳税、依法服兵役**须核适用事实。",
      "boundary": "一般边界不证明具体限制自动合法；义务不等于人人同额纳税、全部实际服现役，通信检查细则须另核。",
      "prompt": "监督权利不能取消事实责任，不得捏造或歪曲事实进行{{0}}。",
      "blanks": [
        {
          "answer": "诬告陷害"
        }
      ],
      "sources": [
        {
          "lessonId": "constitutional-rights",
          "sectionIndex": 4,
          "sectionTitle": "巩固：批评建议与诬告陷害分开判断"
        },
        {
          "lessonId": "constitutional-rights",
          "sectionIndex": 5,
          "sectionTitle": "巩固：自由保护与法定条件一起读"
        },
        {
          "lessonId": "constitutional-rights",
          "sectionIndex": 6,
          "sectionTitle": "提升：权利有边界，不等于限制自动合法"
        },
        {
          "lessonId": "constitutional-rights",
          "sectionIndex": 7,
          "sectionTitle": "提升：依法履行义务需要适用事实"
        },
        {
          "lessonId": "constitutional-rights",
          "sectionIndex": 8,
          "sectionTitle": "提升：宪法框架与实施规则分层核对"
        }
      ],
      "editorial": true
    }
  ],
  "civil-law": [
    {
      "id": "civil-law-recall-1",
      "part": 0,
      "title": "两种能力与版本",
      "quizTitle": "第1组 · 回想关键关系",
      "core": "**权利能力**看能否享有权利承担义务，**行为能力**看能否独立实施相应民事法律行为。课程采用2020通过、2021施行民法典第13及17—24条，2026年11月5日核对。",
      "boundary": "无行为能力不等于没有权利；不等于刑事责任年龄，也不代替动态修法及个案核验。",
      "prompt": "能否独立实施相应民事法律行为，属于民事{{0}}问题。",
      "blanks": [
        {
          "answer": "行为能力"
        }
      ],
      "sources": [
        {
          "lessonId": "civil-capacity",
          "sectionIndex": 0,
          "sectionTitle": "入门：权利能力与行为能力是两个问题"
        },
        {
          "lessonId": "civil-capacity",
          "sectionIndex": 8,
          "sectionTitle": "提升：版本、题设与现实适用分开"
        }
      ],
      "editorial": true
    },
    {
      "id": "civil-law-recall-2",
      "part": 0,
      "title": "年龄与辨认情况",
      "quizTitle": "第2组 · 回想关键关系",
      "core": "不满**8周岁**通常适用无行为能力规则；满8周岁未成年人原则为限制能力，须再查辨认与例外；18周岁为成年。成年人不能辨认为无能力，不能完全辨认为限制能力。",
      "boundary": "周岁端点须保留；成年人不当然完全能力，不凭职业外貌诊断。",
      "prompt": "不能完全辨认自己行为的成年人，适用{{0}}民事行为能力规则。",
      "blanks": [
        {
          "answer": "限制"
        }
      ],
      "sources": [
        {
          "lessonId": "civil-capacity",
          "sectionIndex": 1,
          "sectionTitle": "入门：年龄界线包括端点"
        },
        {
          "lessonId": "civil-capacity",
          "sectionIndex": 2,
          "sectionTitle": "入门：成年人还要看辨认能力"
        },
        {
          "lessonId": "civil-capacity",
          "sectionIndex": 6,
          "sectionTitle": "提升：不能与不能完全辨认要分清"
        }
      ],
      "editorial": true
    },
    {
      "id": "civil-law-recall-3",
      "part": 0,
      "title": "未成年人例外",
      "quizTitle": "第3组 · 回想关键关系",
      "core": "已满16而未满18周岁，且**以自己的劳动收入为主要生活来源**，可视为完全民事行为能力人。",
      "boundary": "年龄、收入性质与主要来源缺一不可；偶尔兼职或赠与不能自动满足。",
      "prompt": "16岁例外要求以自己的{{0}}为{{1}}。",
      "blanks": [
        {
          "answer": "劳动收入"
        },
        {
          "answer": "主要生活来源"
        }
      ],
      "sources": [
        {
          "lessonId": "civil-capacity",
          "sectionIndex": 3,
          "sectionTitle": "巩固：16岁例外需同时满足条件"
        },
        {
          "lessonId": "civil-capacity",
          "sectionIndex": 7,
          "sectionTitle": "提升：条件缺失时不要替材料作决定"
        }
      ],
      "editorial": true
    },
    {
      "id": "civil-law-recall-4",
      "part": 0,
      "title": "具体行为再检查",
      "quizTitle": "第4组 · 回想关键关系",
      "core": "限制能力人可独立实施**纯获利益**或与法定条件相适应的行为；其他行为再查代理、同意追认等。判断按人—条件—具体行为。",
      "boundary": "附负担赠与不当然纯获利益；一个行为可独立实施，不改变整体能力类别。",
      "prompt": "限制能力人依法可独立实施{{0}}的行为。",
      "blanks": [
        {
          "answer": "纯获利益"
        }
      ],
      "sources": [
        {
          "lessonId": "civil-capacity",
          "sectionIndex": 4,
          "sectionTitle": "巩固：具体行为可独立，不等于能力整体改变"
        },
        {
          "lessonId": "civil-capacity",
          "sectionIndex": 5,
          "sectionTitle": "巩固：按人、条件、行为三步作答"
        },
        {
          "lessonId": "civil-capacity",
          "sectionIndex": 6,
          "sectionTitle": "提升：不能与不能完全辨认要分清"
        },
        {
          "lessonId": "civil-capacity",
          "sectionIndex": 7,
          "sectionTitle": "提升：条件缺失时不要替材料作决定"
        }
      ],
      "editorial": true
    }
  ],
  "administrative-law": [
    {
      "id": "administrative-law-recall-1",
      "part": 0,
      "title": "对象范围与费用",
      "quizTitle": "第1组 · 回想关键关系",
      "core": "行政复议针对违法或不当行政行为争议，处罚强制许可、不履职等须核法定范围条件；机关受理申请**不得收费**。",
      "boundary": "不是所有不满意都是行政争议；私人合同纠纷不能直接当复议，受理免费不免全部代理交通支出。",
      "prompt": "行政复议机关受理申请，{{0}}向申请人收取费用。",
      "blanks": [
        {
          "answer": "不得"
        }
      ],
      "sources": [
        {
          "lessonId": "admin-review",
          "sectionIndex": 0,
          "sectionTitle": "入门：先识别行政争议而非所有不满意"
        },
        {
          "lessonId": "admin-review",
          "sectionIndex": 1,
          "sectionTitle": "入门：能否申请要看行为与法定范围"
        },
        {
          "lessonId": "admin-review",
          "sectionIndex": 2,
          "sectionTitle": "入门：机关受理不收费，不等于所有支出免除"
        }
      ],
      "editorial": true
    },
    {
      "id": "administrative-law-recall-2",
      "part": 0,
      "title": "直接申请与附带审查",
      "quizTitle": "第2组 · 回想关键关系",
      "core": "国家行为、行政法规规章等文件、机关工作人员奖惩任免、民事纠纷调解等不属直接复议对象；对行政行为申请时，可依法附带审查特定依据文件，**不包括规章**。",
      "boundary": "不能把附带审查扩到所有法律法规；须核制定主体、性质及依据关系。",
      "prompt": "法定附带审查的规范性文件不包括{{0}}。",
      "blanks": [
        {
          "answer": "规章"
        }
      ],
      "sources": [
        {
          "lessonId": "admin-review",
          "sectionIndex": 3,
          "sectionTitle": "巩固：直接申请的对象存在明确排除"
        },
        {
          "lessonId": "admin-review",
          "sectionIndex": 4,
          "sectionTitle": "巩固：直接对文件申请与附带审查不同"
        }
      ],
      "editorial": true
    },
    {
      "id": "administrative-law-recall-3",
      "part": 0,
      "title": "期限与执行",
      "quizTitle": "第3组 · 回想关键关系",
      "core": "一般从**知道或应当知道**行政行为起算60日，法律规定更长期限除外；正当障碍消除后继续计算。复议原则不停止执行，另有法定停止情形。",
      "boundary": "不是60工作日，不总从作出日起算；未告知与最长期间等例外另核，不能替现实个案算最后一天。",
      "prompt": "一般申请期为{{0}}日；障碍消除后期限是{{1}}计算。",
      "blanks": [
        {
          "answer": "60"
        },
        {
          "answer": "继续"
        }
      ],
      "sources": [
        {
          "lessonId": "admin-review",
          "sectionIndex": 5,
          "sectionTitle": "巩固：60日一般规则带有起点和例外"
        },
        {
          "lessonId": "admin-review",
          "sectionIndex": 6,
          "sectionTitle": "提升：申请本身不当然停止执行"
        },
        {
          "lessonId": "admin-review",
          "sectionIndex": 7,
          "sectionTitle": "提升：期限障碍消除不是一概重新给足60日"
        }
      ],
      "editorial": true
    },
    {
      "id": "administrative-law-recall-4",
      "part": 0,
      "title": "法与条例的版本边界",
      "quizTitle": "第4组 · 回想关键关系",
      "core": "课程据**2023修订、2024年1月1日施行**的行政复议法；2026修订实施条例已于2026年7月1日施行。",
      "boundary": "核验至2026年11月5日；课程仅核新条例版本与施行日，不宣称穷尽配套程序，2007旧说明不能直接当现行依据。",
      "prompt": "2026修订行政复议法实施条例自2026年{{0}}施行。",
      "blanks": [
        {
          "answer": "7月1日"
        }
      ],
      "sources": [
        {
          "lessonId": "admin-review",
          "sectionIndex": 0,
          "sectionTitle": "入门：先识别行政争议而非所有不满意"
        },
        {
          "lessonId": "admin-review",
          "sectionIndex": 8,
          "sectionTitle": "提升：法律、配套条例和历史材料分开更新"
        }
      ],
      "editorial": true
    }
  ],
  "price-index": [
    {
      "id": "price-index-recall-1",
      "part": 0,
      "title": "对象、指数与涨幅",
      "quizTitle": "第1组 · 回想关键关系",
      "core": "CPI反映居民消费商品服务的**综合价格水平变化**。同口径同一固定基期100、比较期102表示涨2%；整体变动不等于每项商品或每户账单同幅。",
      "boundary": "先核地区、类别与期间，不同基准指数不能直接比；不用于推断个人投资收益。",
      "prompt": "同一固定基期为100、比较期102，表示比基期上涨{{0}}。",
      "blanks": [
        {
          "answer": "2%"
        }
      ],
      "sources": [
        {
          "lessonId": "cpi",
          "sectionIndex": 0,
          "sectionTitle": "入门：CPI反映综合消费价格变化"
        },
        {
          "lessonId": "cpi",
          "sectionIndex": 1,
          "sectionTitle": "入门：基期100与上涨百分数分开读"
        },
        {
          "lessonId": "cpi",
          "sectionIndex": 2,
          "sectionTitle": "入门：总体与个体不需要同向同幅"
        }
      ],
      "editorial": true
    },
    {
      "id": "price-index-recall-2",
      "part": 0,
      "title": "权重与篮子",
      "quizTitle": "第2组 · 回想关键关系",
      "core": "固定篮子比较用总支出比，涨跌幅要按**基期支出权重**合成；甲3份每份10、乙1份20，变为11和18时，支出50变51，指数102。",
      "boundary": "份数不等于支出权重；原创固定篮子不是官方完整CPI算法，不能随意平均两个涨幅。",
      "prompt": "固定篮子的涨跌合成看基期{{0}}权重。",
      "blanks": [
        {
          "answer": "支出"
        }
      ],
      "sources": [
        {
          "lessonId": "cpi",
          "sectionIndex": 3,
          "sectionTitle": "巩固：用明确固定篮子理解权重"
        },
        {
          "lessonId": "cpi",
          "sectionIndex": 8,
          "sectionTitle": "提升：概念练习与现实物价判断分开"
        }
      ],
      "editorial": true
    },
    {
      "id": "price-index-recall-3",
      "part": 0,
      "title": "比较基准与连续变化",
      "quizTitle": "第3组 · 回想关键关系",
      "core": "同比比上年同期，环比比相邻前期；同比升、环比降可以并存。可衔接变化按**因子连乘**，涨2%再降2%得到0.9996，累计降0.04%。",
      "boundary": "连续两月同比指数的分母不同，不能仅据103变102推出环比下降。",
      "prompt": "同口径连续变动应把各期变化因子{{0}}，而非简单加减。",
      "blanks": [
        {
          "answer": "连乘"
        }
      ],
      "sources": [
        {
          "lessonId": "cpi",
          "sectionIndex": 4,
          "sectionTitle": "巩固：同比与环比分别标出比较基准"
        },
        {
          "lessonId": "cpi",
          "sectionIndex": 5,
          "sectionTitle": "巩固：连续变动按因子连乘"
        },
        {
          "lessonId": "cpi",
          "sectionIndex": 6,
          "sectionTitle": "提升：两个同比指数未必能推出环比"
        }
      ],
      "editorial": true
    },
    {
      "id": "price-index-recall-4",
      "part": 0,
      "title": "方法版本与现实判断",
      "quizTitle": "第4组 · 回想关键关系",
      "core": "国家统计局2026年2月说明：从2026年起编制发布以**2025年为基期**的价格指数，分类、代表品、权数与对比基期随轮换调整。",
      "boundary": "不能把旧权数当现行，或把基期权数充当所有月同比环比权数；课程核验至2026年11月5日。",
      "prompt": "从2026年起，价格指数采用的基期年份为{{0}}年。",
      "blanks": [
        {
          "answer": "2025"
        }
      ],
      "sources": [
        {
          "lessonId": "cpi",
          "sectionIndex": 7,
          "sectionTitle": "提升：基期轮换要看当前版本说明"
        },
        {
          "lessonId": "cpi",
          "sectionIndex": 8,
          "sectionTitle": "提升：概念练习与现实物价判断分开"
        }
      ],
      "editorial": true
    }
  ],
  "physical-change": [
    {
      "id": "physical-change-recall-1",
      "part": 0,
      "title": "先写状态箭头",
      "quizTitle": "第1组 · 回想关键关系",
      "core": "固→液熔化、液→固凝固；液→气汽化、气→液液化；固→气升华、气→固凝华。**直接跨过液态**才属升华或凝华，蒸发沸腾都属汽化。",
      "boundary": "只见冰不能确定凝固还是凝华，须有起点与路径。",
      "prompt": "气态直接变固态是{{0}}；固态直接变气态是{{1}}。",
      "blanks": [
        {
          "answer": "凝华"
        },
        {
          "answer": "升华"
        }
      ],
      "sources": [
        {
          "lessonId": "phase-change",
          "sectionIndex": 0,
          "sectionTitle": "小白：先写起点和终点，不先背情景名词"
        },
        {
          "lessonId": "phase-change",
          "sectionIndex": 1,
          "sectionTitle": "小白：六个名称可以按三组往返记"
        },
        {
          "lessonId": "phase-change",
          "sectionIndex": 6,
          "sectionTitle": "提高：终态不够，必须追问形成路径"
        }
      ],
      "editorial": true
    },
    {
      "id": "physical-change-recall-2",
      "part": 0,
      "title": "热量方向看变化物质",
      "quizTitle": "第2组 · 回想关键关系",
      "core": "**熔化、汽化、升华吸热；凝固、液化、凝华放热**。判断以发生相变的物质为对象，冷杯上的水蒸气凝成液滴仍放热。",
      "boundary": "冷表面吸收热量与凝结水放热是不同对象；这里只讲日常普通相变。",
      "prompt": "液化、凝固、凝华均{{0}}。",
      "blanks": [
        {
          "answer": "放热"
        }
      ],
      "sources": [
        {
          "lessonId": "phase-change",
          "sectionIndex": 2,
          "sectionTitle": "小白：吸热或放热，要说清是谁在变化"
        }
      ],
      "editorial": true
    },
    {
      "id": "physical-change-recall-3",
      "part": 0,
      "title": "多步过程保留中间态",
      "quizTitle": "第3组 · 回想关键关系",
      "core": "题设白雾若由小水滴构成就是液态；水汽先液化后凝固为气→液→固，**不能合称凝华**。液态水先汽化，随后才可能冷凝成白雾。",
      "boundary": "起终点相同不代表路径相同，不能把所有白烟雾都当水滴。",
      "prompt": "水汽先成液滴再结冰，依次是液化和{{0}}。",
      "blanks": [
        {
          "answer": "凝固"
        }
      ],
      "sources": [
        {
          "lessonId": "phase-change",
          "sectionIndex": 3,
          "sectionTitle": "基础：同一现象里，先分清看见的东西"
        },
        {
          "lessonId": "phase-change",
          "sectionIndex": 4,
          "sectionTitle": "基础：多步过程逐段命名，不把中间状态擦掉"
        }
      ],
      "editorial": true
    },
    {
      "id": "physical-change-recall-4",
      "part": 0,
      "title": "温度与能量另作判断",
      "quizTitle": "第4组 · 回想关键关系",
      "core": "一定压力下纯物质在相应熔点缓慢熔化、固液共存，可**吸热而温度不变**；热平衡也可能温度不变。热量方向不等于热量大小。",
      "boundary": "不可倒推恒温必相变，也不能不知质量与热交换就认定吸放热抵消。",
      "prompt": "吸热过程中，若热量用于相变，温度不一定{{0}}。",
      "blanks": [
        {
          "answer": "升高"
        }
      ],
      "sources": [
        {
          "lessonId": "phase-change",
          "sectionIndex": 5,
          "sectionTitle": "基础：吸热不一定伴随温度上升"
        },
        {
          "lessonId": "phase-change",
          "sectionIndex": 7,
          "sectionTitle": "提高：温度不变，也不能倒推一定在相变"
        },
        {
          "lessonId": "phase-change",
          "sectionIndex": 8,
          "sectionTitle": "提高：热量方向与热量大小是两件事"
        }
      ],
      "editorial": true
    }
  ],
  "history-framework": [
    {
      "id": "history-framework-recall-1",
      "part": 0,
      "title": "分期先后与并立",
      "quizTitle": "第1组 · 回想关键关系",
      "core": "大序列：夏商西周→春秋战国→秦汉→三国两晋南北朝→隋唐五代→辽宋夏金元→明清。**分期标签可含并立政权**，时期起讫也会因口径重叠。",
      "boundary": "同期题须核具体政权起讫；建朝、统一、最后政权灭亡不是同一节点。",
      "prompt": "辽宋夏金元不能排成互不重叠的一列，因为其中存在政权{{0}}。",
      "blanks": [
        {
          "answer": "并立"
        }
      ],
      "sources": [
        {
          "lessonId": "history-periods",
          "sectionIndex": 0,
          "sectionTitle": "先建立大顺序"
        },
        {
          "lessonId": "history-periods",
          "sectionIndex": 1,
          "sectionTitle": "看见并立，避免串成一列"
        },
        {
          "lessonId": "history-periods",
          "sectionIndex": 2,
          "sectionTitle": "年份也有不同口径"
        },
        {
          "lessonId": "history-periods",
          "sectionIndex": 3,
          "sectionTitle": "怎样排除错项"
        },
        {
          "lessonId": "history-periods",
          "sectionIndex": 4,
          "sectionTitle": "这一课的范围"
        }
      ],
      "editorial": true
    },
    {
      "id": "history-framework-recall-2",
      "part": 0,
      "title": "史书两条分类轴",
      "quizTitle": "第2组 · 回想关键关系",
      "core": "组织方式看纪传体或编年体，历史范围看通史或断代史。**《史记》纪传体通史，《资治通鉴》编年体通史，《汉书》纪传体断代史**。",
      "boundary": "有年份不自动是编年，有人物不自动是纪传；多字段分别核对。",
      "prompt": "《资治通鉴》是{{0}}体通史；《汉书》是纪传体{{1}}史。",
      "blanks": [
        {
          "answer": "编年"
        },
        {
          "answer": "断代"
        }
      ],
      "sources": [
        {
          "lessonId": "historiography",
          "sectionIndex": 0,
          "sectionTitle": "小白：两张标签，分别回答两个问题"
        },
        {
          "lessonId": "historiography",
          "sectionIndex": 1,
          "sectionTitle": "小白：组织方式不等于出现了哪些词"
        },
        {
          "lessonId": "historiography",
          "sectionIndex": 2,
          "sectionTitle": "小白：用三个已核样本搭两栏"
        },
        {
          "lessonId": "historiography",
          "sectionIndex": 3,
          "sectionTitle": "基础：只改错的字段，别把正确部分一起换掉"
        },
        {
          "lessonId": "historiography",
          "sectionIndex": 4,
          "sectionTitle": "基础：同类关系要说明在哪一栏成立"
        }
      ],
      "editorial": true
    },
    {
      "id": "history-framework-recall-3",
      "part": 0,
      "title": "分类不能代替证据",
      "quizTitle": "第3组 · 回想关键关系",
      "core": "作者生活时代不等于全书范围，局部节选不改变全书类型；**组织与范围不证明史料真实性或完整性**。",
      "boundary": "匿名材料的分类线索不一定能认出唯一书名；需核来源、版本及相互印证。",
      "prompt": "一本通史的局部节选，不会让原书自动变成{{0}}。",
      "blanks": [
        {
          "answer": "断代史"
        }
      ],
      "sources": [
        {
          "lessonId": "historiography",
          "sectionIndex": 5,
          "sectionTitle": "基础：把时间范围与写作时代分开"
        },
        {
          "lessonId": "historiography",
          "sectionIndex": 6,
          "sectionTitle": "提高：局部节选不替代全书分类"
        },
        {
          "lessonId": "historiography",
          "sectionIndex": 7,
          "sectionTitle": "提高：发现信息缺口，不把空格填成结论"
        },
        {
          "lessonId": "historiography",
          "sectionIndex": 8,
          "sectionTitle": "提高：体例标签不是可靠性或完整性的保证"
        }
      ],
      "editorial": true
    },
    {
      "id": "history-framework-recall-4",
      "part": 0,
      "title": "技术贡献与时代",
      "quizTitle": "第4组 · 回想关键关系",
      "core": "西汉已有植物纤维纸，东汉蔡伦**改进造纸术**；北宋庆历年间毕昇对应活字印刷。造纸改善载体，活字用可拆分复用字模排版复制。",
      "boundary": "改进不等于此前没有；不把造纸与印刷混为一项或推断四大发明同时产生。",
      "prompt": "蔡伦的贡献宜表述为{{0}}造纸术；毕昇对应{{1}}印刷。",
      "blanks": [
        {
          "answer": "改进"
        },
        {
          "answer": "活字"
        }
      ],
      "sources": [
        {
          "lessonId": "paper-printing",
          "sectionIndex": 0,
          "sectionTitle": "蔡伦：抓住“改进”"
        },
        {
          "lessonId": "paper-printing",
          "sectionIndex": 1,
          "sectionTitle": "毕昇：对应活字印刷"
        },
        {
          "lessonId": "paper-printing",
          "sectionIndex": 2,
          "sectionTitle": "从功能理解更牢"
        },
        {
          "lessonId": "paper-printing",
          "sectionIndex": 3,
          "sectionTitle": "警惕绝对化选项"
        },
        {
          "lessonId": "paper-printing",
          "sectionIndex": 4,
          "sectionTitle": "复盘清单"
        }
      ],
      "editorial": true
    }
  ],
  "fujian-geography-topic": [
    {
      "id": "fujian-geography-topic-recall-1",
      "part": 0,
      "title": "省域位置与城市河流",
      "quizTitle": "第1组 · 回想关键关系",
      "core": "福建位于**东南沿海**，北邻浙江、西北接江西、南接广东，东及东南滨海；省会福州，闽江横贯市区东流入海。",
      "boundary": "陆地接壤与隔海相望分开；省会身份不等于人口经济排名。",
      "prompt": "福建省会是{{0}}；西北与{{1}}交界。",
      "blanks": [
        {
          "answer": "福州"
        },
        {
          "answer": "江西"
        }
      ],
      "sources": [
        {
          "lessonId": "fujian-geography",
          "sectionIndex": 0,
          "sectionTitle": "入门：陆地邻省与隔海相望分开记"
        },
        {
          "lessonId": "fujian-geography",
          "sectionIndex": 1,
          "sectionTitle": "入门：省会是城市身份，不是规模排名"
        }
      ],
      "editorial": true
    },
    {
      "id": "fujian-geography-topic-recall-2",
      "part": 0,
      "title": "地形地势与空间尺度",
      "quizTitle": "第2组 · 回想关键关系",
      "core": "**山地丘陵广布，整体西北高东南低**；八山一水一分田是形象概括。闽西、闽中山带，山脉走向、坡向、海拔影响局部自然条件。",
      "boundary": "总体趋势不是每条路线单调下降，俗语不是精确土地比例；同纬度也可有不同小气候。",
      "prompt": "福建总体地势为{{0}}高、{{1}}低。",
      "blanks": [
        {
          "answer": "西北"
        },
        {
          "answer": "东南"
        }
      ],
      "sources": [
        {
          "lessonId": "fujian-geography",
          "sectionIndex": 2,
          "sectionTitle": "入门：先抓山海地势的大框架"
        },
        {
          "lessonId": "fujian-geography",
          "sectionIndex": 3,
          "sectionTitle": "巩固：省域概括不等于每一条路线都单调"
        },
        {
          "lessonId": "fujian-geography",
          "sectionIndex": 4,
          "sectionTitle": "巩固：山带与局部条件共同影响地域差异"
        }
      ],
      "editorial": true
    },
    {
      "id": "fujian-geography-topic-recall-3",
      "part": 0,
      "title": "气候背景与具体证据",
      "quizTitle": "第3组 · 回想关键关系",
      "core": "海洋、季风与地形共同影响热量降水及差异；**气候背景不代替天气预报**。山多只能帮助理解交通生态材料，不能推出某村特定产业产量。",
      "boundary": "现实天气灾害须核对应时间地点的官方信息；不补造材料未给的结论。",
      "prompt": "气候背景不能代替对应时地的{{0}}。",
      "blanks": [
        {
          "answer": "天气预报"
        }
      ],
      "sources": [
        {
          "lessonId": "fujian-geography",
          "sectionIndex": 5,
          "sectionTitle": "巩固：气候背景不等于今天的天气预报"
        },
        {
          "lessonId": "fujian-geography",
          "sectionIndex": 7,
          "sectionTitle": "提升：把已知地图关系与材料推断分开"
        }
      ],
      "editorial": true
    },
    {
      "id": "fujian-geography-topic-recall-4",
      "part": 0,
      "title": "稳定事实与动态数字",
      "quizTitle": "第4组 · 回想关键关系",
      "core": "面积海岸线人口经济数据先核**年份与统计口径**；学习卡分位置、地形、城市河流、年度统计、政策。",
      "boundary": "网页发布日不等于统计年；本专题未覆盖完整文化、区划、政策经济及河流体系。",
      "prompt": "两份地理数字不同，先核年份与{{0}}。",
      "blanks": [
        {
          "answer": "统计口径"
        }
      ],
      "sources": [
        {
          "lessonId": "fujian-geography",
          "sectionIndex": 6,
          "sectionTitle": "提升：地理数字先核年份与统计口径"
        },
        {
          "lessonId": "fujian-geography",
          "sectionIndex": 8,
          "sectionTitle": "提升：建立可更新的省情卡片"
        }
      ],
      "editorial": true
    }
  ],
  "enterprise-policy": [
    {
      "id": "enterprise-policy-recall-1",
      "part": 0,
      "title": "2025指定文本的时间边界",
      "quizTitle": "第1组 · 回想关键关系",
      "core": "闽政办〔2025〕7号：4月20日成文、4月25日公开，原文自印发施行、有效期至2027年12月31日。**只作2025历史文本学习**，截至2026年11月5日未确认后续修订废止替代。",
      "boundary": "期限未届满不等于已核现行有效，不能作现实办事承诺。",
      "prompt": "原文设定有效期到{{0}}，但现行状态仍须另核。",
      "blanks": [
        {
          "answer": "2027年12月31日"
        }
      ],
      "sources": [
        {
          "lessonId": "fujian-enterprise-service-2025",
          "sectionIndex": 0,
          "sectionTitle": "小白：先在标题旁写出文本时间"
        },
        {
          "lessonId": "fujian-enterprise-service-2025",
          "sectionIndex": 8,
          "sectionTitle": "提高：政策安排、落实记录和成效结论分开"
        }
      ],
      "editorial": true
    },
    {
      "id": "enterprise-policy-recall-2",
      "part": 0,
      "title": "四个方面与监管例外",
      "quizTitle": "第2组 · 回想关键关系",
      "core": "畅通联系渠道不叫不到、沟通解决问题随叫随到、疏通政策传导说到做到、打通部门壁垒服务周到。**少打扰与主动联系并行**，安全隐患排查、执法检查及应急处置有原文例外。",
      "boundary": "不叫不到不是不联系或不监管，不能说所有检查均要企业邀请。",
      "prompt": "不叫不到强调减少不必要打扰，并不意味着取消{{0}}。",
      "blanks": [
        {
          "answer": "监管"
        }
      ],
      "sources": [
        {
          "lessonId": "fujian-enterprise-service-2025",
          "sectionIndex": 1,
          "sectionTitle": "小白：四个方面，分别追问一个服务断点"
        },
        {
          "lessonId": "fujian-enterprise-service-2025",
          "sectionIndex": 2,
          "sectionTitle": "小白：少打扰，不是没有联系也不是不监管"
        }
      ],
      "editorial": true
    },
    {
      "id": "enterprise-policy-recall-3",
      "part": 0,
      "title": "分类时限与协同闭环",
      "quizTitle": "第3组 · 回想关键关系",
      "core": "原文咨询、建议、诉求分别**2、5、10个工作日**内办结反馈；复杂事项说明原因后可按规定适当延期。多地多部门问题由指定牵头单位全程负责、其他单位配合。",
      "boundary": "工作日不是自然日，办结反馈不保证每项要求获满足；转交窗口不等于协同完成。",
      "prompt": "原文咨询、建议、诉求时限依次为{{0}}、{{1}}、{{2}}个工作日。",
      "blanks": [
        {
          "answer": "2"
        },
        {
          "answer": "5"
        },
        {
          "answer": "10"
        }
      ],
      "sources": [
        {
          "lessonId": "fujian-enterprise-service-2025",
          "sectionIndex": 3,
          "sectionTitle": "基础：分类办理，不把口号改成即时全部解决"
        },
        {
          "lessonId": "fujian-enterprise-service-2025",
          "sectionIndex": 4,
          "sectionTitle": "基础：协调闭环需要牵头和配合"
        }
      ],
      "editorial": true
    },
    {
      "id": "enterprise-policy-recall-4",
      "part": 0,
      "title": "政策传导与服务条件",
      "quizTitle": "第4组 · 回想关键关系",
      "core": "政策公布后**5个工作日**内同步推送文件、解读稿、申报指南；可查、理解、申报、兑现分环节。数据复用不免资格核验；有条件建设服务站，鼓励延时错峰周末预约。",
      "boundary": "免申即享不等于全部无条件发钱，鼓励不等于所有窗口全天开放；文件部署不证明实际成效。",
      "prompt": "政策公布后，原文要求在{{0}}个工作日内同步推送配套材料。",
      "blanks": [
        {
          "answer": "5"
        }
      ],
      "sources": [
        {
          "lessonId": "fujian-enterprise-service-2025",
          "sectionIndex": 5,
          "sectionTitle": "基础：发布、理解、申报、兑现不是一个动作"
        },
        {
          "lessonId": "fujian-enterprise-service-2025",
          "sectionIndex": 6,
          "sectionTitle": "提高：减少重复采集，不等于取消必要核验"
        },
        {
          "lessonId": "fujian-enterprise-service-2025",
          "sectionIndex": 7,
          "sectionTitle": "提高：有条件的服务创新，不扩大为统一强制承诺"
        },
        {
          "lessonId": "fujian-enterprise-service-2025",
          "sectionIndex": 8,
          "sectionTitle": "提高：政策安排、落实记录和成效结论分开"
        }
      ],
      "editorial": true
    }
  ],
  "fujian-report": [
    {
      "id": "fujian-report-recall-1",
      "part": 0,
      "title": "年度坐标与新福建",
      "quizTitle": "第1组 · 回想关键关系",
      "core": "2026福建报告于1月27日作、2月6日公开；今年指2026、全省指福建。新福建关键词为**机制活、产业优、百姓富、生态美**。",
      "boundary": "与全国方向衔接但不能互抄指标；报告介绍的省纲要草案不替代正式纲要。",
      "prompt": "新福建四词为机制活、产业优、{{0}}、生态美。",
      "blanks": [
        {
          "answer": "百姓富"
        }
      ],
      "sources": [
        {
          "lessonId": "policy-fujian-report-2026",
          "sectionIndex": 0,
          "sectionTitle": "入门：报告的省份与年份"
        },
        {
          "lessonId": "policy-fujian-report-2026",
          "sectionIndex": 1,
          "sectionTitle": "入门：新福建建设四个关键词"
        },
        {
          "lessonId": "policy-fujian-report-2026",
          "sectionIndex": 8,
          "sectionTitle": "提升：全国与福建对照"
        }
      ],
      "editorial": true
    },
    {
      "id": "fujian-report-recall-2",
      "part": 0,
      "title": "本省目标与全国对照",
      "quizTitle": "第2组 · 回想关键关系",
      "core": "福建预期GDP增**5%左右**并争取更好结果，城镇调查失业率控制在5%左右、城镇新增就业50万人、CPI涨2%左右、收入与经济同步、粮食513万吨以上，完成国家下达的单位地区生产总值二氧化碳排放降低目标。",
      "boundary": "全国GDP4.5%—5%、城镇调查失业率5.5%左右、城镇新增就业1200万人以上；限定词与单位分别保留，目标不是实绩。",
      "prompt": "福建2026城镇新增就业目标为{{0}}万人，粮食产量{{1}}万吨以上。",
      "blanks": [
        {
          "answer": "50"
        },
        {
          "answer": "513"
        }
      ],
      "sources": [
        {
          "lessonId": "policy-fujian-report-2026",
          "sectionIndex": 2,
          "sectionTitle": "入门：福建2026年预期目标"
        },
        {
          "lessonId": "policy-fujian-report-2026",
          "sectionIndex": 8,
          "sectionTitle": "提升：全国与福建对照"
        }
      ],
      "editorial": true
    },
    {
      "id": "fujian-report-recall-3",
      "part": 0,
      "title": "创新与数字治理",
      "quizTitle": "第3组 · 回想关键关系",
      "core": "两创融合抓**科技供给、企业主体、成果转化、一体推进**；教育科技人才在规划政策资源评价上协同。数字治理推进一件事、数据最多采一次、无证明省份及五个一网，融入统一市场、改善营商环境。",
      "boundary": "平台与协议不等于转化成效，少采集不免核验，服务便利不等于无条件补贴或绕过规则。",
      "prompt": "两创融合指科技创新与{{0}}深度融合。",
      "blanks": [
        {
          "answer": "产业创新"
        }
      ],
      "sources": [
        {
          "lessonId": "policy-fujian-report-2026",
          "sectionIndex": 3,
          "sectionTitle": "巩固：两创融合的四个着力点"
        },
        {
          "lessonId": "policy-fujian-report-2026",
          "sectionIndex": 4,
          "sectionTitle": "巩固：数字治理的办事链条"
        },
        {
          "lessonId": "policy-fujian-report-2026",
          "sectionIndex": 5,
          "sectionTitle": "巩固：统一市场与营商环境"
        }
      ],
      "editorial": true
    },
    {
      "id": "fujian-report-recall-4",
      "part": 0,
      "title": "融合与山海城乡",
      "quizTitle": "第4组 · 回想关键关系",
      "core": "闽台样板分**社会融合、经济融合、情感融合**，并部署全域融合；山海协作联结沿海山区及产业科创飞地，城乡融合统筹产业设施服务，海上福建兼顾开发利用保护。",
      "boundary": "三类融合可交叉且不限单城；协作须说清技术、承接应用与收益，不能只喊优势互补。",
      "prompt": "台胞社会参与、产业合作、文化祖地交流，分别侧重社会、经济与{{0}}融合。",
      "blanks": [
        {
          "answer": "情感"
        }
      ],
      "sources": [
        {
          "lessonId": "policy-fujian-report-2026",
          "sectionIndex": 6,
          "sectionTitle": "提升：闽台融合的三个样板"
        },
        {
          "lessonId": "policy-fujian-report-2026",
          "sectionIndex": 7,
          "sectionTitle": "提升：山海协同与城乡共荣"
        }
      ],
      "editorial": true
    }
  ],
  "context-words": [
    {
      "id": "context-words-recall-1",
      "part": 0,
      "title": "确定每空的任务",
      "quizTitle": "要点回忆 1",
      "core": "先读完整语境，用自己的话预测空处含义，再核对**动作、对象与搭配**。解释和结果都能提供线索。",
      "boundary": "熟悉、顺口或词语高级，都不能替代语境证据。",
      "prompt": "填词前先预测空处的{{0}}；比较搭配时要找准动作对应的{{1}}。",
      "blanks": [
        {
          "answer": "含义",
          "accept": [
            "意思",
            "语义"
          ]
        },
        {
          "answer": "对象",
          "accept": [
            "作用对象",
            "对应对象"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "word",
          "sectionIndex": 1,
          "sectionTitle": "考点一：解释与照应提供语义范围"
        },
        {
          "lessonId": "word",
          "sectionIndex": 2,
          "sectionTitle": "考点二：搭配先看谁对谁做什么"
        },
        {
          "lessonId": "context-blanks",
          "sectionIndex": 0,
          "sectionTitle": "入门：把空格先改写成语义任务"
        }
      ],
      "editorial": true
    },
    {
      "id": "context-words-recall-2",
      "part": 0,
      "title": "整组检验关系",
      "quizTitle": "要点回忆 2",
      "core": "多空题从证据最强的一空切入，再**整组回填**，检查并列、转折、因果及否定关系。",
      "boundary": "一空成立只是保留候选，不表示整组正确；转折不必对应反义词。",
      "prompt": "先用强线索排除，最后必须{{0}}，核对所有空。",
      "blanks": [
        {
          "answer": "整组回填",
          "accept": [
            "全部回填",
            "整组代入"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "word",
          "sectionIndex": 4,
          "sectionTitle": "步骤：概括需求、逐项对照、整句回填"
        },
        {
          "lessonId": "context-blanks",
          "sectionIndex": 3,
          "sectionTitle": "巩固：两个空要共同完成同一层关系"
        },
        {
          "lessonId": "context-blanks",
          "sectionIndex": 4,
          "sectionTitle": "巩固：先分清并列、转折与因果"
        },
        {
          "lessonId": "pn-context-contrast",
          "sectionIndex": 3,
          "sectionTitle": "迁移：两空互相校验"
        }
      ],
      "editorial": true
    },
    {
      "id": "context-words-recall-3",
      "part": 0,
      "title": "保留程度与阶段",
      "quizTitle": "要点回忆 3",
      "core": "转述须保留**程度、时间和证据阶段**；发现线索不等于核实，相关不等于因果，不是全部符合也不等于全部不符。",
      "boundary": "充分证据支持的强表达应承认；不能因警惕绝对化而弱化已知事实。",
      "prompt": "材料只支持相关时，不能升级为{{0}}；发现线索、形成假说、核实事实应区分不同证据{{1}}。",
      "blanks": [
        {
          "answer": "因果",
          "accept": [
            "因果关系"
          ]
        },
        {
          "answer": "阶段",
          "accept": [
            "阶段层级"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "word",
          "sectionIndex": 11,
          "sectionTitle": "提升导读：强表达是否合适取决于证据"
        },
        {
          "lessonId": "context-blanks",
          "sectionIndex": 6,
          "sectionTitle": "提升：证据强度不能被词语悄悄升级"
        },
        {
          "lessonId": "pn-context-contrast",
          "sectionIndex": 4,
          "sectionTitle": "迁移：保留程度和阶段"
        },
        {
          "lessonId": "pn-context-contrast",
          "sectionIndex": 6,
          "sectionTitle": "边界：否定词的作用范围"
        }
      ],
      "editorial": true
    },
    {
      "id": "context-words-recall-4",
      "part": 0,
      "title": "用差异而非偏好决胜",
      "quizTitle": "要点回忆 4",
      "core": "近义候选要逐条找**支持证据与改动点**；多来源先对齐对象、时间与口径，再判断分歧。",
      "boundary": "语义相容且缺少其他限制时，不编造唯一理由；实际单选仍需检查完整句式与选项。",
      "prompt": "复盘应记录错项改变了哪条{{0}}，而不只记答案字母。",
      "blanks": [
        {
          "answer": "约束",
          "accept": [
            "限制",
            "条件"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "context-blanks",
          "sectionIndex": 7,
          "sectionTitle": "提升：两个候选都相容时，不编造唯一理由"
        },
        {
          "lessonId": "context-blanks",
          "sectionIndex": 8,
          "sectionTitle": "提升：复盘要记错在哪个约束"
        },
        {
          "lessonId": "pn-context-contrast",
          "sectionIndex": 8,
          "sectionTitle": "边界：多来源分歧先对齐口径"
        }
      ],
      "editorial": true
    }
  ],
  "central-meaning": [
    {
      "id": "central-meaning-recall-1",
      "part": 0,
      "title": "先定任务再抓中心",
      "quizTitle": "要点回忆 1",
      "core": "主旨回答作者主要表达什么；中心概括应保留**对象、核心判断与范围**，不只是重复话题词。",
      "boundary": "细节、对策与主旨任务不同；事实正确也未必是全文重点。",
      "prompt": "概括中心时，作者对对象说了什么是{{0}}，判断适用的对象、时间和条件构成其{{1}}。",
      "blanks": [
        {
          "answer": "核心判断",
          "accept": [
            "判断"
          ]
        },
        {
          "answer": "范围",
          "accept": [
            "适用范围",
            "证据范围"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "mainidea",
          "sectionIndex": 0,
          "sectionTitle": "任务边界：主旨不是所有合理的话"
        },
        {
          "lessonId": "mainidea",
          "sectionIndex": 1,
          "sectionTitle": "概念：话题、判断与范围"
        },
        {
          "lessonId": "scoped-reading",
          "sectionIndex": 0,
          "sectionTitle": "入门① 先知道题目让你选什么"
        }
      ],
      "editorial": true
    },
    {
      "id": "central-meaning-recall-2",
      "part": 0,
      "title": "从结构识别统领关系",
      "quizTitle": "要点回忆 2",
      "core": "给句子标观点、解释、例子和限制，辨清**例子服务哪个判断**；并列内容找共同统领，局部转折不能压过全文。",
      "boundary": "不能机械取尾句、转折后句或高频词作为中心。",
      "prompt": "遇到例子中的转折，先查它服务于哪个{{0}}。",
      "blanks": [
        {
          "answer": "判断",
          "accept": [
            "观点",
            "核心判断"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "mainidea",
          "sectionIndex": 2,
          "sectionTitle": "方法一：先画结构，再写一句概括"
        },
        {
          "lessonId": "mainidea",
          "sectionIndex": 5,
          "sectionTitle": "转折词为什么不能单独定答案"
        },
        {
          "lessonId": "mainidea",
          "sectionIndex": 10,
          "sectionTitle": "巩固导读：先找例子服务的观点"
        }
      ],
      "editorial": true
    },
    {
      "id": "central-meaning-recall-3",
      "part": 0,
      "title": "逐项核对主张强度",
      "quizTitle": "要点回忆 3",
      "core": "比较候选多写或少写了什么，查对象、条件、因果与状态；**对策必须有原文依据**。",
      "boundary": "描述问题不自动授权添加方案；相关变化不自动证明唯一原因。",
      "prompt": "措施项须有原文{{0}}；不能把同期变化直接认作确定{{1}}。",
      "blanks": [
        {
          "answer": "依据",
          "accept": [
            "证据"
          ]
        },
        {
          "answer": "因果",
          "accept": [
            "因果关系"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "mainidea",
          "sectionIndex": 3,
          "sectionTitle": "方法二：把选项当候选概括逐项核验"
        },
        {
          "lessonId": "mainidea",
          "sectionIndex": 6,
          "sectionTitle": "问题与对策之间要有文字桥梁"
        },
        {
          "lessonId": "scoped-reading",
          "sectionIndex": 6,
          "sectionTitle": "提高① 不把同时变化直接写成确定因果"
        },
        {
          "lessonId": "scoped-reading",
          "sectionIndex": 7,
          "sectionTitle": "提高② 强词要看证据，不能见到就删"
        }
      ],
      "editorial": true
    },
    {
      "id": "central-meaning-recall-4",
      "part": 0,
      "title": "标题压缩而不改意",
      "quizTitle": "要点回忆 4",
      "core": "标题提炼**中心对象与关键关系**，保留必要限制；先准确覆盖，再按题目要求比较简洁和修辞。",
      "boundary": "醒目不能补救含义错误；语义等价时不凭个人文风偏好强分优劣。",
      "prompt": "标题不能改变核心因果、转折或条件等逻辑{{0}}。",
      "blanks": [
        {
          "answer": "关系",
          "accept": [
            "联系"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "title-choice",
          "sectionIndex": 0,
          "sectionTitle": "入门：先写中心对象和核心判断"
        },
        {
          "lessonId": "title-choice",
          "sectionIndex": 1,
          "sectionTitle": "入门：限制条件也是中心的一部分"
        },
        {
          "lessonId": "title-choice",
          "sectionIndex": 4,
          "sectionTitle": "巩固：比较相近标题漏掉的关系"
        },
        {
          "lessonId": "title-choice",
          "sectionIndex": 5,
          "sectionTitle": "巩固：修辞和简洁不能抵消含义错误"
        },
        {
          "lessonId": "title-choice",
          "sectionIndex": 7,
          "sectionTitle": "提升：语义等价的标题不靠偏好硬分胜负"
        }
      ],
      "editorial": true
    }
  ],
  "detail-reading-topic": [
    {
      "id": "detail-reading-topic-recall-1",
      "part": 0,
      "title": "先辨设问方向",
      "quizTitle": "要点回忆 1",
      "core": "逐项区分**支持、反驳、未知**。相符需要依据，矛盾需要相反依据，未提及不是已经证伪。",
      "boundary": "不能推出可能包含未知或被反驳，仍需按题目比较选项。",
      "prompt": "材料没谈某项，应标为{{0}}；明确给出相反结论，才属{{1}}。",
      "blanks": [
        {
          "answer": "未知",
          "accept": [
            "未说明",
            "未提及",
            "无法判断"
          ]
        },
        {
          "answer": "反驳",
          "accept": [
            "被反驳",
            "矛盾"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "detail-reading",
          "sectionIndex": 0,
          "sectionTitle": "入门：先看设问要求哪种关系"
        },
        {
          "lessonId": "detail-reading",
          "sectionIndex": 6,
          "sectionTitle": "提升：未知与矛盾分开标记"
        }
      ],
      "editorial": true
    },
    {
      "id": "detail-reading-topic-recall-2",
      "part": 0,
      "title": "对齐对象与状态",
      "quizTitle": "要点回忆 2",
      "core": "定位后核对**主体、动作、时间、条件、程度**，区分许可与义务、计划与完成、部分与全体。",
      "boundary": "词面相似不等于关系相同；范围外成员不能自行补成相反状态。",
      "prompt": "拟实施不能写成{{0}}，允许不能写成{{1}}。",
      "blanks": [
        {
          "answer": "已完成",
          "accept": [
            "已经完成",
            "已实施"
          ]
        },
        {
          "answer": "必须",
          "accept": [
            "强制",
            "强制义务"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "detail-reading",
          "sectionIndex": 1,
          "sectionTitle": "入门：把主语和数量层级标清"
        },
        {
          "lessonId": "detail-reading",
          "sectionIndex": 2,
          "sectionTitle": "入门：五项限制一起保留"
        },
        {
          "lessonId": "detail-boundaries",
          "sectionIndex": 1,
          "sectionTitle": "入门：允许与要求不是同一种语气"
        },
        {
          "lessonId": "detail-boundaries",
          "sectionIndex": 2,
          "sectionTitle": "入门：时间与状态要逐字保留"
        }
      ],
      "editorial": true
    },
    {
      "id": "detail-reading-topic-recall-3",
      "part": 0,
      "title": "关系与条件逐层核验",
      "quizTitle": "要点回忆 3",
      "core": "复合选项既查每个分句，也查连接关系。**仅有必要条件不能反向保证结果**，先后顺序也不自动构成充分条件。",
      "boundary": "未另给充分规则时，不能补出反向保证；拿到码、具备资格与实际领取是不同状态。",
      "prompt": "仅知“只有登记并通过校验才生成码”，生成码可回推这两个条件；未另给充分规则时，满足条件仍不能当作生成码的{{0}}。",
      "blanks": [
        {
          "answer": "保证",
          "accept": [
            "充分保证",
            "充分条件"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "detail-reading",
          "sectionIndex": 4,
          "sectionTitle": "巩固：必要条件不能反向当保证"
        },
        {
          "lessonId": "detail-reading",
          "sectionIndex": 7,
          "sectionTitle": "提升：复合选项逐部分核对"
        },
        {
          "lessonId": "detail-boundaries",
          "sectionIndex": 5,
          "sectionTitle": "巩固：同义改写要保住条件"
        }
      ],
      "editorial": true
    },
    {
      "id": "detail-reading-topic-recall-4",
      "part": 0,
      "title": "数量界限与反例检查",
      "quizTitle": "要点回忆 4",
      "core": "至少给下界，至多给上界，恰好同时定上下界；**量词作用对象**不能换。用兼容原文的反例检查必然推断。",
      "boundary": "每组至少一人完成，不等于至少一组人人完成；可能成立不等于必然成立。",
      "prompt": "检查数量语句时，除界限外还要核对量词的{{0}}。",
      "blanks": [
        {
          "answer": "作用对象",
          "accept": [
            "对象"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "detail-boundaries",
          "sectionIndex": 6,
          "sectionTitle": "提升：至少、至多与恰好分别处理"
        },
        {
          "lessonId": "detail-boundaries",
          "sectionIndex": 7,
          "sectionTitle": "提升：量词放在哪个对象前很重要"
        },
        {
          "lessonId": "detail-boundaries",
          "sectionIndex": 8,
          "sectionTitle": "提升：把未知、矛盾和可能分开复盘"
        },
        {
          "lessonId": "detail-reading",
          "sectionIndex": 8,
          "sectionTitle": "提升：用最少补充检验推断"
        }
      ],
      "editorial": true
    }
  ],
  "cohesion": [
    {
      "id": "cohesion-recall-1",
      "part": 0,
      "title": "排序先建关系",
      "quizTitle": "要点回忆 1",
      "core": "按句子功能寻找**指代、时序、条件与转折**，先排明确冲突，再通读完整候选。",
      "boundary": "同词重复不保证相邻；先后箭头只约束位置，不自动捆绑两句。",
      "prompt": "排序中确定A在B之前，不等于确定二者{{0}}。",
      "blanks": [
        {
          "answer": "相邻",
          "accept": [
            "紧邻",
            "紧挨"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "sentence-order",
          "sectionIndex": 0,
          "sectionTitle": "入门：每句话在文段中承担什么任务"
        },
        {
          "lessonId": "sentence-order",
          "sectionIndex": 1,
          "sectionTitle": "入门：优先找明确的时间与指代"
        },
        {
          "lessonId": "sentence-order",
          "sectionIndex": 4,
          "sectionTitle": "巩固：选项分歧处逐条验证"
        },
        {
          "lessonId": "sentence-order",
          "sectionIndex": 6,
          "sectionTitle": "提升：先后关系不等于相邻关系"
        }
      ],
      "editorial": true
    },
    {
      "id": "cohesion-recall-2",
      "part": 0,
      "title": "填句双向约束",
      "quizTitle": "要点回忆 2",
      "core": "先预测空缺功能；**空前空后都有文本时，须同时满足两侧约束**，并保持全文话题。",
      "boundary": "首尾空依据实际可用语境判断；段落位置不决定固定功能，局部顺口不足以证明全段连贯。",
      "prompt": "空前空后都有文本时，补句既要回应{{0}}，又要衔接{{1}}。",
      "blanks": [
        {
          "answer": "上文",
          "accept": [
            "前文"
          ]
        },
        {
          "answer": "下文",
          "accept": [
            "后文"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "sentence-link",
          "sectionIndex": 0,
          "sectionTitle": "入门：空缺句要完成什么任务"
        },
        {
          "lessonId": "sentence-link",
          "sectionIndex": 1,
          "sectionTitle": "入门：前文与后文各给一条约束"
        },
        {
          "lessonId": "sentence-link",
          "sectionIndex": 3,
          "sectionTitle": "巩固：双向约束四步法"
        },
        {
          "lessonId": "cohesion-reference",
          "sectionIndex": 3,
          "sectionTitle": "巩固：对空缺同时提出两条要求"
        }
      ],
      "editorial": true
    },
    {
      "id": "cohesion-recall-3",
      "part": 0,
      "title": "指代与逻辑有依据",
      "quizTitle": "要点回忆 3",
      "core": "指代替换后检查主体、数量与动作；因果和转折须由内容支持，并保留**状态、范围和证据强度**。",
      "boundary": "最近名词未必是指代对象；不能补造事实把断裂硬连起来。",
      "prompt": "指代判断不能只看名词{{0}}；计划也不能被补句改成{{1}}。",
      "blanks": [
        {
          "answer": "距离",
          "accept": [
            "远近"
          ]
        },
        {
          "answer": "已实施",
          "accept": [
            "已经实施",
            "已完成"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "cohesion-reference",
          "sectionIndex": 0,
          "sectionTitle": "入门：指代要能回到具体内容"
        },
        {
          "lessonId": "cohesion-reference",
          "sectionIndex": 4,
          "sectionTitle": "巩固：整句代入后检查话题与状态"
        },
        {
          "lessonId": "sentence-link",
          "sectionIndex": 5,
          "sectionTitle": "巩固：转折与因果都要有内容"
        },
        {
          "lessonId": "sentence-link",
          "sectionIndex": 6,
          "sectionTitle": "提升：补足衔接不等于补造事实"
        }
      ],
      "editorial": true
    },
    {
      "id": "cohesion-recall-4",
      "part": 0,
      "title": "下文承接当前任务",
      "quizTitle": "要点回忆 4",
      "core": "列出已说明与待说明的内容，优先兑现**最新明确的未完成任务**，区分当前步骤与最终目标。",
      "boundary": "提及不等于展开；调整后的安排需重新核验；最贴切不等于预言原作者唯一原文。",
      "prompt": "下文线索来自尚未完成的{{0}}，不是尾句最后一个名词。",
      "blanks": [
        {
          "answer": "任务",
          "accept": [
            "论述任务"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "next-paragraph",
          "sectionIndex": 0,
          "sectionTitle": "入门：推断的是衔接，不是预言原文"
        },
        {
          "lessonId": "next-paragraph",
          "sectionIndex": 1,
          "sectionTitle": "入门：把明示的未完成任务圈出来"
        },
        {
          "lessonId": "next-paragraph",
          "sectionIndex": 2,
          "sectionTitle": "入门：提到名称，不等于完成说明"
        },
        {
          "lessonId": "next-paragraph",
          "sectionIndex": 4,
          "sectionTitle": "巩固：紧接的一步与最终目的分开"
        },
        {
          "lessonId": "next-paragraph",
          "sectionIndex": 5,
          "sectionTitle": "巩固：后续安排改变时重新检查有效线索"
        },
        {
          "lessonId": "next-paragraph",
          "sectionIndex": 7,
          "sectionTitle": "提升：线索不足时不凭偏好强分"
        }
      ],
      "editorial": true
    }
  ],
  "long-reading": [
    {
      "id": "long-reading-recall-1",
      "part": 0,
      "title": "建立全文任务图",
      "quizTitle": "要点回忆 1",
      "core": "为各段标功能，区分作者立场、他人引语、现象与限制，中心应解释**主要段落为何组合**。",
      "boundary": "首段被反驳的方案不是作者中心；总体变化不等于所有部分变化。",
      "prompt": "长文先给每段标{{0}}，引用他人意见不能直接认作作者{{1}}。",
      "blanks": [
        {
          "answer": "功能",
          "accept": [
            "作用",
            "任务"
          ]
        },
        {
          "answer": "立场",
          "accept": [
            "观点"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "fq-multi-paragraph",
          "sectionIndex": 0,
          "sectionTitle": "识别：先给每段标任务"
        },
        {
          "lessonId": "fq-multi-paragraph",
          "sectionIndex": 1,
          "sectionTitle": "识别：总量与细分信息分开"
        },
        {
          "lessonId": "on-source-reading",
          "sectionIndex": 0,
          "sectionTitle": "先认文本的身份"
        },
        {
          "lessonId": "t35-context-reading",
          "sectionIndex": 0,
          "sectionTitle": "识别：先给全文写一句任务"
        }
      ],
      "editorial": true
    },
    {
      "id": "long-reading-recall-2",
      "part": 0,
      "title": "跨段逐项定位",
      "quizTitle": "要点回忆 2",
      "core": "把选项和新情境拆成多个主张，分别寻找**对应证据**；指代兼看前后，例子须回到所支持的观点。",
      "boundary": "一个动作符合，不能掩盖同一方案另一动作越界。",
      "prompt": "复合方案须{{0}}核对，不能凭一处正确判整体正确。",
      "blanks": [
        {
          "answer": "逐项",
          "accept": [
            "逐一",
            "逐条"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "fq-multi-paragraph",
          "sectionIndex": 3,
          "sectionTitle": "迁移：跨段为选项找证据"
        },
        {
          "lessonId": "fq-multi-paragraph",
          "sectionIndex": 4,
          "sectionTitle": "迁移：指代要看前后共同限制"
        },
        {
          "lessonId": "t35-context-reading",
          "sectionIndex": 3,
          "sectionTitle": "迁移：例子在支持哪一步"
        },
        {
          "lessonId": "t35-context-reading",
          "sectionIndex": 4,
          "sectionTitle": "迁移：把新方案逐项接回原文"
        }
      ],
      "editorial": true
    },
    {
      "id": "long-reading-recall-3",
      "part": 0,
      "title": "跨来源先对齐",
      "quizTitle": "要点回忆 3",
      "core": "核对主体、对象、时期和评价标准，再看是否实质矛盾；共同立场必须获**双方支持**，版本判断要回到事件当时状态。",
      "boundary": "今天状态不能替代过去；留存母版不能证明所有具体解说可靠。",
      "prompt": "比较来源先统一{{0}}；共同立场必须获得{{1}}支持。",
      "blanks": [
        {
          "answer": "口径",
          "accept": []
        },
        {
          "answer": "双方",
          "accept": [
            "两方",
            "两份材料"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "on-source-reading",
          "sectionIndex": 1,
          "sectionTitle": "分歧先看是否在回答同一问题"
        },
        {
          "lessonId": "on-source-reading",
          "sectionIndex": 2,
          "sectionTitle": "保留限定再概括共同立场"
        },
        {
          "lessonId": "on-source-reading",
          "sectionIndex": 4,
          "sectionTitle": "为具体解说选择对应证据"
        },
        {
          "lessonId": "on-source-reading",
          "sectionIndex": 5,
          "sectionTitle": "版本判断用事件时点与对象状态"
        }
      ],
      "editorial": true
    },
    {
      "id": "long-reading-recall-4",
      "part": 0,
      "title": "区分证据层级",
      "quizTitle": "要点回忆 4",
      "core": "认可、实施与效果分别取证，计划、观察与因果分层判断；标题与下文也须保留**范围和待完成任务**。",
      "boundary": "样品通过不等于全体通过；缺效果证据也不等于全部失败。",
      "prompt": "认可方案不能替代实施记录，实施记录也不自动证明{{0}}。",
      "blanks": [
        {
          "answer": "效果",
          "accept": [
            "成效"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "on-source-reading",
          "sectionIndex": 6,
          "sectionTitle": "把认可、实施和效果分三层"
        },
        {
          "lessonId": "on-source-reading",
          "sectionIndex": 7,
          "sectionTitle": "允许材料有限而结论也有限"
        },
        {
          "lessonId": "fq-multi-paragraph",
          "sectionIndex": 6,
          "sectionTitle": "边界：观察与因果证明不同"
        },
        {
          "lessonId": "fq-multi-paragraph",
          "sectionIndex": 7,
          "sectionTitle": "边界：标题不能偷换结论强度"
        },
        {
          "lessonId": "t35-context-reading",
          "sectionIndex": 5,
          "sectionTitle": "迁移：跨段对应要保留任务顺序"
        },
        {
          "lessonId": "t35-context-reading",
          "sectionIndex": 6,
          "sectionTitle": "边界：样品与全体不能直接互换"
        }
      ],
      "editorial": true
    }
  ],
  "evidence-revision": [
    {
      "id": "evidence-revision-recall-1",
      "part": 0,
      "title": "明确任务与材料身份",
      "quizTitle": "要点回忆 1",
      "core": "先圈范围、对象、输出动作和限制，再分**事实、看法、建议及时间状态**。同一事实随设问改变用途。",
      "boundary": "引语不自动代表全体；申请转交不等于获准解决。",
      "prompt": "取证先明确题目{{0}}；动作还要标明{{1}}。",
      "blanks": [
        {
          "answer": "任务",
          "accept": []
        },
        {
          "answer": "状态",
          "accept": [
            "时间状态"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "material-mapping",
          "sectionIndex": 0,
          "sectionTitle": "小白：先把题目改写成一句任务"
        },
        {
          "lessonId": "material-mapping",
          "sectionIndex": 1,
          "sectionTitle": "小白：事实、看法和建议先分开"
        },
        {
          "lessonId": "material-mapping",
          "sectionIndex": 2,
          "sectionTitle": "小白：给动作加上时间状态"
        },
        {
          "lessonId": "material-mapping",
          "sectionIndex": 8,
          "sectionTitle": "提高：换一个设问，重新选择证据"
        }
      ],
      "editorial": true
    },
    {
      "id": "evidence-revision-recall-2",
      "part": 0,
      "title": "从事实搭建要点",
      "quizTitle": "要点回忆 2",
      "core": "把拟写要点接回具体材料，按**共同问题和作用**归类，保留对象、动作与限制。",
      "boundary": "同词未必同类；同一动作不能换词重复计点，宏大标签不能替代关系。",
      "prompt": "归类应看共同问题和{{0}}，不只看相同词。",
      "blanks": [
        {
          "answer": "作用",
          "accept": [
            "功能"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "material-mapping",
          "sectionIndex": 3,
          "sectionTitle": "基础：把每条要点接到具体证据"
        },
        {
          "lessonId": "material-mapping",
          "sectionIndex": 4,
          "sectionTitle": "基础：归类看同一问题，不只看相同词"
        },
        {
          "lessonId": "material-mapping",
          "sectionIndex": 7,
          "sectionTitle": "提高：从细节到概括，中间要有关系"
        }
      ],
      "editorial": true
    },
    {
      "id": "evidence-revision-recall-3",
      "part": 0,
      "title": "核查冲突和归因",
      "quizTitle": "要点回忆 3",
      "core": "不同说法先核对象、时间、渠道、口径；变化与解释分开，**证据不足时缩小判断**。",
      "boundary": "相邻发生不必然有因果；效果未证实不等于无效。",
      "prompt": "材料分歧先对齐{{0}}；同期变化不能直接写成{{1}}。",
      "blanks": [
        {
          "answer": "口径",
          "accept": []
        },
        {
          "answer": "因果",
          "accept": [
            "因果关系"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "material-mapping",
          "sectionIndex": 5,
          "sectionTitle": "基础：相邻发生不自动形成因果"
        },
        {
          "lessonId": "material-mapping",
          "sectionIndex": 6,
          "sectionTitle": "提高：不同说法并存，先检查观察范围"
        },
        {
          "lessonId": "answer-revision",
          "sectionIndex": 7,
          "sectionTitle": "提高：不能靠修辞填补缺失证据"
        }
      ],
      "editorial": true
    },
    {
      "id": "evidence-revision-recall-4",
      "part": 0,
      "title": "二稿先保真再压缩",
      "quizTitle": "要点回忆 4",
      "core": "区分改错、补漏与另提建议；统一并列层级，删重复不删条件，核最强承诺与权限，记录**原句—问题—改句—依据**。",
      "boundary": "修改不是照搬参考；具体化不能靠虚构强制措施，练习自查不能换算考试分数。",
      "prompt": "压缩优先删重复，不能先删必要{{0}}。",
      "blanks": [
        {
          "answer": "条件",
          "accept": [
            "限制条件"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "answer-revision",
          "sectionIndex": 0,
          "sectionTitle": "小白：修改先保真，再求好听"
        },
        {
          "lessonId": "answer-revision",
          "sectionIndex": 2,
          "sectionTitle": "小白：区分改错、补漏和另提建议"
        },
        {
          "lessonId": "answer-revision",
          "sectionIndex": 3,
          "sectionTitle": "基础：按同一层级安排并列要点"
        },
        {
          "lessonId": "answer-revision",
          "sectionIndex": 4,
          "sectionTitle": "基础：删字时先删重复，不先删条件"
        },
        {
          "lessonId": "answer-revision",
          "sectionIndex": 5,
          "sectionTitle": "基础：对策补执行关系，不乱补强制手段"
        },
        {
          "lessonId": "answer-revision",
          "sectionIndex": 6,
          "sectionTitle": "提高：改写后再测一句最强承诺"
        },
        {
          "lessonId": "answer-revision",
          "sectionIndex": 8,
          "sectionTitle": "提高：保留修改理由，再做迁移检查"
        }
      ],
      "editorial": true
    }
  ],
  "summary-topic": [
    {
      "id": "summary-topic-recall-1",
      "part": 0,
      "title": "按设问选择信息",
      "quizTitle": "要点回忆 1",
      "core": "概括先定**对象、范围、内容类型与状态**。问做法取行动，问问题取缺口，问成效取已确认变化。",
      "boundary": "不能把整篇缩写，也不能把拟议和建议当已做措施。",
      "prompt": "问做法找{{0}}，问成效找已确认的{{1}}。",
      "blanks": [
        {
          "answer": "行动",
          "accept": [
            "措施",
            "做法"
          ]
        },
        {
          "answer": "变化",
          "accept": [
            "结果",
            "成效"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "summary",
          "sectionIndex": 0,
          "sectionTitle": "入门：先把问题翻译成找什么"
        },
        {
          "lessonId": "summary-evidence",
          "sectionIndex": 0,
          "sectionTitle": "先把设问拆成三个限制"
        },
        {
          "lessonId": "summary-evidence",
          "sectionIndex": 1,
          "sectionTitle": "例解：先区分事实的状态"
        }
      ],
      "editorial": true
    },
    {
      "id": "summary-topic-recall-2",
      "part": 0,
      "title": "归类保留区分度",
      "quizTitle": "要点回忆 2",
      "core": "以共同对象、作用或环节归并，写出**对象＋核心动作或问题＋必要条件**，条数随信息关系确定。",
      "boundary": "只剩加强管理之类口号会丢细节；不同机制不能硬并，同一事实不能重复计点。",
      "prompt": "要点条数应由{{0}}决定，不是固定模板。",
      "blanks": [
        {
          "answer": "信息关系",
          "accept": [
            "材料信息关系"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "summary",
          "sectionIndex": 1,
          "sectionTitle": "入门：从具体事实写出一个要点"
        },
        {
          "lessonId": "summary",
          "sectionIndex": 3,
          "sectionTitle": "巩固：先归类，再决定条数"
        },
        {
          "lessonId": "summary",
          "sectionIndex": 4,
          "sectionTitle": "巩固：用一张事实表压缩答案"
        },
        {
          "lessonId": "summary-evidence",
          "sectionIndex": 2,
          "sectionTitle": "例解：从材料句归成三个要点"
        },
        {
          "lessonId": "summary-evidence",
          "sectionIndex": 6,
          "sectionTitle": "交卷前逐条回到证据"
        }
      ],
      "editorial": true
    },
    {
      "id": "summary-topic-recall-3",
      "part": 0,
      "title": "长材料跟踪变化",
      "quizTitle": "要点回忆 3",
      "core": "做简短段落索引，同一事项沿**时间轴**更新状态；分歧先对齐对象、时点、渠道与口径，结论不越过证据范围。",
      "boundary": "后文修正甲不能顺便修正乙；没有新投诉不等于没有困难。",
      "prompt": "判断当前问题须沿{{0}}检查；比较数字先核{{1}}。",
      "blanks": [
        {
          "answer": "时间轴",
          "accept": [
            "时间线"
          ]
        },
        {
          "answer": "口径",
          "accept": [
            "统计口径"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "multi-material",
          "sectionIndex": 0,
          "sectionTitle": "小白：把一摞材料先分成任务和证据"
        },
        {
          "lessonId": "multi-material",
          "sectionIndex": 1,
          "sectionTitle": "小白：索引只记能帮你回去的线索"
        },
        {
          "lessonId": "multi-material",
          "sectionIndex": 2,
          "sectionTitle": "小白：同一事项要沿时间往后读"
        },
        {
          "lessonId": "multi-material",
          "sectionIndex": 4,
          "sectionTitle": "基础：把表面冲突变成可核对的问题"
        },
        {
          "lessonId": "multi-material",
          "sectionIndex": 6,
          "sectionTitle": "提高：在多条证据间辨清能支持多大的判断"
        }
      ],
      "editorial": true
    },
    {
      "id": "summary-topic-recall-4",
      "part": 0,
      "title": "双向复核答案",
      "quizTitle": "要点回忆 4",
      "core": "从答案回材料查出处，从相关材料回答案查覆盖，再查**重复与答非所问**；待核事项按对后续判断的影响排序。",
      "boundary": "换设问必须重新取舍；参考分类不唯一，自查不是官方采分表。",
      "prompt": "答案与材料应作{{0}}检查，同时防漏项与越界。",
      "blanks": [
        {
          "answer": "双向",
          "accept": [
            "双向核对"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "summary",
          "sectionIndex": 5,
          "sectionTitle": "巩固：完整答案检查三种遗漏"
        },
        {
          "lessonId": "summary",
          "sectionIndex": 8,
          "sectionTitle": "提升：复盘从漏点走向分类质量"
        },
        {
          "lessonId": "multi-material",
          "sectionIndex": 5,
          "sectionTitle": "基础：换设问，重排同一组证据"
        },
        {
          "lessonId": "multi-material",
          "sectionIndex": 7,
          "sectionTitle": "提高：安排核查先后，看它会改变什么决定"
        },
        {
          "lessonId": "multi-material",
          "sectionIndex": 8,
          "sectionTitle": "提高：交卷前做两条方向相反的检查"
        }
      ],
      "editorial": true
    }
  ],
  "comparison-writing": [
    {
      "id": "comparison-writing-recall-1",
      "part": 0,
      "title": "在同一维度对照",
      "quizTitle": "要点回忆 1",
      "core": "先辨共同点、差异、评价或适用性任务，以**相同问题询问双方**，共同点合写，差异对应写。",
      "boundary": "不能一边写时间、一边写态度，分别摘要不等于比较。",
      "prompt": "比较双方必须使用相同{{0}}。",
      "blanks": [
        {
          "answer": "维度",
          "accept": [
            "比较维度"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "compare-materials",
          "sectionIndex": 0,
          "sectionTitle": "先辨任务，再建立相同维度"
        },
        {
          "lessonId": "compare-materials",
          "sectionIndex": 2,
          "sectionTitle": "例解：用同一顺序写差异"
        },
        {
          "lessonId": "compare-materials",
          "sectionIndex": 3,
          "sectionTitle": "例解：共同点合写，差异对应写"
        },
        {
          "lessonId": "compare-transfer-writing",
          "sectionIndex": 1,
          "sectionTitle": "入门：用同一问题询问两边"
        }
      ],
      "editorial": true
    },
    {
      "id": "comparison-writing-recall-2",
      "part": 0,
      "title": "解释机制与条件",
      "quizTitle": "要点回忆 2",
      "core": "评价比罗列差异多一步：说明各安排怎样回应共同目标，并保留**需求与参与条件**。",
      "boundary": "不同不自动代表优劣；组合需解释如何转接，不能默认人人都用同一方案。",
      "prompt": "分析要说明作用{{0}}及适用{{1}}。",
      "blanks": [
        {
          "answer": "机制",
          "accept": [
            "作用机制"
          ]
        },
        {
          "answer": "条件",
          "accept": [
            "限制条件"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "compare-materials",
          "sectionIndex": 5,
          "sectionTitle": "题目问适用性时，再解释条件"
        },
        {
          "lessonId": "compare-transfer-writing",
          "sectionIndex": 3,
          "sectionTitle": "巩固：事实后面要有作用解释"
        },
        {
          "lessonId": "compare-transfer-writing",
          "sectionIndex": 4,
          "sectionTitle": "巩固：评价全称判断要回应它的范围"
        }
      ],
      "editorial": true
    },
    {
      "id": "comparison-writing-recall-3",
      "part": 0,
      "title": "证据与口径不越界",
      "quizTitle": "要点回忆 3",
      "core": "未提及保留未知；人次、人数、家数须对齐，交叉参与不能直接相加，**过程记录不等于成效**。",
      "boundary": "没有成本效果资料不能凭常识排优劣；记录有限也不能宣布无效。",
      "prompt": "一方未说明不等于{{0}}；有回访记录不等于已证明{{1}}。",
      "blanks": [
        {
          "answer": "没有",
          "accept": [
            "不存在"
          ]
        },
        {
          "answer": "成效",
          "accept": [
            "效果"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "compare-materials",
          "sectionIndex": 4,
          "sectionTitle": "改错：不把未提到写成没有"
        },
        {
          "lessonId": "compare-materials",
          "sectionIndex": 6,
          "sectionTitle": "压缩前检查三种遗漏"
        },
        {
          "lessonId": "compare-transfer-writing",
          "sectionIndex": 5,
          "sectionTitle": "巩固：不把统计口径变成效果排名"
        }
      ],
      "editorial": true
    },
    {
      "id": "comparison-writing-recall-4",
      "part": 0,
      "title": "迁移保机制再核资源",
      "quizTitle": "要点回忆 4",
      "core": "区分可迁移的**作用机制**与依赖人员、距离、场地的外形；扩展前核需求、工时与反馈，再修最影响判断的句子。",
      "boundary": "信息不足不能承诺全覆盖，也不能反向断言绝对做不完。",
      "prompt": "借鉴经验时，可迁移{{0}}，实施外形须重新核实条件。",
      "blanks": [
        {
          "answer": "机制",
          "accept": [
            "作用机制"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "compare-transfer-writing",
          "sectionIndex": 6,
          "sectionTitle": "提升：把可迁移机制与实施外形拆开"
        },
        {
          "lessonId": "compare-transfer-writing",
          "sectionIndex": 7,
          "sectionTitle": "提升：把判断依据接到资源约束"
        },
        {
          "lessonId": "compare-transfer-writing",
          "sectionIndex": 8,
          "sectionTitle": "提升：二稿只修最影响判断的一处"
        }
      ],
      "editorial": true
    }
  ],
  "explanation-writing": [
    {
      "id": "explanation-writing-recall-1",
      "part": 0,
      "title": "先辨所需分析动作",
      "quizTitle": "要点回忆 1",
      "core": "解释要还原词句具体含义，评价要给判断及理由，比较要同维度对照；**结构服从设问**。",
      "boundary": "不能见综合分析就套含义、意义、对策三段，也不能用建议挤掉解释。",
      "prompt": "解释先还原{{0}}，评价还须给判断与{{1}}。",
      "blanks": [
        {
          "answer": "含义",
          "accept": [
            "意思",
            "语义"
          ]
        },
        {
          "answer": "理由",
          "accept": [
            "依据"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "analysis-writing",
          "sectionIndex": 0,
          "sectionTitle": "入门：先辨认分析任务"
        },
        {
          "lessonId": "explain-in-context",
          "sectionIndex": 0,
          "sectionTitle": "先把一句话还原成材料中的问题"
        },
        {
          "lessonId": "explain-in-context",
          "sectionIndex": 5,
          "sectionTitle": "是否提出做法，回到题目要求"
        }
      ],
      "editorial": true
    },
    {
      "id": "explanation-writing-recall-2",
      "part": 0,
      "title": "把抽象含义落到行动",
      "quizTitle": "要点回忆 2",
      "core": "将关键词分别对应材料对象与动作，接上**事实—作用机制—原话关系**，说明为何这样做有用。",
      "boundary": "改清说明不等于取消规则；同义扩写或罗列事实都不能代替分析。",
      "prompt": "事实之后补充它起作用的{{0}}，才能构成分析。",
      "blanks": [
        {
          "answer": "机制",
          "accept": [
            "作用机制"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "analysis-writing",
          "sectionIndex": 1,
          "sectionTitle": "入门：把抽象说法换成材料中的关系"
        },
        {
          "lessonId": "analysis-writing",
          "sectionIndex": 2,
          "sectionTitle": "入门：一条依据后面补一句分析"
        },
        {
          "lessonId": "analysis-writing",
          "sectionIndex": 5,
          "sectionTitle": "巩固：从现象追问到机制"
        },
        {
          "lessonId": "explain-in-context",
          "sectionIndex": 1,
          "sectionTitle": "例解：把两个关键词分别落地"
        },
        {
          "lessonId": "explain-in-context",
          "sectionIndex": 2,
          "sectionTitle": "例解：说明为什么表达改变有用"
        },
        {
          "lessonId": "explain-in-context",
          "sectionIndex": 4,
          "sectionTitle": "改错：别把便民偷换成放宽条件"
        }
      ],
      "editorial": true
    },
    {
      "id": "explanation-writing-recall-3",
      "part": 0,
      "title": "判断与证据同强度",
      "quizTitle": "要点回忆 3",
      "core": "肯定已支持作用，保留尚未证明效果；区分观察与原因，检查**替代解释**，不为辩证硬造缺点。",
      "boundary": "人数减少未必由流程改善导致；因果未证实也不等于措施无效。",
      "prompt": "评价的强度应匹配{{0}}，归因前需检查其他{{1}}。",
      "blanks": [
        {
          "answer": "证据",
          "accept": [
            "依据"
          ]
        },
        {
          "answer": "解释",
          "accept": [
            "原因",
            "替代解释"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "analysis-writing",
          "sectionIndex": 3,
          "sectionTitle": "巩固：判断必须和证据匹配"
        },
        {
          "lessonId": "analysis-writing",
          "sectionIndex": 6,
          "sectionTitle": "提升：检验一个结果的多种解释"
        }
      ],
      "editorial": true
    },
    {
      "id": "explanation-writing-recall-4",
      "part": 0,
      "title": "在条件中收束结论",
      "quizTitle": "要点回忆 4",
      "core": "把价值目标与人员、权限等操作条件一并说明，回应特殊情形，最后**回扣所问观点**。",
      "boundary": "兼顾需说明如何实现；结尾不再加入未论证的新判断。",
      "prompt": "结尾应回扣{{0}}，而非另开新题。",
      "blanks": [
        {
          "answer": "设问",
          "accept": [
            "题目",
            "所问观点"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "analysis-writing",
          "sectionIndex": 4,
          "sectionTitle": "巩固：用同一维度比较两种安排"
        },
        {
          "lessonId": "analysis-writing",
          "sectionIndex": 7,
          "sectionTitle": "提升：把价值目标与操作条件同时写清"
        },
        {
          "lessonId": "analysis-writing",
          "sectionIndex": 8,
          "sectionTitle": "提升：收束时回答题目而非再开新题"
        },
        {
          "lessonId": "explain-in-context",
          "sectionIndex": 6,
          "sectionTitle": "用三个问题核对解释是否完整"
        }
      ],
      "editorial": true
    }
  ],
  "proposal-writing": [
    {
      "id": "proposal-writing-recall-1",
      "part": 0,
      "title": "问题与措施逐项对应",
      "quizTitle": "要点回忆 1",
      "core": "先明确谁在何环节遇到障碍，寻找可改变原因，再写**对应动作**；分清既有办法与拟议建议。",
      "boundary": "所有问题不能合成加强宣传；借用他处做法还要核对象与条件。",
      "prompt": "每项措施都应对应一个具体{{0}}，并针对可改变的{{1}}。",
      "blanks": [
        {
          "answer": "问题",
          "accept": [
            "障碍",
            "缺口"
          ]
        },
        {
          "answer": "原因",
          "accept": [
            "成因"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "proposal",
          "sectionIndex": 0,
          "sectionTitle": "入门：对策先有对应问题"
        },
        {
          "lessonId": "proposal",
          "sectionIndex": 1,
          "sectionTitle": "入门：区分已有办法与自己的建议"
        },
        {
          "lessonId": "action-design",
          "sectionIndex": 0,
          "sectionTitle": "把问题改写成需要完成的动作"
        },
        {
          "lessonId": "action-design",
          "sectionIndex": 2,
          "sectionTitle": "例解：逐项建立问题与措施的对应"
        }
      ],
      "editorial": true
    },
    {
      "id": "proposal-writing-recall-2",
      "part": 0,
      "title": "补齐执行的关键环节",
      "quizTitle": "要点回忆 2",
      "core": "写清必要的主体、动作、对象和方式，安排确认、交接与告知；**具体到足以落实**，不为形式堆栏位。",
      "boundary": "缺岗需考虑替补；材料没给部门、预算与电话，不擅自编造。",
      "prompt": "措施具体化要补会影响{{0}}的关键条件。",
      "blanks": [
        {
          "answer": "落实",
          "accept": [
            "执行",
            "实施"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "proposal",
          "sectionIndex": 2,
          "sectionTitle": "入门：让一条措施可以被理解"
        },
        {
          "lessonId": "proposal",
          "sectionIndex": 3,
          "sectionTitle": "巩固：从原因到实施步骤"
        },
        {
          "lessonId": "action-design",
          "sectionIndex": 2,
          "sectionTitle": "例解：逐项建立问题与措施的对应"
        },
        {
          "lessonId": "action-design",
          "sectionIndex": 3,
          "sectionTitle": "例解：从对应表压成答案"
        }
      ],
      "editorial": true
    },
    {
      "id": "proposal-writing-recall-3",
      "part": 0,
      "title": "资源与权限进入方案",
      "quizTitle": "要点回忆 3",
      "core": "核查人员、设备、时间、收费与权限，区分**立即可做、需协商和待批准**；冲突中保留必要规则与求助通道。",
      "boundary": "降低风险不是保证零风险；不通过新增收费或处罚绕过题设限制。",
      "prompt": "涉及跨方承诺应说明怎样{{0}}，需要上级批准则写明怎样{{1}}，不能直接写成立即命令。",
      "blanks": [
        {
          "answer": "协商",
          "accept": [
            "沟通协商"
          ]
        },
        {
          "answer": "报批",
          "accept": [
            "申请批准",
            "报请批准"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "proposal",
          "sectionIndex": 4,
          "sectionTitle": "巩固：把资源约束写进方案"
        },
        {
          "lessonId": "proposal",
          "sectionIndex": 6,
          "sectionTitle": "提升：权衡冲突而非只保留一方"
        },
        {
          "lessonId": "proposal",
          "sectionIndex": 7,
          "sectionTitle": "提升：区分立即可做与待批准事项"
        },
        {
          "lessonId": "action-design",
          "sectionIndex": 1,
          "sectionTitle": "例解：小剧场材料给了哪些限制"
        },
        {
          "lessonId": "action-design",
          "sectionIndex": 4,
          "sectionTitle": "改错：把空泛、越权和保证结果分开"
        }
      ],
      "editorial": true
    },
    {
      "id": "proposal-writing-recall-4",
      "part": 0,
      "title": "反馈用于下一步调整",
      "quizTitle": "要点回忆 4",
      "core": "明确记录什么、谁复核、怎样更正和告知，**以反馈决定继续、调整或停止**；最后逐项反查依据与可行性。",
      "boundary": "不机械增加层层报表，不编造满意率，也不拿反馈作口号式结尾。",
      "prompt": "收集反馈是为了发现问题并作后续{{0}}。",
      "blanks": [
        {
          "answer": "调整",
          "accept": [
            "改进",
            "决策"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "proposal",
          "sectionIndex": 5,
          "sectionTitle": "巩固：用反馈形成后续行动"
        },
        {
          "lessonId": "proposal",
          "sectionIndex": 7,
          "sectionTitle": "提升：区分立即可做与待批准事项"
        },
        {
          "lessonId": "proposal",
          "sectionIndex": 8,
          "sectionTitle": "提升：逐项做可行性反查"
        },
        {
          "lessonId": "action-design",
          "sectionIndex": 5,
          "sectionTitle": "反馈要说明记录什么、用来做什么"
        },
        {
          "lessonId": "action-design",
          "sectionIndex": 6,
          "sectionTitle": "用四问检查可操作性"
        }
      ],
      "editorial": true
    }
  ],
  "document-writing": [
    {
      "id": "document-writing-recall-1",
      "part": 0,
      "title": "以读者任务确定文稿",
      "quizTitle": "要点回忆 1",
      "core": "先定**身份、受众、目的、文种与范围**。不同读者需要不同信息，同一材料不能只换标题复用。",
      "boundary": "应用写作不全是法定公文，倡议不能擅自改为强制义务。",
      "prompt": "文稿先明确“谁写”即写作{{0}}，“给谁看”即{{1}}，再决定内容语气。",
      "blanks": [
        {
          "answer": "身份",
          "accept": [
            "角色"
          ]
        },
        {
          "answer": "受众",
          "accept": [
            "读者",
            "对象"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "document",
          "sectionIndex": 0,
          "sectionTitle": "入门：先确定为谁写、让谁做什么"
        },
        {
          "lessonId": "document",
          "sectionIndex": 3,
          "sectionTitle": "巩固：不同文种承担不同任务"
        },
        {
          "lessonId": "audience-writing",
          "sectionIndex": 0,
          "sectionTitle": "先确定谁写、给谁看、要对方做什么"
        },
        {
          "lessonId": "audience-writing",
          "sectionIndex": 5,
          "sectionTitle": "文种改变，重点也随之改变"
        }
      ],
      "editorial": true
    },
    {
      "id": "document-writing-recall-2",
      "part": 0,
      "title": "按行动顺序组织",
      "quizTitle": "要点回忆 2",
      "core": "按读者行动顺序组织；**活动调整说明**可先交代变化，再写何时何地、资格准备与求助，保留未变事项，并将术语转为易懂表达。",
      "boundary": "具体顺序随文种与任务调整；简明不能省掉必要条件，地点调整不等于活动取消。",
      "prompt": "调整说明既要写清变化，也要保留{{0}}事项。",
      "blanks": [
        {
          "answer": "未变",
          "accept": [
            "不变",
            "未改变"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "document",
          "sectionIndex": 1,
          "sectionTitle": "入门：内容顺序跟随使用者任务"
        },
        {
          "lessonId": "document",
          "sectionIndex": 2,
          "sectionTitle": "入门：解释清楚，少用内部简称"
        },
        {
          "lessonId": "document",
          "sectionIndex": 5,
          "sectionTitle": "巩固：形成可执行的文稿"
        },
        {
          "lessonId": "audience-writing",
          "sectionIndex": 1,
          "sectionTitle": "例解：把材料分成变化与未变事项"
        },
        {
          "lessonId": "audience-writing",
          "sectionIndex": 2,
          "sectionTitle": "例解：按读者行动顺序安排信息"
        },
        {
          "lessonId": "audience-writing",
          "sectionIndex": 6,
          "sectionTitle": "最后按读者的四个问题核对"
        }
      ],
      "editorial": true
    },
    {
      "id": "document-writing-recall-3",
      "part": 0,
      "title": "状态与承诺守边界",
      "quizTitle": "要点回忆 3",
      "core": "区分已更正、处理中和待决定，给出可用后续渠道；更正说明需指出**错在哪里、正确条件与下一步**。",
      "boundary": "礼貌不能代替事实；无决定权不作承诺，缺电话日期不为排版补造。",
      "prompt": "拟议不能写成{{0}}；缺失信息不能靠{{1}}补齐。",
      "blanks": [
        {
          "answer": "已生效",
          "accept": [
            "已经生效"
          ]
        },
        {
          "answer": "编造",
          "accept": [
            "虚构"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "document",
          "sectionIndex": 5,
          "sectionTitle": "巩固：形成可执行的文稿"
        },
        {
          "lessonId": "document",
          "sectionIndex": 6,
          "sectionTitle": "提升：一份文稿处理多方约束"
        },
        {
          "lessonId": "document",
          "sectionIndex": 7,
          "sectionTitle": "提升：更正说明要能消除原误解"
        },
        {
          "lessonId": "audience-writing",
          "sectionIndex": 4,
          "sectionTitle": "改错：删套话时保留行动信息"
        }
      ],
      "editorial": true
    },
    {
      "id": "document-writing-recall-4",
      "part": 0,
      "title": "内容与形式分轮核对",
      "quizTitle": "要点回忆 4",
      "core": "先模拟读者能否行动，检查事实、主要事项与承诺，再核结构、称谓、落款和字数，做到**内容优先、形式按题设**。",
      "boundary": "格式整齐不能补救答非所问；不同文种不强套同一外形。",
      "prompt": "校对先查{{0}}，再查格式。",
      "blanks": [
        {
          "answer": "内容",
          "accept": [
            "事实与内容"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "document",
          "sectionIndex": 8,
          "sectionTitle": "提升：内容与格式分别校对"
        },
        {
          "lessonId": "document",
          "sectionIndex": 3,
          "sectionTitle": "巩固：不同文种承担不同任务"
        },
        {
          "lessonId": "audience-writing",
          "sectionIndex": 0,
          "sectionTitle": "先确定谁写、给谁看、要对方做什么"
        },
        {
          "lessonId": "audience-writing",
          "sectionIndex": 6,
          "sectionTitle": "最后按读者的四个问题核对"
        }
      ],
      "editorial": true
    }
  ],
  "essay-writing": [
    {
      "id": "essay-writing-recall-1",
      "part": 0,
      "title": "总论点与段落分工",
      "quizTitle": "要点回忆 1",
      "core": "围绕题目关系提出**明确且可论证的主张**，分论点各解释不同机制或条件，共同支撑中心。",
      "boundary": "口号不是判断；换词重复不是不同分论点，不必凑固定三段。",
      "prompt": "总论点要回答{{0}}；各主体段须有不同的解释{{1}}。",
      "blanks": [
        {
          "answer": "题目",
          "accept": [
            "设问"
          ]
        },
        {
          "answer": "任务",
          "accept": [
            "论述任务"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "essay",
          "sectionIndex": 0,
          "sectionTitle": "入门：中心论点必须回答题目"
        },
        {
          "lessonId": "essay",
          "sectionIndex": 1,
          "sectionTitle": "入门：分论点是支撑关系，不是换词"
        },
        {
          "lessonId": "full-essay",
          "sectionIndex": 0,
          "sectionTitle": "小白：先写一个能被材料支持的判断"
        },
        {
          "lessonId": "full-essay",
          "sectionIndex": 2,
          "sectionTitle": "小白：用提纲给每一段分工"
        },
        {
          "lessonId": "full-essay",
          "sectionIndex": 3,
          "sectionTitle": "基础：分论点之间要有不同的解释任务"
        }
      ],
      "editorial": true
    },
    {
      "id": "essay-writing-recall-2",
      "part": 0,
      "title": "完成事实到观点的推理",
      "quizTitle": "要点回忆 2",
      "core": "论证段连接**观点、事实、作用机制与必要限制**，事实后说明为什么支持判断，再回扣主张。",
      "boundary": "故事堆积或可见意义重大不能替代分析；不虚构统计、新闻与名言。",
      "prompt": "事实与观点之间，要补出作用{{0}}。",
      "blanks": [
        {
          "answer": "机制",
          "accept": [
            "作用机制"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "paragraph-evidence",
          "sectionIndex": 0,
          "sectionTitle": "先把观点写成能被理由支持的判断"
        },
        {
          "lessonId": "paragraph-evidence",
          "sectionIndex": 2,
          "sectionTitle": "例解：把缺少的因果环节补出来"
        },
        {
          "lessonId": "paragraph-evidence",
          "sectionIndex": 6,
          "sectionTitle": "二稿按证据链修改"
        },
        {
          "lessonId": "essay",
          "sectionIndex": 2,
          "sectionTitle": "入门：事实后要说明为什么"
        },
        {
          "lessonId": "essay",
          "sectionIndex": 3,
          "sectionTitle": "巩固：把一个论证段写完整"
        }
      ],
      "editorial": true
    },
    {
      "id": "essay-writing-recall-3",
      "part": 0,
      "title": "让条件进入主张",
      "quizTitle": "要点回忆 3",
      "core": "事实、推断与建议分开；回应材料中的真实顾虑，用相容反例查必要条件，保留**证据范围**。",
      "boundary": "部分反馈不能扩大为全体成功；不虚构极端对手，也不把边界写成空洞双向口号。",
      "prompt": "回应顾虑须依据真实问题，不虚构{{0}}；有限证据须保留{{1}}。",
      "blanks": [
        {
          "answer": "对手",
          "accept": [
            "极端对手",
            "假想对手"
          ]
        },
        {
          "answer": "范围",
          "accept": [
            "证据范围",
            "适用范围"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "paragraph-evidence",
          "sectionIndex": 4,
          "sectionTitle": "改错：观点、事例和理由不能互相替代"
        },
        {
          "lessonId": "paragraph-evidence",
          "sectionIndex": 5,
          "sectionTitle": "回应边界，避免制造新的靶子"
        },
        {
          "lessonId": "essay",
          "sectionIndex": 6,
          "sectionTitle": "提升：回应反面情形使观点更稳"
        },
        {
          "lessonId": "full-essay",
          "sectionIndex": 5,
          "sectionTitle": "基础：事实、推断、建议分别用合适语气"
        },
        {
          "lessonId": "full-essay",
          "sectionIndex": 6,
          "sectionTitle": "提高：回应真正的顾虑，而不是虚构一个极端对手"
        },
        {
          "lessonId": "full-essay",
          "sectionIndex": 7,
          "sectionTitle": "提高：用反例检查结论，而非把材料写成双向口号"
        }
      ],
      "editorial": true
    },
    {
      "id": "essay-writing-recall-4",
      "part": 0,
      "title": "整篇推进与分轮修改",
      "quizTitle": "要点回忆 4",
      "core": "段落由问题、机制和条件推进，连接词须有真实关系；依次查**切题、论证、表达**，按错误类型选下一练习。",
      "boundary": "提纲、主体段与完整文章不能互相冒充；参考不是万能范文，字数合规不等于得分。",
      "prompt": "整篇先查切题，再查{{0}}，最后修表达。",
      "blanks": [
        {
          "answer": "论证",
          "accept": [
            "论证关系"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "essay",
          "sectionIndex": 4,
          "sectionTitle": "巩固：分配篇幅和安排段落"
        },
        {
          "lessonId": "essay",
          "sectionIndex": 7,
          "sectionTitle": "提升：完整文章要有推理推进"
        },
        {
          "lessonId": "essay",
          "sectionIndex": 8,
          "sectionTitle": "提升：按不同错误选择下一轮练习"
        },
        {
          "lessonId": "full-essay",
          "sectionIndex": 4,
          "sectionTitle": "基础：把段落接起来，不靠万能过渡"
        },
        {
          "lessonId": "full-essay",
          "sectionIndex": 8,
          "sectionTitle": "提高：整篇复核分三遍，每遍只解决一种问题"
        }
      ],
      "editorial": true
    }
  ],
  "transfer-writing": [
    {
      "id": "transfer-writing-recall-1",
      "part": 0,
      "title": "同源材料分任务使用",
      "quizTitle": "要点回忆 1",
      "core": "圈对象、范围、动作、身份与字数，给段落标功能与状态；**换题重新取证**，概括、解释、对策、应用文和文章各有交付。",
      "boundary": "同一事实可复用，不能复用同一答案；已请核查不等于核查合格。",
      "prompt": "换设问须重新选择证据{{0}}，同时保留事实{{1}}。",
      "blanks": [
        {
          "answer": "用途",
          "accept": [
            "作用"
          ]
        },
        {
          "answer": "状态",
          "accept": [
            "时间状态"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "writing-transfer",
          "sectionIndex": 0,
          "sectionTitle": "入门：先把设问译成一次具体交付"
        },
        {
          "lessonId": "writing-transfer",
          "sectionIndex": 3,
          "sectionTitle": "巩固：跨材料先看功能，不按段落抄答案"
        },
        {
          "lessonId": "writing-fj-governance-v035",
          "sectionIndex": 0,
          "sectionTitle": "入门：把对象、范围和状态圈出来"
        },
        {
          "lessonId": "writing-fj-governance-v035",
          "sectionIndex": 1,
          "sectionTitle": "入门：同样说不好走，原因可能不同"
        }
      ],
      "editorial": true
    },
    {
      "id": "transfer-writing-recall-2",
      "part": 0,
      "title": "从事实推进到解释",
      "quizTitle": "要点回忆 2",
      "core": "概括保留对象动作，分析补为什么，论证让每段新增关系；**算得出、比得了、归得因**是不同层次。",
      "boundary": "算术正确不保证口径可比，口径可比也不自动证明因果；记录与热度不能替代长期成效。",
      "prompt": "算术正确不保证{{0}}，可比也不自动证明{{1}}。",
      "blanks": [
        {
          "answer": "可比",
          "accept": [
            "可比性",
            "口径可比"
          ]
        },
        {
          "answer": "因果",
          "accept": [
            "因果关系"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "writing-transfer",
          "sectionIndex": 1,
          "sectionTitle": "入门：从一句材料做两次加工"
        },
        {
          "lessonId": "writing-transfer",
          "sectionIndex": 5,
          "sectionTitle": "巩固：完整文章怎样从一段推进到下一段"
        },
        {
          "lessonId": "writing-transfer",
          "sectionIndex": 6,
          "sectionTitle": "提升：把算得出、比得了、归得因分开"
        },
        {
          "lessonId": "writing-fj-governance-v035",
          "sectionIndex": 2,
          "sectionTitle": "巩固：从态度到理由，再到适用原则"
        },
        {
          "lessonId": "writing-fj-governance-v035",
          "sectionIndex": 5,
          "sectionTitle": "提升：长文章要解释关系，不是把短题加长"
        }
      ],
      "editorial": true
    },
    {
      "id": "transfer-writing-recall-3",
      "part": 0,
      "title": "把协作约束写成步骤",
      "quizTitle": "要点回忆 3",
      "core": "对策补尚存缺口，区分可立即核查、需协商与确认后实施；应用文按读者下一步组织，**核决定主体与未定状态**。",
      "boundary": "已有联系人不等于交接已打通；会后反馈不是会后开放，不编造日期地点与承诺。",
      "prompt": "建议须回应尚存{{0}}，不能只重抄已做事项。",
      "blanks": [
        {
          "answer": "缺口",
          "accept": [
            "问题"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "writing-transfer",
          "sectionIndex": 4,
          "sectionTitle": "巩固：同一事实，面对不同读者要变成什么"
        },
        {
          "lessonId": "writing-transfer",
          "sectionIndex": 7,
          "sectionTitle": "提升：把多方约束写成可以讨论的次序"
        },
        {
          "lessonId": "writing-fj-governance-v035",
          "sectionIndex": 3,
          "sectionTitle": "巩固：对策要补缺口，不重抄已做事项"
        },
        {
          "lessonId": "writing-fj-governance-v035",
          "sectionIndex": 4,
          "sectionTitle": "提升：应用文先替读者准备下一步"
        }
      ],
      "editorial": true
    },
    {
      "id": "transfer-writing-recall-4",
      "part": 0,
      "title": "复盘按错因再练",
      "quizTitle": "要点回忆 4",
      "core": "**保留初稿、修改理由与二稿**；漏点练索引，空论练关系，空策补动作，越权查主体，重复查段落分工。",
      "boundary": "参考是组织示例；勾选全满、耗时缩短和完成长文均不能折算考试分数。",
      "prompt": "下一轮练习应由主要{{0}}决定，而非背参考文章。",
      "blanks": [
        {
          "answer": "错误类型",
          "accept": [
            "错因",
            "主要错因"
          ]
        }
      ],
      "sources": [
        {
          "lessonId": "writing-transfer",
          "sectionIndex": 2,
          "sectionTitle": "入门：读、写、核对、重写各做什么"
        },
        {
          "lessonId": "writing-transfer",
          "sectionIndex": 8,
          "sectionTitle": "提升：用错误类型决定下一轮，而非背参考文章"
        },
        {
          "lessonId": "writing-fj-governance-v035",
          "sectionIndex": 5,
          "sectionTitle": "提升：长文章要解释关系，不是把短题加长"
        }
      ],
      "editorial": true
    }
  ]
};
 for (const id of Object.keys(additions)) {
  if (Object.prototype.hasOwnProperty.call(cards, id)) throw new Error("Duplicate topic recall data: " + id);
 }
 Object.assign(cards, additions);
})();
