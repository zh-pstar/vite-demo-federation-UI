<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import EleTreePlus from './components/EleTreePlus.vue'

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

const dark = ref(false)
</script>

<template>
  <div>
    <el-switch v-model="dark" />
  <EleTreePlus 
      :props="props" 
      :load="loadNode" 
      lazy 
      show-checkbox 
      :dark="dark"
  />
  </div>
</template>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
