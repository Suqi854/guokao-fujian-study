"use strict";
// Original finite grid models. Rows are ordered from the top of the page down.
(() => {
  const rotate = rows => rows[0].split("").map((_, c) => rows.map(row => row[c]).reverse().join(""));
  const same = (a, b) => a.join("/") === b.join("/");
  const mirror = rows => rows.map(row => [...row].reverse().join(""));
  function components(rows, value, boundaryOnly = false) {
    const height = rows.length, width = rows[0].length, seen = new Set();
    let count = 0;
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      const key = y * width + x;
      if (rows[y][x] !== value || seen.has(key)) continue;
      let boundary = false;
      const pending = [[y, x]];
      seen.add(key);
      while (pending.length) {
        const [r, c] = pending.pop();
        if (r === 0 || c === 0 || r === height - 1 || c === width - 1) boundary = true;
        for (const [rr, cc] of [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]]) {
          const next = rr * width + cc;
          if (rr < 0 || cc < 0 || rr >= height || cc >= width || rows[rr][cc] !== value || seen.has(next)) continue;
          seen.add(next);
          pending.push([rr, cc]);
        }
      }
      if (!boundaryOnly || !boundary) count++;
    }
    return count;
  }
  function features(rows) {
    const transpose = rows[0].split("").map((_, c) => rows.map(row => row[c]).join(""));
    const candidates = [
      ["水平", [...rows].reverse()],
      ["竖直", mirror(rows)],
      ["左上—右下对角线", transpose],
      ["右上—左下对角线", rotate(rotate(transpose))],
    ];
    return {
      black: rows.join("").split("").filter(v => v === "1").length,
      parts: components(rows, "1"),
      holes: components(rows, "0", true),
      axes: candidates.filter(([, image]) => same(rows, image)).map(([name]) => name),
      central: same(rows, rotate(rotate(rows))),
    };
  }
  const api = { rotate, mirror, features };
  if (typeof module === "object" && module.exports) module.exports = api;
  else window.STUDY_VISUAL = api;
})();
