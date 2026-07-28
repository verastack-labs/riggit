import { Fragment } from "react";

/**
 * Renders `text`, drawing every occurrence of `word` as lit rather than flat.
 *
 * Split here rather than by hardcoding the phrase, so the heading works for
 * any brand: no match, or no word given, and it renders the string untouched.
 *
 * The lit span carries no accessible-name change on purpose. It is one word of
 * a sentence given a different finish, not emphasis, so wrapping it in `<em>`
 * would tell a screen reader something the design is not saying.
 */
export function LitWord({ text, word }: { text: string; word?: string }) {
  if (!word) return <>{text}</>;

  const parts = text.split(word);
  if (parts.length === 1) return <>{text}</>;

  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={index}>
          {index > 0 ? (
            <span className="riggit-gradient-text">{word}</span>
          ) : null}
          {part}
        </Fragment>
      ))}
    </>
  );
}
