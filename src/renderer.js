const gradients = {
  a: {
    0.45: "rgb(0,0,255)",
    0.55: "rgb(0,255,255)",
    0.65: "rgb(0,255,0)",
    0.95: "yellow",
    1.0: "rgb(255,0,0)"
  },
  b: {
    0.45: "rgb(255,255,255)",
    0.70: "rgb(0,0,0)",
    0.9: "rgb(2,255,246)",
    1.0: "rgb(3,34,66)"
  },
  c: {
    0.45: "rgb(216,136,211)",
    0.55: "rgb(0,255,255)",
    0.65: "rgb(233,59,233)",
    0.95: "rgb(255,0,240)",
    1.0: "yellow"
  }
};

const $keyboard = $('#keyboard')
const bounds = {
  w: $keyboard.width(),
  h: $keyboard.height(),
}

const keyboard = keyboards.qwertz;

const config = {
  container: $keyboard.get(0),
  radius: 40,
  opacity: 0.5,
  gradient: gradients.c
};

const heatmap = h337.create(config);

window.electronAPI.onUpdateCounter((_event, value) => {
  if (value.isKeyUp === true) {
    return;
  }

  let key = keyboard[value.keyCode];
  if (key) {
  console.log(value, key)
    heatmap.addData({x: bounds.w * key.x, y: bounds.h * key.y})
  } else {
    console.log(value)
  }
})

$keyboard.mousedown(e => {
  const offset = $keyboard.offset();
  const pos = {
    x: e.pageX - offset.left,
    y: e.pageY - offset.top
  }

  const relPos = {
    x: pos.x / bounds.w,
    y: pos.y / bounds.h,
  }
  console.log(relPos)
})
