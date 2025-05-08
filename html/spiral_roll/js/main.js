"use strict";
var gui_game = {
    win_panel: null,
    lose_panel: null,
    gui_avd_texture: null,
    btn_start: null,
    text_record: null,
    text_current_score: null,
    btn_sound_enabled: null,
    btn_sound_disabled: null,
    btn_reset_gameplay: null,
    btn_sound: null,
    load: function () {
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        advancedTexture.idealHeight = 1024;
        gui_game.gui_avd_texture = advancedTexture;
        gui_game.text_score = new BABYLON.GUI.TextBlock();
        gui_game.text_score.text = "0";
        gui_game.text_score.textVerticalAlignment =
            BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        gui_game.text_score.color = "black";
        gui_game.text_score.fontSize = 64;
        gui_game.text_score.top = "64px";
        advancedTexture.addControl(gui_game.text_score);
        gui_game.text_score.fontFamily = "VinylCuts";
        var text = new BABYLON.GUI.TextBlock();
        text.text = "level " + BBABYLON.DataStorage.ReadNumber("current_level_text", 1);
        advancedTexture.addControl(text);
        text.textVerticalAlignment =
            BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        text.color = "black";
        text.fontSize = 32;
        text.top = "16px";
        text.fontFamily = "VinylCuts";
        var text = new BABYLON.GUI.TextBlock();
        text.text = "0";
        text.shadowColor = "black";
        text.shadowOffsetX = 0;
        text.shadowOffsetY = 2;
        text.linkOffsetX = -160;
        text.linkOffsetY = -15;
        this.text_current_score = text;
        text.rotation = -0.3;
        text.color = "white";
        text.fontSize = 64;
        text.fontFamily = "VinylCuts";
        gui_game.gui_avd_texture.addControl(gui_game.text_current_score);
        gui_game.text_current_score.linkWithMesh(camera_parent);
        text.color = "transparent";
        var panel = new BABYLON.GUI.StackPanel();
        advancedTexture.addControl(panel);
        var button = BABYLON.GUI.Button.CreateSimpleButton("but", "");
        button.width = 1;
        button.height = "1000px";
        button.color = "white";
        button.background = "transparent";
        button.thickness = 0;
        panel.addControl(button);
        button.onPointerDownObservable.add(function () {
            game.player_pressing = true;
            on_press_down();
        });
        button.onPointerUpObservable.add(function () {
            game.player_pressing = false;
            on_press_up();
        });
        //reset in gameplay
        var button = BABYLON.GUI.Button.CreateImageOnlyButton("btn_reset_game_play", "images/btn_reset.png");
        gui_game.btn_reset_gameplay = button;
        button.width = "96px";
        button.height = "96px";
        button.color = "white";
        button.horizontalAlignment = BBABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        button.verticalAlignment = BBABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        button.top = "16px";
        button.left = "16px";
        button.onPointerUpObservable.add(function () {
            engine.stopRenderLoop(game.tick);
            scene.stopAllAnimations();
            scene.dispose();
            game.load(game.current_level);
        });
        button.background = "transparent";
        button.thickness = 0;
        advancedTexture.addControl(button);
        //button sound enabled
        var button = BABYLON.GUI.Button.CreateImageOnlyButton("but", "images/sound_enabled.png");
        gui_game.btn_sound_enabled = button;
        button.width = "96px";
        button.height = "96px";
        button.color = "white";
        button.horizontalAlignment = BBABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        button.verticalAlignment = BBABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        button.top = "16px";
        button.left = "-16px";
        button.onPointerUpObservable.add(function () {
            gui_game.gui_avd_texture.removeControl(gui_game.btn_sound_enabled);
            gui_game.gui_avd_texture.addControl(gui_game.btn_sound_disabled);
            BBABYLON.Engine.audioEngine.setGlobalVolume(0);
        });
        button.background = "transparent";
        button.thickness = 0;
        if (BBABYLON.Engine.audioEngine.getGlobalVolume() == 1) {
            advancedTexture.addControl(button);
        }
        //button sound disabled
        var button = BABYLON.GUI.Button.CreateImageOnlyButton("but", "images/sound_disabled.png");
        gui_game.btn_sound_disabled = button;
        button.width = "96px";
        button.height = "96px";
        button.color = "white";
        button.horizontalAlignment = BBABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        button.verticalAlignment = BBABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        button.top = "16px";
        button.left = "-16px";
        button.onPointerUpObservable.add(function () {
            gui_game.gui_avd_texture.removeControl(gui_game.btn_sound_disabled);
            gui_game.gui_avd_texture.addControl(gui_game.btn_sound_enabled);
            BBABYLON.Engine.audioEngine.setGlobalVolume(1);
        });
        button.background = "transparent";
        button.thickness = 0;
        if (BBABYLON.Engine.audioEngine.getGlobalVolume() == 0) {
            advancedTexture.addControl(button);
        }
        //lose panel
        var rect1 = new BABYLON.GUI.Rectangle();
        rect1.width = "512px";
        rect1.height = "512px";
        rect1.thickness = 0;
        rect1.background = "transparent";
        rect1.color = "transparent";
        gui_game.lose_panel = rect1;
        var image = new BABYLON.GUI.Image("but", "images/panel.png");
        image.width = 1;
        image.height = 1;
        rect1.addControl(image);
        var text1 = new BABYLON.GUI.TextBlock();
        text1.text = "Level Failed";
        text1.color = "black";
        text1.fontSize = 64;
        text1.fontFamily = "VinylCuts";
        text1.textVerticalAlignment = BBABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        text1.top = "64px";
        rect1.addControl(text1);
        var button = BABYLON.GUI.Button.CreateImageOnlyButton("but", "images/btn_reset.png");
        button.width = "196px";
        button.height = "196px";
        button.top = "48px";
        button.color = "white";
        button.onPointerUpObservable.add(function () {
            engine.stopRenderLoop(game.tick);
            scene.stopAllAnimations();
            scene.dispose();
            game.load(game.current_level);
        });
        button.background = "transparent";
        button.thickness = 0;
        rect1.addControl(button);
        //win panel
        var rect1 = new BABYLON.GUI.Rectangle();
        rect1.width = "512px";
        rect1.height = "512px";
        rect1.thickness = 0;
        rect1.background = "transparent";
        rect1.color = "transparent";
        gui_game.win_panel = rect1;
        var image = new BABYLON.GUI.Image("but", "images/panel.png");
        image.width = 1;
        image.height = 1;
        rect1.addControl(image);
        var text1 = new BABYLON.GUI.TextBlock();
        text1.text = "Level Complete";
        text1.color = "black";
        text1.fontSize = 64;
        text1.fontFamily = "VinylCuts";
        text1.textVerticalAlignment = BBABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        text1.top = "64px";
        rect1.addControl(text1);
        var text1 = new BABYLON.GUI.TextBlock("record");
        text1.text = "Record ";
        text1.color = "red";
        text1.fontSize = 48;
        text1.fontFamily = "VinylCuts";
        text1.textVerticalAlignment = BBABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        text1.top = "140px";
        rect1.addControl(text1);
        gui_game.text_record = text1;
        var button = BABYLON.GUI.Button.CreateImageOnlyButton("but", "images/btn_next.png");
        button.width = "196px";
        button.height = "196px";
        button.top = "68px";
        button.color = "white";
        button.onPointerUpObservable.add(function () {
            engine.stopRenderLoop(game.tick);
            scene.stopAllAnimations();
            scene.dispose();
            game.current_level = BBABYLON.DataStorage.ReadNumber("current_level", 3);
            game.load(game.current_level);
        });
        button.background = "transparent";
        button.thickness = 0;
        rect1.addControl(button);
        //btn play at init level
        var button = BABYLON.GUI.Button.CreateImageOnlyButton("but", "images/btn_play.png");
        button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        button.width = "243px";
        button.height = "96px";
        button.top = "-48px";
        button.color = "white";
        button.onPointerUpObservable.add(function (e) {
            BBABYLON.Engine.audioEngine.unlock();
            game.startsound.play();
            game.startsound.setVolume(0);
            game.PLAYING = true;
            advancedTexture.removeControl(gui_game.btn_start);
        });
        button.background = "transparent";
        button.thickness = 0;
        advancedTexture.addControl(button);
        gui_game.btn_start = button;
    } //end load
    ,
    add_lose_menu: function () {
        gui_game.gui_avd_texture.addControl(this.lose_panel);
        on_lose_panel_open();
    },
    add_win_menu: function () {
        gui_game.gui_avd_texture.addControl(this.win_panel);
        on_win_panel_open();
    },
    text_score: null,
    add_logo: function () {
        var rect1 = new BABYLON.GUI.Rectangle();
        rect1.width = "196px";
        rect1.height = "196px";
        rect1.thickness = 0;
        rect1.background = "transparent";
        rect1.color = "transparent";
        rect1.top = "-32px";
        rect1.verticalAlignment = BBABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        gui_game.gui_avd_texture.addControl(rect1);
        var button = BABYLON.GUI.Button.CreateImageOnlyButton("but", "images/logo.png");
        button.width = "1";
        button.height = "1";
        button.image.stretch =
            BABYLON.GUI.Image.STRETCH_UNIFORM;
        button.onPointerUpObservable.add(function () {
            on_press_logo();
        });
        button.background = "transparent";
        button.thickness = 0;
        rect1.addControl(button);
    }
};
var BBABYLON = BABYLON;
function add_game_tick_func() {
    game.tick = function () {
        time_playing = Math.floor(((new Date().getTime()) - time_at_start_game) / 1000);
        on_game_tick();
        var obstacles;
        var coins;
        var spirals_physics = scene.getMeshesByTags("spiral_physics");
        text1.text = "fps " + Math.round(engine.getFps()).toString() + ".\n meshes: " +
            scene.meshes.length;
        //check if over a way,get current way ,is over end way
        var current_way;
        var is_end_way = false;
        var is_over_way = false;
        var x_ = camera_parent.position.x;
        var z_ = camera_parent.position.z;
        scene.getMeshesByTags("way").forEach(function (element) {
            //current_ way position & scale
            var wx_ = element.position.x;
            var wz_ = element.position.z;
            var wsx_ = element.scaling.x;
            var wsz_ = element.scaling.z;
            //over way
            if ((x_ > (wx_ - (wsx_))) && (x_ < (wx_ + (wsx_)))) {
                is_over_way = true;
                current_way = element;
                is_end_way = BBABYLON.Tags.GetTags(element, false).endway;
                //last way
                if (!game.ready_last_way) {
                    game.ready_last_way = true;
                }
            }
        });
        //END check if over a way,get current way ,is over end way
        var frame_anim = 0;
        if (!game.LOSE && !game.WIN) {
            if (game.player_pressing && is_over_way) {
                //set midway large
                gui_game.text_current_score.color = "white";
                current_way.mid_way.scaling.x = (current_way.mid_way.position.x - x_) / 2;
                if (!game.spiral_started) {
                    BABYLON.Engine.audioEngine.unlock();
                    game.startsound.play();
                    game.startsound.setVolume(1);
                    game.dragsound.play();
                    game.current_score = 0;
                    count_ = 0;
                    tool_.position.x = 0;
                    tool_.position.y = 0;
                    //START iniciate spiral
                    game.spiral_started = true;
                    spiral_anim.position = BBABYLON.Vector3.Zero();
                    spiral_anim.rotation = BBABYLON.Vector3.Zero();
                    scene.beginAnimation(spiral_anim, 0, 5000, false, 5);
                    spiral_ = spiral_segment.clone("clon", spiral_axis);
                    spiral_.scaling = BBABYLON.Vector3.Zero();
                    spiral_.setParent(spiral_axis);
                    spiral_.position = BBABYLON.Vector3.Zero();
                    spiral_.rotation = BBABYLON.Vector3.Zero();
                    spiral_.visibility = 1;
                    spiral_axis.setParent(spiral_angle_);
                    spiral_axis.position = BBABYLON.Vector3.Zero();
                    spiral_axis.rotation = BBABYLON.Vector3.Zero();
                    spiral_physics = BABYLON.MeshBuilder.CreateCylinder("cylinder", { diameter: 2, height: 1, tessellation: 8 });
                    BBABYLON.Tags.AddTagsTo(spiral_physics, "spiral_physics");
                    spiral_physics.visibility = 0;
                    spiral_physics.rotation.x = Math.PI / 2;
                    spiral_physics.setParent(spiral_axis);
                    spiral_physics.position = BBABYLON.Vector3.Zero();
                    spiral_helper.setParent(spiral_angle_);
                    spiral_helper.position = BBABYLON.Vector3.Zero();
                    spiral_helper.setParent(spiral_axis);
                    spiral_current_segment = spiral_segment.clone("clon", spiral_axis);
                    spiral_current_segment.setParent(spiral_angle_);
                    spiral_current_segment.position = BBABYLON.Vector3.Zero();
                    spiral_current_segment.rotation = BBABYLON.Vector3.Zero();
                    //END initiate spiral
                } // end spiral no started
                //spiral life cycle while player pressing
                spiral_.rotation.x = 0;
                spiral_.rotation.y = 0;
                spiral_.position.z = 0;
                spiral_axis.setParent(spiral_angle_);
                spiral_axis.position = BBABYLON.Vector3.Zero();
                spiral_axis.rotation = BBABYLON.Vector3.Zero();
                spiral_axis.setParent(spiral_anim);
                spiral_axis.parent = spiral_angle_;
                spiral_helper.setParent(spiral_angle_);
                var s1x = spiral_helper.position.x;
                var s1y = spiral_helper.position.y;
                var s1d = Math.sqrt((s1x * s1x) + (s1y * s1y));
                var angle_ = Math.asin(s1x / s1d);
                spiral_helper.setParent(spiral_axis);
                spiral_current_segment.rotation.z = (-angle_) - (Math.PI / 2);
                spiral_current_segment.scaling.x = s1d;
                //add segment to spiral
                if (spiral_current_segment.rotation.z < -0.2 && spiral_current_segment.scaling.x > 0.2) {
                    spiral_current_segment.setParent(spiral_angle_);
                    var sum_ = BABYLON.Mesh.MergeMeshes([spiral_,
                        spiral_current_segment]);
                    sum_.name = "merged_spiral";
                    spiral_ = sum_;
                    spiral_.setParent(spiral_axis);
                    spiral_current_segment = spiral_segment.clone("clon", spiral_axis);
                    spiral_current_segment.setParent(spiral_angle_);
                    spiral_current_segment.position = BBABYLON.Vector3.Zero();
                    spiral_current_segment.rotation = BBABYLON.Vector3.Zero();
                    spiral_current_segment.scaling.x = 0;
                    spiral_helper.setParent(spiral_angle_);
                    spiral_helper.position = BBABYLON.Vector3.Zero();
                    spiral_helper.setParent(spiral_axis);
                }
                var diameter = spiral_axis.position.length();
                spiral_physics.scaling = new BBABYLON.Vector3(diameter / 1.1, 1, diameter / 1.1);
                game.current_score =
                    Math.floor(scene.getAnimatableByTarget(spiral_anim).masterFrame) - (game.min_frame / 2);
                gui_game.text_current_score.text = game.current_score.toString();
                ;
                if (game.current_score > 0) {
                    gui_game.text_current_score.color = "white";
                }
                else {
                    gui_game.text_current_score.color = "transparent";
                }
            }
            else { // end pressing & overway
                if (game.spiral_started) {
                    gui_game.text_current_score.color = "transparent";
                    game.dragsound.stop();
                    game.startsound.stop();
                    game.jumpsound.play();
                    if (game.current_score > 0) {
                        game.SCORE += game.current_score;
                    }
                    gui_game.text_score.text = game.SCORE.toString();
                    if (is_end_way) {
                        game.set_win();
                    }
                    tool_.position.x = -0.2;
                    tool_.position.y = 0.2;
                    spiral_current_segment.dispose();
                    spiral_helper.setParent(spiral_angle_);
                    spiral_helper.position.x = 1000;
                    spirals[spirals.length] = spiral_;
                    game.spiral_started = false;
                    spiral_physics.setParent(null);
                    spiral_.setParent(spiral_physics);
                    //jump current spiral
                    spiral_physics.physicsImpostor = new BABYLON.PhysicsImpostor(spiral_physics, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 1, restitution: 0.3, velocityIterations: 1 }, scene);
                    try {
                        frame_anim = (scene.getAnimatableByTarget(spiral_anim).masterFrame);
                    }
                    catch (error) { }
                    //calculate if calculate if the current spiral can to topple obstacles
                    if (frame_anim < game.min_frame / 2) { //no can topple and no jump
                        if (!game.is_lose) {
                            spiral_physics.physicsImpostor.
                                setLinearVelocity(new BABYLON.Vector3(0, 5, 5));
                            spiral_physics.physicsImpostor.setAngularVelocity(new BBABYLON.Vector3(0, 0, -10));
                        }
                    }
                    else if (frame_anim >= game.min_frame / 2) { // can jump
                        if (!game.is_lose) {
                            spiral_physics.physicsImpostor.
                                setLinearVelocity(new BABYLON.Vector3(20, 10, 0));
                            spiral_physics.physicsImpostor.setAngularVelocity(new BBABYLON.Vector3(0, 0, -10));
                            //check if
                            if (camera_parent.position.x >= scene.
                                getMeshesByTags("end_max_point")[0].
                                getAbsolutePosition().x) {
                                is_end_way = true;
                                game.last_spiral_to_bonus = 1;
                                game.set_win();
                            }
                        }
                    }
                    if (is_end_way) {
                        BBABYLON.Tags.AddTagsTo(spiral_, "last_spiral");
                        game.last_spiral_to_bonus = 1;
                    }
                    if (frame_anim > game.min_frame) {
                        scene.getMeshesByTags("obs1").forEach(function (element) {
                            spiral_physics.physicsImpostor.
                                registerOnPhysicsCollide(element.physicsImpostor, function (main, collided) {
                                if (collided.mass == 0) {
                                    game.hitsound.play();
                                    collided.setMass(5);
                                    game.SCORE += 150;
                                    gui_game.text_score.text = game.SCORE.toString();
                                }
                            });
                        });
                    }
                    game.add_tag(spiral_physics, "spiral_physics");
                }
            } // else end pressing & overway
            var dt = engine.getDeltaTime() * 0.1;
            spirals.forEach(function (element) {
                element;
            });
            obstacles = scene.getMeshesByTags("obs");
            coins = scene.getMeshesByTags("coin");
            obstacles.forEach(function (element) {
                if (element.position.y < -10) {
                    element.dispose();
                }
                if ((spiral_ != undefined) &&
                    (spiral_physics.physicsImpostor == undefined) &&
                    element.physicsImpostor != undefined &&
                    element.physicsImpostor.mass == 0) {
                    if (frame_anim < game.min_frame) {
                        if (spiral_.intersectsMesh(element, true)) {
                            BBABYLON.Engine.audioEngine.unlock();
                            game.losesound.play();
                            game.set_lose();
                            game.set_flash(spiral_);
                            game.set_flash(spiral_current_segment);
                        }
                    }
                    else {
                        if (spiral_physics.intersectsMesh(element, true)) {
                            game.losesound.play();
                            game.set_lose();
                            game.set_flash(spiral_);
                            game.set_flash(spiral_current_segment);
                        }
                    }
                }
                if ((tool_).intersectsMesh(element, true) &&
                    element.physicsImpostor.mass == 0 && !game.is_lose) {
                    game.losesound.play();
                    game.set_lose();
                    game.set_flash(tool_);
                }
            });
            coins.forEach(function (coins_) {
                spirals_physics.forEach(function (spirals__) {
                    if (spirals__.intersectsMesh(coins_, true)) {
                        game.coinsound.play();
                        game.SCORE += 150;
                        gui_game.text_score.text = game.SCORE.toString();
                        BBABYLON.Tags.RemoveTagsFrom(coins_, "coin");
                        var frameRate = 110;
                        var anim1 = new BABYLON.Animation("anim1", "scaling", frameRate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
                        var keyFrames = [];
                        keyFrames.push({
                            frame: 0,
                            value: new BBABYLON.Vector3(1, 1, 1)
                        });
                        keyFrames.push({
                            frame: frameRate,
                            value: new BBABYLON.Vector3(2, 2, 2)
                        });
                        anim1.setKeys(keyFrames);
                        var anim2 = new BABYLON.Animation("anim2", "visibility", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
                        var keyFrames1 = [];
                        keyFrames1.push({
                            frame: 0,
                            value: 1
                        });
                        keyFrames1.push({
                            frame: frameRate,
                            value: 0
                        });
                        anim2.setKeys(keyFrames1);
                        scene.beginDirectAnimation(coins_, [anim2], 0, frameRate, false, 4);
                        scene.beginDirectAnimation(coins_, [anim1], 0, frameRate, false, 4);
                    }
                    ;
                });
            });
            if (dt > 110) {
                dt = 100;
            }
            ;
            if (game.PLAYING) {
                camera_parent.position.x += 0.1 * dt;
            }
            if (camera_parent.position.x >
                scene.getMeshesByTags("end_max_point")[0].
                    getAbsolutePosition().x) {
                if (!game.spiral_started) {
                    if (!game.player_pressing) {
                        game.set_score();
                        gui_game.add_win_menu();
                        gui_game.add_logo();
                        game.set_win();
                    }
                }
                is_end_way = true;
                game.last_spiral_to_bonus = 1;
                game.is_win = true;
            }
        } // no win no lose
        else {
        }
        // bonus
        var last_spiral = scene.getMeshesByTags("last_spiral")[0];
        //folow last spiral to bonus
        if (game.last_spiral_to_bonus >= 1) {
            if (game.last_spiral_to_bonus == 1) {
                tool_.setParent(null);
                game.last_spiral_to_bonus = 2;
            }
            scene.getMeshesByTags("end_bonus").forEach(function (element) {
                try {
                    camera_parent.position.x = last_spiral.parent.position.x;
                    if (last_spiral.parent.intersectsMesh(element, true) &&
                        game.bonus == -1) {
                        game.bonussound.play();
                        game.bonus = +element.name.replace("score", "");
                        game.SCORE += game.bonus;
                        gui_game.text_score.text = game.SCORE.toString();
                        last_spiral.parent.physicsImpostor.
                            setLinearVelocity(new BABYLON.Vector3(20, 10, 0));
                        game.last_spiral_to_bonus = -2;
                        game.set_flash(element.getChildren()[0]);
                        game.set_flash(element.getChildren()[1]);
                    }
                }
                catch (error) {
                }
            });
        }
        try {
            if (last_spiral.parent.position.y < -2) {
                last_spiral.parent.dispose();
                game.last_spiral_to_bonus = -2;
                game.set_score();
                gui_game.add_win_menu();
                gui_game.add_logo();
            }
        }
        catch (error) {
        }
        spirals_physics.forEach(function (element) {
            if (element.position.y < -10) {
                element.dispose();
            }
        });
        scene.render();
    }; //end tick
}
var BBABYLON = BABYLON;
var physicsViewer;
var game = {
    RECORD: 0,
    dragsound: null,
    startsound: null,
    jumpsound: null,
    losesound: null,
    coinsound: null,
    hitsound: null,
    bonussound: null,
    PLAYING: false,
    current_level: 0,
    load: function (level) {
        game.RECORD = BBABYLON.DataStorage.ReadNumber("record", 0);
        game.PLAYING = false;
        game.current_score = 0;
        game.SCORE = 0;
        game.bonus = -1;
        game.last_spiral_to_bonus = -1;
        game.LOSE = false;
        game.WIN = false;
        game.is_lose = false;
        game.is_win = false;
        game.ready_last_way = false;
        this.current_level = level;
        spirals = new Array();
        game.assets_to_load = 3;
        game.assets_loaded = 0;
        BABYLON.SceneLoader.Load("3d/", "player.babylon", engine, function (sc) {
            scene = sc;
            var gravityVector = new BABYLON.Vector3(0, -9.81, 0);
            var physicsPlugin = new BABYLON.CannonJSPlugin(true, 1);
            scene.enablePhysics(gravityVector, physicsPlugin);
            BABYLON.SceneLoader.Append("3d/", "level" + game.current_level + ".babylon", scene, function (scene) {
                game.asset_loaded();
            });
            BABYLON.SceneLoader.Append("3d/", "spiral_anim.babylon", scene, function (scene) {
                spiral_anim = scene.getMeshByName("spiral_anim");
                spiral_anim.visibility = 0;
                spiral_anim.setParent(spiral_angle_);
                spiral_anim.position = BBABYLON.Vector3.Zero();
                spiral_anim.rotation = BBABYLON.Vector3.Zero();
                game.asset_loaded();
            });
            BABYLON.SceneLoader.Append("3d/", "pieces.babylon", scene, function (scene) {
                tool_ = scene.getMeshByName("tool");
                tool_.parent = camera_parent;
                tool_.position.x = -0.2;
                tool_.position.y = 0.2;
                var mat = scene.getMaterialByName("light_bonus");
                mat.emissiveColor = new BABYLON.Color3(1, 1, 1);
                coin_ = scene.getMeshByName("coin_");
                coin_.position.x = -99999;
                obstacle1 = scene.getMeshByName("obstacle1");
                obstacle1.position.x = -99999;
                obstacle2 = scene.getMeshByName("obstacle2");
                obstacle2.position.x = -99999;
                wood1 = scene.getMeshByName("wood1");
                wood1.position.x = -99999;
                game.asset_loaded();
            });
            camera_parent = scene.getMeshByName("camera_parent");
            camera_parent.visibility = 0;
            camera_parent.position.y = -0.2;
            scene.environmentTexture = new BABYLON.HDRCubeTexture("3d/env_min.hdr", scene, 128);
            scene.environmentIntensity = 1;
            var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
            text1 = new BABYLON.GUI.TextBlock();
            text1.text = "Hello world";
            text1.textVerticalAlignment =
                BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            text1.color = "black";
            text1.fontSize = 12;
            spiral_angle_ = BABYLON.Mesh.CreateBox("box", 1, scene);
            spiral_angle_.material = new BBABYLON.PBRMaterial("spiral_mat", scene);
            spiral_angle_.setParent(camera_parent);
            spiral_angle_.position = BBABYLON.Vector3.Zero();
            spiral_angle_.rotation = BBABYLON.Vector3.Zero();
            spiral_angle_.visibility = 0;
            spiral_angle_.rotation.z = -0.5;
            spiral_axis = BABYLON.Mesh.CreateBox("box", 1, scene);
            spiral_axis.setParent(spiral_angle_);
            spiral_axis.position = BBABYLON.Vector3.Zero();
            spiral_axis.rotation = BBABYLON.Vector3.Zero();
            spiral_axis.visibility = 0;
            spiral_helper = BABYLON.MeshBuilder.CreateSphere("sphere", { segments: 8, diameter: 0.2 });
            spiral_helper.visibility = 0;
            spiral_helper.material = new BBABYLON.PBRMaterial("spiral_mat", scene);
        });
    },
    assets_to_load: 0, assets_loaded: 0,
    asset_loaded: function () {
        game.assets_loaded++;
        if (game.assets_loaded == game.assets_to_load) {
            on_level_start();
            scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
            scene.fogColor = new BABYLON.Color4((1 / 255) * 46, (1 / 255) * 255, (1 / 255) * 224);
            scene.fogDensity = 0.1;
            scene.fogStart = 55.0;
            scene.fogEnd = 61.0;
            (scene.getMeshByName("Plane").position.x -= 2);
            (document.getElementById("lock_loader")).style.visibility = "hidden";
            game.dragsound = new BABYLON.Sound("dragsoun", "sound/drag.mp3", scene);
            game.dragsound.loop = true;
            game.startsound = new BABYLON.Sound("dragsoun", "sound/start.mp3", scene);
            game.jumpsound = new BABYLON.Sound("dragsoun", "sound/jump.mp3", scene);
            game.hitsound = new BABYLON.Sound("dragsoun", "sound/hit.mp3", scene);
            game.coinsound = new BABYLON.Sound("dragsoun", "sound/coin.mp3", scene);
            game.bonussound = new BABYLON.Sound("dragsoun", "sound/bonus.mp3", scene);
            game.losesound = new BABYLON.Sound("dragsoun", "sound/lose.mp3", scene);
            scene.lights.forEach(function (element) {
                element.dispose();
            });
            end_ = scene.getMeshByName("end_");
            end_.position = scene.getMeshesByTags("end")[0].position.clone();
            scene.getMeshesByTags("end")[0].dispose();
            end_.position.x -= Math.random() * 6;
            spiral_segment = scene.getMeshByName("spiral_segment");
            spiral_segment.position.x = -999999;
            spiral_segment_ = scene.getMeshByName("spiral_segment_");
            spiral_segment_.position.x = -999999;
            scene.clearColor = new BABYLON.Color4((1 / 255) * 46, (1 / 255) * 255, (1 / 255) * 224);
            var woods;
            physicsViewer = new BABYLON.Debug.PhysicsViewer(scene);
            scene.getMeshesByTags("way").forEach(function (element) {
                element.physicsImpostor = new BABYLON.PhysicsImpostor(element, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);
                ;
                var w = wood1.clone("wood", null, false);
                w.position = element.position.clone();
                w.scaling = element.scaling.clone();
                var mid_way = w.getChildMeshes()[0];
                mid_way.setParent(null);
                element.mid_way = mid_way;
                element.visibility = 0;
                if (woods == null) {
                    woods = w;
                }
                else {
                    var ww = BABYLON.Mesh.MergeMeshes([w, woods], true, true, undefined, false, true);
                    woods = ww;
                }
                woods.visibility = 1;
            });
            scene.getMeshesByTags("obstacle1").forEach(function (element) {
                var obst = obstacle1.clone("obs", null);
                obst.position = element.position.clone();
                obst.physicsImpostor = new BABYLON.PhysicsImpostor(obst, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0, damping: 0,
                    velocityIterations: 10 }, scene);
                element.visibility = 0;
                element.dispose();
            });
            scene.getMeshesByTags("obstacle2").forEach(function (element) {
                var obst = obstacle2.clone("obs", null);
                obst.rotation.z = Math.PI / 2;
                obst.position = element.position.clone();
                obst.physicsImpostor = new BABYLON.PhysicsImpostor(obst, BABYLON.PhysicsImpostor.CylinderImpostor, { mass: 0, friction: 0.5, restitution: 0, damping: 0,
                    velocityIterations: 10 }, scene);
                element.visibility = 0;
                game.add_tag(obst, "obs1");
                element.dispose();
            });
            scene.getMeshesByTags("coin_").forEach(function (element) {
                var coin = coin_.clone("coin", null);
                game.add_tag(coin, "coin");
                coin.position = element.position.clone();
                coin.rotation.z = Math.PI / 2;
                element.dispose();
            });
            gui_game.load();
            engine.runRenderLoop(game.tick);
            window.addEventListener("resize", function () {
                engine.resize();
            });
        }
    },
    start: function () {
    },
    tick: function () { },
    tick_: function () { },
    gui: {},
    min_frame: 70,
    player_pressing: false,
    spiral_started: false,
    LOSE: false,
    WIN: false,
    is_lose: false,
    is_win: false,
    bonus: -1,
    last_spiral_to_bonus: -1,
    SCORE: 0,
    current_score: 0,
    ready_last_way: false,
    add_tag: function (obj, tagg) {
        BBABYLON.Tags.EnableFor(obj);
        BBABYLON.Tags.AddTagsTo(obj, tagg);
    },
    set_flash: function (mesh) {
        mesh;
        var frameRate = 1;
        var flash_anim = new BABYLON.Animation("xSlide", "visibility", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keyFrames = [];
        keyFrames.push({
            frame: 0,
            value: -1000
        });
        keyFrames.push({
            frame: frameRate,
            value: 1000
        });
        keyFrames.push({
            frame: 2 * frameRate,
            value: -1000
        });
        flash_anim.setKeys(keyFrames);
        scene.beginDirectAnimation(mesh, [flash_anim], 0, 2 * frameRate, true, 10);
    },
    set_win: function () {
        if (!game.WIN) {
            on_win();
            gui_game.gui_avd_texture.removeControl(gui_game.btn_reset_gameplay);
            game.WIN = true;
            var new_level = game.current_level + 1;
            if (new_level > 20) {
                new_level = 3;
            }
            BBABYLON.DataStorage.WriteNumber("current_level", new_level);
            BBABYLON.DataStorage.WriteNumber("current_level_text", BBABYLON.DataStorage.ReadNumber("current_level_text", 1) + 1);
        }
    },
    set_lose: function () {
        if (!game.LOSE) {
            on_lose();
            game.dragsound.stop();
            game.LOSE = true;
            var frameRate = 1;
            var anim = new BABYLON.Animation("xSlide", "visibility", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
            var keyFrames = [];
            keyFrames.push({
                frame: 0,
                value: scene.meshes[0].visibility
            });
            keyFrames.push({
                frame: frameRate,
                value: scene.meshes[0].visibility
            });
            anim.setKeys(keyFrames);
            scene.beginDirectAnimation(scene.meshes[0], [anim], 0, 2 * frameRate, false, 0.4, function () {
                gui_game.add_lose_menu();
                gui_game.add_logo();
            });
        }
    },
    set_score: function () {
      if(game.SCORE>game.RECORD){
        game.RECORD=game.SCORE;
      }
        gui_game.text_record.text += game.RECORD;
        BBABYLON.DataStorage.WriteNumber("record", Math.max(game.RECORD, game.SCORE));
    }
};
var canvas;
var engine;
var BBABYLON = BABYLON;
var camera_parent;
var spiral_anim;
var scene;
var text1;
var spiral_;
var spiral_axis;
var spiral_angle_;
var spiral_helper;
var spiral_segment;
var wood1;
var spiral_current_segment;
var tool_;
var spiral_segment_;
var tool_;
var obstacle1;
var obstacle2;
var spiral_physics;
var end_;
var coin_;
var spirals;
var spirals;
var count_;
var time_at_start_game = 0;
window.onload = function () {
    on_window_load();
    time_at_start_game = new Date().getTime();
    console.log(time_at_start_game);
    add_game_tick_func();
    count_ = 0;
    canvas = document.getElementById("canvas");
    engine = new BABYLON.Engine(canvas, true);
    BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () { };
    game.load(BBABYLON.DataStorage.ReadNumber("current_level", 1));
};
//# sourceMappingURL=main.js.map
