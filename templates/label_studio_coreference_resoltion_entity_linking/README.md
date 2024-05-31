# Label Studio OCR

This template can be used for conference resolution and entity linking.
Workers will be able to highlight words, and tag them, either trying to classify a word, or annotate certain sections belong to a certain speaker.

## Image

![Example](assets/coreference-resolution-and-entity-linking.png
)
## Parameters

| Parameter | Description | Default |
| --------- | ----------- | ------- |
| `annotations` | Annotations to load | `[]` |
| `id` | ID of the element to attach the Label Studio application to | `1` |
| `text` |  Text to annotate | `https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/US_1.svg/1200px-US_1.svg.png` |

## HTML

The HTML template is located at [index.html](./index.html)

## JSON Schema

The JSON schema is located at [schema.json](./schema.json)

### Example

An example JSON schema is located at [example.json](./example.json)

## Sources

- <https://labelstud.io/templates/coreference_entity_linking>
