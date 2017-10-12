/**
 * Created by cturner on 12/10/2017.
 */
var stage;
var portal;
var stone;
var renderer

function init() {
    {

        renderer = PIXI.autoDetectRenderer(1680, 1050);
        document.body.appendChild(renderer.view);
        renderer.backgroundColor = 0xffffff;
        stage = new PIXI.Container();

        renderer.autoResize = true;
        renderer.resize(window.innerWidth, window.innerHeight);

        window.addEventListener("resize", function (event) {
            scaleToWindow(renderer.view);
        });

        PIXI.loader
            .add(["img/blankStone.png", "img/portaltest.png"])
            .on("complete", assetLoad)
            .load();

        refresh();
    }
}

function assetLoad(){
    portal = new PIXI.Sprite(PIXI.loader.resources["img/portaltest.png"].texture);
    portal.scale.set(1,1);
    portal.position.set(renderer.width / 8 , renderer.height / 1.5);

    stone = new PIXI.Sprite(PIXI.loader.resources["img/blankStone.png"].texture);
    stone.scale.set(0.3,0.3);
    stone.position.set(renderer.width / 2 , renderer.height / 4);
    stone.interactive = true;
    stone.mousedown = function (mouseData) {
        animate();
    };

    var masksContainer = new PIXI.Container();
    var mask = new PIXI.Graphics();
    mask.beginFill(0xffffee);
    mask.drawRect(renderer.width / 4.8 , renderer.height / 7, renderer.width / 1.6 , renderer.height / 1.5);
    mask.endFill();
    masksContainer.addChild(mask, stone);
    stage.addChild(portal, stone, masksContainer);
    stone.mask = mask;
    refresh();

}

function refresh() {
    renderer.render(stage);
}

function animate(){
    stone.y += 10;
    stone.rotation -= 0.01;
    requestAnimationFrame(animate);
    refresh();
}