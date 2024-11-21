export type TaskData = {
  "header": string,
  "groups": {
      "group-header": string,
      "cards": {
        "card-header": string,
        "card-image-url": string,
        "card-url": string,
      }[]
  }[]
}

export const uebungenData: TaskData = {
  "header": "Übungen",
  "groups": [
    {
      "group-header": "Grundlagen",
      "cards": [
        {
          "card-header": "Töne",
          "card-image-url": "assets/images/Töne-Notes.png",
          "card-url": "/toene"
        },
        {
          "card-header": "Rhythmus",
          "card-image-url": "assets/images/Rhythmus-Notes.png",
          "card-url": "/rhythmus"
        }
      ]
    },
    {
      "group-header": "Struktur",
      "cards": [
        {
          "card-header": "Intervalle",
          "card-image-url": "assets/images/Intervalle-Notes.png",
          "card-url": "/intervalle"
        },
        {
          "card-header": "Akkorde",
          "card-image-url": "assets/images/Akkorde-Notes.png",
          "card-url": "/akkorde"
        },
        {
          "card-header": "Tonleitern",
          "card-image-url": "assets/images/Tonleitern-Notes.png",
          "card-url": "/tonleitern"
        },
        {
          "card-header": "Tonarten",
          "card-image-url": "assets/images/Tonarten-Notes.png",
          "card-url": "/tonarten"
        }
      ]
    }
  ]
}

export const toeneData: TaskData = {
  "header": "Töne",
  "groups": [
    {
      "group-header": "Klavier",
      "cards": [
        {
          "card-header": "Stammtöne",
          "card-image-url": "",
          "card-url": "/stammtoene"
        },
        {
          "card-header": "Versetzungszeichen",
          "card-image-url": "",
          "card-url": "/rhythmus"
        }
      ]
    },
    {
      "group-header": "Violinschlüssel",
      "cards": [
        {
          "card-header": "Stammtöne",
          "card-image-url": "",
          "card-url": "/intervalle"
        },
        {
          "card-header": "Versetzungzeichen",
          "card-image-url": "",
          "card-url": "/akkorde"
        },
        {
          "card-header": "Hilfslinien",
          "card-image-url": "",
          "card-url": "/tonleitern"
        }
      ]
    },
    {
      "group-header": "Basschlüssel",
      "cards": [
        {
          "card-header": "Stammtöne",
          "card-image-url": "",
          "card-url": "/intervalle"
        },
        {
          "card-header": "Versetzungzeichen",
          "card-image-url": "",
          "card-url": "/akkorde"
        },
        {
          "card-header": "Hilfslinien",
          "card-image-url": "",
          "card-url": "/tonleitern"
        }
      ]
    }
  ]
}

export const intervalleData: TaskData = {
  "header": "Intervalle",
  "groups": [
    {
      "group-header": "Einführung",
      "cards": [
        {
          "card-header": "Noten",
          "card-image-url": "",
          "card-url": "/stammtoene"
        },
        {
          "card-header": "Gehörbildung",
          "card-image-url": "",
          "card-url": "/rhythmus"
        }
      ]
    }
  ]
}
