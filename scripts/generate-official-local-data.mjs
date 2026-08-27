import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const updatedAt = new Date().toISOString().slice(0, 10);
const ibgeSource = "https://servicodados.ibge.gov.br/api/v1/localidades";
const aneelSource = "https://dadosabertos.aneel.gov.br/dataset/71d1007e-7e14-4875-8758-7e3a0d1118df/resource/64250fc9-4f7a-4d97-b0d4-3c090e005e1c/download/agentes-setor-eletrico.csv";

async function writeJson(path, value) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function parseSemicolonCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (character === '"') {
      if (quoted && text[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === ";" && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && text[index + 1] === "\n") index += 1;
      row.push(cell);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += character;
    }
  }
  if (cell || row.length) rows.push([...row, cell]);
  return rows;
}

const states = await fetch(`${ibgeSource}/estados?orderBy=nome`).then((response) => response.json());
const localities = await Promise.all(states.map(async (state) => {
  const cities = await fetch(`${ibgeSource}/estados/${state.sigla}/municipios?orderBy=nome`).then((response) => response.json());
  return {
    uf: state.sigla,
    name: state.nome,
    cities: cities.map(({ id, nome }) => ({ id: String(id), name: nome })),
  };
}));

const csvRows = parseSemicolonCsv(await fetch(aneelSource).then((response) => response.text()));
const [header, ...records] = csvRows;
const columns = Object.fromEntries(header.map((column, index) => [column, index]));
const distributors = records
  .map((record) => Object.fromEntries(Object.entries(columns).map(([column, index]) => [column, record[index] ?? ""])))
  .filter((record) => record.IdcAtivo === "A" && record.IdcDistribuicao === "1")
  .map((record) => ({
    cnpj: record.NumCnpj,
    name: record.NomRazaoSocial,
    displayName: record.SigPessoa ? `${record.SigPessoa} - ${record.NomRazaoSocial}` : record.NomRazaoSocial,
  }))
  .sort((first, second) => first.displayName.localeCompare(second.displayName, "pt-BR"));

await writeJson(resolve(root, "apps/solar/src/data/ibge-localities.json"), {
  source: "IBGE - API de localidades",
  sourceUrl: ibgeSource,
  updatedAt,
  states: localities,
});

await writeJson(resolve(root, "apps/consultoria/src/data/aneel-distributors.json"), {
  source: "ANEEL - Agentes do Setor Eletrico",
  sourceUrl: aneelSource,
  updatedAt,
  distributors,
});

console.log(`IBGE: ${localities.length} UFs atualizadas em ${updatedAt}.`);
console.log(`ANEEL: ${distributors.length} distribuidoras ativas atualizadas em ${updatedAt}.`);
