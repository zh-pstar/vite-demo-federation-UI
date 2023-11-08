<template>
  <n-config-provider :style="{
    width: '100vw',
    height: '100vh',
  }" :theme="dark ? darkTheme : null">
    <NSwitch v-model:value="dark" />
    <div :style="{
      display: 'flex',
      width: '100vw',
      height: '100vh',
    }">
      <n-card :style="{
        width: '50%',
        height: '100%'
      }">
        <EleTree :style="{
          width: '100%',
          height: '100%'
        }" :props="props" :load="loadNode" lazy show-checkbox :dark="dark" />
      </n-card>
      <n-card>
        <n-space>
          <NTree :data="dataRef" :on-load="handleLoad" checkable allow-checking-not-loaded cascade />
        </n-space>
      </n-card>
    </div>

  </n-config-provider>
</template>

<script setup lang="ts">
import EleTree from 'remote-app/EleTree'

import { darkTheme } from 'naive-ui'

console.log('EleTree', EleTree)

let count = 1

interface Tree {
  name: string
}

const props = {
  label: 'name',
  children: 'zones',
}

const loadNode = (node: any, resolve: (data: Tree[]) => void) => {
  if (node.level === 0) {
    return resolve([{ name: 'Root1' }, { name: 'Root2' }])
  }
  if (node.level > 3) return resolve([])

  let hasChild = true
  if (node.data.name === 'region2') {
    hasChild = false
  }

  setTimeout(() => {
    let data: Tree[] = []
    if (hasChild) {
      data = [
        {
          name: `zone${count++}`,
        },
        {
          name: `zone${count++}`,
        },
      ]
    } else {
      data = []
    }

    resolve(data)
  }, 500)
}

const dataRef = ref(createData())
function createData() {
  return [
    {
      label: nextLabel(),
      key: 1,
      isLeaf: false
    },
    {
      label: nextLabel(),
      key: 2,
      isLeaf: false
    }
  ]
}
function nextLabel(currentLabel?: string): string {
  if (!currentLabel) return 'Out of Tao, One is born'
  if (currentLabel === 'Out of Tao, One is born') return 'Out of One, Two'
  if (currentLabel === 'Out of One, Two') return 'Out of Two, Three'
  if (currentLabel === 'Out of Two, Three') {
    return 'Out of Three, the created universe'
  }
  if (currentLabel === 'Out of Three, the created universe') {
    return 'Out of Tao, One is born'
  }
  return ''
}
const handleLoad = (node) => {
  console.log('handleLoad', handleLoad)
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      node.children = [
        {
          label: nextLabel(node.label),
          key: node.key + nextLabel(node.label) + '1',
          isLeaf: false
        },
        {
          label: nextLabel(node.label),
          key: node.key + nextLabel(node.label) + '2',
          isLeaf: false
        }
      ]
      resolve()
    }, 500)
  })
}

const dark = ref(false)
</script>

<style scoped>
.n-gradient-text {
  font-size: 36px;
}
</style>