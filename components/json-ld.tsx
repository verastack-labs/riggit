/**
 * Emits one structured data block.
 *
 * `dangerouslySetInnerHTML` is not a shortcut here, it is the only option.
 * React escapes text children for HTML, which would turn the quotes in the
 * JSON into `&quot;` and leave a crawler parsing nothing. A `<script>` body is
 * not HTML, so it must not be HTML-escaped.
 *
 * That puts the escaping obligation on us, and there is exactly one character
 * that matters: an HTML parser ends this block at the first `</script` it
 * sees, wherever that sits, including inside a JSON string. Any content
 * after it lands in the document as markup. Escaping `<` as `\u003c` is
 * valid JSON, parses back to the same string, and makes the sequence
 * unwritable. The other two are belt and braces against a `<!--` opening an
 * HTML comment and swallowing the rest.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data)
    .replace(/</g, "\u003c")
    .replace(/>/g, "\u003e")
    .replace(/&/g, "\u0026");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
