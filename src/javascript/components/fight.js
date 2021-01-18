import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {

    const firstFighterHealthBar = document.getElementById('left-fighter-indicator');
    const secondFighterHealthBar = document.getElementById('right-fighter-indicator');
    firstFighter.currenthealth = firstFighter.health;
    secondFighter.currenthealth = secondFighter.health;

    const hit = (attacker, defender, bar) => {

      defender.currenthealth -= getDamage(attacker, defender);
      console.log(defender)
      bar.style.width = defender.currenthealth >= 0 ? `${defender.currenthealth / defender.health * 100}%` : '0%';

      if (defender.currenthealth <= 0) {
        resolve(attacker);
      }
    }

    runOnKeys(() => hit(firstFighter, secondFighter, secondFighterHealthBar), controls.PlayerOneAttack);

    runOnKeys(() => console.log('PlayerOneBlock'), controls.PlayerOneBlock);

    runOnKeys(() => hit(secondFighter, firstFighter, firstFighterHealthBar), controls.PlayerTwoAttack);

    runOnKeys(() => console.log('PlayerTwoBlock'), controls.PlayerTwoBlock);

    runOnKeys(() => hit(firstFighter, secondFighter, secondFighterHealthBar), ...controls.PlayerOneCriticalHitCombination);

    runOnKeys(() => hit(secondFighter, firstFighter, firstFighterHealthBar), ...controls.PlayerTwoCriticalHitCombination);

  });
}

export function runOnKeys(func, ...codes) {
  let pressed = new Set();

  document.addEventListener('keydown', (e) => {
    for (let code of pressed) {
      if(code === controls.PlayerOneBlock && e.code === controls.PlayerOneAttack){
        return;
      } else if(code === controls.PlayerTwoBlock && e.code === controls.PlayerTwoAttack){
        return;
      }
    }

    pressed.add(e.code);

    for (let code of codes) {
      if (!pressed.has(code)) {
        return;
      }
    }

    pressed.clear();

    func();
  });

  document.addEventListener('keyup', (event) => {
    pressed.delete(event.code);
  });

}

export function getDamage(attacker, defender) {
  const damage = getHitPower(attacker) - getBlockPower(defender);
  return damage >= 0 ? damage : 0;
}

export function getHitPower(fighter) {
  const criticalHitChance = Math.floor(Math.random() * 2) + 1;
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  const dodgeChance = Math.floor(Math.random() * 2) + 1;
  return fighter.defense * dodgeChance;
}
