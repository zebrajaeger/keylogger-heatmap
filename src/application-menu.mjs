// const {Menu,MenuItem} = require('electron');
import {Menu, MenuItem} from 'electron'
import {gradients} from "./gradients.mjs";
import openAboutWindow from 'about-window';

function addGradient(menu, callback) {
  const g = {
    label: 'Gradient',
    submenu: []
  }
  menu.push(g);

  for (const gradientName of Object.keys(gradients)) {
    g.submenu.push(new MenuItem({
      label: gradientName,
      click: () => callback.onGradient(gradientName)
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
      click: () => callback.onSize(size)
    })
  }
  menu.push(g);
}

function about(){
  openAboutWindow({
    // icon_path: join(__dirname, 'icon.png'),
    copyright: 'Copyright (c) 2015 rhysd',
    package_json_dir: '..',
    open_devtools: process.env.NODE_ENV !== 'production',
  })
}

function addTools(menu, callback) {
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
      {label: 'About', click: callback.onAbout}
    ]
  }

  menu.push(g);
}

function createMenu(callback) {
  const menu = [];
  addGradient(menu, callback);
  addSizes(menu, callback);
  addTools(menu,callback);

  return Menu.buildFromTemplate(menu);
}

export {createMenu};
