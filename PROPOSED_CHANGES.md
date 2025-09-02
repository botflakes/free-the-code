## Proposed content updates for index.html (no changes applied yet)

This document provides copy-pasteable HTML snippets and precise placement notes. These reflect recent discussions and clarify Bambu, Chitu, and Creality context without implying GPL violations where not appropriate.

### 1) Industry Context intro — replace paragraph
Replace the introductory paragraph under the `Industry Context` card with:

```html
<p>
  Unfortunately, Elegoo isn't alone in problematic practices. Some vendors have
  GPL compliance issues; others impose ecosystem restrictions (not GPL violations):
</p>
```

### 1a) Bambu item — for future discussion only (not part of this PR)
Keep this snippet here only for potential future use. Do not include it in this PR.

```html
<!-- NOT FOR THIS PR: Bambu ecosystem restrictions example -->
<li>
  <strong>Bambu Lab (ecosystem restrictions):</strong> Recent firmware introduced an authorization control system that blocks custom firmware and restricts third‑party slicers from wireless transfers. "Bambu Connect" provides a limited bridge; community notes reduced direct access and accessory compatibility.
</li>
```

### 2) Chitu Systems involvement — expand Industry bullet
Replace the existing `Chitu‑supplied platforms` list item under Industry Context with the following to broaden scope and note proprietary ecosystems. Language is qualified and includes citation placeholders:

```html
<li>
  <strong>Chitu‑supplied platforms:</strong> Shared firmware stacks used across brands (e.g., Anycubic; some Creality models historically) have, in some cases, resulted in distributions missing corresponding source for modified GPL components <!-- add citations -->. Supplier contracts do not remove the distributor’s GPL obligations. Chitu Systems' firmware and hardware are proprietary, which can constrain user modification and repairability.
</li>
```

### 3) Legal & Policy — adjust “Chitu involvement” bullet
Replace the `Chitu involvement` bullet with this copy to capture supplier dynamics and historical Creality usage (with citation placeholders):

```html
<li><strong>Chitu involvement:</strong> Analysis suggests Chitu involvement with similarities to Anycubic Kobra 2 Pro <!-- add citation -->; some Creality models historically used Chitu platforms. This clarifies who should receive compliance requests and that OEM/supplier contracts do not negate GPL obligations.</li>
```

### 4) Updates — expand Chitu note
Replace the existing Chitu-related update with the following. Track specific model listing as a TODO in the repo, not in shipped copy:

```html
<li>Chitu involvement likely; similarities to Anycubic Kobra 2 Pro firmware observed <!-- add citation -->; note: some Creality models historically used Chitu‑supplied platforms.</li>
```

### 5) Evidence/Issue — add vendor statement clarification (optional)
Add this info box either at the end of `The Issue` card or at the top of `Technical Evidence` to acknowledge public statements vs. community findings. Keep the tone neutral and add a citation placeholder:

```html
<div class="info">
  <strong>Vendor statement:</strong> Elegoo has publicly stated that the Centauri Carbon OS is not based on Klipper <!-- add citation -->. This page aggregates community technical indicators of Klipper‑based components and modifications. If confirmed, GPL‑3.0 requires providing the complete corresponding source to users of the distributed binaries.
</div>
```

### Sources for context (add archival links where possible)
- Hackster review note (Elegoo statement): [Elegoo Centauri Carbon 3D printer review](https://www.hackster.io/news/elegoo-centauri-carbon-3d-printer-review-c57caab085e1) • archive: <!-- add archive link -->
- Chitu proprietary ecosystem context: [Chitu Systems and CHITUBOX: a lesson in fighting open‑source 3D printing](https://3dprintingindustry.com/news/chitu-systems-and-chitubox-a-lesson-in-fighting-open-source-3d-printing-194783/) • archive: <!-- add archive link -->

### Optional link hardening in Good Actors section
If desired, replace plain names with official links:

```html
<li><strong><a href="https://www.prusa3d.com/" target="_blank" rel="noopener noreferrer">Prusa Research</a></strong> — Open‑source printers, firmware, and PrusaSlicer; strong community engagement and documentation.</li>
<li><strong><a href="https://lulzbot.com/" target="_blank" rel="noopener noreferrer">LulzBot (FAME 3D)</a></strong> — Historically 100% open‑source; robust printers that encourage user modification.</li>
```


