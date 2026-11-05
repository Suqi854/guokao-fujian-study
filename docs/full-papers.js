"use strict";
// Fixed references only. Does not add questions, sessions, storage or network calls.
(() => { const data = {
  "schemaVersion": 1,
  "revision": 1,
  "createdAt": "2026-11-05",
  "status": "candidate-not-integrated",
  "notice": "原创模拟 / 非官方 / 非真题。120题为本站自定训练配置；题量与分值非考试承诺，不代表福建省考实际卷型、分值、难度或80+成绩预测。",
  "basis": {
    "siteVersion": "0.33.0",
    "existingQuestionCount": 594,
    "eligibleTextQuestionCount": 571,
    "newQuestionCount": 0,
    "distinctReferencedQuestionCount": 240,
    "reusedQuestionCount": 240,
    "sourceBankSha256": "ee4f378af48072817c471ba7bfc769f3d948c4ce7d7fcd8a191febd689c36a42",
    "sourceMaterialsSha256": "aaa8c445c5be6c7552fd56dc1b7295df1127f6318584c2635bb5efd85ef3f78f",
    "sourceFiles": {
      "content.js": "6f70edeac10793434fff8f5a8e8512c25465eaaaa0f69dfc10928b80bbf92ec2",
      "expansion.js": "0cf278ef16b9cc092803a88d2b993a76e245cc3ecb067807e03489f09775de62",
      "deepening.js": "9c9e45bbc70f696adb43defad13f58138747df207ee0f8f8226dccf610634682",
      "crossstudy.js": "4673ee6051da62f19b019bf4ab5b59fde601526053d12830e00de9ff4d2f4687",
      "targeting-content.js": "d1bfaddd1fb2b4766e49d90a7bec9534ef15a3d30faafcc952b443000b866a37",
      "focused-content.js": "8a7f36991cd3c4bc0b1df514e7bf3328ff458e968d080099fbdf4b34785b436f",
      "gap-content.js": "3dfa7809da9c6f09f816fbd0d593a6faebc85f8d0c805e80a5e19fd89758b291",
      "applied-content.js": "f0b22a2038b8ac51ba67bc587f108c5aea304206d74f8e9e6b10521771b0d18d",
      "review-depth.js": "570890bedc7eb6ae9adcf73b22b685febae51b22d97238b5a9186654a77ca6dd",
      "core-depth.js": "f0c76dff24b3726f3535b990db096c493030d725e7501b52fda62b2611360211",
      "verbal-logic-depth.js": "bfb6c830f5b476acfd0fca4f9790f08bd3c6a2cec808820e7266e9af7536f5dd",
      "growth-argument-depth.js": "0fec211b49c18fa6227b38666b9f2324439a7b5af41ce44055fa6a26c4a8cdad",
      "travel-count-depth.js": "c8e976d5000903fd3e7a614aa96e38c1c06097b5249109432dc4dfa5a2134c7e",
      "weighted-depth.js": "ef1b3f29302b63dec09f22b4dfced8746b106febd5961e7c841bd227276d598a",
      "semantic-argument-depth.js": "e0f9aca449a20b3c4edb26d29329475fb1ce8162e5b9653f29cddde3547c4783",
      "foundations-depth.js": "214ef045633598e8ab9a33e9ee28e99836a05d22427fdd639dcb7675b2e2d2aa",
      "quant-paths.js": "56b570a7453b36d07450902ee270f72cc71505e8292ed1ebc1276d40f3be494e",
      "verbal-paths.js": "49ef36476c4e11e631f7bf7bde07e7bc298305d3c52a8f04cc060483d865f419",
      "reasoning-paths.js": "1bef4ba8b73b571d719958bbb28f0877cc80baeb6bff6439847a1409b2e16dc7",
      "growth-reading-paths.js": "33ac85227bd1cebc92186bb2f9cdb14e659306f910c58f404e876c3124b18851",
      "civic-visual-paths.js": "e9c44232bbdac7ad27335a29561cca6966814411cad637a74373630efea4644a",
      "writing-paths.js": "bd42dc96bb71f474b0a84f039f18907a92ce88c20b1a503b2a0a26dc5b061806",
      "verbal-inference-paths.js": "6d28b7f9f89533308a8cdb0d028d87e918728431915b4f7c2a28e987c32a99a7",
      "quant-model-paths.js": "b9e16bc9044a9d135cfd981d20d0f69f21d8a49c94e87e72d4c3fcd180d0b4aa",
      "visual-deduction-paths.js": "9c5440b2fb50e499af19cd2df61421e72de0805988ff1012426398de5c8f0d48",
      "constraint-geometry-paths.js": "e75a1b76b3f7db48886bad0863bc02289a5666f45fd80b8c1a43f25f90eab178",
      "evidence-reading-paths.js": "851e8291c0f3f15ea602cfe0164b240b25e34ca2c7b4e0ae047d1dee1599e31b",
      "civic-foundations-paths.js": "95a25e378d7990ad88cfce87968812506683ce596213feca4866977dcaef1b09",
      "precision-sampling-paths.js": "3d71e0a900284db920a8b627a850afc62c072965f8ea3db23d1cbdb6601439a9",
      "political-foundations-paths.js": "6e0013d97bab3941a66d2a0b57d254db969bd01a1d1f6013a5fdb931715da800",
      "theory-learning-aids.js": "6ee5e052ab59f459342ed81f64babb909cf187b2aa1d2f010409d1075151317c",
      "parallel-question-bank.js": "b9d1d53b3f4065bbabc778db5247f4f58d39942cb48255496b22e014a1c009a4",
      "parallel-politics.js": "1c7e1e760acc34df1254ee87cee146ea2fee46e38db5c291519e4dc8ef7870ee",
      "parallel-shenlun.js": "f14886c12dfae11dfe1c36c7c7fae3afef461f3e2aefb58bd7e5be643c39165c",
      "next-curriculum.js": "055683918507c6b11f309bb808d60eaf62f9b896e08517e09540b04a1272a2f0",
      "catalog.js": "6554b3ba23b83232f49084827582a0267912cb8d5063a32c6d17d590e13a361d",
      "methods.js": "a7da537a489338b01768985816e1d5077e7d7ed0881618a8053d60d5581eab62",
      "comparisons.js": "bd5f34b45dcfabf81993642a27aa81af2e43f4d296e39bb027be536cce9dc1e4",
      "verified-methods.js": "bc0dea48505dbe12c564b92a75e17a2902bf0171c72143a2e00fa3c4a2bad118",
      "focused-methods.js": "aae7f7e2e4119c286e3efad7aad5d8b880965fb9d1191c90b94c5c72cee4b9cd",
      "practice-next.js": "02726444feb52d547448a5d5aa1ae586466df620692b16c7688deb6db26a3064",
      "coverage-map.js": "e10bda71286183251dc6196d85f37fd4fbf47c84428ac835ccd1b63ec1eb8c0b",
      "visual-models.js": "8c1b08e3b6dab8b7623fd3d676518a04bb2c3d71316414b7b2356070a9e28335",
      "training-records.js": "276e5ad19c8aedbdc3663a48eeb2315fa0fbe78f5f32572b35ba39eaad404644",
      "local-progress-store.js": "7743deceac1150ec3cc2ef9a7e8bd2b66604f2a9d292267562f2ddc4604ef49c",
      "training-workspace.js": "c172bd09b240c0d8c056d1e4d78757bc70cbfe4a3baa0e4609b8e68485d81cce",
      "shenlun-feedback.js": "ebf8c16c1454be8fedc71d3da8c10ea2d6f2e0606bb7ac77a852d357e2f7dc7c",
      "adaptive-diagnostics.js": "4b6d08e9443a32a7e48172c38d62f57078e9293db07af8be67c37a34e42a718d",
      "adaptive-workspace.js": "5365c9fe2c67043ec07cf4dcb9657cabb9d8236fceb7501e1d0445a671a30e01",
      "paper-catalog.js": "e88c0abbd05bce4a70c2451aef46f847c71025de58f372f358a1a7036a515d3c",
      "paper-engine.js": "d5bb12ce68d90c58c0f9103ef4bc84cedd6cc48ec80eeeb02134a14ab2f7bcd4",
      "record-capacity.js": "75b5957a4f71c7da3e66c9d5928bfb222c0ee383d6b11a864088be390c015356",
      "long-mock-model.js": "1ba68278edb68686c4928ec66528ca2fda5491f52c3671fac2457b8ac68a4e17",
      "long-mock-store.js": "79ed050ba550d3b0889da31329d9e2495180da1471410b42285f7a053e8d70d9"
    }
  },
  "excludedGraphics": [
    {
      "questionId": "q23",
      "module": "判断推理",
      "type": "平面图形旋转",
      "reason": "现有长题组未接入图形渲染；本批不纳入。"
    },
    {
      "questionId": "q24",
      "module": "判断推理",
      "type": "平面图形旋转",
      "reason": "现有长题组未接入图形渲染；本批不纳入。"
    },
    {
      "questionId": "q25",
      "module": "判断推理",
      "type": "图形叠加",
      "reason": "现有长题组未接入图形渲染；本批不纳入。"
    },
    {
      "questionId": "q26",
      "module": "判断推理",
      "type": "图形叠加",
      "reason": "现有长题组未接入图形渲染；本批不纳入。"
    },
    {
      "questionId": "q64",
      "module": "判断推理",
      "type": "空间重构",
      "reason": "现有长题组未接入图形渲染；本批不纳入。"
    },
    {
      "questionId": "q65",
      "module": "判断推理",
      "type": "空间重构",
      "reason": "现有长题组未接入图形渲染；本批不纳入。"
    },
    {
      "questionId": "q66",
      "module": "判断推理",
      "type": "空间重构",
      "reason": "现有长题组未接入图形渲染；本批不纳入。"
    },
    {
      "questionId": "q67",
      "module": "判断推理",
      "type": "立体投影",
      "reason": "现有长题组未接入图形渲染；本批不纳入。"
    },
    {
      "questionId": "q68",
      "module": "判断推理",
      "type": "立体投影",
      "reason": "现有长题组未接入图形渲染；本批不纳入。"
    },
    {
      "questionId": "q69",
      "module": "判断推理",
      "type": "立体投影",
      "reason": "现有长题组未接入图形渲染；本批不纳入。"
    },
    {
      "questionId": "q223",
      "module": "判断推理",
      "type": "平面图形旋转",
      "reason": "现有长题组未接入图形渲染；本批不纳入。"
    },
    {
      "questionId": "q224",
      "module": "判断推理",
      "type": "平面图形旋转",
      "reason": "现有长题组未接入图形渲染；本批不纳入。"
    },
    {
      "questionId": "q253",
      "module": "判断推理",
      "type": "图形叠加",
      "reason": "现有长题组未接入图形渲染；本批不纳入。"
    },
    {
      "questionId": "q254",
      "module": "判断推理",
      "type": "图形叠加",
      "reason": "现有长题组未接入图形渲染；本批不纳入。"
    },
    {
      "questionId": "q255",
      "module": "判断推理",
      "type": "图形叠加",
      "reason": "现有长题组未接入图形渲染；本批不纳入。"
    },
    {
      "questionId": "q257",
      "module": "判断推理",
      "type": "图形叠加",
      "reason": "现有长题组未接入图形渲染；本批不纳入。"
    },
    {
      "questionId": "q259",
      "module": "判断推理",
      "type": "空间重构",
      "reason": "现有长题组未接入图形渲染；本批不纳入。"
    },
    {
      "questionId": "q260",
      "module": "判断推理",
      "type": "空间重构",
      "reason": "现有长题组未接入图形渲染；本批不纳入。"
    },
    {
      "questionId": "q340",
      "module": "判断推理",
      "type": "图形数量与属性",
      "reason": "现有长题组未接入图形渲染；本批不纳入。"
    },
    {
      "questionId": "q341",
      "module": "判断推理",
      "type": "图形数量与属性",
      "reason": "现有长题组未接入图形渲染；本批不纳入。"
    },
    {
      "questionId": "q342",
      "module": "判断推理",
      "type": "图形数量与属性",
      "reason": "现有长题组未接入图形渲染；本批不纳入。"
    },
    {
      "questionId": "q343",
      "module": "判断推理",
      "type": "图形数量与属性",
      "reason": "现有长题组未接入图形渲染；本批不纳入。"
    },
    {
      "questionId": "q345",
      "module": "判断推理",
      "type": "图形数量与属性",
      "reason": "现有长题组未接入图形渲染；本批不纳入。"
    }
  ],
  "limitations": [
    "两套卷仅复用240道已有原创题，新增题目为0；已练原题会影响训练表现。",
    "题数比例为编辑自定，不承诺福建省考实际题量、分值、难度、考试时间或目标分数。",
    "没有图形推理作图题；也未用文字原理题冒充图形作答覆盖。",
    "政治理论和常识不是当期时政全集；福建专题仅覆盖已有自然地理与材料边界，不代表独立官方模块。",
    "资料分析以单题短资料和两个小表组为主，不代表真实试卷长材料密度；共材料题相互关联。",
    "沿用原题答案与解析及原题审核记录，本次仅做结构、引用与渲染核验，未重新逐题独立命题复审。",
    "题号互不重复不等于题意完全独立；两卷在同一知识点有不同变式，未建立等值或难度标定。",
    "只统计答对、答错、未做和自选预算下的训练用时，不计算官方分值，不换算考试分数。"
  ],
  "papers": [
    {
      "id": "original-120-a",
      "revision": 1,
      "title": "原创120题训练卷 A",
      "subtitle": "条件识别与材料阅读",
      "kind": "original-simulation-training",
      "official": false,
      "isPastExam": false,
      "availability": "standalone-practice-ready",
      "questionCount": 120,
      "notice": "原创模拟 / 非官方 / 非真题。120题为本站自定训练配置；题量与分值非考试承诺，不代表福建省考实际卷型、分值、难度或80+成绩预测。",
      "description": "7个编辑训练模块，固定题序与完整原创解析。本站自定组卷，非全真卷；需自行设置训练预算。",
      "applicableExams": [
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
        "officialScale": false,
        "predictsExamScore": false
      },
      "sections": [
        {
          "id": "s1",
          "module": "政治理论",
          "title": "政治理论",
          "questionCount": 15,
          "questionIds": [
            "q181",
            "q245",
            "q437",
            "q438",
            "q443",
            "q444",
            "q449",
            "q451",
            "q454",
            "pol2-01",
            "pol2-08",
            "pol2-15",
            "pol2-21",
            "pol3-02",
            "pol3-09"
          ],
          "items": [
            {
              "number": 1,
              "questionId": "q181",
              "type": "理论概念",
              "lesson": "development",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:0605eabc54e8ffcc"
            },
            {
              "number": 2,
              "questionId": "q245",
              "type": "理论概念",
              "lesson": "modernization",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:9e64e8c84887add6"
            },
            {
              "number": 3,
              "questionId": "q437",
              "type": "实践与认识",
              "lesson": "practice-cognition",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:235466b83fce8cae"
            },
            {
              "number": 4,
              "questionId": "q438",
              "type": "实践与认识",
              "lesson": "practice-cognition",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:00bcca773f743849"
            },
            {
              "number": 5,
              "questionId": "q443",
              "type": "矛盾分析方法",
              "lesson": "contradiction-method",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:e5085b9c276c5058"
            },
            {
              "number": 6,
              "questionId": "q444",
              "type": "矛盾分析方法",
              "lesson": "contradiction-method",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:f6ecf5c4a803dc66"
            },
            {
              "number": 7,
              "questionId": "q449",
              "type": "历史唯物主义入门",
              "lesson": "productive-relations",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:38bda044a53270f6"
            },
            {
              "number": 8,
              "questionId": "q451",
              "type": "历史唯物主义入门",
              "lesson": "productive-relations",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:14454108b67f3b38"
            },
            {
              "number": 9,
              "questionId": "q454",
              "type": "毛泽东思想基础",
              "lesson": "mao-thought-context",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:479ef54f086f321b"
            },
            {
              "number": 10,
              "questionId": "pol2-01",
              "type": "社会存在与群众史观",
              "lesson": "social-being-people",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:4328e25ab9b04332"
            },
            {
              "number": 11,
              "questionId": "pol2-08",
              "type": "六个必须坚持",
              "lesson": "six-method-principles",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:382da0dc4026a2ce"
            },
            {
              "number": 12,
              "questionId": "pol2-15",
              "type": "新质生产力",
              "lesson": "new-quality-productivity",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:8962ebb295184d5c"
            },
            {
              "number": 13,
              "questionId": "pol2-21",
              "type": "进一步全面深化改革",
              "lesson": "reform-framework-2024",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:f7bccfe3f88e1f2d"
            },
            {
              "number": 14,
              "questionId": "pol3-02",
              "type": "毛泽东思想活的灵魂",
              "lesson": "mao-living-soul",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:19ce712724e0eb77"
            },
            {
              "number": 15,
              "questionId": "pol3-09",
              "type": "全国统一大市场",
              "lesson": "unified-market-rules",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:18c0ace800358140"
            }
          ]
        },
        {
          "id": "s2",
          "module": "常识判断",
          "title": "常识判断",
          "questionCount": 12,
          "questionIds": [
            "q184",
            "q249",
            "q250",
            "q390",
            "q392",
            "q51",
            "q55",
            "q58",
            "q61",
            "q402",
            "q404",
            "q408"
          ],
          "items": [
            {
              "number": 16,
              "questionId": "q184",
              "type": "国家机构",
              "lesson": "state-organs",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:13ae8eb88c08a404"
            },
            {
              "number": 17,
              "questionId": "q249",
              "type": "民事行为能力",
              "lesson": "civil-capacity",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:56f7f4cbc8e4aa1b"
            },
            {
              "number": 18,
              "questionId": "q250",
              "type": "民事行为能力",
              "lesson": "civil-capacity",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:eadd1049ca469ea9"
            },
            {
              "number": 19,
              "questionId": "q390",
              "type": "经济常识",
              "lesson": "cpi",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:72f91f1662203838"
            },
            {
              "number": 20,
              "questionId": "q392",
              "type": "经济常识",
              "lesson": "cpi",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:b21085d254a2c9cc"
            },
            {
              "number": 21,
              "questionId": "q51",
              "type": "物理常识",
              "lesson": "phase-change",
              "trainingStage": "未分层",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:5219f43dfdd520dd"
            },
            {
              "number": 22,
              "questionId": "q55",
              "type": "历史分期",
              "lesson": "history-periods",
              "trainingStage": "未分层",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:5cb5deaf4e204e61"
            },
            {
              "number": 23,
              "questionId": "q58",
              "type": "史书体例",
              "lesson": "historiography",
              "trainingStage": "未分层",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:c559c8c07f5a3eee"
            },
            {
              "number": 24,
              "questionId": "q61",
              "type": "古代科技",
              "lesson": "paper-printing",
              "trainingStage": "未分层",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:7bdb7bdb21b828fb"
            },
            {
              "number": 25,
              "questionId": "q402",
              "type": "宪法权利义务",
              "lesson": "constitutional-rights",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:f81be97cc28a6dea"
            },
            {
              "number": 26,
              "questionId": "q404",
              "type": "宪法权利义务",
              "lesson": "constitutional-rights",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:2f472d73ac37dc17"
            },
            {
              "number": 27,
              "questionId": "q408",
              "type": "行政复议基础",
              "lesson": "admin-review",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:1acdd6864bbddcec"
            }
          ]
        },
        {
          "id": "s3",
          "module": "言语理解",
          "title": "言语理解",
          "questionCount": 30,
          "questionIds": [
            "q151",
            "q209",
            "q175",
            "q212",
            "q241",
            "q242",
            "q238",
            "q239",
            "q187",
            "q188",
            "q376",
            "q378",
            "rx-scoped-reading-01",
            "rx-scoped-reading-04",
            "rx-scoped-reading-07",
            "q268",
            "q270",
            "q272",
            "q262",
            "q264",
            "q266",
            "q382",
            "q384",
            "q430",
            "q432",
            "fq-multi-paragraph-01",
            "fq-multi-paragraph-02",
            "fq-multi-paragraph-03",
            "pn-context-contrast-01",
            "pn-context-contrast-04"
          ],
          "items": [
            {
              "number": 28,
              "questionId": "q151",
              "type": "主旨概括",
              "lesson": "mainidea",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:4a8c329488d3f90e"
            },
            {
              "number": 29,
              "questionId": "q209",
              "type": "主旨概括",
              "lesson": "mainidea",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:a91e394b6f8c15c9"
            },
            {
              "number": 30,
              "questionId": "q175",
              "type": "逻辑填空",
              "lesson": "word",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:75db7c51042ca121"
            },
            {
              "number": 31,
              "questionId": "q212",
              "type": "逻辑填空",
              "lesson": "word",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:34b105dd6afcdc23"
            },
            {
              "number": 32,
              "questionId": "q241",
              "type": "语句排序",
              "lesson": "sentence-order",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:c087401e8d0b893e"
            },
            {
              "number": 33,
              "questionId": "q242",
              "type": "语句排序",
              "lesson": "sentence-order",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:afefd5b8c4343524"
            },
            {
              "number": 34,
              "questionId": "q238",
              "type": "细节判断",
              "lesson": "detail-reading",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:c4be2366aefd0fa4"
            },
            {
              "number": 35,
              "questionId": "q239",
              "type": "细节判断",
              "lesson": "detail-reading",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:7b3c5e8a6c95b16e"
            },
            {
              "number": 36,
              "questionId": "q187",
              "type": "语句衔接",
              "lesson": "sentence-link",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:f231c44ab998d2c0"
            },
            {
              "number": 37,
              "questionId": "q188",
              "type": "语句衔接",
              "lesson": "sentence-link",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:bd633fbe1d40b88a"
            },
            {
              "number": 38,
              "questionId": "q376",
              "type": "逻辑填空",
              "lesson": "context-blanks",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:881026649bfe58d8"
            },
            {
              "number": 39,
              "questionId": "q378",
              "type": "逻辑填空",
              "lesson": "context-blanks",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:fb283ec2782a5aec"
            },
            {
              "number": 40,
              "questionId": "rx-scoped-reading-01",
              "type": "主旨观点",
              "lesson": "scoped-reading",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:2163d518618fac8a"
            },
            {
              "number": 41,
              "questionId": "rx-scoped-reading-04",
              "type": "主旨观点",
              "lesson": "scoped-reading",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:d1a77b1488b3f322"
            },
            {
              "number": 42,
              "questionId": "rx-scoped-reading-07",
              "type": "主旨观点",
              "lesson": "scoped-reading",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:887652bef9c763b6"
            },
            {
              "number": 43,
              "questionId": "q268",
              "type": "限定词与细节判断",
              "lesson": "detail-boundaries",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:1a1d7227d561b72f"
            },
            {
              "number": 44,
              "questionId": "q270",
              "type": "限定词与细节判断",
              "lesson": "detail-boundaries",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:f2df6c751f0d2603"
            },
            {
              "number": 45,
              "questionId": "q272",
              "type": "限定词与细节判断",
              "lesson": "detail-boundaries",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:576f8a1bb1870573"
            },
            {
              "number": 46,
              "questionId": "q262",
              "type": "指代与语句衔接",
              "lesson": "cohesion-reference",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:d947b732207f53ec"
            },
            {
              "number": 47,
              "questionId": "q264",
              "type": "指代与语句衔接",
              "lesson": "cohesion-reference",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:57fa0d8cefb0bb6a"
            },
            {
              "number": 48,
              "questionId": "q266",
              "type": "指代与语句衔接",
              "lesson": "cohesion-reference",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:0cdb7086c55244a6"
            },
            {
              "number": 49,
              "questionId": "q382",
              "type": "标题选择",
              "lesson": "title-choice",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:535699d8f926fa00"
            },
            {
              "number": 50,
              "questionId": "q384",
              "type": "标题选择",
              "lesson": "title-choice",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:64277d7edb65f12c"
            },
            {
              "number": 51,
              "questionId": "q430",
              "type": "下文推断",
              "lesson": "next-paragraph",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:3aaced2bb60a3ae1"
            },
            {
              "number": 52,
              "questionId": "q432",
              "type": "下文推断",
              "lesson": "next-paragraph",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:7450b5b7a6ca1a5d"
            },
            {
              "number": 53,
              "questionId": "fq-multi-paragraph-01",
              "type": "多段阅读",
              "lesson": "fq-multi-paragraph",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:6b9fe6748f1c7b02"
            },
            {
              "number": 54,
              "questionId": "fq-multi-paragraph-02",
              "type": "多段阅读",
              "lesson": "fq-multi-paragraph",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:6c4d3d33cb79a9ab"
            },
            {
              "number": 55,
              "questionId": "fq-multi-paragraph-03",
              "type": "多段阅读",
              "lesson": "fq-multi-paragraph",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:e8375448b4494fe2"
            },
            {
              "number": 56,
              "questionId": "pn-context-contrast-01",
              "type": "语境辨析",
              "lesson": "pn-context-contrast",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:289f93affc551b89"
            },
            {
              "number": 57,
              "questionId": "pn-context-contrast-04",
              "type": "语境辨析",
              "lesson": "pn-context-contrast",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:61c9efdd5bc84f53"
            }
          ]
        },
        {
          "id": "s4",
          "module": "数量关系",
          "title": "数量关系",
          "questionCount": 15,
          "questionIds": [
            "q146",
            "q167",
            "q306",
            "q164",
            "q312",
            "q354",
            "q360",
            "q294",
            "q300",
            "q420",
            "rx-work-stages-04",
            "q426",
            "q318",
            "fq-dynamic-stock-04",
            "fq-integer-count-04"
          ],
          "items": [
            {
              "number": 58,
              "questionId": "q146",
              "type": "工程问题",
              "lesson": "work",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:e1bb38dde7e65b33"
            },
            {
              "number": 59,
              "questionId": "q167",
              "type": "排列组合",
              "lesson": "count",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:b2f214cfd3109321"
            },
            {
              "number": 60,
              "questionId": "q306",
              "type": "概率计算",
              "lesson": "probability",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:673dbe2a6bd330cc"
            },
            {
              "number": 61,
              "questionId": "q164",
              "type": "行程问题",
              "lesson": "travel",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:f40ee23594313b09"
            },
            {
              "number": 62,
              "questionId": "q312",
              "type": "集合容斥",
              "lesson": "inclusion",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:b5c512fdf762a04d"
            },
            {
              "number": 63,
              "questionId": "q354",
              "type": "余数问题",
              "lesson": "remainders",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:adbe1594112147da"
            },
            {
              "number": 64,
              "questionId": "q360",
              "type": "几何计算",
              "lesson": "geometry-scale",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:94df7aa97be6cd67"
            },
            {
              "number": 65,
              "questionId": "q294",
              "type": "经济利润",
              "lesson": "profit-discount",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:75e7d3cd29177db5"
            },
            {
              "number": 66,
              "questionId": "q300",
              "type": "浓度问题",
              "lesson": "mixture",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:793e763df43c5aab"
            },
            {
              "number": 67,
              "questionId": "q420",
              "type": "不放回概率",
              "lesson": "without-replacement",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:afef4fdac3429a54"
            },
            {
              "number": 68,
              "questionId": "rx-work-stages-04",
              "type": "分段工程",
              "lesson": "work-stages",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:85342e100abfb746"
            },
            {
              "number": 69,
              "questionId": "q426",
              "type": "三集合容斥",
              "lesson": "three-set-counting",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:c83bb840102d6a5c"
            },
            {
              "number": 70,
              "questionId": "q318",
              "type": "至少保证与抽屉原理",
              "lesson": "guarantee-count",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:ea73344e44e628bc"
            },
            {
              "number": 71,
              "questionId": "fq-dynamic-stock-04",
              "type": "动态存量",
              "lesson": "fq-dynamic-stock",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:fd49e76010ed42e4"
            },
            {
              "number": 72,
              "questionId": "fq-integer-count-04",
              "type": "整数约束与分类计数",
              "lesson": "fq-integer-count",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:26690b64b7ab3a96"
            }
          ]
        },
        {
          "id": "s5",
          "module": "判断推理",
          "title": "判断推理",
          "questionCount": 25,
          "questionIds": [
            "q322",
            "q324",
            "q326",
            "q160",
            "q161",
            "q206",
            "q227",
            "q155",
            "q202",
            "q282",
            "q284",
            "q274",
            "q276",
            "q278",
            "q346",
            "q348",
            "q350",
            "q286",
            "q288",
            "q290",
            "q330",
            "q332",
            "pn-compound-logic-01",
            "pn-compound-logic-02",
            "pn-compound-logic-03"
          ],
          "items": [
            {
              "number": 73,
              "questionId": "q322",
              "type": "条件推理",
              "lesson": "logic",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:5ee73889a282fa5f"
            },
            {
              "number": 74,
              "questionId": "q324",
              "type": "条件推理",
              "lesson": "logic",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:11d880300d609a2a"
            },
            {
              "number": 75,
              "questionId": "q326",
              "type": "条件推理",
              "lesson": "logic",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:d40e0a439fbd60a5"
            },
            {
              "number": 76,
              "questionId": "q160",
              "type": "论证评价",
              "lesson": "argument",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:0f1c413095aeeb5e"
            },
            {
              "number": 77,
              "questionId": "q161",
              "type": "论证评价",
              "lesson": "argument",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:2d740f65665a3e9f"
            },
            {
              "number": 78,
              "questionId": "q206",
              "type": "论证评价",
              "lesson": "argument",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:a37f84a0a3a22a7c"
            },
            {
              "number": 79,
              "questionId": "q227",
              "type": "论证评价",
              "lesson": "argument",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:dd950b6354fae175"
            },
            {
              "number": 80,
              "questionId": "q155",
              "type": "定义判断",
              "lesson": "definition",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:03fb0e00aa8e0556"
            },
            {
              "number": 81,
              "questionId": "q202",
              "type": "定义判断",
              "lesson": "definition",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:774ea9a3e7ed7649"
            },
            {
              "number": 82,
              "questionId": "q282",
              "type": "定义判断",
              "lesson": "definition-conditions",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:e56720b604b8e6c2"
            },
            {
              "number": 83,
              "questionId": "q284",
              "type": "定义判断",
              "lesson": "definition-conditions",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:a197fdbbfe484cd5"
            },
            {
              "number": 84,
              "questionId": "q274",
              "type": "类比推理",
              "lesson": "analogy",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:ef7d700e80f14c4e"
            },
            {
              "number": 85,
              "questionId": "q276",
              "type": "类比推理",
              "lesson": "analogy",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:8b8d0d006d9df4ee"
            },
            {
              "number": 86,
              "questionId": "q278",
              "type": "类比推理",
              "lesson": "analogy",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:37e12146d3e2823e"
            },
            {
              "number": 87,
              "questionId": "q346",
              "type": "排列推理",
              "lesson": "arrangement",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:a29b08c2ad70d5c0"
            },
            {
              "number": 88,
              "questionId": "q348",
              "type": "排列推理",
              "lesson": "arrangement",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:43722e07335cd59f"
            },
            {
              "number": 89,
              "questionId": "q350",
              "type": "排列推理",
              "lesson": "arrangement",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:589b97ab95651e8f"
            },
            {
              "number": 90,
              "questionId": "q286",
              "type": "因果论证",
              "lesson": "argument-controls",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:d4f66ae68a6cd270"
            },
            {
              "number": 91,
              "questionId": "q288",
              "type": "因果论证",
              "lesson": "argument-controls",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:8e70e2a96dcd580d"
            },
            {
              "number": 92,
              "questionId": "q290",
              "type": "因果论证",
              "lesson": "argument-controls",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:54f129a07c654d44"
            },
            {
              "number": 93,
              "questionId": "q330",
              "type": "量词与命题否定",
              "lesson": "quantified-logic",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:590a7d19e5f341d7"
            },
            {
              "number": 94,
              "questionId": "q332",
              "type": "量词与命题否定",
              "lesson": "quantified-logic",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:e624a55bbf95d539"
            },
            {
              "number": 95,
              "questionId": "pn-compound-logic-01",
              "type": "复合条件",
              "lesson": "pn-compound-logic",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": "pn-logic-selection",
              "signature": "v1:q4:df7250935c9888dd"
            },
            {
              "number": 96,
              "questionId": "pn-compound-logic-02",
              "type": "复合条件",
              "lesson": "pn-compound-logic",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": "pn-logic-selection",
              "signature": "v1:q4:b114a0e9cf31758f"
            },
            {
              "number": 97,
              "questionId": "pn-compound-logic-03",
              "type": "复合条件",
              "lesson": "pn-compound-logic",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": "pn-logic-selection",
              "signature": "v1:q4:d25b7e1ab339ce98"
            }
          ]
        },
        {
          "id": "s6",
          "module": "资料分析",
          "title": "资料分析",
          "questionCount": 20,
          "questionIds": [
            "q196",
            "q230",
            "q200",
            "q215",
            "q236",
            "q218",
            "rx-mixed-weights-04",
            "q233",
            "q414",
            "q416",
            "q366",
            "q368",
            "fq-index-caliber-04",
            "fq-index-caliber-07",
            "q130",
            "q131",
            "q132",
            "pn-share-scope-01",
            "pn-share-scope-02",
            "pn-share-scope-03"
          ],
          "items": [
            {
              "number": 98,
              "questionId": "q196",
              "type": "增长计算",
              "lesson": "growth",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:2870e9c27c94296a"
            },
            {
              "number": 99,
              "questionId": "q230",
              "type": "增长计算",
              "lesson": "growth",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:102651a87be11542"
            },
            {
              "number": 100,
              "questionId": "q200",
              "type": "比重计算",
              "lesson": "share",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:3c773e0b4d3a922f"
            },
            {
              "number": 101,
              "questionId": "q215",
              "type": "平均数计算",
              "lesson": "average",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:f95ab213cb249c1f"
            },
            {
              "number": 102,
              "questionId": "q236",
              "type": "间隔与年均增长",
              "lesson": "compound-growth",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:275d890d21a1a3a1"
            },
            {
              "number": 103,
              "questionId": "q218",
              "type": "混合增长",
              "lesson": "mixed-growth",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:7c76cdab483160e5"
            },
            {
              "number": 104,
              "questionId": "rx-mixed-weights-04",
              "type": "混合增长",
              "lesson": "mixed-weights",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:2424ae08ed851a82"
            },
            {
              "number": 105,
              "questionId": "q233",
              "type": "增长排序",
              "lesson": "rate-amount-order",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:fc3da1ca2772495a"
            },
            {
              "number": 106,
              "questionId": "q414",
              "type": "估算边界",
              "lesson": "estimation-boundary",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:87b602cc76671f5e"
            },
            {
              "number": 107,
              "questionId": "q416",
              "type": "估算边界",
              "lesson": "estimation-boundary",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:f786eaf4c4b481f4"
            },
            {
              "number": 108,
              "questionId": "q366",
              "type": "增长贡献率与拉动",
              "lesson": "growth-contribution",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:5eb5044140aa9fc5"
            },
            {
              "number": 109,
              "questionId": "q368",
              "type": "增长贡献率与拉动",
              "lesson": "growth-contribution",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:e4dded5b3acc2761"
            },
            {
              "number": 110,
              "questionId": "fq-index-caliber-04",
              "type": "指数与统计口径",
              "lesson": "fq-index-caliber",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:85e5822807370c06"
            },
            {
              "number": 111,
              "questionId": "fq-index-caliber-07",
              "type": "指数与统计口径",
              "lesson": "fq-index-caliber",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:b67364b4ea142394"
            },
            {
              "number": 112,
              "questionId": "q130",
              "type": "多表定位与日均比较",
              "lesson": "multi-table",
              "trainingStage": "识别概念",
              "materialId": "service-table",
              "materialGroup": null,
              "signature": "v1:q4:ee6488bb862189d7"
            },
            {
              "number": 113,
              "questionId": "q131",
              "type": "多表定位与日均比较",
              "lesson": "multi-table",
              "trainingStage": "迁移运用",
              "materialId": "service-table",
              "materialGroup": null,
              "signature": "v1:q4:170dabff4cfdebc1"
            },
            {
              "number": 114,
              "questionId": "q132",
              "type": "多表定位与日均比较",
              "lesson": "multi-table",
              "trainingStage": "检查边界",
              "materialId": "service-table",
              "materialGroup": null,
              "signature": "v1:q4:786067bef8f563ca"
            },
            {
              "number": 115,
              "questionId": "pn-share-scope-01",
              "type": "比重口径",
              "lesson": "pn-share-scope",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": "pn-data-category",
              "signature": "v1:q4:e7ba59694c717071"
            },
            {
              "number": 116,
              "questionId": "pn-share-scope-02",
              "type": "比重口径",
              "lesson": "pn-share-scope",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": "pn-data-category",
              "signature": "v1:q4:ce364379a3b11695"
            },
            {
              "number": 117,
              "questionId": "pn-share-scope-03",
              "type": "比重口径",
              "lesson": "pn-share-scope",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": "pn-data-category",
              "signature": "v1:q4:a8d2a98f5052eee5"
            }
          ]
        },
        {
          "id": "s7",
          "module": "福建专题",
          "title": "福建专题",
          "questionCount": 3,
          "questionIds": [
            "q394",
            "q395",
            "q397"
          ],
          "items": [
            {
              "number": 118,
              "questionId": "q394",
              "type": "福建自然地理",
              "lesson": "fujian-geography",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:2212b9cab555ef6e"
            },
            {
              "number": 119,
              "questionId": "q395",
              "type": "福建自然地理",
              "lesson": "fujian-geography",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:4aa0986a79b969d4"
            },
            {
              "number": 120,
              "questionId": "q397",
              "type": "福建自然地理",
              "lesson": "fujian-geography",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:645bc444529d6de0"
            }
          ]
        }
      ]
    },
    {
      "id": "original-120-b",
      "revision": 1,
      "title": "原创120题训练卷 B",
      "subtitle": "综合迁移与口径辨析",
      "kind": "original-simulation-training",
      "official": false,
      "isPastExam": false,
      "availability": "standalone-practice-ready",
      "questionCount": 120,
      "notice": "原创模拟 / 非官方 / 非真题。120题为本站自定训练配置；题量与分值非考试承诺，不代表福建省考实际卷型、分值、难度或80+成绩预测。",
      "description": "7个编辑训练模块，固定题序与完整原创解析。本站自定组卷，非全真卷；需自行设置训练预算。",
      "applicableExams": [
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
        "officialScale": false,
        "predictsExamScore": false
      },
      "sections": [
        {
          "id": "s1",
          "module": "政治理论",
          "title": "政治理论",
          "questionCount": 15,
          "questionIds": [
            "q182",
            "q246",
            "q439",
            "q441",
            "q445",
            "q450",
            "q456",
            "pol2-03",
            "pol2-10",
            "pol2-16",
            "pol2-18",
            "pol2-22",
            "pol2-24",
            "pol3-04",
            "pol3-10"
          ],
          "items": [
            {
              "number": 1,
              "questionId": "q182",
              "type": "理论概念",
              "lesson": "development",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:d685acac5f2ae496"
            },
            {
              "number": 2,
              "questionId": "q246",
              "type": "理论概念",
              "lesson": "modernization",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:da469091ab30e501"
            },
            {
              "number": 3,
              "questionId": "q439",
              "type": "实践与认识",
              "lesson": "practice-cognition",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:b45048ec7eb6326e"
            },
            {
              "number": 4,
              "questionId": "q441",
              "type": "实践与认识",
              "lesson": "practice-cognition",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:27b6ada74734c93f"
            },
            {
              "number": 5,
              "questionId": "q445",
              "type": "矛盾分析方法",
              "lesson": "contradiction-method",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:a0f6a0110cbac0dd"
            },
            {
              "number": 6,
              "questionId": "q450",
              "type": "历史唯物主义入门",
              "lesson": "productive-relations",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:34a768a743317657"
            },
            {
              "number": 7,
              "questionId": "q456",
              "type": "毛泽东思想基础",
              "lesson": "mao-thought-context",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:dc2885ff6a3f615f"
            },
            {
              "number": 8,
              "questionId": "pol2-03",
              "type": "社会存在与群众史观",
              "lesson": "social-being-people",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:924e4b2e759a6a92"
            },
            {
              "number": 9,
              "questionId": "pol2-10",
              "type": "六个必须坚持",
              "lesson": "six-method-principles",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:a0142f59a2c3545d"
            },
            {
              "number": 10,
              "questionId": "pol2-16",
              "type": "新质生产力",
              "lesson": "new-quality-productivity",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:ae562fadddba6a2d"
            },
            {
              "number": 11,
              "questionId": "pol2-18",
              "type": "新质生产力",
              "lesson": "new-quality-productivity",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:0c69d35ed8ff13a2"
            },
            {
              "number": 12,
              "questionId": "pol2-22",
              "type": "进一步全面深化改革",
              "lesson": "reform-framework-2024",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:e3d49ad61e361bdc"
            },
            {
              "number": 13,
              "questionId": "pol2-24",
              "type": "进一步全面深化改革",
              "lesson": "reform-framework-2024",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:8c454d45c79b3ebd"
            },
            {
              "number": 14,
              "questionId": "pol3-04",
              "type": "毛泽东思想活的灵魂",
              "lesson": "mao-living-soul",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:9b36987528acf0cf"
            },
            {
              "number": 15,
              "questionId": "pol3-10",
              "type": "全国统一大市场",
              "lesson": "unified-market-rules",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:06638998b5283c22"
            }
          ]
        },
        {
          "id": "s2",
          "module": "常识判断",
          "title": "常识判断",
          "questionCount": 12,
          "questionIds": [
            "q185",
            "q251",
            "q252",
            "q391",
            "q393",
            "q52",
            "q56",
            "q59",
            "q62",
            "q403",
            "q405",
            "q409"
          ],
          "items": [
            {
              "number": 16,
              "questionId": "q185",
              "type": "国家机构",
              "lesson": "state-organs",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:39aae73ec4150cba"
            },
            {
              "number": 17,
              "questionId": "q251",
              "type": "民事行为能力",
              "lesson": "civil-capacity",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:3434d6dafab5aae4"
            },
            {
              "number": 18,
              "questionId": "q252",
              "type": "民事行为能力",
              "lesson": "civil-capacity",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:c7cdffd4c1ec4f02"
            },
            {
              "number": 19,
              "questionId": "q391",
              "type": "经济常识",
              "lesson": "cpi",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:432c67faf750a1f6"
            },
            {
              "number": 20,
              "questionId": "q393",
              "type": "经济常识",
              "lesson": "cpi",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:975055d5d2ea0825"
            },
            {
              "number": 21,
              "questionId": "q52",
              "type": "物理常识",
              "lesson": "phase-change",
              "trainingStage": "未分层",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:06ed3a2a91aa0e1c"
            },
            {
              "number": 22,
              "questionId": "q56",
              "type": "历史分期",
              "lesson": "history-periods",
              "trainingStage": "未分层",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:1fac9d432c1cb065"
            },
            {
              "number": 23,
              "questionId": "q59",
              "type": "史书体例",
              "lesson": "historiography",
              "trainingStage": "未分层",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:d662868dda420271"
            },
            {
              "number": 24,
              "questionId": "q62",
              "type": "古代科技",
              "lesson": "paper-printing",
              "trainingStage": "未分层",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:664eb22dce963389"
            },
            {
              "number": 25,
              "questionId": "q403",
              "type": "宪法权利义务",
              "lesson": "constitutional-rights",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:d2953be4f85685bc"
            },
            {
              "number": 26,
              "questionId": "q405",
              "type": "宪法权利义务",
              "lesson": "constitutional-rights",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:1f1a002049b64724"
            },
            {
              "number": 27,
              "questionId": "q409",
              "type": "行政复议基础",
              "lesson": "admin-review",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:a84dd8c3add8b445"
            }
          ]
        },
        {
          "id": "s3",
          "module": "言语理解",
          "title": "言语理解",
          "questionCount": 30,
          "questionIds": [
            "q152",
            "q208",
            "q176",
            "q211",
            "q31",
            "q243",
            "q33",
            "q240",
            "q70",
            "q189",
            "q377",
            "q379",
            "rx-scoped-reading-02",
            "rx-scoped-reading-05",
            "rx-scoped-reading-08",
            "q269",
            "q271",
            "q273",
            "q263",
            "q265",
            "q267",
            "q383",
            "q385",
            "q431",
            "q433",
            "fq-multi-paragraph-04",
            "fq-multi-paragraph-05",
            "fq-multi-paragraph-06",
            "pn-context-contrast-02",
            "pn-context-contrast-05"
          ],
          "items": [
            {
              "number": 28,
              "questionId": "q152",
              "type": "主旨概括",
              "lesson": "mainidea",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:c8445d6ea1571534"
            },
            {
              "number": 29,
              "questionId": "q208",
              "type": "主旨概括",
              "lesson": "mainidea",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:128c7790a98f1818"
            },
            {
              "number": 30,
              "questionId": "q176",
              "type": "逻辑填空",
              "lesson": "word",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:d23030ee11eb6790"
            },
            {
              "number": 31,
              "questionId": "q211",
              "type": "逻辑填空",
              "lesson": "word",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:964afda26dfc6502"
            },
            {
              "number": 32,
              "questionId": "q31",
              "type": "语句排序",
              "lesson": "sentence-order",
              "trainingStage": "未分层",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:55c7857fd32e2fa1"
            },
            {
              "number": 33,
              "questionId": "q243",
              "type": "语句排序",
              "lesson": "sentence-order",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:d3a1eacdd48d802b"
            },
            {
              "number": 34,
              "questionId": "q33",
              "type": "细节判断",
              "lesson": "detail-reading",
              "trainingStage": "未分层",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:396b25f7f8b0ef79"
            },
            {
              "number": 35,
              "questionId": "q240",
              "type": "细节判断",
              "lesson": "detail-reading",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:c333069dbaa474e9"
            },
            {
              "number": 36,
              "questionId": "q70",
              "type": "语句衔接",
              "lesson": "sentence-link",
              "trainingStage": "未分层",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:fea54bc98cc0b0f1"
            },
            {
              "number": 37,
              "questionId": "q189",
              "type": "语句衔接",
              "lesson": "sentence-link",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:8b4b65273b660d0d"
            },
            {
              "number": 38,
              "questionId": "q377",
              "type": "逻辑填空",
              "lesson": "context-blanks",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:12b9571311f03da9"
            },
            {
              "number": 39,
              "questionId": "q379",
              "type": "逻辑填空",
              "lesson": "context-blanks",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:3c2ebe135f5dc277"
            },
            {
              "number": 40,
              "questionId": "rx-scoped-reading-02",
              "type": "主旨观点",
              "lesson": "scoped-reading",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:b991925cb391f242"
            },
            {
              "number": 41,
              "questionId": "rx-scoped-reading-05",
              "type": "主旨观点",
              "lesson": "scoped-reading",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:b8cb9c116ed57849"
            },
            {
              "number": 42,
              "questionId": "rx-scoped-reading-08",
              "type": "主旨观点",
              "lesson": "scoped-reading",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:538c7fffb2e6d3f7"
            },
            {
              "number": 43,
              "questionId": "q269",
              "type": "限定词与细节判断",
              "lesson": "detail-boundaries",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:9a5d97b323f03893"
            },
            {
              "number": 44,
              "questionId": "q271",
              "type": "限定词与细节判断",
              "lesson": "detail-boundaries",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:dd6dafdce89ff9d4"
            },
            {
              "number": 45,
              "questionId": "q273",
              "type": "限定词与细节判断",
              "lesson": "detail-boundaries",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:d146bb239a97f8b1"
            },
            {
              "number": 46,
              "questionId": "q263",
              "type": "指代与语句衔接",
              "lesson": "cohesion-reference",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:8d0a3ea158869a33"
            },
            {
              "number": 47,
              "questionId": "q265",
              "type": "指代与语句衔接",
              "lesson": "cohesion-reference",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:552e3667d984f87d"
            },
            {
              "number": 48,
              "questionId": "q267",
              "type": "指代与语句衔接",
              "lesson": "cohesion-reference",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:fbf91de244558f02"
            },
            {
              "number": 49,
              "questionId": "q383",
              "type": "标题选择",
              "lesson": "title-choice",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:63159092d62e9f0a"
            },
            {
              "number": 50,
              "questionId": "q385",
              "type": "标题选择",
              "lesson": "title-choice",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:ce0f7588bb6f45be"
            },
            {
              "number": 51,
              "questionId": "q431",
              "type": "下文推断",
              "lesson": "next-paragraph",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:212ac10b30ec0dab"
            },
            {
              "number": 52,
              "questionId": "q433",
              "type": "下文推断",
              "lesson": "next-paragraph",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:d5a2ac84c7b09432"
            },
            {
              "number": 53,
              "questionId": "fq-multi-paragraph-04",
              "type": "多段阅读",
              "lesson": "fq-multi-paragraph",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:049dedaa586fbcee"
            },
            {
              "number": 54,
              "questionId": "fq-multi-paragraph-05",
              "type": "多段阅读",
              "lesson": "fq-multi-paragraph",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:6242c9cccf6e4a30"
            },
            {
              "number": 55,
              "questionId": "fq-multi-paragraph-06",
              "type": "多段阅读",
              "lesson": "fq-multi-paragraph",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:7a39e6e62276715c"
            },
            {
              "number": 56,
              "questionId": "pn-context-contrast-02",
              "type": "语境辨析",
              "lesson": "pn-context-contrast",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:dab965d8ba9516ea"
            },
            {
              "number": 57,
              "questionId": "pn-context-contrast-05",
              "type": "语境辨析",
              "lesson": "pn-context-contrast",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:56f9143b3526119b"
            }
          ]
        },
        {
          "id": "s4",
          "module": "数量关系",
          "title": "数量关系",
          "questionCount": 15,
          "questionIds": [
            "q191",
            "q221",
            "q307",
            "q194",
            "q313",
            "q355",
            "q361",
            "rx-profit-bases-05",
            "q301",
            "q421",
            "rx-work-stages-05",
            "q427",
            "q319",
            "fq-dynamic-stock-05",
            "fq-integer-count-05"
          ],
          "items": [
            {
              "number": 58,
              "questionId": "q191",
              "type": "工程问题",
              "lesson": "work",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:4143a1bb85f66189"
            },
            {
              "number": 59,
              "questionId": "q221",
              "type": "排列组合",
              "lesson": "count",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:dbf0a2080cc5f978"
            },
            {
              "number": 60,
              "questionId": "q307",
              "type": "概率计算",
              "lesson": "probability",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:ab73ca3750b7d2d9"
            },
            {
              "number": 61,
              "questionId": "q194",
              "type": "行程问题",
              "lesson": "travel",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:e3501d22b06c7b18"
            },
            {
              "number": 62,
              "questionId": "q313",
              "type": "集合容斥",
              "lesson": "inclusion",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:f68976ee5a8f0480"
            },
            {
              "number": 63,
              "questionId": "q355",
              "type": "余数问题",
              "lesson": "remainders",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:ce8a67a90bc092b1"
            },
            {
              "number": 64,
              "questionId": "q361",
              "type": "几何计算",
              "lesson": "geometry-scale",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:ac40c7663dba48ee"
            },
            {
              "number": 65,
              "questionId": "rx-profit-bases-05",
              "type": "经济利润",
              "lesson": "profit-bases",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:ce021928dbcb8390"
            },
            {
              "number": 66,
              "questionId": "q301",
              "type": "浓度问题",
              "lesson": "mixture",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:64759995c34d5187"
            },
            {
              "number": 67,
              "questionId": "q421",
              "type": "不放回概率",
              "lesson": "without-replacement",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:28fb92c3c015eb09"
            },
            {
              "number": 68,
              "questionId": "rx-work-stages-05",
              "type": "分段工程",
              "lesson": "work-stages",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:12e8f6cd541f8757"
            },
            {
              "number": 69,
              "questionId": "q427",
              "type": "三集合容斥",
              "lesson": "three-set-counting",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:57f3b8f1a9e0c0fb"
            },
            {
              "number": 70,
              "questionId": "q319",
              "type": "至少保证与抽屉原理",
              "lesson": "guarantee-count",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:27b8eeaba0263837"
            },
            {
              "number": 71,
              "questionId": "fq-dynamic-stock-05",
              "type": "动态存量",
              "lesson": "fq-dynamic-stock",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:87d3ff67b855011b"
            },
            {
              "number": 72,
              "questionId": "fq-integer-count-05",
              "type": "整数约束与分类计数",
              "lesson": "fq-integer-count",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:ca5839481dfea8f6"
            }
          ]
        },
        {
          "id": "s5",
          "module": "判断推理",
          "title": "判断推理",
          "questionCount": 25,
          "questionIds": [
            "q323",
            "q325",
            "q327",
            "q178",
            "q179",
            "q207",
            "q228",
            "q154",
            "q203",
            "q283",
            "q285",
            "q275",
            "q277",
            "q279",
            "q347",
            "q349",
            "q351",
            "q287",
            "q289",
            "q291",
            "q331",
            "q333",
            "pn-compound-logic-04",
            "pn-compound-logic-05",
            "pn-compound-logic-06"
          ],
          "items": [
            {
              "number": 73,
              "questionId": "q323",
              "type": "条件推理",
              "lesson": "logic",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:f1644b7f7cd21a79"
            },
            {
              "number": 74,
              "questionId": "q325",
              "type": "条件推理",
              "lesson": "logic",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:0353347766ff3313"
            },
            {
              "number": 75,
              "questionId": "q327",
              "type": "条件推理",
              "lesson": "logic",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:26cce09912c180d1"
            },
            {
              "number": 76,
              "questionId": "q178",
              "type": "论证评价",
              "lesson": "argument",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:878e537518e0a689"
            },
            {
              "number": 77,
              "questionId": "q179",
              "type": "论证评价",
              "lesson": "argument",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:4cada42a52453290"
            },
            {
              "number": 78,
              "questionId": "q207",
              "type": "论证评价",
              "lesson": "argument",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:035a8947d16614ab"
            },
            {
              "number": 79,
              "questionId": "q228",
              "type": "论证评价",
              "lesson": "argument",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:3efff7fd26531da7"
            },
            {
              "number": 80,
              "questionId": "q154",
              "type": "定义判断",
              "lesson": "definition",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:369fc7bd985eeadf"
            },
            {
              "number": 81,
              "questionId": "q203",
              "type": "定义判断",
              "lesson": "definition",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:a2225c86f03cdac4"
            },
            {
              "number": 82,
              "questionId": "q283",
              "type": "定义判断",
              "lesson": "definition-conditions",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:38be935faf2ff7cb"
            },
            {
              "number": 83,
              "questionId": "q285",
              "type": "定义判断",
              "lesson": "definition-conditions",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:20722573d91ad17b"
            },
            {
              "number": 84,
              "questionId": "q275",
              "type": "类比推理",
              "lesson": "analogy",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:17c5fa58b1d17bce"
            },
            {
              "number": 85,
              "questionId": "q277",
              "type": "类比推理",
              "lesson": "analogy",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:0f5bf2b91596b9a1"
            },
            {
              "number": 86,
              "questionId": "q279",
              "type": "类比推理",
              "lesson": "analogy",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:006498401d3d7b3a"
            },
            {
              "number": 87,
              "questionId": "q347",
              "type": "排列推理",
              "lesson": "arrangement",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:631ccb2685880ac0"
            },
            {
              "number": 88,
              "questionId": "q349",
              "type": "排列推理",
              "lesson": "arrangement",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:8c907101de72b6c9"
            },
            {
              "number": 89,
              "questionId": "q351",
              "type": "排列推理",
              "lesson": "arrangement",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:b509c561392c8423"
            },
            {
              "number": 90,
              "questionId": "q287",
              "type": "因果论证",
              "lesson": "argument-controls",
              "trainingStage": "识别概念",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:6cbaff564d8d05ca"
            },
            {
              "number": 91,
              "questionId": "q289",
              "type": "因果论证",
              "lesson": "argument-controls",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:6dff5b32b471e020"
            },
            {
              "number": 92,
              "questionId": "q291",
              "type": "因果论证",
              "lesson": "argument-controls",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:6421e62fbee87623"
            },
            {
              "number": 93,
              "questionId": "q331",
              "type": "量词与命题否定",
              "lesson": "quantified-logic",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:b9bc8fc3acbb1665"
            },
            {
              "number": 94,
              "questionId": "q333",
              "type": "量词与命题否定",
              "lesson": "quantified-logic",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:f57390b1e8215cd9"
            },
            {
              "number": 95,
              "questionId": "pn-compound-logic-04",
              "type": "复合条件",
              "lesson": "pn-compound-logic",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": "pn-logic-order",
              "signature": "v1:q4:8bcbd61572ec78d9"
            },
            {
              "number": 96,
              "questionId": "pn-compound-logic-05",
              "type": "复合条件",
              "lesson": "pn-compound-logic",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": "pn-logic-order",
              "signature": "v1:q4:34d4f9b8a1f38e80"
            },
            {
              "number": 97,
              "questionId": "pn-compound-logic-06",
              "type": "复合条件",
              "lesson": "pn-compound-logic",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": "pn-logic-order",
              "signature": "v1:q4:48ea08f745a11d25"
            }
          ]
        },
        {
          "id": "s6",
          "module": "资料分析",
          "title": "资料分析",
          "questionCount": 20,
          "questionIds": [
            "q197",
            "q149",
            "q170",
            "q237",
            "rx-mixed-weights-05",
            "q234",
            "q415",
            "q417",
            "q367",
            "fq-index-caliber-05",
            "fq-index-caliber-08",
            "q370",
            "q371",
            "q372",
            "q373",
            "q374",
            "q375",
            "pn-share-scope-04",
            "pn-share-scope-05",
            "pn-share-scope-06"
          ],
          "items": [
            {
              "number": 98,
              "questionId": "q197",
              "type": "增长计算",
              "lesson": "growth",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:bb8518e749502677"
            },
            {
              "number": 99,
              "questionId": "q149",
              "type": "比重计算",
              "lesson": "share",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:4047e722479d37fc"
            },
            {
              "number": 100,
              "questionId": "q170",
              "type": "平均数计算",
              "lesson": "average",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:4853053b83771871"
            },
            {
              "number": 101,
              "questionId": "q237",
              "type": "间隔与年均增长",
              "lesson": "compound-growth",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:dc7a32c7c8c5b071"
            },
            {
              "number": 102,
              "questionId": "rx-mixed-weights-05",
              "type": "混合增长",
              "lesson": "mixed-weights",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:3d66b721a6f9bc2f"
            },
            {
              "number": 103,
              "questionId": "q234",
              "type": "增长排序",
              "lesson": "rate-amount-order",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:2869cd6a1a628e9e"
            },
            {
              "number": 104,
              "questionId": "q415",
              "type": "估算边界",
              "lesson": "estimation-boundary",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:77adb010e4dedcb4"
            },
            {
              "number": 105,
              "questionId": "q417",
              "type": "估算边界",
              "lesson": "estimation-boundary",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:ebdf536ac056e2b2"
            },
            {
              "number": 106,
              "questionId": "q367",
              "type": "增长贡献率与拉动",
              "lesson": "growth-contribution",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:7b28d8e6735fd292"
            },
            {
              "number": 107,
              "questionId": "fq-index-caliber-05",
              "type": "指数与统计口径",
              "lesson": "fq-index-caliber",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:9068e23372f0c87b"
            },
            {
              "number": 108,
              "questionId": "fq-index-caliber-08",
              "type": "指数与统计口径",
              "lesson": "fq-index-caliber",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:9139c6fa980d75f2"
            },
            {
              "number": 109,
              "questionId": "q370",
              "type": "多表定位与日均比较",
              "lesson": "multi-table",
              "trainingStage": "识别概念",
              "materialId": "service-pair-v026",
              "materialGroup": null,
              "signature": "v1:q4:5ae9ab8efe28d5e2"
            },
            {
              "number": 110,
              "questionId": "q371",
              "type": "多表定位与日均比较",
              "lesson": "multi-table",
              "trainingStage": "识别概念",
              "materialId": "service-pair-v026",
              "materialGroup": null,
              "signature": "v1:q4:254467cec2f7be28"
            },
            {
              "number": 111,
              "questionId": "q372",
              "type": "多表定位与日均比较",
              "lesson": "multi-table",
              "trainingStage": "迁移运用",
              "materialId": "service-pair-v026",
              "materialGroup": null,
              "signature": "v1:q4:98878141d80e1e55"
            },
            {
              "number": 112,
              "questionId": "q373",
              "type": "多表定位与日均比较",
              "lesson": "multi-table",
              "trainingStage": "迁移运用",
              "materialId": "service-pair-v026",
              "materialGroup": null,
              "signature": "v1:q4:35aec8857912f821"
            },
            {
              "number": 113,
              "questionId": "q374",
              "type": "多表定位与日均比较",
              "lesson": "multi-table",
              "trainingStage": "检查边界",
              "materialId": "service-pair-v026",
              "materialGroup": null,
              "signature": "v1:q4:e60f71cf25d977ef"
            },
            {
              "number": 114,
              "questionId": "q375",
              "type": "多表定位与日均比较",
              "lesson": "multi-table",
              "trainingStage": "检查边界",
              "materialId": "service-pair-v026",
              "materialGroup": null,
              "signature": "v1:q4:ce34544fd89a09f7"
            },
            {
              "number": 115,
              "questionId": "pn-share-scope-04",
              "type": "比重口径",
              "lesson": "pn-share-scope",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": "pn-data-regions",
              "signature": "v1:q4:4ced6d4bb4a99a7b"
            },
            {
              "number": 116,
              "questionId": "pn-share-scope-05",
              "type": "比重口径",
              "lesson": "pn-share-scope",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": "pn-data-regions",
              "signature": "v1:q4:f84052743836bbf8"
            },
            {
              "number": 117,
              "questionId": "pn-share-scope-06",
              "type": "比重口径",
              "lesson": "pn-share-scope",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": "pn-data-regions",
              "signature": "v1:q4:fc5c679357357699"
            }
          ]
        },
        {
          "id": "s7",
          "module": "福建专题",
          "title": "福建专题",
          "questionCount": 3,
          "questionIds": [
            "q396",
            "q398",
            "q399"
          ],
          "items": [
            {
              "number": 118,
              "questionId": "q396",
              "type": "福建自然地理",
              "lesson": "fujian-geography",
              "trainingStage": "迁移运用",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:4121cfebbd3117f7"
            },
            {
              "number": 119,
              "questionId": "q398",
              "type": "福建自然地理",
              "lesson": "fujian-geography",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:15e24d06d28a83a6"
            },
            {
              "number": 120,
              "questionId": "q399",
              "type": "福建自然地理",
              "lesson": "fujian-geography",
              "trainingStage": "检查边界",
              "materialId": null,
              "materialGroup": null,
              "signature": "v1:q4:1c99c6382fe49578"
            }
          ]
        }
      ]
    }
  ]
};
function freeze(value){if(value && typeof value === "object"){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}window.FULL_TRAINING_PAPERS=freeze(data);})();
