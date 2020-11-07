import { Setting, SettingsObject } from "../SettingsManager/SettingsManager";


class Settings {
    constructor() {
        settings.setCommand("dungeon").setSize(624, 278);
        Setting.register(settings);
    }
}

const settings = new SettingsObject(
    "DungeonUtilities",
    [
        {
            name: "Main",
            settings: [
                new Setting.Button("                                        &eDungeonUtilities", "&dBETA v0.9.99", () => {}),
                new Setting.Button("&bA collection of useful utilities for dungeons!", "By &aAntonio32A", () => {}),
                new Setting.Button("", "", () => {}),
                new Setting.Button("                                        &dCredits", "", () => {}),
                new Setting.Button("&bComplexOrigin", "Help with rendering the map.", () => {}),
                new Setting.Button("&6Flonja", "Helping with the map feature in it's early development.", () => {}),
                new Setting.Button("&dVals", "Map rendering fixes and the riddle solver.", () => {}),
                new Setting.Button("&6DJtheRedstoner", "Map scale and the map background feature.", () => {}),
                new Setting.Button("&cDebuggings", "Help with the Better Glowing Effect feature.", () => {}),
                new Setting.Button("&3SirDesco", "Trivia Room Solver.", () => {}),
                new Setting.Button("&2El_Oxo", "Help with the GitHub management.", () => {}),
                new Setting.Button("&amisterdepth", "MiniBoss Alerts.", () => {}),
                new Setting.Button("", "", () => {}),
                new Setting.Button("&dNote: &eAll mods are &cuse at your own risk&e.", "&cWARNING", () => {
                    ChatLib.chat(
                        "&eThis mod is use at your own risk meaning that I (&aAntonio32A) &eam not responsible for any " +
                        "punishments caused while using this mod.\n" +
                        "&aThe map preview and the better glowing effect are allowed by the admins &ebut other addons " +
                        "haven't been confirmed, meaning that they &dmight &ebe punishable. " +
                        "It doesn't mean that you will be instantly banned, but there is always a small chance.\n" +
                        "&bThis is why all the modules except the map and the better glowing effect are automatically " +
                        "disabled when you install the mod.\n" +
                        "&cIf you ever decide to uninstall the mod, do /ct delete DungeonUtilities"
                    );
                }),
                new Setting.Button("", "", () => {}),
                new Setting.Button("&eDiscord Support Server:", "&9https://discord.gg/knjSZSC", () => {
                    java.awt.Desktop.getDesktop().browse(new java.net.URI("https://discord.gg/knjSZSC"));
                }),
                new Setting.Button("&ePatreon:", "&9https://www.patreon.com/dungeonutilities", () => {
                    java.awt.Desktop.getDesktop().browse(new java.net.URI("https://www.patreon.com/dungeonutilities"));
                }),
                new Setting.Button("&eGitHub:", "&9https://github.com/Antonio32A/DungeonUtilities", () => {
                    java.awt.Desktop.getDesktop().browse(new java.net.URI("https://github.com/Antonio32A/DungeonUtilities"));
                })
            ]
        },
        {
            name: "Map",
            settings: [
                new Setting.Button("", "Shows the dungeon map on your screen.", () => {}),
                new Setting.Toggle("Enabled", true),
                new Setting.Slider("X", 300, 0, Renderer.screen.getWidth(), 0),
                new Setting.Slider("Y", 10, 0, Renderer.screen.getHeight(), 0),
                new Setting.Slider("Scale", 100, 0, 500, 0),
                new Setting.Toggle("Cache Map Data", true),
                new Setting.Toggle("Draw Background", false)
            ]
        },
        {
            name: "Blaze Solver",
            settings: [
                new Setting.Button("", "Tells you which blaze to hit in the blaze puzzle.", () => {}),
                new Setting.Toggle("Enabled", false)
            ]
        },
        {
            name: "Party Kicker",
            settings: [
                new Setting.Button(
                    "", "Automatically kicks people under the level requirement.", () => {}),
                new Setting.Toggle("Enabled", false),
                new Setting.Slider("Minimum Level", 0, 0, 50, 0),
                new Setting.Toggle("Healer Allowed", true),
                new Setting.Toggle("Mage Allowed", true),
                new Setting.Toggle("Berserk Allowed", true),
                new Setting.Toggle("Archer Allowed", true),
                new Setting.Toggle("Tank Allowed", true)
            ]
        },
        {
            name: "Riddle Solver",
            settings: [
                new Setting.Button("", "Solves the 3 man riddles.", () => {}),
                new Setting.Toggle("Enabled", false)
            ]
        },
        {
            name: "Health Notify",
            settings: [
                new Setting.Button("", "Notifies you when somebody is low on health.", () => {}),
                new Setting.Toggle("Enabled", false)
            ]
        },
        {
            name: "Better Glowing Effect",
            settings: [
                new Setting.Button("", "Adds a glowing effect similar to 1.9.", () => {}),
                new Setting.Toggle("Enabled", false)
            ]
        },
        {
            name: "Loot Tracker",
            settings: [
                new Setting.Button("", "Tracks your dungeon loot.", () => {}),
                new Setting.Toggle("Enabled", false),
                new Setting.Slider("X", 100, 0, Renderer.screen.getWidth(), 0),
                new Setting.Slider("Y", 200, 0, Renderer.screen.getHeight(), 0)
            ]
        },
        {
            name: "Trivia Solver",
            settings: [
                new Setting.Button("", "Solves the trivia.", () => {}),
                new Setting.Toggle("Enabled", false)
            ]
        },
        {
            name: "MiniBoss Alerts",
            settings: [
                new Setting.Button("", "&eAlerts you when a MiniBoss is near.", () => {}),
                new Setting.Toggle("Enabled", false),
            ]
        }
    ]
);

module.exports = { settings, Settings }
