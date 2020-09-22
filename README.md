# VSCode JSON-LD Language Server

Right now this is a Proof of Concept, with very few features implemented. A lot of the internal design hasn't been thought through yet.

We only have Hover on context working, with some prep work for Hover on keyword done

## Architecture digression

You may want to skip this for now and look at what the goals of the project are and what the extension **will be**.

We'll need to do significant caching of remote ontologies, and probably persist those across documentClose and Open b/c a lot of files will reference many of the same ones. We'll need a component to parse non-JSON-LD ontologies into triples or JSON-LD. We'll need a system to understand partial IRIs, fetch the schema it refers to, and be able to complete the rest of it. This will likely be easier with schemas that are prefixed, as they'll already be loaded.

We also for now have a very basic functionality to determine which part of the document we're in. It's just: does this line contain @context.
We may need to pull in things from the `vscode-json-languageservice` package or other JSON parsers to know where we are in the file to make intelligent completion decisions. This will probably be the most complex part.

For Hover functionality, we want it to work in the middle of a completion, even when the file is not well-formed. However we might be able to get by by 1. using the old version of the file that is properly formed, if the requested hover is in that area or 2. doing some sort of modifications to remove the minimal subset of the file that is malformed (this is a whole complex area of CS, but lots of LSP-type things do it). For now, option 1 is probably best, but before that we just need hover to work on well formed files, which is probably the easiest bit. We do paragraph 1, then 3, and boom

## Table of Contents

- [VSCode JSON-LD Language Server](#vscode-json-ld-language-server)
  - [Architecture digression](#architecture-digression)
  - [Table of Contents](#table-of-contents)
  - [Intro](#intro)
  - [Completions](#completions)
    - [A new property on an object](#a-new-property-on-an-object)
    - [A new property on an object using a prefix](#a-new-property-on-an-object-using-a-prefix)
    - [Multiple properties](#multiple-properties)
    - [New nested object](#new-nested-object)
  - [Hover](#hover)
    - [JSON-LD Keywords](#json-ld-keywords)
    - [`@context`](#context)
    - [Property](#property)
    - [Value](#value)
  - [Advanced Features](#advanced-features)
    - [Advanced Data Type Validation](#advanced-data-type-validation)
    - [Intelligent schema discovery](#intelligent-schema-discovery)
    - [Possibly: Go to Remote Resource](#possibly-go-to-remote-resource)

## Intro

In the following examples, the `(COMPLETE)` symbol indicates a user either hit `CTRL+SPACE` to bring up to completion options or they were already available, and then the user selected an item (in these examples, likely the first) from the provided options.

`(CURSOR)` indicates where the cursor ends up after completion. `(CURSOR_N)` indicates multiple cursors to be completed (if this is possible, I know it is with snippets)

## Completions

### A new property on an object

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Miami Heat at Philadelphia 76ers - Game 3 (Home Game 1)",
  "startD(COMPLETE)"
```

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Miami Heat at Philadelphia 76ers - Game 3 (Home Game 1)",
  "startDate": "",
```

### A new property on an object using a prefix

```json
{
  "@context": [{
	  "dc": "..."
  }, "https://schema.org"],
  "@type": "Event",
  "name": "Miami Heat at Philadelphia 76ers - Game 3 (Home Game 1)",
  "dc:"
```

Should show all properties in the DCMI ontology. Properties that support the object of type Event in Domain should be higher ranked

### Multiple properties

In this use-case, want to automatically create a bunch of commonly-used properties solely from a provided Class.

Some ontologies distinguish between possible properties (e.g. domainIncludes in schema.org) and supported or recommended properties (e.g. hydra:supportedProperty). Ontologies that don't by default like Schema.org will end up having many possible properties (e.g. Event has 30-40 properties) However b/c of VSCode's great text search/filtering, as the use gets more specific these will go down. The point here is we likely don't want to create a JSON object with all those properties as a user is only going to use a few.

One idea would be do smth like Kite and figure out the popularity among users of the extension. Another would be if we had access to a large graph of realistic representative data of the Web of Data to look at which properties are the most popular (this is hard though)

```
{
	schema:Event(CTRL+SPACE)
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Miami Heat at Philadelphia 76ers - Game 3 (Home Game 1)",
  "location": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Philadelphia",
      "addressRegion": "PA"
    },
    "url": "wells-fargo-center.html"
  },
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "$35",
    "offerCount": "1938"
  },
  "startDate": "2016-04-21T20:00",
  "url": "nba-miami-philidelphia-game3.html"
}
```

### New nested object

```json
{
  "@context": [{
	  "dc": "..."
  }, "https://schema.org"],
  "@type": "Event",
  "name": "Miami Heat at Philadelphia 76ers - Game 3 (Home Game 1)",
  "dc:author" schema:Person(COMPLETE)
```

```json
{
  "@context": [{
	  "dc": "..."
  }, "https://schema.org"],
  "@type": "Event",
  "name": "Miami Heat at Philadelphia 76ers - Game 3 (Home Game 1)",
  "dc:author": {
	  "@type": "Person",
	  "(CURSOR)"
  }
```

And with multiple properties enabled:

```json
{
  "@context": [{
	  "dc": "..."
  }, "https://schema.org"],
  "@type": "Event",
  "name": "Miami Heat at Philadelphia 76ers - Game 3 (Home Game 1)",
  "dc:author": {
	  "@type": "Person",
	  "name": "",
	  "age": ,
  }
```

## Hover

### JSON-LD Keywords

We provide a short explanation extracted from the JSON-LD spec, which includes links to more information

### `@context`

In addition to the explanation, we provide a rendered version of a full merged context, including any remote ones

### Property

We provide extra details about the property itself, including `rdf:label` and `comment`.

We also list it's Domain and Range

Maybe include some examples?

### Value

Node: If it is an IRI, then we provide the full link to it, as well as `rdf:label` and `comment`, if available

Literal: We list any inferred datatypes based on the property that it is used in.

## Advanced Features

### Advanced Data Type Validation

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Miami Heat at Philadelphia 76ers - Game 3 (Home Game 1)",
  "startDate": "hey",
```

The language server would provide a diagnostic that indicates that the literal value in the startDate field is not in an `xsd:DateTime` format

### Intelligent schema discovery

```json
{
  "@context": [{
	  "dc": "..."
  }, "https://schema.org"],
  "@type": "Event",
  "name": "Miami Heat at Philadelphia 76ers - Game 3 (Home Game 1)",
  "dc:author":
```

Search various ontology search engines to find

1. classes that have the text "author" in their name or properties
2. classes that are commonly linked to by the `dc:author` property

This may be a more expensive operation to work on.

Additionally, one should generally be cautious of including new ontologies and do more research than one autocomplete. Thus, maybe it's better as a side panel in the extension pane.

### Possibly: Go to Remote Resource

We may allow a user to use Goto Definition to fetch remote resources, whether in JSON-LD or other formats. For other formats we likely need to parse the resulting file in order to find the proper Position where a given Class or Property is defined. This would significantly increase scope of extension.

For IRIs with prefixes, Goto Definition should work. For regular links, however, there is a default VSCode link handler that we would have to override, if possible
