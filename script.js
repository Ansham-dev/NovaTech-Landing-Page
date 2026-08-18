/* =========================================================
   NOVATECH
   INTERACTIVE THREE.JS EXPERIENCE
========================================================= */

"use strict";

/* =========================================================
   GLOBAL
========================================================= */

const THREE_AVAILABLE = typeof THREE !== "undefined";

let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener("load", () => {
    document.body.classList.add("page-loaded");
});


/* =========================================================
   GLOBAL MOUSE
========================================================= */

window.addEventListener("mousemove", (event) => {

    targetMouseX =
        (event.clientX / window.innerWidth) * 2 - 1;

    targetMouseY =
        -(event.clientY / window.innerHeight) * 2 + 1;

    const cursor = document.querySelector(".cursor-glow");

    if (cursor) {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
    }
});


function smoothMouse() {

    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    requestAnimationFrame(smoothMouse);
}

smoothMouse();


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const navbar = document.querySelector(".navbar");
const menuButton = document.querySelector(".menu-btn");

if (menuButton) {

    menuButton.addEventListener("click", () => {
        navbar.classList.toggle("mobile-open");
    });

}

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        if (navbar) {
            navbar.classList.remove("mobile-open");
        }

    });

});


/* =========================================================
   THREE.JS HELPERS
========================================================= */

function createRenderer(canvas) {

    if (!canvas || !THREE_AVAILABLE) {
        return null;
    }

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, 2)
    );

    renderer.setSize(
        canvas.clientWidth || 300,
        canvas.clientHeight || 300,
        false
    );

    return renderer;
}


function resizeRenderer(renderer, camera, canvas) {

    if (!renderer || !camera || !canvas) {
        return;
    }

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (!width || !height) {
        return;
    }

    renderer.setSize(width, height, false);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}


/* =========================================================
   PARTICLES
========================================================= */

function createParticles(
    count,
    spread,
    size = 0.025
) {

    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {

        positions[i * 3] =
            (Math.random() - 0.5) * spread;

        positions[i * 3 + 1] =
            (Math.random() - 0.5) * spread;

        positions[i * 3 + 2] =
            (Math.random() - 0.5) * spread;

    }

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );

    const material = new THREE.PointsMaterial({

        color: 0x8298ff,

        size: size,

        transparent: true,

        opacity: 0.75,

        depthWrite: false,

        blending: THREE.AdditiveBlending

    });

    return new THREE.Points(
        geometry,
        material
    );
}


/* =========================================================
   GLOW TEXTURE
========================================================= */

function createGlowTexture() {

    const canvas =
        document.createElement("canvas");

    canvas.width = 128;
    canvas.height = 128;

    const ctx =
        canvas.getContext("2d");

    const gradient =
        ctx.createRadialGradient(
            64,
            64,
            0,
            64,
            64,
            64
        );

    gradient.addColorStop(
        0,
        "rgba(150,180,255,1)"
    );

    gradient.addColorStop(
        0.25,
        "rgba(100,130,255,.7)"
    );

    gradient.addColorStop(
        0.55,
        "rgba(80,100,255,.2)"
    );

    gradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        128,
        128
    );

    return new THREE.CanvasTexture(canvas);
}


/* =========================================================
   HERO NOVA CORE
========================================================= */

