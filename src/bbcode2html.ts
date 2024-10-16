/*
 * BBCode2Html v1.0.0
 * By Mike Ratcliffe
 *
 * The following BBCode tags are supported:
 *   [b]Bold Text[/b]
 *   [bbvideo]https://www.youtube.com/watch?v=E7d-3-uXlZM[/bbvideo]
 *   [blur="red"]guide[/blur]
 *   [br]
 *   [center]This is some centered text[/center]
 *   [code]function test() { return true; }[/code]
 *   [color=blue]Blue Text[/color]
 *   [email]test@example.com[/email]
 *   [font=Courier]Courier Font[/font]
 *   [h1]Header 1[/h1]
 *   [h2]Header 2[/h2]
 *   [h3]Header 3[/h3]
 *   [h4]Header 4[/h4]
 *   [h5]Header 5[/h5]
 *   [hr]
 *   [i]Italic Text[/i]
 *   [img]https://via.placeholder.com/150[/img]
 *   [img width=10 height=20]https://via.placeholder.com/150[/img]
 *   [img=10x20]https://via.placeholder.com/150[/img]
 *   [img=90]https://via.placeholder.com/150[/img]
 *   [justify]This is some justified text[/justify]
 *   [large]This is large text[/large]
 *   [left]This is some left aligned text[/left]
 *   [line]
 *
 *   [list]
 *   [*] First item
 *   [*] Second item
 *   [/list]
 *   [list=1]
 *   [*] First item
 *   [*] Second item
 *   [/list]
 *   [list=a]
 *   [*] First item
 *   [*] Second item
 *   [/list]
 *   [list=A]
 *   [*] First item
 *   [*] Second item
 *   [/list]
 *   [list=i]
 *   [*] First item
 *   [*] Second item
 *   [/list]
 *   [list=I]
 *   [*] First item
 *   [*] Second item
 *   [/list]
 *
 *   [ol]
 *   [li]Item one[/li]
 *   [li]Item two[/li]
 *   [/ol]
 *
 *   [php]
 *     <?php
 *       echo "Hello";
 *     ?>
 *   [/php]
 *
 *   [pre]			01  andndnd.
 *   				05  andnd pic x.
 *   				05  andne pic x.[/pre]
 *
 *   [previewyoutube]E7d-3-uXlZM[/previewyoutube]
 *
 *   [quote]This is a quote[/quote]
 *   [quote=John]Quote from John[/quote]
 *
 *   [right]This is some right aligned text[/right]
 *   [s]Strikethrough Text[/s]
 *   [size=20]Large Text[/size]
 *   [small=#f00]This is small text[/small]
 *
 *   [spoiler]The hero dies at the end![/spoiler]
 *   [spoiler=What happens to the hero?]The hero dies at the end![/spoiler]
 *
 *   The formula of water is H[sub]2[/sub]O
 *   The equation x[sup]2[/sup] is a parabola.
 *
 *   [table]
 *     [tr]
 *       [th]Name[/th]
 *       [th]Age[/th]
 *     [/tr]
 *     [tr]
 *       [td]John[/td]
 *       [td]65[/td]
 *     [/tr]
 *   [/table]
 *
 *   [u]Underlined Text[/u]
 *
 *   [ul]
 *     [li]Item one[/li]
 *     [li]Item two[/li]
 *   [/ul]
 *
 *   [url]https://example.com[/url]
 *   [url=https://example.com]Example Link[/url]
 *
 *   [youtube]E7d-3-uXlZM[/youtube]
 */

// original-file.ts
import type { Tags, Config } from "./types";

const clanImagePath = "https://clan.akamai.steamstatic.com/images";

const colorNames = [
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "greenyellow",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen",
];

const entity = {
  "'": "&#39;",
  ";": "&#59;",
  "[": "&#91;",
  "]": "&#93;",
};

