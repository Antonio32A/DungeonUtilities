import { drawBox } from "./glowingEffect";

let colors = {
    "§c": [255, 85, 85],
    "§e": [255, 255, 85],
    "§a": [85, 255, 85],
    "§2": [0, 170, 0],
    "§1": [0, 0, 170],
    "§5": [170, 0, 170],
    "§d": [255, 85, 255],
    "§7": [170, 170, 170],
    "§f": [255, 255, 255],
    "§0": [0, 0, 0]
};

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
        let realColor = null;
        let regex = /§./g
        if (World.getAllEntities().filter(entity => entity.getClassName() == "EntityArmorStand")
            .filter(entity => entity.getName().includes("Livid")).length > 1) {
            realLivid = World.getAllEntities().filter(entity => entity.getClassName() == "EntityArmorStand")
            .filter(entity => entity.getName().includes("Livid"))[0];
            if (!realColor && realLivid.getName().match(regex)) {
                realColor = realLivid.getName().match(regex)[0];
            } else {
                realColor = "§0";
            }
        ChatLib.chat(new Message(realLivid.getName()).setChatLineId(1274));
        } else {
            realLivid = null;
            realColor = null;
        }
        this.realLivid = realLivid;
        this.realColor = realColor;
    }
    
    renderWorld(partialTicks) {
        if (this.realLivid && this.realColor && colors[this.realColor]) {
            drawBox(this.realLivid, colors[this.realColor][0] / 255, colors[this.realColor][1] / 255, colors[this.realColor][2] / 255, 2.0, 1, -2, partialTicks);
        } else {
            return;
        }
    }

}
    
module.exports = { Feature: LividDetector }
