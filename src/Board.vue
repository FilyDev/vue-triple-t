<template>
    <div
            class="template"
            :class="{'board-align': boardAlign === 'center'}"
            :style="{'backgroundColor': templateColor}">
        <div
                class="board"
                :class="{
                    'disabled': score,
                    'next-disabled': disabled,
                    'board-border-1': boardBorder === 'custom',
                    'board-border-2': boardBorder === 'none',}"
                :style="{
                    'background-color': boardColor,
                    'color': boardIconsColor || '#111'}">
            <div
                    v-for="(row, i) in grid"
                    class="board-rows"
                    :class="'board-rows-' + i"
                    :key="i">
                <div
                        v-for="(col, j) in row"
                        class="board-cols"
                        :class="'board-cols-' + j + (isWinningCell(i, j) ? ' winning-cell' : '')"
                        :style="{'border-color': boardBorderColor,}"
                        :key="j"
                        @click="push(i, j)">
                    <div
                             style="position: absolute;"
                             v-animate.mount="'circle-anim'"
                             v-if="col === 'O'">
                        <span class="circle-bar-1 material-symbols-outlined">looks</span>
                        <span class="circle-bar-2 material-symbols-outlined">looks</span>
                    </div>
                    <div
                            class="close-bar"
                            v-animate.mount="'bar-rotate'"
                            v-else-if="col === 'X'">
                        <span
                                :style="{'background-color': boardIconsColor}"
                                class="close-bar-1"></span>
                        <span
                                :style="{'background-color': boardIconsColor}"
                                class="close-bar-2"></span>
                    </div>
                    <span
                            v-animate.mount="'scale'"
                            v-if="col && col !== 'X' && col !== 'O'">
                        {{col}}
                    </span>
                </div>
            </div>
        </div>
        <br>


        <div
                :style="{
                'backgroundColor': scoreBoardColor,
                'color': scoreBoardTextColor
            }"
                v-if="scoreBoard !== 'none'"
                class="score-board">
            <h1 style="float: right">({{x}})</h1>
            <h1>{{t('youAre')}}: </h1>
            <div class="history-box">
                <h5>{{t('matchHistory')}}</h5>
                <div class="history-text">
                    <transition-group tag="div" name="list">
                        <p v-for="item in count" :key="item">
                            <span v-if="score">{{score}}</span>
                            <span v-else>{{item.item === x ? t('xTurn') : t('oTurn') + item.item}}</span>
                        </p>
                    </transition-group>
                </div>
            </div>
            <button
                    @click="restart"
                    v-if="score">{{t('playAgain')}}</button>
        </div>
    </div>
</template>

<script setup>
import {ref, computed, watch, onMounted} from "vue"
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()

// Props
let { templateColor, boardAlign, boardColor, boardBorder, boardBorderColor, boardIconsColor, boardX, boardO, appearTransition, lang, scoreBoard, scoreBoardColor, scoreBoardTextColor } = defineProps([
    'templateColor', 'boardAlign', 'boardColor',  'boardBorder',  'boardBorderColor',  'boardIconsColor',  'boardX',  'boardO', 'appearTransition', 'lang', 'scoreBoard', 'scoreBoardColor', 'scoreBoardTextColor'
])

onMounted(() => locale.value = lang)

let x = boardX
let o = boardO

x = !boardX ? "X" : boardX
o = !boardO ? "O" : boardO

x = x.length > 1 ? "X" : x
o = o.length > 1 ? "O" : o

// Ref's Board
let winningCells = ref([])
let count = ref([{item: x}])
let disabled = ref(false)
let score = ref(null)
let grid = ref([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
])

function push(i, j) {
    if (grid.value[i][j] === '') {
        let emptyCellsExist = false
        let i2 = getRandomInt(0, 3)
        let j2 = getRandomInt(0, 3)

        grid.value[i][j] = x
        disabled.value = true
        add(o)

        setTimeout(() => {
            disabled.value = false
        }, appearTransition || 1200)

        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if (grid.value[i][j] === '')
                    emptyCellsExist = true

        if (emptyCellsExist && !check.value)
            setTimeout(() => {
                while (grid.value[i2][j2] !== '') {
                    i2 = getRandomInt(0, 3)
                    j2 = getRandomInt(0, 3)
                }
                grid.value[i2][j2] = o
                add(x)
            }, appearTransition || 1200)
    }
}

const check = computed(() => {
    const allEqual = (arr) => arr.every(val => val !== '' && val === arr[0])

    const transpose = (matrix) => matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]))

    for (let i = 0; i < 3; i++) {
        if (allEqual(grid.value[i])) {
            winningCells.value = [[i, 0], [i, 1], [i, 2]]
            return grid.value[i][0]
        }
        const column = transpose(grid.value)[i]

        if (allEqual(column)) {
            winningCells.value = [[0, i], [1, i], [2, i]]
            return column[0]
        }

        if (i === 0 && allEqual([grid.value[0][0], grid.value[1][1], grid.value[2][2]])) {
            winningCells.value = [[0, 0], [1, 1], [2, 2]]
            return grid.value[0][0]
        }

        if (i === 0 && allEqual([grid.value[0][2], grid.value[1][1], grid.value[2][0]])) {
            winningCells.value = [[0, 2], [1, 1], [2, 0]]
            return grid.value[0][2]
        }
    }

    const d1 = [grid.value[0][0], grid.value[1][1], grid.value[2][2]]
    const d2 = [grid.value[0][2], grid.value[1][1], grid.value[2][0]]
    const isBoardFull = grid.value.every(row => row.every(cell => cell !== ''))

    if (allEqual(d1) || allEqual(d2)) return grid.value[1][1]
    if (isBoardFull) return null
})

watch(check, (data) => {
    if (data === o) score.value = t('lose')
    else if (data === x) score.value = t('win')
    else if (data === null) score.value = t('draw')
})

function restart() {
    score.value = null
    count.value = [{item: x}]
    grid.value = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]
}

function add(item) {
    count.value.splice(0, 0, { item })
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min)) + min
}
function isWinningCell(rowIdx, colIdx) {
    return winningCells.value.some(([i, j]) => i === rowIdx && j === colIdx)
}

</script>