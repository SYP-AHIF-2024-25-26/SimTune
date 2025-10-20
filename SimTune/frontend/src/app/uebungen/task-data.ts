export type TaskData = {
  "header": string,
  "groups": {
      "group-header": string,
      "cards": {
        "card-header": string,
        "card-header-image-url": string,
        "card-image-url": string,
        "card-url": string,
      }[]
  }[],
  "task-type": string,
  "task-url": string
}

export const uebungenData: TaskData = {
  "header": "Übungen",
  "groups": [
    {
      "group-header": "Grundlagen",
      "cards": [
        {
          "card-header": "Töne",
          "card-header-image-url": "assets/images/Toene.png",
          "card-image-url": "assets/images/Töne-Notes.png",
          "card-url": "/toene"
        },
        {
          "card-header": "Rhythmus",
          "card-header-image-url": "assets/images/Rythmus.png",
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
          "card-header-image-url": "assets/images/Intervalle.png",
          "card-image-url": "assets/images/Intervalle-Notes.png",
          "card-url": "/intervalle"
        },
        {
          "card-header": "Akkorde",
          "card-header-image-url": "assets/images/Akkorde.png",
          "card-image-url": "assets/images/Akkorde-Notes.png",
          "card-url": "/akkorde"
        },
        {
          "card-header": "Tonleitern",
          "card-header-image-url": "assets/images/Tonleitern.png",
          "card-image-url": "assets/images/Tonleitern-Notes.png",
          "card-url": "/tonleitern"
        },
        {
          "card-header": "Tonarten",
          "card-header-image-url": "assets/images/Tonarten.png",
          "card-image-url": "assets/images/Tonarten-Notes.png",
          "card-url": "/tonarten"
        }
      ]
    }
  ],
  "task-type": "",
  "task-url": ""
}

export const toeneData: TaskData = {
  "header": "Töne",
  "groups": [
    {
      "group-header": "Klavier",
      "cards": [
        {
          "card-header": "Stammtöne",
          "card-header-image-url": "",
          "card-image-url": "assets/images/klaviertasten.png",
          "card-url": "/stammtoene-klavier"
        },
        {
          "card-header": "Versetzungszeichen",
          "card-header-image-url": "",
          "card-image-url": "assets/images/klaviertasten.png",
          "card-url": "/versetzungszeichen-klavier"
        }
      ]
    },
    {
      "group-header": "Violinschlüssel",
      "cards": [
        {
          "card-header": "Stammtöne",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/stammtoene-violinschluessel"
        },
        {
          "card-header": "Versetzungszeichen",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/versetzungszeichen-violinschluessel"
        },
        {
          "card-header": "Hilfslinien",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/hilfslinien-violinschluessel"
        }
      ]
    },
    {
      "group-header": "Basschlüssel",
      "cards": [
        {
          "card-header": "Stammtöne",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/stammtoene-basschluessel"
        },
        {
          "card-header": "Versetzungszeichen",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/versetzungszeichen-basschluessel"
        },
        {
          "card-header": "Hilfslinien",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/hilfslinien-basschluessel"
        }
      ]
    }
  ],
  "task-type": "",
  "task-url": ""
}

export const stammtoeneData: TaskData = {
  "header": "",
  "groups": [
    {
      "group-header": "",
      "cards": [
        {
          "card-header": "",
          "card-header-image-url": "",
          "card-image-url": "",
          "card-url": ""
        }
      ]
    }
  ],
  "task-type": "stammtoene",
  "task-url": ""
}

export const notenSystemData: TaskData = {
  "header": "",
  "groups": [
    {
      "group-header": "",
      "cards": [
        {
          "card-header": "",
          "card-header-image-url": "",
          "card-image-url": "",
          "card-url": ""
        }
      ]
    }
  ],
  "task-type": "notensystem",
  "task-url": ""
}

export const tonleiternData: TaskData = {
  "header": "",
  "groups": [
    {
      "group-header": "",
      "cards": [
        {
          "card-header": "",
          "card-header-image-url": "",
          "card-image-url": "",
          "card-url": ""
        }
      ]
    }
  ],
  "task-type": "tonleitern",
  "task-url": ""
}

export const intervalleData: TaskData = {
  "header": "Intervalle",
  "groups": [
    {
      "group-header": "Einführung",
      "cards": [
        {
          "card-header": "Noten",
          "card-header-image-url": "",
          "card-image-url": "",
          "card-url": "/stammtoene"
        },
        {
          "card-header": "Gehörbildung",
          "card-header-image-url": "",
          "card-image-url": "",
          "card-url": "/rhythmus"
        }
      ]
    }
  ],
  "task-type": "intervalle",
  "task-url": ""
}
