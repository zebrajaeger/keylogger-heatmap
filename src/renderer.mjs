import {keyboards} from './keyboards.mjs'
import {gradients} from './gradients.mjs'

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
    gradient: gradients.rgb,
    visible: true,
     maxOpacity: 1,
     minOpacity: 0.05,
};

const heatmap = h337.create(config);

// add a new keystroke to the heatmap data
window.electronAPI.onKeyEvent((_event, value) => {
    if (value.isKeyUp === true) {
        // prevent two datapoints for every keystroke
        return;
    }

    let key = keyboard[value.keyCode];
    if (key) {
        heatmap.addData({x: bounds.w * key.x, y: bounds.h * key.y})
    } else {
        // tool to show key press data in the browser console, to map a new keyboard
        console.log(value)
    }
})

// change heatmap gradient colors
window.electronAPI.onGradientChange((_event, value) => {
    config.gradient = gradients[value] || gradients[0];
    heatmap.configure(config);
})

// change heatmap data points size
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

// tool to print out coordinate to add find out key position of a keyboard image
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
