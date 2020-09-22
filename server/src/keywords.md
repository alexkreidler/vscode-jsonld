`@base`

Used to set the [base IRI](https://www.w3.org/TR/rdf11-concepts/#dfn-base-iri) against which to resolve those [relative IRI references](https://tools.ietf.org/html/rfc3987#section-6.5) which are otherwise interpreted relative to the document. This keyword is described in [§ 4.1.3 Base IRI](https://www.w3.org/TR/json-ld11/#base-iri).

`@container`

Used to set the default container type for a [term](https://www.w3.org/TR/json-ld11/#dfn-term). This keyword is described in the following sections:

- [§ 4.3 Value Ordering](https://www.w3.org/TR/json-ld11/#sets-and-lists),
- [§ 4.6.1 Data Indexing](https://www.w3.org/TR/json-ld11/#data-indexing),
- [§ 4.6.2 Language Indexing](https://www.w3.org/TR/json-ld11/#language-indexing),
- [§ 4.6.3 Node Identifier Indexing](https://www.w3.org/TR/json-ld11/#node-identifier-indexing),
- [§ 4.6.4 Node Type Indexing](https://www.w3.org/TR/json-ld11/#node-type-indexing)
- [§ 4.9 Named Graphs](https://www.w3.org/TR/json-ld11/#named-graphs),
- [§ 4.9.3 Named Graph Indexing](https://www.w3.org/TR/json-ld11/#named-graph-indexing), and
- [§ 4.9.2 Named Graph Data Indexing](https://www.w3.org/TR/json-ld11/#named-graph-data-indexing)

`@context`

Used to define the short-hand names that are used throughout a JSON-LD document. These short-hand names are called [terms](https://www.w3.org/TR/json-ld11/#dfn-term) and help developers to express specific identifiers in a compact manner. The `@context` keyword is described in detail in [§ 3.1 The Context](https://www.w3.org/TR/json-ld11/#the-context).

`@direction`

Used to set the [base direction](https://www.w3.org/TR/json-ld11/#dfn-base-direction) of a [JSON-LD value](https://www.w3.org/TR/json-ld11/#dfn-json-ld-value), which are not [typed values](https://www.w3.org/TR/json-ld11/#dfn-typed-value) (e.g. [strings](https://infra.spec.whatwg.org/#javascript-string), or [language-tagged strings](https://www.w3.org/TR/rdf11-concepts/#dfn-language-tagged-string)). This keyword is described in [§ 4.2.4 String Internationalization](https://www.w3.org/TR/json-ld11/#string-internationalization).

`@graph`

Used to express a [graph](https://www.w3.org/TR/rdf11-concepts/#dfn-rdf-graph). This keyword is described in [§ 4.9 Named Graphs](https://www.w3.org/TR/json-ld11/#named-graphs).

`@id`

Used to uniquely identify [node objects](https://www.w3.org/TR/json-ld11/#dfn-node-object) that are being described in the document with [IRIs](https://tools.ietf.org/html/rfc3987#section-2) or [blank node identifiers](https://www.w3.org/TR/rdf11-concepts/#dfn-blank-node-identifier). This keyword is described in [§ 3.3 Node Identifiers](https://www.w3.org/TR/json-ld11/#node-identifiers). A [node reference](https://www.w3.org/TR/json-ld11/#dfn-node-reference) is a [node object](https://www.w3.org/TR/json-ld11/#dfn-node-object) containing only the `@id` property, which may represent a reference to a [node object](https://www.w3.org/TR/json-ld11/#dfn-node-object) found elsewhere in the document.

`@import`

Used in a [context definition](https://www.w3.org/TR/json-ld11/#dfn-context-definition) to load an external context within which the containing [context definition](https://www.w3.org/TR/json-ld11/#dfn-context-definition) is merged. This can be useful to add JSON-LD 1.1 features to JSON-LD 1.0 contexts.

`@included`

Used in a top-level [node object](https://www.w3.org/TR/json-ld11/#dfn-node-object) to define an [included block](https://www.w3.org/TR/json-ld11/#dfn-included-block), for including secondary [node objects](https://www.w3.org/TR/json-ld11/#dfn-node-object) within another [node object](https://www.w3.org/TR/json-ld11/#dfn-node-object).

`@index`

Used to specify that a container is used to index information and that processing should continue deeper into a JSON data structure. This keyword is described in [§ 4.6.1 Data Indexing](https://www.w3.org/TR/json-ld11/#data-indexing).

`@json`

Used as the `@type` value of a [JSON literal](https://www.w3.org/TR/json-ld11/#dfn-json-literal). This keyword is described in [§ 4.2.2 JSON Literals](https://www.w3.org/TR/json-ld11/#json-literals).

`@language`

Used to specify the language for a particular string value or the default language of a JSON-LD document. This keyword is described in [§ 4.2.4 String Internationalization](https://www.w3.org/TR/json-ld11/#string-internationalization).

`@list`

Used to express an ordered set of data. This keyword is described in [§ 4.3.1 Lists](https://www.w3.org/TR/json-ld11/#lists).

`@nest`

Used to define a [property](https://www.w3.org/TR/rdf11-concepts/#dfn-property) of a [node object](https://www.w3.org/TR/json-ld11/#dfn-node-object) that groups together properties of that node, but is not an edge in the graph.

`@none`

Used as an index value in an [index map](https://www.w3.org/TR/json-ld11/#dfn-index-map), [id map](https://www.w3.org/TR/json-ld11/#dfn-id-map), [language map](https://www.w3.org/TR/json-ld11/#dfn-language-map), [type map](https://www.w3.org/TR/json-ld11/#dfn-type-map), or elsewhere where a [map](https://infra.spec.whatwg.org/#ordered-map) is used to index into other values, when the indexed node does not have the feature being indexed.

`@prefix`

With the value `true`, allows this [term](https://www.w3.org/TR/json-ld11/#dfn-term) to be used to construct a [compact IRI](https://www.w3.org/TR/json-ld11/#dfn-compact-iri) when compacting. With the value `false` prevents the term from being used to construct a [compact IRI](https://www.w3.org/TR/json-ld11/#dfn-compact-iri). Also determines if the term will be considered when expanding [compact IRIs](https://www.w3.org/TR/json-ld11/#dfn-compact-iri).

`@propagate`

Used in a [context definition](https://www.w3.org/TR/json-ld11/#dfn-context-definition) to change the scope of that context. By default, it is `true`, meaning that contexts propagate across [node objects](https://www.w3.org/TR/json-ld11/#dfn-node-object) (other than for [type-scoped contexts](https://www.w3.org/TR/json-ld11/#dfn-type-scoped-context), which default to `false`). Setting this to `false` causes term definitions created within that context to be removed when entering a new [node object](https://www.w3.org/TR/json-ld11/#dfn-node-object).

`@protected`

Used to prevent [term definitions](https://www.w3.org/TR/json-ld11/#dfn-term-definition) of a context to be overridden by other contexts. This keyword is described in [§ 4.1.11 Protected Term Definitions](https://www.w3.org/TR/json-ld11/#protected-term-definitions).

`@reverse`

Used to express reverse properties. This keyword is described in [§ 4.8 Reverse Properties](https://www.w3.org/TR/json-ld11/#reverse-properties).

`@set`

Used to express an unordered set of data and to ensure that values are always represented as arrays. This keyword is described in [§ 4.3.2 Sets](https://www.w3.org/TR/json-ld11/#sets).

`@type`

Used to set the type of a [node](https://www.w3.org/TR/rdf11-concepts/#dfn-node) or the datatype of a [typed value](https://www.w3.org/TR/json-ld11/#dfn-typed-value). This keyword is described further in [§ 3.5 Specifying the Type](https://www.w3.org/TR/json-ld11/#specifying-the-type) and [§ 4.2.1 Typed Values](https://www.w3.org/TR/json-ld11/#typed-values).

Note

The use of `@type` to define a type for both [node objects](https://www.w3.org/TR/json-ld11/#dfn-node-object) and [value objects](https://www.w3.org/TR/json-ld11/#dfn-value-object) addresses the basic need to type data, be it a literal value or a more complicated resource. Experts may find the overloaded use of the `@type` keyword for both purposes concerning, but should note that Web developer usage of this feature over multiple years has not resulted in its misuse due to the far less frequent use of `@type` to express typed literal values.

`@value`

Used to specify the data that is associated with a particular [property](https://www.w3.org/TR/rdf11-concepts/#dfn-property) in the graph. This keyword is described in [§ 4.2.4 String Internationalization](https://www.w3.org/TR/json-ld11/#string-internationalization) and [§ 4.2.1 Typed Values](https://www.w3.org/TR/json-ld11/#typed-values).

`@version`

Used in a [context definition](https://www.w3.org/TR/json-ld11/#dfn-context-definition) to set the [processing mode](https://www.w3.org/TR/json-ld11/#dfn-processing-mode). New features since [JSON-LD 1.0](https://www.w3.org/TR/2014/REC-json-ld-20140116/) \[[JSON-LD10](https://www.w3.org/TR/json-ld11/#bib-json-ld10 "JSON-LD 1.0")\] described in this specification are not available when [processing mode](https://www.w3.org/TR/json-ld11/#dfn-processing-mode) has been explicitly set to `json-ld-1.0`.

Note

Within a [context definition](https://www.w3.org/TR/json-ld11/#dfn-context-definition) `@version` takes the specific value `1.1`, not `"json-ld-1.1"`, as a JSON-LD 1.0 processor may accept a string value for `@version`, but will reject a numeric value.

Note

The use of `1.1` for the value of `@version` is intended to cause a JSON-LD 1.0 processor to stop processing. Although it is clearly meant to be related to JSON-LD 1.1, it does not otherwise adhere to the requirements for [Semantic Versioning](https://semver.org/).

`@vocab`

Used to expand properties and values in `@type` with a common prefix [IRI](https://tools.ietf.org/html/rfc3987#section-2). This keyword is described in [§ 4.1.2 Default Vocabulary](https://www.w3.org/TR/json-ld11/#default-vocabulary).
