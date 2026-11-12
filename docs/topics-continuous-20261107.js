"use strict";
// Explicit whole-theory / whole-type groupings. Source lesson bodies and IDs are never rewritten.
(() => {
 const C = window.STUDY_CONTENT, T = window.STUDY_COMPLETE_TOPICS, P = window.STUDY_COURSE;
 if (!C || !T || !P || typeof document === 'undefined') return;
 const plans = {
  "growth-analysis": [
    {
      "title": "增长的基本关系、还原与比较",
      "blocks": [
        0,
        1,
        2
      ]
    },
    {
      "title": "连续变化与年均增长",
      "blocks": [
        3,
        4
      ]
    },
    {
      "title": "混合增长与基期权重",
      "blocks": [
        5,
        6
      ]
    },
    {
      "title": "特殊基期、精度与综合核验",
      "blocks": [
        7,
        8
      ]
    }
  ],
  "share-analysis": [
    {
      "title": "比重、两期变化与结构合成",
      "lessons": [
        "share",
        "pn-share-scope"
      ]
    },
    {
      "title": "增长贡献率与拉动百分点",
      "lessons": [
        "growth-contribution"
      ]
    }
  ],
  "average-analysis": [
    {
      "title": "平均数：从总量关系到合并与变化",
      "lessons": [
        "average"
      ]
    }
  ],
  "estimation": [
    {
      "title": "估算：从显示精度到能够确定的答案",
      "lessons": [
        "estimation-boundary"
      ]
    }
  ],
  "data-materials": [
    {
      "title": "跨表与跨期：先固定统计对象和时间",
      "lessons": [
        "multi-table",
        "on-period-scope"
      ]
    },
    {
      "title": "指数：基准、连接与合成",
      "lessons": [
        "fq-index-caliber"
      ]
    },
    {
      "title": "分组统计：均值、位置与可达范围",
      "lessons": [
        "t35-group-statistics"
      ]
    }
  ],
  "formal-logic": [
    {
      "title": "条件推理：箭头、连接词与反例",
      "lessons": [
        "logic",
        "pn-compound-logic"
      ]
    },
    {
      "title": "量词推理：范围、存在与同一个对象",
      "lessons": [
        "quantified-logic"
      ]
    },
    {
      "title": "排列约束：把所有条件放进同一个方案",
      "lessons": [
        "arrangement"
      ]
    }
  ],
  "definition-analysis": [
    {
      "title": "定义判断：完整条件、组合关系与例外",
      "lessons": [
        "definition",
        "definition-conditions"
      ]
    }
  ],
  "analogy-analysis": [
    {
      "title": "类比推理：关系、层级与方向一起核对",
      "lessons": [
        "analogy"
      ]
    }
  ],
  "argument-analysis": [
    {
      "title": "论证链：证据怎样走到结论",
      "lessons": [
        "argument",
        "on-argument-chain"
      ]
    },
    {
      "title": "因果与控制：替代解释、偏差和结论范围",
      "lessons": [
        "argument-controls"
      ]
    }
  ],
  "plane-figures": [
    {
      "title": "数量与属性：先固定观察标准",
      "lessons": [
        "figure-features"
      ]
    },
    {
      "title": "位置变换：逐个追踪，再合起来验证",
      "lessons": [
        "rotation"
      ]
    },
    {
      "title": "图形叠加：同位置按同一规则运算",
      "lessons": [
        "overlay"
      ]
    }
  ],
  "spatial-figures": [
    {
      "title": "展开与折叠：面的位置和方向同时保留",
      "lessons": [
        "cube-net"
      ]
    },
    {
      "title": "三视图：从位置、高度到整体旋转",
      "lessons": [
        "solid-views"
      ]
    },
    {
      "title": "翻滚与截面：逐步更新并证明可达",
      "lessons": [
        "t35-spatial-transform"
      ]
    }
  ],
  "context-words": [
    {
      "title": "语境与用词：含义、搭配和程度一起判断",
      "lessons": [
        "word",
        "context-blanks",
        "pn-context-contrast"
      ]
    }
  ],
  "central-meaning": [
    {
      "title": "主旨：从全文结构到有边界的概括",
      "lessons": [
        "mainidea",
        "scoped-reading"
      ]
    },
    {
      "title": "标题：用简洁表达保留核心判断",
      "lessons": [
        "title-choice"
      ]
    }
  ],
  "detail-reading-topic": [
    {
      "title": "细节判断：对象、条件、状态与证据范围",
      "lessons": [
        "detail-reading",
        "detail-boundaries"
      ]
    }
  ],
  "cohesion": [
    {
      "title": "语句排序：先找关系，再检查整体",
      "lessons": [
        "sentence-order"
      ]
    },
    {
      "title": "衔接与指代：同时满足前后文",
      "lessons": [
        "sentence-link",
        "cohesion-reference"
      ]
    },
    {
      "title": "下文推断：承接尚未完成的说明任务",
      "lessons": [
        "next-paragraph"
      ]
    }
  ],
  "long-reading": [
    {
      "title": "跨段阅读：结构、观点与逐项取证",
      "lessons": [
        "fq-multi-paragraph",
        "t35-context-reading"
      ]
    },
    {
      "title": "多来源阅读：立场、时点与适用范围",
      "lessons": [
        "on-source-reading"
      ]
    }
  ],
  "profit": [
    {
      "title": "利润与折扣：沿同一条收支链核对基数",
      "lessons": [
        "profit-discount",
        "profit-bases"
      ]
    }
  ],
  "concentration": [
    {
      "title": "浓度与混合：溶质、总量和每次状态",
      "lessons": [
        "mixture"
      ]
    }
  ],
  "geometry": [
    {
      "title": "几何与比例：维度、缩放与可达到的界限",
      "lessons": [
        "geometry-scale"
      ]
    }
  ],
  "work-process": [
    {
      "title": "工程问题：效率、分段与完成时点",
      "lessons": [
        "work",
        "work-stages"
      ]
    },
    {
      "title": "动态存量：新增、消耗和净变化",
      "lessons": [
        "fq-dynamic-stock"
      ]
    }
  ],
  "travel-topic": [
    {
      "title": "行程问题：总路程、总时间与相对位置",
      "lessons": [
        "travel"
      ]
    }
  ],
  "scheduling": [
    {
      "title": "周期与统筹：时间约束、可行安排和最短证明",
      "lessons": [
        "t35-period-schedule"
      ]
    }
  ],
  "counting": [
    {
      "title": "整除与余数：整数域、兼容性与步长",
      "lessons": [
        "remainders"
      ]
    },
    {
      "title": "排列组合与整数限制：先定义结果，再计数",
      "lessons": [
        "count",
        "fq-integer-count"
      ]
    },
    {
      "title": "容斥与三集合：回到互斥区域验证",
      "lessons": [
        "inclusion",
        "three-set-counting"
      ]
    }
  ],
  "probability-guarantee": [
    {
      "title": "概率与抽样：样本空间、路径与条件",
      "lessons": [
        "probability",
        "without-replacement"
      ]
    },
    {
      "title": "至少保证：最大失败情形与临界构造",
      "lessons": [
        "guarantee-count"
      ]
    }
  ],
  "materialism": [
    {
      "title": "唯物论：世界、意识、运动与规律",
      "lessons": [
        "marx-worldview"
      ]
    }
  ],
  "cognition": [
    {
      "title": "认识论：实践、认识、真理与价值",
      "lessons": [
        "practice-cognition",
        "marx-truth-value"
      ]
    }
  ],
  "historical-materialism": [
    {
      "title": "社会结构与基本矛盾",
      "lessons": [
        "productive-relations",
        "marx-social-structure"
      ]
    },
    {
      "title": "社会存在、社会意识与人民群众",
      "lessons": [
        "social-being-people"
      ]
    }
  ],
  "political-economy": [
    {
      "title": "商品与价值：劳动、交换和货币",
      "lessons": [
        "marx-commodity-value"
      ]
    },
    {
      "title": "剩余价值与资本运行",
      "lessons": [
        "marx-surplus-capital"
      ]
    },
    {
      "title": "资本主义发展与垄断",
      "lessons": [
        "marx-capitalism-development"
      ]
    }
  ],
  "scientific-socialism": [
    {
      "title": "科学社会主义：理论基础、发展阶段与人的发展",
      "lessons": [
        "marx-socialism-communism"
      ]
    }
  ],
  "mao-thought": [
    {
      "title": "理论形成与活的灵魂",
      "lessons": [
        "mao-thought-context",
        "mao-living-soul"
      ]
    },
    {
      "title": "新民主主义革命：对象、道路与方法",
      "lessons": [
        "mao-new-democratic",
        "mao-revolution-methods"
      ]
    },
    {
      "title": "社会主义改造与制度转变",
      "lessons": [
        "mao-socialist-transition"
      ]
    },
    {
      "title": "社会主义建设探索及其历史边界",
      "lessons": [
        "mao-socialist-exploration"
      ]
    }
  ],
  "reform-theory": [
    {
      "title": "邓小平理论：基本问题、改革与市场",
      "lessons": [
        "deng-core-framework",
        "deng-reform-market"
      ]
    },
    {
      "title": "三个代表重要思想：党的建设与实践要求",
      "lessons": [
        "three-represents-theory"
      ]
    },
    {
      "title": "科学发展观：发展要求与根本方法",
      "lessons": [
        "scientific-development-theory"
      ]
    }
  ],
  "new-era-framework": [
    {
      "title": "世界观和方法论：六个必须坚持",
      "lessons": [
        "six-method-principles"
      ]
    },
    {
      "title": "发展理念与新质生产力",
      "lessons": [
        "development",
        "new-quality-productivity"
      ]
    },
    {
      "title": "中国式现代化：特色、关系与判断边界",
      "lessons": [
        "modernization"
      ]
    },
    {
      "title": "进一步全面深化改革：目标、原则与时间",
      "lessons": [
        "reform-framework-2024"
      ]
    }
  ],
  "market-pattern": [
    {
      "title": "统一大市场与新发展格局：打通规则和循环",
      "lessons": [
        "unified-market-rules",
        "new-development-pattern"
      ]
    }
  ],
  "education-policy": [
    {
      "title": "教育强国：目标、任务与落实条件",
      "lessons": [
        "education-strong-2035"
      ]
    }
  ],
  "plan15": [
    {
      "title": "十五五：建议与正式纲要衔接阅读",
      "lessons": [
        "policy-fourth-plenum-2025",
        "policy-plan15-official-2026"
      ]
    }
  ],
  "national-report": [
    {
      "title": "2026全国政府工作报告：目标与政策任务",
      "lessons": [
        "policy-national-report-2026"
      ]
    }
  ],
  "constitutional-law": [
    {
      "title": "国家机构：性质、职权与制度关系",
      "lessons": [
        "state-organs"
      ]
    },
    {
      "title": "公民权利义务：资格、条件与合法边界",
      "lessons": [
        "constitutional-rights"
      ]
    }
  ],
  "civil-law": [
    {
      "title": "民事行为能力：年龄、辨认能力与具体行为",
      "lessons": [
        "civil-capacity"
      ]
    }
  ],
  "administrative-law": [
    {
      "title": "行政复议：受理范围、程序与法定例外",
      "lessons": [
        "admin-review"
      ]
    }
  ],
  "price-index": [
    {
      "title": "价格指数：基准、权重与跨期变化",
      "lessons": [
        "cpi"
      ]
    }
  ],
  "physical-change": [
    {
      "title": "物态变化：起终状态、形成路径与吸放热",
      "lessons": [
        "phase-change"
      ]
    }
  ],
  "history-framework": [
    {
      "title": "历史时间框架与并立关系",
      "lessons": [
        "history-periods"
      ]
    },
    {
      "title": "史书：体例、范围与具体样本",
      "lessons": [
        "historiography"
      ]
    },
    {
      "title": "造纸与印刷：贡献、功能及表述边界",
      "lessons": [
        "paper-printing"
      ]
    }
  ],
  "fujian-geography-topic": [
    {
      "title": "福建地理：位置、山海格局与省情口径",
      "lessons": [
        "fujian-geography"
      ]
    }
  ],
  "enterprise-policy": [
    {
      "title": "福建企业服务：2025指定文本与办理闭环",
      "lessons": [
        "fujian-enterprise-service-2025"
      ]
    }
  ],
  "fujian-report": [
    {
      "title": "2026福建政府工作报告：目标与地方任务",
      "lessons": [
        "policy-fujian-report-2026"
      ]
    }
  ],
  "evidence-revision": [
    {
      "title": "材料取证到答案修改：每个判断都能回指依据",
      "lessons": [
        "material-mapping",
        "answer-revision"
      ]
    }
  ],
  "summary-topic": [
    {
      "title": "审题与取证：把设问接回事实",
      "blocks": [
        0,
        1
      ]
    },
    {
      "title": "归类、成答与完整例解",
      "blocks": [
        2,
        3
      ]
    },
    {
      "title": "长材料核查与交卷复盘",
      "blocks": [
        4,
        5
      ]
    }
  ],
  "comparison-writing": [
    {
      "title": "比较归纳与迁移：同维度事实、机制和条件",
      "lessons": [
        "compare-materials",
        "compare-transfer-writing"
      ]
    }
  ],
  "explanation-writing": [
    {
      "title": "综合分析与句意解释：含义、依据和边界连起来",
      "lessons": [
        "analysis-writing",
        "explain-in-context"
      ]
    }
  ],
  "proposal-writing": [
    {
      "title": "提出对策：从具体问题到可执行安排",
      "lessons": [
        "proposal",
        "action-design"
      ]
    }
  ],
  "document-writing": [
    {
      "title": "应用写作：按身份、目的和读者行动组织全文",
      "lessons": [
        "document",
        "audience-writing"
      ]
    }
  ],
  "essay-writing": [
    {
      "title": "观点与完整论证段：事实为什么支持判断",
      "lessons": [
        "paragraph-evidence"
      ]
    },
    {
      "title": "从提纲到整篇文章：段落分工与推理推进",
      "lessons": [
        "essay",
        "full-essay"
      ]
    }
  ],
  "transfer-writing": [
    {
      "title": "综合材料写作：任务迁移与福建治理应用",
      "lessons": [
        "writing-transfer",
        "writing-fj-governance-v035"
      ]
    }
  ]
};
 const original = new Map();
 for (const [id, plan] of Object.entries(plans)) {
   const t = T.topics.find(t => t.id === id);
   if (!t) throw Error('Unknown continuous topic ' + id);
   const before = t.blocks;
   original.set(id, {blocks:before, synthesis:t.synthesis, keyPoints:t.keyPoints, scope:t.scope});
   const blocks = plan.map((chapter, i) => {
     const selected = chapter.blocks ? chapter.blocks.map(n => before[n]) : chapter.lessons.map(lessonId => {
       const l = C.lessons.find(l => l.id === lessonId);
       if (!l || !t.sourceLessonIds.includes(lessonId)) throw Error('Invalid source in ' + id);
       return {parts:[{lessonId,sectionIndexes:l.sections.map((_,i) => i)}]};
     });
     return {id:'continuous-part-'+i, title:chapter.title, parts:selected.flatMap(b=>b.parts), additions:selected.flatMap(b=>b.additions||[])};
   });
   const actual = blocks.flatMap(b=>b.parts.flatMap(p=>p.sectionIndexes.map(i=>p.lessonId+':'+i))).sort();
   const expected = t.sourceLessonIds.flatMap(id=>C.lessons.find(l=>l.id===id).sections.map((_,i)=>id+':'+i)).sort();
   if (actual.join('|') !== expected.join('|') || new Set(actual).size !== actual.length) throw Error('Incomplete continuous topic ' + id);
   t.blocks = blocks;
   t.restructured = true;
   t.scope = '本专题保留已有定义、例子与条件，尚未覆盖全部考点。';
   // Existing recall data keeps its identity, but its chapter references follow the new map.
   if (id === 'growth-analysis') {
     const partMap = [0,0,0,1,1,2,2,3,3];
     for (const card of window.STUDY_TOPIC_RECALL_CARDS?.[id] || []) card.part = partMap[card.part];
   }
 }
 const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const oldRender = P.render;
 P.render = (...args) => {
   const html = oldRender(...args), parts = args[0];
   const tmp = document.createElement('template'); tmp.innerHTML = html;
   const directory = tmp.content.querySelector('[data-topic-directory]');
   if (directory) {
     const scope = directory.querySelector('.topic-scope > p');
     if (scope) scope.textContent = '54 个专题，保留原讲义与记录；内容仍在补充。';
     return tmp.innerHTML;
   }
   if (parts[2] !== 'topic' || !plans[parts[3]]) return html;
   const root = tmp.content.querySelector('[data-complete-topic]'); if (!root) return html;
   const t = T.topics.find(t => t.id === parts[3]);
   root.classList.add('continuous-topic','continuous-source-topic');
   const top = root.querySelector('#topic-top');
   top.innerHTML = '';
   top.style.cssText='padding:0;margin:0;border:0';
   root.querySelectorAll('.topic-concept').forEach(node => {
     const heading = node.querySelector('h3');
     if (heading) { node.setAttribute('aria-label',heading.textContent); heading.remove(); }
     const p = node.querySelector('p');
     // Mark one complete source sentence without changing any source character.
     if (p && !p.querySelector('strong')) {
       const text = p.textContent, sentence = text.match(/^[^。！？]+[。！？]?/);
       if (sentence && sentence[0].length <= 150) p.innerHTML = '<strong class="topic-core">' + esc(sentence[0]) + '</strong>' + esc(text.slice(sentence[0].length));
     }
   });
   // The two previously curated maps include substantive connecting explanations.
   // Keep each one next to the first source paragraph it originally introduced.
   if (t.curated) for (const block of original.get(t.id).blocks) {
     if (!block.intro || !block.parts[0]) continue;
     const first = block.parts[0], target = root.querySelector('[data-source-lesson="'+first.lessonId+'"][data-source-section="'+first.sectionIndexes[0]+'"]');
     if (target) target.insertAdjacentHTML('beforebegin','<p class="continuous-introduction">'+esc(block.intro)+'</p>');
   }
   root.querySelectorAll('.topic-addition h3').forEach(h=>{
     const label=document.createElement('strong');label.className='topic-inline-lead';label.textContent=h.textContent+'。';h.replaceWith(label);
   });
   // Keep all authored examples, adjacent to the chapter they conclude rather than another page-like block.
   const synthesis = root.querySelector('#topic-synthesis');
   if (synthesis) {
     synthesis.removeAttribute('id'); synthesis.className='continuous-examples';
     synthesis.querySelector('h2')?.remove();
     synthesis.querySelectorAll('h3').forEach(h=>{
       const label=document.createElement('strong');label.className='topic-inline-lead';label.textContent=h.textContent+'。';h.replaceWith(label);
     });
     root.querySelector('#topic-part-'+(t.blocks.length-1)).append(synthesis);
   }
   const nav = [
     ...(root.querySelector('#topic-original') ? [['topic-original','原文与导读']] : []),
     ...t.blocks.map((b,i)=>['topic-part-'+i,b.title]),
     ...(root.querySelector('#topic-recall') ? [['topic-recall','专题记忆卡与填空']] : []),
     ...(root.querySelector('#topic-diagrams') ? [['topic-diagrams','交互图示']] : []),
     ['topic-practice','配套练习'],['topic-records','我的笔记']
   ];
   root.querySelector('.topic-toc').innerHTML = '<strong>本页连读</strong>' + nav.map(([id,title])=>'<button type="button" data-topic-scroll="'+id+'">'+esc(title)+'</button>').join('') + '<a href="#course/'+t.track+'">返回科目目录</a>';
   root.querySelector('[data-topic-jump]').innerHTML = '<option value="">跳到本页内容</option>' + nav.map(([id,title])=>'<option value="'+id+'">'+esc(title)+'</option>').join('');
   root.querySelector('.topic-hero-meta > span').textContent = t.blocks.length + ' 个连读部分 · 不分页';
   return tmp.innerHTML;
 };
 window.STUDY_TOPIC_CONTINUITY = {plans, original};
})();
