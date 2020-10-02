const inDungeons = () => {
    if (!(Scoreboard.getTitle().trim() != "" && Scoreboard.getLines().length > 0)) {
        return;
    }
    Scoreboard.getLines(false).forEach(line => {
        if (line.getName().includes("§cThe Cata") && line.getName().includes("mbs §8("));
        return true;
    })
    return false;
}

class miniBossAlerts {
    constructor() {
        this.name = "MiniBoss Alerts"
        this.triggers = {
            "renderWorld": [{
                "func": this.renderWorld,
                "criteria": null
            }]
        }

    }
            
    renderWorld() {
        if (inDungeons) {
            World.getAllEntities().forEach(e => {
                if (e.getName().includes("Lost Adventurer")) Client.showTitle("", "&dLost Adventurer", 0, 5, 0);
                if (e.getName().includes("Angry Archeologist")) Client.showTitle("", "&cAngry Archeologist", 0, 5, 0);
                if (e.getName().includes("Shadow Assassin")) Client.showTitle("", "&5Shadow Assassin", 0, 5, 0);
                if (e.getName().includes("King Midas")) Client.showTitle("", "&6King Midas", 0, 5, 0);
            });
        }
    }
}
    
module.exports = { Feature: miniAlert }
