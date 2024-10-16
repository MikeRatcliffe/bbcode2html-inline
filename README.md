# bbcode2html

bbcode2html is an open-source project licensed under the GNU General Public License version 3.0 or later (GPL-3.0-or-later).

## About

bbcode2html is a BBCode parser for converting BBCode into an HTML string.

Instead of depending on external stylesheets, this parser generates HTML with inline styles and inline click handlers only.

This means there are absolutely no dependencies. You can use this parser in any JavaScript project without any issues.

## Supported Tags

We have done our best to support all BBCode tags but there could be more that we don't know about. If you find any tags that we are missing then feel free to check the [contributing](#contributing) section and submit a pull request.

The following BBCode tags are supported:

```markdown
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

[pre] 01 andndnd.
05 andnd pic x.
05 andne pic x.[/pre]

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
[previewyoutube=AZqlYZ_EdAU;full][/previewyoutube]
```

## Contributing

We welcome contributions to bbcode2html! If you're interested in helping out, here's how to get started:

### Fork This Repository

1. Click on the `[Fork]` button. This button is located at the top right corner of the repository page.
2. Choose the account to fork to. If you have multiple accounts, you'll be asked to choose which account to fork the repository to.
3. Wait for the fork to complete. GitHub will create a copy of the repository in your chosen account.
4. After the fork is complete, you'll be redirected to the forked repository. You can now make changes to the code and submit pull requests to the original repository.

### Clone The Repository

```sh
git clone https://github.com/MikeRatcliffe/bbcode2html-inline
```

### Install Dependencies

```sh
cd bbcode2html-inline
npm install
```

### Start The Development Server

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

### Make Changes

1. Create a new branch: `git checkout -b my-branch-name`
2. Make your changes
3. If you have added a tag then please add it to `README.md`
4. Add a test to `src/bbcode2html.test.ts`
5. Test your changes using `npm run test`
6. Add your changes: `git add .`
7. Commit your changes: `git commit -m 'feat: Add [someawesometag]'`
8. Push to your fork: `git push origin my-branch-name`
9. Create a pull request

## License

This project is licensed under the GNU General Public License version 3.0 or later (GPL-3.0-or-later). See the [LICENSE](LICENSE) file for details.

## Contact

For more information, please contact Mike Ratcliffe at [michael@ratclifffamily.org](mailto:michael@ratclifffamily.org).
