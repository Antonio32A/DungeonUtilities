import { drawBox } from "./glowingEffect";

class Blazes {
    constructor() {
        this.name = "Blazes";
        this.triggers = {
            "renderWorld": [{
                "func": this.renderWorld,
                "criteria": null
            }],
            "tick": [{
                "func": this.tick,
                "criteria": null
            }]
        };
        
    }

    tick() {
        let blazes = {};

        World.getAllEntities().filter(entity => entity.getName().includes("Blaze ")).forEach(entity => {
            let name = entity.getName().split(" ")[2].split("/")[1];
            if (name === undefined) {
                name = entity.getName().split(" ")[3].split("/")[1]; // runic mobs
            }
            let hp = name.slice(0, -3);
            hp = hp.slice(2);
            blazes[parseInt(hp)] = entity;
        });

        if (Math.min.apply(Math, Object.keys(blazes)) === Infinity) {
            this.smallest = null;
            this.biggest = null;
            return;
        }

        let smallest = Math.min.apply(Math, Object.keys(blazes));
        smallest = blazes[smallest];
        let biggest = Math.max.apply(Math, Object.keys(blazes));
        biggest = blazes[biggest];
        this.smallest = smallest;
        this.biggest = biggest;
    }

    renderWorld(partialTicks) {
        if (!this.smallest || !this.biggest) return;
        
        let entity = this.smallest;

        Tessellator.drawString(
            "Smallest",
            entity.getLastX() + (entity.getX() - entity.getLastX()) * partialTicks,
            entity.getLastY() + (entity.getY() - entity.getLastY()) * partialTicks,
            entity.getLastZ() + (entity.getZ() - entity.getLastZ()) * partialTicks,
            16711680, true, 0.04, false
        );
        drawBox(entity, 255, 0, 0, 2.0, 1, -2, partialTicks);

        entity = this.biggest;
        Tessellator.drawString(
            "Biggest",
            entity.getLastX() + (entity.getX() - entity.getLastX()) * partialTicks,
            entity.getLastY() + (entity.getY() - entity.getLastY()) * partialTicks,
            entity.getLastZ() + (entity.getZ() - entity.getLastZ()) * partialTicks,
            65280, true, 0.04, false
        );
        drawBox(entity, 0, 255, 0, 2.0, 1, -2, partialTicks);
    }

}

module.exports = { Feature: Blazes }