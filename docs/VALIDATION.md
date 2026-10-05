# Validación de la entrega

Fecha: 2026-10-05. Estado: entrega de bootstrap preparada para revisión humana.
No hay baseline aprobado ni ejecución remota de GitHub Actions acreditada.

## Resultados observados

| Comprobación | Windows | Ubuntu / WSL |
| --- | --- | --- |
| Instalación desde un clon Git limpio con npm ci | PASS | PASS |
| Tooling KDD fijado, checkout limpio | PASS | PASS |
| Tests funcionales | 12 PASS | 12 PASS |
| Tests adversariales | 37 PASS | 37 PASS |
| Mutaciones de producto incluidas en adversariales | 5 detectadas | 5 detectadas |
| Contratos, OKF y spec | 3 contratos, 5 nodos, 1 spec válidos | mismos resultados |
| test_command de los contratos | 3 PASS | 3 PASS |
| Chromium real | 7 casos PASS, cero skips/flaky/retries | mismos resultados |
| Ejecutor canónico de KDD Board | oráculo verificado, hashes vigentes | mismos resultados |

Board cuenta un test externo de Node. Los siete casos internos están en el
reporte e2e, asociado al contrato y commit. Los dos conteos se mantienen separados.
Las 32 comprobaciones del reporte rechazan alteraciones y configuraciones
inválidas; las cinco mutaciones restantes comprueban defectos del producto.

El código de estas reproducciones corresponde al commit
`3fff4bc7ac555948d6006bd67d729e16f99fe57b`. Los cambios posteriores de entrega
documentan los resultados y conectan el verificador de cierre remoto al workflow.
El primer commit, `168d0ea`, contiene oráculos y stubs anteriores a implementar.
Esta historia conserva orden de trabajo, no aprobación humana.

## Tooling y condiciones

- Node 24.16.0 en ambas plataformas. Windows: Python 3.14.6; Ubuntu: Python 3.14.4.
- e2e 0.17.0 y @e2e-dev/web 0.12.0 desde paquetes npm con integridad en lockfile.
- KDD `224f722ba263e36f6aa4180a52b83fe41bc8d78e` descargado independientemente.
- Ubuntu carecía de libnspr4, libnss3 y libasound2t64. El primer intento de UI
  falló por entorno; no se contó como detección de un defecto del producto.
- Para la reproducción se descargaron y extrajeron esas bibliotecas en un
  runtime privado y se lanzó Chromium con ese loader. No se instalaron paquetes
  del sistema. El CI y la guía de instalación usan `install --with-deps`.
- El archivo de Node Linux se comprobó contra SHASUMS256.txt del distribuidor.
  SHA-256: `d804845d34eddc21dc1092b519d643ef40b1f58ec5dec5c22b1f4bd8fabde6c9`.

## Controles de aprobación y cierre

La ausencia de KDD_QUALITY_APPROVED_REF rechaza el punto de entrada de calidad.
Sus tests también rechazan referencias simbólicas y commits inexistentes. No se
asignó una variable con el SHA de la implementación como supuesta aprobación.

La política fue validada con el parser canónico de KDD y todas sus rutas
protegidas existen. Se comprobó la sintaxis del workflow y la revisión fija de
upload-artifact. Los 12 tests upstream de verify_quality.py pasaron en Windows;
esto verifica el motor externo, no concede aprobación a este proyecto.

El verificador de cierres se ejecutó sobre el proyecto abierto: verified=0,
FAIL=0. Ese resultado no certifica un run remoto. Cuando se agregue un manifiesto,
el workflow consultará GitHub para comprobar el run previo, SHA y workflow,
además del perímetro entre la implementación validada y el commit de cierre.

Los checks de la política aún deben ejecutarse dos veces mediante el gate de
calidad con una referencia aprobada explícitamente. El spec sigue abierto hasta
que haya evidencia auténtica de CI. Ver [procedimiento](REVIEW.md).

Los resultados completos del laboratorio y los reportes originales se conservan
en la carpeta analisis-kdd-e2e del workspace y en .e2e del proyecto. Son evidencia
local; el workflow preservará los nuevos artefactos de cada run publicado.
