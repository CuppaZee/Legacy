# Munzee Database

When making a change to the Munzee Database, please run `node index.js` before committing. This will compile the database JSON files and copy them to the PaperZee and FlameZee projects.

Documentation on the Database will be coming in the future.

## Points Examples

The `points` variable can be either a Points object (see below) or a String (eg. `"card_limited"` or `"myth"`) which related to a specific Points value in `points.json`

When contributing to the Points values, please do not put points information for the following types:
- Bouncers
- Bouncer Hosts
- Greetings Cards
- Anything with Points Structure Types which are not listed below (eg. Destinations)

Static Points
```json
{
  "capture": 30,
  "deploy": 10,
  "capon": 20
}
```

Split Points (15 - 45 Points Split)
```json
{
  "deploy": 10,
  "type": "split",
  "split": 60,
  "min": 15
}
```

Mystery Split Points (15 - 45 Points Split, only values divisible by 5)
```json
{
  "deploy": 10,
  "type": "split",
  "split": 60,
  "min": 15,
  "interval": 5
}
```