import { settings } from "../settings";


class ReParty {
    constructor() {
        this.name = "ReParty";
        this.triggers = {}
        this.run();
    }

    run() {
        let shouldReparty = false;
        let rankRegex = /^\[(VIP|MVP|HELPER|MOD|ADMIN|YOUTUBE|PIG|MOJANG|APPLE|OWNER)\+{0,3}\] /;
        let memberList = [];
        let jsIsGarbageOrWhat = 1;
        
        register("command", () => {
            shouldReparty = true;
            ChatLib.command("party list");
        }).setName(settings.getSetting("Commands", "Shortcut for disband and reinvite. Default: /reparty"));
        
        register("chat", (type, players) => {
            let playersArray = players.split(" ● ");
            
            if (shouldReparty) {
                switch (type) {
                    case "Leader":
                        if (ChatLib.removeFormatting(playersArray[0]).replace(rankRegex, "").replace(" ●", "") != Player.getName()) {
                            ChatLib.chat("&cThis feature is only available to party leaders.");
                            shouldReparty = false;
                        }
                        break;
                    case "Moderators":
                        playersArray.forEach(pl => {
                            pl = ChatLib.removeFormatting(pl);
                            memberList.push(pl.replace(rankRegex, ""));
                        });
                        break;
                    case "Members":
                        playersArray.forEach(pl => {
                            pl = ChatLib.removeFormatting(pl);
                            memberList.push(pl.replace(rankRegex, ""));
                        });
                        setTimeout(() => {ChatLib.command("party disband")}, 1000);
                        memberList.forEach(mem => {
                            setTimeout(() => {ChatLib.command("party invite " + mem)}, 1000*(jsIsGarbageOrWhat + 1));
                            jsIsGarbageOrWhat++;
                        });
                        memberList = [];
                        shouldReparty = false;
                        jsIsGarbageOrWhat = 1;
                        break;
                }
            }

        }).setCriteria("&eParty ${type}: ${players}");
        
        register("chat", () => {
            shouldReparty = false;
        }).setCriteria("&cYou are not currently in a party.&r");
    }
}

module.exports = { Feature: ReParty }