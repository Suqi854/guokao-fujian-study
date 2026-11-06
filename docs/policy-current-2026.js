"use strict";
// Additive source-checked policy lessons. No storage, migrations or network requests.
(() => {
 const B={
  "packageId": "recent-policy-verified-20261106",
  "status": "source-reviewed",
  "checked": "2026-11-06",
  "scope": "2025年二十届四中全会、国家十五五纲要、2026年全国与福建政府工作报告重点；未覆盖全年时政和全部配套政策。",
  "sources": {
    "fourth-plenum-communique-2025": {
      "title": "中国共产党第二十届中央委员会第四次全体会议公报",
      "publisher": "生态环境部转载中国政府网；同心县委组织部转载新华社交叉核对",
      "year": "2025-10-23通过并发布；会议2025-10-20至23日",
      "url": "https://www.mee.gov.cn/ywdt/szyw/202510/t20251023_1130680.shtml",
      "verificationUrl": "https://txdjw.gov.cn/txdjwztt/202510/t20251023_5071688.html",
      "scope": "核会议与建议关系、十五五定位、指导思想、六项原则、七方面目标；不把公报当作2026正式规划全文。",
      "checked": "2026-11-06"
    },
    "national-plan15-official-2026": {
      "title": "中华人民共和国国民经济和社会发展第十五个五年规划纲要",
      "publisher": "北京市人大常委会转载新华社受权发布正式全文",
      "year": "2026-03-12批准；2026-03-13受权发布；承载网页2026-03-14",
      "url": "https://www.bjrd.gov.cn/zyfb/zt/14jqgrd04chybjdbthdztbd/wjbg/202603/t20260314_4557219.html",
      "scope": "核2026—2030年、目录18篇62章、前言、第二章指导方针与第三章目标所选段落；不称已逐段审读全篇实施细则或全部表图。",
      "checked": "2026-11-06"
    },
    "national-plan15-release-2026": {
      "title": "新华社受权播发“十五五”规划纲要",
      "publisher": "国家林业和草原局转载新华社",
      "year": "受权发布2026-03-13；承载网页2026-03-14",
      "url": "https://www.forestry.gov.cn/lyj/1/szxx/20260314/663253.html",
      "scope": "核3月12日批准、3月13日正式发布、18篇结构。",
      "checked": "2026-11-06",
      "verificationUrl": "https://app.xinhuanet.com/news/article.html?articleId=5869aa20216f25c9ff93dca4a70e7b4b"
    },
    "national-report-official-2026": {
      "title": "政府工作报告（2026年）",
      "publisher": "工业和信息化部转载新华社正式发布文本",
      "year": "2026-03-05作报告；2026-03-12批准；2026-03-13受权发布；承载网页2026-03-14",
      "url": "https://wap.miit.gov.cn/xwfb/szyw/art/2026/art_a0f73af7d13b44b080ae9b71903939af.html",
      "scope": "核四部分结构、2026年度预期目标、财政货币取向、四稳、实体经济与教育科技人才等指定段；报告中追述的纲要草案不能替代已发布正式纲要。",
      "checked": "2026-11-06"
    },
    "national-report-release-2026": {
      "title": "新华社受权播发《政府工作报告》",
      "publisher": "国家林业和草原局转载新华社",
      "year": "2026-03-13",
      "url": "https://www.forestry.gov.cn/lyj/1/2026lhjj/20260313/663249.html",
      "scope": "核3月12日批准、3月13日受权全文发布及年度主要预期目标。",
      "checked": "2026-11-06"
    },
    "fujian-report-official-2026": {
      "title": "2026年福建省人民政府工作报告",
      "publisher": "福建省人民政府门户网站，来源福建日报",
      "year": "2026-01-27在福建省十四届人大四次会议上作报告；网页2026-02-06",
      "url": "https://fj.gov.cn/zwgk/ghjh/gzjh/202602/t20260206_7090239.htm",
      "scope": "核报告日期、2026年度预期目标、机制活产业优百姓富生态美、第三部分所选任务；不把其介绍的省纲要草案当正式省规划，不据报告证明截至今日的实施成效。",
      "checked": "2026-11-06"
    },
    "six-principles-2023": {
      "title": "六个必须坚持",
      "publisher": "共产党员网学习词条",
      "year": "2023-11-28承载网页；说明二十大报告提出的科学方法",
      "url": "https://www.12371.cn/2023/11/28/STUD1701138144532887.shtml",
      "scope": "核六项名称与世界观方法论定位。与站内同ID来源一致，可复用而非覆盖旧对象。",
      "checked": "2026-11-06"
    },
    "reform-decision-2024": {
      "title": "中共中央关于进一步全面深化改革、推进中国式现代化的决定",
      "publisher": "生态环境部转载中国政府网",
      "year": "2024-07-18通过；2024-07-21公开",
      "url": "https://www.mee.gov.cn/zcwj/zyygwj/202407/t20240721_1082070.shtml",
      "scope": "本包仅核第一部分第4项六项原则供跨组辨析。与站内同ID来源一致，可复用而非覆盖旧对象。",
      "checked": "2026-11-06"
    }
  },
  "lessons": [
    {
      "id": "policy-fourth-plenum-2025",
      "category": "政治理论",
      "title": "二十届四中全会与十五五原则",
      "subtitle": "分清规划建议、六项原则和七方面目标。",
      "minutes": 25,
      "tags": [
        "二十届四中全会",
        "十五五",
        "原则辨析",
        "2025指定文本"
      ],
      "formula": "先问哪份文本 → 再记中心、主题、动力、目的、保障 → 用原则解释具体关系。",
      "sources": [
        "fourth-plenum-communique-2025",
        "six-principles-2023",
        "reform-decision-2024",
        "national-plan15-release-2026"
      ],
      "updated": "2026-11-06",
      "versionNote": "依据2025年10月23日四中全会公报；核验于2026年11月6日。",
      "sections": [
        [
          "入门：会议与文件",
          "二十届四中全会于2025年10月20日至23日在北京举行，审议通过《中共中央关于制定国民经济和社会发展第十五个五年规划的建议》。全会通过的是规划建议；国家规划纲要随后由全国人大批准，两份文件的程序和作用不同。"
        ],
        [
          "入门：十五五的时间与定位",
          "十五五是2026—2030年，是基本实现社会主义现代化夯实基础、全面发力的关键时期，具有承前启后的重要地位。2030年是本规划期末，2035年是基本实现社会主义现代化的目标节点。"
        ],
        [
          "入门：指导思想的五个对应",
          "中心是经济建设，主题是推动高质量发展，根本动力是改革创新，根本目的是满足人民日益增长的美好生活需要，根本保障是全面从严治党。可用“经—质—改—民—党”提示顺序，但回答时须恢复完整表述。"
        ],
        [
          "巩固：六项原则",
          "坚持党的全面领导、坚持人民至上、坚持高质量发展、坚持全面深化改革、坚持有效市场和有为政府相结合、坚持统筹发展和安全。按“领导与人民、发展与改革、市场政府与安全”分组有助于记忆，分组不是另设三项原则。"
        ],
        [
          "巩固：三组六项怎样区分",
          "二十大报告的六个必须坚持讲世界观和方法论；2024年三中全会决定的六项原则讲进一步全面深化改革；2025年四中全会的六项原则讲十五五经济社会发展。世界观方法论有“自信自立、胸怀天下”，改革原则有“以制度建设为主线、全面依法治国”，十五五原则有“有效市场和有为政府相结合、统筹发展和安全”。固定列举题先认文件。"
        ],
        [
          "巩固：市场与政府怎样配合",
          "市场在资源配置中起决定性作用，更好发挥政府作用。虚构园区取消不合理准入门槛，同时依法监管安全、提供公共服务，两类动作可以协同。市场有效不等于不需要规则，政府有为也不等于包办企业经营。"
        ],
        [
          "提升：发展与安全怎样统筹",
          "在发展中固安全，在安全中谋发展。虚构山区文旅项目既分析就业机会，也核查生态承载、地质风险和救援条件。统筹不是拒绝一切风险，也不是只看收益；要说明安全条件怎样支持持续发展。"
        ],
        [
          "提升：七方面主要目标",
          "高质量发展取得显著成效；科技自立自强水平大幅提高；进一步全面深化改革取得新突破；社会文明程度明显提升；人民生活品质不断提高；美丽中国建设取得新的重大进展；国家安全屏障更加巩固。这是目标清单，不能改写成已经全部实现的结果。"
        ],
        [
          "提升：把部署接回理论",
          "现代化产业体系以实体经济为着力点、先进制造业为骨干，强调智能化、绿色化、融合化；科技自立自强联系教育科技人才一体发展；强大国内市场联系扩大内需、消费投资和供需互动。分析一段材料时，先找它解决的问题，再选最贴切的原理，不把所有名词堆在一起。"
        ]
      ],
      "questionType": "规划与年度政策",
      "basis": "所列官方文本的重点讲解与原创练习",
      "practice": [
        "policy26-01-01",
        "policy26-01-02",
        "policy26-01-03",
        "policy26-01-04",
        "policy26-01-05",
        "policy26-01-06"
      ],
      "learningGoals": [
        "区分会议通过的文件与指导思想五个对应。",
        "辨认三组六项原则，理解市场与政府的关系。",
        "区分目标与结果，说明发展与安全如何统筹。"
      ],
      "learningLevels": {
        "intro": {
          "label": "小白入门",
          "stage": "识别概念",
          "sections": [
            0,
            1,
            2
          ],
          "goal": "区分会议通过的文件与指导思想五个对应。",
          "questionIds": [
            "policy26-01-01",
            "policy26-01-02"
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
          "goal": "辨认三组六项原则，理解市场与政府的关系。",
          "questionIds": [
            "policy26-01-03",
            "policy26-01-04"
          ]
        },
        "advanced": {
          "label": "进阶提升",
          "stage": "检查边界",
          "sections": [
            6,
            7,
            8
          ],
          "goal": "区分目标与结果，说明发展与安全如何统筹。",
          "questionIds": [
            "policy26-01-05",
            "policy26-01-06"
          ]
        }
      }
    },
    {
      "id": "policy-plan15-official-2026",
      "category": "政治理论",
      "title": "十五五规划纲要：目标与任务",
      "subtitle": "从2026—2030年规划期理解产业、创新、民生与安全任务。",
      "minutes": 25,
      "tags": [
        "十五五正式纲要",
        "2026—2030",
        "政策层级",
        "目标与成效"
      ],
      "formula": "建议定方向 → 正式纲要作五年部署 → 年度安排推进落实 → 实际成效另找证据。",
      "sources": [
        "national-plan15-official-2026",
        "national-plan15-release-2026",
        "fourth-plenum-communique-2025",
        "national-report-official-2026"
      ],
      "updated": "2026-11-06",
      "versionNote": "国家纲要2026年3月12日批准、3月13日受权发布；核验于2026年11月6日。",
      "sections": [
        [
          "入门：建议、纲要、年度报告",
          "党的规划建议提出方向，国家规划纲要明确五年发展的目标和任务，政府工作报告部署年度工作。国家十五五纲要根据党的规划建议编制，主要阐明国家战略意图、明确政府工作重点、引导规范社会主体行为。"
        ],
        [
          "入门：批准、发布与转载",
          "十四届全国人大四次会议于2026年3月12日批准国家十五五规划纲要，新华社3月13日受权发布全文。某网站3月14日转载并不改变前两个日期。3月5日报告中的“纲要草案”指当时提交审查的文本状态。"
        ],
        [
          "入门：规划期与远景目标",
          "规划期为2026—2030年。GDP增长保持在合理区间、各年度视情提出；到2035年人均GDP比2020年翻一番、达到中等发达国家水平。年度目标、五年安排、2035年远景不是同一时间范围。"
        ],
        [
          "巩固：18篇62章的任务地图",
          "纲要共18篇62章。第1篇总论；第2—4篇产业、科技、数字中国；第5—7篇国内市场、经济体制、对外开放；第8—10篇农业农村、区域、文化；第11—13篇人口、民生、绿色转型；第14—18篇安全、国防、民主法治、祖国统一与实施保障。分组用于检索，篇章名称以原文为准。"
        ],
        [
          "巩固：发展与创新目标",
          "GDP增速按年度视情提出，不设五年各年相同的固定值。全社会研发经费投入年均增长7%以上，强调投入的增长；它不是“研发投入占GDP的比重为7%”。产业、科技、教育人才相互支撑，但设备投资不能替代人才培养和成果转化。"
        ],
        [
          "巩固：民生目标的口径",
          "城镇调查失业率低于5.5%；居民收入增长和经济增长同步、劳动报酬提高和劳动生产率提高同步；劳动年龄人口平均受教育年限提高到11.7年；人均预期寿命提高到80岁。不同指标分别描述就业、分配、教育和健康，不能互换对象或单位。"
        ],
        [
          "提升：绿色与安全目标",
          "单位GDP二氧化碳排放降低17%，是五年规划期累计目标，不是每年降低17%；粮食综合生产能力达到1.45万亿斤左右，能源综合生产能力达到58亿吨标准煤。生产能力不等于某年实际产量，二氧化碳排放强度不等于二氧化碳排放总量。"
        ],
        [
          "提升：国内循环与开放",
          "建设强大国内市场和扩大高水平对外开放分别设篇，并非二选一。提振消费、扩大有效投资、建设全国统一大市场有助于畅通国内循环；开放合作连接全球要素和市场资源。做强国内大循环不等于关闭国际循环。"
        ],
        [
          "提升：目标、任务、项目与成效",
          "目标说明要达到什么，任务说明推进哪些工作，项目是具体抓手，成效要看执行和结果证据。虚构地区新建校舍，还需配置师资、课程和使用安排，才能评价教育服务是否改善。列入规划、开工、建成、有效使用是不同阶段。"
        ]
      ],
      "questionType": "规划与年度政策",
      "basis": "所列官方文本的重点讲解与原创练习",
      "practice": [
        "policy26-02-01",
        "policy26-02-02",
        "policy26-02-03",
        "policy26-02-04",
        "policy26-02-05",
        "policy26-02-06"
      ],
      "learningGoals": [
        "识别纲要批准发布日期、规划期与年度目标。",
        "解释研发、就业、教育和健康指标的口径。",
        "区分五年与年度指标，并按证据判断项目成效。"
      ],
      "learningLevels": {
        "intro": {
          "label": "小白入门",
          "stage": "识别概念",
          "sections": [
            0,
            1,
            2
          ],
          "goal": "识别纲要批准发布日期、规划期与年度目标。",
          "questionIds": [
            "policy26-02-01",
            "policy26-02-02"
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
          "goal": "解释研发、就业、教育和健康指标的口径。",
          "questionIds": [
            "policy26-02-03",
            "policy26-02-04"
          ]
        },
        "advanced": {
          "label": "进阶提升",
          "stage": "检查边界",
          "sections": [
            6,
            7,
            8
          ],
          "goal": "区分五年与年度指标，并按证据判断项目成效。",
          "questionIds": [
            "policy26-02-05",
            "policy26-02-06"
          ]
        }
      }
    },
    {
      "id": "policy-national-report-2026",
      "category": "政治理论",
      "title": "2026年全国政府工作报告",
      "subtitle": "区分年度目标、宏观政策与工作任务。",
      "minutes": 25,
      "tags": [
        "2026全国报告",
        "宏观政策",
        "年度目标",
        "政策工具"
      ],
      "formula": "先分回顾与部署 → 目标带限定词 → 政策分工具 → 任务说明机制。",
      "sources": [
        "national-report-official-2026",
        "national-report-release-2026",
        "national-plan15-official-2026"
      ],
      "updated": "2026-11-06",
      "versionNote": "报告2026年3月5日作、3月12日批准、3月13日受权发布；年度目标不是实际完成值。",
      "sections": [
        [
          "入门：四部分对应三个时间层次",
          "报告包括2025年工作回顾、十五五时期主要目标和重大任务、2026年总体要求和政策取向、2026年政府工作任务。2025年结果、五年安排和2026年部署分别记。报告回顾2025年GDP增长5%，不能把它当作2026年实际增速。"
        ],
        [
          "入门：增长、就业与物价目标",
          "2026年经济增长预期为4.5%—5%，并在实际工作中努力争取更好结果；城镇调查失业率5.5%左右；城镇新增就业1200万人以上；居民消费价格涨幅2%左右。范围、左右、以上都是指标的一部分。"
        ],
        [
          "入门：收入、粮食与减排目标",
          "居民收入增长和经济增长同步；国际收支基本平衡；粮食产量1.4万亿斤左右；单位GDP二氧化碳排放降低3.8%左右。粮食产量与规划中的综合生产能力不同，单位GDP排放下降也不能直接换成排放总量下降。"
        ],
        [
          "巩固：财政与货币政策",
          "继续实施更加积极的财政政策、适度宽松的货币政策。财政主要看预算支出、税收和政府债券；货币主要看准备金率、政策利率和流动性。报告提出赤字率拟按4%左右安排、拟发行超长期特别国债1.3万亿元、拟安排地方政府专项债券4.4万亿元，不要把这些财政工具写成降准降息。"
        ],
        [
          "巩固：四稳与政策协同",
          "四稳是稳就业、稳企业、稳市场、稳预期。报告将经济政策和非经济政策、存量政策和增量政策纳入宏观政策取向一致性评估。就业、财政、金融、产业政策应同向发力，既支持当前运行，也通过改革疏通经济循环。"
        ],
        [
          "巩固：消费与投资联动",
          "建设强大国内市场要统筹促消费和扩投资。投资于物改善设施、设备等条件，投资于人增强人的能力和发展条件，两者紧密结合。虚构社区既改善服务设施，又培训服务人员并安排运营，比只建场所不配置服务更能回应实际需要。"
        ],
        [
          "提升：因地制宜发展新质生产力",
          "发展经济的着力点放在实体经济上，兼顾传统产业升级、新兴产业和未来产业。报告部署“人工智能+”、先进制造业与现代服务业融合。地区选择产业应看基础、人才、技术和应用场景，不能把新质生产力等同于到处复制同一热门行业。"
        ],
        [
          "提升：教育科技人才一体推进",
          "科技创新和产业创新深度融合，强调企业创新主体地位、中试验证和成果转化。教育科技人才一体发展重在规划、政策、资源和评价的衔接。虚构企业提出工艺难题、高校研究、中试验证再应用，体现链条协作，签署协议本身不等于转化成功。"
        ],
        [
          "提升：年度与五年指标对照",
          "2026年粮食产量预期1.4万亿斤左右，十五五纲要的粮食综合生产能力目标1.45万亿斤左右；2026年单位GDP二氧化碳排放降低3.8%左右，十五五规划期累计降低17%。比较数字前先核时间、对象和限定词，年度值不能直接替换五年值。"
        ]
      ],
      "questionType": "规划与年度政策",
      "basis": "所列官方文本的重点讲解与原创练习",
      "practice": [
        "policy26-03-01",
        "policy26-03-02",
        "policy26-03-03",
        "policy26-03-04",
        "policy26-03-05",
        "policy26-03-06"
      ],
      "learningGoals": [
        "掌握2026年全国预期目标及财政、货币政策取向。",
        "辨认财政与货币工具，准确列出四稳。",
        "结合地区条件解释新质生产力，区分回顾与年度预期。"
      ],
      "learningLevels": {
        "intro": {
          "label": "小白入门",
          "stage": "识别概念",
          "sections": [
            0,
            1,
            2
          ],
          "goal": "掌握2026年全国预期目标及财政、货币政策取向。",
          "questionIds": [
            "policy26-03-01",
            "policy26-03-02"
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
          "goal": "辨认财政与货币工具，准确列出四稳。",
          "questionIds": [
            "policy26-03-03",
            "policy26-03-04"
          ]
        },
        "advanced": {
          "label": "进阶提升",
          "stage": "检查边界",
          "sections": [
            6,
            7,
            8
          ],
          "goal": "结合地区条件解释新质生产力，区分回顾与年度预期。",
          "questionIds": [
            "policy26-03-05",
            "policy26-03-06"
          ]
        }
      }
    },
    {
      "id": "policy-fujian-report-2026",
      "category": "福建专题",
      "title": "2026年福建省政府工作报告",
      "subtitle": "对照全国目标，掌握福建的产业、治理、融合和协同重点。",
      "minutes": 25,
      "tags": [
        "福建",
        "2026省政府报告",
        "地方政策",
        "全国与地方"
      ],
      "formula": "同一政策主题 → 找福建条件与任务 → 保留本省数字 → 区分年度部署和落实成效。",
      "sources": [
        "fujian-report-official-2026",
        "national-report-release-2026"
      ],
      "updated": "2026-11-06",
      "versionNote": "依据2026年1月27日所作、2月6日公开的福建省政府工作报告；年度部署不替代现行办事规则。",
      "sections": [
        [
          "入门：报告的省份与年份",
          "报告于2026年1月27日在福建省十四届人大四次会议上作，2月6日在省政府门户网站公开。报告中的“今年”指2026年，“全省”指福建。它与全国报告方向衔接，但不是同一份文本，也不能互抄指标。"
        ],
        [
          "入门：新福建建设四个关键词",
          "机制活、产业优、百姓富、生态美。可分别联系改革开放、产业体系、人民生活、绿色发展。四者相互影响，例如产业升级既依赖机制创新，也要考虑生态约束和群众受益。"
        ],
        [
          "入门：福建2026年预期目标",
          "地区生产总值增长5%左右；城镇调查失业率控制在5%左右；城镇新增就业50万人；居民消费价格涨幅2%左右；居民收入增长与经济增长同步；粮食产量513万吨以上；完成国家下达的单位地区生产总值二氧化碳排放降低目标。GDP目标同时提出在实际工作中努力争取更好结果。"
        ],
        [
          "巩固：两创融合的四个着力点",
          "科技创新和产业创新深度融合，突出科技供给、企业主体、成果转化、一体推进。教育科技人才一体发展强调规划衔接、政策协同、资源统筹、评价联动。企业难题、科研攻关、中试验证和应用可以贯通，平台数量或合作协议不直接等于转化成效。"
        ],
        [
          "巩固：数字治理的办事链条",
          "报告部署“高效办成一件事”“数据最多采一次”“无证明省份”建设，推进政策事项一网公开、政务服务一网办事、行政执法一网监管、公共资源一网交易、省域治理一网统管。减少重复采集不等于取消必要资格核验，数据使用仍要守住职责与安全边界。"
        ],
        [
          "巩固：统一市场与营商环境",
          "融入全国统一大市场，要求破除地方保护、优化营商环境。企业服务“四通四到”等机制重在提高服务效率，不能解释为无条件补贴或绕开规则。虚构地方让办理更透明、跨部门衔接更顺畅，有助于降低制度性交易成本。"
        ],
        [
          "提升：闽台融合的三个样板",
          "社会融合侧重台胞求学就业、权益保障和社会参与；经济融合侧重产业合作、标准共通和共同市场；情感融合侧重文化交流、祖地联系和民间往来。三类相互交叉，报告还部署全域融合发展，不限于单个城市。"
        ],
        [
          "提升：山海协同与城乡共荣",
          "山海协作通过沿海山区对口协作、产业飞地和科创飞地等联系资源；城乡融合统筹产业、基础设施和公共服务；海上福建统筹海洋开发利用保护。分析协作项目要讲清谁提供技术、谁承接应用、收益如何形成，不能只写“优势互补”。"
        ],
        [
          "提升：全国与福建对照",
          "全国GDP预期4.5%—5%，福建5%左右；全国城镇调查失业率5.5%左右，福建控制在5%左右；全国新增就业1200万人以上，福建50万人。全国、地方的数字和限定词分别记。福建年度报告介绍省十五五纲要草案，不替代正式省纲要和后续具体政策。"
        ]
      ],
      "questionType": "规划与年度政策",
      "basis": "所列官方文本的重点讲解与原创练习",
      "practice": [
        "policy26-04-01",
        "policy26-04-02",
        "policy26-04-03",
        "policy26-04-04",
        "policy26-04-05",
        "policy26-04-06"
      ],
      "learningGoals": [
        "识别福建预期目标与新福建建设四个关键词。",
        "解释两创融合与数字治理中的具体关系。",
        "辨认闽台融合三类样板，比较全国与福建指标。"
      ],
      "learningLevels": {
        "intro": {
          "label": "小白入门",
          "stage": "识别概念",
          "sections": [
            0,
            1,
            2
          ],
          "goal": "识别福建预期目标与新福建建设四个关键词。",
          "questionIds": [
            "policy26-04-01",
            "policy26-04-02"
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
          "goal": "解释两创融合与数字治理中的具体关系。",
          "questionIds": [
            "policy26-04-03",
            "policy26-04-04"
          ]
        },
        "advanced": {
          "label": "进阶提升",
          "stage": "检查边界",
          "sections": [
            6,
            7,
            8
          ],
          "goal": "辨认闽台融合三类样板，比较全国与福建指标。",
          "questionIds": [
            "policy26-04-05",
            "policy26-04-06"
          ]
        }
      }
    }
  ],
  "memoryCards": {
    "policy-fourth-plenum-2025": {
      "cue": "先认题头：方法六项、改革六项、十五五六项，三组不互换。",
      "applies": "限定2025年二十届四中全会公报，同时与已学2022方法论、2024改革原则作对照。",
      "example": "‘有效市场和有为政府相结合’属于十五五经济社会发展原则；‘自信自立’属于六个必须坚持的世界观方法论清单。",
      "contrast": [
        [
          "六个必须坚持",
          "人民至上、自信自立、守正创新、问题导向、系统观念、胸怀天下；先认世界观方法论这一题头。"
        ],
        [
          "2024改革原则",
          "党的全面领导、以人民为中心、守正创新、以制度建设为主线、全面依法治国、系统观念。各项前均为‘坚持’。"
        ],
        [
          "十五五发展原则",
          "党的全面领导、人民至上、高质量发展、全面深化改革、有效市场和有为政府相结合、统筹发展和安全。各项前均为‘坚持’。"
        ]
      ],
      "avoid": "三组共有相近术语，不表示互相替代；口诀与分组只是辅助，不是官方的新清单。",
      "recall": {
        "intro": [
          "四中全会通过的是十五五‘建议’还是后来正式‘纲要’？",
          "2025年四中全会审议通过规划建议。正式国家纲要后来由十四届全国人大四次会议于2026年3月12日批准。"
        ],
        "practice": [
          "经济建设、高质量发展、改革创新、美好生活需要、全面从严治党，分别放在哪五个位置？",
          "中心、主题、根本动力、根本目的、根本保障。回答时恢复完整表述，不能互换。"
        ],
        "advanced": [
          "某选项把十五五六项原则中的‘高质量发展’换成‘自信自立’，其他内容不变，能成立吗？",
          "不能。自信自立属于六个必须坚持的指定清单；其重要性不等于可以替换另一文件的固定列举。"
        ]
      },
      "sourceIds": [
        "fourth-plenum-communique-2025",
        "six-principles-2023",
        "reform-decision-2024",
        "national-plan15-release-2026"
      ]
    },
    "policy-plan15-official-2026": {
      "cue": "建议看方向，纲要看五年，报告看当年，成效另取证。",
      "applies": "区分2025规划建议、2026正式国家纲要与年度部署。口诀是阅读辅助，不替代文本的全部功能。",
      "example": "2026年GDP预期目标不能直接复制成整个2026—2030年每年的固定目标。",
      "contrast": [
        [
          "2025-10-23",
          "四中全会通过规划建议。"
        ],
        [
          "2026-03-12 / 03-13",
          "国家纲要先获批准，后受权发布；两者不是同一日期。"
        ],
        [
          "2030 / 2035",
          "分别是十五五规划期末与基本实现社会主义现代化的目标节点。"
        ]
      ],
      "avoid": "3月5日仍称草案，不能据此说今日未有正式版；某转载网页晚一天也不改变批准日。",
      "recall": {
        "intro": [
          "十五五覆盖哪五年？正式纲要何时批准、何时受权发布？",
          "2026—2030年；2026年3月12日批准，3月13日受权发布。"
        ],
        "practice": [
          "十五五研发投入7%以上指增长率还是GDP占比？二氧化碳排放降低17%是哪段时间？",
          "研发经费投入年均增长7%以上，不是占GDP的比重；单位GDP二氧化碳排放降低17%是五年规划期累计目标。"
        ],
        "advanced": [
          "一个项目列入正式规划，能否据此断言已开工且达到效果？",
          "不能。列入规划、开工、完成和产生效果分别需要相应证据，不能把目标或安排当成结果。"
        ]
      },
      "sourceIds": [
        "national-plan15-official-2026",
        "national-plan15-release-2026",
        "fourth-plenum-communique-2025"
      ]
    },
    "policy-national-report-2026": {
      "cue": "数字先带年份，目标保留‘左右、以上、范围’；财政积极，货币适度宽松。",
      "applies": "2026年全国政府工作报告指定年度部署，不是全年实际统计或具体办事承诺。",
      "example": "‘2025年GDP增长5%’与‘2026年预期4.5%—5%’分别是回顾和目标，不矛盾也不能互换。",
      "contrast": [
        [
          "财政 / 货币",
          "更加积极的财政政策；适度宽松的货币政策。"
        ],
        [
          "四稳",
          "稳就业、稳企业、稳市场、稳预期。"
        ],
        [
          "目标 / 成效",
          "报告中的年度预期与后来实际完成值须分别记录。"
        ]
      ],
      "avoid": "不要把‘今年’理解为阅读时的任何年份；不要把部署出台某制度推断为截至今天尚未出台或已经出台。",
      "recall": {
        "intro": [
          "2026全国经济增长预期目标和两类宏观政策取向是什么？",
          "经济增长4.5%—5%，在实际工作中努力争取更好结果；继续实施更加积极的财政政策和适度宽松的货币政策。"
        ],
        "practice": [
          "降低准备金率与增加预算支出，分别主要对应哪类政策工具？",
          "前者属于货币政策工具，后者属于财政政策工具。两者可以协同，不能因都支持经济就当作同一类。"
        ],
        "advanced": [
          "报告回顾2025年增长5%，有人据此说2026全年也已增长5%，错在哪里？",
          "把上一年度实际回顾当成新年度实际结果，同时忽略2026报告给的是年度预期目标。应分别核年份和数据性质。"
        ]
      },
      "sourceIds": [
        "national-report-official-2026",
        "national-report-release-2026"
      ]
    },
    "policy-fujian-report-2026": {
      "cue": "全国与福建各放一栏，地方任务接产业、治理、融合、协同。",
      "applies": "2026福建省政府工作报告所选任务；不替代省十五五正式纲要或具体有效办事规则。",
      "example": "全国新增就业目标1200万人以上，福建为50万人；不可因为同一年就混写。",
      "contrast": [
        [
          "全国 / 福建GDP预期",
          "全国4.5%—5%；福建5%左右。均为2026年度预期目标。"
        ],
        [
          "机制活、产业优、百姓富、生态美",
          "可联系改革开放、产业体系、人民生活、绿色发展，但各领域相互影响。"
        ],
        [
          "闽台融合三个样板",
          "社会融合、经济融合、情感融合；分类帮助理解，不意味着项目互不交叉。"
        ]
      ],
      "avoid": "原文‘城镇新增就业50万人’不随意加‘以上’；全国数据的限定词不搬到省级数据上。",
      "recall": {
        "intro": [
          "福建2026年GDP与城镇新增就业预期目标分别是什么？",
          "地区生产总值增长5%左右，在实际工作中努力争取更好结果；城镇新增就业50万人。"
        ],
        "practice": [
          "数据最多采一次能否理解为资格条件不用核查？",
          "不能。减少重复采集与取消必要核验不是同一件事，仍须看依法履职、数据使用范围和具体规则。"
        ],
        "advanced": [
          "全国与福建的新增就业目标怎样分别表述？",
          "全国1200万人以上，福建50万人。福建该项原文不加“以上”；都属于2026年预期目标。"
        ]
      },
      "sourceIds": [
        "fujian-report-official-2026",
        "national-report-release-2026"
      ]
    }
  },
  "questions": [
    {
      "id": "policy26-01-01",
      "lesson": "policy-fourth-plenum-2025",
      "stem": "2025年二十届四中全会审议通过的文件是？",
      "options": [
        "国家十五五规划纲要的批准决议",
        "关于制定十五五规划的建议",
        "福建省十五五规划纲要",
        "2026年全国政府工作报告"
      ],
      "answer": 1,
      "optionReviews": [
        "批准国家纲要的决议由2026年全国人大会议作出。",
        "全会审议通过规划建议。",
        "省级规划不是本次中央全会通过的文件。",
        "这是2026年全国人大会议审议的年度报告。"
      ],
      "explanation": "全会审议通过规划建议。",
      "graphic": null,
      "trainingGoal": "区分会议通过的文件与指导思想五个对应。",
      "trainingStage": "识别概念",
      "meta": {
        "module": "政治理论",
        "type": "规划与年度政策",
        "trainingStage": "识别概念",
        "trainingGoal": "区分会议通过的文件与指导思想五个对应。",
        "knowledgeIds": [
          "policy-fourth-plenum-2025"
        ],
        "tags": [
          "二十届四中全会",
          "十五五",
          "原则辨析",
          "2025指定文本"
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "fourth-plenum-communique-2025",
            "six-principles-2023",
            "reform-decision-2024",
            "national-plan15-release-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    },
    {
      "id": "policy26-01-02",
      "lesson": "policy-fourth-plenum-2025",
      "stem": "四中全会关于十五五发展的指导思想中，“改革创新”对应什么位置？",
      "options": [
        "根本动力",
        "中心",
        "根本保障",
        "根本目的"
      ],
      "answer": 0,
      "optionReviews": [
        "改革创新对应根本动力。",
        "中心是经济建设。",
        "根本保障是全面从严治党。",
        "根本目的是满足人民日益增长的美好生活需要。"
      ],
      "explanation": "改革创新对应根本动力。",
      "graphic": null,
      "trainingGoal": "区分会议通过的文件与指导思想五个对应。",
      "trainingStage": "识别概念",
      "meta": {
        "module": "政治理论",
        "type": "规划与年度政策",
        "trainingStage": "识别概念",
        "trainingGoal": "区分会议通过的文件与指导思想五个对应。",
        "knowledgeIds": [
          "policy-fourth-plenum-2025"
        ],
        "tags": [
          "二十届四中全会",
          "十五五",
          "原则辨析",
          "2025指定文本"
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "fourth-plenum-communique-2025",
            "six-principles-2023",
            "reform-decision-2024",
            "national-plan15-release-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    },
    {
      "id": "policy26-01-03",
      "lesson": "policy-fourth-plenum-2025",
      "stem": "哪一项属于2025年四中全会提出的十五五经济社会发展六项原则？",
      "options": [
        "坚持自信自立",
        "必须坚持胸怀天下",
        "坚持以制度建设为主线",
        "坚持有效市场和有为政府相结合"
      ],
      "answer": 3,
      "optionReviews": [
        "自信自立列于二十大报告的六个必须坚持。",
        "胸怀天下列于六个必须坚持的世界观方法论。",
        "以制度建设为主线列于2024年进一步全面深化改革原则。",
        "有效市场和有为政府相结合列于十五五发展六项原则。"
      ],
      "explanation": "有效市场和有为政府相结合列于十五五发展六项原则。",
      "graphic": null,
      "trainingGoal": "辨认三组六项原则，理解市场与政府的关系。",
      "trainingStage": "迁移运用",
      "meta": {
        "module": "政治理论",
        "type": "规划与年度政策",
        "trainingStage": "迁移运用",
        "trainingGoal": "辨认三组六项原则，理解市场与政府的关系。",
        "knowledgeIds": [
          "policy-fourth-plenum-2025"
        ],
        "tags": [
          "二十届四中全会",
          "十五五",
          "原则辨析",
          "2025指定文本"
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "fourth-plenum-communique-2025",
            "six-principles-2023",
            "reform-decision-2024",
            "national-plan15-release-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    },
    {
      "id": "policy26-01-04",
      "lesson": "policy-fourth-plenum-2025",
      "stem": "某园区取消不合理准入门槛，同时依法监管安全、改善公共服务。这更符合哪种理解？",
      "options": [
        "市场有效就应取消全部监管",
        "市场作用与政府履职可以协同",
        "政府有为就是包办企业经营",
        "市场和政府只能选择其一"
      ],
      "answer": 1,
      "optionReviews": [
        "发挥市场作用不等于取消必要监管。",
        "减少不合理壁垒与依法提供监管服务可以共同支持市场运行。",
        "政府有为不是替所有企业决定经营。",
        "两者可以相互配合，不是非此即彼。"
      ],
      "explanation": "减少不合理壁垒与依法提供监管服务可以共同支持市场运行。",
      "graphic": null,
      "trainingGoal": "辨认三组六项原则，理解市场与政府的关系。",
      "trainingStage": "迁移运用",
      "meta": {
        "module": "政治理论",
        "type": "规划与年度政策",
        "trainingStage": "迁移运用",
        "trainingGoal": "辨认三组六项原则，理解市场与政府的关系。",
        "knowledgeIds": [
          "policy-fourth-plenum-2025"
        ],
        "tags": [
          "二十届四中全会",
          "十五五",
          "原则辨析",
          "2025指定文本"
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "fourth-plenum-communique-2025",
            "six-principles-2023",
            "reform-decision-2024",
            "national-plan15-release-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    },
    {
      "id": "policy26-01-05",
      "lesson": "policy-fourth-plenum-2025",
      "stem": "根据四中全会公报，把“2035年基本实现社会主义现代化”改成“2030年已全部完成”，主要错在？",
      "options": [
        "混淆规划期末与远景节点，并把目标当成结果",
        "把十五五写成2026—2030年",
        "误把改革创新写成根本动力",
        "仅仅遗漏了会议会址"
      ],
      "answer": 0,
      "optionReviews": [
        "2030是十五五期末，2035是基本实现社会主义现代化的目标节点；目标不等于已完成。",
        "2026—2030年正是十五五规划期。",
        "改革创新本来就对应根本动力。",
        "会址不是这句话的主要问题。"
      ],
      "explanation": "2030是十五五期末，2035是基本实现社会主义现代化的目标节点；目标不等于已完成。",
      "graphic": null,
      "trainingGoal": "区分目标与结果，说明发展与安全如何统筹。",
      "trainingStage": "检查边界",
      "meta": {
        "module": "政治理论",
        "type": "规划与年度政策",
        "trainingStage": "检查边界",
        "trainingGoal": "区分目标与结果，说明发展与安全如何统筹。",
        "knowledgeIds": [
          "policy-fourth-plenum-2025"
        ],
        "tags": [
          "二十届四中全会",
          "十五五",
          "原则辨析",
          "2025指定文本"
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "fourth-plenum-communique-2025",
            "six-principles-2023",
            "reform-decision-2024",
            "national-plan15-release-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    },
    {
      "id": "policy26-01-06",
      "lesson": "policy-fourth-plenum-2025",
      "stem": "虚构山区发展旅游，同时评估就业、生态承载和救援条件，最恰当的政策解释是？",
      "options": [
        "有安全要求就不能发展",
        "在发展中固安全，在安全中谋发展",
        "所有风险必须完全消失才可行动",
        "只看收益即可证明安全"
      ],
      "answer": 1,
      "optionReviews": [
        "安全要求可以成为发展方案的一部分。",
        "同时研究发展机会和安全条件体现统筹发展与安全。",
        "统筹不是要求一切风险先完全消失。",
        "经济收益不直接证明安全条件满足。"
      ],
      "explanation": "同时研究发展机会和安全条件体现统筹发展与安全。",
      "graphic": null,
      "trainingGoal": "区分目标与结果，说明发展与安全如何统筹。",
      "trainingStage": "检查边界",
      "meta": {
        "module": "政治理论",
        "type": "规划与年度政策",
        "trainingStage": "检查边界",
        "trainingGoal": "区分目标与结果，说明发展与安全如何统筹。",
        "knowledgeIds": [
          "policy-fourth-plenum-2025"
        ],
        "tags": [
          "二十届四中全会",
          "十五五",
          "原则辨析",
          "2025指定文本"
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "fourth-plenum-communique-2025",
            "six-principles-2023",
            "reform-decision-2024",
            "national-plan15-release-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    },
    {
      "id": "policy26-02-01",
      "lesson": "policy-plan15-official-2026",
      "stem": "国家十五五规划纲要的批准和受权发布日期，正确的是？",
      "options": [
        "2026年3月12日批准、3月13日受权发布",
        "2026年3月5日批准、3月14日首次发布",
        "2025年10月23日批准、同日发布",
        "2026年3月14日批准、3月12日受权发布"
      ],
      "answer": 0,
      "optionReviews": [
        "全国人大于3月12日批准，新华社3月13日受权发布。",
        "3月5日是政府工作报告作报告之日，不能据此写成纲要批准日。",
        "2025年10月23日四中全会通过的是规划建议。",
        "批准与发布的日期被写错且次序颠倒。"
      ],
      "explanation": "全国人大于3月12日批准，新华社3月13日受权发布。",
      "graphic": null,
      "trainingGoal": "识别纲要批准发布日期、规划期与年度目标。",
      "trainingStage": "识别概念",
      "meta": {
        "module": "政治理论",
        "type": "规划与年度政策",
        "trainingStage": "识别概念",
        "trainingGoal": "识别纲要批准发布日期、规划期与年度目标。",
        "knowledgeIds": [
          "policy-plan15-official-2026"
        ],
        "tags": [
          "十五五正式纲要",
          "2026—2030",
          "政策层级",
          "目标与成效"
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "national-plan15-official-2026",
            "national-plan15-release-2026",
            "fourth-plenum-communique-2025",
            "national-report-official-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    },
    {
      "id": "policy26-02-02",
      "lesson": "policy-plan15-official-2026",
      "stem": "正式十五五纲要对规划期GDP增长的表述应如何理解？",
      "options": [
        "五年每年固定增长5%",
        "以2025年实际增速作为五年目标",
        "直接沿用2026年目标，不得调整",
        "保持在合理区间，各年度视情提出"
      ],
      "answer": 3,
      "optionReviews": [
        "纲要没有把5%设成各年固定增速。",
        "上年实际结果不等于未来五年的目标。",
        "年度目标不能自动扩展到整个五年。",
        "正式纲要明确保持在合理区间、各年度视情提出。"
      ],
      "explanation": "正式纲要明确保持在合理区间、各年度视情提出。",
      "graphic": null,
      "trainingGoal": "识别纲要批准发布日期、规划期与年度目标。",
      "trainingStage": "识别概念",
      "meta": {
        "module": "政治理论",
        "type": "规划与年度政策",
        "trainingStage": "识别概念",
        "trainingGoal": "识别纲要批准发布日期、规划期与年度目标。",
        "knowledgeIds": [
          "policy-plan15-official-2026"
        ],
        "tags": [
          "十五五正式纲要",
          "2026—2030",
          "政策层级",
          "目标与成效"
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "national-plan15-official-2026",
            "national-plan15-release-2026",
            "fourth-plenum-communique-2025",
            "national-report-official-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    },
    {
      "id": "policy26-02-03",
      "lesson": "policy-plan15-official-2026",
      "stem": "十五五纲要“全社会研发经费投入年均增长7%以上”中的7%，表示？",
      "options": [
        "GDP的年均增长率下限",
        "每家企业必须投入收入的7%",
        "研发投入占GDP的固定比重",
        "研发经费投入的年均增长率下限"
      ],
      "answer": 3,
      "optionReviews": [
        "该数字不描述GDP增速。",
        "全社会指标不等于每家企业统一比例。",
        "增长率和投入强度占比不是一个指标。",
        "这里描述研发经费投入的年均增长，且保留“以上”。"
      ],
      "explanation": "这里描述研发经费投入的年均增长，且保留“以上”。",
      "graphic": null,
      "trainingGoal": "解释研发、就业、教育和健康指标的口径。",
      "trainingStage": "迁移运用",
      "meta": {
        "module": "政治理论",
        "type": "规划与年度政策",
        "trainingStage": "迁移运用",
        "trainingGoal": "解释研发、就业、教育和健康指标的口径。",
        "knowledgeIds": [
          "policy-plan15-official-2026"
        ],
        "tags": [
          "十五五正式纲要",
          "2026—2030",
          "政策层级",
          "目标与成效"
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "national-plan15-official-2026",
            "national-plan15-release-2026",
            "fourth-plenum-communique-2025",
            "national-report-official-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    },
    {
      "id": "policy26-02-04",
      "lesson": "policy-plan15-official-2026",
      "stem": "以下哪组属于十五五纲要中的民生目标？",
      "options": [
        "居民收入与经济增长无关",
        "GDP每年增长7%、二氧化碳排放总量每年降低17%",
        "劳动年龄人口平均受教育年限11.7年、人均预期寿命80岁",
        "新增就业50万人、粮食产量513万吨以上"
      ],
      "answer": 2,
      "optionReviews": [
        "纲要提出居民收入增长和经济增长同步。",
        "7%对应研发投入年均增速；17%对应五年单位GDP二氧化碳排放降幅。",
        "正式纲要分别提出提高到11.7年和80岁。",
        "这是福建年度报告中的相关目标，且不是这一组民生指标。"
      ],
      "explanation": "正式纲要分别提出提高到11.7年和80岁。",
      "graphic": null,
      "trainingGoal": "解释研发、就业、教育和健康指标的口径。",
      "trainingStage": "迁移运用",
      "meta": {
        "module": "政治理论",
        "type": "规划与年度政策",
        "trainingStage": "迁移运用",
        "trainingGoal": "解释研发、就业、教育和健康指标的口径。",
        "knowledgeIds": [
          "policy-plan15-official-2026"
        ],
        "tags": [
          "十五五正式纲要",
          "2026—2030",
          "政策层级",
          "目标与成效"
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "national-plan15-official-2026",
            "national-plan15-release-2026",
            "fourth-plenum-communique-2025",
            "national-report-official-2026",
            "fujian-report-official-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    },
    {
      "id": "policy26-02-05",
      "lesson": "policy-plan15-official-2026",
      "stem": "比较十五五纲要与2026年全国报告，哪项正确？",
      "options": [
        "17%是2026年二氧化碳排放总量降幅",
        "3.8%是五年规划期累计减排目标",
        "17%是五年单位GDP二氧化碳排放累计降幅，1.45万亿斤左右是粮食综合生产能力目标",
        "1.45万亿斤是2026年已实现的粮食产量"
      ],
      "answer": 2,
      "optionReviews": [
        "17%是五年单位GDP排放降幅，不是2026年总量降幅。",
        "3.8%左右是2026年单位GDP二氧化碳排放降低预期。",
        "正确区分了时间范围、排放强度和综合生产能力。",
        "该数是规划期的综合生产能力目标，不是2026年实际产量。"
      ],
      "explanation": "正确区分了时间范围、排放强度和综合生产能力。",
      "graphic": null,
      "trainingGoal": "区分五年与年度指标，并按证据判断项目成效。",
      "trainingStage": "检查边界",
      "meta": {
        "module": "政治理论",
        "type": "规划与年度政策",
        "trainingStage": "检查边界",
        "trainingGoal": "区分五年与年度指标，并按证据判断项目成效。",
        "knowledgeIds": [
          "policy-plan15-official-2026"
        ],
        "tags": [
          "十五五正式纲要",
          "2026—2030",
          "政策层级",
          "目标与成效"
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "national-plan15-official-2026",
            "national-plan15-release-2026",
            "fourth-plenum-communique-2025",
            "national-report-official-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    },
    {
      "id": "policy26-02-06",
      "lesson": "policy-plan15-official-2026",
      "stem": "一个教育项目列入十五五规划后，哪项判断最合理？",
      "options": [
        "已经建成就说明教学效果必达预期",
        "列入规划就说明已开工",
        "目标与成效无需区分",
        "需分别核开工、建成、投入使用和实际效果"
      ],
      "answer": 3,
      "optionReviews": [
        "建成设施还需使用和效果证据。",
        "规划安排不证明已经开工。",
        "目标是努力方向，成效需要执行与结果证据。",
        "项目不同阶段需要相应证据，不能把规划安排当结果。"
      ],
      "explanation": "项目不同阶段需要相应证据，不能把规划安排当结果。",
      "graphic": null,
      "trainingGoal": "区分五年与年度指标，并按证据判断项目成效。",
      "trainingStage": "检查边界",
      "meta": {
        "module": "政治理论",
        "type": "规划与年度政策",
        "trainingStage": "检查边界",
        "trainingGoal": "区分五年与年度指标，并按证据判断项目成效。",
        "knowledgeIds": [
          "policy-plan15-official-2026"
        ],
        "tags": [
          "十五五正式纲要",
          "2026—2030",
          "政策层级",
          "目标与成效"
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "national-plan15-official-2026",
            "national-plan15-release-2026",
            "fourth-plenum-communique-2025",
            "national-report-official-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    },
    {
      "id": "policy26-03-01",
      "lesson": "policy-national-report-2026",
      "stem": "2026年全国政府工作报告提出的经济增长预期目标是？",
      "options": [
        "4.5%—5%，在实际工作中努力争取更好结果",
        "5%，并已确认为2026全年实际结果",
        "7%以上，属于全国GDP目标",
        "5%左右，这是福建与全国完全相同的指标"
      ],
      "answer": 0,
      "optionReviews": [
        "报告明确为4.5%—5%，同时努力争取更好结果。",
        "报告回顾2025年GDP增长5%，并非2026全年实际结果。",
        "7%以上对应十五五全社会研发经费投入年均增速。",
        "5%左右是福建年度GDP预期，不能互抄。"
      ],
      "explanation": "报告明确为4.5%—5%，同时努力争取更好结果。",
      "graphic": null,
      "trainingGoal": "掌握2026年全国预期目标及财政、货币政策取向。",
      "trainingStage": "识别概念",
      "meta": {
        "module": "政治理论",
        "type": "规划与年度政策",
        "trainingStage": "识别概念",
        "trainingGoal": "掌握2026年全国预期目标及财政、货币政策取向。",
        "knowledgeIds": [
          "policy-national-report-2026"
        ],
        "tags": [
          "2026全国报告",
          "宏观政策",
          "年度目标",
          "政策工具"
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "national-report-official-2026",
            "national-report-release-2026",
            "national-plan15-official-2026",
            "fujian-report-official-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    },
    {
      "id": "policy26-03-02",
      "lesson": "policy-national-report-2026",
      "stem": "2026年全国报告的宏观政策取向正确对应为？",
      "options": [
        "财政与货币是同一种政策",
        "更加积极的财政政策、适度宽松的货币政策",
        "紧缩的财政政策、固定不变的货币政策",
        "适度宽松的财政政策、更加积极的货币政策"
      ],
      "answer": 1,
      "optionReviews": [
        "财政与货币工具不同，可协同但不能视作同一类。",
        "报告明确继续实施更加积极的财政政策和适度宽松的货币政策。",
        "这不符合报告所述取向。",
        "两类政策的修饰语被调换。"
      ],
      "explanation": "报告明确继续实施更加积极的财政政策和适度宽松的货币政策。",
      "graphic": null,
      "trainingGoal": "掌握2026年全国预期目标及财政、货币政策取向。",
      "trainingStage": "识别概念",
      "meta": {
        "module": "政治理论",
        "type": "规划与年度政策",
        "trainingStage": "识别概念",
        "trainingGoal": "掌握2026年全国预期目标及财政、货币政策取向。",
        "knowledgeIds": [
          "policy-national-report-2026"
        ],
        "tags": [
          "2026全国报告",
          "宏观政策",
          "年度目标",
          "政策工具"
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "national-report-official-2026",
            "national-report-release-2026",
            "national-plan15-official-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    },
    {
      "id": "policy26-03-03",
      "lesson": "policy-national-report-2026",
      "stem": "增加预算支出与降低存款准备金率，分别主要属于？",
      "options": [
        "都属于货币政策",
        "都属于财政政策",
        "财政政策、货币政策",
        "货币政策、财政政策"
      ],
      "answer": 2,
      "optionReviews": [
        "预算支出主要属于财政。",
        "降准是货币政策工具。",
        "预算支出属财政，准备金率调整属货币。",
        "两者分类被颠倒。"
      ],
      "explanation": "预算支出属财政，准备金率调整属货币。",
      "graphic": null,
      "trainingGoal": "辨认财政与货币工具，准确列出四稳。",
      "trainingStage": "迁移运用",
      "meta": {
        "module": "政治理论",
        "type": "规划与年度政策",
        "trainingStage": "迁移运用",
        "trainingGoal": "辨认财政与货币工具，准确列出四稳。",
        "knowledgeIds": [
          "policy-national-report-2026"
        ],
        "tags": [
          "2026全国报告",
          "宏观政策",
          "年度目标",
          "政策工具"
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "national-report-official-2026",
            "national-report-release-2026",
            "national-plan15-official-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    },
    {
      "id": "policy26-03-04",
      "lesson": "policy-national-report-2026",
      "stem": "全国报告强调的“四稳”是？",
      "options": [
        "稳收入、稳物价、稳粮食、稳旅游",
        "稳出口、稳学校、稳养老、稳交通",
        "稳增长、稳投资、稳房地产、稳汇率",
        "稳就业、稳企业、稳市场、稳预期"
      ],
      "answer": 3,
      "optionReviews": [
        "这些不是该报告“四稳”的固定列举。",
        "这些不是报告所列的“四稳”。",
        "不能用其他重要任务替换固定列举。",
        "报告列明稳就业、稳企业、稳市场、稳预期。"
      ],
      "explanation": "报告列明稳就业、稳企业、稳市场、稳预期。",
      "graphic": null,
      "trainingGoal": "辨认财政与货币工具，准确列出四稳。",
      "trainingStage": "迁移运用",
      "meta": {
        "module": "政治理论",
        "type": "规划与年度政策",
        "trainingStage": "迁移运用",
        "trainingGoal": "辨认财政与货币工具，准确列出四稳。",
        "knowledgeIds": [
          "policy-national-report-2026"
        ],
        "tags": [
          "2026全国报告",
          "宏观政策",
          "年度目标",
          "政策工具"
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "national-report-official-2026",
            "national-report-release-2026",
            "national-plan15-official-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    },
    {
      "id": "policy26-03-05",
      "lesson": "policy-national-report-2026",
      "stem": "2026年全国报告提出因地制宜发展新质生产力，以下理解较恰当的是？",
      "options": [
        "传统产业一律退出才可能创新",
        "只要购买设备就已完成产业升级",
        "结合当地产业、人才、技术与场景选择路径",
        "所有地区集中复制同一热门行业"
      ],
      "answer": 2,
      "optionReviews": [
        "报告同时部署优化提升传统产业。",
        "设备是条件之一，不能直接证明升级完成。",
        "因地制宜要求结合基础与条件，传统产业也可通过改造升级发展。",
        "复制同一行业忽略地区条件。"
      ],
      "explanation": "因地制宜要求结合基础与条件，传统产业也可通过改造升级发展。",
      "graphic": null,
      "trainingGoal": "结合地区条件解释新质生产力，区分回顾与年度预期。",
      "trainingStage": "检查边界",
      "meta": {
        "module": "政治理论",
        "type": "规划与年度政策",
        "trainingStage": "检查边界",
        "trainingGoal": "结合地区条件解释新质生产力，区分回顾与年度预期。",
        "knowledgeIds": [
          "policy-national-report-2026"
        ],
        "tags": [
          "2026全国报告",
          "宏观政策",
          "年度目标",
          "政策工具"
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "national-report-official-2026",
            "national-report-release-2026",
            "national-plan15-official-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    },
    {
      "id": "policy26-03-06",
      "lesson": "policy-national-report-2026",
      "stem": "有人用全国报告中的“2025年GDP增长5%”证明2026年全年也已增长5%，错误是？",
      "options": [
        "把正确的2026实际数据写得不够详细",
        "把上一年实际回顾当成新一年实际结果",
        "没有把百分比改成百分点",
        "把国家规划年限写成了2026—2030年"
      ],
      "answer": 1,
      "optionReviews": [
        "报告该处是2025年回顾，不是2026年实际结果。",
        "年份和数据性质均被混淆，2026报告给出的新年度数字是预期目标。",
        "增长率用百分比，改成百分点不能纠正年份错误。",
        "这里的错误与规划年限写法无关。"
      ],
      "explanation": "年份和数据性质均被混淆，2026报告给出的新年度数字是预期目标。",
      "graphic": null,
      "trainingGoal": "结合地区条件解释新质生产力，区分回顾与年度预期。",
      "trainingStage": "检查边界",
      "meta": {
        "module": "政治理论",
        "type": "规划与年度政策",
        "trainingStage": "检查边界",
        "trainingGoal": "结合地区条件解释新质生产力，区分回顾与年度预期。",
        "knowledgeIds": [
          "policy-national-report-2026"
        ],
        "tags": [
          "2026全国报告",
          "宏观政策",
          "年度目标",
          "政策工具"
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "national-report-official-2026",
            "national-report-release-2026",
            "national-plan15-official-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    },
    {
      "id": "policy26-04-01",
      "lesson": "policy-fujian-report-2026",
      "stem": "关于2026年福建城镇新增就业目标，哪项与省政府工作报告原文表述一致？",
      "options": [
        "1200万人以上",
        "50万人以上",
        "1200万人",
        "50万人"
      ],
      "answer": 3,
      "optionReviews": [
        "1200万人以上是全国报告目标。",
        "福建该项原文为50万人，不加“以上”。",
        "全国目标也不能去掉原有“以上”。",
        "福建原文是城镇新增就业50万人。"
      ],
      "explanation": "福建原文是城镇新增就业50万人。",
      "graphic": null,
      "trainingGoal": "识别福建预期目标与新福建建设四个关键词。",
      "trainingStage": "识别概念",
      "meta": {
        "module": "福建专题",
        "type": "规划与年度政策",
        "trainingStage": "识别概念",
        "trainingGoal": "识别福建预期目标与新福建建设四个关键词。",
        "knowledgeIds": [
          "policy-fujian-report-2026"
        ],
        "tags": [
          "福建",
          "2026省政府报告",
          "地方政策",
          "全国与地方"
        ],
        "applicableExams": [
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "fujian-report-official-2026",
            "national-report-release-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    },
    {
      "id": "policy26-04-02",
      "lesson": "policy-fujian-report-2026",
      "stem": "“机制活、产业优、百姓富、生态美”分别帮助联系哪组领域？",
      "options": [
        "只涉及生态保护，不含民生",
        "只涉及经济总量与税收",
        "改革开放、产业体系、人民生活、绿色发展",
        "国防、交通、司法、外交"
      ],
      "answer": 2,
      "optionReviews": [
        "百姓富等明确涉及人民生活。",
        "四个词不只描述经济总量或税收。",
        "这组联系帮助理解新福建建设的四个关键词，领域间仍相互影响。",
        "这些不是四个关键词所对应的主要理解方向。"
      ],
      "explanation": "这组联系帮助理解新福建建设的四个关键词，领域间仍相互影响。",
      "graphic": null,
      "trainingGoal": "识别福建预期目标与新福建建设四个关键词。",
      "trainingStage": "识别概念",
      "meta": {
        "module": "福建专题",
        "type": "规划与年度政策",
        "trainingStage": "识别概念",
        "trainingGoal": "识别福建预期目标与新福建建设四个关键词。",
        "knowledgeIds": [
          "policy-fujian-report-2026"
        ],
        "tags": [
          "福建",
          "2026省政府报告",
          "地方政策",
          "全国与地方"
        ],
        "applicableExams": [
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "fujian-report-official-2026",
            "national-report-release-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    },
    {
      "id": "policy26-04-03",
      "lesson": "policy-fujian-report-2026",
      "stem": "福建报告的“两创”深度融合，主要指？",
      "options": [
        "科技创新和产业创新深度融合",
        "把所有教育目的改成当年招聘需求",
        "只有高校研究，不需要企业参与",
        "创办企业与创造口号融合"
      ],
      "answer": 0,
      "optionReviews": [
        "两创是科技创新和产业创新，联系供给、企业主体与成果转化。",
        "教育科技人才一体发展不等于窄化教育目标。",
        "报告强调企业创新主体作用与协作。",
        "这不是两创的文本含义。"
      ],
      "explanation": "两创是科技创新和产业创新，联系供给、企业主体与成果转化。",
      "graphic": null,
      "trainingGoal": "解释两创融合与数字治理中的具体关系。",
      "trainingStage": "迁移运用",
      "meta": {
        "module": "福建专题",
        "type": "规划与年度政策",
        "trainingStage": "迁移运用",
        "trainingGoal": "解释两创融合与数字治理中的具体关系。",
        "knowledgeIds": [
          "policy-fujian-report-2026"
        ],
        "tags": [
          "福建",
          "2026省政府报告",
          "地方政策",
          "全国与地方"
        ],
        "applicableExams": [
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "fujian-report-official-2026",
            "national-report-release-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    },
    {
      "id": "policy26-04-04",
      "lesson": "policy-fujian-report-2026",
      "stem": "对福建报告“数据最多采一次”等改革，较合理的理解是？",
      "options": [
        "所有部门可无限制共享任何数据",
        "减少重复采集并优化衔接，必要核验仍要依法进行",
        "所有资格条件一律取消",
        "有数字平台即证明所有事项办结"
      ],
      "answer": 1,
      "optionReviews": [
        "数据共享仍有职责、范围和安全边界。",
        "便利办事与依法核验、数据安全可以同时要求。",
        "减少材料重复不等于取消资格条件。",
        "平台存在不证明具体事项已办结。"
      ],
      "explanation": "便利办事与依法核验、数据安全可以同时要求。",
      "graphic": null,
      "trainingGoal": "解释两创融合与数字治理中的具体关系。",
      "trainingStage": "迁移运用",
      "meta": {
        "module": "福建专题",
        "type": "规划与年度政策",
        "trainingStage": "迁移运用",
        "trainingGoal": "解释两创融合与数字治理中的具体关系。",
        "knowledgeIds": [
          "policy-fujian-report-2026"
        ],
        "tags": [
          "福建",
          "2026省政府报告",
          "地方政策",
          "全国与地方"
        ],
        "applicableExams": [
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "fujian-report-official-2026",
            "national-report-release-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    },
    {
      "id": "policy26-04-05",
      "lesson": "policy-fujian-report-2026",
      "stem": "福建报告中的闽台融合三个示范样板是？",
      "options": [
        "社会融合、经济融合、情感融合",
        "只建设单一城市的产业园区",
        "人口融合、能源融合、关税融合",
        "县域融合、城市融合、海洋融合"
      ],
      "answer": 0,
      "optionReviews": [
        "报告分别部署社会、经济、情感融合示范样板，并推动全域融合。",
        "报告还有社会、情感与全域安排，不限于单城园区。",
        "这不是报告的三个样板名称。",
        "这不是报告列举的三类融合样板。"
      ],
      "explanation": "报告分别部署社会、经济、情感融合示范样板，并推动全域融合。",
      "graphic": null,
      "trainingGoal": "辨认闽台融合三类样板，比较全国与福建指标。",
      "trainingStage": "检查边界",
      "meta": {
        "module": "福建专题",
        "type": "规划与年度政策",
        "trainingStage": "检查边界",
        "trainingGoal": "辨认闽台融合三类样板，比较全国与福建指标。",
        "knowledgeIds": [
          "policy-fujian-report-2026"
        ],
        "tags": [
          "福建",
          "2026省政府报告",
          "地方政策",
          "全国与地方"
        ],
        "applicableExams": [
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "fujian-report-official-2026",
            "national-report-release-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    },
    {
      "id": "policy26-04-06",
      "lesson": "policy-fujian-report-2026",
      "stem": "比较2026年全国与福建报告的年度目标，哪项正确？",
      "options": [
        "福建失业率目标直接沿用全国5.5%左右",
        "全国和福建GDP预期均为4.5%—5%",
        "全国GDP预期4.5%—5%，福建5%左右；就业数字也需分别记录",
        "福建新增就业50万人以上，全国50万人"
      ],
      "answer": 2,
      "optionReviews": [
        "福建城镇调查失业率控制在5%左右。",
        "福建GDP预期为5%左右。",
        "全国与福建的地域、数字和限定词应按各自文本记录。",
        "福建为50万人，全国为1200万人以上。"
      ],
      "explanation": "全国与福建的地域、数字和限定词应按各自文本记录。",
      "graphic": null,
      "trainingGoal": "辨认闽台融合三类样板，比较全国与福建指标。",
      "trainingStage": "检查边界",
      "meta": {
        "module": "福建专题",
        "type": "规划与年度政策",
        "trainingStage": "检查边界",
        "trainingGoal": "辨认闽台融合三类样板，比较全国与福建指标。",
        "knowledgeIds": [
          "policy-fujian-report-2026"
        ],
        "tags": [
          "福建",
          "2026省政府报告",
          "地方政策",
          "全国与地方"
        ],
        "applicableExams": [
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
        "purpose": "指定政策文本的原创理解练习，教学分层不代表实测难度或考频。",
        "source": {
          "kind": "original",
          "title": "本站原创规划与年度政策练习",
          "url": null,
          "referenceIds": [
            "fujian-report-official-2026",
            "national-report-release-2026"
          ]
        },
        "rights": {
          "status": "original",
          "note": "题目与解析原创；政策事实依据所列官方文本。"
        },
        "answerReview": {
          "status": "editorial-reviewed",
          "date": "2026-11-06",
          "basis": "逐题对照指定官方文本与讲义；非官方答案或考生试测。"
        },
        "methodIds": []
      }
    }
  ],
  "theoryLearningAids": {
    "policy-fourth-plenum-2025": {
      "keyPoints": [
        {
          "title": "入门：会议与文件",
          "text": "二十届四中全会于2025年10月20日至23日在北京举行，审议通过《中共中央关于制定国民经济和社会发展第十五个五年规划的建议》。全会通过的是规划建议；国家规划纲要随后由全国人大批准，两份文件的程序和作用不同。"
        },
        {
          "title": "入门：十五五的时间与定位",
          "text": "十五五是2026—2030年，是基本实现社会主义现代化夯实基础、全面发力的关键时期，具有承前启后的重要地位。2030年是本规划期末，2035年是基本实现社会主义现代化的目标节点。"
        },
        {
          "title": "入门：指导思想的五个对应",
          "text": "中心是经济建设，主题是推动高质量发展，根本动力是改革创新，根本目的是满足人民日益增长的美好生活需要，根本保障是全面从严治党。可用“经—质—改—民—党”提示顺序，但回答时须恢复完整表述。"
        }
      ],
      "memoryCue": "先认题头：方法六项、改革六项、十五五六项，三组不互换。",
      "plainExample": {
        "title": "对照理解",
        "text": "‘有效市场和有为政府相结合’属于十五五经济社会发展原则；‘自信自立’属于六个必须坚持的世界观方法论清单。"
      },
      "contrasts": [
        {
          "left": {
            "term": "六个必须坚持",
            "text": "人民至上、自信自立、守正创新、问题导向、系统观念、胸怀天下；先认世界观方法论这一题头。"
          },
          "right": {
            "term": "2024改革原则",
            "text": "党的全面领导、以人民为中心、守正创新、以制度建设为主线、全面依法治国、系统观念。各项前均为‘坚持’。"
          },
          "cue": "三组共有相近术语，不表示互相替代；口诀与分组只是辅助，不是官方的新清单。"
        }
      ],
      "recall": [
        {
          "question": "四中全会通过的是十五五‘建议’还是后来正式‘纲要’？",
          "checkpoints": [
            "2025年四中全会审议通过规划建议。正式国家纲要后来由十四届全国人大四次会议于2026年3月12日批准。"
          ]
        },
        {
          "question": "经济建设、高质量发展、改革创新、美好生活需要、全面从严治党，分别放在哪五个位置？",
          "checkpoints": [
            "中心、主题、根本动力、根本目的、根本保障。回答时恢复完整表述，不能互换。"
          ]
        },
        {
          "question": "某选项把十五五六项原则中的‘高质量发展’换成‘自信自立’，其他内容不变，能成立吗？",
          "checkpoints": [
            "不能。自信自立属于六个必须坚持的指定清单；其重要性不等于可以替换另一文件的固定列举。"
          ]
        }
      ],
      "scope": "依据2025年10月23日四中全会公报；核验于2026年11月6日。",
      "sourceIds": [
        "fourth-plenum-communique-2025",
        "six-principles-2023",
        "reform-decision-2024",
        "national-plan15-release-2026"
      ]
    },
    "policy-plan15-official-2026": {
      "keyPoints": [
        {
          "title": "入门：建议、纲要、年度报告",
          "text": "党的规划建议提出方向，国家规划纲要明确五年发展的目标和任务，政府工作报告部署年度工作。国家十五五纲要根据党的规划建议编制，主要阐明国家战略意图、明确政府工作重点、引导规范社会主体行为。"
        },
        {
          "title": "入门：批准、发布与转载",
          "text": "十四届全国人大四次会议于2026年3月12日批准国家十五五规划纲要，新华社3月13日受权发布全文。某网站3月14日转载并不改变前两个日期。3月5日报告中的“纲要草案”指当时提交审查的文本状态。"
        },
        {
          "title": "入门：规划期与远景目标",
          "text": "规划期为2026—2030年。GDP增长保持在合理区间、各年度视情提出；到2035年人均GDP比2020年翻一番、达到中等发达国家水平。年度目标、五年安排、2035年远景不是同一时间范围。"
        }
      ],
      "memoryCue": "建议看方向，纲要看五年，报告看当年，成效另取证。",
      "plainExample": {
        "title": "对照理解",
        "text": "2026年GDP预期目标不能直接复制成整个2026—2030年每年的固定目标。"
      },
      "contrasts": [
        {
          "left": {
            "term": "2025-10-23",
            "text": "四中全会通过规划建议。"
          },
          "right": {
            "term": "2026-03-12 / 03-13",
            "text": "国家纲要先获批准，后受权发布；两者不是同一日期。"
          },
          "cue": "3月5日仍称草案，不能据此说今日未有正式版；某转载网页晚一天也不改变批准日。"
        }
      ],
      "recall": [
        {
          "question": "十五五覆盖哪五年？正式纲要何时批准、何时受权发布？",
          "checkpoints": [
            "2026—2030年；2026年3月12日批准，3月13日受权发布。"
          ]
        },
        {
          "question": "十五五研发投入7%以上指增长率还是GDP占比？二氧化碳排放降低17%是哪段时间？",
          "checkpoints": [
            "研发经费投入年均增长7%以上，不是占GDP的比重；单位GDP二氧化碳排放降低17%是五年规划期累计目标。"
          ]
        },
        {
          "question": "一个项目列入正式规划，能否据此断言已开工且达到效果？",
          "checkpoints": [
            "不能。列入规划、开工、完成和产生效果分别需要相应证据，不能把目标或安排当成结果。"
          ]
        }
      ],
      "scope": "国家纲要2026年3月12日批准、3月13日受权发布；核验于2026年11月6日。",
      "sourceIds": [
        "national-plan15-official-2026",
        "national-plan15-release-2026",
        "fourth-plenum-communique-2025"
      ]
    },
    "policy-national-report-2026": {
      "keyPoints": [
        {
          "title": "入门：四部分对应三个时间层次",
          "text": "报告包括2025年工作回顾、十五五时期主要目标和重大任务、2026年总体要求和政策取向、2026年政府工作任务。2025年结果、五年安排和2026年部署分别记。报告回顾2025年GDP增长5%，不能把它当作2026年实际增速。"
        },
        {
          "title": "入门：增长、就业与物价目标",
          "text": "2026年经济增长预期为4.5%—5%，并在实际工作中努力争取更好结果；城镇调查失业率5.5%左右；城镇新增就业1200万人以上；居民消费价格涨幅2%左右。范围、左右、以上都是指标的一部分。"
        },
        {
          "title": "入门：收入、粮食与减排目标",
          "text": "居民收入增长和经济增长同步；国际收支基本平衡；粮食产量1.4万亿斤左右；单位GDP二氧化碳排放降低3.8%左右。粮食产量与规划中的综合生产能力不同，单位GDP排放下降也不能直接换成排放总量下降。"
        }
      ],
      "memoryCue": "数字先带年份，目标保留‘左右、以上、范围’；财政积极，货币适度宽松。",
      "plainExample": {
        "title": "对照理解",
        "text": "‘2025年GDP增长5%’与‘2026年预期4.5%—5%’分别是回顾和目标，不矛盾也不能互换。"
      },
      "contrasts": [
        {
          "left": {
            "term": "财政 / 货币",
            "text": "更加积极的财政政策；适度宽松的货币政策。"
          },
          "right": {
            "term": "四稳",
            "text": "稳就业、稳企业、稳市场、稳预期。"
          },
          "cue": "不要把‘今年’理解为阅读时的任何年份；不要把部署出台某制度推断为截至今天尚未出台或已经出台。"
        }
      ],
      "recall": [
        {
          "question": "2026全国经济增长预期目标和两类宏观政策取向是什么？",
          "checkpoints": [
            "经济增长4.5%—5%，在实际工作中努力争取更好结果；继续实施更加积极的财政政策和适度宽松的货币政策。"
          ]
        },
        {
          "question": "降低准备金率与增加预算支出，分别主要对应哪类政策工具？",
          "checkpoints": [
            "前者属于货币政策工具，后者属于财政政策工具。两者可以协同，不能因都支持经济就当作同一类。"
          ]
        },
        {
          "question": "报告回顾2025年增长5%，有人据此说2026全年也已增长5%，错在哪里？",
          "checkpoints": [
            "把上一年度实际回顾当成新年度实际结果，同时忽略2026报告给的是年度预期目标。应分别核年份和数据性质。"
          ]
        }
      ],
      "scope": "报告2026年3月5日作、3月12日批准、3月13日受权发布；年度目标不是实际完成值。",
      "sourceIds": [
        "national-report-official-2026",
        "national-report-release-2026"
      ]
    },
    "policy-fujian-report-2026": {
      "keyPoints": [
        {
          "title": "入门：报告的省份与年份",
          "text": "报告于2026年1月27日在福建省十四届人大四次会议上作，2月6日在省政府门户网站公开。报告中的“今年”指2026年，“全省”指福建。它与全国报告方向衔接，但不是同一份文本，也不能互抄指标。"
        },
        {
          "title": "入门：新福建建设四个关键词",
          "text": "机制活、产业优、百姓富、生态美。可分别联系改革开放、产业体系、人民生活、绿色发展。四者相互影响，例如产业升级既依赖机制创新，也要考虑生态约束和群众受益。"
        },
        {
          "title": "入门：福建2026年预期目标",
          "text": "地区生产总值增长5%左右；城镇调查失业率控制在5%左右；城镇新增就业50万人；居民消费价格涨幅2%左右；居民收入增长与经济增长同步；粮食产量513万吨以上；完成国家下达的单位地区生产总值二氧化碳排放降低目标。GDP目标同时提出在实际工作中努力争取更好结果。"
        }
      ],
      "memoryCue": "全国与福建各放一栏，地方任务接产业、治理、融合、协同。",
      "plainExample": {
        "title": "对照理解",
        "text": "全国新增就业目标1200万人以上，福建为50万人；不可因为同一年就混写。"
      },
      "contrasts": [
        {
          "left": {
            "term": "全国 / 福建GDP预期",
            "text": "全国4.5%—5%；福建5%左右。均为2026年度预期目标。"
          },
          "right": {
            "term": "机制活、产业优、百姓富、生态美",
            "text": "可联系改革开放、产业体系、人民生活、绿色发展，但各领域相互影响。"
          },
          "cue": "原文‘城镇新增就业50万人’不随意加‘以上’；全国数据的限定词不搬到省级数据上。"
        }
      ],
      "recall": [
        {
          "question": "福建2026年GDP与城镇新增就业预期目标分别是什么？",
          "checkpoints": [
            "地区生产总值增长5%左右，在实际工作中努力争取更好结果；城镇新增就业50万人。"
          ]
        },
        {
          "question": "数据最多采一次能否理解为资格条件不用核查？",
          "checkpoints": [
            "不能。减少重复采集与取消必要核验不是同一件事，仍须看依法履职、数据使用范围和具体规则。"
          ]
        },
        {
          "question": "全国与福建的新增就业目标怎样分别表述？",
          "checkpoints": [
            "全国1200万人以上，福建50万人。福建该项原文不加“以上”；都属于2026年预期目标。"
          ]
        }
      ],
      "scope": "依据2026年1月27日所作、2月6日公开的福建省政府工作报告；年度部署不替代现行办事规则。",
      "sourceIds": [
        "fujian-report-official-2026",
        "national-report-release-2026"
      ]
    }
  }
};
 const C=window.STUDY_CONTENT,M=window.STUDY_MEMORY_METHODS,P=window.STUDY_COURSE;
 if(!C?.theoryTrack||!C?.coverageMatrix||!C?.theoryLearningAids||!M?.cards) throw Error('policy-2026: prerequisites missing');
 const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k),errors=[],check=(ok,msg)=>{if(!ok)errors.push(msg);};
 const lessonIds=B.lessons.map(l=>l.id),questionIds=B.questions.map(q=>q.id),sources={...B.sources,...C.sources};
 check(new Set(lessonIds).size===4&&new Set(questionIds).size===24,'package identity');
 for(const l of B.lessons){
  check(!C.lessons.some(x=>x.id===l.id),'lesson collision '+l.id);
  check(!own(M.cards,l.id)&&!own(C.theoryLearningAids,l.id),'aid collision '+l.id);
  check(l.sections.length===9&&l.practice.length===6,'lesson shape '+l.id);
  check(l.sources.every(id=>own(sources,id)),'source reference '+l.id);
  check(C.coverageMatrix.some(g=>g.module===l.category),'coverage group '+l.category);
  for(const [key,g]of Object.entries(l.learningLevels)){
   check(C.learningPaths[key]?.stage===g.stage,'stage '+l.id+'/'+key);
   check(g.sections.length===3&&g.sections.every(i=>l.sections[i]),'section reference '+l.id);
   check(g.questionIds.length===2&&g.questionIds.every(id=>B.questions.some(q=>q.id===id&&q.lesson===l.id&&q.trainingStage===g.stage)),'question reference '+l.id);
  }
 }
 const norm=s=>s.normalize('NFKC').replace(/[\p{P}\p{Z}\s]/gu,''),stems=new Set(C.questions.map(q=>norm(q.stem)));
 for(const q of B.questions){
  check(!C.questions.some(x=>x.id===q.id),'question collision '+q.id);
  check(!stems.has(norm(q.stem)),'stem collision '+q.id);stems.add(norm(q.stem));
  check(q.options.length===4&&new Set(q.options).size===4&&q.optionReviews.length===4,'options '+q.id);
  check(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4&&q.explanation===q.optionReviews[q.answer],'answer '+q.id);
 }
 for(const [id,s]of Object.entries(B.sources))if(own(C.sources,id))check(C.sources[id].url===s.url,'source identity collision '+id);
 const political=B.lessons.filter(l=>l.category==='政治理论'),fujian=B.lessons.filter(l=>l.category==='福建专题');
 if(P)for(const id of ['politics','fujian'])check(P.tracks.some(t=>t.id===id),'course track '+id);
 if(errors.length)throw Error('policy-2026 rejected before mutation:\n'+errors.join('\n'));
 const newSourceIds=Object.keys(B.sources).filter(id=>!own(C.sources,id));
 C.lessons.push(...B.lessons);C.questions.push(...B.questions);
 for(const id of newSourceIds)C.sources[id]=B.sources[id];
 Object.assign(C.theoryLearningAids,B.theoryLearningAids);Object.assign(M.cards,B.memoryCards);
 for(const l of B.lessons)C.coverageMatrix.find(g=>g.module===l.category).topics.push({id:l.id,title:l.title,lessonIds:[l.id],questionIds:[...l.practice],writingIds:[],scope:l.subtitle,status:'intro',remaining:'已核重点讲解与6道原创题；全年时政、后续配套政策和真题仍未覆盖。'});
 const pg=C.coverageMatrix.find(g=>g.module==='政治理论').gaps.find(g=>g.title==='年度时政与文件更新');
 if(pg)pg.remaining='已补2025年四中全会、国家十五五纲要和2026年全国报告重点；2026完整时政、配套文件及实施进展仍需核验。';
 const fg=C.coverageMatrix.find(g=>g.module==='福建专题').gaps.find(g=>g.title==='地方政策经济与授权真题');
 if(fg)fg.remaining='已有2025企业服务样本和2026福建政府工作报告重点；正式省十五五纲要、系统地方专题、配套政策及授权真题仍缺。';
 C.coverage=C.coverage.map(row=>['政治理论','福建专题'].includes(row[0])?[row[0],C.lessons.filter(l=>l.category===row[0]).map(l=>l.title.split('：')[0]).join('、'),row[2]]:row);
 C.theoryTrack.steps.push(...political.map(l=>({lessonId:l.id,purpose:l.subtitle,bridge:l.learningLevels.advanced.goal})));
 C.theoryTrack.scope=`${C.theoryTrack.steps.length}课基础路线，衔接马原、毛泽东思想、改革开放理论、新时代框架及指定政策文本；不代表全部理论和年度时政。`;
 C.theoryTrack.updated=B.checked;
 if(window.STUDY_POLITICAL_CURRICULUM){window.STUDY_POLITICAL_CURRICULUM.lessonIds=C.theoryTrack.steps.map(s=>s.lessonId);window.STUDY_POLITICAL_CURRICULUM.scope=C.theoryTrack.scope;}
 C.theoryTrack.gaps=C.theoryTrack.gaps.map(s=>s.includes('最新中央与福建政策')?'已补四中全会、国家十五五纲要、2026全国与福建报告重点；新时代思想完整体系、全年时政和配套政策仍待补充。':s);
 const units=[{track:'politics',title:'十五五规划与2026年度部署',goal:'分清建议、正式纲要和年度报告，掌握目标、原则与政策工具。',bridge:'从新时代发展框架进入指定年份的规划和年度部署。',check:'能否正确对应文件、年份、地区、指标口径和政策工具？',ids:political.map(l=>l.id)},
 {track:'fujian',title:'2026年福建发展与治理',goal:'对照全国框架，掌握福建年度目标与重点任务。',bridge:'接续福建地理与企业服务，理解产业、数字治理、闽台融合和山海协同。',check:'全国与福建目标有何差别？两创、三个融合样板怎样对应？',ids:fujian.map(l=>l.id)}];
 if(P){for(const u of units){const{track,...unit}=u;P.tracks.find(t=>t.id===track).units.push(unit);}
  const p=P.tracks.find(t=>t.id==='politics');p.start=`${p.units.reduce((n,u)=>n+u.ids.length,0)}课，按原理、理论发展和指定政策文本编排。`;
  const f=P.tracks.find(t=>t.id==='fujian');f.start='福建地理、企业服务样本与2026年省政府工作报告。';f.brief='地理框架 → 企业服务 → 年度发展与治理';
 }
 window.STUDY_POLICY_2026={packageId:B.packageId,checked:B.checked,lessonIds,questionIds,newSourceIds,scope:B.scope};
})();
