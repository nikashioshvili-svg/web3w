# Web3 Warsaw Jekyll + Decap CMS

Ready for Netlify.

## Deploy
1. Drag/drop this folder or connect it to a GitHub repository on Netlify.
2. In Netlify, enable **Identity**.
3. Enable **Git Gateway** under Identity services.
4. Visit `/admin` and log in.

## Content editing
Most content lives in `_data/*.yml` and is editable from Decap CMS:
- Site settings / hero / about / CTA / footer: `_data/site.yml`
- Tickets: `_data/tickets.yml`
- Speakers: `_data/speakers.yml`
- Sponsors: `_data/sponsors.yml`
- Agenda: `_data/agenda.yml`
- Event info cards: `_data/venue.yml`

Uploads from the CMS are stored in `assets/uploads`.
