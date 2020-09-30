import { settings } from "../settings";


class PartyKicker {
    constructor() {
        this.name = "Party Kicker";
        this.triggers = {
            "chat": [{
                "func": this.chat,
                "criteria": "Dungeon Finder > ${name} joined the dungeon group! (${_class} Level ${level})"
            }]
        };
    }

    chat(name, _class, level)  {
        let requirement = settings.getSetting("Party Kicker", "Minimum Level");
        let classRequirement = settings.getSetting("Party Kicker", _class + " Allowed");

        if (parseInt(level) < requirement || !classRequirement) {
            ChatLib.command("party kick " + name);
        }
    }
}

module.exports = { Feature: PartyKicker }