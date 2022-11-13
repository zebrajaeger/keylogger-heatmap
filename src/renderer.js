const gradients = {
    rgb: {
        0.33: "rgb(0,0,255)",
        0.66: "rgb(0,255,0)",
        1: "rgb(255,0,0)",
    },
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
    blur: 1,
    gradient: gradients[0],
    visible: true,
    maxOpacity: .9,
    minOpacity: 0.2,
};

const heatmap = h337.create(config);

window.electronAPI.onKeyEvent((_event, value) => {
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

window.electronAPI.onGradientChange((_event, value) => {
    config.gradient = gradients[value] || gradients[0];
    heatmap.configure(config);
})
window.electronAPI.onSizeChange((_event, value) => {
    // for the new points
    config.radius = value;

    // for the existing point
    const dataObj = heatmap.getData();
    for (const e of dataObj.data) {
        e.radius = value;
    }
    heatmap.setData(dataObj);
    heatmap.repaint();
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
