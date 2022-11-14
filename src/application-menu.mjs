// const {Menu,MenuItem} = require('electron');
import {Menu, MenuItem} from 'electron'
import {gradients} from "./gradients.mjs";

function addGradient(menu, callback) {
  const g = {
    label: 'Gradient',
    submenu: []
  }
  menu.push(g);

  for (const gradientName of Object.keys(gradients)) {
    g.submenu.push(new MenuItem({
      label: gradientName,
      click: () => callback(gradientName)
    }));
  }
}

function addSizes(menu, callback) {
  const sizes = [10, 20, 40, 60, 100];
  const g = {
    label: 'Size',
    submenu: []
  }
  for (const size of sizes) {
    g.submenu.push({
      label: `${size}`,
      click: () => callback(size)
    })
  }
  menu.push(g);
}

function addTools(menu) {
  const g = {
    label: 'Tools',
    submenu: [
      {
        label: 'Open Debug Console',
        role: 'toggleDevTools',
        accelerator: 'CommandOrControl+D'
      },
      {
        label: 'Force Reload',
        role: 'forceReload',
        accelerator: 'CommandOrControl+R'
      },
      {label: 'About', role: 'about'}
    ]
  }

  menu.push(g);
}

function createMenu(callback) {
  const menu = [];
  addGradient(menu, callback.onGradient);
  addSizes(menu, callback.onSize);
  addTools(menu);

  return Menu.buildFromTemplate(menu);
}

export {createMenu};
