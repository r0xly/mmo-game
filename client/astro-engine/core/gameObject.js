import { Sprite } from "../sprites/sprite.js";
import { Vector } from "../util/vector.js";


/**
 * @typedef {Object} GameObject
 * @property {{[componentId: string]: Object}} components
 * @property {Vector} positionPivot
 * @property {Vector} rotationPivot
 * @property {number} rotation
 * @property {Vector} position
 * @property {Vector} size
 * @property {number} layer
 * @property {Sprite|string} render
 */

/**
 * An arrray of all GameObjects, organized by layer.
 * @type {GameObject[]}
*/
export let gameObjects = [];

function resortObjectsByLayer() {
    gameObjects = gameObjects.sort((objectA, objectB) => {
        if (objectA.layer < objectB.layer) 
            return - 1;
        else if (objectA.layer > objectB.layer) 
            return 1;

        return 0;
    });
}


export function addComponent(gameObject, ...components) {
    components.forEach(component => {
        gameObject.components[component.constructor.name] = component;
    });

}

export function removeComponent(gameObject, ...componentIds) {
    componentIds.forEach(id => {
       delete gameObject.components[id] ;
    });
}

/**
 * @param {GameObject} gameObject 
 * @param  {...string} componentIds 
 */
export function getComponent(gameObject, ...componentIds) {
    let components = [];

    componentIds.forEach(id => {
        let component = gameObject.components[id]

        if (component)
            components.push(component);


    })

    return components
}

export function queryObjects(...componentIds) {
    return gameObjects
        .filter(object => getComponent(object, ...componentIds))
        .map(object => [object, ...getComponent(object, ...componentIds)])
}

export function addPosition(gameObject, x ,y) {
    gameObject.position = gameObject.position.add(x, y);
}

export function deleteObject(gameObject) {
    delete gameObjects[gameObjects.indexOf(gameObject)];
}


/**
 * @param {{
 *  position?: number[] | Vector,
 *  size?: number[] | Vector,
 *  positionPivot?: number[] | Vector,
 *  rotationPivot?: number[] | Vector
 *  rotation?: number,
 *  components?: Object[],
 *  render?: string|Sprite,
 *  layer?: number,
 * }} properties
 * 
 * @return {GameObject}
 */
export function gameObject(properties) {
    const gameObject = {
        positionPivot: new Vector(0.5, 0.5),
        size: new Vector(100, 100),
        rotationPivot: Vector.Zero,
        position: Vector.Zero,
        components: {},
        render: "rect",
        rotation: 0,
        layer: 0,
    }

    for (const [property, value] of Object.entries(properties)) {
        if (property === "components")
            addComponent(gameObject, ...value)
        else if (Array.isArray(value))
            gameObject[property] = new Vector(value[0] || 0, value[1] || 0)
        else 
            gameObject[property] = value;
    }

    gameObjects.push(gameObject);
    resortObjectsByLayer();

    return gameObject;
}