function initNovaCore() {

    const canvas =
        document.getElementById("nova-core");

    if (!canvas || !THREE_AVAILABLE) {

        console.warn(
            "Nova Core could not initialize. Check Three.js."
        );

        return;
    }

    const scene =
        new THREE.Scene();

    const camera =
        new THREE.PerspectiveCamera(
            45,
            1,
            0.1,
            100
        );

    camera.position.z = 7;

    const renderer =
        createRenderer(canvas);

    if (!renderer) return;


    /* -----------------------------------------
       LIGHTING
    ----------------------------------------- */

    const ambient =
        new THREE.AmbientLight(
            0x596bff,
            1.5
        );

    scene.add(ambient);

    const blueLight =
        new THREE.PointLight(
            0x5577ff,
            30,
            15
        );

    blueLight.position.set(
        3,
        3,
        4
    );

    scene.add(blueLight);

    const violetLight =
        new THREE.PointLight(
            0x9c62ff,
            25,
            12
        );

    violetLight.position.set(
        -4,
        -2,
        2
    );

    scene.add(violetLight);


    /* -----------------------------------------
       CORE GROUP
    ----------------------------------------- */

    const coreGroup =
        new THREE.Group();

    scene.add(coreGroup);


    /* Main core */

    const core =
        new THREE.Mesh(

            new THREE.IcosahedronGeometry(
                1.25,
                4
            ),

            new THREE.MeshPhysicalMaterial({

                color: 0x111c55,

                emissive: 0x314bff,

                emissiveIntensity: 0.45,

                metalness: 0.85,

                roughness: 0.18,

                transparent: true,

                opacity: 0.96

            })

        );

    coreGroup.add(core);


    /* Inner wire */

    const inner =
        new THREE.Mesh(

            new THREE.IcosahedronGeometry(
                0.82,
                2
            ),

            new THREE.MeshBasicMaterial({

                color: 0x8ca0ff,

                wireframe: true,

                transparent: true,

                opacity: 0.75

            })

        );

    coreGroup.add(inner);


    /* Outer structure */

    const outer =
        new THREE.Mesh(

            new THREE.IcosahedronGeometry(
                1.7,
                2
            ),

            new THREE.MeshBasicMaterial({

                color: 0x7389ff,

                wireframe: true,

                transparent: true,

                opacity: 0.18

            })

        );

    coreGroup.add(outer);


    /* -----------------------------------------
       ORBIT RINGS
    ----------------------------------------- */

    const orbitGroup =
        new THREE.Group();

    scene.add(orbitGroup);


    const ringData = [

        {
            radius: 2,
            rotation: [0.8, 0.2, 0.1],
            speed: 0.004
        },

        {
            radius: 2.35,
            rotation: [1.4, 0.4, 0.8],
            speed: -0.0025
        },

        {
            radius: 2.7,
            rotation: [0.2, 1.2, 0.4],
            speed: 0.0018
        }

    ];


    ringData.forEach(data => {

        const ring =
            new THREE.Mesh(

                new THREE.TorusGeometry(
                    data.radius,
                    0.012,
                    10,
                    160
                ),

                new THREE.MeshBasicMaterial({

                    color: 0x718aff,

                    transparent: true,

                    opacity: 0.55

                })

            );

        ring.rotation.set(
            ...data.rotation
        );

        ring.userData.speed =
            data.speed;

        orbitGroup.add(ring);

    });


    /* -----------------------------------------
       ORBIT NODES
    ----------------------------------------- */

    const nodes = [];

    for (let i = 0; i < 12; i++) {

        const node =
            new THREE.Mesh(

                new THREE.SphereGeometry(
                    0.045,
                    12,
                    12
                ),

                new THREE.MeshBasicMaterial({

                    color:
                        i % 2 === 0
                            ? 0x7e9aff
                            : 0xb17aff

                })

            );


        node.userData = {

            radius:
                2.15 +
                Math.random() * 0.55,

            angle:
                (i / 12) *
                Math.PI * 2,

            speed:
                0.002 +
                Math.random() * 0.003,

            y:
                (Math.random() - 0.5) * 1.5

        };


        orbitGroup.add(node);

        nodes.push(node);

    }


    /* -----------------------------------------
       PARTICLES
    ----------------------------------------- */

    const particles =
        createParticles(
            650,
            14,
            0.023
        );

    scene.add(particles);


    /* -----------------------------------------
       FLOATING GEOMETRY
    ----------------------------------------- */

    const floatingGroup =
        new THREE.Group();

    scene.add(floatingGroup);


    for (let i = 0; i < 14; i++) {

        let geometry;

        const type = i % 3;

        if (type === 0) {

            geometry =
                new THREE.OctahedronGeometry(
                    0.15,
                    0
                );

        } else if (type === 1) {

            geometry =
                new THREE.TetrahedronGeometry(
                    0.17,
                    0
                );

        } else {

            geometry =
                new THREE.BoxGeometry(
                    0.16,
                    0.16,
                    0.16
                );

        }


        const object =
            new THREE.Mesh(

                geometry,

                new THREE.MeshBasicMaterial({

                    color:
                        i % 2 === 0
                            ? 0x6886ff
                            : 0x9a70ff,

                    wireframe: true,

                    transparent: true,

                    opacity: 0.5

                })

            );


        object.position.set(

            (Math.random() - 0.5) * 6,

            (Math.random() - 0.5) * 5,

            (Math.random() - 0.5) * 3

        );


        object.userData.speed =
            0.002 +
            Math.random() * 0.004;


        floatingGroup.add(object);

    }


    /* -----------------------------------------
       GLOW
    ----------------------------------------- */

    const glow =
        new THREE.Sprite(

            new THREE.SpriteMaterial({

                map:
                    createGlowTexture(),

                color: 0x617fff,

                transparent: true,

                opacity: 0.35,

                depthWrite: false,

                blending:
                    THREE.AdditiveBlending

            })

        );


    glow.scale.set(
        5.2,
        5.2,
        1
    );

    scene.add(glow);


    /* -----------------------------------------
       ANIMATION
    ----------------------------------------- */

    function animate() {

        requestAnimationFrame(
            animate
        );

        resizeRenderer(
            renderer,
            camera,
            canvas
        );


        core.rotation.x += 0.002;
        core.rotation.y += 0.003;

        inner.rotation.x -= 0.003;
        inner.rotation.y += 0.004;

        outer.rotation.x += 0.0007;
        outer.rotation.y -= 0.001;


        orbitGroup.rotation.y +=
            0.0012;

        orbitGroup.rotation.x +=
            0.0003;


        nodes.forEach(node => {

            node.userData.angle +=
                node.userData.speed;

            node.position.x =
                Math.cos(
                    node.userData.angle
                ) *
                node.userData.radius;

            node.position.z =
                Math.sin(
                    node.userData.angle
                ) *
                node.userData.radius;

            node.position.y =
                node.userData.y +
                Math.sin(
                    node.userData.angle * 2
                ) * 0.25;

        });


        particles.rotation.y +=
            0.00025;

        particles.rotation.x +=
            0.00008;


        floatingGroup.children.forEach(
            object => {

                object.rotation.x +=
                    object.userData.speed;

                object.rotation.y +=
                    object.userData.speed * 1.4;

            }
        );


        /* Mouse response */

        coreGroup.rotation.x +=
            (
                mouseY * 0.35 -
                coreGroup.rotation.x
            ) * 0.015;

        coreGroup.rotation.y +=
            (
                mouseX * 0.45 -
                coreGroup.rotation.y
            ) * 0.015;


        blueLight.position.x =
            3 + mouseX * 2;

        blueLight.position.y =
            3 + mouseY * 2;


        renderer.render(
            scene,
            camera
        );

    }

    animate();
}


