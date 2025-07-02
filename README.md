# Sp Kodeverk

## Beskrivelse
Frontend for å redigere kodeverk brukt i spillerom

## Kjør lokalt
`npm run dev`

## Kjøre mot gcp buckets lokalt

Kjør `gcloud auth application-default login` for å skape en service account som kan brukes til å koble opp mot gcp lokalt.
Lag en `.env` fil i rotmappen med følgende innhold:

```
GOOGLE_APPLICATION_CREDENTIALS=<path til service account json>
GOOGLE_CLOUD_PROJECT=<project id>
```

F.eks.:

```
GOOGLE_APPLICATION_CREDENTIALS=/Users/havard/.config/gcloud/application_default_credentials.json
GOOGLE_CLOUD_PROJECT=flex-dev
```

Prosjekt id må være et sted din bruker har bigquery tilgang. F.eks. ditt dev prosjekt.


### Tilgang til Github Package Registry

Siden vi bruker avhengigheter som ligger i GPR, så må man sette opp tilgang til GPR med en PAT (personal access token) som har `read:packages`. Du kan [opprette PAT her](https://github.com/settings/tokens). Dersom du har en PAT som du bruker for tilgang til maven-packages i github kan du gjenbruke denne.

I din `.bashrc` eller `.zshrc`, sett følgende miljøvariabel:

`export NPM_AUTH_TOKEN=<din PAT med read:packages>`

## Henvendelser
Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub.

### For NAV-ansatte
Interne henvendelser kan sendes via Slack i kanalen [#team-bømlo-værsågod](https://nav-it.slack.com/archives/C019637N90X).

## Kode generert av GitHub Copilot

Dette repoet bruker GitHub Copilot til å generere kode.