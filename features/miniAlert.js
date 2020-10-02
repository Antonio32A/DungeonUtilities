const inDungeons = () => {
    if(!(Scoreboard.getTitle().trim() != "" && Scoreboard.getLines().length > 0)) {
        return;
    }
    for(let i = 0; i < Scoreboard.getLines().length; i++) {
        let line = Scoreboard.getLines()[i];
        if(line.getName().includes('§cThe Cata') && line.getName().includes('mbs §8('))
            return true;
    }
    return false;
}
register("renderWorld", () => {
    if (settings.getSetting("MiniBoss Alerts", "Enabled") && inDungeons()) {
        World.getAllEntities().forEach(e => {
            if (e.getName().includes("Lost Adventurer")) Client.showTitle("", "&dLost Adventurer", 0, 3, 0);
            if (e.getName().includes("Angry Archeologist")) Client.showTitle("", "&cAngry Archeologist", 0, 3, 0);
            if (e.getName().includes("Shadow Assassin")) Client.showTitle("", "&5Shadow Assassin", 0, 3, 0);
            if (e.getName().includes("King Midas")) Client.showTitle("", "&6King Midas", 0, 3, 0);
        }) 
    }
})