/* =========================================================
   SERVICE 3D SCENES
========================================================= */

function createServiceScene(
    canvasId,
    type
) {

    const canvas =
        document.getElementById(canvasId);

    if (!canvas || !THREE_AVAILABLE) {
        return;
    }


    const scene =
        new THREE.Scene();

    const camera =
        new THREE.PerspectiveCamera(
            45,
            1,
            0.1,
            100
        );

    camera.position.z = 5;


    const renderer =
        createRenderer(canvas);

    if (!renderer) return;


    const light =
        new THREE.PointLight(
            0x6f86ff,
            18,
            10
        );

    light.position.set(
        2,
        2,
        3
    );

    scene.add(light);


    const group =
        new THREE.Group();

    scene.add(group);


    /* -----------------------------------------
       WEB
    ----------------------------------------- */

    if (type === "web") {

        const frame =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    2.7,
                    1.7,
                    0.15
                ),

                new THREE.MeshBasicMaterial({

                    color: 0x7891ff,

                    wireframe: true,

                    transparent: true,

                    opacity: 0.7

                })

            );

        group.add(frame);


        const screen =
            new THREE.Mesh(

                new THREE.BoxGeometry(
                    2.25,
                    1.2,
                    0.18
                ),

                new THREE.MeshBasicMaterial({

                    color: 0x192657,

                    transparent: true,

                    opacity: 0.8

                })

            );

        group.add(screen);


        for (let i = 0; i < 5; i++) {

            const line =
                new THREE.Mesh(

                    new THREE.BoxGeometry(
                        1.4 - i * 0.12,
                        0.025,
                        0.025
                    ),

                    new THREE.MeshBasicMaterial({

                        color: 0x9b7bff

                    })

                );

            line.position.set(
                -0.45,
                0.35 - i * 0.16,
                0.15
            );

            group.add(line);
        }

    }


    /* -----------------------------------------
       MARKETING
    ----------------------------------------- */

    if (type === "marketing") {

        for (let i = 0; i < 7; i++) {

            const height =
                0.45 + i * 0.22;

            const bar =
                new THREE.Mesh(

                    new THREE.BoxGeometry(
                        0.25,
                        height,
                        0.25
                    ),

                    new THREE.MeshBasicMaterial({

                        color:
                            i % 2 === 0
                                ? 0x6887ff
                                : 0x9b73ff,

                        wireframe: true

                    })

                );

            bar.position.x =
                (i - 3) * 0.38;

            bar.position.y =
                height / 2 - 0.8;

            group.add(bar);
        }


        const ring =
            new THREE.Mesh(

                new THREE.TorusGeometry(
                    0.65,
                    0.025,
                    8,
                    50
                ),

                new THREE.MeshBasicMaterial({

                    color: 0xa38aff

                })

            );

        ring.rotation.z = -0.4;

        ring.position.y = 0.2;

        group.add(ring);

    }


    /* -----------------------------------------
       DESIGN
    ----------------------------------------- */

    if (type === "design") {

        const main =
            new THREE.Mesh(

                new THREE.IcosahedronGeometry(
                    1.1,
                    1
                ),

                new THREE.MeshBasicMaterial({

                    color: 0x738dff,

                    wireframe: true,

                    transparent: true,

                    opacity: 0.65

                })

            );

        group.add(main);


        const ring1 =
            new THREE.Mesh(

                new THREE.TorusGeometry(
                    1.5,
                    0.025,
                    10,
                    100
                ),

                new THREE.MeshBasicMaterial({

                    color: 0x9a75ff

                })

            );

        ring1.rotation.x =
            Math.PI / 2;

        group.add(ring1);


        const ring2 =
            ring1.clone();

        ring2.rotation.y =
            Math.PI / 2;

        group.add(ring2);

    }


    const particles =
        createParticles(
            100,
            7,
            0.022
        );

    scene.add(particles);


    function animate() {

        requestAnimationFrame(
            animate
        );

        resizeRenderer(
            renderer,
            camera,
            canvas
        );


        group.rotation.x +=
            0.0025;

        group.rotation.y +=
            0.004;


        particles.rotation.y +=
            0.0007;


        renderer.render(
            scene,
            camera
        );

    }

    animate();
}


