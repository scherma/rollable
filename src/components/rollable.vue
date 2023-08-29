<template>
  <div fluid>
    <div>
      <form>
        <input required placeholder="Display Text" v-model="form.displayText" />
        <input required placeholder="e.g. 3d6+4" v-model="form.diceNotation" />
        <select v-model="form.rollType">
          <option v-for="rollType in validRollTypes">{{ rollType }}</option>
        </select>
        <input placeholder="Roll action name" v-model="form.rollAction" />
        <select v-if="form.rollType=='damage'" v-model="form.rollDamageType">
          <option v-for="rollDamageType in validRollDamageTypes">{{ rollDamageType }}</option>
        </select>
      </form>
      <button @click="blockgen">Generate</button>
    </div>
    <div fluid>
      <p>{{ block.text }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { rollablegen, validRollTypes, validRollDamageTypes } from '../rollable.js'

const form = reactive({
  displayText: null,
  diceNotation: null,
  rollType: null,
  rollAction: null,
  rollDamageType: null
})

const block = reactive({text: ""});

const blockgen = computed(() => {
  block.text = rollablegen(form.displayText, form.diceNotation, form.rollType, {rollAction: form.rollAction, rollDamageType: form.rollDamageType})
})
</script>

