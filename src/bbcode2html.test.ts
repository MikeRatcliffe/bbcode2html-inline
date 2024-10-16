import { expect, test } from "vitest";
import { BBCode2Html } from "./bbcode2html";

function runTest({ bbcode, expected }: { bbcode: string; expected: string }) {
  test(bbcode, () => {
    const actual = BBCode2Html({
      text: bbcode,
      removeMisalignedTags: true,
      addInLineBreaks: false,
    }).html;

    expect(actual).toBe(expected);
  });
}

runTest({ bbcode: `[h1]Header 1[/h1]`, expected: `<h1>Header 1</h1>` });
runTest({ bbcode: `[h2]Header 2[/h2]`, expected: `<h2>Header 2</h2>` });
runTest({ bbcode: `[h3]Header 3[/h3]`, expected: `<h3>Header 3</h3>` });
runTest({ bbcode: `[h4]Header 4[/h4]`, expected: `<h4>Header 4</h4>` });
runTest({ bbcode: `[h5]Header 5[/h5]`, expected: `<h5>Header 5</h5>` });

runTest({
  bbcode: `[b]Bold Text[/b]`,
  expected: `<span style="font-weight:bold;">Bold Text</span>`,
});
runTest({
  bbcode: `[i]Italic Text[/i]`,
  expected: `<span style="font-style:italic">Italic Text</span>`,
});
runTest({
  bbcode: `[u]Underlined Text[/u]`,
  expected: `<span style="text-decoration:underline;">Underlined Text</span>`,
});
runTest({
  bbcode: `[s]Strikethrough Text[/s]`,
  expected: `<span style="text-decoration:line-through;">Strikethrough Text</span>`,
});

runTest({ bbcode: `[line]`, expected: `<hr/>` });
runTest({ bbcode: `[hr]`, expected: `<hr/>` });
runTest({ bbcode: `[br]`, expected: `<br/>` });

runTest({
  bbcode: `The equation x[sup]2[/sup] is a parabola.`,
  expected: `The equation x<sup>2</sup> is a parabola.`,
});
runTest({
  bbcode: `The formula of water is H[sub]2[/sub]O`,
  expected: `The formula of water is H<sub>2</sub>O`,
});

runTest({
  bbcode: `[size=20]Large Text[/size]`,
  expected: `<span style="font-size:20px;">Large Text</span>`,
});
runTest({
  bbcode: `[font=Courier]Courier Font[/font]`,
  expected: `<span style="font-family:Courier">Courier Font</span>`,
});
runTest({
  bbcode: `[color=blue]Blue Text[/color]`,
  expected: `<span style="color:blue">Blue Text</span>`,
});
runTest({
  bbcode: `[blur="red"]guide[/blur]`,
  expected: `<span style="color:red;filter:blur;">guide</span>`,
});

runTest({
  bbcode: `[center]This is some centered text[/center]`,
  expected: `<span style="margin-left:auto;margin-right:auto;display:block;text-align:center;">This is some centered text</span>`,
});
runTest({
  bbcode: `[left]This is some left aligned text[/left]`,
  expected: `<span style="display:block;text-align:left">This is some left aligned text</span>`,
});
runTest({
  bbcode: `[right]This is some right aligned text[/right]`,
  expected: `<span style="display:block;text-align:right">This is some right aligned text</span>`,
});

runTest({
  bbcode: `[quote]This is a quote[/quote]`,
  expected: `<blockquote>This is a quote</blockquote>`,
});
runTest({
  bbcode: `[quote="John"]Quote from John[/quote]`,
  expected: `<blockquote><strong>John says:</strong> Quote from John</blockquote>`,
});

runTest({
  bbcode: `[spoiler]The hero dies at the end![/spoiler]`,
  expected: `<a style="display:block;" href="#" onclick='event.target.nextElementSibling.style.display = event.target.nextElementSibling.style.display === "block" ? "none" : "block"'>Show spoiler</a><div style="display:none;">The hero dies at the end!</div>`,
});
runTest({
  bbcode: `[spoiler=What happens to the hero?]The hero dies at the end![/spoiler]`,
  expected: `<a style="display:block;" href="#" onclick='event.target.nextElementSibling.style.display = event.target.nextElementSibling.style.display === "block" ? "none" : "block"'>What happens to the hero?</a><div style="display:none;">The hero dies at the end!</div>`,
});

