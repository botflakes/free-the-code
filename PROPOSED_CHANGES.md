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

### 1a) Bambu item — re-add as “ecosystem restrictions” (not GPL)
Insert this list item in the Industry Context list (suggested position: after the Marlin/Linux derivatives item):

```html
<li>
  <strong>Bambu Lab (ecosystem restrictions):</strong> Recent firmware introduced an authorization control system that blocks custom firmware and restricts third‑party slicers from wireless transfers. "Bambu Connect" provides a limited bridge; community notes reduced direct access and accessory compatibility.
  </li>
```

### 2) Chitu Systems involvement — expand Industry bullet
Replace the existing `Chitu‑supplied platforms` list item under Industry Context with the following to broaden scope and note proprietary ecosystems:

```html
<li>
  <strong>Chitu‑supplied platforms:</strong> Shared firmware stacks used across brands (e.g., Anycubic; some Creality models historically) have led to shipments that include modified GPL components without corresponding source. Supplier contracts do not remove the distributor’s GPL obligations. Chitu Systems' firmware and hardware are proprietary, which can constrain user modification and repairability.
</li>
```

### 3) Legal & Policy — adjust “Chitu involvement” bullet
Replace the `Chitu involvement` bullet with this copy to capture supplier dynamics and historical Creality usage:

```html
<li><strong>Chitu involvement:</strong> Code suggests Chitu involvement and similarities to Anycubic Kobra 2 Pro; some Creality models have historically used Chitu platforms. This affects who receives compliance requests and clarifies that OEM/supplier contracts do not negate GPL obligations.</li>
```

### 4) Updates — expand Chitu note
Replace the existing Chitu-related update with the following (you can later append a verified model list):

```html
<li>Chitu likely involved; similarities to Anycubic Kobra 2 Pro firmware observed; note: some Creality models have historically used Chitu‑supplied platforms [add specific model list once verified].</li>
```

### 5) Evidence/Issue — add vendor statement clarification (optional)
Add this info box either at the end of `The Issue` card or at the top of `Technical Evidence` to acknowledge public statements vs. community findings:

```html
<div class="info">
  <strong>Vendor statement:</strong> Elegoo has publicly stated that the Centauri Carbon OS is not based on Klipper. This page aggregates community technical evidence indicating Klipper‑based components and modifications; if confirmed, GPL‑3.0 requires providing the complete corresponding source to users of the distributed binaries.
</div>
```

### Sources for context
- Hackster review note (Elegoo statement): [Elegoo Centauri Carbon 3D printer review](https://www.hackster.io/news/elegoo-centauri-carbon-3d-printer-review-c57caab085e1)
- Chitu proprietary ecosystem context: [Chitu Systems and CHITUBOX: a lesson in fighting open‑source 3D printing](https://3dprintingindustry.com/news/chitu-systems-and-chitubox-a-lesson-in-fighting-open-source-3d-printing-194783/)