const rx = {
  bb: new RegExp(""),
  bbclAttr: /^(bbcl=)(\d+)/,
  bbclAttrNoClosingBracket: /<bbcl=\d+ /gi,
  bbclAttrComplete: /<bbcl=\d+ \/\*>/gi,
  bbclAttrSpace: /^bbcl=(\d+) /,
  closingAngleBracket: />/g,
  colorHex: /^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{3})$/,
  email: /[^\s@]+@[^\s@]+\.[^\s@]+/,
  emptyTags: /\[.*?\]/g,
  fontFace: /^([a-z][a-z0-9_]+|"[a-z][a-z0-9_\s]+")$/i,
  htmlTag: /<.*?>/g,
  htmlTagNonEmpty: /<([^>][^>]*?)>/g,
  listItemAsteriskList: /\[\*\]([^[]*?)(\[\*\]|>\/list])/i,
  listItemAsterisk: /\[(?!\*[ =\]]|list([ =][^\]]*)?\]|\/list\])/gi,
  listTag: /\[(?=list([ =][^\]]*)?\]|\/list\])/gi,
  markedListTag: />list([ =][^\]]*)?\]([^>]*?)(>\/list])/gi,
  pbb: new RegExp(""),
  pbb2: new RegExp(""),
  quote: /&quot;/g,
  url: /^(?:https?|file|c):(?:\/{1,3}|\\)[-a-zA-Z0-9:;,@#%&()~_?+=/\\.]*$/,
  urlTag: /(?<![\]"=])(https?:\/\/\S+)/g,
};

class Bbcode2HTML {
  openTags = new RegExp("");
  closeTags = new RegExp("");

  tagsNoParseList: string[] = [];
  tagList: string[] = [];

  #tags: Tags = {
    // [b]Bold Text[/b]
    b: {
      openTag: () => {
        return '<span style="font-weight:bold;">';
      },
      closeTag: () => {
        return "</span>";
      },
    },
    /**
     * This tag does nothing and is here used as a classification for the bbcode
     * input when evaluating parent-child tag relationships
     */
    bbcode: {
      openTag: () => {
        return "";
      },
      closeTag: () => {
        return "";
      },
    },
    bbvideo: {
      // [bbvideo]https://www.youtube.com/watch?v=E7d-3-uXlZM[/bbvideo]
      openTag: (_: unknown, content: string = "") => {
        if (!content) {
          return "";
        }

        return `<iframe width="756" height="425" src="${content}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
      },
      displayContent: false,
    },
    blur: {
      // [blur="red"]guide[/blur]
      openTag: (params) => {
        const defaultColor = "white";
        let color;

        if (!params) {
          color = defaultColor;
        } else {
          color = params.slice(1).replaceAll(rx.quote, "");
        }

        if (!colorNames.includes(color)) {
          color = defaultColor;
        }

        return `<span style="color:${color};filter:blur;">`;
      },
      closeTag: () => {
        return "</span>";
      },
    },
    br: {
      // [br]
      openTag: () => {
        return "<br/>";
      },
    },
    center: {
      // [center]This is some centered text[/center]
      openTag: () => {
        return '<span style="margin-left:auto;margin-right:auto;display:block;text-align:center;">';
      },
      closeTag: () => {
        return "</span>";
      },
    },
    code: {
      // [code]function test() { return true; }[/code]
      openTag: () => {
        return '<span style="white-space:pre-wrap;font-family:monospace;">';
      },
      closeTag: () => {
        return "</span>";
      },
      noParse: true,
    },
    color: {
      // [color=blue]Blue Text[/color]
      openTag: (params = "") => {
        let colorCode = params.slice(1).toLowerCase() || "black";
        if (!colorNames.includes(colorCode)) {
          if (!rx.colorHex.test(colorCode)) {
            colorCode = "black";
          } else if (!colorCode.startsWith("#")) {
            colorCode = `#${colorCode}`;
          }
        }

        return `<span style="color:${colorCode}">`;
      },
      closeTag: () => {
        return "</span>";
      },
    },
    email: {
      // [email]test@example.com[/email]
      openTag: (params, content = "") => {
        let myEmail;

        if (!params) {
          myEmail = content.replaceAll(rx.htmlTag, "");
        } else {
          myEmail = params.slice(1);
        }

        if (!rx.email.test(myEmail)) {
          return "<a>";
        }

        return `<a href="mailto:${myEmail}">`;
      },
      closeTag: () => {
        return "</a>";
      },
    },
    font: {
      // [font=Courier]Courier Font[/font]
      openTag: (params = "") => {
        let faceCode = params.slice(1) || "inherit";
        if (!rx.fontFace.test(faceCode)) {
          faceCode = "inherit";
        }
        return `<span style="font-family:${faceCode}">`;
      },
      closeTag: () => {
        return "</span>";
      },
    },
    h1: {
      // [h1]Header 1[/h1]
      openTag: () => {
        return "<h1>";
      },
      closeTag: () => {
        return "</h1>";
      },
    },
    h2: {
      // [h2]Header 2[/h2]
      openTag: () => {
        return "<h2>";
      },
      closeTag: () => {
        return "</h2>";
      },
    },
    h3: {
      // [h3]Header 3[/h3]
      openTag: () => {
        return "<h3>";
      },
      closeTag: () => {
        return "</h3>";
      },
    },
    h4: {
      // [h4]Header 4[/h4]
      openTag: () => {
        return "<h4>";
      },
      closeTag: () => {
        return "</h4>";
      },
    },
    h5: {
      // [h5]Header 5[/h5]
      openTag: () => {
        return "<h5>";
      },
      closeTag: () => {
        return "</h5>";
      },
    },
    hr: {
      // [hr]
      openTag: () => {
        return "<hr/>";
      },
    },
    i: {
      // [i]Italic Text[/i]
      openTag: () => {
        return '<span style="font-style:italic">';
      },
      closeTag: () => {
        return "</span>";
      },
    },
    img: {
      // [img]https://via.placeholder.com/150[/img]
      // [img width=10 height=20]https://via.placeholder.com/150[/img]
      // [img=10x20]https://via.placeholder.com/150[/img]
      // [img=90]https://via.placeholder.com/150[/img]
      openTag: (params, url = "") => {
        const { width, height } = this.extractImgTagDimensions(params);

        // Validate the URL
        url = rx.url.test(url) ? url : "";

        // Construct width and height attributes
        const widthText = width ? ` width="${width}"` : "";
        const heightText = width && height ? ` height="${height}"` : "";

        return `<img src="${url}"${widthText}${heightText} />`;
      },
      displayContent: false,
    },
    justify: {
      // [justify]This is some justified text[/justify]
      openTag: () => {
        return '<span style="display:block;text-align:justify">';
      },
      closeTag: () => {
        return "</span>";
      },
    },
    large: {
      // [large]This is large text[/large]
      openTag: (params = "") => {
        let colorCode = params.slice(1) || "inherit";
        if (!colorNames.includes(colorCode)) {
          if (!rx.colorHex.test(colorCode)) {
            colorCode = "inherit";
          } else if (!colorCode.startsWith("#")) {
            colorCode = `#${colorCode}`;
          }
        }

        return `<span style="font-size:36px" style="color:${colorCode}">`;
      },
      closeTag: () => {
        return "</span>";
      },
    },
    left: {
      // [left]This is some left aligned text[/left]
      openTag: () => {
        return '<span style="display:block;text-align:left">';
      },
      closeTag: () => {
        return "</span>";
      },
    },
    li: {
      // [ol]
      //   [li]Item one[/li]
      //   [li]Item two[/li]
      // [/ol]
      openTag: () => {
        return "<li>";
      },
      closeTag: () => {
        return "</li>";
      },
      restrictParentsTo: ["list", "ul", "ol"],
    },
    line: {
      // [line]
      openTag: () => {
        return "<hr/>";
      },
    },
    list: {
      // [list]
      //   [*] First item
      //   [*] Second item
      // [/list]
      //
      // [list=1]
      //   [*] First item
      //   [*] Second item
      // [/list]
      //
      // [list=a]
      //   [*] First item
      //   [*] Second item
      // [/list]
      //
      // [list=A]
      //   [*] First item
      //   [*] Second item
      // [/list]
      //
      // [list=i]
      //   [*] First item
      //   [*] Second item
      // [/list]
      //
      // [list=I]
      //   [*] First item
      //   [*] Second item
      // [/list]
      openTag: () => {
        return "<ul>";
      },
      closeTag: () => {
        return "</ul>";
      },
      restrictChildrenTo: ["*", "li"],
    },
    noparse: {
      // Used for tags that shouldn't be parsed
      openTag: () => {
        return "";
      },
      closeTag: () => {
        return "";
      },
      noParse: true,
    },
    ol: {
      // [ol]
      //   [li]Item one[/li]
      //   [li]Item two[/li]
      // [/ol]
      openTag: () => {
        return "<ol>";
      },
      closeTag: () => {
        return "</ol>";
      },
      restrictChildrenTo: ["*", "li"],
    },
    php: {
      // [php]
      //   <?php
      //     echo "Hello";
      //   ?>
      // [/php]
      openTag: () => {
        return '<span style="white-space:pre-wrap;font-family:monospace;">';
      },
      closeTag: () => {
        return "</span>";
      },
      noParse: true,
    },
    pre: {
      // [pre]			01  andndnd.
      // 05  andnd pic x.
      // 05  andne pic x.[/pre]
      openTag: () => {
        return '<span style="white-space:pre-wrap;font-family:monospace;">';
      },
      closeTag: () => {
        return "</span>";
      },
      noParse: true,
    },
    previewyoutube: {
      // [previewyoutube]E7d-3-uXlZM[/previewyoutube]
      openTag: (id) => {
        if (!id) {
          return "";
        }
        const splitId = id.split(entity[";"]);
        if (splitId.length === 2) {
          id = splitId[0];
        }
        if (id.startsWith("=")) {
          id = id.slice(1);
        }
        return `<iframe width="756" height="425" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
      },
      displayContent: false,
    },
    quote: {
      // [quote]This is a quote[/quote]
      // [quote=John]Quote from John[/quote]
      openTag: (name) => {
        let nameText = "";
        if (name) {
          nameText = `<strong>${name
            .slice(1)
            .replaceAll(rx.quote, "")} says:</strong> `;
        }
        return `<blockquote>${nameText}`;
      },
      closeTag: () => {
        return "</blockquote>";
      },
    },
    right: {
      // [right]This is some right aligned text[/right]
      openTag: () => {
        return '<span style="display:block;text-align:right">';
      },
      closeTag: () => {
        return "</span>";
      },
    },
    s: {
      // [s]Strikethrough Text[/s]
      openTag: () => {
        return '<span style="text-decoration:line-through;">';
      },
      closeTag: () => {
        return "</span>";
      },
    },
    size: {
      // [size=20]Large Text[/size]
      openTag: (params = "") => {
        let mySize = parseInt(params.slice(1), 10) || 0;
        if (mySize < 4 || mySize > 40) {
          mySize = 14;
        }

        return `<span style="font-size:${mySize}px;">`;
      },
      closeTag: () => {
        return "</span>";
      },
    },
    small: {
      // [small=#f00]This is small text[/small]
      openTag: (params = "") => {
        let colorCode = params.slice(1) || "inherit";
        if (!colorNames.includes(colorCode)) {
          if (!rx.colorHex.test(colorCode)) {
            colorCode = "inherit";
          } else if (!colorCode.startsWith("#")) {
            colorCode = `#${colorCode}`;
          }
        }

        return `<span style="font-size:10px" style="color:${colorCode}">`;
      },
      closeTag: () => {
        return "</span>";
      },
    },
    spoiler: {
      // [spoiler]The hero dies at the end![/spoiler]
      // [spoiler=What happens to the hero?]The hero dies at the end![/spoiler]
      openTag: (title) => {
        const text = title?.substr(1) || "Show spoiler";
        return `<a style="display:block;" href="#" onclick='event.target.nextElementSibling.style.display = event.target.nextElementSibling.style.display === "block" ? "none" : "block"'>${text}</a><div style="display:none;">`;
      },
      closeTag: () => {
        return "</div>";
      },
    },
    sub: {
      // The formula of water is H[sub]2[/sub]O
      openTag: () => {
        return "<sub>";
      },
      closeTag: () => {
        return "</sub>";
      },
    },
    sup: {
      // The equation x[sup]2[/sup] is a parabola.
      openTag: () => {
        return "<sup>";
      },
      closeTag: () => {
        return "</sup>";
      },
    },
    table: {
      // [table]
      //   [tr]
      //     [th]Name[/th]
      //     [th]Age[/th]
      //   [/tr]
      //   [tr]
      //     [td]John[/td]
      //     [td]65[/td]
      //   [/tr]
      // [/table]
      openTag: () => {
        return '<table style="border-collapse:collapse;">';
      },
      closeTag: () => {
        return "</table>";
      },
      restrictChildrenTo: ["tbody", "thead", "tfoot", "tr"],
    },
    tbody: {
      // [table]
      //   [tbody]
      //     [tr]
      //       [th]Name[/th]
      //       [th]Age[/th]
      //     [/tr]
      //     [tr]
      //       [td]John[/td]
      //       [td]65[/td]
      //     [/tr]
      //   [/tbody]
      // [/table]
      openTag: () => {
        return "<tbody>";
      },
      closeTag: () => {
        return "</tbody>";
      },
      restrictChildrenTo: ["tr"],
      restrictParentsTo: ["table"],
    },
    tfoot: {
      // [table]
      //   [tr]
      //     [th]Name[/th]
      //     [th]Age[/th]
      //   [/tr]
      //   [tfoot]
      //     [tr]
      //       [td]John[/td]
      //       [td]65[/td]
      //     [/tr]
      //   [/tfoot]
      // [/table]
      openTag: () => {
        return "<tfoot>";
      },
      closeTag: () => {
        return "</tfoot>";
      },
      restrictChildrenTo: ["tr"],
      restrictParentsTo: ["table"],
    },
    thead: {
      // [table]
      //   [thead]
      //     [tr]
      //       [th]Name[/th]
      //       [th]Age[/th]
      //     [/tr]
      //   [/thead]
      //   [tr]
      //     [td]John[/td]
      //     [td]65[/td]
      //   [/tr]
      // [/table]
      openTag: () => {
        return "<thead>";
      },
      closeTag: () => {
        return "</thead>";
      },
      restrictChildrenTo: ["tr"],
      restrictParentsTo: ["table"],
    },
    td: {
      // [table]
      //   [tr]
      //     [td]John[/td]
      //     [td]65[/td]
      //   [/tr]
      // [/table]
      openTag: () => {
        return '<td style="border:1px solid #666;">';
      },
      closeTag: () => {
        return "</td>";
      },
      restrictParentsTo: ["tr"],
    },
    th: {
      // [table]
      //   [tr]
      //     [th]Name[/th]
      //     [th]Age[/th]
      //   [/tr]
      // [/table]
      openTag: () => {
        return '<th style="border:1px solid #666;">';
      },
      closeTag: () => {
        return "</th>";
      },
      restrictParentsTo: ["tr"],
    },
    tr: {
      // [table]
      //   [tr]
      //     [td]John[/td]
      //     [td]65[/td]
      //   [/tr]
      // [/table]
      openTag: () => {
        return "<tr>";
      },
      closeTag: () => {
        return "</tr>";
      },
      restrictChildrenTo: ["td", "th"],
      restrictParentsTo: ["table", "tbody", "tfoot", "thead"],
    },
    u: {
      // [u]Underlined Text[/u]
      openTag: () => {
        return '<span style="text-decoration:underline;">';
      },
      closeTag: () => {
        return "</span>";
      },
    },
    ul: {
      // [ul]
      //   [li]Item one[/li]
      //   [li]Item two[/li]
      // [/ul]
      openTag: () => {
        return "<ul>";
      },
      closeTag: () => {
        return "</ul>";
      },
      restrictChildrenTo: ["*", "li"],
    },
    url: {
      // [url]https://example.com[/url]
      // [url=https://example.com]Example Link[/url]
      openTag: (url, content = "") => {
        if (!url) {
          url = content.replaceAll(rx.htmlTag, "");
        } else {
          url = url.slice(1);
        }

        if (!rx.url.test(url)) {
          url = "#";
        }

        return `<a href="${url}">`;
      },
      closeTag: () => {
        return "</a>";
      },
    },
    youtube: {
      // [youtube]E7d-3-uXlZM[/youtube]
      openTag: (_, content) => {
        if (!content) {
          return "";
        }

        return `<iframe width="756" height="425" src="https://www.youtube.com/embed/${content}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
      },
      displayContent: false,
    },
    "*": {
      // The [*] tag doesn't have a closing [/*] tag, so we parse the code and
      // add the closing [/*] tag.
      openTag: (_, content = "") => {
        return `<li>${content.trim()}</li>\n`;
      },
      closeTag: () => {
        return "";
      },
      displayContent: false,
      restrictParentsTo: ["list", "ul", "ol"],
    },
  };

  constructor() {
    this.initTags();
  }

  /**
   * Creates a regular expression for matching tags with an open and close tag.
   *
   * @returns {RegExp} A regular expression that matches tags with an open and
   * close tag.
   */
  createOpenSquareTagRegex = () => {
    const closeTagList = [];

    for (const tag of this.tagList) {
      if (tag !== "\\*") {
        // the * tag doesn't have an official closing tag
        closeTagList.push(`/${tag}`);
      }
    }

    this.openTags = new RegExp(
      `(\\[)((?:${this.tagList.join("|")})(?:[ =][^\\]]*?)?)(\\])`,
      "gi"
    );
    this.closeTags = new RegExp(`(\\[)(${closeTagList.join("|")})(\\])`, "gi");
  };

  /**
   * Creates regular expressions for matching bbcl tags, "bbcl", which indicate
   * how deeply nested a particular tag was in the bbcode.
   *
   * This property is used during the parsing process.
   *
   * @returns {void}
   */
  createBbPbbPbb2Regexes = () => {
    rx.bb = new RegExp(
      `<bbcl=([0-9]+) (${this.tagList.join(
        "|"
      )})([ =][^>]*?)?>((?:.|[\\r\\n])*?)<bbcl=\\1 /\\2>`,
      "gi"
    );
    rx.pbb = new RegExp(
      `\\[(${this.tagList.join("|")})([ =][^\\]]*?)?\\]([^\\[]*?)\\[/\\1\\]`,
      "gi"
    );
    rx.pbb2 = new RegExp(
      `\\[(${this.tagsNoParseList.join(
        "|"
      )})([ =][^\\]]*?)?\\]([\\s\\S]*?)\\[/\\1\\]`,
      "gi"
    );
  };

  /**
   * Handles the wildcard property '*' by adding it to the tag list and
   * initializing the tag definition.
   *
   * @param {string} prop - The property name.
   * @returns {void}
   */
  handleWildcardProperty = (prop: string) => {
    if (prop === "*") {
      this.tagList.push(`\\${prop}`);
    } else {
      this.tagList.push(prop);
      if (this.#tags[prop].noParse) {
        this.tagsNoParseList.push(prop);
      }
    }
  };

  /**
   * Extracts the width and height from an image tag.
   *
   * @param {string} params - The parameters string.
   * @returns {object} An object with the width and height properties.
   */
  extractImgTagDimensions = (params = "") => {
    let width = 0;
    let height = 0;

    if (params) {
      let match = /width=(\d+)/.exec(params);

      width = parseInt(match?.[1] ?? width.toString(), 10);
      match = /height=(\d+)/.exec(params);
      height = parseInt(match?.[1] ?? height.toString(), 10);

      // Handle [img=widthxheight]
      if (!width) {
        match = /(\d+)x(\d+)/.exec(params);
        width = parseInt(match?.[1] ?? width.toString(), 10);
        height = parseInt(match?.[2] ?? height.toString(), 10);
      }

      // Handle [img=width]
      if (!width) {
        match = /(\d+)/.exec(params);
        width = parseInt(match?.[1] ?? width.toString(), 10);
      }
    }
    return { width, height };
  };

  /**
   * Initializes the tag list and lookup fields.
   *
   * @returns {void}
   */
  initTags = () => {
    for (const prop in this.#tags) {
      if (Object.hasOwn(this.#tags, prop)) {
        this.handleWildcardProperty(prop);

        this.#tags[prop].validChildLookup = {};
        this.#tags[prop].validParentLookup = {};
        this.#tags[prop].restrictParentsTo =
          this.#tags[prop].restrictParentsTo || [];
        this.#tags[prop].restrictChildrenTo =
          this.#tags[prop].restrictChildrenTo || [];

        for (const element of this.#tags[prop].restrictChildrenTo) {
          this.#tags[prop].validChildLookup[element] = true;
        }

        for (const element of this.#tags[prop].restrictParentsTo) {
          this.#tags[prop].validParentLookup[element] = true;
        }
      }
    }

    this.createBbPbbPbb2Regexes();
    this.createOpenSquareTagRegex();
  };

  /**
   * Checks if a parent tag is allowed to have a child tag.
   *
   * @param {string} parentTag - The parent tag name.
   * @param {number} bbcodeLevel - The bbcode level.
   * @param {string} tagContents - The contents of the tag.
   * @returns {string[]} An array of error messages.
   */
  checkParentChildRestrictions = (
    parentTag: string,
    bbcodeLevel: number,
    tagContents: string
  ) => {
    const errQueue = [];

    bbcodeLevel++;

    // get a list of all of the child tags to this tag
    const reTagNames = new RegExp(
      `(<bbcl=${bbcodeLevel} )(${this.tagList.join("|")})([ =>])`,
      "gi"
    );
    const reTagNamesParts = new RegExp(
      `(<bbcl=${bbcodeLevel} )(${this.tagList.join("|")})([ =>])`,
      "i"
    );
    const matchingTags = tagContents.match(reTagNames) || [];
    const pInfo = this.#tags[parentTag] || {};
    let cInfo;
    let errStr;
    let ii;
    let childTag: string;

    for (ii = 0; ii < matchingTags.length; ii++) {
      childTag =
        matchingTags[ii].match(reTagNamesParts)?.[2].toLowerCase() ?? "";

      if (
        pInfo?.restrictChildrenTo &&
        pInfo.restrictChildrenTo.length > 0 &&
        !pInfo.validChildLookup?.[childTag]
      ) {
        errStr = `The tag "${childTag}" is not allowed as a child of the tag "${parentTag}".`;
        errQueue.push(errStr);
      }
      cInfo = this.#tags[childTag] || {};
      if (
        cInfo.restrictParentsTo &&
        cInfo.restrictParentsTo.length > 0 &&
        !cInfo.validParentLookup?.[parentTag]
      ) {
        errStr = `The tag "${parentTag}" is not allowed as a parent of the tag "${childTag}".`;
        errQueue.push(errStr);
      }
    }

    return errQueue;
  };

  /**
   * Updates or adds a piece of metadata to each tag called "bbcl" which
   * indicates how deeply nested a particular tag was in the bbcode. This
   * property is removed from the HTML code tags at the end of the processing.
   *
   * @param {string} tagContents - The contents of the tag.
   * @returns {string} The updated contents of the tag.
   */
  updateTagDepths = (tagContents: string) => {
    tagContents = tagContents.replaceAll(
      rx.htmlTagNonEmpty,
      (_: string, subMatchStr: string) => {
        const bbCodeLevel = subMatchStr.match(rx.bbclAttrSpace);
        if (bbCodeLevel === null) {
          return `<bbcl=0 ${subMatchStr}>`;
        }
        return `<${subMatchStr.replace(rx.bbclAttr, (_, m1, m2) => {
          return m1 + (parseInt(m2, 10) + 1);
        })}>`;
      }
    );
    return tagContents;
  };

  /**
   * Removes the metadata added by the updateTagDepths function.
   *
   * @param {string} tagContent - The contents of the tag.
   * @returns {string} The updated contents of the tag.
   */
  unprocess = (tagContent: string) => {
    return tagContent
      .replaceAll(rx.bbclAttrComplete, "")
      .replaceAll(rx.bbclAttrNoClosingBracket, entity["["])
      .replaceAll(rx.closingAngleBracket, entity["]"]);
  };

  /**
   * Replaces a tag with its open and close tags.
   *
   * @param {string} _ - The first capture group.
   * @param {string} __ - The second capture group.
   * @param {string} tagName - The tag name.
   * @param {string} tagParams - The tag parameters.
   * @param {string} tagContents - The tag contents.
   * @returns {string} The processed tag.
   */
  replaceFunct = (
    _: string,
    __: string,
    tagName: string,
    tagParams: string,
    tagContents: string
  ): string => {
    tagName = tagName.toLowerCase();

    let processedContent = this.#tags[tagName].noParse
      ? this.unprocess(tagContents)
      : tagContents.replaceAll(rx.bb, this.replaceFunct);
    const openTag =
      this.#tags[tagName].openTag?.(tagParams, processedContent) || "";
    const closeTag =
      this.#tags[tagName].closeTag?.(tagParams, processedContent) || "";

    if (this.#tags[tagName].displayContent === false) {
      processedContent = "";
    }

    return openTag + processedContent + closeTag;
  };

  /**
   * Parses the input text and replaces the bbcode tags with their open and
   * close tags.
   *
   * @param {object} config - The configuration object.
   * @returns {string} The processed text.
   */
  parse = (config: Config) => {
    let output = config.text;
    output = output.replaceAll(rx.bb, this.replaceFunct);
    return output;
  };

  /**
   * Replaces the list items with their open and close tags.
   *
   * @param {string} text - The text to replace the list items in.
   * @returns {string} The processed text.
   */
  replaceListItems = (text: string) => {
    return text.replace(rx.listItemAsteriskList, (_, contents, endTag) => {
      endTag = endTag.toLowerCase() === ">/list]" ? "</*]</list]" : "</*][*]";
      return `<*]${contents}${endTag}`;
    });
  };

  /**
   * Processes the list items by replacing them with their open and close tags.
   *
   * @param {string} matchStr - The match string.
   * @returns {string} The processed match string.
   */
  processList = (matchStr: string) => {
    let innerListTxt = matchStr;
    let prevInnerListTxt;
    do {
      prevInnerListTxt = innerListTxt;
      innerListTxt = this.replaceListItems(innerListTxt);
    } while (prevInnerListTxt !== innerListTxt);

    return innerListTxt.replaceAll(">", "<");
  };

  /**
   * Fixes the star tag [*] by adding in closing tags [/*] for the star tag.
   *
   * @param {string} text - The text to fix the star tag in.
   * @returns {string} The processed text.
   */
  fixStarTag = (text: string) => {
    // Replace [*] with < so that we can use > as a marker to define boundaries
    text = text.replaceAll(rx.listItemAsterisk, "<");
    // Replace [/list] with > so that we can use < as a marker to define boundaries
    text = text.replaceAll(rx.listTag, ">");

    // Loop until we've replaced all the [*] tags
    let prevText;
    do {
      prevText = text;
      text = text.replaceAll(rx.markedListTag, this.processList);
    } while (prevText !== text);

    // Replace < with [ and > with ] so that we have the correct tags
    // add ['s for our tags back in
    text = text.replaceAll("<", "[");
    text = text.replaceAll(">", "]");

    return text;
  };

  /**
   * Fixes single tags by adding in the closing tags for the tags.
   *
   * @param {string} text - The text to fix the single tags in.
   * @returns {string} The processed text.
   */
  fixSingleTags = (text: string) => {
    for (const k in this.#tags) {
      if (!this.#tags[k].closeTag && this.#tags[k].openTag) {
        text = text.replaceAll(`[${k}]`, this.#tags[k].openTag());
      }
    }
    return text;
  };

  /**
   * Fixes security issues in the input text.
   *
   * @param {string} text - The text to fix the security issues in.
   * @returns {string} The processed text.
   */
  securityFixes = (text: string) => {
    return text
      .replaceAll(";", entity[";"])
      .replaceAll("'", entity["'"])
      .replaceAll('"', "&quot;");
  };

  /**
   * Adds in the bbcode levels to the tags, which indicates how deeply nested
   * a particular tag is in the bbcode.
   *
   * @param {string} text - The text to add the bbcode levels to.
   * @returns {string} The processed text.
   */
  addBbcodeLevels = (text: string) => {
    let prevText;

    do {
      prevText = text;

      text = text.replaceAll(rx.pbb, (matchStr) => {
        matchStr = matchStr.replaceAll("[", "<").replaceAll("]", ">");
        return this.updateTagDepths(matchStr);
      });
    } while (prevText !== text);

    return text;
  };

  /**
   * Adds the tags to the tags object.
   *
   * @returns {Tags} The tags object.
   */
  addTags = (newtags: Tags[]) => {
    for (const tag in newtags) {
      this.#tags[tag] = newtags[tag];
    }
    this.initTags();
  };

  /**
   * Processes the input text and replaces the bbcode tags with their open and
   * close tags.
   *
   * @param {object} config - The configuration object.
   * @returns {object} The processed text and any errors.
   */
  process = (config: Config) => {
    const ret: { html: string; error: boolean; errorQueue?: string[] } = {
      html: "",
      error: false,
    };
    let errQueue = [];

    config.text = this.securityFixes(config.text);

    // For steam image compatibility we need to replace {STEAM_CLAN_IMAGE} with
    // the steam image path
    config.text = config.text.replaceAll(
      /\{STEAM_CLAN_IMAGE\}/g,
      clanImagePath
    );

    // escape HTML tag brackets
    config.text = config.text.replaceAll("<", "&lt;");
    config.text = config.text.replaceAll(">", "&gt;");

    // Replace plain URLs
    config.text = config.text.replaceAll(rx.urlTag, "[url]$1[/url]");

    // Process open tags
    config.text = config.text.replace(
      this.openTags,
      function (_, __, contents) {
        return `<${contents}>`;
      }
    );

    // Process close tags
    config.text = config.text.replace(
      this.closeTags,
      function (_, __, contents) {
        return `<${contents}>`;
      }
    );

    // escape ['s that aren't part of a tag
    config.text = config.text.replaceAll("[", entity["["]);

    // escape ]'s that aren't part of a tag
    config.text = config.text.replaceAll("]", entity["]"]);

    // escape <'s that aren't part of a tag
    config.text = config.text.replaceAll("<", "[");

    // escape >'s that aren't part of a tag
    config.text = config.text.replaceAll(">", "]");

    // process tags that don't have their content parsed
    let prevText;
    do {
      prevText = config.text;

      config.text = config.text.replaceAll(
        rx.pbb2,
        (_, tagName, tagParams = "", tagContents = "") => {
          // Escape square brackets inside tag contents
          const escapedContents = tagContents
            .replaceAll("[", entity["["])
            .replaceAll("]", entity["]"]);

          return `[${tagName}${tagParams}]${escapedContents}[/${tagName}]`;
        }
      );
    } while (config.text !== prevText);

    // add in closing tags for the [*] tag
    config.text = this.fixStarTag(config.text);

    // add in level metadata
    config.text = this.addBbcodeLevels(config.text);

    errQueue = this.checkParentChildRestrictions("bbcode", -1, config.text);

    ret.html = this.parse(config);
    ret.html = this.fixSingleTags(ret.html);

    if (ret.html.includes("[") || ret.html.includes("]")) {
      errQueue.push("Some tags appear to be misaligned.");
    }

    if (config.removeMisalignedTags) {
      ret.html = ret.html.replaceAll(rx.emptyTags, "");
    }
    if (config.addInLineBreaks) {
      ret.html = `<div style="white-space:pre-wrap;">${ret.html}</div>`;
    }

    if (!config.escapeHtml) {
      // put ['s back in
      ret.html = ret.html.replace(entity["["], "[");

      // put ]'s back in
      ret.html = ret.html.replace(entity["]"], "]");
    }

    ret.error = errQueue.length !== 0;
    ret.errorQueue = errQueue;

    return ret;
  };
}

const BBCode2Html = new Bbcode2HTML().process;

export { BBCode2Html };