/* Start service scenes */

initNovaCore();

createServiceScene(
    "web-canvas",
    "web"
);

createServiceScene(
    "marketing-canvas",
    "marketing"
);

createServiceScene(
    "design-canvas",
    "design"
);


/* =========================================================
   PROCESS SYSTEM
========================================================= */

const processData = [

    {
        number: "01",
        title: "Discover",
        text:
            "We understand your business, audience and goals before building anything.",
        color: 0x6f8cff,
        action: "discover"
    },

    {
        number: "02",
        title: "Design",
        text:
            "We transform ideas into clear, intuitive and visually distinctive digital experiences.",
        color: 0x9b75ff,
        action: "design"
    },

    {
        number: "03",
        title: "Build",
        text:
            "Our team turns the design into a responsive, reliable and scalable digital product.",
        color: 0x58bfff,
        action: "build"
    },

    {
        number: "04",
        title: "Grow",
        text:
            "We measure, improve and evolve your digital experience as your business grows.",
        color: 0xb889ff,
        action: "grow"
    }

];


let currentProcess = 0;


/* =========================================================
   PROCESS 3D SCENE
========================================================= */

let processSceneData = null;


function initProcessScene() {

    const canvas =
        document.getElementById(
            "process-canvas"
        );

    if (!canvas || !THREE_AVAILABLE) {
        return;
    }


    const scene =
        new THREE.Scene();


    const camera =
        new THREE.PerspectiveCamera(
            45,
            1,
            0.1,
            100
        );

    camera.position.z = 8;


    const renderer =
        createRenderer(canvas);

    if (!renderer) return;


    const system =
        new THREE.Group();

    scene.add(system);


    /* -----------------------------------------
       CENTRAL CORE
    ----------------------------------------- */

    const core =
        new THREE.Mesh(

            new THREE.IcosahedronGeometry(
                1,
                2
            ),

            new THREE.MeshBasicMaterial({

                color: 0x6f8cff,

                wireframe: true,

                transparent: true,

                opacity: 0.85

            })

        );

    system.add(core);


    /* Inner sphere */

    const innerCore =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                0.55,
                24,
                24
            ),

            new THREE.MeshBasicMaterial({

                color: 0x243d9a,

                transparent: true,

                opacity: 0.45

            })

        );

    system.add(innerCore);


    /* -----------------------------------------
       FOUR STAGE NODES
    ----------------------------------------- */

    const positions = [

        [-2.8, 1.5, 0],

        [2.8, 1.5, 0],

        [2.8, -1.5, 0],

        [-2.8, -1.5, 0]

    ];


    const stageNodes = [];


    positions.forEach(
        (position, index) => {

            const node =
                new THREE.Mesh(

                    new THREE.OctahedronGeometry(
                        0.28,
                        1
                    ),

                    new THREE.MeshBasicMaterial({

                        color:
                            processData[index].color,

                        wireframe: true

                    })

                );


            node.position.set(
                ...position
            );


            system.add(node);

            stageNodes.push(node);


            /* Node glow */

            const glow =
                new THREE.Mesh(

                    new THREE.SphereGeometry(
                        0.45,
                        16,
                        16
                    ),

                    new THREE.MeshBasicMaterial({

                        color:
                            processData[index].color,

                        transparent: true,

                        opacity: 0.08,

                        depthWrite: false

                    })

                );


            node.add(glow);

        }
    );


    /* -----------------------------------------
       CONNECTION LINES
    ----------------------------------------- */

    const lineMaterial =
        new THREE.LineBasicMaterial({

            color: 0x5269c8,

            transparent: true,

            opacity: 0.4

        });


    function makeLine(
        start,
        end
    ) {

        const points = [

            new THREE.Vector3(
                ...start
            ),

            new THREE.Vector3(
                ...end
            )

        ];

        const geometry =
            new THREE.BufferGeometry()
                .setFromPoints(points);

        return new THREE.Line(
            geometry,
            lineMaterial.clone()
        );
    }


    const connections = [];


    for (
        let i = 0;
        i < positions.length;
        i++
    ) {

        const line =
            makeLine(
                positions[i],
                [0, 0, 0]
            );

        system.add(line);

        connections.push(line);

    }


    /* Outer workflow loop */

    for (
        let i = 0;
        i < positions.length;
        i++
    ) {

        const next =
            (i + 1) %
            positions.length;

        system.add(
            makeLine(
                positions[i],
                positions[next]
            )
        );

    }


    /* -----------------------------------------
       ACTIVE ENERGY PATH
    ----------------------------------------- */

    const energyGeometry =
        new THREE.BufferGeometry();

    const energyMaterial =
        new THREE.LineBasicMaterial({

            color: 0x9bb0ff,

            transparent: true,

            opacity: 0.95

        });


    const energyLine =
        new THREE.Line(
            energyGeometry,
            energyMaterial
        );

    system.add(energyLine);


    /* -----------------------------------------
       ORBIT
    ----------------------------------------- */

    const orbit =
        new THREE.Mesh(

            new THREE.TorusGeometry(
                3.8,
                0.015,
                8,
                160
            ),

            new THREE.MeshBasicMaterial({

                color: 0x718aff,

                transparent: true,

                opacity: 0.4

            })

        );

    orbit.rotation.x =
        Math.PI / 2;

    system.add(orbit);


    /* -----------------------------------------
       PARTICLES
    ----------------------------------------- */

    const particles =
        createParticles(
            350,
            11,
            0.022
        );

    scene.add(particles);


    /* -----------------------------------------
       ENERGY PARTICLES
    ----------------------------------------- */

    const energyParticles = [];


    for (let i = 0; i < 30; i++) {

        const particle =
            new THREE.Mesh(

                new THREE.SphereGeometry(
                    0.035,
                    8,
                    8
                ),

                new THREE.MeshBasicMaterial({

                    color: 0x9bb0ff

                })

            );


        system.add(particle);

        energyParticles.push(
            particle
        );

    }


    processSceneData = {

        scene,
        camera,
        renderer,
        canvas,
        system,
        core,
        innerCore,
        orbit,
        stageNodes,
        connections,
        energyLine,
        energyParticles,
        particles

    };


    updateProcessVisual(0);


    /* -----------------------------------------
       ANIMATION
    ----------------------------------------- */

    function animate() {

        requestAnimationFrame(
            animate
        );


        resizeRenderer(
            renderer,
            camera,
            canvas
        );


        core.rotation.x +=
            0.002;

        core.rotation.y +=
            0.004;


        innerCore.rotation.y -=
            0.003;


        orbit.rotation.z +=
            0.0015;


        particles.rotation.y +=
            0.0003;


        stageNodes.forEach(
            (node, index) => {

                node.rotation.x +=
                    0.003 +
                    index * 0.0005;

                node.rotation.y +=
                    0.004;


                /* Floating effect */

                node.position.y +=
                    Math.sin(
                        Date.now() * 0.001 +
                        index
                    ) * 0.0008;

            }
        );


        /* Mouse interaction */

        system.rotation.y +=
            (
                mouseX * 0.25 -
                system.rotation.y
            ) * 0.015;

        system.rotation.x +=
            (
                mouseY * 0.15 -
                system.rotation.x
            ) * 0.015;


        /* Energy particles */

        animateEnergyParticles();


        renderer.render(
            scene,
            camera
        );

    }


    animate();
}


