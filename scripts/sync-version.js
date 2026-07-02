// Syncs the root `version` file into package.json / package-lock.json so a
// build always ships with the version that release.yml will tag it as.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const version = readFileSync(path.join(rootDir, 'version'), 'utf8').trim()

if (!/^\d+\.\d+\.\d+/.test(version)) {
  throw new Error(`'version' file contains an invalid version: "${version}"`)
}

function updateJsonVersion (relativePath, apply) {
  const filePath = path.join(rootDir, relativePath)
  const json = JSON.parse(readFileSync(filePath, 'utf8'))
  apply(json)
  writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n')
}

updateJsonVersion('package.json', pkg => {
  pkg.version = version
})

updateJsonVersion('package-lock.json', lock => {
  lock.version = version
  if (lock.packages?.['']) lock.packages[''].version = version
})

console.log(`Synced version ${version} from 'version' into package.json and package-lock.json`)
