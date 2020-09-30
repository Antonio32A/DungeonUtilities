import { settings } from "../settings";

const GlStateManager = Java.type("net.minecraft.client.renderer.GlStateManager");
const _Tessellator = Java.type("net.minecraft.client.renderer.Tessellator");
const DefaultVertexFormats = Java.type("net.minecraft.client.renderer.vertex.DefaultVertexFormats");
const ResourceLocation = Java.type("net.minecraft.util.ResourceLocation");
const GL11 = Java.type("org.lwjgl.opengl.GL11");

const RES_MAP_BACKGROUND = new ResourceLocation("textures/map/map_background.png");


class Map {
    constructor() {
        this.name = "Map";
        this.triggers = {
            "renderOverlay": [{
                "func": this.renderOverlay,
                "criteria": null
            }],
            "worldLoad": [{
                "func": this.worldLoad,
                "criteria": null
            }]
        };

        this.oldMapData = undefined;
    }

    worldLoad() {
        this.oldMapData = undefined;
    }

    renderOverlay() {
        let x = ~~settings.getSetting("Map", "X");
        let y = ~~settings.getSetting("Map", "Y");
        let scale = ~~settings.getSetting("Map", "Scale") / 100;

        let item = Player.getInventory().getItems()[8];
        let mapData;

        try {
            mapData = item.getItem().func_77873_a(item.getItemStack(), World.getWorld()); // ItemStack.getItem().getMapData()
            if (mapData === null) return;
            this.oldMapData = mapData;
        } catch (error) {
            if (error instanceof TypeError) {
                if (!settings.getSetting("Map", "Cache Map Data")) return;
                if (this.oldMapData !== undefined) {
                    mapData = this.oldMapData;
                } else return;
            } else {
                ChatLib.chat("&a[&DungeonUtilities&a] &cError loading map! Check your console and report this to &dAntonio32A&c!");
                return;
            }
        }

        try {
            GlStateManager.func_179094_E(); //GlStateManager.push()
            GlStateManager.func_179137_b(x, y, 0.0); // GlStateManager.translate()
            GlStateManager.func_179152_a(scale, scale, 1); //GlStateManager.scale()
            GlStateManager.func_179131_c(1.0, 1.0, 1.0, 1.0); // GlStateManager.color()
            if (settings.getSetting("Map", "Draw Background")) {
                drawMapBackground();
            }
            // Minecraft.entityRenderer.getMapItemRenderer.renderMap() draw the map without players
            Client.getMinecraft().field_71460_t.func_147701_i().func_148250_a(mapData, true);
            drawPlayersOnMap(mapData);
            GlStateManager.func_179121_F(); //GlStateManager.pop()
        } catch (error) {
            print(error);
        }
    }
}

// source: net.minecraft.client.gui/MapItemRenderer
const drawPlayersOnMap = (mapData) => {
    let i = 0;
    let j = 0;
    let k = 0;
    let tessellator = _Tessellator.func_178181_a();
    let worldrenderer = tessellator.func_178180_c();
    let z = 1.0;

    mapData.field_76203_h.forEach((icon, vec4b) => {
        GlStateManager.func_179094_E(); // push
        GlStateManager.func_179137_b(0, 0, z);
        GlStateManager.func_179109_b(i + vec4b.func_176112_b() / 2.0 + 64.0, j + vec4b.func_176113_c() / 2.0 + 64.0, -0.02);
        GlStateManager.func_179114_b((vec4b.func_176111_d() * 360) / 16.0, 0.0, 0.0, 1.0);
        GlStateManager.func_179152_a(4.0, 4.0, 1);
        GlStateManager.func_179109_b(-0.125, 0.125, 0.0);
        let b0 = vec4b.func_176110_a();
        let f1 = (b0 % 4) / 4.0;
        let f2 = (Math.floor(b0 / 4)) / 4.0;
        let f3 = (b0 % 4 + 1) / 4.0;
        let f4 = (Math.floor(b0 / 4) + 1) / 4.0;
        worldrenderer.func_181668_a(7, DefaultVertexFormats.field_181707_g);
        worldrenderer.func_181662_b(-1.0, 1.0, (k * -0.001)).func_181673_a(f1, f2).func_181675_d();
        worldrenderer.func_181662_b(1.0, 1.0, (k * -0.001)).func_181673_a(f3, f2).func_181675_d();
        worldrenderer.func_181662_b(1.0, -1.0, (k * -0.001)).func_181673_a(f3, f4).func_181675_d();
        worldrenderer.func_181662_b(-1.0, -1.0, (k * -0.001)).func_181673_a(f1, f4).func_181675_d();
        tessellator.func_78381_a();
        GlStateManager.func_179121_F(); // pop
        k++;
        z++;
    });

    GlStateManager.func_179094_E();
    GlStateManager.func_179109_b(0.0, 0.0, -0.04);
    GlStateManager.func_179152_a(1.0, 1.0, 1.0);
    GlStateManager.func_179121_F();
};

const drawMapBackground = () => {
    Client.getMinecraft().func_110434_K().func_110577_a(RES_MAP_BACKGROUND); //Minecraft.getTextureManager().bindTexture()
    let tessellator = _Tessellator.func_178181_a();
    let worldrenderer = tessellator.func_178180_c();
    GlStateManager.func_179094_E(); // push
    GlStateManager.func_179141_d();
    GL11.glNormal3f(0.0, 0.0, -1.0);
    GlStateManager.func_179137_b(0, 0, -1.0)
    worldrenderer.func_181668_a(7, DefaultVertexFormats.field_181707_g);
    worldrenderer.func_181662_b(-7.0, 135.0, 0.0).func_181673_a(0.0, 1.0).func_181675_d();
    worldrenderer.func_181662_b(135.0, 135.0, 0.0).func_181673_a(1.0, 1.0).func_181675_d();
    worldrenderer.func_181662_b(135.0, -7.0, 0.0).func_181673_a(1.0, 0.0).func_181675_d();
    worldrenderer.func_181662_b(-7.0, -7.0, 0.0).func_181673_a(0.0, 0.0).func_181675_d();
    tessellator.func_78381_a();
    GlStateManager.func_179121_F(); // pop
}

module.exports = { Feature: Map }