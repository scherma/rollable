<template>
  <div fluid>
    <div>
      <p>Generate a rollable dice block for D&amp;D Beyond stat sheets.</p>
    </div>
    <div>
      <form>
        <label for="display">Display Text</label>
        <input required id="display" placeholder="Display Text" v-model="form.displayText" />
        <label for="diceNotation">Dice Notation</label>
        <input required id="diceNotation" placeholder="e.g. 3d6+4" v-model="form.diceNotation" />
        <label for="rollType">Roll Type</label>
        <select id="rollType" v-model="form.rollType">
          <option v-for="rollType in validRollTypes">{{ rollType }}</option>
        </select>
        <label for="rollAction">Roll Action (optional)</label>
        <input id="rollAction" placeholder="Roll action name" v-model="form.rollAction" />
        <label v-if="form.rollType=='damage'" for="rollDamageType">Roll Damage Type</label>
        <select id="rollDamageType" v-if="form.rollType=='damage'" v-model="form.rollDamageType">
          <option v-for="rollDamageType in validRollDamageTypes">{{ rollDamageType }}</option>
        </select>
      </form>
      <button @click="blockgen">Generate</button>
    </div>
    <div v-if="err.text" class="error">
      <p>{{ err.text }}</p>
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

const err = reactive({text: null});

const blockgen = computed(() => {
  try {
    block.text = rollablegen(form.displayText, form.diceNotation, form.rollType, {rollAction: form.rollAction, rollDamageType: form.rollDamageType})
    err.text = null;
  } catch (error) {
    console.log(error);
    err.text = error;
  }
})
</script>

<style>
label {
  padding: 0 8px 0 8px;
} 

.error {
  color: #c94c4c;
}
</style>
