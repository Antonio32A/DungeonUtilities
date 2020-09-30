const GlStateManager = Java.type("net.minecraft.client.renderer.GlStateManager");
const GL11 = Java.type("org.lwjgl.opengl.GL11");


class BetterGlowingEffect {
    constructor() {
        this.name = "Better Glowing Effect";
        this.triggers = {
            "renderWorld": [{
                "func": this.renderWorld,
                "criteria": null
            }],
            "tick": [{
                "func": this.tick,
                "criteria": null
            }]
        };

        this.players = [];
        this.items = [];
    }

    renderWorld(partialTicks) {
        if (this.items === undefined) return;
        this.items.forEach(entity => {
            drawBox(entity, 0, 255, 126, 1.0, null, null, partialTicks);
        });
        this.players.forEach(entity => {
            drawBox(entity, 0, 255, 0, 2.0, null, null, partialTicks);
        })
    }

    tick() {
        // try to somewhat optimize it
        let items = [];
        let players = [];
        let names = [];
        let inCatacombs = false;

        Scoreboard.getLines().forEach(line => {
            line = ChatLib.removeFormatting(line.toString());
            if (line.includes("The Catac")) {
                inCatacombs = true;
                this.items = [];
                this.players = [];
            }
        });

        if (!inCatacombs) return;

        TabList.getNames().forEach(line => {
            if (line.includes("§a")) {
               let name = ChatLib.removeFormatting(line);
                names.push(name);
            }
        });

        World.getAllEntities().forEach(entity => {
            if (entity.getClassName() === "EntityItem") {
                items.push(entity);
            }
            if (entity.getClassName() === "EntityOtherPlayerMP") {
                if (names.includes(entity.getName())) {
                    players.push(entity);
                }
            }
        });

        this.items = items;
        this.players = players;
    }
}

const drawBox = (entity, red, green, blue, lineWidth, width, height, partialTicks) => {
    if (width === null) {
        width = entity.getWidth()
    }
    if (height === null) {
        height = entity.getHeight()
    }

    GL11.glBlendFunc(770, 771);
    GL11.glEnable(GL11.GL_BLEND);
    GL11.glLineWidth(lineWidth);
    GL11.glDisable(GL11.GL_TEXTURE_2D);
    GL11.glDisable(GL11.GL_DEPTH_TEST);
    GL11.glDepthMask(false);
    GlStateManager.func_179094_E();

    let positions = [
        [0.5, 0.0, 0.5],
        [0.5, 1.0, 0.5],
        [-0.5, 0.0, -0.5],
        [-0.5, 1.0, -0.5],
        [0.5, 0.0, -0.5],
        [0.5, 1.0, -0.5],
        [-0.5, 0.0, 0.5],
        [-0.5, 1.0, 0.5],
        [0.5, 1.0, -0.5],
        [0.5, 1.0, 0.5],
        [-0.5, 1.0, 0.5],
        [0.5, 1.0, 0.5],
        [-0.5, 1.0, -0.5],
        [0.5, 1.0, -0.5],
        [-0.5, 1.0, -0.5],
        [-0.5, 1.0, 0.5],
        [0.5, 0.0, -0.5],
        [0.5, 0.0, 0.5],
        [-0.5, 0.0, 0.5],
        [0.5, 0.0, 0.5],
        [-0.5, 0.0, -0.5],
        [0.5, 0.0, -0.5],
        [-0.5, 0.0, -0.5],
        [-0.5, 0.0, 0.5]
    ]

    let counter = 0;

    Tessellator.begin(3).colorize(red, green, blue);
    positions.forEach(pos => {
        Tessellator.pos(
            entity.getX() + (entity.getX() - entity.getLastX()) * partialTicks + pos[0] * width,
            entity.getY() + (entity.getY() - entity.getLastY()) * partialTicks + pos[1] * height,
            entity.getZ() + (entity.getZ() - entity.getLastZ()) * partialTicks + pos[2] * width
        ).tex(0, 0);

        counter++;
        if (counter % 2 === 0) {
            Tessellator.draw();
            if (counter !== 24) {
                Tessellator.begin(3).colorize(red, green, blue);
            }
        }
    });

    GlStateManager.func_179121_F();
    GL11.glEnable(GL11.GL_TEXTURE_2D);
    GL11.glEnable(GL11.GL_DEPTH_TEST);
    GL11.glDepthMask(true);
    GL11.glDisable(GL11.GL_BLEND);
};

module.exports = { Feature: BetterGlowingEffect, drawBox }