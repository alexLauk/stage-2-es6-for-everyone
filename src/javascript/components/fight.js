import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {


    runOnKeys(() => console.log('PlayerOneAttack'), controls.PlayerOneAttack);

    runOnKeys(() => console.log('PlayerOneBlock'), controls.PlayerOneBlock);

    runOnKeys(() => console.log('PlayerTwoAttack'), controls.PlayerTwoAttack);

    runOnKeys(() => console.log('PlayerTwoBlock'), controls.PlayerTwoBlock);

    runOnKeys(() => console.log('PlayerOneCriticalHitCombination'), ...controls.PlayerOneCriticalHitCombination);

    runOnKeys(() => console.log('PlayerTwoCriticalHitCombination'), ...controls.PlayerTwoCriticalHitCombination);

  });
}

export function runOnKeys(func, ...codes) {
  let pressed = new Set();

  document.addEventListener('keydown', (event) => {
    pressed.add(event.code);

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
