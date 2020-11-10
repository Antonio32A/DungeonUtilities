import { drawBox } from "./glowingEffect";

class LividDetector {
    constructor() {
        this.name = "Livid Detector";
        this.triggers = {"renderWorld": [{"func": this.renderWorld, "criteria": null}]};
    }
    
    renderWorld(partialTicks) {
        
        let realLivid = null;
        
        if (World.getAllEntities().filter(entity => entity.getClassName() == "EntityArmorStand").filter(entity => entity.getName().includes("Livid")).length > 1) {
            realLivid = World.getAllEntities().filter(entity => entity.getClassName() == "EntityArmorStand").filter(entity => entity.getName().includes("Livid"))[0];
            drawBox(realLivid, 0, 255, 0, 2.0, 1, -2, partialTicks);
            
        } else {
            realLivid = null;
        }

    }
        
        
}
    
module.exports = { Feature: LividDetector }