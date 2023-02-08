module.exports = {
    "name": "Nom du monde",
    "logo": "icones/logomonde.jpg",
    "money": 0,
    "score": 0,
    "totalangels": 0,
    "activeangels": 0,
    "angelbonus": 2,
    "lastupdate": 0,
    "products": [
        {
            "id": 1,
            "name": "4L",
            "logo": "icones/4L.jpg",
            "cout": 4,
            "croissance": 1.07,
            "revenu": 1,
            "vitesse": 500,
            "quantite": 1,
            "timeleft": 0.5,
            "managerUnlocked": false,
            "palliers": [
                {
                    "name": "Changement du moteur",
                    "logo": "icones/4L.jpg",
                    "seuil": 20,
                    "idcible": 1,
                    "ratio": 2,
                    "typeratio": "vitesse",
                    "unlocked": "false"
                },
                {
                    "name": "Amélioration du couple",
                    "logo": "icones/4L.jpg",
                    "seuil": 75,
                    "idcible": 1,
                    "ratio": 2,
                    "typeratio": "vitesse",
                    "unlocked": "false"
                }
                //Rajouter les autres paliers
            ]
        },
        {
            "id": 2,
            "name": "Twingo",
            "logo": "icones/twingo.jpg",
            "cout": 60,
            "croissance": 1.15,
            "revenu": 60,
            "vitesse": 500,
            "quantite": 1,
            "timeleft": 3,
            "managerUnlocked": false,
            "palliers": [
                {
                    "name": "Reprogrammation stage 1",
                    "logo": "icones/4L.jpg",
                    "seuil": 20,
                    "idcible": 1,
                    "ratio": 2,
                    "typeratio": "vitesse",
                    "unlocked": "false"
                }
            ]
        },
        {
            "id": 3,
            "name": "peugeot 308",
            "logo": "icones/peugeot.jpg",
            "cout": 720,
            "croissance": 1.14,
            "revenu": 540,
            "vitesse": 500,
            "quantite": 1,
            "timeleft": 6,
            "managerUnlocked": false,
            "palliers": [
                {
                    "name": "Moteur GTI",
                    "logo": "icones/4L.jpg",
                    "seuil": 20,
                    "idcible": 1,
                    "ratio": 2,
                    "typeratio": "vitesse",
                    "unlocked": "false"
                }
            ]
        },
        {
            "id": 4,
            "name": "Nissan Qashqai",
            "logo": "icones/qashqai.jpg",
            "cout": 8640,
            "croissance": 1.13,
            "revenu": 4320,
            "vitesse": 500,
            "quantite": 1,
            "timeleft": 12,
            "managerUnlocked": false,
            "palliers": [
                {
                    "name": "Copilote automatique",
                    "logo": "icones/4L.jpg",
                    "seuil": 20,
                    "idcible": 1,
                    "ratio": 2,
                    "typeratio": "vitesse",
                    "unlocked": "false"
                }
            ]
        },
        {
            "id": 5,
            "name": "Alpine A110",
            "logo": "icones/alpine.jpg",
            "cout": 103680,
            "croissance": 1.12,
            "revenu": 1,
            "vitesse": 51840,
            "quantite": 1,
            "timeleft": 24,
            "managerUnlocked": false,
            "palliers": [
                {
                    "name": "Pack aérodynamique",
                    "logo": "icones/4L.jpg",
                    "seuil": 20,
                    "idcible": 1,
                    "ratio": 2,
                    "typeratio": "vitesse",
                    "unlocked": "false"
                }
            ]
        },
        {
            "id": 6,
            "name": "McLaren P1",
            "logo": "icones/mclaren.jpg",
            "cout": 1244160,
            "croissance": 1.11,
            "revenu": 622080,
            "vitesse": 500,
            "quantite": 1,
            "timeleft": 96,
            "managerUnlocked": false,
            "palliers": [
                {
                    "name": "Moteur V8",
                    "logo": "icones/4L.jpg",
                    "seuil": 20,
                    "idcible": 1,
                    "ratio": 2,
                    "typeratio": "vitesse",
                    "unlocked": "false"
                }
            ]
        }
    ],
    "allunlocks": [
        {
            "name": "Nom du premier unlock général",
            "logo": "icones/premierunlock.jpg",
            "seuil": 30,
            "idcible": 0,
            "ratio": 2,
            "typeratio": "gain",
            "unlocked": "false"
        },
    ],
    "upgrades": [
        {
            "name": "Nom du premier upgrade",
            "logo": "icones/premierupgrade.jpg",
            "seuil": 1e3,
            "idcible": 1,
            "ratio": 3,
            "typeratio": "gain",
            "unlocked": "false"
        },
    ],
    "angelupgrades": [
        {
            "name": "Angel Sacrifice",
            "logo": "icones/angel.png",
            "seuil": 10,
            "idcible": 0,
            "ratio": 3,
            "typeratio": "gain",
            "unlocked": "false"
        },
    ],
    "managers": [
        {
            "name": "Wangari Maathai",
            "logo": "icones/WangariMaathai.jpg",
            "seuil": 10,
            "idcible": 1,
            "ratio": 0,
            "typeratio": "gain",
            "unlocked": "false"
        },
        {
            "name": "Wangari Maathai",
            "logo": "icones/WangariMaathai.jpg",
            "seuil": 100,
            "idcible": 2,
            "ratio": 0,
            "typeratio": "gain",
            "unlocked": "false"
        },
        {
            "name": "Wangari Maathai",
            "logo": "icones/WangariMaathai.jpg",
            "seuil": 1000,
            "idcible": 3,
            "ratio": 0,
            "typeratio": "gain",
            "unlocked": "false"
        },
        {
            "name": "Wangari Maathai",
            "logo": "icones/WangariMaathai.jpg",
            "seuil": 10000,
            "idcible": 4,
            "ratio": 0,
            "typeratio": "gain",
            "unlocked": "false"
        },
        {
            "name": "Wangari Maathai",
            "logo": "icones/WangariMaathai.jpg",
            "seuil": 100000,
            "idcible": 5,
            "ratio": 0,
            "typeratio": "gain",
            "unlocked": "false"
        },
        {
            "name": "Wangari Maathai",
            "logo": "icones/WangariMaathai.jpg",
            "seuil": 1000000,
            "idcible": 6,
            "ratio": 0,
            "typeratio": "gain",
            "unlocked": "false"
        }
    ]
};