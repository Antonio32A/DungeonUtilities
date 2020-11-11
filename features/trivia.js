import { settings } from "../settings";

class Trivia {
    constructor() {
        this.name = "Trivia";
        this.triggers = {}
        this.run();
    }

    run() {
        let trivia = JSON.parse(FileLib.read("DungeonUtilities", "trivia.json"));
        trivia.forEach(element => {
            register("chat", () => {
                if (!settings.getSetting("Trivia", "Enabled")) return;
                ChatLib.chat(`&eDungeonUtilities &8> &6 ` + element.answer);
            }).setCriteria(element.statements).setParameter("contains");
        });
    }
}

module.exports = { Feature: Trivia }