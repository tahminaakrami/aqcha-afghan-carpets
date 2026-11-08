<div align="center">

# Aqcha.

### Afghan heritage, handwoven by women

An interactive, responsive website about Afghan carpets and the women who weave, dye and embroider them.

`HTML` · `CSS` · `JavaScript` · `Bootstrap 5`

</div>

---

## Contents

1. [About the project](#about-the-project)
2. [Features](#features)
3. [Project structure](#project-structure)
4. [How to run](#how-to-run)
5. [How to change the pictures](#how-to-change-the-pictures)
6. [How to edit the content](#how-to-edit-the-content)
7. [JavaScript concepts used](#javascript-concepts-used)
8. [Responsive design](#responsive-design)
9. [Git workflow](#git-workflow)
10. [Team](#team)
11. [Notes and limits](#notes-and-limits)
12. [Credits](#credits)

---

## About the project

**Aqcha** presents Afghan handmade carpets together with the people behind them. For generations, Afghan women have knotted carpets, woven kilims, stitched khamak embroidery and pressed namad felt, often at home, passing patterns from mother to daughter. The site tells that story and lets visitors explore the craft, the process and a small collection of pieces.

This is the final **JavaScript group project**. The page is built from data (arrays and objects) and JavaScript controls, updates and validates what the visitor sees.

**Design idea:** the colours come from the carpets themselves: deep indigo, madder red, antique gold and ivory wool, with a small touch of Afghan turquoise.

## Features

| Feature                    | What the visitor sees                                                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Opening screen**         | An animated Aqcha logo with golden light, a spinning medallion and floating sparks. It stays at least 6 seconds.                        |
| **Hero**                   | Parallax background and a title that appears word by word.                                                                              |
| **Crafts of Afghan women** | Four chips (carpets, kilim, khamak embroidery, namad felt). Each one changes the text below it.                                         |
| **Three rugs that unroll** | While scrolling, three carpets unroll side by side, one after the other, and grow slightly.                                             |
| **Collection**             | Three cards with 3D tilt and a moving light. The small arrow opens a details card with story, origin, materials, dyes, size and weaver. |
| **Details card**           | Links to the other pieces, and an "Enquire" button that selects the piece in the contact form.                                          |
| **The craft**              | Four steps (wool, dye, weave, finish) with a progress line. Works with the mouse and the left/right arrow keys.                         |
| **Contact form**           | Every field is checked before sending, with live messages and a thank-you card.                                                         |
| **Atmosphere**             | Moving waves between sections, fixed carpet-pattern backgrounds, scroll progress bar, golden cursor ring on desktop.                    |
| **Accessibility**          | Keyboard focus styles, labels on buttons, and reduced-motion support.                                                                   |

## Project structure

```
aqcha/
├── index.html        Page structure (Bootstrap grid and navbar)
├── style.css         All styling, animations and responsive rules
├── script.js         Part 1: picture names
│                     Part 2: content (arrays of objects)
│                     Part 3: all interactive logic
├── README.md
└── images/           Photos of the site
    ├── hero.jpg, story1.jpg, story2.jpg
    ├── rug1.jpg, rug2.jpg, rug3.jpg
    ├── col1.jpg, col2.jpg, col3.jpg
    ├── craft.jpg, bg-quote.jpg
    └── extra/        Unused photos
```

The five sections of the navigation bar are marked in `index.html` with comments that show who wrote each one (see [Team](#team)).

## How to run

1. Download or clone the project.
2. Open `index.html` in a browser (double click). That is all.

You need an internet connection the first time, because fonts and Bootstrap load from the web. In VS Code you can also use the _Live Server_ extension.

**Tested for:** current Chrome, Edge, Firefox and Safari.

## How to change the pictures

Every picture is controlled from **Part 1 of `script.js`** (the `IMAGES` list near the top).

1. Put your photo in the `images/` folder.
2. Save it with the **same name** as in the list (for example `rug1.jpg`). The extension can be jpg, jpeg, png, webp or avif.
3. Reload the page with `Ctrl + F5`.

| Name                   | Where it appears                                   |
| ---------------------- | -------------------------------------------------- |
| `hero`                 | Big photo behind the title (wide photos look best) |
| `story1`, `story2`     | Two photos in "A heritage you can feel"            |
| `rug1`, `rug2`, `rug3` | The three rugs that unroll (tall photos look best) |
| `col1`, `col2`, `col3` | The three collection cards and their details card  |
| `craft`                | Photo in "Slow hands. Endless stories."            |
| `bgQuote`              | Faint fixed background behind the quote            |

You can also write a different file name or a full web link (`https://...`) in the list.
If a picture is not found, the box shows a small label with the exact file name it was looking for. Set `SHOW_PLACEHOLDERS` to `true` to also show a woven pattern in empty boxes.

## How to edit the content

Part 2 of `script.js` holds the text as arrays of objects. Change it and the page updates itself:

- `PIECES`: the three carpets (title, story, origin, dyes, size, weaver, months of work)
- `CRAFTS`: the four crafts of Afghan women
- `PROCESS`: the four steps of making a carpet

Other small settings:

| What                | Where                                               |
| ------------------- | --------------------------------------------------- |
| Opening screen time | `LOADER_MIN_MS` in `script.js` (6500 = 6.5 seconds) |
| Colours             | The `:root` variables at the top of `style.css`     |
| Site name           | Search for `Aqcha` in `index.html`                  |

## JavaScript concepts used

| Concept              | Where to find it in `script.js`                                                                                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Conditions**       | The `if / else` checks inside `validators`, in `setSlot`, `initCursor` and in the form `submit` handler                                                                                             |
| **Loops**            | `for...of` over the validators when the form is sent, `forEach` in `loadAllImages` and `initCollection`                                                                                             |
| **Functions**        | Helpers (`$`, `$$`, `clamp`), `setSlot`, `tryLoad`, `showStep`, `fillModal`, `checkField`, and one validator function per field                                                                     |
| **Arrays**           | `PIECES`, `CRAFTS`, `PROCESS` and `PALETTES`                                                                                                                                                        |
| **Array methods**    | `map` (builds cards, chips and tabs), `filter` (related pieces), `find` (picks one piece or craft), `reduce` (total months of handwork), `findIndex` (current step), `forEach`, `includes`, `slice` |
| **Objects**          | Every piece is an object with a nested `details` object. `Object.entries` and `Object.keys` loop over objects                                                                                       |
| **DOM manipulation** | `renderCollection`, `renderCrafts`, `renderProcess`, `fillModal`, `showStep`, class toggles and `innerHTML` updates                                                                                 |
| **Events**           | `click`, `mousemove`, `mouseleave`, `mouseover`, `keydown`, `input`, `blur`, `submit`, `scroll`, `resize`, `load`, `DOMContentLoaded`                                                               |
| **Form validation**  | `validators`, `checkField` and `initContactForm` (see below)                                                                                                                                        |

### Form validation rules

| Field     | Rule                                                        |
| --------- | ----------------------------------------------------------- |
| Full name | Required, at least 2 characters, letters only               |
| Email     | Required, must look like a real email address               |
| Phone     | Optional, but if filled it must have 7 to 15 digits         |
| Interest  | One option must be chosen                                   |
| Message   | At least 20 and at most 600 characters, with a live counter |
| Consent   | The box must be ticked                                      |

Errors appear under each field while typing. On send, all fields are checked in a loop, the first broken field gets focus, and a count of problems is shown. When everything is correct, a thank-you card appears.

## Responsive design

- Bootstrap grid and navbar (the menu collapses on small screens).
- Two own breakpoints in `style.css`: `991px` (tablet) and `767px` (phone).
- On phones the three unrolling rugs stay side by side, the collection becomes a two-column grid and the hover effects switch off where there is no mouse.

## Git workflow

Each member works on a **feature branch** and merges into `main` through a pull request.

| Branch                 | Content                             |
| ---------------------- | ----------------------------------- |
| `main`                 | The working version                 |
| `feature/home`         | Section 1, opening screen           |
| `feature/our-story`    | Section 2, crafts chips             |
| `feature/rugs`         | Section 3, unrolling rugs and waves |
| `feature/collection`   | Section 4, cards and details card   |
| `feature/the-craft`    | Section 5, process steps            |
| `feature/contact-form` | Contact form and validation         |
| `docs/readme`          | This file                           |

**Commit messages** are short and say what changed:

```
Add word-by-word title animation to hero
Fix wave covering the rug names
Add email check to contact form
```

**Useful commands:**

```bash
git checkout -b feature/home        # create and open your branch
git add .                           # stage your changes
git commit -m "Add hero parallax"   # save a step
git push -u origin feature/home     # upload the branch
git checkout main && git pull       # update main
git merge feature/home              # merge when the work is done
```

## Team

Every section of the navigation bar has a comment in `index.html` with the name of its author.

| Member      | Section       | Main content                               |
| ----------- | ------------- | ------------------------------------------ |
| **Tahmina** | 1. Home       | Hero, title animation, scroll cue          |
| **Zahra**   | 2. Our Story  | Story text, crafts of Afghan women, photos |
| **Sahar**   | 3. Rugs       | Three rugs that unroll on scroll           |
| **Samaneh** | 4. Collection | Collection cards and details card          |
| **Susan**   | 5. The Craft  | Process steps and craft text               |

## Notes and limits

- The details of each carpet in Part 2 of `script.js` are **sample text**. Replace them with the real information about your pieces.
- The contact form works in the browser only and does not send an email yet. To send real messages, connect it to a form service.
- Fonts and Bootstrap load from the internet.
- Some effects (fixed backgrounds, animated waves, CSS masks) need a modern browser.

**Ideas for the future:** more carpets and a filter, Dari and Pashto versions of the text, a page for each weaver, and a real order or enquiry system.

## Credits

- Fonts: _Cormorant Garamond_ and _DM Sans_ (Google Fonts)
- Framework: Bootstrap 5.3
- Photos: the group's own carpet photographs

<div align="center">

_Made with patience, like the carpets._

</div>