/* =========================================================
   PROCESS VISUAL UPDATE
========================================================= */

function updateProcessVisual(index) {

    if (!processSceneData) {
        return;
    }


    const data =
        processData[index];


    const {
        core,
        innerCore,
        stageNodes,
        connections,
        energyLine,
        energyParticles
    } = processSceneData;


    /* -----------------------------------------
       ACTIVE NODE
    ----------------------------------------- */

    stageNodes.forEach(
        (node, i) => {

            const material =
                node.material;

            const isActive =
                i === index;


            material.color.setHex(
                processData[i].color
            );


            material.opacity =
                isActive
                    ? 1
                    : 0.45;


            material.needsUpdate = true;


            const scale =
                isActive
                    ? 1.8
                    : 1;


            node.scale.set(
                scale,
                scale,
                scale
            );

        }
    );


    /* -----------------------------------------
       CORE CHANGES
    ----------------------------------------- */

    core.material.color.setHex(
        data.color
    );

    innerCore.material.color.setHex(
        data.color
    );


    /* -----------------------------------------
       CONNECTIONS
    ----------------------------------------- */

    connections.forEach(
        (line, i) => {

            line.material.opacity =
                i === index
                    ? 0.9
                    : 0.22;

            line.material.color.setHex(
                i === index
                    ? data.color
                    : 0x5269c8
            );

        }
    );


    /* -----------------------------------------
       ENERGY PATH
    ----------------------------------------- */

    const start =
        stageNodes[index].position.clone();

    const center =
        new THREE.Vector3(
            0,
            0,
            0
        );


    const points = [];


    for (let i = 0; i <= 20; i++) {

        const t = i / 20;


        const x =
            start.x *
            (1 - t) +
            center.x * t;


        const y =
            start.y *
            (1 - t) +
            center.y * t;


        const z =
            start.z *
            (1 - t) +
            center.z * t;


        points.push(
            new THREE.Vector3(
                x,
                y,
                z
            )
        );

    }


    energyLine.geometry.dispose();


    energyLine.geometry =
        new THREE.BufferGeometry()
            .setFromPoints(points);


    energyLine.material.color.setHex(
        data.color
    );


    /* -----------------------------------------
       ENERGY PARTICLE START
    ----------------------------------------- */

    energyParticles.forEach(
        (particle, i) => {

            particle.userData = {

                start:
                    start.clone(),

                progress:
                    (i / energyParticles.length),

                speed:
                    0.008 +
                    Math.random() * 0.008

            };

            particle.material.color.setHex(
                data.color
            );

        }
    );


    /* -----------------------------------------
       PROCESS TEXT GLOW
    ----------------------------------------- */

    const processVisual =
        document.querySelector(
            ".process-visual"
        );

    if (processVisual) {

        processVisual.style.setProperty(
            "--process-color",
            `#${data.color.toString(16).padStart(6, "0")}`
        );

    }
}


