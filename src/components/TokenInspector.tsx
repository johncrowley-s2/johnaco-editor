import { useMemo, useState } from "react";
import { LanguageDefinition } from "../lib/languages/types";
import tokenize from "../lib/tokenize";

interface Props {
  value: string;
  language: LanguageDefinition;
}

// function useFilter(tokens: Token[]) {
//   const types = useMemo(() => tokens.reduce<string[]>((acc, curr) => {
//     if (!acc.includes(curr.type)) return acc;
//     return [...acc, curr.type];
//   }, []), [tokens]);

//   const [filters, setFilters] =
// }

export default function TokenInspector({ value, language }: Props) {
  const [showTokens, setShowTokens] = useState(false); // Default false bc rendering the token table slows down the UI considerably
  const [filterType, setFilterType] = useState<string>("none");

  const tokens = useMemo(
    () => (!showTokens ? [] : tokenize(value, language.tokenMap)),
    [showTokens, value]
  );

  const types = useMemo(
    () =>
      tokens.reduce<string[]>((acc, curr) => {
        if (acc.includes(curr.type)) return acc;
        return [...acc, curr.type];
      }, []),
    [tokens]
  );

  const filteredTokens = useMemo(() => {
    if (filterType === "none") return tokens;
    return tokens.filter((t) => t.type === filterType);
  }, [tokens, filterType]);

  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{ display: "flex" }}>
          <button
            style={{ alignSelf: "center", marginRight: "1rem" }}
            onClick={() => setShowTokens(!showTokens)}
          >
            {showTokens ? "Close" : "Open"}
          </button>
          <h3>Inspect Tokens:</h3>
        </div>
        <div>
          {showTokens ? (
            <>
              <select
                onChange={(e) => setFilterType(e.target.value)}
                style={{ alignSelf: "center", marginBottom: "1rem" }}
              >
                <option value="none">All Token Types</option>
                {types.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <table>
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Type</th>
                    <th>Line</th>
                    <th>Position</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTokens.map((t, i) => (
                    <tr key={t.type + i}>
                      <td>{i}</td>
                      <td>
                        <pre>{t.type}</pre>
                      </td>
                      <td>{t.line}</td>
                      <td>{t.position}</td>
                      <td>
                        <pre>{t.value}</pre>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            "Open to inspect tokens."
          )}
        </div>
      </div>
    </>
  );
}