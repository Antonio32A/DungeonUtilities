import { Settings, settings } from "./settings";

const features = [
    "map",
    "blazes",
    "healthNotify",
    "partyKicker",
    "riddles",
    "glowingEffect",
    "lootTracker",
    "trivia",
    "lividDetector",
    "dungeonWarp",
    "reParty"
];

new Settings();

features.forEach(feature => {
    let Feature = require(`./features/${feature}`);
    Feature = new Feature.Feature();

    Object.entries(Feature.triggers).forEach(([trigger, functions]) => {
       functions.forEach(_function => {
           let func = _function.func;
           let criteria = _function.criteria;

           if (trigger === "chat") {
               if (criteria === null) {
                   criteria = "${message}";
               }
               register("chat", (...args) => {
                   if (!settings.getSetting(Feature.name, "Enabled")) return;
                   func(...args);
               }).setCriteria(criteria);
           } else {
               register(trigger, (...args) => {
                   if (!settings.getSetting(Feature.name, "Enabled")) return;
                   func(...args);
               });
           }
       });
    });
});
