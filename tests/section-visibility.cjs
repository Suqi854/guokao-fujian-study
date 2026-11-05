"use strict";
// Exact historical attribution labels only. Words such as 多来源 remain teaching content.
const titles=new Set(["方法归属与答后检查", "历史出处与使用边界", "历史出处与本站对照的归属", "复盘与来源边界", "练习复盘与出处边界", "来源边界与复盘检查", "两个出处的同与异"]);
module.exports={visible:sections=>sections.filter(s=>s&&!titles.has(s[0])),titles};
