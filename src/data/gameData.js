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
    },
    structs: {
      left: "class User {\n  constructor(n) { this.name = n; }\n}",
      right: "struct User {\n  name: String\n}",
      diffs: ["Rust no usa clases, usa Structs para datos.", "La lógica se añade con bloques 'impl'."]
    },
    anchor: {
      left: "const tx = await program.methods.init();",
      right: "pub fn initialize(ctx: Context<Initialize>) -> Result<()> { ... }",
      diffs: ["Anchor simplifica llamadas RPC a Solana.", "El backend usa tipos de Rust seguros."]
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
    },
    structs: {
      left: "@dataclass\nclass User:\n    name: str",
      right: "struct User {\n    name: String\n}",
      diffs: ["Sintaxis similar a las dataclasses de Python.", "Rust requiere declarar tipos de forma estática."]
    },
    anchor: {
      left: "result = solana_client.send_transaction(tx)",
      right: "#[program]\npub mod my_contract { ... }",
      diffs: ["Solana en Python usa SDKs de cliente.", "En Rust (Anchor) escribes el contrato real."]
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
    },
    structs: {
      left: "class User {\n    String name;\n}",
      right: "struct User {\n    name: String\n}",
      diffs: ["Structs no tienen herencia como las clases de Java.", "Favorece la composición sobre la herencia."]
    },
    anchor: {
      left: "Rethink public/private accessors",
      right: "#[account]\npub struct MyData { ... }",
      diffs: ["Anchor maneja el estado de forma granular.", "Usa macros para reducir el código repetitivo."]
    }
  },
  none: {
    variables: { left: "// Sin lenguaje previo", right: "let x: i32 = 5;", diffs: ["Rust es un lenguaje de sistemas.", "Es amado por su seguridad y velocidad."] },
    flow: { left: "// Sin lenguaje previo", right: "if x == 5 { ... }", diffs: ["El código fluye de arriba a abajo.", "Rust toma decisiones con if/else."] },
    ownership: { left: "// Sin lenguaje previo", right: "let b = a; // Mueve a", diffs: ["Rust tiene un concepto único: Ownership.", "Hace que el software sea robusto y seguro."] },
    structs: { left: "// Organizar datos", right: "struct Point { x: i32, y: i32 }", diffs: ["Estructura tus datos con nombres claros.", "Define cómo se comportan tus objetos."] },
    anchor: { left: "// Smart Contracts", right: "#[program] pub mod contract { ... }", diffs: ["Crea aplicaciones para la blockchain.", "Anchor es el estándar de seguridad en Solana."] }
  }
};

