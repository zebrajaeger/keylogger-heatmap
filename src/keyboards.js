const keyboards = {
  qwertz: {}
}

const ys = [0.064, 0.162, 0.242, 0.322, 0.406, 0.484];

const cfgs = [
  {
    keys: [27],
    x: 0.03,
    row: 0,
  }, {
    keys: [112, 113, 114, 115],
    xMin: 0.111,
    xMax: 0.236,
    row: 0,
  }, {
    keys: [116, 117, 118, 119],
    xMin: 0.293,
    xMax: 0.416,
    row: 0,
  }, {
    keys: [120, 121, 122, 123],
    xMin: 0.473,
    xMax: 0.596,
    row: 0,
  }, {
    $: 'print, roll,pause',
    keys: [44, 145, 19],
    xMin: 0.653,
    xMax: 0.736,
    row: 0,
  },

  {
    keys: [220, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 219, 221],
    xMin: 0.03,
    xMax: 0.517,
    row: 1,
  }, {
    keys: [8],
    row: 1,
    x: 0.576,
  }, {
    $: 'insert ,pos1, up',
    keys: [45, 36, 33],
    xMin: 0.653,
    xMax: 0.736,
    row: 1,
  }, {
    $: 'block',
    keys: [144, 111, 106, 109],
    xMin: 0.795,
    xMax: 0.918,
    row: 1,
  },

  {
    keys: [9],
    x: 0.042,
    row: 2,
  }
  , {
    keys: [81, 87, 69, 82, 84, 90, 85, 73, 79, 80, 186, 187],
    xMin: 0.093,
    xMax: 0.537,
    row: 2,
  },
  {
    $: 'remove ,end, down',
    keys: [46, 35, 34],
    xMin: 0.653,
    xMax: 0.736,
    row: 2,
  }, {
    $: 'block',
    keys: [103, 104, 105],
    xMin: 0.795,
    xMax: 0.876,
    row: 2,
  },

  {
    $: 'return',
    keys: [13],
    x: 0.588,
    y: 0.286,
  }, {
    $: 'capslock',
    keys: [20],
    x: 0.048,
    row: 3,
  }, {
    keys: [65, 83, 68, 70, 71, 72, 74, 75, 76, 192, 222, 191],
    row: 3,
    xMin: 0.105,
    xMax: 0.549,
  }, {
    $: 'block',
    keys: [100, 101, 102],
    xMin: 0.795,
    xMax: 0.876,
    row: 3,
  },

  {
    $: 'block-plus',
    key: 107,
    x: 0.918,
    y: 0.286,
  },

  {
    $: 'shift-L',
    key: 160,
    x: 0.039,
    row: 4
  }, {
    keys: [226, 89, 88, 67, 86, 66, 78, 77, 188, 190, 189],
    row: 4,
    xMin: 0.086,
    xMax: 0.489,
  }, {
    $: 'shift-R',
    key: 161,
    x: 0.566,
    row: 4
  }, {
    $: 'up',
    key: 38,
    x: 0.696,
    row: 4
  }, {
    $: 'block',
    keys: [97, 98, 99],
    xMin: 0.795,
    xMax: 0.876,
    row: 4,
  },

  {
    $: 'ctrl-L',
    key: 162,
    x: 0.042,
    row: 5
  },
  {
    $: 'alt',
    key: 164,
    x: 0.147,
    row: 5
  },
  {
    $: 'space',
    key: 32,
    x: 0.3,
    row: 5
  },
  {
    $: 'alt-gr',
    key: 165,
    x: 0.485,
    row: 5
  },
  {
    $: 'alt-gr',
    key: 163,
    x: 0.588,
    row: 5
  },
  {
    $: 'left,down,right',
    keys: [37, 40, 39],
    xMin: 0.653,
    xMax: 0.736,
    row: 5,
  },
]

const kb = keyboards.qwertz;

for (const cfg of cfgs) {
  const diffX = cfg.xMax - cfg.xMin;

  let n = (cfg.keys) ? cfg.keys.length - 1 : 0;
  if (n === 0) {
    const key = cfg.key || cfg.keys[0];
    const x = cfg.x || cfg.xMin;
    const y = (cfg.row === undefined) ? cfg.y : ys[cfg.row];
    kb[key] = {x, y};
  } else {
    for (let i = 0; i <= n; ++i) {
      const x = cfg.xMin + (i * diffX / (n));
      kb[cfg.keys[i]] = {x, y: ys[cfg.row]};
    }
  }
}

console.log(keyboards)

