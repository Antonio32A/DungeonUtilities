import { drawBox } from "./glowingEffect";

class LividDetector {
    constructor() {
        this.name = "Livid Detector";
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
        let realLivid = null;
        if (World.getAllEntities().filter(entity => entity.getClassName() == "EntityArmorStand")
            .filter(entity => entity.getName().includes("Livid")).length > 1) {
            realLivid = World.getAllEntities().filter(entity => entity.getClassName() == "EntityArmorStand")
            .filter(entity => entity.getName().includes("Livid"))[0];
        } else {
            realLivid = null;
        }
        this.realLivid = realLivid;
    }
    
    renderWorld(partialTicks) {
        if (this.realLivid != null) {
            drawBox(this.realLivid, 0, 255, 0, 2.0, 1, -2, partialTicks);
        } else {
            return;
        }
    }

}
    
module.exports = { Feature: LividDetector }