/* =========================================================
   ENERGY PARTICLE ANIMATION
========================================================= */

function animateEnergyParticles() {

    if (!processSceneData) {
        return;
    }


    const {
        energyParticles
    } = processSceneData;


    energyParticles.forEach(
        particle => {

            if (!particle.userData) {
                return;
            }


            particle.userData.progress +=
                particle.userData.speed;


            if (
                particle.userData.progress > 1
            ) {

                particle.userData.progress = 0;

            }


            const t =
                particle.userData.progress;


            const start =
                particle.userData.start;


            particle.position.x =
                start.x * (1 - t);

            particle.position.y =
                start.y * (1 - t);

            particle.position.z =
                start.z * (1 - t);

        }
    );
}


/* Start process */

initProcessScene();


/* =========================================================
   PROCESS TEXT
========================================================= */

const processNumber =
    document.querySelector(
        ".process-number"
    );

const processTitle =
    document.querySelector(
        ".process-info h3"
    );

const processText =
    document.querySelector(
        ".process-info p"
    );

const processDots =
    document.querySelectorAll(
        ".process-dot"
    );


function updateProcess(index) {

    currentProcess = index;

    const data =
        processData[index];


    /* -----------------------------------------
       Text animation
    ----------------------------------------- */

    const processInfo =
        document.querySelector(
            ".process-info"
        );


    if (processInfo) {

        processInfo.classList.add(
            "changing"
        );


        setTimeout(() => {

            if (processNumber) {
                processNumber.textContent =
                    data.number;
            }

            if (processTitle) {
                processTitle.textContent =
                    data.title;
            }

            if (processText) {
                processText.textContent =
                    data.text;
            }


            processInfo.classList.remove(
                "changing"
            );

        }, 180);

    }


    /* -----------------------------------------
       Navigation
    ----------------------------------------- */

    processDots.forEach(
        (dot, i) => {

            dot.classList.toggle(
                "active",
                i === index
            );

        }
    );


    /* -----------------------------------------
       THREE.JS CHANGE
    ----------------------------------------- */

    updateProcessVisual(index);


    /* -----------------------------------------
       HUD
    ----------------------------------------- */

    const hud =
        document.querySelector(
            ".hud-top"
        );


    if (hud) {

        hud.innerHTML = `

            <span class="status-dot"></span>

            SYSTEM / ${data.title.toUpperCase()}

        `;

    }


    const workflow =
        document.querySelector(
            ".hud-bottom"
        );


    if (workflow) {

        workflow.textContent =
            `NOVA / ${data.number} / ${data.action.toUpperCase()}`;

    }

}


