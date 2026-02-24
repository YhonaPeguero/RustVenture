export const INITIAL_LANGUAGE_COMPARISONS = {
  js: {
    variables: {
      left: "let x = 5; // tipado dinámico, inferido",
      right: "let x: i32 = 5; // tipado estático, explícito",
      diffs: ["Rust necesita saber el tipo exacto en tiempo de compilación.", "JS lo descubre mientras corre."]
    },
    flow: {
      left: "if (x == 5) { ... }",
      right: "if x == 5 { ... } // ¡Sin paréntesis!",
      diffs: ["Rust no usa paréntesis en la condición del if.", "Rust obliga a usar bloques {} siempre."]
    },
    ownership: {
      left: "let a = [1, 2]; let b = a; console.log(a); // OK",
      right: "let a = vec![1, 2]; let b = a; println!(\"{:?}\", a); // ERROR",
      diffs: ["En Rust, el valor de 'a' se 'mueve' a 'b'.", "Esto evita punteros dobles a la misma memoria."]
    }
  },
  python: {
    variables: {
      left: "x = 5 # dinámico",
      right: "let x: i32 = 5; # estático",
      diffs: ["Rust es mucho más rápido por no tener recolector de basura.", "El tipado estático previene errores comunes en Python."]
    },
    flow: {
      left: "if x == 5: \n    pass",
      right: "if x == 5 { \n    \n}",
      diffs: ["Rust usa llaves {} en lugar de indentación.", "Rust tiene pattern matching nativo con 'match'."]
    },
    ownership: {
      left: "a = [1, 2]\nb = a\nprint(a) # OK",
      right: "let a = vec![1, 2];\nlet b = a;\nprintln!(\"{:?}\", a); // ERROR",
      diffs: ["Python copia la referencia, permitiendo modificaciones compartidas.", "Rust garantiza que solo un dueño existe a la vez."]
    }
  },
  java: {
    variables: {
      left: "int x = 5;",
      right: "let x: i32 = 5;",
      diffs: ["Rust usa 'let' para todo e infiere tipos si es posible.", "Rust maneja la memoria sin Garbage Collector."]
    },
    flow: {
      left: "if (x == 5) { ... }",
      right: "if x == 5 { ... }",
      diffs: ["Sintaxis muy similar, pero sin paréntesis obligatorios.", "Rust tiene expresiones: ¡if/match pueden devolver valores!"]
    },
    ownership: {
      left: "List<Integer> a = ...;\nList<Integer> b = a;\nSystem.out.println(a); // OK",
      right: "let a = vec![1, 2];\nlet b = a;\nprintln!(\"{:?}\", a); // ERROR",
      diffs: ["Java depende del GC para limpiar memoria.", "Rust limpia la memoria inmediatamente cuando el dueño sale de scope."]
    }
  },
  none: {
    variables: { left: "// Sin lenguaje previo", right: "let x: i32 = 5;", diffs: ["Rust es un lenguaje de sistemas.", "Es amado por su seguridad y velocidad."] },
    flow: { left: "// Sin lenguaje previo", right: "if x == 5 { ... }", diffs: ["El código fluye de arriba a abajo.", "Rust toma decisiones con if/else."] },
    ownership: { left: "// Sin lenguaje previo", right: "let b = a; // Mueve a", diffs: ["Rust tiene un concepto único: Ownership.", "Hace que el software sea robusto y seguro."] }
  }
};