runTest({
  bbcode: `[url]https://example.com[/url]`,
  expected: `<a href="https://example.com">https://example.com</a>`,
});
runTest({
  bbcode: `[url=https://example.com]Example Link[/url]`,
  expected: `<a href="https://example.com">Example Link</a>`,
});
runTest({
  bbcode: `https://www.youtube.com/watch?v=3l1ABr0Jm2M`,
  expected: `<a href="https://www.youtube.com/watch?v=3l1ABr0Jm2M">https://www.youtube.com/watch?v=3l1ABr0Jm2M</a>`,
});
runTest({
  bbcode: `https://store.steampowered.com/app/2096570/Another_Fishermans_Tale/`,
  expected: `<a href="https://store.steampowered.com/app/2096570/Another_Fishermans_Tale/">https://store.steampowered.com/app/2096570/Another_Fishermans_Tale/</a>`,
});
runTest({
  bbcode: `https://google.com`,
  expected: `<a href="https://google.com">https://google.com</a>`,
});
runTest({
  bbcode: `http://google.com`,
  expected: `<a href="http://google.com">http://google.com</a>`,
});

runTest({
  bbcode: `[email]test@example.com[/email]`,
  expected: `<a href="mailto:test@example.com">test@example.com</a>`,
});

runTest({
  bbcode: `[img]https://via.placeholder.com/150[/img]`,
  expected: `<img src="https://via.placeholder.com/150" />`,
});
runTest({
  bbcode: `[img width=10 height=20]https://via.placeholder.com/150[/img]`,
  expected: `<img src="https://via.placeholder.com/150" width="10" height="20" />`,
});
runTest({
  bbcode: `[img=30x40]https://via.placeholder.com/150[/img]`,
  expected: `<img src="https://via.placeholder.com/150" width="30" height="40" />`,
});
runTest({
  bbcode: `[img=90]https://via.placeholder.com/150[/img]`,
  expected: `<img src="https://via.placeholder.com/150" width="90" />`,
});

runTest({
  bbcode: `[ol]
  [li]ol 1[/li]
  [li]ol 2[/li]
[/ol]`,
  expected: `<ol>
  <li>ol 1</li>
  <li>ol 2</li>
</ol>`,
});

runTest({
  bbcode: `[list=1]
  [*] list=1 1
  [*] list=1 2
[/list]`,
  expected: `<ul>
  <li>list=1 1</li>
<li>list=1 2</li>
</ul>`,
});

runTest({
  bbcode: `[list=a]
  [*] list=a 1
  [*] list=a 2
[/list]`,
  expected: `<ul>
  <li>list=a 1</li>
<li>list=a 2</li>
</ul>`,
});

runTest({
  bbcode: `[list=A]
  [*] list=A 1
  [*] list=A 2
[/list]`,
  expected: `<ul>
  <li>list=A 1</li>
<li>list=A 2</li>
</ul>`,
});

runTest({
  bbcode: `[list=i]
  [*] list=i 1
  [*] list=i 2
[/list]`,
  expected: `<ul>
  <li>list=i 1</li>
<li>list=i 2</li>
</ul>`,
});

runTest({
  bbcode: `[list=I]
  [*] list=I 1
  [*] list=I 2
[/list]`,
  expected: `<ul>
  <li>list=I 1</li>
<li>list=I 2</li>
</ul>`,
});

runTest({
  bbcode: `[ul]
  [li]ul 1[/li]
  [li]ul 2[/li]
[/ul]`,
  expected: `<ul>
  <li>ul 1</li>
  <li>ul 2</li>
</ul>`,
});

runTest({
  bbcode: `[list]
  [*] list 1
  [*] list 2
[/list]`,
  expected: `<ul>
  <li>list 1</li>
<li>list 2</li>
</ul>`,
});

runTest({
  bbcode: `[code]
function test() {
  return true;
}
[/code]`,
  expected: `<span style="white-space:pre-wrap;font-family:monospace;">
function test() {
  return true&#59;
}
</span>`,
});

