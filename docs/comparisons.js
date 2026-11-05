"use strict";
(() => {
  const C = window.STUDY_CONTENT;
  const data = {
    methods: [
      {
        id: "wutong-2022",
        name: "吴桐（署名作者）",
        title: "言语理解主旨题：看到对策项别冲动",
        date: "2022-09-02",
        publisher: "中公乡镇公务员考试网",
        url: "https://xzgwy.offcn.com/2022/xc_0902/40026.html",
        topic: "主旨选项边界",
        observation: "页面讨论主旨题中对策选项与材料依据的关系。",
        application: "本站练法：先概括原段，再检查选项是否新增无依据的措施。",
        boundary: "不能把任何问题都机械改写成对策；具体设问与全文结构优先。",
        lessons: ["mainidea", "scoped-reading"],
        kind: "author",
        identity: "页面署名已核对，教师职务未核实；仅标文章作者。",
        checked: "2026-11-05",
        rights:
          "仅作链接索引与独立评论；未取得全文、商业题目、图表或模板转载授权。",
      },
      {
        id: "profit-huatu-2022",
        name: "华图教育（机构）",
        title: "利润问题常见解题思路",
        date: "2022-05-19",
        publisher: "华图页面；标注天津华图教育",
        url: "https://m.ah.huatu.com/2022/0519/2304361.html",
        topic: "利润：方程与特值",
        observation: "页面并列介绍列方程与选取计算基准两种思路。",
        application: "本站练法：先用字母式检查可否约去，再考虑设一个方便的数。",
        boundary:
          "原页面属事业单位栏目，只借鉴通用数学方法，不证明国考或福建考情。",
        lessons: ["profit-discount", "profit-bases"],
        kind: "institution",
        identity: "该页只确认机构来源，未核实个人作者，不归给具体教师。",
        checked: "2026-11-05",
        rights:
          "仅作链接索引与独立评论；未取得全文、商业题目、图表或模板转载授权。",
      },
      {
        id: "profit-offcn",
        name: "中公网校（机构）",
        title: "行测利润问题如何做题效率",
        date: "页面未显示明确发布日期",
        publisher: "中公网校",
        url: "https://www.eoffcn.com/kszx/detail/1164476.html",
        topic: "利润：特值前提",
        observation: "页面把不影响所求结果的未知量作为设特值的前提。",
        application: "本站练法：用两个不同可行尺度检查结果是否改变。",
        boundary: "不转载原题；网页中的年份链接不当作本文发布日期。",
        lessons: ["profit-bases"],
        kind: "institution",
        identity: "该页只确认机构来源，未核实个人作者，不归给具体教师。",
        checked: "2026-11-05",
        rights:
          "仅作链接索引与独立评论；未取得全文、商业题目、图表或模板转载授权。",
      },
      {
        id: "definition-offcn",
        name: "中公网校（机构）",
        title: "定义判断解题技巧之核心成分分析法",
        date: "页面未显示明确发布日期",
        publisher: "中公网校",
        url: "https://www.eoffcn.com/kszx/detail/1616477.html",
        topic: "定义条件拆解",
        observation: "页面按主体、对象、条件等成分分析定义。",
        application: "本站练法：成分旁标出且、或、否定及例外，再逐项判断。",
        boundary: "成分列表不能代替逻辑连接；不引用原页面商业例题。",
        lessons: ["definition", "definition-conditions"],
        kind: "institution",
        identity: "该页只确认机构来源，未核实个人作者，不归给具体教师。",
        checked: "2026-11-05",
        rights:
          "仅作链接索引与独立评论；未取得全文、商业题目、图表或模板转载授权。",
      },
      {
        id: "mixed-huatu-2022",
        name: "华图教育（机构）",
        title: "增长率比较问题：混合增长率",
        date: "2022-01-27",
        publisher: "甘肃华图；来源栏为华图教育",
        url: "https://gs.huatu.com/2022/0127/1623309.html",
        topic: "混合增长权重",
        observation: "页面讨论混合率范围及基期量对结果的影响。",
        application: "本站练法：先辨总体部分口径，再还原基期并加权。",
        boundary: "原页出现简便比较；本课另用原创反例检查现期替代基期的风险。",
        lessons: ["mixed-growth", "mixed-weights"],
        kind: "institution",
        identity: "该页只确认机构来源，未核实个人作者，不归给具体教师。",
        checked: "2026-11-05",
        rights:
          "仅作链接索引与独立评论；未取得全文、商业题目、图表或模板转载授权。",
      },
      {
        id: "mixed-offcn",
        name: "中公网校（机构）",
        title: "行测资料分析：两句话巧解混合增长率",
        date: "页面未显示明确发布日期",
        publisher: "中公网校",
        url: "https://www.eoffcn.com/kszx/detail/1059843.html",
        topic: "混合增长权重",
        observation: "页面也讨论增长范围和基期权重，并介绍简便比较。",
        application: "本站练法：算式与范围互验，避免只凭现期大小判断偏向。",
        boundary:
          "正基数且部分完整互斥是本站推导条件；不把近似使用扩成普遍定理。",
        lessons: ["mixed-growth", "mixed-weights"],
        kind: "institution",
        identity: "该页只确认机构来源，未核实个人作者，不归给具体教师。",
        checked: "2026-11-05",
        rights:
          "仅作链接索引与独立评论；未取得全文、商业题目、图表或模板转载授权。",
      },
    ],
    comparisons: [
      {
        id: "reading",
        module: "言语理解",
        title: "主旨选项：语义对应与对策边界",
        lesson: "scoped-reading",
        refs: ["gufei-2010", "wutong-2022"],
        agreement:
          "都需要让所选答案与材料表达相符，而非仅凭选项看起来积极或熟悉。",
        difference:
          "顾斐资料侧重读题与语义对应；吴桐文章把检查收窄到对策项何时有材料支持。是侧重点差异，未发现明确相反观点。",
        conclusion:
          "本站综合：先确定原段主旨，再核查选项对象、范围和新添措施；对策项也须经过同样检查。",
        boundary:
          "描述性文段未必存在待解决的问题；不能无依据给所有文段加一个对策。",
        gap: "已核实1份历史教师资料和1份署名文章；同一知识点第二位具名教师资料仍待补。",
      },
      {
        id: "profit",
        module: "数量关系",
        title: "利润特值：方法相同，前提要讲透",
        lesson: "profit-bases",
        refs: ["profit-huatu-2022", "profit-offcn"],
        agreement:
          "两份机构资料均涉及特值法，且与数量之间的比例、等量关系有关。",
        difference:
          "华图页面把方程与特值并列；中公页面更突出所设变量不影响目标结果的前提。未据此认定哪家方法更优。",
        conclusion:
          "本站综合：先列符号式检查不变性，再用特值简算；遇固定金额、固定费用时重新检查。",
        boundary:
          "单位成本不一致时，销量权重不等于成本权重；固定费用可能使尺度不能约去。",
        gap: "两份均只核实到机构来源；两位具名教师的同知识点对照仍待补。",
      },
      {
        id: "definition",
        module: "判断推理",
        title: "定义条件：要素拆解与逐项匹配",
        lesson: "definition-conditions",
        refs: ["caijinlong-2011", "definition-offcn"],
        agreement: "都从题干定义出发，抽取对判断有用的信息并与选项对应。",
        difference:
          "蔡金龙历史资料强调题设定义优先；中公文章按成分分类。二者可衔接，但仅列成分不能保证处理好且、或与否定。",
        conclusion:
          "本站综合：看清问法→列条件→标连接关系→用候选项逐项代入；必要时构造反例。",
        boundary:
          "虚构定义只在本题中生效；不能把练习规则当真实法规或办事制度。",
        gap: "1份历史教师资料、1份机构资料；第二位具名教师来源待补。",
      },
      {
        id: "growth",
        module: "资料分析",
        title: "混合增长：区间共识与近似使用边界",
        lesson: "mixed-weights",
        refs: ["mixed-huatu-2022", "mixed-offcn"],
        agreement: "都讨论混合增长率在部分增速之间，以及基期权重对偏向的影响。",
        difference:
          "两页均出现简便比较，并非真正相反的理论。本站把精确加权与近似比较分开，避免把来源中的简便做法当作无条件规则。",
        conclusion:
          "本站独立推导：正基数、同口径、互斥完备时按基期加权；给现期则除以1+r还原。",
        boundary:
          "现期排序可能与基期相反；不能只凭现期更大就判断总体更靠近哪个增速。",
        gap: "已找到两份机构公开资料；具名教师、更多不同方法与误差证明仍待补。",
      },
      {
        id: "summary",
        module: "申论方法",
        title: "归纳概括：材料结构与作答对象",
        lesson: "summary-evidence",
        refs: ["zhongjun-2007", "caodewei-2022"],
        agreement:
          "两份资料都重视题目与材料之间的联系，不支持脱离材料任意发挥。",
        difference:
          "钟君访谈偏向材料间关系，曹德伟文章偏向对象与要点对应；属于互补侧重，不能编成两位作者的共同模板。",
        conclusion:
          "本站综合：先把事实状态和逻辑关系读清，再按本题对象筛选，最后检查每条要点的证据。",
        boundary:
          "计划不等于已完成，局部问题不等于全体问题；参考表达不能换算成官方得分。",
        gap: "1份历史教师访谈、1份署名文章；曹德伟教师职务未核实，第二位具名教师对照待补。",
      },
    ],
    fujian: {
      year: 2026,
      checked: "2026-11-05",
      sources: [
        {
          title: "福建省2026年度考试录用公务员公告",
          publisher: "福建省公务员局；泉州市市场监督管理局转载",
          date: "公告2026-01-16",
          url: "https://scjgj.quanzhou.gov.cn/xxgk/rsxx/202604/t20260410_3282289.htm",
          scope:
            "已读取公告正文；支持2026笔试科目时间、加试及面试比例等范围，不支持2027安排。",
        },
        {
          title: "关于划定福建省2026年度公务员考试笔试合格分数线的通知",
          publisher: "福建省公务员考试录用网",
          date: "2026-04-03",
          url: "https://gwykl.fujian.gov.cn/portal/news/bd033d30-543c-470c-904c-fe34b0046ee3",
          scope:
            "已核对官方搜索收录正文；直接网页请求超时。只列2026 A/B类及专业科目合格线，不当职位进面线。",
        },
      ],
      guideUrl: "https://gwykl.fujian.gov.cn/Portal/guide2026",
      thresholds: {
        general: {
          A: {
            total: 105,
            xingce: 50,
          },
          B: {
            total: null,
            xingce: 50,
          },
          police: 45,
        },
        eligible: {
          A: {
            total: 95,
            xingce: 45,
          },
          B: {
            total: null,
            xingce: 45,
          },
          police: 40,
        },
      },
    },
  };
  C.methods.forEach(
    (m) =>
      (m.kind = ["gufei-2010", "caijinlong-2011", "zhongjun-2007"].includes(
        m.id,
      )
        ? "historical-teacher"
        : "author"),
  );
  C.methods.push(...data.methods);
  C.comparisons = data.comparisons;
  C.fujian = data.fujian;
  C.coverage=C.coverage.map(row=>row[0]==="福建专题"?[row[0],"自然地理、虚构地方写作与2026考情分类快照","职位类别与申论卷种完整对应、地方文化政策、2027安排仍待核验"]:row);
  for (const l of C.lessons) {
    for (const id of l.methodRefs || []) {
      const m = C.methods.find((m) => m.id === id);
      if (m && !m.lessons.includes(l.id)) m.lessons.push(l.id);
    }
  }
  for (const q of C.questions)
    q.meta.methodIds = C.methods
      .filter((m) => m.lessons.includes(q.lesson))
      .map((m) => m.id);
  C.fujian.sources.forEach(
    (s, i) =>
      (C.sources["fujian-exam-" + i] = {
        title: s.title,
        publisher: s.publisher,
        year: s.date,
        url: s.url,
        scope: s.scope,
        checked: C.fujian.checked,
      }),
  );
})();
