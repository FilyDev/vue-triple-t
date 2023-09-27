# vue-triple-t

<img src="https://i.gyazo.com/bd88bdf1429b2cd9f40028733091a3d9.png" alt="Image descriptif du projet" width="270" height="480">  <img src="https://i.gyazo.com/25f4b3b93a496c6f61adca13839d97df.png" alt="Image descriptif du projet" width="270" height="480"> <img src="https://i.gyazo.com/521ee44b47337dc87ea8aebdc51e1f9b.png" alt="Image descriptif du projet" width="270" height="480">

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [Custom Configuration](#custom-configuration)
- [Customize Configuration](#customize-configuration)


## Description

**vue-triple-t** is a simple and customizable Tic-Tac-Toe game built with Vue.js 3. You can easily integrate it into your Vue.js project and tailor it to your specific needs.

## Installation

To use **vue-triple-t** in your Vue.js project, install it via npm:

```bash
npm install vue-triple-t
```

## Usage

### Basic Usage

To use the game board in its default configuration, simply import `{i18n}` in your main.js. And the `{Board}` component and add it to your Vue template:

main.js
```js
import App from './App.vue'
import { createApp } from 'vue'
import { VueTripleTPlugin } from 'vue-triple-t'


createApp(App)
    .use(VueTripleTPlugin)
    .mount('#app')
```

YourComponent.vue
```vue
<template>
  <div>
    <Board/>
  </div>
</template>

<script setup>
import { Board } from 'vue-triple-t'
</script>
```

### Custom Configuration

You can customize the behavior and appearance of the game board by passing parameters to the Board component. Here's an example with custom parameters:

```bash
<template>
  <div>
    <Board
        lang="fr"
        board-x=""
        board-o=""
        board-align="center"
        board-color=""
        board-icons-color=""
        board-border-color=""
        board-border="custom"
        appear-transition=""
        score-board=""
        score-board-color=""
        score-board-text-color=""/>
  </div>
</template>

<script setup>
import { Board } from 'vue-triple-t'
</script>

```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

| Parameter            | Type      | Default   | Description                                         |
|----------------------|-----------|-----------|-----------------------------------------------------|
| lang                 | String    | 'en'      | Switch the site language ('fr' for French)          |
| boardX               | String    | 'X'       | Modify the default player "X" symbol                |
| boardO               | String    | 'O'       | Modify the default player "O" symbol                |
| appearTransition     | Number    | 1200ms    | Set the duration of icon appearances in milliseconds |
| boardAlign           | String    | 'none'    | Align the board and score-board ('center' to center both) |
| boardBorder          | String    | 'normal'  | Choose the board border style ('custom' for custom border, 'none' for no border) |
| scoreBoard           | String    | 'enabled' | Show or hide the score-board ('none' to hide)       |
| templateColor        | String    | 'transparent'    | Set the background color of the template project (CSS color value) |
| boardColor           | String    | 'transparent' | Set the background color of the board (CSS color value) |
| boardBorderColor     | String    | '#111' | Set the board's border color (CSS color value)     |
| boardIconsColor      | String    | '#111'    | Set the color of "X/O" icons on the board (CSS color value) |
| scoreBoardColor      | String    | '#333'    | Set the background color of the score-board (CSS color value) |
| scoreBoardTextColor  | String    | '#fff'    | Set the text color of the score-board (CSS color value) |
