# CONTRACT-01 — KDD e2e acceptance — REPORT

Fecha: 2026-10-05.
Spec: `specs/CONTRACT-01-acceptance.md`.
CI: https://github.com/MauricioPerera/kdd-e2e-acceptance/actions/runs/37362768504

La implementación y el workflow del commit
`fa5d25f1342c813c40d5d0bbdf6bae8a4a825c2e` fueron aprobados explícitamente
por el usuario. El run citado terminó con `success` en Linux y Windows antes
de preparar este cierre. El workflow de este commit posterior autentica el
run previo mediante la API de GitHub y comprueba que solo cambiaron archivos
permitidos para el cierre.

## Resultado por criterio

| ID | Estado | Evidencia |
| --- | --- | --- |
| AC-1 | verified_in_ci | npm run validate:kdd: 3 contratos y comandos PASS; https://github.com/MauricioPerera/kdd-e2e-acceptance/actions/runs/37362768504 |
| AC-2 | verified_in_ci | Check functional: 12 PASS por ejecución; https://github.com/MauricioPerera/kdd-e2e-acceptance/actions/runs/37362768504 |
| AC-3 | verified_in_ci | Check adversarial: 37 PASS y 5 mutaciones detectadas; https://github.com/MauricioPerera/kdd-e2e-acceptance/actions/runs/37362768504 |
| AC-4 | verified_in_ci | Check ui: 7 casos deterministas PASS por run; https://github.com/MauricioPerera/kdd-e2e-acceptance/actions/runs/37362768504 |
| AC-5 | verified_in_ci | npm run probe:board: oráculo verificado y hashes vigentes; https://github.com/MauricioPerera/kdd-e2e-acceptance/actions/runs/37362768504 |
| CI-1 | verified_in_ci | https://github.com/MauricioPerera/kdd-e2e-acceptance/actions/runs/37362768504 |

## Entrega y verificación

- Proyecto independiente: https://github.com/MauricioPerera/kdd-e2e-acceptance.
- Oráculo Node sellado compatible con el ejecutor canónico de KDD Board.
- Reportes nuevos, selección exacta de siete casos, commit y resultados
  comprobados con assertions deterministas; el perfil rechaza uso de modelos.
- Política, oráculos, helpers, configuración y dependencias comparados con la
  referencia aprobada. El archivo de política también se protege directamente
  en el verificador canónico, además de sus 39 rutas declaradas.
- El gate canónico ejecutó sus checks dos veces por plataforma. El paso
  `npm run verify:quality` ejecutó nuevamente el gate completo dos veces.
- Los checks functional y adversarial ejecutan los mismos comandos Node
  declarados por los correspondientes scripts npm del proyecto: 12 y 37 tests
  por ejecución. Los adversariales incluyen cinco mutaciones de producto.
- Cada plataforma conservó seis ejecuciones de aceptación, con siete casos
  internos cada una: cuatro de los gates, una del comando KDD y una de Board.
  Board cuenta un test externo Node; ese número no sustituye los siete casos UI.
- Los dos artefactos descargados se inspeccionaron: doce reportes coherentes
  con sus hashes, tiempos, contrato, SHA y metadatos del run real. Sus inputs
  coinciden exactamente con los blobs del commit citado y los hashes de Board
  corresponden al contrato, target y oráculo sellado de esa revisión.
- `CONTRACT-01-EVIDENCE.json` conserva los IDs y digests de los artefactos.

## Alcance y límites

La aplicación de tareas es una fixture local y el perfil cubre siete casos web
independientes. Los tests no utilizan modelos ni credenciales. Las bibliotecas
instaladas, el host y el runner forman parte de la base de confianza; no hay
sandbox ni prueba de ausencia universal de defectos.

GitHub rechazó tanto rulesets como protección de rama para este repositorio
privado con el plan actual, indicando que requieren GitHub Pro o visibilidad
pública. Esas protecciones remotas no están activadas. La política verificada
detecta cambios de controles durante su ejecución, pero su aplicación obligatoria
frente a futuros pushes requiere gobernanza externa. El repositorio conserva
su visibilidad privada.

`docs/VALIDATION.md` conserva el registro de bootstrap anterior a la aprobación
humana y al CI remoto. Este reporte y su manifiesto registran el estado posterior
con evidencia auténtica. Los artefactos de Actions están sujetos a su retención.
