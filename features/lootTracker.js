import { settings } from "../settings";
import { data } from "../data";


class LootTracker {
    constructor() {
        this.name = "Loot Tracker";
        this.triggers = {
            "renderOverlay": [{
                "func": this.renderOverlay,
                "criteria": null
            }],
            "chat": [{
                "func": this.chat,
                "criteria": "${*}&6&lRARE REWARD! ${reward}"
            }]
        };
        this.x = 0;
        this.y = 0;
    }

    renderOverlay() {
        const draw = (name, value, color) => {
            new Text(name, this.x, this.y)
                .setColor(color)
                .setShadow(true)
                .draw();
            new Text(value, this.x + 125, this.y)
                .setShadow(true)
                .setColor(color)
                .draw();
            this.y += 9;
        }

        this.x = ~~settings.getSetting("Loot Tracker", "X");
        this.y = ~~settings.getSetting("Loot Tracker", "Y");
        let loot = data.dungeonLoot;

        draw("&6Recombobulator 3000", loot.recombobulator, Renderer.GOLD);
        draw("&9Bonzo's Staff", loot.bonzoStaff, Renderer.BLUE);
        draw("&9Scarf's Studies", loot.scarfStudies, Renderer.BLUE);
        draw("&5Adaptive Blade", loot.adaptiveBlade, Renderer.DARK_PURPLE);
        draw("&5Adaptive Helm", loot.adaptiveHelm, Renderer.DARK_PURPLE);
        draw("&5Adaptive Chestplate", loot.adaptiveChestplate, Renderer.DARK_PURPLE);
        draw("&5Adaptive Leggings", loot.adaptiveLeggings, Renderer.DARK_PURPLE);
        draw("&5Adaptive Boots", loot.adaptiveBoots, Renderer.DARK_PURPLE);
    }

    chat(reward) {
        reward = ChatLib.removeFormatting(reward);
        ChatLib.chat(reward);
        let loot = data.dungeonLoot;
        switch(reward) {
            case "Recombobulator 3000":
                loot.recombobulator += 1;
                break;
            case "Bonzo's Staff":
                loot.bonzoStaff += 1;
                break;
            case "Scarf's Studies":
                loot.scarfStudies += 1;
                break;
            case "Adaptive Blade":
                loot.adaptiveBlade += 1;
                break;
            case "Adaptive Helm":
                loot.adaptiveHelm += 1;
                break;
            case "Adaptive Chestplate":
                loot.adaptiveChestplate += 1;
                break;
            case "Adaptive Leggings":
                loot.adaptiveLeggings += 1;
                break;
            case "Adaptive Boots":
                loot.adaptiveBoots += 1;
                break;
            default:
                return;
        }
    }
}


module.exports = { Feature: LootTracker }