export const LEVELS = [
  {
    id: 1,
    title: "Variables y Tipos",
    accent: "#14F195",
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
  },
  {
    id: 4,
    title: "Structs y Enums",
    accent: "#ec4899",
    challenges: [
      {
        id: "s1",
        type: "A",
        question: "¿Cuál es la sintaxis correcta para definir un Struct de datos?",
        options: ["class Usuario { ... }", "struct Usuario { ... }", "type Usuario = { ... }", "def Usuario: ..."],
        correct: 1,
        explanation: "Rust usa la palabra clave 'struct' para agrupar datos relacionados.",
        concept: "Estructuras de Datos",
        comparisonKey: "structs"
      },
      {
        id: "s2",
        type: "B",
        question: "Completa el Enum para representar dos estados: 'Activo' e 'Inactivo'.",
        code: "enum Estado {\n    ____,\n    Inactivo\n}",
        answer: "Activo",
        explanation: "Los Enums en Rust permiten definir un tipo que puede ser uno de varios variantes.",
        concept: "Enums",
        comparisonKey: "structs"
      },
      {
        id: "s3",
        type: "C",
        question: "Selecciona el bloque que implementa un método para el struct 'Cuenta'.",
        lines: [
          "impl Cuenta { fn saludo() {} }",
          "Cuenta.method = () => {}",
          "extension Cuenta { fn saludo() {} }"
        ],
        correct: 0,
        explanation: "El bloque 'impl' (implementation) es donde defines los métodos asociados a un struct o enum.",
        concept: "Bloques de Implementación",
        comparisonKey: "structs"
      }
    ]
  },
  // ─── SECCIÓN 2: SOLANA ANCHOR ───
  {
    id: 5,
    title: "Anchor: Estructura",
    accent: "#9945ff",
    challenges: [
      {
        id: "a1",
        type: "A",
        question: "¿Qué macro denota el punto de entrada de la lógica de tu programa en Anchor?",
        options: ["#[entrypoint]", "#[solana_program]", "#[program]", "#[anchor_main]"],
        correct: 2,
        explanation: "#[program] es la macro que define las instrucciones que tu contrato puede ejecutar.",
        concept: "Macros de Anchor",
        comparisonKey: "anchor"
      },
      {
        id: "a2",
        type: "B",
        question: "Macro necesaria para definir la dirección pública del programa.",
        code: "____!(\"6D8...xyz\");",
        answer: "declare_id",
        explanation: "declare_id! establece la dirección única donde tu programa vivirá en la blockchain.",
        concept: "Program ID",
        comparisonKey: "anchor"
      }
    ]
  },
  {
    id: 6,
    title: "Anchor: Cuentas",
    accent: "#14f195",
    challenges: [
      {
        id: "ac1",
        type: "A",
        question: "¿Qué macro permite validar y deserializar automáticamente las cuentas de una instrucción?",
        options: ["#[account]", "#[derive(Accounts)]", "#[accounts_validate]", "#[context]"],
        correct: 1,
        explanation: "#[derive(Accounts)] genera el código para validar que las cuentas pasadas cumplen los requisitos.",
        concept: "Validación de Cuentas",
        comparisonKey: "anchor"
      },
      {
        id: "ac2",
        type: "B",
        question: "Tipo de cuenta que representa la autoridad que firma la transacción.",
        code: "pub usuario: ____<'info>,",
        answer: "Signer",
        explanation: "Signer garantiza que la cuenta proporcionada firmó la transacción.",
        concept: "Autorización",
        comparisonKey: "anchor"
      }
    ]
  },
  {
    id: 7,
    title: "Anchor: Seguridad",
    accent: "#3b82f6",
    challenges: [
      {
        id: "sec1",
        type: "A",
        question: "¿Cuál restricción se usa para indicar que Anchor debe crear una cuenta nueva?",
        options: ["create", "new", "init", "allocate"],
        correct: 2,
        explanation: "La restricción 'init' le dice a Anchor que intente crear e inicializar la cuenta.",
        concept: "Inicialización",
        comparisonKey: "anchor"
      },
      {
        id: "sec2",
        type: "B",
        question: "Atributo necesario para permitir que los datos de una cuenta sean modificados.",
        code: "#[account(____)]",
        answer: "mut",
        explanation: "'mut' marca una cuenta como mutable, permitiendo que el programa guarde cambios en ella.",
        concept: "Mutabilidad en Solana",
        comparisonKey: "anchor"
      }
    ]
  },
  {
    id: 8,
    title: "Anchor: Estado",
    accent: "#0ea5e9",
    challenges: [
      {
        id: "st1",
        type: "A",
        question: "¿Qué macro se usa para definir una estructura de datos que se guardará en una cuenta?",
        options: ["#[account]", "#[state]", "#[data]", "#[storage]"],
        correct: 0,
        explanation: "#[account] en un struct le añade el discriminador de 8 bytes necesario para identificarlo.",
        concept: "Definición de Cuentas",
        comparisonKey: "anchor"
      },
      {
        id: "st2",
        type: "B",
        question: "Cantidad de bytes fijos que Anchor añade como 'discriminador' al inicio de cada cuenta.",
        code: "const DISCRIMINATOR: usize = ____;",
        answer: "8",
        explanation: "Anchor usa 8 bytes iniciales para saber exactamente qué tipo de struct hay en esa cuenta.",
        concept: "Discriminadores",
        comparisonKey: "anchor"
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
  { id: 'anchor_apprentice', name: "Anchor Apprentice", icon: "⚓", description: "Entraste al mundo de Solana con Anchor.", requirement: (state) => state.completedLevels.includes(5) },
  { id: 'solana_architect', name: "Solana Architect", icon: "🏗️", description: "Dominas el manejo de cuentas y seguridad.", requirement: (state) => state.completedLevels.includes(7) },
  { id: 'hero', name: "RustVenture Hero", icon: "🌟", description: "Completaste todos los niveles (Rust + Anchor).", requirement: (state) => state.completedLevels.length === 8 }
];
