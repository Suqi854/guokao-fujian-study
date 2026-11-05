"use strict";
// Historical source pointers and original commentary; no commercial examples reproduced.
(() => {
  const C = window.STUDY_CONTENT;
  C.methods.push(
    ...[
      {
        id: "liweiming-2009",
        name: "李委明",
        title: "名师解读公务员行测资料分析十大速算技巧：综合法",
        date: "2009-09-21",
        publisher: "华图教育",
        url: "https://www.huatu.com/a/ziliao/gwy/xingce/2009/0921/33130.html",
        topic: "估算与尾数可靠性",
        observation: "页面讨论近似数据为何不宜直接依靠尾数判断。",
        application: "本站练法：先区分精确数与近似数，再考虑可用的运算方式。",
        boundary:
          "历史页面的国考与地方考使用频率判断不转作当前考情；不转载商业例题。",
        kind: "historical-teacher",
        identity:
          "页面署名李委明，阅读提示称其为当时华图研究中心老师；不推断现任职务。",
        lessons: ["estimation-boundary"],
        checked: "2026-11-05",
        rights:
          "仅作链接索引与独立评论；未取得全文、商业题目、图表或模板转载授权。",
      },
      {
        id: "liutianmei-2020",
        name: "刘天美",
        title: "资料分析备考：计算与选项差距（原标题含提分宣传）",
        date: "2020-02-20",
        publisher: "云南华图教育",
        url: "https://m.yn.huatu.com/2020/0220/1520235.html",
        topic: "估算精度与选项差距",
        observation: "页面通过不同选项间距讨论粗算与更精细计算的选择。",
        application:
          "本站练法：先判断估算误差是否可能跨越选项边界，再决定是否加精度。",
        boundary: "不采用标题提分承诺、题海或直接猜题建议；无官方分值依据。",
        kind: "historical-teacher",
        identity:
          "页末署名云南华图刘天美并提供老师详情链接；详情页读取502，仅据该历史文章确认教学关联。",
        lessons: ["estimation-boundary"],
        checked: "2026-11-05",
        rights:
          "仅作链接索引与独立评论；未取得全文、商业题目、图表或模板转载授权。",
      },
      {
        id: "zhangxiaoming-2011",
        name: "章晓铭",
        title: "手机报：名师章晓铭判断推理之定义判断解题法",
        date: "2011-09-24",
        publisher: "华图教育",
        url: "https://www.huatu.com/a/ziliao/gwy/qita/2011/0924/118794.html",
        topic: "定义判断的主体条件",
        observation: "页面把主体作为可优先核查的定义要素。",
        application:
          "本站练法：先查明确的必要条件；未被排除的选项继续检查其余条件和逻辑连接。",
        boundary: "主体不符合须由题干明确证实；关键词未出现不等于主体不符合。",
        kind: "historical-teacher",
        identity:
          "历史页面有章晓铭介绍与教学特色段；页面作者栏为华图教育，不推断现任职务。",
        lessons: ["definition", "definition-conditions"],
        checked: "2026-11-05",
        rights:
          "仅作链接索引与独立评论；未取得全文、商业题目、图表或模板转载授权。",
      },
      {
        id: "zhangxiaolong-2012",
        name: "张小龙（署名作者）",
        title: "国考申论综合概括题解题方法：矛盾概括法",
        date: "2012-11-16",
        publisher: "新浪教育；来源华图公务员",
        url: "https://edu.sina.com.cn/official/2012-11-16/1137362464.shtml",
        topic: "概括任务与信息分类",
        observation: "该署名文章讨论材料同时涉及成效、问题等内容时的分类处理。",
        application: "本站练法：先划定设问要素，再决定保留哪些材料类别。",
        boundary:
          "特定案例组织不能套用全部概括题；只问问题时不强加成绩和对策。不转载案例与答案。",
        kind: "author",
        identity: "正文末署名华图教育张小龙；本页未列教师职务，仅标署名作者。",
        lessons: ["summary", "summary-evidence"],
        checked: "2026-11-05",
        rights:
          "仅作链接索引与独立评论；未取得全文、商业题目、图表或模板转载授权。",
      },
    ],
  );
  const definition = C.comparisons.find((t) => t.id === "definition");
  Object.assign(definition, {
    refs: ["caijinlong-2011", "zhangxiaoming-2011"],
    difference:
      "蔡金龙资料从必要条件与中心信息整体对应；章晓铭资料把主体作为可先核查的要素。二者互补，不是相互否定。",
    conclusion:
      "本站独立结论：先核查容易确证的必要条件，再检查其余条件与连接关系。未满足明确主体条件可排除；主体符合仍不保证整项符合。",
    boundary: "不能把选项没重复某个词等同于主体不符；仍以题意和逻辑关系为准。",
    gap: "已具备两位具名教师的历史资料对照；更多题型边界及新年度适用性仍需逐题检查。",
  });
  const summary = C.comparisons.find((t) => t.id === "summary");
  Object.assign(summary, {
    refs: ["zhongjun-2007", "zhangxiaolong-2012"],
    title: "归纳概括：材料关系与分类边界",
    agreement: "都把材料内容组织成有条理的表达，不能脱离材料随意增加事实。",
    difference:
      "钟君访谈着重材料段落之间的关系；张小龙署名文章讨论特定任务下不同信息类别的组织。后者不是所有概括题的通用结构。",
    conclusion:
      "本站独立结论：先定作答对象与要素，再整理材料关系；只问问题就只保留问题，不能机械增加成绩和对策。",
    gap: "钟君历史教师身份已核实；张小龙本文只核实作者署名，仍需补充身份依据。",
  });
  C.comparisons.push({
    id: "estimation",
    module: "资料分析",
    filterLabel: "资料分析 · 估算",
    title: "估算精度：数据可靠性与选项间距",
    lesson: "estimation-boundary",
    refs: ["liweiming-2009", "liutianmei-2020"],
    agreement: "都关注哪些信息足以支持计算判断，简算需要条件。",
    difference:
      "李委明侧重近似数据尾数的可靠性；刘天美页面通过选项差距展示不同精度需求。是互补观察，未发现相反主张。",
    conclusion:
      "本站独立结论：先分清精确数和近似数，再检查结果可能范围是否只对应一个选项；不够就提高精度。",
    boundary:
      "区间论证由本站独立推导，不冒充两位作者共同提出。资料中的提分宣传、考试频率和猜题建议不采用。",
    gap: "已核对两份具名教学资料；仍缺不同题型的大样本效果验证，不能声称普遍提分。",
  });
  for (const q of C.questions)
    q.meta.methodIds = C.methods
      .filter((m) => m.lessons.includes(q.lesson))
      .map((m) => m.id);
})();
