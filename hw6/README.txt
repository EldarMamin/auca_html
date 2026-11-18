MercyMed — Assignment 6, revised static website
================================================

Ready for: GitHub Pages at https://eldarmamin.github.io/auca_html/hw6/
Framework: plain HTML + CSS + JavaScript. No npm, React or server needed.

PAGES (9):
- index.html             Homepage and labeled team preview
- services.html          Services and clear specialty listing
- team.html              Ten short team profiles and specialty filters
- corporate.html         NEW — For corporate clients / organisations
- education.html         NEW — Medical education
- about.html             Clinic history, vision and education link
- mobile-clinics.html    Regional charitable work
- contact.html           Honest unconfirmed contact and opening-hours placeholders
- appointment.html       Demonstration booking flow, NEVER sends patient data

REVIEW FEEDBACK ADDRESSED:
- Dedicated sections for corporate clients and medical education.
- Homepage links and site-wide navigation to the two new sections.
- Team preview names and roles are linked to specific team profiles.
- Team profiles include one-line descriptions and language status (where known).
- Non-doctors are called team members, not doctors.
- Appointment button reads "Preview demo (not sent)" and WhatsApp status is visible.
- Removed name/date inputs to discourage real personal/medical data in demo.
- Mobile menu has aria-label, expanded state and keyboard Escape support.
- Clinic opening in October 2023 is distinguished from outreach work begun 10+ years ago.
- Client-supplied photos were intentionally replaced by labeled placeholders.
  Photo permissions are NOT confirmed. Only logo/favicon are included.
  Obtain explicit client permission before displaying identifiable staff or patient photos.
- Site language toggles EN, RU, KG. Kyrgyz wording must be reviewed by the clinic.

TO DEPLOY INTO THE EXISTING GITHUB REPO:
1. Use a real Git clone of the 'auca_html' repository (not a Download ZIP folder).
2. Replace the entire existing 'hw6' folder with THIS 'hw6' folder.
   IMPORTANT: remove stale old .jpg photos from the old hw6/images folder.
3. Open the real repository folder in VS Code and run:
      git add -A hw6
      git commit -m "Improve MercyMed HW6 based on instructor feedback"
      git push origin main
4. Wait for GitHub Pages deployment and refresh the page.

TEST MANUALLY AFTER PUBLISHING:
- Open index.html, services.html, team.html, corporate.html, education.html.
- Switch EN / RU / KG on different pages.
- At a width of 375 px, open the mobile menu and navigate to corporate & education.
- Filter the team and use a homepage team preview tile to open the correct profile.
- Click appointment demo and confirm that it does not send any data.
- Confirm that the browser has no broken image links or horizontal scrolling.

SOURCE BOUNDARIES:
This is a classroom prototype based on client-provided materials, NOT a live
booking system. Contacts, photo permissions, staffing, discounts, prices,
training dates and translation approval remain subject to clinic confirmation.