/* =========================================================
   PROCESS BUTTONS
========================================================= */

processDots.forEach(
    (dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                updateProcess(index);

            }
        );

    }
);


const processNext =
    document.getElementById(
        "process-next"
    );


if (processNext) {

    processNext.addEventListener(
        "click",
        () => {

            const next =
                (
                    currentProcess + 1
                ) %
                processData.length;


            updateProcess(next);

        }
    );

}


/* =========================================================
   ABOUT NETWORK
========================================================= */

function initNetworkScene() {

    const canvas =
        document.getElementById(
            "network-canvas"
        );

    if (!canvas || !THREE_AVAILABLE) {
        return;
    }


    const scene =
        new THREE.Scene();


    const camera =
        new THREE.PerspectiveCamera(
            45,
            1,
            0.1,
            100
        );


    camera.position.z = 7;


    const renderer =
        createRenderer(canvas);

    if (!renderer) return;


    const points = [];


    for (let i = 0; i < 42; i++) {

        points.push(

            new THREE.Vector3(

                (Math.random() - 0.5) * 5,

                (Math.random() - 0.5) * 4,

                (Math.random() - 0.5) * 2

            )

        );

    }


    /* Nodes */

    const nodeGeometry =
        new THREE.BufferGeometry()
            .setFromPoints(points);


    const nodeMaterial =
        new THREE.PointsMaterial({

            color: 0x7b91ff,

            size: 0.07,

            transparent: true,

            opacity: 0.85

        });


    const nodeCloud =
        new THREE.Points(
            nodeGeometry,
            nodeMaterial
        );


    scene.add(nodeCloud);


    /* Connections */

    const linePositions = [];


    for (
        let i = 0;
        i < points.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < points.length;
            j++
        ) {

            if (
                points[i].distanceTo(
                    points[j]
                ) < 1.25
            ) {

                linePositions.push(

                    points[i].x,
                    points[i].y,
                    points[i].z,

                    points[j].x,
                    points[j].y,
                    points[j].z

                );

            }

        }

    }


    const lineGeometry =
        new THREE.BufferGeometry();


    lineGeometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(
            linePositions,
            3
        )

    );


    const lines =
        new THREE.LineSegments(

            lineGeometry,

            new THREE.LineBasicMaterial({

                color: 0x5268bd,

                transparent: true,

                opacity: 0.25

            })

        );


    scene.add(lines);


    /* Central core */

    const core =
        new THREE.Mesh(

            new THREE.IcosahedronGeometry(
                0.7,
                2
            ),

            new THREE.MeshBasicMaterial({

                color: 0x8198ff,

                wireframe: true,

                transparent: true,

                opacity: 0.7

            })

        );


    scene.add(core);


    function animate() {

        requestAnimationFrame(
            animate
        );


        resizeRenderer(
            renderer,
            camera,
            canvas
        );


        nodeCloud.rotation.y +=
            0.0015;

        lines.rotation.y +=
            0.0015;

        core.rotation.x +=
            0.003;

        core.rotation.y +=
            0.004;


        scene.rotation.y +=
            (
                mouseX * 0.12 -
                scene.rotation.y
            ) * 0.01;


        renderer.render(
            scene,
            camera
        );

    }


    animate();
}


initNetworkScene();


/* =========================================================
   CONTACT PARTICLES
========================================================= */

function initContactParticles() {

    const canvas =
        document.getElementById(
            "contact-canvas"
        );

    if (!canvas || !THREE_AVAILABLE) {
        return;
    }


    const scene =
        new THREE.Scene();


    const camera =
        new THREE.PerspectiveCamera(
            45,
            1,
            0.1,
            100
        );


    camera.position.z = 8;


    const renderer =
        createRenderer(canvas);

    if (!renderer) return;


    const particles =
        createParticles(
            400,
            14,
            0.025
        );


    scene.add(particles);


    function animate() {

        requestAnimationFrame(
            animate
        );


        resizeRenderer(
            renderer,
            camera,
            canvas
        );


        particles.rotation.y +=
            0.00025;

        particles.rotation.x +=
            0.00008;


        renderer.render(
            scene,
            camera
        );

    }


    animate();
}


initContactParticles();


/* =========================================================
   CONTACT FORM VALIDATION
========================================================= */

