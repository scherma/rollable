export const validRollDamageTypes = [
  "Acid",
  "Bludgeoning",
  "Cold",
  "Fire",
  "Force",
  "Lightning",
  "Necrotic",
  "Piercing",
  "Poison",
  "Psychic",
  "Radiant",
  "Slashing",
  "Thunder"
]


export const validRollTypes = [
  "roll",
  "to hit",
  "damage",
  "heal",
  "spell",
  "save",
  "check"
]


function rollable(displayText, diceNotation, rollType, optargs) {
  let notationBlock = {}

  validateNotation(diceNotation)
  notationBlock.diceNotation = diceNotation

  validateRollType(rollType)
  notationBlock.rollType = rollType

  if (typeof(optargs.rollAction)=="string" && optargs.rollAction!="") {
    notationBlock.rollAction = optargs.rollAction
  }
  
  if (rollType=="damage") {
    if (optargs.rollDamageType==null) {
      throw new Error('Damage roll must have a damage type')
    } else {
      validateRollDamageType(optargs.rollDamageType)
      notationBlock.rollDamageType = optargs.rollDamageType
    }
  }
  return `[rollable]${displayText};${JSON.stringify(notationBlock)}[/rollable]`
}

function validateNotation(diceNotation) {
  let diceNotationElements = diceNotation.split("+")
  diceNotationElements.forEach((element) => {
    if (! /^\d+(?:d(?:2|3|4|6|8|10|12|20|100))?$/.test(element) ) {
      throw new Error(`Invalid dice notation element "${element}"`)
    }
  })
}

function validateRollType(rollType) {
  if (validRollTypes.indexOf(rollType) >= 0) {
    return true
  } else {
    throw new Error(`Invalid roll type "${rollType}"`)
  }
}

function validateRollDamageType(rollDamageType) {
  if (validRollDamageTypes.indexOf(rollDamageType) < 0) {
    throw new Error(`Invalid Roll Damage Type "${rollDamageType}"`)
  }
}

export const rollablegen = rollable
