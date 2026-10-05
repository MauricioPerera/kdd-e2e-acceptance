# KDD + e2e acceptance

Integración independiente de e2e como capa de aceptación UI de KDD. Un oráculo
Node sellado ejecuta siete casos deterministas en Chromium y valida el reporte
completo, la selección esperada, su fecha y el commit. KDD Board reconoce un
test externo; la evidencia conserva los siete casos internos.

## Preparación

Requisitos: Node 24.8 o posterior (CI fija 24.16.0), npm, Python 3.10 o posterior
y Git. En Windows se usa Git for Windows cuando está disponible.

```text
npm ci --ignore-scripts --no-audit --no-fund
npm run setup:kdd
npm run install:browser
```

En Linux, instalar también las dependencias del navegador con
`node node_modules/playwright-core/cli.js install --with-deps chromium`.
El setup de KDD descarga su revisión fija a `.kdd-runtime/KDD`; nunca resetea un
checkout existente. Un runtime incompleto o alterado falla y debe inspeccionarse.

## Comprobaciones locales

```text
npm run test:functional
npm run test:adversarial
npm run test:ui
npm run validate:kdd
npm run probe:board
```

El oráculo UI exige un repositorio Git y un árbol de archivos tracked limpio.
Guardar los cambios en un commit antes de recopilar evidencia. La configuración
usa un puerto local libre, una sesión nueva por caso y cero reintentos. Las
pruebas no necesitan claves de modelos ni servicios externos.

Los reportes, logs, hashes y traces se guardan bajo `.e2e/runs/UUID/`.
`evidence.json` enlaza el contrato, commit, comando y hash del reporte. En GitHub
Actions incluye el ID y URL de la ejecución. Su estado es `locally_verified`:
un archivo escrito por el runner no autentica por sí mismo un run remoto.

## Aprobación y CI

Leer [el procedimiento de revisión](docs/REVIEW.md). `quality.json` protege
oráculos, helpers, schema, configuración, lockfile, scripts y workflow. Solo los
cuatro archivos de `example/` autorizados son implementación mutable.

La referencia se proporciona desde fuera del código del implementador mediante
`KDD_QUALITY_APPROVED_REF`, con el SHA completo aprobado por una persona. Ejemplo
PowerShell, después de sustituir el valor por el SHA revisado:

```powershell
$env:KDD_QUALITY_APPROVED_REF = 'SHA_COMPLETO_APROBADO_POR_EL_REVISOR'
npm run verify:quality
```

La variable ausente, `HEAD`, nombres de ramas o un commit inexistente fallan.
El wrapper verifica contratos y ejecuta la política leída desde ese commit,
con todos sus checks dos veces. No elige una referencia automáticamente.

Para CI, publicar este proyecto en el repositorio elegido por el usuario y
configurar la variable de repositorio con el SHA aprobado. El workflow fija
tooling, versiones y acciones, instala Chromium, verifica la política, ejecuta
los comandos KDD y prueba el ejecutor de Board. Guarda artefactos incluso si
hay un fallo. No se configura una referencia ni se publica desde este proyecto.

## Adaptar a otra aplicación

1. Definir criterios y tests observables antes de implementar.
2. Modificar `e2e.config.ts`, los specs y la lista exacta `expectedCases` de
   `acceptance.json`; actualizar `inputFiles` con todos los inputs relevantes.
3. Revisar `quality.json`: proteger todos los imports de los oráculos y sus
   dependencias; autorizar rutas exactas de producción.
4. Revisar contratos y hashes normalizados LF, y obtener otra aprobación
   humana del baseline. Un hash actualizado no concede aprobación.

La aplicación incluida es una fixture local de tareas. Los tests UI derivan del
testbed de TesterArmy y conservan su atribución en NOTICE. El dominio y la UI
están separados para tener pruebas funcionales y mutaciones de producto.

## Límites

- Este perfil admite casos web independientes, sin setups, grupos seriales,
  resultados carried, skips seleccionados ni juicio LLM. Esas variantes fallan.
- La selección debe coincidir exactamente; los casos descubiertos pero
  filtrados se permiten. Los defaults de CI de e2e no cambian el perfil: se
  fuerza `--retries 0 --workers 1 --no-cache`.
- Board limita la ejecución a 30 segundos; el hijo se limita a 24 y el test
  Node a 27. Para suites largas, usar CI y revisar un perfil distinto.
- Board cubre automáticamente contrato, target y oráculo. Los hashes adicionales
  del adaptador y la política KDD cubren su cadena de inputs; Board no los
  incorpora automáticamente a su comprobación posterior de cierre.
- Un lockfile controla la instalación; no detecta toda alteración posterior
  de `node_modules` o del host. Runner, Git, Node y dependencias son parte de
  la base de confianza. No hay sandbox ni prueba de ausencia universal de bugs.
- La fixture usa datos locales. El wrapper transmite al hijo solo variables
  de runtime/navegador, sin heredar credenciales de modelos ni del vault.
  Autenticación real requiere un perfil revisado, con origen y secretos acotados.
- Las cinco mutaciones prueban la fuerza observada del oráculo de dominio.
  Anchors de código que cambien hacen el caso inconcluso y fallan; no se cuentan
  como defectos detectados. No equivalen a fuzzing ni a cobertura completa.
- La matriz de CI declara Linux y Windows. Una ejecución local de Windows no
  acredita Linux ni un run real de GitHub Actions; conservar sus evidencias.

La IA puede ayudar a explorar y proponer recorridos. Los criterios obligatorios
se deciden con assertions deterministas revisadas.
