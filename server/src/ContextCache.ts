import { JsonLdContext } from "jsonld-context-parser"
import {
  TextDocument,
  Connection,
  DiagnosticSeverity,
} from "vscode-languageserver"
// const contextCache: Map<string, Thenable<ExampleSettings>> = new Map()

import { Cacher, ICacheManager } from "./cache"

// const contextCacheOperator: ICacheManager = {

// }

import { ContextParser } from "jsonld-context-parser"

const myParser = new ContextParser()

class ContextCacheOperator
  implements ICacheManager<TextDocument, JsonLdContext> {
  private connection: Connection

  constructor(conn: Connection) {
    this.connection = conn
  }

  id(item: TextDocument): string {
    return item.uri
  }
  async generate(item: TextDocument): Promise<JsonLdContext> {
    const text = item.getText()

    /**
     * TODO: deal with errors in here
     * We added the infra to let them bubble up and be stored in the cache itself.
     *
     * However this isn't very useful to us, so we'll send the diagnostics immediately, then rethrow
     */
    try {
      const json = JSON.parse(text)
      console.log("Parsed")

      console.log("Context")

      // const ld = await jsonld.compact(json, json["@context"])
      const myContext = await myParser.parse(json)
      const ld = myContext.getContextRaw()

      console.log(`Context: ${JSON.stringify(ld, undefined, 4)}`)
      return ld
    } catch (error) {
      this.connection.sendDiagnostics({
        uri: item.uri,
        diagnostics: [
          {
            severity: DiagnosticSeverity.Error,
            message: `Failed with error ${error}`,
            range: {
              start: item.positionAt(0),
              end: item.positionAt(0),
            },
          },
        ],
      })
      throw error
    }
  }
}

export const createContextCache = (conn: Connection) =>
  new Cacher(new ContextCacheOperator(conn))
