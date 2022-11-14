import {qwertz} from './keyboard-qwertz.mjs';

export const keyboards = {
  qwertz: expandConfig(qwertz)
}

function expandConfig(keyboardDefinition) {
  const kb = {};
  const ys = keyboardDefinition.rowY;
  for (const cfg of keyboardDefinition.keys) {
    let n = (cfg.keys) ? cfg.keys.length - 1 : 0;
    if (n === 0) {
      // single key
      const key = cfg.key || cfg.keys[0];
      const x = cfg.x || cfg.xMin;
      const y = (cfg.row === undefined) ? cfg.y : ys[cfg.row];
      kb[key] = {x, y};
    } else {
      // key row
      const diffX = cfg.xMax - cfg.xMin;
      for (let i = 0; i <= n; ++i) {
        const x = cfg.xMin + (i * diffX / (n));
        kb[cfg.keys[i]] = {x, y: ys[cfg.row]};
      }
    }
  }
  return kb;
}
