import { settings } from "../settings";


class Riddles {
    constructor() {
        this.name = "Riddles";
        this.triggers = {}
        this.run();
    }

    run() {
        let answers = JSON.parse(FileLib.read("DungeonUtilities", "answers.json"));

        answers.forEach(answer => {
            answer.statements.forEach((statement, i) => {
                if (i === answer.answer) {
                    register("chat", (name, target) => {
                        if (!settings.getSetting("Riddles", "Enabled")) return;
                        ChatLib.chat(`&eDungeonUtilities &8> &d${name} &ehas the blessing!`);
                    }).setCriteria(statement).setParameter("contains");
                }
            });
        });
    }
}

module.exports = { Feature: Riddles }