export const LEVELS = [
  {
    id: 1,
    title: "Variables y Tipos",
    accent: "#f97316",
    challenges: [
      {
        id: "v1",
        type: "A",
        question: "¿Cuál es la forma correcta de declarar una variable inmutable en Rust?",
        options: ["var x = 5;", "const x = 5;", "let x = 5;", "x := 5;"],
        correct: 2,
        explanation: "En Rust, las variables son inmutables por defecto y se declaran con la palabra clave 'let'.",
        concept: "Inmutabilidad por defecto",
        comparisonKey: "variables"
      },
      {
        id: "v2",
        type: "B",
        question: "Completa el código para que la variable 'edad' sea un entero de 32 bits con signo.",
        code: "let edad: ____ = 25;",
        answer: "i32",
        explanation: "i32 es el tipo estándar para enteros de 32 bits en Rust.",
        concept: "Tipado Estático",
        comparisonKey: "variables"
      },
      {
        id: "v3",
        type: "C",
        question: "Selecciona la línea que causa un error de compilación por intentar cambiar un valor inmutable.",
        lines: [
          "let x = 10 Proxies;",
          "x = 20;",
          "println!(\"{}\", x);"
        ],
        correct: 1,
        explanation: "No puedes reasignar un valor a una variable declarada con 'let' a menos que uses 'let mut'.",
        concept: "Mutabilidad",
        comparisonKey: "variables"
      }
    ]
  },
  {
    id: 2,
    title: "Control de Flujo",
    accent: "#a855f7",
    challenges: [
      {
        id: "f1",
        type: "B",
        question: "Completa el if para verificar si 'x' es mayor a 10.",
        code: "if ____ > 10 {\n    println!(\"Grande\");\n}",
        answer: "x",
        explanation: "En Rust, la condición de un 'if' no requiere paréntesis.",
        concept: "Estructuras de Decisión",
        comparisonKey: "flow"
      },
      {
        id: "f2",
        type: "A",
        question: "¿Qué palabra clave se usa para crear un bucle infinito en Rust?",
        options: ["while true", "forever", "loop", "repeat"],
        correct: 2,
        explanation: "'loop' es una palabra clave nativa para bucles infinitos que solo se rompen con 'break'.",
        concept: "Bucles Infinitos",
        comparisonKey: "flow"
      },
      {
        id: "f3",
        type: "C",
        question: "En un 'match', todas las posibilidades deben ser cubiertas. ¿Dónde falta un brazo?",
        lines: [
            "let b = true;",
            "match b {",
            "    true => println!(\"Sí\"),",
            "}"
          ],
        correct: 2,
        explanation: "'match' en Rust es exhaustivo. Debes cubrir todas las variantes de un tipo (como true/false en un booleano).",
        concept: "Pattern Matching Exhaustivo",
        comparisonKey: "flow"
      }
    ]
  },
  {
    id: 3,
    title: "Funciones y Ownership",
    accent: "#ef4444",
    challenges: [
      {
        id: "o1",
        type: "B",
        question: "Define una función 'suma' que recibe un i32 y no devuelve nada.",
        code: "fn suma(x: ____) {\n    // ...\n}",
        answer: "i32",
        explanation: "Los parámetros de las funciones en Rust siempre deben tener tipos explícitos.",
        concept: "Firmas de Función",
        comparisonKey: "ownership"
      },
      {
        id: "o2",
        type: "C",
        question: "¿En qué línea ocurre el error de 'borrowing' después de mover el valor?",
        lines: [
          "let s1 = String::from(\"hola\");",
          "let s2 = s1;",
          "println!(\"{}\", s1);"
        ],
        correct: 2,
        explanation: "String no implementa Copy. Al hacer 's2 = s1', la propiedad del string se mueve a s2 y s1 deja de ser válido.",
        concept: "Ownership (Mover)",
        comparisonKey: "ownership"
      },
      {
        id: "o3",
        type: "A",
        question: "¿Cómo pasarías una referencia inmutable a una función en lugar de mover el valor?",
        options: ["&x", "*x", "ref x", "move x"],
        correct: 0,
        explanation: "El símbolo '&' se usa para crear una referencia, lo cual permite que la función acceda al valor sin tomar su Ownership.",
        concept: "Borrowing (Referencias)",
        comparisonKey: "ownership"
      }
    ]
  }
];

export const BADGES = [
  { id: 'first_byte', name: "Primer Byte", icon: "🦀", description: "Completaste tu primer reto.", requirement: (state) => state.completedChallenges.length >= 1 },
  { id: 'on_fire', name: "En Llamas", icon: "🔥", description: "3 retos seguidos sin errores.", requirement: (state) => state.streak >= 3 },
  { id: 'novice', name: "Rustacean Novato", icon: "🧠", description: "Completaste el Nivel 1.", requirement: (state) => state.completedLevels.includes(1) },
  { id: 'flow', name: "Flow State", icon: "⚡", description: "Completaste el Nivel 2.", requirement: (state) => state.completedLevels.includes(2) },
  { id: 'master', name: "Ownership Master", icon: "🏴‍☠️", description: "Completaste el Nivel 3.", requirement: (state) => state.completedLevels.includes(3) },
  { id: 'hero', name: "RustVenture Hero", icon: "🌟", description: "Completaste todos los niveles.", requirement: (state) => state.completedLevels.length === 3 }
];
