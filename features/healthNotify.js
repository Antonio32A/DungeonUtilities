class HealthNotify {
    constructor() {
        this.name = "Health Notify";
        this.triggers = {"tick": [{"func": this.tick, "criteria": null}]};
    }

    tick() {
        let title = "";
        let desc = "";

        Scoreboard.getLines(false).forEach(line => {
            let unformatted = line.toString();
            line = ChatLib.removeFormatting(line);
            if (line.endsWith("❤")) {
                line = line.split("❤")[0];
                let name = line.split(" ")[1];
                if (name.includes("-")) return;

                let unformattedHP = unformatted.split(" ")[2].split("§c❤")[0];
                if (unformattedHP.includes("§e") || (unformattedHP.includes("§c"))) {
                    title += "&c" + name + " ";
                    desc += unformattedHP + "❤ ";
                }
            }
        });
        if (title === "") return;
        title += "low!";
        Client.showTitle(title, desc, 0, 10, 10);
    }
}

module.exports = { Feature: HealthNotify }