export type TaskData = {
  "header": string,
  "groups": {
      "group-header": string,
      "cards": {
        "card-header": string,
        "card-header-image-url": string,
        "card-image-url": string,
        "card-url": string,
        "disabled": boolean
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
          "card-url": "/toene",
          "disabled": false
        },
        {
          "card-header": "Rhythmus",
          "card-header-image-url": "assets/images/Rythmus.png",
          "card-image-url": "assets/images/Rhythmus-Notes.png",
          "card-url": "/rhythmus",
          "disabled": false
        },
        {
          "card-header": "Fachbegriffe",
          "card-header-image-url": "assets/images/Toene.png",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/fachbegriffe",
          "disabled": false
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
          "card-url": "/intervalle",
          "disabled": false
        },
        {
          "card-header": "Akkorde",
          "card-header-image-url": "assets/images/Akkorde.png",
          "card-image-url": "assets/images/Akkorde-Notes.png",
          "card-url": "/akkorde",
          "disabled": false
        },
        {
          "card-header": "Tonleitern",
          "card-header-image-url": "assets/images/Tonleitern.png",
          "card-image-url": "assets/images/Tonleitern-Notes.png",
          "card-url": "/tonleitern",
          "disabled": false
        },
        {
          "card-header": "Tonarten",
          "card-header-image-url": "assets/images/Tonarten.png",
          "card-image-url": "assets/images/Tonarten-Notes.png",
          "card-url": "/tonarten",
          "disabled": false
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
          "card-url": "/akkorde-dur",
          "disabled": false
        },
        {
          "card-header": "Moll-Dreiklänge",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/akkorde-moll",
          "disabled": false
        },
        {
          "card-header": "Dur oder Moll?",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/akkorde-dur-moll",
          "disabled": false
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
          "card-url": "/akkorde-vermindert",
          "disabled": false
        },
        {
          "card-header": "Übermäßige Dreiklänge",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/akkorde-uebermaessig",
          "disabled": false
        },
        {
          "card-header": "Alle Dreiklangsarten",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/akkorde-alle",
          "disabled": false
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
          "card-url": "/akkorde-umkehrungen",
          "disabled": false
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
          "card-url": "/stammtoene-klavier",
          "disabled": false
        },
        {
          "card-header": "Versetzungszeichen",
          "card-header-image-url": "",
          "card-image-url": "assets/images/klaviertasten.png",
          "card-url": "/versetzungszeichen-klavier",
          "disabled": true
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
          "card-url": "/stammtoene-violinschluessel",
          "disabled": false
        },
        {
          "card-header": "Versetzungszeichen",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/versetzungszeichen-violinschluessel",
          "disabled": false
        },
        {
          "card-header": "Hilfslinien",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/hilfslinien-violinschluessel",
          "disabled": false
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
          "card-url": "/stammtoene-basschluessel",
          "disabled": false
        },
        {
          "card-header": "Versetzungszeichen",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/versetzungszeichen-basschluessel",
          "disabled": false
        },
        {
          "card-header": "Hilfslinien",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/hilfslinien-basschluessel",
          "disabled": false
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
          "card-url": "",
          "disabled": true
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
          "card-url": "",
          "disabled": true
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
          "card-url": "/intervalle-basis",
          "disabled": false
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
          "card-url": "/intervalle-rein",
          "disabled": false
        },
        {
          "card-header": "Große & kleine Intervalle",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/intervalle-grossklein",
          "disabled": false
        },
        {
          "card-header": "Vermindert & Übermäßige Intervalle",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/intervalle-vermindertuebermaessig",
          "disabled": false
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
          "card-url": "/tonleitern-dur",
          "disabled": false
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
          "card-url": "/tonleitern-moll-natuerlich",
          "disabled": false
        },
        {
          "card-header": "Harmonisches Moll",
          "card-header-image-url": "",
          "card-image-url": "assets/images/Tonleitern-Notes.png",
          "card-url": "/tonleitern-moll-harmonisch",
          "disabled": false
        },
        {
          "card-header": "Melodisches Moll",
          "card-header-image-url": "",
          "card-image-url": "assets/images/Tonleitern-Notes.png",
          "card-url": "/tonleitern-moll-melodisch",
          "disabled": false
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
          "card-url": "/tonleitern-vorzeichen",
          "disabled": false
        },
        {
          "card-header": "Dur vs. Moll",
          "card-header-image-url": "",
          "card-image-url": "assets/images/Tonleitern-Notes.png",
          "card-url": "/tonleitern-mix",
          "disabled": false
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
          "card-url": "/tonarten-kreuz",
          "disabled": false
        },
        {
          "card-header": "B-Tonarten",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/tonarten-b",
          "disabled": false
        },
        {
          "card-header": "Alle Tonarten",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/tonarten-alle",
          "disabled": false
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
          "card-url": "/tonarten-vorzeichen",
          "disabled": false
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
          "card-url": "/tonarten-paralleltonarten",
          "disabled": false
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
          "card-url": "/rhythmus-notenwerte-ganze-halbe",
          "disabled": false
        },
        {
          "card-header": "Viertel & Achtel Noten",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-notenwerte-viertel-achtel",
          "disabled": false
        },
        {
          "card-header": "16tel & 32stel Noten",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-notenwerte-16tel-32stel",
          "disabled": false
        },
        {
          "card-header": "Alle Notenwerte",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-notenwerte-alle",
          "disabled": false
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
          "card-url": "/rhythmus-pausen-ganze-halbe",
          "disabled": false
        },
        {
          "card-header": "Viertel & Achtel Pausen",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-pausen-viertel-achtel",
          "disabled": false
        },
        {
          "card-header": "16tel & 32stel Pausen",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-pausen-16tel-32stel",
          "disabled": false
        },
        {
          "card-header": "Alle Pausenwerte",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-pausen-alle",
          "disabled": false
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
          "card-url": "/rhythmus-punktiert-noten-lang",
          "disabled": false
        },
        {
          "card-header": "Punktierte Noten (kurz)",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-punktiert-noten-kurz",
          "disabled": false
        },
        {
          "card-header": "Alle punktierten Noten",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-punktiert-noten-alle",
          "disabled": false
        },
        {
          "card-header": "Punktierte Pausen (lang)",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-punktiert-pausen-lang",
          "disabled": false
        },
        {
          "card-header": "Punktierte Pausen (kurz)",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-punktiert-pausen-kurz",
          "disabled": false
        },
        {
          "card-header": "Alle punktierten Pausen",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/rhythmus-punktiert-pausen-alle",
          "disabled": false
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
          "card-url": "/rhythmus-mix-alle",
          "disabled": false
        }
      ]
    }
  ],
  "task-type": "",
  "task-url": ""
}

export const fachbegriffeData: TaskData = {
  "header": "Musikalische Fachbegriffe",
  "groups": [
    {
      "group-header": "Lautstärke",
      "cards": [
        {
          "card-header": "Dynamik",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/fachbegriffe-dynamik",
          "disabled": false
        }
      ]
    },
    {
      "group-header": "Geschwindigkeit",
      "cards": [
        {
          "card-header": "Tempo",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/fachbegriffe-tempo",
          "disabled": false
        }
      ]
    },
    {
      "group-header": "Spielweise",
      "cards": [
        {
          "card-header": "Artikulation",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/fachbegriffe-artikulation",
          "disabled": false
        }
      ]
    },
    {
      "group-header": "Sonstiges",
      "cards": [
        {
          "card-header": "Ablauf & Zeichen",
          "card-header-image-url": "",
          "card-image-url": "assets/images/musiknoten.png",
          "card-url": "/fachbegriffe-ablauf",
          "disabled": false
        }
      ]
    }
  ],
  "task-type": "",
  "task-url": ""
}
