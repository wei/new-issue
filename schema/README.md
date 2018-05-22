# New Issue Schema

## Basics

[View JSON Schema v1.0](1.0.json).

```javascript
{
  "version": "1.0",
  "theme": "default",
  "input": [
    "favicon": "https://assets-cdn.github.com/favicon.ico",
    "pageTitle": "New Issue",
    "heading": "",        // Heading Text, Default is :owner/:repo
    "customHeader": "",   // Custom Heading HTML, overwrites heading
    "customFooter": "",   // Custom Footer HTML
    "customJS": "",       // Do not include <script> tag
    "customCSS": "",      // Do not include <style> tag
    "title": [
                          // Array of Input (see below)
    ],
    "body": [
                          // Array of Input (see below)
    ]
  ],
  "output": {
    "hideEmpty": false,   // Hide label if response is empty
    "before.md": "",      // Markdown text to be prepended to issue body
    "after.md": ""        // Markdown text to be appended to issue body
  }
}
```

### Input Types

#### Types `text, number, password, email, month, date, datetime-local, hidden`

```javascript
{
  "type": ":type",       // Required, Any type from above
  "label": "",           // Text that shows before input field
  "outputLabel.md": "",  // Markdown text that is used for assembling output, Default: "**:label**:\n"
  "name": "",            // Name attribute
  "id": "",              // Id attribute
  "class": "",           // Class attribute
  "title": "",           // Title attribute for tooltip
  "required": false,     // Required attribute
  "disabled": false,     // Disabled attribute
  "pattern": "",         // pattern attribute
  "maxlength": 10000,    // maxlength attribute
  "value": "",           // Value attribute
  "placeholder": ""      // Placeholder attribute
}
```

#### Type `textarea`

```javascript
{
  "type": "textarea",    // Required.
  "label": "",           // Text that shows before input field
  "outputLabel.md": "",  // Markdown text that is used for assembling output, Default: "**:label**:\n"
  "name": "",            // Name attribute
  "id": "",              // Id attribute
  "class": "",           // Class attribute
  "title": "",           // Title attribute for tooltip
  "required": false,     // Required attribute
  "disabled": false,     // Disabled attribute
  "rows": 4,             // rows attribute
  "maxlength": 10000,    // maxlength attribute
  "value": "",           // Value attribute
  "placeholder": ""      // Placeholder attribute
}
```

#### Type `select`

```javascript
{
  "type": "select",      // Required.
  "label": "",           // Text that shows before input field
  "outputLabel.md": "",  // Markdown text that is used for assembling output, Default: "**:label**:\n"
  "name": "",            // Name attribute
  "id": "",              // Id attribute
  "class": "",           // Class attribute
  "title": "",           // Title attribute for tooltip
  "required": false,     // Required attribute
  "disabled": false,     // Disabled attribute
  "value": "",           // Preselect value
  "placeholder": "",     // Placeholder text at initialization of select
  "options": [           // Array of unique string options
    "bug",
    "feature"
  ]
}
```

#### Type `submit`

```javascript
{
  "type": "submit",      // Required.
  "label": "",           // Text that shows before input field
  "outputLabel.md": "",  // Markdown text that is used for assembling output, Default: "**:label**:\n"
  "name": "",            // Name attribute
  "id": "",              // Id attribute
  "class": "",           // Class attribute
  "title": "",           // Title attribute for tooltip
  "disabled": false,     // Disabled attribute
  "submit": "Submit"     // Submit button text
}
```

#### Type `html`

```javascript
{
  "type": "html",        // Required.
  "label": "",           // Text that shows before input field
  "outputLabel.md": "",  // Markdown text that is used for assembling output, Default: "**:label**:\n"
  "name": "",            // Name attribute
  "id": "",              // Id attribute
  "class": "",           // Class attribute
  "title": "",           // Title attribute for tooltip
  "html": ""             // Raw HTML code
}
```

During issue submission, `value` attribute of `Input`s inside `title` will be concatenated into one long text. `value` attribute of `Input`s inside `body` will be concatenated with `"\n\n"`.


## Validation

Copy [1.0.json](1.0.json) to https://www.jsonschemavalidator.net to perform validation. Other JSON Schema validators should also work.


## Examples

### Minimal Example

```javascript
{
  "version": "1.0",
  "input": {
    "title": [
      { "type": "hidden", "value": "[BUG] " },
      { "type": "text", "label": "Title" }
    ],
    "body": [
      { "type": "textarea", "label": "Description" }
    ]
  }
}
```

More examples coming.
