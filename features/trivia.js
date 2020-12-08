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
                if (element.answer === "Check the calendar for the answer.") {
                    ChatLib.chat(`&eDungeonUtilities &8> &6 Year ` + sbYear());
                } else {
                    ChatLib.chat(`&eDungeonUtilities &8> &6 ` + element.answer);
                }
            }).setCriteria(element.statements).setParameter("contains");
        });
    }
}

const Year1 = 1560718500000;
const SByear = 446400000;

function sbYear() {
  let Time = new Date().getTime();
  let Years = Time-Year1;
  let YearNow = ((Years-(Years%SByear))/SByear)+2;
  return YearNow;
}

module.exports = { Feature: Trivia }
