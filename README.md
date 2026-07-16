# CC 106 Class Materials — GitHub Pages

This folder is ready to publish as a static GitHub Pages website.

## Publish through the GitHub website

1. Create a new public repository on GitHub, for example `cc106-class-materials`.
2. Upload **all files and folders inside this package** to the repository root. `index.html` must remain in the root.
3. Open the repository **Settings**.
4. Select **Pages** in the left menu.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and the `/ (root)` folder, then click **Save**.
7. GitHub will display the public website address after deployment.

## Important

- Keep the `assets` folder and all HTML lesson files beside `index.html`.
- Do not rename lesson files unless you also update their links in `index.html`.
- Student completion marks are stored in each browser through `localStorage`; they are not submitted to the teacher.

## Publishing lessons gradually

The landing page includes every planned lesson card. You do not need to upload all lesson files at once.

- Keep `index.html` unchanged.
- Upload only the lesson HTML files you are ready to release.
- A missing lesson file is automatically shown as **Locked — Not yet available** on GitHub Pages.
- Uploading that file later automatically unlocks the lesson; no landing-page edit is required.

Automatic file checking works on the hosted GitHub Pages site. When opening `index.html` directly from a computer, browsers restrict file checks, so the lock detection is intentionally skipped.
