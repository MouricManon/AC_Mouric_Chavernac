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
            "cout": 2,
            "croissance": 1.07,
            "revenu": 1,
            "vitesse": 500,
            "quantite": 1,
            "timeleft": 0,
            "managerUnlocked": false,
            "palliers": [
                {
                    "name": "Nom du premier palier",
                    "logo": "icones/4L.jpg",
                    "seuil": 20,
                    "idcible": 1,
                    "ratio": 2,
                    "typeratio": "vitesse",
                    "unlocked": "false"
                },
                {
                    "name": "Nom deuxième palier",
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
        },
        {
            "id": 3,
            "name": "peugeot 308",
            "logo": "icones/peugeot.jpg",
        },
        {
            "id": 4,
            "name": "Nissan Qashqai",
            "logo": "icones/qashqai.jpg",
        },
        {
            "id": 5,
            "name": "Alpine A110",
            "logo": "icones/alpine.jpg",
        },
        {
            "id": 6,
            "name": "McLaren P1",
            "logo": "icones/mclaren.jpg",
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
    ]
};