const contactForm =
    document.getElementById(
        "contact-form"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                );

            const email =
                document.getElementById(
                    "email"
                );

            const message =
                document.getElementById(
                    "message"
                );


            const nameError =
                document.getElementById(
                    "name-error"
                );

            const emailError =
                document.getElementById(
                    "email-error"
                );

            const messageError =
                document.getElementById(
                    "message-error"
                );

            const success =
                document.getElementById(
                    "form-success"
                );


            let valid = true;


            [
                name,
                email,
                message
            ].forEach(field => {

                if (field) {
                    field.classList.remove(
                        "error"
                    );
                }

            });


            if (nameError)
                nameError.textContent = "";

            if (emailError)
                emailError.textContent = "";

            if (messageError)
                messageError.textContent = "";


            if (success)
                success.classList.remove(
                    "show"
                );


            /* Name */

            if (
                !name ||
                name.value.trim().length < 2
            ) {

                if (name)
                    name.classList.add(
                        "error"
                    );

                if (nameError)
                    nameError.textContent =
                        "Please enter your name.";

                valid = false;
            }


            /* Email */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !email ||
                !emailPattern.test(
                    email.value.trim()
                )
            ) {

                if (email)
                    email.classList.add(
                        "error"
                    );

                if (emailError)
                    emailError.textContent =
                        "Please enter a valid email.";

                valid = false;
            }


            /* Message */

            if (
                !message ||
                message.value.trim().length < 10
            ) {

                if (message)
                    message.classList.add(
                        "error"
                    );

                if (messageError)
                    messageError.textContent =
                        "Message should be at least 10 characters.";

                valid = false;
            }


            if (!valid) {
                return;
            }


            if (success) {

                success.textContent =
                    "✓ Message ready to send.";

                success.classList.add(
                    "show"
                );

            }


            contactForm.reset();

        }
    );

}


/* =========================================================
   ABOUT COUNTERS
========================================================= */

const counters =
    document.querySelectorAll(
        "[data-count]"
    );


if ("IntersectionObserver" in window) {

    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const element =
                        entry.target;


                    const target =
                        Number(
                            element.dataset.count
                        );


                    const duration =
                        1200;


                    const start =
                        performance.now();


                    function count(timestamp) {

                        const progress =
                            Math.min(
                                (
                                    timestamp -
                                    start
                                ) / duration,
                                1
                            );


                        const eased =
                            1 -
                            Math.pow(
                                1 - progress,
                                3
                            );


                        element.textContent =
                            Math.floor(
                                eased * target
                            );


                        if (progress < 1) {

                            requestAnimationFrame(
                                count
                            );

                        } else {

                            element.textContent =
                                target;

                        }

                    }


                    requestAnimationFrame(
                        count
                    );


                    counterObserver.unobserve(
                        element
                    );

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(counter => {

        counterObserver.observe(
            counter
        );

    });

}


/* =========================================================
   SERVICE CARD 3D TILT
========================================================= */

document.querySelectorAll(
    ".service-card"
).forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth < 850) {
                return;
            }


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const rotateX =
                (y - rect.height / 2) /
                35;


            const rotateY =
                (rect.width / 2 - x) /
                35;


            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* =========================================================
   HERO LABEL PARALLAX
========================================================= */

const heroStage =
    document.querySelector(
        ".hero-stage"
    );


if (heroStage) {

    heroStage.addEventListener(
        "mousemove",
        event => {

            const rect =
                heroStage.getBoundingClientRect();


            const x =
                (
                    event.clientX -
                    rect.left
                ) / rect.width -
                0.5;


            const y =
                (
                    event.clientY -
                    rect.top
                ) / rect.height -
                0.5;


            document
                .querySelectorAll(
                    ".core-label"
                )
                .forEach(
                    (label, index) => {

                        const amount =
                            (index + 1) * 8;


                        label.style.transform =
                            `translate(
                                ${x * amount}px,
                                ${y * amount}px
                            )`;

                    }
                );

        }
    );


    heroStage.addEventListener(
        "mouseleave",
        () => {

            document
                .querySelectorAll(
                    ".core-label"
                )
                .forEach(label => {

                    label.style.transform =
                        "";

                });

        }
    );

}


/* =========================================================
   SMOOTH ANCHOR SCROLL
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});


/* =========================================================
   REDUCE MOTION ACCESSIBILITY
========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (prefersReducedMotion.matches) {

    document.documentElement.classList.add(
        "reduce-motion"
    );

}


/* =========================================================
   FINAL CHECK
========================================================= */

if (!THREE_AVAILABLE) {

    console.warn(
        "NovaTech: Three.js is not available. Make sure this appears BEFORE script.js in index.html."
    );

} else {

    console.log(
        "%c NOVATECH ",
        "background:#667fff;color:white;padding:5px 10px;border-radius:5px;font-weight:bold;"
    );

    console.log(
        "Digital systems online."
    );

}