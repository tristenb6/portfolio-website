Project page template
=====================

Use `projects/_template/index.html` as the starting point for new project pages. It already places the “Back to Portfolio” button to the top-right inline with the title and omits the bottom back button.

How to create a new project
- Copy the entire `_template` folder to your target category and rename it, e.g. `projects/photography/my-new-shoot/`.
- Keep the file name `index.html` inside the new folder.
- Paths are set for a 3-level depth (../../../); keep the folder depth consistent with other projects.
- Update placeholders:
  - Title in the `<title>` tag and `<h1>`
  - Metadata line (Category • Year • Location)
  - Role/Tools/Summary
  - Replace the example content grid with your images/content
- Leave the header as-is (brand only, no back link in header).

Navigation
- The bottom section includes only Prev/Next placeholders; wire these up if you add sequencing between projects.

