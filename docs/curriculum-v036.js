"use strict";
// Independent candidate; load after catalog.js and practice-targeted-v035.js, before coverage-map.js.
// No network, persistence, deployment or old-question mutation.
(() => {
  const data={
  "batchId": "c36-common-sense-two-lessons",
  "version": 2,
  "status": "reviewed-revision-candidate-not-integrated",
  "baseline": {
    "version": "0.35.0",
    "lessons": 102,
    "questions": 669,
    "layeredLessons": 88
  },
  "summary": "两门原有常识课重写为三层讲义，每课9节、9道新原创题；共18题、72项解析，旧题不变。",
  "lessonPatches": [
    {
      "id": "phase-change",
      "sections": [
        [
          "小白：先写起点和终点，不先背情景名词",
          "物态变化说的是同一种物质从一种状态变成另一种状态。先在纸上写“变化前→变化后”，例如固态冰→液态水；箭头表示过程，左边不能省略。看见冰，只知道终点为固态，不能马上决定过程叫凝固还是凝华。题目若写“水蒸气直接形成冰晶”，起点才明确为气态；若写“水滴结成冰”，起点则是液态。先找这两个状态，比看见“冷”“白”“冰”等词就猜名称可靠。"
        ],
        [
          "小白：六个名称可以按三组往返记",
          "把固态、液态、气态作为三个端点，每一对有两个相反方向：固→液叫熔化，液→固叫凝固；液→气叫汽化，气→液叫液化；固→气叫升华，气→固叫凝华。后两种直接跨过液态，题干的“直接”不能漏。蒸发和沸腾都属于汽化；不是只有水烧开才会由液态变成气态。复习时遮住名称，自己按箭头补全，再反过来根据名称说两个状态。"
        ],
        [
          "小白：吸热或放热，要说清是谁在变化",
          "在本课日常条件下，以发生物态变化的物质为观察对象：熔化、汽化、升华吸热；凝固、液化、凝华放热。例如水蒸气在冷杯外壁变成液滴，是这些水由气态变液态并放热，不是因为杯子冷就把该过程判作吸热。冷表面可以从凝结的水获得热量，两者说的是不同对象。这里整理普通物态变化，不讨论等离子体、高压相变等特殊范围。"
        ],
        [
          "基础：同一现象里，先分清看见的东西",
          "题干若说明一团白雾由悬浮的小水滴构成，这些小水滴就是液态，不能因为它们飘在空气中就称为气态。还要区分两个步骤：液态水先变成水蒸气，是汽化；随后水蒸气遇到适当冷却条件形成液滴，是液化。不能把起点的烧水动作直接当成白雾形成的过程。判断依据仍是题目给出的物质和状态，不将所有看起来白的烟雾都当成水滴。"
        ],
        [
          "基础：多步过程逐段命名，不把中间状态擦掉",
          "一股水蒸气先成为液滴，液滴随后结冰，应写成气→液→固，分别是液化、凝固，两段都放热。它和水蒸气直接变冰晶的凝华不是同一条路径。若冰先化水、液态水再变气体，则是熔化后汽化，不能合称为一个升华过程。起点和终点一样，并不保证实际经过的过程一样；题中已经写出的中间状态是必须保留的证据。"
        ],
        [
          "基础：吸热不一定伴随温度上升",
          "在一定压力下，纯物质处于相应熔点、缓慢熔化且固液共存时，可以一边吸热一边保持温度不变。热量用于物态变化，不必全部表现为温度升高。可以把它理解为两个观察栏：“温度怎样变”和“状态怎样变”，二者要分开记录。纯冰还没有达到熔点时吸热升温，与处在熔化过程时吸热但温度暂不升高，不应混成一个阶段。题干的压力、纯物质、相变阶段等条件不能省掉。"
        ],
        [
          "提高：终态不够，必须追问形成路径",
          "只看到一层冰，至少要区分两种候选解释：原有液态水凝固，或水蒸气直接凝华。终点都为固态，因此仅凭照片或“变成冰”几个字，不能唯一确定过程。若材料补充“先有液滴，后结冰”，才支持凝固；若明确“气态直接到固态”，才支持凝华。提高阶段要学会说清缺什么信息，而不是在题目没给起点时靠生活印象补全。"
        ],
        [
          "提高：温度不变，也不能倒推一定在相变",
          "“某些满足条件的相变过程可以温度不变”不等于“只要温度不变就一定在相变”。一杯液态水与周围环境处在热平衡时，也可以长时间温度基本不变，并没有正在熔化。温度记录本身不能替代物态、加热条件和物质性质的信息。复盘这种错误，可先把原命题写清，再找一个温度不变却未发生所说过程的例子，检查是否把一个方向的结论倒过来用了。"
        ],
        [
          "提高：热量方向与热量大小是两件事",
          "知道一段汽化吸热、另一段液化放热，只能先确定各段热量的方向。若两段参与的水量、温度等条件未说明，不能自动断言吸收与放出的热量恰好抵消，也不能推出整个装置或房间的温度一定不变。定量计算还要知道质量、相变条件及其他热交换。本课只训练命名、方向和信息边界，不把定性箭头表当成对整个系统能量收支的完整计算。"
        ]
      ],
      "minutes": 24,
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
          "goal": "从起点终点识别六种变化，明确吸放热对象。",
          "questionIds": [
            "c36-phase-01",
            "c36-phase-02",
            "c36-phase-03"
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
          "goal": "分段处理液滴与冰晶情境，理解特定相变可恒温。",
          "questionIds": [
            "c36-phase-04",
            "c36-phase-05",
            "c36-phase-06"
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
          "goal": "检查终态、温度记录和热量方向的推断边界。",
          "questionIds": [
            "c36-phase-07",
            "c36-phase-08",
            "c36-phase-09"
          ]
        }
      },
      "versionNote": "两维理解与条件边界分层；原创教学层级，不是标定难度。"
    },
    {
      "id": "historiography",
      "sections": [
        [
          "小白：两张标签，分别回答两个问题",
          "“纪传体还是编年体”主要问材料怎样组织；“通史还是断代史”主要问叙述的历史范围。通史通常贯通多个朝代或较长的历史发展过程；断代史集中记述某一朝代或特定时代。分类看全书的主要叙述范围，不机械按年数或篇幅划线，也不承诺记全每件事。前者像书架怎么分格，后者像书架装哪一段历史，不能放在一张只能四选一的清单里。一本书可以同时有体例标签和范围标签。先把“组织方式”“历史范围”写成两栏，再填书名，能避免看到纪传体就误以为它不能也是通史。"
        ],
        [
          "小白：组织方式不等于出现了哪些词",
          "纪传体以人物传记等为组织骨架，编年体依时间先后组织史事。这只是入门辨别线索，不是完整史学体例分类。编年体也会写人物，纪传体也会交代年份，因此“有某个人”或“出现某一年”都不能单独决定全书体例。判断时看主要编排方式，必要时核对目录、编纂说明与可靠书目，而不是给一小段文字统计人名或数字。"
        ],
        [
          "小白：用三个已核样本搭两栏",
          "先记三个稳定对应：《史记》是纪传体通史，《资治通鉴》是编年体通史，《汉书》是纪传体断代史。分两遍记：第一遍比较《史记》和《资治通鉴》，范围同为通史，组织方式不同；第二遍比较《史记》和《汉书》，同为纪传体，范围类别不同。这样一个样本承担两个对照，比把三组词连成一句口诀更容易发现混淆。本课不增加未核书目的体例断言。"
        ],
        [
          "基础：只改错的字段，别把正确部分一起换掉",
          "遇到“《资治通鉴》是纪传体通史”，先拆成书名、组织方式、范围三栏。书名固定，范围“通史”正确，错的是“纪传体”，应改为“编年体”。如果把整句凭感觉改成“编年体断代史”，虽然修对一个字段，却又改错另一个。多项匹配题也按这个办法逐格核对；不因为选项里一个熟悉词正确，就放过同一选项其他字段。"
        ],
        [
          "基础：同类关系要说明在哪一栏成立",
          "说两本书“相同”之前先补充比较维度。《史记》和《资治通鉴》同为通史，不表示同为编年体；《史记》和《汉书》同为纪传体，不表示同为断代史。若用两个圆圈分别表示纪传体和通史，《史记》处在两个圈的交叉处，《汉书》只进入前一圈，《资治通鉴》只进入后一圈。这只是三书范围内的整理图，不是对全部史书数量的统计。"
        ],
        [
          "基础：把时间范围与写作时代分开",
          "一本书写成于某个时代，不代表它只叙述那个时代；书中出现某位人物，也不代表全书以他为传记中心。若某条资料只说作者的生活时代，它回答作者背景，尚不能单独确定史书的历史范围。选项把“作者属于哪一朝”直接改成“所写只是哪一朝”，中间就缺少证据。对本课三书，先用已核体例和范围判断，不用未经核实的具体起止年代来填空。"
        ],
        [
          "提高：局部节选不替代全书分类",
          "从一部通史中摘出一个时期的内容，得到的是该通史的局部节选；不能因为节选范围较窄，就把原书重新归为断代史。同理，编年体书中的一段人物叙事，不会仅因这一段集中讲一个人就使原书变成纪传体。题目要判断全书还是判断这份新编材料，必须先分清对象。若另有人真正重新编排成一部新书，应检查新书的组织和范围，不能只靠来源书名定性。"
        ],
        [
          "提高：发现信息缺口，不把空格填成结论",
          "若匿名材料只说“按年份编排，集中记录某一朝代史事”，在本课给定的简化分类下可以判断其体例与范围，但不能据此认出它一定是哪一部真实史书。若只知道“包含帝王和百姓事迹”，连组织方式也未必确定。分类线索、唯一书名和具体作者需要的证据不同。把未知写成未知，是准确作答的一部分；不能为了每一栏都有字就借一个熟悉书名补齐。"
        ],
        [
          "提高：体例标签不是可靠性或完整性的保证",
          "知道一部书是通史，不等于知道它记录了所有时代、每件事情或每个人；知道它是某种体例，也不能直接判定其中每条记载都真实，或一种体例一定比另一种更可靠。范围与组织回答分类问题，具体记载是否可信还要看来源、版本、相互印证等证据。本课只建立三书的基础分类，不进行版本校勘、史实真伪判定或完整史学体系讲授。"
        ]
      ],
      "minutes": 24,
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
          "goal": "理解组织与范围两栏，建立三书准确对应。",
          "questionIds": [
            "c36-history-01",
            "c36-history-02",
            "c36-history-03"
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
          "goal": "逐字段校对，用同一维度比较并识别不足线索。",
          "questionIds": [
            "c36-history-04",
            "c36-history-05",
            "c36-history-06"
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
          "goal": "分清原书和节选，避免由分类推出唯一书名或记录完备。",
          "questionIds": [
            "c36-history-07",
            "c36-history-08",
            "c36-history-09"
          ]
        }
      },
      "versionNote": "两维理解与条件边界分层；原创教学层级，不是标定难度。"
    }
  ],
  "learningAids": {
    "phase-change": {
      "keyPoints": [
        {
          "title": "先写状态箭头，再报名称",
          "text": "写清同一种物质变化前后各是什么状态；遇到“先……再……”就分段，不用最终看到的冰或雾替代完整过程。"
        },
        {
          "title": "吸放热先固定观察对象",
          "text": "以发生相变的物质为对象判断：熔化、汽化、升华吸热，反向过程放热。杯子吸热与杯壁水蒸气液化放热可以同时成立。"
        },
        {
          "title": "方向、温度、热量大小分别回答",
          "text": "吸热不保证立刻升温，恒温也不保证一定相变；只知道两段热量方向，还不足以算整个系统的净热量。"
        }
      ],
      "contrasts": [
        {
          "left": {
            "term": "凝固",
            "text": "液态→固态，例如题目明确水膜结冰。"
          },
          "right": {
            "term": "凝华",
            "text": "气态直接→固态，例如题目明确水蒸气直接成冰晶。"
          },
          "cue": "共同终点不能替代不同起点。"
        },
        {
          "left": {
            "term": "温度是否变化",
            "text": "用温度记录回答，不把吸热直接等同于升温。"
          },
          "right": {
            "term": "是否发生相变",
            "text": "要看物态和条件，温度一段时间不变不能单独证明。"
          },
          "cue": "某类相变可恒温，不等于所有恒温都在相变。"
        }
      ],
      "plainExample": {
        "title": "把冷杯外壁水滴拆成三问",
        "text": "题设说外壁原来干燥，后来空气中的水蒸气在外壁成液滴。先问变的是什么：是水；再问状态：气→液；最后问热量：发生液化的水放热。冷杯可以接受热量。若题目随后明确液滴结冰，就另加一段液→固，不把两段直接叫凝华。"
      },
      "memoryCue": "同一物质 → 起点和终点 → 是否有中间状态 → 过程名称 → 对谁吸放热 → 哪些条件还未知。",
      "recall": [
        {
          "question": "同样在板面看见冰，为什么不一定都叫凝固？",
          "checkpoints": [
            "凝固起点为液态，凝华起点为气态且直接形成固态。",
            "只有终点不能区分路径，还要形成前或中间过程的信息。"
          ]
        },
        {
          "question": "怎样分别反驳“吸热必升温”和“恒温必相变”？",
          "checkpoints": [
            "给出一定压力下纯物质在熔点缓慢熔化的条件例子。",
            "给出未相变而处在热平衡的液态水例子；不能倒推。"
          ]
        }
      ],
      "scope": "学习重点按理解顺序组织，不代表考频。范围为日常六种物态变化及给定理想条件，不覆盖完整热学、特殊高压相变或装置热量计算。",
      "sourceIds": [
        "phase"
      ]
    },
    "historiography": {
      "keyPoints": [
        {
          "title": "先分两栏",
          "text": "组织方式看纪传体、编年体等体例；历史范围看通史、断代史。通史贯通多个朝代或较长历史发展过程，断代史集中于某一朝代或特定时代。一本书可以各有一个标签，两组不是四选一，也不机械按篇幅或年数划线。"
        },
        {
          "title": "三书承担两个对照",
          "text": "《史记》和《资治通鉴》同为通史、体例不同；《史记》和《汉书》同为纪传体、范围不同。每次比较都说清是哪一栏。"
        },
        {
          "title": "不把局部线索扩大",
          "text": "人物或年份的出现不单独决定体例，节选不改变原书分类，通史也不保证记录全部史事。"
        }
      ],
      "contrasts": [
        {
          "left": {
            "term": "组织方式",
            "text": "怎样安排史事，是按人物传记等为骨架还是依时间先后组织。"
          },
          "right": {
            "term": "历史范围",
            "text": "主要叙述怎样的历史时段，不是作者出生或写作的年代。"
          },
          "cue": "先判断问题属于哪一栏，再调用相应事实。"
        },
        {
          "left": {
            "term": "全书分类",
            "text": "判断原书的主要组织和历史范围。"
          },
          "right": {
            "term": "节选特点",
            "text": "只能描述这份节选，不据一段人物叙事重判整本书。"
          },
          "cue": "先固定要判断的对象，再讨论范围变化。"
        }
      ],
      "plainExample": {
        "title": "纠正一句话，只改错的一格",
        "text": "原句“《资治通鉴》是纪传体通史”可以拆成书名、组织方式、范围三格。书名不动，范围“通史”保留，只把组织方式改为“编年体”。不要为了整句看起来不同，把正确范围一起改为断代史。"
      },
      "memoryCue": "问什么维度 → 找全书还是节选 → 逐格核对三书 → 已知只填已知 → 不把分类当成可靠性证明。",
      "recall": [
        {
          "question": "用《史记》作中心，分别与另两书比较，怎样说明体例和范围是两个维度？",
          "checkpoints": [
            "与《资治通鉴》同为通史，但纪传体与编年体不同。",
            "与《汉书》同为纪传体，但通史与断代史不同。"
          ]
        },
        {
          "question": "一本匿名书写了很多人名和年份，还缺什么才能判断体例？知道它是通史，又不能保证什么？",
          "checkpoints": [
            "还缺主要编排方式等证据，不能按词语出现次数定体例。",
            "通史不能保证覆盖所有时代事件或每条记载都可靠。"
          ]
        }
      ],
      "scope": "仅深化三部已核史书的基础分类及证据边界，不代表完整文学史或史学体例体系。未扩展具体断限、卷数、各篇作者分工或版本争议。",
      "sourceIds": [
        "shiji-record",
        "tongjian-record",
        "hanshu-record"
      ]
    }
  },
  "questions": [
    {
      "id": "c36-phase-01",
      "lesson": "phase-change",
      "contentRevision": 1,
      "stem": "冷杯外壁原先干燥，空气中的水蒸气随后在外壁形成液态水滴。只就这些水的物态变化判断，正确的是：",
      "options": [
        "液化，水向周围放出热量",
        "凝固，水向周围放出热量",
        "汽化，水从周围吸收热量",
        "液化，水从周围吸收热量"
      ],
      "answer": 0,
      "optionReviews": [
        "起点是气态水，终点是液态水，属于液化；发生液化的水向周围放热。",
        "凝固要求液态到固态，题设没有形成冰。",
        "汽化是液态到气态，与题设的变化方向相反。",
        "过程名称正确，但把液化的热量方向写反；冷杯可以接受热量，不代表水在吸热。"
      ],
      "explanation": "起点是气态水，终点是液态水，属于液化；发生液化的水向周围放热。",
      "trainingStage": "识别概念",
      "trainingGoal": "先固定发生变化的物质，再判断状态和热量",
      "graphic": null,
      "materialIds": [],
      "reviewNotes": [],
      "meta": {
        "module": "常识判断",
        "type": "物理常识",
        "trainingStage": "识别概念",
        "trainingGoal": "先固定发生变化的物质，再判断状态和热量",
        "knowledgeIds": [
          "phase-change",
          "phase-change/condensation-object"
        ],
        "tags": [
          "物态变化",
          "热量方向",
          "条件边界"
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
        "purpose": "原创教学练习；分层是学习目标，不是测量难度、官方考频或分数预测。",
        "source": {
          "kind": "original",
          "title": "常识两课分层原创候选 v0.36",
          "url": null,
          "referenceIds": [
            "phase"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、逐项解析独立编写；来源仅支持相应基础事实，不转载教材、古籍或第三方题目。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "basis": "2026-11-05 独立编辑逐题检查候选答案唯一性、四项解析、物态条件与史书两维分类；对六道提高题作提示线索定向修订后再逐项复核。不是专家认证、独立盲审或考生试测，未做难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "c36-phase-02",
      "lesson": "phase-change",
      "contentRevision": 1,
      "stem": "题设明确：一块固态二氧化碳直接变成气态二氧化碳，中间没有出现液态。在本课日常条件下，这一过程是：",
      "options": [
        "熔化，吸热",
        "升华，放热",
        "升华，吸热",
        "液化，放热"
      ],
      "answer": 2,
      "optionReviews": [
        "熔化的终点是液态；题设明确直接到气态。",
        "固态直接到气态确为升华，但升华需要吸热。",
        "起点固态、终点气态且未经过液态，符合升华；该过程吸热。",
        "液化要求气态到液态，两端和方向均与题设不同。"
      ],
      "explanation": "起点固态、终点气态且未经过液态，符合升华；该过程吸热。",
      "trainingStage": "识别概念",
      "trainingGoal": "识别直接跨过液态的状态变化",
      "graphic": null,
      "materialIds": [],
      "reviewNotes": [],
      "meta": {
        "module": "常识判断",
        "type": "物理常识",
        "trainingStage": "识别概念",
        "trainingGoal": "识别直接跨过液态的状态变化",
        "knowledgeIds": [
          "phase-change",
          "phase-change/direct-sublimation"
        ],
        "tags": [
          "物态变化",
          "热量方向",
          "条件边界"
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
        "purpose": "原创教学练习；分层是学习目标，不是测量难度、官方考频或分数预测。",
        "source": {
          "kind": "original",
          "title": "常识两课分层原创候选 v0.36",
          "url": null,
          "referenceIds": [
            "phase"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、逐项解析独立编写；来源仅支持相应基础事实，不转载教材、古籍或第三方题目。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "basis": "2026-11-05 独立编辑逐题检查候选答案唯一性、四项解析、物态条件与史书两维分类；对六道提高题作提示线索定向修订后再逐项复核。不是专家认证、独立盲审或考生试测，未做难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "c36-phase-03",
      "lesson": "phase-change",
      "contentRevision": 1,
      "stem": "把六种物态变化按“发生变化的物质吸热或放热”分成两组，下列哪组中三种过程都属于放热过程？",
      "options": [
        "凝固、汽化、凝华",
        "熔化、液化、升华",
        "汽化、升华、熔化",
        "凝固、液化、凝华"
      ],
      "answer": 3,
      "optionReviews": [
        "凝固、凝华放热，但汽化吸热，不能同列为全放热。",
        "液化放热，熔化与升华吸热，混入了两个相反方向。",
        "三种都是吸热过程，恰与题目要求相反。",
        "液到固、气到液、气到固分别为凝固、液化、凝华，均向周围放热。"
      ],
      "explanation": "液到固、气到液、气到固分别为凝固、液化、凝华，均向周围放热。",
      "trainingStage": "识别概念",
      "trainingGoal": "按热量方向整理六种变化，而非看词中是否有气字",
      "graphic": null,
      "materialIds": [],
      "reviewNotes": [],
      "meta": {
        "module": "常识判断",
        "type": "物理常识",
        "trainingStage": "识别概念",
        "trainingGoal": "按热量方向整理六种变化，而非看词中是否有气字",
        "knowledgeIds": [
          "phase-change",
          "phase-change/heat-direction"
        ],
        "tags": [
          "物态变化",
          "热量方向",
          "条件边界"
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
        "purpose": "原创教学练习；分层是学习目标，不是测量难度、官方考频或分数预测。",
        "source": {
          "kind": "original",
          "title": "常识两课分层原创候选 v0.36",
          "url": null,
          "referenceIds": [
            "phase"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、逐项解析独立编写；来源仅支持相应基础事实，不转载教材、古籍或第三方题目。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "basis": "2026-11-05 独立编辑逐题检查候选答案唯一性、四项解析、物态条件与史书两维分类；对六道提高题作提示线索定向修订后再逐项复核。不是专家认证、独立盲审或考生试测，未做难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "c36-phase-04",
      "lesson": "phase-change",
      "contentRevision": 1,
      "stem": "观察记录明确写道：“液态水先变成水蒸气，随后其中一部分水蒸气变成悬浮的小水滴，形成所见白雾。”对前后两段过程及白雾状态的判断，正确的是：",
      "options": [
        "先液化后汽化；白雾是气态水",
        "先汽化后液化；白雾中的小水滴为液态",
        "先汽化后凝华；白雾中的小水滴为固态",
        "前后都属汽化；白雾中的小水滴为液态"
      ],
      "answer": 1,
      "optionReviews": [
        "把两段的起点终点顺序均写反；题设还明确白雾由小水滴构成。",
        "液→气为汽化，气→液为液化；悬浮位置不改变小水滴的液态属性。",
        "凝华的终点是固态，题设给的是液态小水滴。",
        "第一段是汽化，第二段是相反方向的液化，不能用起初的加热动作概括两段。"
      ],
      "explanation": "液→气为汽化，气→液为液化；悬浮位置不改变小水滴的液态属性。",
      "trainingStage": "迁移运用",
      "trainingGoal": "区分可见液滴与其形成前的气态水",
      "graphic": null,
      "materialIds": [],
      "reviewNotes": [],
      "meta": {
        "module": "常识判断",
        "type": "物理常识",
        "trainingStage": "迁移运用",
        "trainingGoal": "区分可见液滴与其形成前的气态水",
        "knowledgeIds": [
          "phase-change",
          "phase-change/visible-droplets"
        ],
        "tags": [
          "物态变化",
          "热量方向",
          "条件边界"
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
        "purpose": "原创教学练习；分层是学习目标，不是测量难度、官方考频或分数预测。",
        "source": {
          "kind": "original",
          "title": "常识两课分层原创候选 v0.36",
          "url": null,
          "referenceIds": [
            "phase"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、逐项解析独立编写；来源仅支持相应基础事实，不转载教材、古籍或第三方题目。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "basis": "2026-11-05 独立编辑逐题检查候选答案唯一性、四项解析、物态条件与史书两维分类；对六道提高题作提示线索定向修订后再逐项复核。不是专家认证、独立盲审或考生试测，未做难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "c36-phase-05",
      "lesson": "phase-change",
      "contentRevision": 1,
      "stem": "同一观察中，甲处水蒸气直接形成冰晶；乙处先有液态水膜，随后水膜结冰。对甲、乙的判断，正确的是：",
      "options": [
        "甲凝华、乙凝固，两者均吸热",
        "甲凝固、乙凝华，两者均放热",
        "甲凝华、乙凝固，两者均放热",
        "甲、乙均是凝固，因为终点都是冰"
      ],
      "answer": 2,
      "optionReviews": [
        "过程名称正确，放热被误写为吸热；形成固态不意味着从周围吸热。",
        "虽然热量方向正确，却交换了甲乙起点对应的名称。",
        "甲为气→固，乙为液→固；两者起点不同、名称不同，但都是放热过程。",
        "只看共同终点忽略了甲的气态起点；凝固不能涵盖直接气→固。"
      ],
      "explanation": "甲为气→固，乙为液→固；两者起点不同、名称不同，但都是放热过程。",
      "trainingStage": "迁移运用",
      "trainingGoal": "保留起点差异，区分凝华与凝固",
      "graphic": null,
      "materialIds": [],
      "reviewNotes": [],
      "meta": {
        "module": "常识判断",
        "type": "物理常识",
        "trainingStage": "迁移运用",
        "trainingGoal": "保留起点差异，区分凝华与凝固",
        "knowledgeIds": [
          "phase-change",
          "phase-change/path-comparison"
        ],
        "tags": [
          "物态变化",
          "热量方向",
          "条件边界"
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
        "purpose": "原创教学练习；分层是学习目标，不是测量难度、官方考频或分数预测。",
        "source": {
          "kind": "original",
          "title": "常识两课分层原创候选 v0.36",
          "url": null,
          "referenceIds": [
            "phase"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、逐项解析独立编写；来源仅支持相应基础事实，不转载教材、古籍或第三方题目。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "basis": "2026-11-05 独立编辑逐题检查候选答案唯一性、四项解析、物态条件与史书两维分类；对六道提高题作提示线索定向修订后再逐项复核。不是专家认证、独立盲审或考生试测，未做难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "c36-phase-06",
      "lesson": "phase-change",
      "contentRevision": 1,
      "stem": "在压力保持一定的条件下，纯冰处在相应熔点，缓慢吸热熔化，且这一段始终保持冰水共存。按本课理想化模型，下列记录合理的是：",
      "options": [
        "冰的数量减少，温度仍可保持不变",
        "因温度不变，熔化应改判为放热",
        "冰水温度必持续上升，否则不可能吸热",
        "温度不变说明冰的数量也必定不变"
      ],
      "answer": 0,
      "optionReviews": [
        "一定压力下在熔点缓慢熔化，热量可用于状态变化，因此冰减少而温度保持不变是合理的。",
        "温度是否变化不能把熔化的吸热方向改成放热。",
        "吸热既可表现为升温，也可用于物态变化；题设已给出相变共存条件。",
        "温度不变不代表状态组成不变，冰可在同温条件下转化为水。"
      ],
      "explanation": "一定压力下在熔点缓慢熔化，热量可用于状态变化，因此冰减少而温度保持不变是合理的。",
      "trainingStage": "迁移运用",
      "trainingGoal": "将温度变化与相变分开记录，并保留模型条件",
      "graphic": null,
      "materialIds": [],
      "reviewNotes": [],
      "meta": {
        "module": "常识判断",
        "type": "物理常识",
        "trainingStage": "迁移运用",
        "trainingGoal": "将温度变化与相变分开记录，并保留模型条件",
        "knowledgeIds": [
          "phase-change",
          "phase-change/constant-temperature-melting"
        ],
        "tags": [
          "物态变化",
          "热量方向",
          "条件边界"
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
        "purpose": "原创教学练习；分层是学习目标，不是测量难度、官方考频或分数预测。",
        "source": {
          "kind": "original",
          "title": "常识两课分层原创候选 v0.36",
          "url": null,
          "referenceIds": [
            "phase"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、逐项解析独立编写；来源仅支持相应基础事实，不转载教材、古籍或第三方题目。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "basis": "2026-11-05 独立编辑逐题检查候选答案唯一性、四项解析、物态条件与史书两维分类；对六道提高题作提示线索定向修订后再逐项复核。不是专家认证、独立盲审或考生试测，未做难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "c36-phase-07",
      "lesson": "phase-change",
      "contentRevision": 2,
      "stem": "一张照片只显示金属板表面有一层冰。若只在“液态水结冰”和“水蒸气直接形成冰晶”两条候选路径中判断，以下哪条新增观察记录足以唯一确定属于凝华？",
      "options": [
        "冰层形成期间，板面温度一直低于零摄氏度",
        "板面上的冰层保持固态，五分钟没有熔化",
        "水蒸气直接变成冰晶，中间没有出现液态",
        "冰层呈白色细晶状，并且覆盖整块金属板"
      ],
      "answer": 2,
      "optionReviews": [
        "低温条件可以同时容许液态水凝固与水蒸气凝华，仍未给出形成前的物态，不能唯一选择凝华。",
        "冰形成后是否熔化描述的是后续状态，不能区分此前是液态水结冰还是水蒸气直接形成冰晶。",
        "新增记录明确气态直接到固态，并排除中间液态，足以把候选路径确定为凝华。",
        "颜色、晶状外观和覆盖面积都没有直接记录形成前的物态，不能仅凭这些终态特征选择凝华。"
      ],
      "explanation": "新增记录明确气态直接到固态，并排除中间液态，足以把候选路径确定为凝华。",
      "trainingStage": "检查边界",
      "trainingGoal": "从终态信息不足出发，识别可区分形成路径的新增证据",
      "graphic": null,
      "materialIds": [],
      "reviewNotes": [],
      "meta": {
        "module": "常识判断",
        "type": "物理常识",
        "trainingStage": "检查边界",
        "trainingGoal": "从终态信息不足出发，识别可区分形成路径的新增证据",
        "knowledgeIds": [
          "phase-change",
          "phase-change/endpoint-insufficiency"
        ],
        "tags": [
          "物态变化",
          "热量方向",
          "条件边界"
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
        "purpose": "原创教学练习；分层是学习目标，不是测量难度、官方考频或分数预测。",
        "source": {
          "kind": "original",
          "title": "常识两课分层原创候选 v0.36",
          "url": null,
          "referenceIds": [
            "phase"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、逐项解析独立编写；来源仅支持相应基础事实，不转载教材、古籍或第三方题目。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "basis": "2026-11-05 独立编辑逐题检查候选答案唯一性、四项解析、物态条件与史书两维分类；对六道提高题作提示线索定向修订后再逐项复核。不是专家认证、独立盲审或考生试测，未做难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "c36-phase-08",
      "lesson": "phase-change",
      "contentRevision": 2,
      "stem": "某人仅凭“样品温度连续五分钟保持不变”，断言样品必定正在发生物态变化。下列哪种情形与记录相符，却能直接反驳该断言？各情形均按本课定压理想模型判断。",
      "options": [
        "液态水与环境热平衡，物态未改变",
        "纯冰在熔点缓慢熔化，冰水共存",
        "纯水在沸点持续沸腾，液态水减少",
        "纯水在凝固点结冰，固态冰增加"
      ],
      "answer": 0,
      "optionReviews": [
        "液态水处于热平衡时可以恒温而保持液态，给出了“温度不变但未发生物态变化”的反例。",
        "在题设模型下，冰水共存的熔化阶段可以恒温，但它正在发生相变，不是所需反例。",
        "在题设模型下，沸腾可以恒温，但液态水正在汽化，不能反驳“恒温必相变”。",
        "在题设模型下，凝固阶段可以恒温，但液态水正在变成冰，也不能作为未相变的反例。"
      ],
      "explanation": "液态水处于热平衡时可以恒温而保持液态，给出了“温度不变但未发生物态变化”的反例。",
      "trainingStage": "检查边界",
      "trainingGoal": "用恒温但未相变的反例，检验“恒温必相变”的逆向推断",
      "graphic": null,
      "materialIds": [],
      "reviewNotes": [],
      "meta": {
        "module": "常识判断",
        "type": "物理常识",
        "trainingStage": "检查边界",
        "trainingGoal": "用恒温但未相变的反例，检验“恒温必相变”的逆向推断",
        "knowledgeIds": [
          "phase-change",
          "phase-change/converse-counterexample"
        ],
        "tags": [
          "物态变化",
          "热量方向",
          "条件边界"
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
        "purpose": "原创教学练习；分层是学习目标，不是测量难度、官方考频或分数预测。",
        "source": {
          "kind": "original",
          "title": "常识两课分层原创候选 v0.36",
          "url": null,
          "referenceIds": [
            "phase"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、逐项解析独立编写；来源仅支持相应基础事实，不转载教材、古籍或第三方题目。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "basis": "2026-11-05 独立编辑逐题检查候选答案唯一性、四项解析、物态条件与史书两维分类；对六道提高题作提示线索定向修订后再逐项复核。不是专家认证、独立盲审或考生试测，未做难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "c36-phase-09",
      "lesson": "phase-change",
      "contentRevision": 2,
      "stem": "一装置中有一段液态水汽化，另一段水蒸气液化。题目未说明两段参与的水量、温度条件和其他热交换。仅据两段的物态变化，哪项结论成立？",
      "options": [
        "吸热量等于放热量，因为两段变化的方向相反",
        "吸放热方向可定，两段热量大小尚不能比较",
        "吸放热方向未定，因为两段参与的水量尚未知",
        "装置净放热可定，因为其中一段发生了液化"
      ],
      "answer": 1,
      "optionReviews": [
        "相反的相变方向不保证热量等大；还需相应质量和状态条件，题设未提供这些条件。",
        "在本课范围内，汽化吸热、液化放热；缺少参与水量、相变条件等信息，仍不能比较两段热量大小。",
        "水量影响热量大小，不会把本课汽化吸热、液化放热的定性方向变成未知；谨慎措辞也不能代替逐项判断。",
        "液化段放热并不说明它超过汽化段吸热，其他热交换也未知，因此不能确定装置的净热量方向。"
      ],
      "explanation": "在本课范围内，汽化吸热、液化放热；缺少参与水量、相变条件等信息，仍不能比较两段热量大小。",
      "trainingStage": "检查边界",
      "trainingGoal": "区分定性方向、热量数值和系统温度",
      "graphic": null,
      "materialIds": [],
      "reviewNotes": [],
      "meta": {
        "module": "常识判断",
        "type": "物理常识",
        "trainingStage": "检查边界",
        "trainingGoal": "区分定性方向、热量数值和系统温度",
        "knowledgeIds": [
          "phase-change",
          "phase-change/heat-budget-boundary"
        ],
        "tags": [
          "物态变化",
          "热量方向",
          "条件边界"
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
        "purpose": "原创教学练习；分层是学习目标，不是测量难度、官方考频或分数预测。",
        "source": {
          "kind": "original",
          "title": "常识两课分层原创候选 v0.36",
          "url": null,
          "referenceIds": [
            "phase"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、逐项解析独立编写；来源仅支持相应基础事实，不转载教材、古籍或第三方题目。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "basis": "2026-11-05 独立编辑逐题检查候选答案唯一性、四项解析、物态条件与史书两维分类；对六道提高题作提示线索定向修订后再逐项复核。不是专家认证、独立盲审或考生试测，未做难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "c36-history-01",
      "lesson": "historiography",
      "contentRevision": 1,
      "stem": "给一部史书贴上“编年体”标签，主要是在回答哪一个问题？",
      "options": [
        "书中叙述的所有事件是否真实",
        "作者出生于哪个朝代",
        "书中的史事主要怎样组织编排",
        "全书是否只写一个朝代"
      ],
      "answer": 2,
      "optionReviews": [
        "体例不负责证明每条史实的真实性，可靠性要另看证据。",
        "编年体是组织方式，不是作者生活时代的标签。",
        "编年体以时间先后组织史事，主要回答怎样编排的问题。",
        "是否集中于一个朝代属于历史范围问题，不能由编年体直接决定。"
      ],
      "explanation": "编年体以时间先后组织史事，主要回答怎样编排的问题。",
      "trainingStage": "识别概念",
      "trainingGoal": "把组织体例与时间范围、作者和可信度分开",
      "graphic": null,
      "materialIds": [],
      "reviewNotes": [],
      "meta": {
        "module": "常识判断",
        "type": "史书体例",
        "trainingStage": "识别概念",
        "trainingGoal": "把组织体例与时间范围、作者和可信度分开",
        "knowledgeIds": [
          "historiography",
          "historiography/classification-dimensions"
        ],
        "tags": [
          "史书体例",
          "历史范围",
          "证据边界"
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
        "purpose": "原创教学练习；分层是学习目标，不是测量难度、官方考频或分数预测。",
        "source": {
          "kind": "original",
          "title": "常识两课分层原创候选 v0.36",
          "url": null,
          "referenceIds": [
            "shiji-record",
            "tongjian-record",
            "hanshu-record"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、逐项解析独立编写；来源仅支持相应基础事实，不转载教材、古籍或第三方题目。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "basis": "2026-11-05 独立编辑逐题检查候选答案唯一性、四项解析、物态条件与史书两维分类；对六道提高题作提示线索定向修订后再逐项复核。不是专家认证、独立盲审或考生试测，未做难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "c36-history-02",
      "lesson": "historiography",
      "contentRevision": 1,
      "stem": "学习卡把《史记》和《汉书》放在“纪传体”一栏。如果再按“通史／断代史”分栏，正确的安排是：",
      "options": [
        "两书都放通史栏",
        "《史记》放通史栏，《汉书》放断代史栏",
        "两书都放断代史栏",
        "《史记》放断代史栏，《汉书》放通史栏"
      ],
      "answer": 1,
      "optionReviews": [
        "《汉书》是断代史；共同的纪传体标签不能决定共同的通史标签。",
        "两书同属纪传体，但《史记》为通史，《汉书》为断代史，两栏分别判断。",
        "《史记》是通史，不能因与《汉书》同为纪传体而改为断代史。",
        "两书的历史范围标签被交换了。"
      ],
      "explanation": "两书同属纪传体，但《史记》为通史，《汉书》为断代史，两栏分别判断。",
      "trainingStage": "识别概念",
      "trainingGoal": "在同一体例中继续区分历史范围",
      "graphic": null,
      "materialIds": [],
      "reviewNotes": [],
      "meta": {
        "module": "常识判断",
        "type": "史书体例",
        "trainingStage": "识别概念",
        "trainingGoal": "在同一体例中继续区分历史范围",
        "knowledgeIds": [
          "historiography",
          "historiography/shared-form-different-range"
        ],
        "tags": [
          "史书体例",
          "历史范围",
          "证据边界"
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
        "purpose": "原创教学练习；分层是学习目标，不是测量难度、官方考频或分数预测。",
        "source": {
          "kind": "original",
          "title": "常识两课分层原创候选 v0.36",
          "url": null,
          "referenceIds": [
            "shiji-record",
            "tongjian-record",
            "hanshu-record"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、逐项解析独立编写；来源仅支持相应基础事实，不转载教材、古籍或第三方题目。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "basis": "2026-11-05 独立编辑逐题检查候选答案唯一性、四项解析、物态条件与史书两维分类；对六道提高题作提示线索定向修订后再逐项复核。不是专家认证、独立盲审或考生试测，未做难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "c36-history-03",
      "lesson": "historiography",
      "contentRevision": 1,
      "stem": "下列学习卡均把“组织方式”和“历史范围”分列。关于《资治通鉴》，哪张卡正确？",
      "options": [
        "组织方式：通史；历史范围：编年体",
        "组织方式：纪传体；历史范围：通史",
        "组织方式：编年体；历史范围：断代史",
        "组织方式：编年体；历史范围：通史"
      ],
      "answer": 3,
      "optionReviews": [
        "两个词与该书有关，却把组织方式和历史范围的字段倒置了。",
        "通史正确，但组织方式应为编年体。",
        "编年体正确，但其历史范围类别应为通史。",
        "《资治通鉴》是编年体通史，两个字段的内容和位置均正确。"
      ],
      "explanation": "《资治通鉴》是编年体通史，两个字段的内容和位置均正确。",
      "trainingStage": "识别概念",
      "trainingGoal": "分别校验分类值及其所在字段",
      "graphic": null,
      "materialIds": [],
      "reviewNotes": [],
      "meta": {
        "module": "常识判断",
        "type": "史书体例",
        "trainingStage": "识别概念",
        "trainingGoal": "分别校验分类值及其所在字段",
        "knowledgeIds": [
          "historiography",
          "historiography/tongjian-two-fields"
        ],
        "tags": [
          "史书体例",
          "历史范围",
          "证据边界"
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
        "purpose": "原创教学练习；分层是学习目标，不是测量难度、官方考频或分数预测。",
        "source": {
          "kind": "original",
          "title": "常识两课分层原创候选 v0.36",
          "url": null,
          "referenceIds": [
            "shiji-record",
            "tongjian-record",
            "hanshu-record"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、逐项解析独立编写；来源仅支持相应基础事实，不转载教材、古籍或第三方题目。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "basis": "2026-11-05 独立编辑逐题检查候选答案唯一性、四项解析、物态条件与史书两维分类；对六道提高题作提示线索定向修订后再逐项复核。不是专家认证、独立盲审或考生试测，未做难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "c36-history-04",
      "lesson": "historiography",
      "contentRevision": 1,
      "stem": "编辑收到一句待校对文字：“《资治通鉴》是纪传体通史。”保持书名不变，只纠正其中错误的分类字段，应怎样修改？",
      "options": [
        "只把“通史”改为“断代史”",
        "删去“通史”，保留“纪传体”",
        "同时改为“编年体断代史”",
        "只把“纪传体”改为“编年体”"
      ],
      "answer": 3,
      "optionReviews": [
        "原句错误在纪传体，通史本来正确；这样既保留旧错又引入新错。",
        "删除正确字段而保留错误字段，不构成有效校对。",
        "修正了体例，却将正确的通史误改为断代史。",
        "《资治通鉴》的组织体例应为编年体，范围通史应保留。"
      ],
      "explanation": "《资治通鉴》的组织体例应为编年体，范围通史应保留。",
      "trainingStage": "迁移运用",
      "trainingGoal": "逐字段校对，不连带改坏正确信息",
      "graphic": null,
      "materialIds": [],
      "reviewNotes": [],
      "meta": {
        "module": "常识判断",
        "type": "史书体例",
        "trainingStage": "迁移运用",
        "trainingGoal": "逐字段校对，不连带改坏正确信息",
        "knowledgeIds": [
          "historiography",
          "historiography/minimal-correction"
        ],
        "tags": [
          "史书体例",
          "历史范围",
          "证据边界"
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
        "purpose": "原创教学练习；分层是学习目标，不是测量难度、官方考频或分数预测。",
        "source": {
          "kind": "original",
          "title": "常识两课分层原创候选 v0.36",
          "url": null,
          "referenceIds": [
            "shiji-record",
            "tongjian-record",
            "hanshu-record"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、逐项解析独立编写；来源仅支持相应基础事实，不转载教材、古籍或第三方题目。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "basis": "2026-11-05 独立编辑逐题检查候选答案唯一性、四项解析、物态条件与史书两维分类；对六道提高题作提示线索定向修订后再逐项复核。不是专家认证、独立盲审或考生试测，未做难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "c36-history-05",
      "lesson": "historiography",
      "contentRevision": 1,
      "stem": "只比较本课的《史记》《资治通鉴》《汉书》。甲集合收录其中的纪传体史书，乙集合收录其中的通史。甲、乙集合共同包含的是：",
      "options": [
        "仅《史记》",
        "《史记》和《资治通鉴》",
        "仅《汉书》",
        "《史记》和《汉书》"
      ],
      "answer": 0,
      "optionReviews": [
        "《史记》同时是纪传体和通史；其余两书各只符合一个条件。",
        "《史记》符合两个条件；《资治通鉴》虽为通史，却不是纪传体。",
        "《汉书》满足纪传体，却不满足通史，不能进入交集。",
        "《汉书》不能通过通史条件，不能仅检查甲集合就算进交集。"
      ],
      "explanation": "《史记》同时是纪传体和通史；其余两书各只符合一个条件。",
      "trainingStage": "迁移运用",
      "trainingGoal": "把两个分类条件同时应用于同一对象",
      "graphic": null,
      "materialIds": [],
      "reviewNotes": [],
      "meta": {
        "module": "常识判断",
        "type": "史书体例",
        "trainingStage": "迁移运用",
        "trainingGoal": "把两个分类条件同时应用于同一对象",
        "knowledgeIds": [
          "historiography",
          "historiography/intersection-mapping"
        ],
        "tags": [
          "史书体例",
          "历史范围",
          "证据边界"
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
        "purpose": "原创教学练习；分层是学习目标，不是测量难度、官方考频或分数预测。",
        "source": {
          "kind": "original",
          "title": "常识两课分层原创候选 v0.36",
          "url": null,
          "referenceIds": [
            "shiji-record",
            "tongjian-record",
            "hanshu-record"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、逐项解析独立编写；来源仅支持相应基础事实，不转载教材、古籍或第三方题目。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "basis": "2026-11-05 独立编辑逐题检查候选答案唯一性、四项解析、物态条件与史书两维分类；对六道提高题作提示线索定向修订后再逐项复核。不是专家认证、独立盲审或考生试测，未做难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "c36-history-06",
      "lesson": "historiography",
      "contentRevision": 1,
      "stem": "一份匿名史书介绍只说：“书中有许多人物事迹，也写到不少具体年份。”没有说明全书的目录和主要编排方式。仅据这两条信息，正确判断是：",
      "options": [
        "人物事迹多，可以确定为纪传体",
        "具体年份多，可以确定为编年体",
        "尚不能确定全书体例，应继续查看主要编排方式",
        "同时出现人物和年份，可以确定为断代史"
      ],
      "answer": 2,
      "optionReviews": [
        "编年体也记述人物，人物出现次数不足以决定全书组织骨架。",
        "纪传体也可以交代年份，不能按年份出现次数判定编年体。",
        "两条介绍只是内容特征，没有给出主要组织方式；需目录、编纂说明等进一步依据。",
        "人物和年份的出现不说明全书覆盖的历史范围，不能推出断代史。"
      ],
      "explanation": "两条介绍只是内容特征，没有给出主要组织方式；需目录、编纂说明等进一步依据。",
      "trainingStage": "迁移运用",
      "trainingGoal": "不把局部内容特征误当全书组织方式",
      "graphic": null,
      "materialIds": [],
      "reviewNotes": [],
      "meta": {
        "module": "常识判断",
        "type": "史书体例",
        "trainingStage": "迁移运用",
        "trainingGoal": "不把局部内容特征误当全书组织方式",
        "knowledgeIds": [
          "historiography",
          "historiography/content-versus-structure"
        ],
        "tags": [
          "史书体例",
          "历史范围",
          "证据边界"
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
        "purpose": "原创教学练习；分层是学习目标，不是测量难度、官方考频或分数预测。",
        "source": {
          "kind": "original",
          "title": "常识两课分层原创候选 v0.36",
          "url": null,
          "referenceIds": [
            "shiji-record",
            "tongjian-record",
            "hanshu-record"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、逐项解析独立编写；来源仅支持相应基础事实，不转载教材、古籍或第三方题目。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "basis": "2026-11-05 独立编辑逐题检查候选答案唯一性、四项解析、物态条件与史书两维分类；对六道提高题作提示线索定向修订后再逐项复核。不是专家认证、独立盲审或考生试测，未做难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "c36-history-07",
      "lesson": "historiography",
      "contentRevision": 2,
      "stem": "学习小组从《资治通鉴》中原样节选若干相邻年份的文字，未重新编排，并把文件命名为“某时期史事摘读”。关于原书，哪项判断成立？",
      "options": [
        "编年体断代史；按节选范围重定原书范围",
        "编年体通史；按原书整体确定两个标签",
        "纪传体通史；按节选人物重定原书体例",
        "纪传体断代史；按学习文件重定两个标签"
      ],
      "answer": 1,
      "optionReviews": [
        "编年体标签正确，但把节选的较窄范围转移给原书，错误地将通史改为断代史。",
        "题目问的是《资治通鉴》原书，其分类为编年体通史；局部节选和学习文件名称都没有改变原书整体。",
        "通史标签正确，但一段人物叙事不改变全书依时间组织的方式，原书不是纪传体。",
        "新建学习文件不等于重新编写原书，不能据此把原书的组织方式和历史范围两个标签一起改掉。"
      ],
      "explanation": "题目问的是《资治通鉴》原书，其分类为编年体通史；局部节选和学习文件名称都没有改变原书整体。",
      "trainingStage": "检查边界",
      "trainingGoal": "保持全书和节选两个对象的边界",
      "graphic": null,
      "materialIds": [],
      "reviewNotes": [],
      "meta": {
        "module": "常识判断",
        "type": "史书体例",
        "trainingStage": "检查边界",
        "trainingGoal": "保持全书和节选两个对象的边界",
        "knowledgeIds": [
          "historiography",
          "historiography/excerpt-object"
        ],
        "tags": [
          "史书体例",
          "历史范围",
          "证据边界"
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
        "purpose": "原创教学练习；分层是学习目标，不是测量难度、官方考频或分数预测。",
        "source": {
          "kind": "original",
          "title": "常识两课分层原创候选 v0.36",
          "url": null,
          "referenceIds": [
            "shiji-record",
            "tongjian-record",
            "hanshu-record"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、逐项解析独立编写；来源仅支持相应基础事实，不转载教材、古籍或第三方题目。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "basis": "2026-11-05 独立编辑逐题检查候选答案唯一性、四项解析、物态条件与史书两维分类；对六道提高题作提示线索定向修订后再逐项复核。不是专家认证、独立盲审或考生试测，未做难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "c36-history-08",
      "lesson": "historiography",
      "contentRevision": 2,
      "stem": "某匿名教学材料按年份先后编排史事，并且只记载某一个朝代的历史。按本课给定的两维简化分类，仅据上述信息，哪项判断充分且不过度？",
      "options": [
        "编年体通史；真实书名和作者仍未确定",
        "纪传体断代史；可认作《汉书》",
        "编年体断代史；可认作《资治通鉴》",
        "编年体断代史；书名作者尚不明"
      ],
      "answer": 3,
      "optionReviews": [
        "按年份编排支持编年体，但只记一个朝代在本课简化分类下支持断代史；书名作者未定的谨慎措辞不能补救范围判断错误。",
        "断代史判断符合给定范围，但按年份编排不是本题的纪传体；相同的单朝范围也不足以唯一认出《汉书》。",
        "两个分类标签正确，但不能据此唯一认书；《资治通鉴》在本课已核为编年体通史，也不符合题设的断代范围。",
        "按年份编排和单朝范围分别支持编年体、断代史；材料没有提供足以唯一认定书名或作者的信息。"
      ],
      "explanation": "按年份编排和单朝范围分别支持编年体、断代史；材料没有提供足以唯一认定书名或作者的信息。",
      "trainingStage": "检查边界",
      "trainingGoal": "分类信息足够时作分类，不多认书名或作者",
      "graphic": null,
      "materialIds": [],
      "reviewNotes": [],
      "meta": {
        "module": "常识判断",
        "type": "史书体例",
        "trainingStage": "检查边界",
        "trainingGoal": "分类信息足够时作分类，不多认书名或作者",
        "knowledgeIds": [
          "historiography",
          "historiography/anonymous-classification"
        ],
        "tags": [
          "史书体例",
          "历史范围",
          "证据边界"
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
        "purpose": "原创教学练习；分层是学习目标，不是测量难度、官方考频或分数预测。",
        "source": {
          "kind": "original",
          "title": "常识两课分层原创候选 v0.36",
          "url": null,
          "referenceIds": [
            "shiji-record",
            "tongjian-record",
            "hanshu-record"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、逐项解析独立编写；来源仅支持相应基础事实，不转载教材、古籍或第三方题目。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "basis": "2026-11-05 独立编辑逐题检查候选答案唯一性、四项解析、物态条件与史书两维分类；对六道提高题作提示线索定向修订后再逐项复核。不是专家认证、独立盲审或考生试测，未做难度标定。"
        },
        "methodIds": []
      }
    },
    {
      "id": "c36-history-09",
      "lesson": "historiography",
      "contentRevision": 2,
      "stem": "有人读完本课后说：“《史记》既是通史，就应当记录过去每个时代的所有事情；只要没写某件事，就说明那件事没有发生。”这一推断的主要问题是：",
      "options": [
        "把范围标签等同于穷尽记录，并由未载否定发生",
        "把纪传体误认成编年体，才会要求逐年记全史事",
        "把纪传体误认作通史，才会要求该书交代事件",
        "把断代史误认作通史，才会把未记载视为未发生"
      ],
      "answer": 0,
      "optionReviews": [
        "通史是历史范围标签，不承诺穷尽全部史事；未记载也不能单独证明某件事未发生，因此两步推断都缺少依据。",
        "原话没有把《史记》改判为编年体；无论采用哪种组织体例，都不能由标签推出史事记录穷尽。",
        "纪传体与通史属于不同分类维度，可以同时用于描述《史记》；两者并不互斥，问题不在这一所谓误认。",
        "《史记》本来就是通史，原话并未误把断代史认作通史；即使是断代史，也不能单凭未记载认定未发生。"
      ],
      "explanation": "通史是历史范围标签，不承诺穷尽全部史事；未记载也不能单独证明某件事未发生，因此两步推断都缺少依据。",
      "trainingStage": "检查边界",
      "trainingGoal": "区分范围分类、记录完整性与事件真伪",
      "graphic": null,
      "materialIds": [],
      "reviewNotes": [],
      "meta": {
        "module": "常识判断",
        "type": "史书体例",
        "trainingStage": "检查边界",
        "trainingGoal": "区分范围分类、记录完整性与事件真伪",
        "knowledgeIds": [
          "historiography",
          "historiography/coverage-not-exhaustiveness"
        ],
        "tags": [
          "史书体例",
          "历史范围",
          "证据边界"
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
        "purpose": "原创教学练习；分层是学习目标，不是测量难度、官方考频或分数预测。",
        "source": {
          "kind": "original",
          "title": "常识两课分层原创候选 v0.36",
          "url": null,
          "referenceIds": [
            "shiji-record",
            "tongjian-record",
            "hanshu-record"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题干、选项、逐项解析独立编写；来源仅支持相应基础事实，不转载教材、古籍或第三方题目。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-05",
          "basis": "2026-11-05 独立编辑逐题检查候选答案唯一性、四项解析、物态条件与史书两维分类；对六道提高题作提示线索定向修订后再逐项复核。不是专家认证、独立盲审或考生试测，未做难度标定。"
        },
        "methodIds": []
      }
    }
  ],
  "sourceReview": [
    {
      "sourceId": "phase",
      "url": "https://openstax.org/books/physics/pages/11-3-phase-change-and-latent-heat",
      "result": "本轮读到公开正文；支持六种物态变化方向、相变吸放热、特定条件下相变恒温和热量与质量、条件有关。只取基础事实并独立编写中文，不复制原文例题、插图或表格。",
      "readDate": "2026-11-05"
    },
    {
      "sourceId": "shiji-record",
      "url": "https://zjt.hubei.gov.cn/bmdt/ztzl/hbcjda/dayd/201910/t20191028_81884.shtml",
      "result": "本轮正文可读，支持《史记》为纪传体通史。保留基础分类，不扩写原文历史细节。",
      "readDate": "2026-11-05"
    },
    {
      "sourceId": "hanshu-record",
      "url": "https://chn-las.nlc.cn/zyfw/stzy/djjs/f72140e39ec2478d86302712afc24fe4.htm",
      "result": "本轮简介可读，支持《汉书》为纪传体断代史。未下载或复制页面视频、影像；不扩写卷数或断限。",
      "readDate": "2026-11-05"
    },
    {
      "sourceId": "tongjian-record",
      "url": "https://zgjjjc.ccdi.gov.cn/bqml/bqxx/201801/t20180108_161270.html",
      "result": "本轮正文读取返回重定向循环，未反复重试。沿用同日主站既有检索核验记录中的编年体通史基础对应，不声称本轮读通全文，不新增作者分工、年代或版本事实。",
      "readDate": "2026-11-05",
      "status": "existing-check-retained-current-fetch-failed"
    }
  ],
  "limits": [
    "不是历年真题、官方完整大纲或考频排序。",
    "三层为教学目标，不是客观难度；难度字段全部为null。",
    "原候选已做独立逐题内容审校；定向修订由修订作者再次逐项复核，不声称独立盲审、专家审题或实测效度。",
    "没有修改主站、安装依赖、部署或线上浏览器验收。"
  ],
  "targetSnapshots": {
    "phase-change": {
      "id": "phase-change",
      "category": "常识判断",
      "title": "生活物理：物态变化与吸放热",
      "subtitle": "先看变化前后是什么状态。",
      "minutes": 7,
      "tags": [
        "科学常识",
        "物态变化"
      ],
      "formula": "固→液：熔化；液→气：汽化；固→气：升华",
      "sections": [
        [
          "先辨方向",
          "常见条件下，熔化、汽化、升华需要吸热；反向的凝固、液化、凝华释放热量。学习以普通水等日常物质为背景，不把简表扩展为所有极端物态的结论。"
        ],
        [
          "两组易混",
          "气态直接变固态叫凝华，液态变固态叫凝固；固态直接变气态叫升华，液态变气态叫汽化。判别依据是起点和终点，不能只看是否“变冷”。"
        ],
        [
          "生活例子",
          "水蒸气遇冷形成液滴属于液化；湿衣服逐渐变干涉及蒸发；冰吸热变成水属于熔化。题干若明确“水蒸气直接变成冰晶”，则判断凝华。"
        ],
        [
          "温度陷阱",
          "相变时热量也可用于改变物态，因此吸热不一定立即升温。例如在一定条件下，纯物质处于熔化过程时可保持温度不变。不要将“吸热”和“温度升高”写成无条件等价。"
        ],
        [
          "做题步骤",
          "用箭头写出两种物态 → 匹配变化名称 → 再判断热量方向 → 检查是否给了压力、纯物质或其他条件。"
        ]
      ],
      "practice": [
        "q51",
        "q52"
      ],
      "sources": [
        "phase"
      ],
      "updated": "2026-11-05",
      "basis": "公开知识整理"
    },
    "historiography": {
      "id": "historiography",
      "category": "常识判断",
      "title": "史书辨析：体例与时间范围分两栏记",
      "subtitle": "纪传、编年，通史、断代史，是两组不同问题。",
      "minutes": 8,
      "tags": [
        "史记",
        "资治通鉴",
        "汉书"
      ],
      "formula": "组织方式看体例；跨越范围看通史或断代史。",
      "sections": [
        [
          "两个维度不要混",
          "纪传体以人物传记等为组织骨架，编年体依时间先后叙事；通史贯通较长历史，断代史集中于一个朝代或特定时代。体例和时间范围可以组合，不是只能四选一。"
        ],
        [
          "两部通史作对照",
          "司马迁《史记》是纪传体通史；司马光及其助手编写的《资治通鉴》是编年体通史。记住“同为通史，组织方式不同”，比只记一串作者书名更不容易混。"
        ],
        [
          "再加一个断代史样本",
          "《汉书》属于纪传体断代史。它和《史记》有共同的体例特征，却不能因此说两者都是通史。这里仅核对体例，不展开各篇作者分工、版本和断限争议。"
        ],
        [
          "排除题的步骤",
          "先分别标出作者、体例、范围三个字段；一个字段错就能排除整项。例如把《资治通鉴》说成纪传体，即使作者正确，整项也不成立。"
        ],
        [
          "自测办法",
          "合上讲义，画两列：“以什么组织”“主要覆盖怎样的时段”。先写体例，再写书名做例证。不要把“史书写了人物”误当作“它必是纪传体”。"
        ]
      ],
      "practice": [
        "q58",
        "q59",
        "q60"
      ],
      "sources": [
        "shiji-record",
        "tongjian-record",
        "hanshu-record"
      ],
      "updated": "2026-11-05",
      "basis": "公开事实整理与独立学习方法"
    }
  },
  "contentSha256": "9d9bf5649bc30d75032f6d48c02e503975753073c73f79a291cccb4bef2f6191"
};

  const C=window.STUDY_CONTENT;
  if(!C||!Array.isArray(C.lessons)||!Array.isArray(C.questions)) throw new Error('c36 needs the existing STUDY_CONTENT');
  const canonical=o=>o===null||typeof o!=='object'?JSON.stringify(o):Array.isArray(o)?'['+o.map(canonical).join(',')+']':'{'+Object.keys(o).sort().map(k=>JSON.stringify(k)+':'+canonical(o[k])).join(',')+'}';
  const fail=[],check=(ok,message)=>{if(!ok)fail.push(message);};
  const oldQuestions=new Set(C.questions.map(q=>q.id)),newQuestions=new Set(),patches=new Map(data.lessonPatches.map(l=>[l.id,l]));
  const norm=s=>s.normalize('NFKC').replace(/[\p{P}\p{Z}\s]/gu,'');
  const stems=new Set(C.questions.map(q=>norm(q.stem)));
  check(patches.size===data.lessonPatches.length,'duplicate lesson patches');
  for(const patch of data.lessonPatches){
    const original=C.lessons.find(l=>l.id===patch.id);
    check(Boolean(original),'unknown lesson '+patch.id);
    check(original&&!original.learningLevels,'target already layered '+patch.id);
    check(canonical(original)===canonical(data.targetSnapshots[patch.id]),'target lesson changed since baseline '+patch.id);
    check(!(C.theoryLearningAids||{})[patch.id],'learning aid conflict '+patch.id);
    check(patch.sections.length===9,'expected nine sections '+patch.id);
    check(Object.keys(patch.learningLevels).length===3,'expected three paths '+patch.id);
    for(const [key,guide] of Object.entries(patch.learningLevels)){
      check(C.learningPaths?.[key]?.stage===guide.stage,'unknown stage '+patch.id+'/'+key);
      check(guide.questionIds.length===3,'expected three questions per path '+patch.id+'/'+key);
      check(guide.sections.length===3&&guide.sections.every(n=>Number.isInteger(n)&&patch.sections[n]),'invalid section references '+patch.id+'/'+key);
      check(guide.questionIds.every(id=>data.questions.some(q=>q.id===id&&q.lesson===patch.id&&q.trainingStage===guide.stage)),'invalid question path '+patch.id+'/'+key);
    }
  }
  for(const q of data.questions){
    check(!oldQuestions.has(q.id)&&!newQuestions.has(q.id),'question ID conflict '+q.id);newQuestions.add(q.id);
    check(!stems.has(norm(q.stem)),'duplicate normalized stem '+q.id);stems.add(norm(q.stem));
    check(patches.has(q.lesson),'unknown patched lesson '+q.id);
    check(q.options.length===4&&new Set(q.options).size===4&&q.optionReviews.length===4,'invalid options '+q.id);
    check(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4&&q.explanation===q.optionReviews[q.answer],'invalid answer '+q.id);
    check(q.meta.source.kind==='original'&&q.meta.difficulty.level===null&&q.meta.examSource.year===null,'invalid provenance '+q.id);
    check(q.meta.source.referenceIds.every(id=>C.sources[id]),'unresolved source '+q.id);
  }
  if(fail.length) throw new Error('c36 candidate rejected:\n'+fail.join('\n'));
  // All guards precede allocation of the replacement public object. No old object is mutated.
  const lessons=C.lessons.map(original=>{
    const patch=patches.get(original.id);if(!patch)return original;
    const added=data.questions.filter(q=>q.lesson===original.id).map(q=>q.id);
    return {...original,...patch,practice:[...original.practice,...added]};
  });
  window.STUDY_CONTENT={...C,lessons,questions:[...C.questions,...data.questions],theoryLearningAids:{...(C.theoryLearningAids||{}),...data.learningAids}};

})();
