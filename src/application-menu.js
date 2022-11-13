const {Menu} = require('electron');

const template = [
    {
        label: 'Gradients',
        submenu: [{label: 'RGB'}, {label: 'A'}, {label: 'B'}, {label: 'C'},]
    },
    {
        label: 'Size',
        submenu: [{label: '10'}, {label: '20'}, {label: '40'}, {label: '60'}, {label: '100'},]
    },
    {
        label: 'Tools',
        submenu: [
            {label: 'Open Debug Console', role: 'toggleDevTools', accelerator: 'CommandOrControl+D'},
            {label: 'Force Reload', role: 'forceReload', accelerator: 'CommandOrControl+R'},
            {label: 'About', role: 'about'}
        ]
    }
];

function createMenu(callback) {
    const r = JSON.parse(JSON.stringify(template));
    r[0].submenu[0].click = () => callback.onGradient('rgb')
    r[0].submenu[1].click = () => callback.onGradient('a')
    r[0].submenu[2].click = () => callback.onGradient('b')
    r[0].submenu[3].click = () => callback.onGradient('c')

    r[1].submenu[0].click = () => callback.onSize(10)
    r[1].submenu[1].click = () => callback.onSize(20)
    r[1].submenu[2].click = () => callback.onSize(40)
    r[1].submenu[3].click = () => callback.onSize(60)
    r[1].submenu[4].click = () => callback.onSize(100)

    return Menu.buildFromTemplate(r);
}

module.exports = {createMenu};
