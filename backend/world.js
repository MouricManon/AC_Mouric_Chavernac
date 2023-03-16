module.exports = {
    "name": "CARS & co",
    "logo": "icones/Logo_monde.jpg",
    "money": 0,
    "score": 0,
    "totalangels": 0,
    "activeangels": 0,
    "angelbonus": 2,
    "lastupdate": 0,
    "products": [{
        "id": 1,
        "name": "Renault 4L",
        "logo": "icones/Renault 4L.jpg",
        "cout": 4,
        "croissance": 1.07,
        "revenu": 1,
        "vitesse": 500,
        "quantite": 1,
        "timeleft": 0,
        "managerUnlocked": false,
        "paliers": [
            {
                "name": "Modification de l'échappement",
                "logo": "icones/Echappement_4L.jpg",
                "seuil": 20,
                "idcible": 1,
                "ratio": 2,
                "typeratio": "gain",
                "unlocked": false
            },
            {
                "name": "Siège baquet",
                "logo": "icones/Siege_Baquet.jpg",
                "seuil": 50,
                "idcible": 1,
                "ratio": 2,
                "typeratio": "gain",
                "unlocked": false
            }, {
                "name": "200 000 km",
                "logo": "icones/kms.jpg",
                "seuil": 75,
                "idcible": 1,
                "ratio": 2,
                "typeratio": "gain",
                "unlocked": false
            }
        ]
    },
    {
        "id": 2,
        "name": "Renault Twingo",
        "logo": "icones/Renault_Twingo.jpg",
        "cout": 60,
        "croissance": 1.15,
        "revenu": 60,
        "vitesse": 3000,
        "quantite": 1,
        "timeleft": 0,
        "managerUnlocked": false,
        "paliers": [
            {
                "name": "Peinture rapide",
                "logo": "icones/Peinture_rapide.png",
                "seuil": 20,
                "idcible": 2,
                "ratio": 2,
                "typeratio": "vitesse",
                "unlocked": false
            }, {
                "name": "Changement de la courroie",
                "logo": "icones/Courroie.png",
                "seuil": 40,
                "idcible": 2,
                "ratio": 2,
                "typeratio": "ange",
                "unlocked": false
            },
        ]
    },
    {
        "id": 3,
        "name": "Peugeot 308",
        "logo": "icones/Peugeot_308.jpg",
        "cout": 720,
        "croissance": 1.14,
        "revenu": 540,
        "vitesse": 6000,
        "quantite": 1,
        "timeleft": 0,
        "managerUnlocked": false,
        "paliers": [
            {
                "name": "Blower",
                "logo": "icones/Blower.jpg",
                "seuil": 20,
                "idcible": 3,
                "ratio": 2,
                "typeratio": "vitesse",
                "unlocked": false
            }, {
                "name": "Freins en céramique",
                "logo": "icones/Ceramique_freins.jpg",
                "seuil": 60,
                "idcible": 3,
                "ratio": 4,
                "typeratio": "gain",
                "unlocked": false
            },
        ]
    },
    {
        "id": 4,
        "name": "Nissan Qashqai",
        "logo": "icones/Nissan_Qashqai.jpg",
        "cout": 8640,
        "croissance": 1.13,
        "revenu": 4320,
        "vitesse": 12000,
        "quantite": 1,
        "timeleft": 0,
        "managerUnlocked": false,
        "paliers": [
            {
                "name": "Changement de jantes",
                "logo": "icones/Jante_Qashqai.jpg",
                "seuil": 20,
                "idcible": 4,
                "ratio": 2,
                "typeratio": "vitesse",
                "unlocked": false
            }, {
                "name": "Motorisation e-power",
                "logo": "icones/E-power.png",
                "seuil": 66,
                "idcible": 4,
                "ratio": 2,
                "typeratio": "gain",
                "unlocked": false
            },
        ]
    },
    {
        "id": 5,
        "name": "Alpine A110",
        "logo": "icones/Alpine_A110.jpg",
        "cout": 103680,
        "croissance": 1.12,
        "revenu": 51840,
        "vitesse": 24000,
        "quantite": 1,
        "timeleft": 0,
        "managerUnlocked": false,
        "paliers": [
            {
                "name": "Extension de palette",
                "logo": "icones/Palette_A110.jpg",
                "seuil": 20,
                "idcible": 5,
                "ratio": 2,
                "typeratio": "vitesse",
                "unlocked": false
            },
            {
                "name": "Feu Pop-up",
                "logo": "icones/Feu_Pop_Up.jpeg",
                "seuil": 100,
                "idcible": 5,
                "ratio": 2,
                "typeratio": "gain",
                "unlocked": false
            }
        ]
    },
    {
        "id": 6,
        "name": "McLaren P1",
        "logo": "icones/Mclaren_F1.jpg",
        "cout": 1244160,
        "croissance": 1.11,
        "revenu": 622080,
        "vitesse": 96000,
        "quantite": 1,
        "timeleft": 0,
        "managerUnlocked": false,
        "paliers": [
            {
                "name": "Pack carbonne",
                "logo": "icones/Pack_Carbonne.jpg",
                "seuil": 20,
                "idcible": 6,
                "ratio": 2,
                "typeratio": "vitesse",
                "unlocked": false
            },
            {
                "name": "Sponsor Gulf",
                "logo": "icones/Gulf.jpg",
                "seuil": 200,
                "idcible": 6,
                "ratio": 2,
                "typeratio": "gain",
                "unlocked": false
            },
        ]
    }
    ],
    "allunlocks": [{
        "name": "Agrandissement du garage",
        "logo": "icones/Grand_garage.jpg",
        "seuil": 5,
        "idcible": 0,
        "ratio": 2,
        "typeratio": "gain",
        "unlocked": false
    }, {
        "name": "Sponsoring AlpineStars",
        "logo": "icones/Alpinestars.png",
        "seuil": 10,
        "idcible": 0,
        "ratio": 2,
        "typeratio": "gain",
        "unlocked": false
    },
    {
        "name": "Partenariat avec RedBull",
        "logo": "icones/Logo_Red_Bull_Powertrains.png",
        "seuil": 20,
        "idcible": 0,
        "ratio": 4,
        "typeratio": "gain",
        "unlocked": false
    },
    {
        "name": "Manager des managers",
        "logo": "icones/Christian_Horner.jpg",
        "seuil": 50,
        "idcible": 0,
        "ratio": 4,
        "typeratio": "ange",
        "unlocked": false
    }, {
        "name": "Optimisation de la chaîne de production",
        "logo": "icones/Chaine.jpg",
        "seuil": 100,
        "idcible": 0,
        "ratio": 2,
        "typeratio": "ange",
        "unlocked": false
    },
    ],
    "upgrades": [{
        "name": "Changement du moteur",
        "logo": "icones/Moteur_4L.jpg",
        "seuil": 1e3,
        "idcible": 1,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
    },
    {
        "name": "Amélioration du couple",
        "logo": "icones/Couple_4L.jpg",
        "seuil": 1e5,
        "idcible": 1,
        "ratio": 6,
        "typeratio": "gain",
        "unlocked": false
    },
    {
        "name": "Reprogrammation stage 1",
        "logo": "icones/Stage1.jpg",
        "seuil": 1e6,
        "idcible": 2,
        "ratio": 6,
        "typeratio": "gain",
        "unlocked": false
    },
    {
        "name": "Moteur GTI",
        "logo": "icones/Moteur_308.jpg",
        "seuil": 1e7,
        "idcible": 3,
        "ratio": 6,
        "typeratio": "gain",
        "unlocked": false
    },
    {
        "name": "Copilote automatique",
        "logo": "icones/Copilote_Nissan.jpg",
        "seuil": 1e8,
        "idcible": 4,
        "ratio": 6,
        "typeratio": "gain",
        "unlocked": false
    },
    {
        "name": "Pack aérodynamique",
        "logo": "icones/Aerodynamique_Alpine.jpg",
        "seuil": 1e9,
        "idcible": 5,
        "ratio": 6,
        "typeratio": "gain",
        "unlocked": false
    },
    {
        "name": "Moteur V8",
        "logo": "icones/Moteur_Mclaren.jpg",
        "seuil": 1e8,
        "idcible": 6,
        "ratio": 6,
        "typeratio": "gain",
        "unlocked": false
    },
    ],
    "angelupgrades": [{
        "name": "Circuit de Monaco",
        "logo": "icones/Monaco.jpg",
        "seuil": 10,
        "idcible": 0,
        "ratio": 3,
        "typeratio": "gain",
        "unlocked": false
    },
    {
        "name": "Circuit de Spa-Francorchamps",
        "logo": "icones/Spa-Francorchamps.png",
        "seuil": 100,
        "idcible": 0,
        "ratio": 4,
        "typeratio": "gain",
        "unlocked": false
    }, {
        "name": "Circuit de Barcelona-Catalunya",
        "logo": "icones/Barcelona.png",
        "seuil": 1000,
        "idcible": 0,
        "ratio": 5,
        "typeratio": "gain",
        "unlocked": false
    }, {
        "name": "Circuit de Monza",
        "logo": "icones/Monza.jpg",
        "seuil": 10000,
        "idcible": 0,
        "ratio": 6,
        "typeratio": "gain",
        "unlocked": false
    }, {
        "name": "Circuit du Nürburgring",
        "logo": "icones/Nurb.jpg",
        "seuil": 100000,
        "idcible": 0,
        "ratio": 7,
        "typeratio": "gain",
        "unlocked": false
    },],
    "managers": [{
        "name": "Oliver Solberg",
        "logo": "icones/Oliver_Solberg.jpg",
        "seuil": 10,
        "idcible": 1,
        "ratio": 0,
        "typeratio": "gain",
        "unlocked": false
    },
    {
        "name": "Cyril Abiteboul",
        "logo": "icones/Cyril_Abiteboul.jpg",
        "seuil": 100,
        "idcible": 2,
        "ratio": 0,
        "typeratio": "gain",
        "unlocked": false
    },
    {
        "name": "Sebastien Loeb",
        "logo": "icones/Sebastien_Loeb.jpg",
        "seuil": 1000,
        "idcible": 3,
        "ratio": 0,
        "typeratio": "gain",
        "unlocked": false
    },
    {
        "name": "Ken Block",
        "logo": "icones/Ken_Block.jpg",
        "seuil": 10000,
        "idcible": 4,
        "ratio": 0,
        "typeratio": "gain",
        "unlocked": false
    },
    {
        "name": "Ari Vatanen",
        "logo": "icones/Ari_Vatanen.jpg",
        "seuil": 100000,
        "idcible": 5,
        "ratio": 0,
        "typeratio": "gain",
        "unlocked": false
    },
    {
        "name": "Zak Brown",
        "logo": "icones/Zak_Brown.jpg",
        "seuil": 1000000,
        "idcible": 6,
        "ratio": 0,
        "typeratio": "gain",
        "unlocked": false
    }
    ]
};