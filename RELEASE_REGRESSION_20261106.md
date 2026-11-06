# 2026-11-06 程序回归验收

## 已通过

- 最终 `npm run test:program` 完整执行，退出码 0。覆盖语法、内容、课程及单页阅读、普通作答快照、计时与备份、合成 DOM、历史版本兼容、诊断、私人题库、长题组和固定卷、移动布局结构、记忆卡、政治课程、新政策课及申论深化。
- 独立执行全部 90 个可执行 JavaScript 测试脚本：63 个退出码 0；其余 27 个在真实浏览器启动阶段被环境权限阻止，不能计为通过。辅助模块不作为独立测试运行。
- `python3 -B tests/v035-math.py`、`npm run check` 和 `git diff --check` 均退出码 0。
- 集成总量严格核对为 127 课、885 道选择题、87 项写作、119 门分层课、80 项来源；政治理论 35 课、208 题，课程共 37 章。
- 保留性检查使用经逐文件校验的 main `0b92788` 基线：123 门原课的完整身份、861 道旧题完整内容、87 项写作完整内容，以及两套固定卷的 240 个引用及题目签名。六门申论课仅允许正文 sections 和 updated 变化，其他字段不放宽。
- 六门申论课均通过正文深度、例解、改错、既有写作任务关联检查，不宣称新增分层。
- 新政策 4 课、24 题通过双入口一致性、逐项解析、课程路径、来源、冲突时不部分写入等检查。答案位置调整后，24 个正确选项文本与调整前已审稿内容逐题比对，保留明确批准的二氧化碳术语修正。
- 新政策合成 DOM 覆盖 12 个课程层级视图、24 道题正错作答流程、96 条选项说明、重复提交去重、返回上下文和旧记录保留。

## 历史测试衔接

最初集中测试因旧版总量断言中断。已更新当前版本精确总量；历史版本测试明确排除后续政策包，仍使用原历史数量、身份与签名断言。六课的历史身份投影仅限获准变更的两个字段，并以独立的当前正文检查和完整基线保留审计补足，没有删除断言或用范围判断替代精确检查。新政策与申论深化测试已加入标准测试脚本。

## 环境阻塞与证据边界

`npm test` 另行整体复跑，退出码 1，停在首个真实浏览器脚本 smoke 的启动阶段；其后的测试已通过上述独立执行补齐尝试范围。

27 个 Playwright 浏览器脚本均尝试运行，但 Chromium 在页面打开之前因 `socket() failed: Operation not permitted` 终止，并报告崩溃目录为只读。它们是环境阻塞，不是业务断言失败，也不算浏览器验收通过；没有为通过测试改动业务代码。

这些脚本包括 smoke、touch、training-browser、learning-course-browser，以及 expansion、deepening、crossstudy、targeting、focused、coverage、applied、core-depth、verbal-logic、growth-argument、travel-count、weighted、semantic-argument、foundations、quant-paths、verbal-paths、reasoning-paths、growth-reading-paths、civic-visual-paths、writing-paths、verbal-inference-paths、quant-model-paths、visual-deduction-paths。

本记录只报告程序及合成 DOM 结果，不把合成锁、布局结构或文本检查等同于真实像素、触屏、原生下载、真实多标签竞争、配额、后台节流或设备持久性验证。另行完成的浏览器抽验应单独记录范围，不能代替这 27 项完整套件。程序通过不构成政策语义全覆盖、官方真题授权、难度标定或学习效果认证，也不表示已发布上线。
