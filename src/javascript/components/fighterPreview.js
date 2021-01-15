import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  //----------------my code------------------------------//
  const card = createElement({tagName:'div', className: 'fighter-preview___card'})
  const fitherImage = createFighterImage(fighter)
  const cardContent = fighter ? Object.entries(fighter)
                                      .filter(i => !/source|_id/g.test(i[0]))
                                      .reduce((prev, curr) => {
                                          prev += `<p>${curr[0]}: ${curr[1]}<p>`
                                          return prev
                                      },'<div class="fighter-info">') : ''

  card.insertAdjacentHTML('beforeend', cardContent)
  card.prepend(fitherImage)
  fighterElement.append(card)
  //------------------------------------------------//

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