runTest({
  bbcode: `[pre]			01  andndnd.
05  andnd pic x.
05  andne pic x.[/pre]`,
  expected: `<span style="white-space:pre-wrap;font-family:monospace;">			01  andndnd.
05  andnd pic x.
05  andne pic x.</span>`,
});

runTest({
  bbcode: `[table]
  [tr]
    [th]Name[/th]
    [th]Age[/th]
  [/tr]
  [tr]
    [td]John[/td]
    [td]65[/td]
  [/tr]
[/table]`,
  expected: `<table style="border-collapse:collapse;">
  <tr>
    <th style="border:1px solid #666;">Name</th>
    <th style="border:1px solid #666;">Age</th>
  </tr>
  <tr>
    <td style="border:1px solid #666;">John</td>
    <td style="border:1px solid #666;">65</td>
  </tr>
</table>`,
});

runTest({
  bbcode: `[youtube]E7d-3-uXlZM[/youtube]`,
  expected: `<iframe width="756" height="425" src="https://www.youtube.com/embed/E7d-3-uXlZM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
});
runTest({
  bbcode: `[bbvideo]https://www.youtube.com/watch?v=E7d-3-uXlZM[/bbvideo]`,
  expected: `<iframe width="756" height="425" src="https://www.youtube.com/watch?v=E7d-3-uXlZM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
});
runTest({
  bbcode: `[previewyoutube=AZqlYZ_EdAU;full][/previewyoutube]`,
  expected: `<iframe width="756" height="425" src="https://www.youtube.com/embed/AZqlYZ_EdAU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
});

