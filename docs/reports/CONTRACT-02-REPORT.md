# CONTRACT-02 — Acceptance hardening — REPORT

Fecha: 2026-10-07.
Spec: `specs/CONTRACT-02-acceptance-hardening.md`.
CI: https://github.com/MauricioPerera/kdd-e2e-acceptance/actions/runs/37672478622

El commit `95be705c94b143854bdfae6ba3ab9622e86a0dbc` recibió aprobación explícita del usuario
mediante «Adelante» en respuesta a la solicitud que identificaba ese SHA completo.
La variable externa `KDD_QUALITY_APPROVED_REF` se configuró con esa referencia.
El intento 1 del run citado terminó con `success` en Ubuntu 24.04 y Windows
antes de preparar este cierre documental. El workflow del commit posterior
autentica el run previo mediante la API de GitHub y verifica que el diff posterior
solo contiene rutas autorizadas para el cierre.

## Resultado por criterio

| ID | Estado | Evidencia |
| --- | --- | --- |
| AC-1 | verified_in_ci | Check adversarial: resultados no seleccionados y skips ajenos al filtro rechazados; 49 PASS y 5 mutaciones detectadas; https://github.com/MauricioPerera/kdd-e2e-acceptance/actions/runs/37672478622 |
| AC-2 | verified_in_ci | Check adversarial: eventos de modelo y tokens positivos rechazados aunque el resumen declare cero; https://github.com/MauricioPerera/kdd-e2e-acceptance/actions/runs/37672478622 |
| AC-3 | verified_in_ci | Check functional: 13 PASS; tres URLs malformadas responden 400 y cada petición válida posterior responde 200; https://github.com/MauricioPerera/kdd-e2e-acceptance/actions/runs/37672478622 |
| AC-4 | verified_in_ci | Doce reportes auditados, seis por plataforma, con siete casos deterministas de Chromium PASS por ejecución; https://github.com/MauricioPerera/kdd-e2e-acceptance/actions/runs/37672478622 |
| AC-5 | verified_in_ci | npm run validate:kdd: 3 contratos y comandos PASS; npm run probe:board: oráculo y hashes verificados; https://github.com/MauricioPerera/kdd-e2e-acceptance/actions/runs/37672478622 |
| CI-1 | verified_in_ci | https://github.com/MauricioPerera/kdd-e2e-acceptance/actions/runs/37672478622 |

## Cambios y comprobaciones

- Los resultados no seleccionados solo se admiten como skips por filtro,
  sin intentos ni ejecución serial. Los eventos de modelo, sus contadores y los
  tokens positivos se rechazan aunque los totales del reporte indiquen cero.
- La fixture devuelve HTTP 400 para URLs malformadas y sigue disponible.
  La regresión comprueba tres URLs inválidas y una respuesta 200 después de cada una.
- Los checks funcionales pasan 13 tests y los adversariales pasan 49, incluidos
  cinco mutantes de producto. El contrato de reportes también ejecuta sus adversariales.
- El gate canónico verificó integridad, perímetro y todos los checks dos veces
  por plataforma. El entry point `npm run verify:quality` repitió el gate completo
  dos veces más. Los logs de ambas plataformas confirman los conteos anteriores.
- Cada plataforma conservó seis ejecuciones de aceptación: cuatro de los gates,
  una del comando del contrato y una de Board, con siete casos UI por ejecución.
  Board registra un test Node externo y verifica su oráculo y hashes vigentes.
- Los dos artefactos fueron descargados e inspeccionados. Los doce reportes
  pasan el validador de la revisión aprobada y coinciden con sus hashes,
  tiempos, contrato, SHA y metadatos del run real. Los 16 inputs de cada reporte
  coinciden con los blobs Git del commit citado. Los hashes de Board corresponden
  al contrato, target y oráculo de esa misma revisión.
- `CONTRACT-02-EVIDENCE.json` conserva los IDs y digests declarados por la API
  autenticada de GitHub, además de los doce hashes de reporte comprobados.

## Artefactos comprobados

| Plataforma | Artefacto de GitHub | Runs de aceptación | Casos por run |
| --- | --- | --- | --- |
| ubuntu-24.04 | 11505443964 | 6 | 7 |
| windows-latest | 11504874032 | 6 | 7 |

## Alcance del cierre

Después del run citado solo se modifican este reporte, su manifiesto y el spec.
La política aprobada autoriza esas tres rutas exactas. Los controles, código y
oráculos permanecen en la revisión que ejecutó el CI citado.

El perfil cubre siete casos web deterministas y presupone runners y dependencias
de confianza. Los digests de los archivos ZIP se conservan tal como los declara
GitHub; los hashes de los reportes descargados y sus inputs se recalcularon
independientemente. Los artefactos de Actions están sujetos a retención.
CONTRACT-01 conserva su evidencia histórica sin modificarla.
