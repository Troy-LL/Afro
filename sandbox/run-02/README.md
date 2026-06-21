# Email row validator (run-02)

Small CLI that reads a JSON file of row objects, validates each `email` field at the trust boundary, and prints invalid rows.

## Requirements

- Node.js 20+

## Setup

```bash
cd sandbox/run-02
npm install
npm run build
```

## Usage

```bash
npm start -- sample-data.json
```

Or after build:

```bash
node dist/cli.js path/to/rows.json
```

### Input format

The JSON file must be a **top-level array** of plain objects. Each object should include an `email` string field.

```json
[
  { "id": 1, "email": "user@example.com" },
  { "id": 2, "email": "bad-address" }
]
```

### Output

- Exit code `0` when every row has a valid email.
- Exit code `1` when any row is invalid or the file cannot be read/parsed.

Invalid rows are printed as JSON lines:

```json
{"index":2,"reason":"email must contain a single @ separating local and domain","row":{"id":3,"name":"Carol","email":"not-valid"}}
```

### Trust-boundary checks

- File size capped at 5 MB.
- JSON must parse and root must be an array of plain objects.
- `email` must be a string with no control characters or surrounding whitespace.
- Length limits (254 total, 64 local, 253 domain).
- Exactly one `@`, valid local-part characters, and a domain with at least one dot and a 2+ letter TLD.

## Tests

```bash
npm test
```

## Example

```bash
npm start -- sample-data.json
```

Expected: three invalid rows (indices 2, 3, and 4).