test("All Supported Tags", () => {
  const bbcode = `
Some text here.

[h1]Header 1[/h1]
[h2]Header 2[/h2]
[h3]Header 3[/h3]
[h4]Header 4[/h4]
[h5]Header 5[/h5]

[b]Bold Text[/b]
[i]Italic Text[/i]
[u]Underlined Text[/u]
[s]Strikethrough Text[/s]

[line]
[hr]
[br]

The equation x[sup]2[/sup] is a parabola.
The formula of water is H[sub]2[/sub]O

[size=20]Large Text[/size]
[font=Courier]Courier Font[/font]
[color=blue]Blue Text[/color]
[blur="red"]guide[/blur]

[center]This is some centered text[/center]
[left]This is some left aligned text[/left]
[right]This is some right aligned text[/right]

[quote]This is a quote[/quote]
[quote="John"]Quote from John[/quote]

[spoiler]The hero dies at the end![/spoiler]
[spoiler=What happens to the hero?]The hero dies at the end![/spoiler]

[url]https://example.com[/url]
[url=https://example.com]Example Link[/url]
https://www.youtube.com/watch?v=3l1ABr0Jm2M
https://store.steampowered.com/app/2096570/Another_Fishermans_Tale/
https://google.com
http://google.com

[email]test@example.com[/email]

[img]https://via.placeholder.com/150[/img]
[img width=10 height=20]https://via.placeholder.com/150[/img]
[img=30x40]https://via.placeholder.com/150[/img]
[img=90]https://via.placeholder.com/150[/img]

[ol]
[li]ol 1[/li]
[li]ol 2[/li]
[/ol]

[list=1]
[*] list=1 1
[*] list=1 2
[/list]

[list=a]
[*] list=a 1
[*] list=a 2
[/list]

[list=A]
[*] list=A 1
[*] list=A 2
[/list]

[list=i]
[*] list=i 1
[*] list=i 2
[/list]

[list=I]
[*] list=I 1
[*] list=I 2
[/list]

[ul]
[li]ul 1[/li]
[li]ul 2[/li]
[/ul]

[list]
[*] list 1
[*] list 2
[/list]

[code]
function test() {
return true;
}
[/code]

[pre]			01  andndnd.
05  andnd pic x.
05  andne pic x.[/pre]

[table]
[tr]
[th]Name[/th]
[th]Age[/th]
[/tr]
[tr]
[td]John[/td]
[td]65[/td]
[/tr]
[/table]

[youtube]E7d-3-uXlZM[/youtube]
[bbvideo]https://www.youtube.com/watch?v=E7d-3-uXlZM[/bbvideo]
[previewyoutube=AZqlYZ_EdAU;full][/previewyoutube]`;
  const expected = `<div style="white-space:pre-wrap;">
Some text here.

<h1>Header 1</h1>
<h2>Header 2</h2>
<h3>Header 3</h3>
<h4>Header 4</h4>
<h5>Header 5</h5>

<span style="font-weight:bold;">Bold Text</span>
<span style="font-style:italic">Italic Text</span>
<span style="text-decoration:underline;">Underlined Text</span>
<span style="text-decoration:line-through;">Strikethrough Text</span>

<hr/>
<hr/>
<br/>

The equation x<sup>2</sup> is a parabola.
The formula of water is H<sub>2</sub>O

<span style="font-size:20px;">Large Text</span>
<span style="font-family:Courier">Courier Font</span>
<span style="color:blue">Blue Text</span>
<span style="color:red;filter:blur;">guide</span>

<span style="margin-left:auto;margin-right:auto;display:block;text-align:center;">This is some centered text</span>
<span style="display:block;text-align:left">This is some left aligned text</span>
<span style="display:block;text-align:right">This is some right aligned text</span>

<blockquote>This is a quote</blockquote>
<blockquote><strong>John says:</strong> Quote from John</blockquote>

<a style="display:block;" href="#" onclick='event.target.nextElementSibling.style.display = event.target.nextElementSibling.style.display === "block" ? "none" : "block"'>Show spoiler</a><div style="display:none;">The hero dies at the end!</div>
<a style="display:block;" href="#" onclick='event.target.nextElementSibling.style.display = event.target.nextElementSibling.style.display === "block" ? "none" : "block"'>What happens to the hero?</a><div style="display:none;">The hero dies at the end!</div>

<a href="https://example.com">https://example.com</a>
<a href="https://example.com">Example Link</a>
<a href="https://www.youtube.com/watch?v=3l1ABr0Jm2M">https://www.youtube.com/watch?v=3l1ABr0Jm2M</a>
<a href="https://store.steampowered.com/app/2096570/Another_Fishermans_Tale/">https://store.steampowered.com/app/2096570/Another_Fishermans_Tale/</a>
<a href="https://google.com">https://google.com</a>
<a href="http://google.com">http://google.com</a>

<a href="mailto:test@example.com">test@example.com</a>

<img src="https://via.placeholder.com/150" />
<img src="https://via.placeholder.com/150" width="10" height="20" />
<img src="https://via.placeholder.com/150" width="30" height="40" />
<img src="https://via.placeholder.com/150" width="90" />

<ol>
<li>ol 1</li>
<li>ol 2</li>
</ol>

<ul>
<li>list=1 1</li>
<li>list=1 2</li>
</ul>

<ul>
<li>list=a 1</li>
<li>list=a 2</li>
</ul>

<ul>
<li>list=A 1</li>
<li>list=A 2</li>
</ul>

<ul>
<li>list=i 1</li>
<li>list=i 2</li>
</ul>

<ul>
<li>list=I 1</li>
<li>list=I 2</li>
</ul>

<ul>
<li>ul 1</li>
<li>ul 2</li>
</ul>

<ul>
<li>list 1</li>
<li>list 2</li>
</ul>

<span style="white-space:pre-wrap;font-family:monospace;">
function test() {
return true&#59;
}
</span>

<span style="white-space:pre-wrap;font-family:monospace;">			01  andndnd.
05  andnd pic x.
05  andne pic x.</span>

<table style="border-collapse:collapse;">
<tr>
<th style="border:1px solid #666;">Name</th>
<th style="border:1px solid #666;">Age</th>
</tr>
<tr>
<td style="border:1px solid #666;">John</td>
<td style="border:1px solid #666;">65</td>
</tr>
</table>

<iframe width="756" height="425" src="https://www.youtube.com/embed/E7d-3-uXlZM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<iframe width="756" height="425" src="https://www.youtube.com/watch?v=E7d-3-uXlZM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<iframe width="756" height="425" src="https://www.youtube.com/embed/AZqlYZ_EdAU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
  const actual = BBCode2Html({
    text: bbcode,
    removeMisalignedTags: true,
    addInLineBreaks: true,
  }).html;

  expect(actual).toBe(expected);
});
