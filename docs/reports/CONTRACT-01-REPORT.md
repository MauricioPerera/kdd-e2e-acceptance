# CONTRACT-01 — KDD e2e acceptance — REPORT

Fecha: 2026-10-05.
Spec: `specs/CONTRACT-01-acceptance.md`.
CI: https://github.com/MauricioPerera/kdd-e2e-acceptance/actions/runs/37367733608

La implementación y el workflow del commit
`882d32039e754d63329265e5822fa042d72d9a7f` fueron aprobados explícitamente
por el usuario. El intento 2 del run citado terminó con `success` en Ubuntu 24.04 y Windows antes
de preparar este cierre. El workflow de este commit posterior autentica el
run previo mediante la API de GitHub y comprueba que solo cambiaron archivos
permitidos para el cierre.

## Resultado por criterio

| ID | Estado | Evidencia |
| --- | --- | --- |
| AC-1 | verified_in_ci | npm run validate:kdd: 3 contratos y comandos PASS; https://github.com/MauricioPerera/kdd-e2e-acceptance/actions/runs/37367733608 |
| AC-2 | verified_in_ci | Check functional: 12 PASS por ejecución; https://github.com/MauricioPerera/kdd-e2e-acceptance/actions/runs/37367733608 |
| AC-3 | verified_in_ci | Check adversarial: 37 PASS y 5 mutaciones detectadas; https://github.com/MauricioPerera/kdd-e2e-acceptance/actions/runs/37367733608 |
| AC-4 | verified_in_ci | Check ui: 7 casos deterministas PASS por run; https://github.com/MauricioPerera/kdd-e2e-acceptance/actions/runs/37367733608 |
| AC-5 | verified_in_ci | npm run probe:board: oráculo verificado y hashes vigentes; https://github.com/MauricioPerera/kdd-e2e-acceptance/actions/runs/37367733608 |
| CI-1 | verified_in_ci | https://github.com/MauricioPerera/kdd-e2e-acceptance/actions/runs/37367733608 |

## Ejecución citada

La aprobación humana de esta referencia fue «Sí, la apruebo», al revisar el
workflow que solicita Ubuntu 24.04. La variable externa de GitHub
`KDD_QUALITY_APPROVED_REF` conserva el SHA aprobado. El primer intento del
run fue cancelado sin runners; el segundo ejecutó los pasos y terminó
correctamente en ambas plataformas el 2026-10-06 UTC. Este cierre cita el
segundo intento y sus artefactos, no los intentos cancelados.

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
- `CONTRACT-01-EVIDENCE.json` conserva los IDs y digests declarados por GitHub,
  los doce hashes de reporte comprobados y el intento de CI.

## Artefactos comprobados

| Plataforma | Artefacto de GitHub | Runs de aceptación | Casos por run |
| --- | --- | --- | --- |
| windows-latest | 11386585105 | 6 | 7 |
| ubuntu-24.04 | 11386171274 | 6 | 7 |

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
