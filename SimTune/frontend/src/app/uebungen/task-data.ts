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
export const akkordeData: TaskData = {
  "header": "Akkorde",
  "groups": [
    {
      "group-header": "Dreiklänge Grundlagen",
      "cards": [
        {
          "card-header": "Dur-Dreiklänge",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/akkorde-dur"
        },
        {
          "card-header": "Moll-Dreiklänge",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/akkorde-moll"
        },
        {
          "card-header": "Dur oder Moll?",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/akkorde-dur-moll"
        }
      ]
    },
    {
      "group-header": "Erweiterte Dreiklänge",
      "cards": [
        {
          "card-header": "Verminderte Dreiklänge",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/akkorde-vermindert"
        },
        {
          "card-header": "Übermäßige Dreiklänge",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/akkorde-uebermaessig"
        },
        {
          "card-header": "Alle Dreiklangsarten",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/akkorde-alle"
        }
      ]
    },
    {
      "group-header": "Umkehrungen",
      "cards": [
        {
          "card-header": "Dreiklangsumkehrungen",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/akkorde-umkehrungen"
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


export const intervalleData: TaskData = {
  "header": "Intervalle",
  "groups": [
    {
      "group-header": "Basis",
      "cards": [
        {
          "card-header": "Intervalle",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/intervalle-basis"
        }
      ]
    },
    {
      "group-header": "Feinbestimmung",
      "cards": [
        {
          "card-header": "Reine Intervalle",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/intervalle-rein"
        },
        {
          "card-header": "Große & kleine Intervalle",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/intervalle-grossklein"
        },
        {
          "card-header": "Vermindert & Übermäßige Intervalle",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/intervalle-vermindertuebermaessig"
        }
      ]
    }
  ],
  "task-type": "",
  "task-url": ""
}

export const tonleiternData: TaskData = {
  "header": "Tonleitern",
  "groups": [
    {
      "group-header": "Dur (Major)",
      "cards": [
        {
          "card-header": "Dur-Tonleitern",
          "card-header-image-url": "",
          "card-image-url": "assets/images/Tonleitern-Notes.png",
          "card-url": "/tonleitern-dur"
        }
      ]
    },
    {
      "group-header": "Moll (Minor)",
      "cards": [
        {
          "card-header": "Natürliches Moll",
          "card-header-image-url": "",
          "card-image-url": "assets/images/Tonleitern-Notes.png",
          "card-url": "/tonleitern-moll-natuerlich"
        },
        {
          "card-header": "Harmonisches Moll",
          "card-header-image-url": "",
          "card-image-url": "assets/images/Tonleitern-Notes.png",
          "card-url": "/tonleitern-moll-harmonisch"
        },
        {
          "card-header": "Melodisches Moll",
          "card-header-image-url": "",
          "card-image-url": "assets/images/Tonleitern-Notes.png",
          "card-url": "/tonleitern-moll-melodisch"
        }
      ]
    },
    {
      "group-header": "Tonart & System",
      "cards": [
        {
          "card-header": "Vorzeichen / Quintenzirkel",
          "card-header-image-url": "",
          "card-image-url": "assets/images/Tonarten-Notes.png",
          "card-url": "/tonleitern-vorzeichen"
        },
        {
          "card-header": "Dur vs. Moll",
          "card-header-image-url": "",
          "card-image-url": "assets/images/Tonleitern-Notes.png",
          "card-url": "/tonleitern-mix"
        }
      ]
    }
  ],
  "task-type": "tonleitern",
  "task-url": ""
}

export const tonartenData: TaskData = {
  "header": "Tonarten",
  "groups": [
    {
      "group-header": "Kreuz & B",
      "cards": [
        {
          "card-header": "Kreuztonarten",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/tonarten-kreuz"
        },
        {
          "card-header": "B-Tonarten",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/tonarten-b"
        },
        {
          "card-header": "Alle Tonarten",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/tonarten-alle"
        }
      ]
    },
    {
      "group-header": "Versetzungszeichen",
      "cards": [
        {
          "card-header": "Kreuz, B & Auflösung",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/tonarten-vorzeichen"
        }
      ]
    },
    {
      "group-header": "Paralleltonarten",
      "cards": [
        {
          "card-header": "Dur ↔ Moll",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/tonarten-paralleltonarten"
        }
      ]
    }
  ],
  "task-type": "",
  "task-url": ""
}

export const rhythmusData: TaskData = {
  "header": "Rhythmus",
  "groups": [
    {
      "group-header": "Notenwerte",
      "cards": [
        {
          "card-header": "Ganze & Halbe Noten",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-notenwerte-ganze-halbe"
        },
        {
          "card-header": "Viertel & Achtel Noten",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-notenwerte-viertel-achtel"
        },
        {
          "card-header": "16tel & 32stel Noten",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-notenwerte-16tel-32stel"
        },
        {
          "card-header": "Alle Notenwerte",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-notenwerte-alle"
        }
      ]
    },
    {
      "group-header": "Pausenwerte",
      "cards": [
        {
          "card-header": "Ganze & Halbe Pausen",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-pausen-ganze-halbe"
        },
        {
          "card-header": "Viertel & Achtel Pausen",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-pausen-viertel-achtel"
        },
        {
          "card-header": "16tel & 32stel Pausen",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-pausen-16tel-32stel"
        },
        {
          "card-header": "Alle Pausenwerte",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-pausen-alle"
        }
      ]
    },
    {
      "group-header": "Verlängerungspunkte",
      "cards": [
        {
          "card-header": "Punktierte Noten (lang)",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-punktiert-noten-lang"
        },
        {
          "card-header": "Punktierte Noten (kurz)",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-punktiert-noten-kurz"
        },
        {
          "card-header": "Alle punktierten Noten",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-punktiert-noten-alle"
        },
        {
          "card-header": "Punktierte Pausen (lang)",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-punktiert-pausen-lang"
        },
        {
          "card-header": "Punktierte Pausen (kurz)",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-punktiert-pausen-kurz"
        },
        {
          "card-header": "Alle punktierten Pausen",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-punktiert-pausen-alle"
        }
      ]
    },
    {
      "group-header": "Gemischt",
      "cards": [
        {
          "card-header": "Alles gemischt",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-mix-alle"
        }
      ]
    }
  ],
  "task-type": "",
  "task-url": ""
}
