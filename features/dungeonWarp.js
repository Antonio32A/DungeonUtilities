import { settings } from "../settings";


class DungeonWarp {
    constructor() {
        this.name = "DungeonWarp";
        this.triggers = {}
        this.run();
    }

    run() {
        register("command", () => {
            ChatLib.command("warp dungeon_hub");
        }).setName(settings.getSetting("Commands", "Shortcut for /warp dungeon_hub. Default: /dung"));
    }
}

module.exports = { Feature: DungeonWarp }