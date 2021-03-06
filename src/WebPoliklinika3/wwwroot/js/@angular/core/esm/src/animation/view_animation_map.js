/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ListWrapper, Map, StringMapWrapper } from '../facade/collection';
import { isPresent } from '../facade/lang';
export class ViewAnimationMap {
    constructor() {
        this._map = new Map();
        this._allPlayers = [];
    }
    get length() { return this.getAllPlayers().length; }
    find(element, animationName) {
        var playersByAnimation = this._map.get(element);
        if (isPresent(playersByAnimation)) {
            return playersByAnimation[animationName];
        }
    }
    findAllPlayersByElement(element) {
        const el = this._map.get(element);
        return el ? StringMapWrapper.values(el) : [];
    }
    set(element, animationName, player) {
        var playersByAnimation = this._map.get(element);
        if (!isPresent(playersByAnimation)) {
            playersByAnimation = {};
        }
        var existingEntry = playersByAnimation[animationName];
        if (isPresent(existingEntry)) {
            this.remove(element, animationName);
        }
        playersByAnimation[animationName] = player;
        this._allPlayers.push(player);
        this._map.set(element, playersByAnimation);
    }
    getAllPlayers() { return this._allPlayers; }
    remove(element, animationName) {
        var playersByAnimation = this._map.get(element);
        if (isPresent(playersByAnimation)) {
            var player = playersByAnimation[animationName];
            delete playersByAnimation[animationName];
            var index = this._allPlayers.indexOf(player);
            ListWrapper.removeAt(this._allPlayers, index);
            if (StringMapWrapper.isEmpty(playersByAnimation)) {
                this._map.delete(element);
            }
        }
    }
}
//# sourceMappingURL=view_animation_map.js.map