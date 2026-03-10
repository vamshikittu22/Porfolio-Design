# Phase 7: Badges and certifications showcase - Research

**Researched:** 2026-03-10  
**Domain:** Digital credential verification & immersive portfolio UI  
**Confidence:** MEDIUM

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
_No CONTEXT.md supplied; no locked decisions recorded._

### Claude's Discretion
_No CONTEXT.md supplied; entire phase currently under researcher discretion._

### Deferred Ideas (OUT OF SCOPE)
_No CONTEXT.md supplied; none recorded._
</user_constraints>

## Summary

Phase 7 must turn otherwise static resume bullets into trustable, verifiable credentials governed by the 1EdTech Open Badges 3.0 spec and the W3C Verifiable Credentials Data Model v2.0, while keeping the portfolio’s glass-morphism visual language intact. Every badge needs resolvable metadata (issuer profile, achievement definition, criteria, image, revocation status) plus an embeddable JSON-LD twin so the AI companion and search engines can reason about the accomplishments (Open Badges Spec v3.0, 2025-11-06; Open Badges Implementation Guide, 2025-04-07). The UI will succeed only if it lets visitors filter by skill clusters, verify authenticity at a glance, and dive into supporting evidence without performance regressions.

**Primary recommendation:** Build the badge showcase as a standards-first data pipeline (OpenBadgeCredential → normalized TypeScript model → animated React grid + Schema.org JSON-LD) so planning tasks can focus on fetch, validation, visualization, and verifiability checkpoints rather than bespoke badge logic.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 19.0.0 | Chapter layout + badge interactivity | Already powers the portfolio; keeps Phase 7 aligned with existing hooks/components. |
| TypeScript | 5.3.3 | Strong typing for badge schemas and API responses | Needed to keep badge parsing/refinement predictable during plan implementation. |
| Vite | 5.0.10 | Dev/build toolchain | Same bundler as other chapters; share config for code splitting and lazy badge routes. |
| Tailwind CSS | 3.4.19 | Glass-morphism theme tokens, responsive grids | Ensures spacing/blur tokens from earlier phases stay consistent. |
| Framer Motion | 11.18.2 | Scroll-based badge reveals, hover micro-interactions | Already installed; handles staggered animations with reduced boilerplate.

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| zod | 4.3.6 | Parse/validate OpenBadgeCredential payloads before rendering | Wrap every badge data source (local JSON, CMS, API) to guarantee issuer, achievement, criteria, and proof fields exist (Zod README). |
| date-fns | 4.1.0 | Format issuance/expiration dates with locale support | Use inside badge cards/timelines; tree-shakable helpers keep bundle lean (date-fns README). |
| @heroicons/react | 2.2.0 | Status + filter glyphs that match Tailwind spacing | Use outline icons for verification states, solid icons for CTA buttons (Heroicons README). |
| jsonld | latest 8.x | Serialize Schema.org `EducationalOccupationalCredential` snippets | Avoid hand-writing compact contexts; produces valid JSON-LD for SEO + AI (Schema.org definition). |
| node-fetch/axios (server-side only) | latest | Fetch signed badge JSON or issuer metadata | Use in build scripts/server loaders to hydrate badge cache from badge issuers’ APIs.

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Tailwind utility tokens for glass panels | Vanilla CSS modules | Would fragment design tokens already standardized in earlier phases; Tailwind ensures parity. |
| zod for schema validation | io-ts / yup | zod already TypeScript-first and tiny; switching adds learning cost and less ergonomic inference. |
| date-fns for time formatting | Luxon | Luxon brings time-zone objects but adds ~2× bundle weight for simple issuance labels.

**Installation:**
```bash
npm install zod@4.3.6 date-fns@4.1.0 @heroicons/react@2.2.0 jsonld
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── data/badges/
│   ├── badge-content.ts        # Curated fallback badges (OpenBadgeCredential JSON)
│   ├── issuers.ts              # Cached issuer profile metadata + verification keys
│   └── schemas.ts              # zod schemas & shared TypeScript types
├── sections/chapter-07/
│   ├── components/
│   │   ├── BadgeGrid.tsx       # Responsive masonry/grid view
│   │   ├── BadgeDetailDrawer.tsx
│   │   └── CredentialFilters.tsx
│   ├── hooks/useBadgeFilters.ts
│   ├── index.tsx
│   └── jsonld.ts               # Schema.org + OpenGraph helpers
└── services/badges/
    ├── fetch-openbadges.ts     # Remote fetch + caching logic
    └── verify-proof.ts         # Wrapper over VC verification library
```

### Pattern 1: Standards-first Badge Data Pipeline
**What:** Fetch badge payloads in `OpenBadgeCredential` format, validate with zod, normalize to internal view models, and persist issuer metadata/keys so UI rendering never touches unverified data (Open Badges Spec v3.0 §B.1; W3C VC Data Model §4.12).
**When to use:** Any time badges come from third-party issuers (Credly, Badgr, in-house CLR feed) or when plan tasks must merge local and remote achievements.
**Example:**
```typescript
// Source: Open Badges Spec v3.0 (credentialSubject, achievement, proof fields)
const badgeCredentialSchema = z.object({
  '@context': z.array(z.union([z.string(), z.record(z.any())])),
  type: z.array(z.string()).refine((types) => types.includes('OpenBadgeCredential')),
  issuer: z.object({ id: z.string().url(), name: z.string() }),
  credentialSubject: z.object({
    achievement: z.object({ id: z.string().url(), name: z.string(), criteria: z.record(z.any()) }),
    evidence: z.array(z.record(z.any())).optional(),
  }),
  proof: z.array(z.record(z.any())).min(1),
});

export type BadgeCredential = z.infer<typeof badgeCredentialSchema>;
```

### Pattern 2: Progressive Disclosure Badge Showcase
**What:** Combine a responsive grid (3D glass tiles) with layered detail drawers that stream evidence, endorsements, and JSON-LD while keeping initial paint under 1s by lazy-loading heavy assets. Social previews should reuse OG metadata baked into issuer/achievement URLs (Open Badges Implementation Guide §3.1.1, §3.1.2, §3.5).
**When to use:** When planning tasks for Chapter 7 UI/UX, mobile-first flows, and performance acceptance criteria.
**Example:** use Framer Motion layoutGroup + staggered children per category, load detail drawer content via Suspense once a user selects a badge.

### Pattern 3: Structured Data Companion Layer
**What:** Emit Schema.org `EducationalOccupationalCredential` JSON-LD per badge plus Open Graph meta tags referencing the same URLs so search engines and AI companion share a canonical data graph (Schema.org definition; Open Badges Implementation Guide §3.5).
**When to use:** On chapter load and when dynamically injecting badge details into the AI assistant context.

### Anti-Patterns to Avoid
- **Rendering badges without resolvable issuer/achievement URLs:** breaks Open Badge verification workflow and social previews (Open Badges Implementation Guide §3.1.1).
- **Hand-rolling cryptographic proof checks in UI code:** W3C VC spec mandates verifying Data Integrity / JOSE signatures via audited libs; ad hoc implementations are brittle (§7 Verification, VC Data Model).
- **Inlining every badge image eagerly:** conflict with PERF-02; treat heavy PNG/SVG assets as lazy-loaded with `loading="lazy"` and intersection observers.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Badge schema validation | Custom TypeScript guards | Official Open Badges JSON Schema (`https://purl.imsglobal.org/spec/ob/v3p0/schema/json/ob_v3p0_achievementcredential_schema.json`) + zod wrapper | Matches normative data model so revocation/status fields are never skipped (Open Badges Spec v3.0 §E.2.1). |
| Proof verification | Homemade cryptography | Libraries that implement VC Data Model 2.0 verification for DataIntegrityProof or VC-JOSE-COSE | Spec defines canonical verification algorithm; rolling your own risks invalid proofs (§7 Verification, VC Data Model v2.0). |
| Structured data markup | Ad hoc meta tags | Schema.org `EducationalOccupationalCredential` JSON-LD | Ensures search/AI agents interpret credentials consistently (Schema.org reference). |

**Key insight:** Standards compliance (OpenBadgesCredential schema, VC verification, Schema.org JSON-LD) already covers 90% of badge complexity—custom code should focus on experience, not core credential plumbing.

## Common Pitfalls

### Pitfall 1: Missing Issuer & Achievement Endpoints
**What goes wrong:** Badge cards link nowhere or only to static PNGs, so verifiers cannot dereference issuer profiles or achievements as required by Open Badges 3.0.
**Why it happens:** Issuer metadata cached locally without also exposing the original URLs and OG metadata.
**How to avoid:** Persist `issuer.id` + `achievement.id` from the credential, surface them in CTA buttons, echo OG tags around hosted HTML (Open Badges Implementation Guide §3.1, §3.5).
**Warning signs:** Validator complains about `issuer` being a string, or preview cards show blank titles when badges are shared.

### Pitfall 2: Ignoring Credential Status/Revocation
**What goes wrong:** Expired or revoked certificates remain highlighted as current achievements.
**Why it happens:** Badge pipeline drops `credentialStatus` or `validUntil` fields when normalizing.
**How to avoid:** Include revocation endpoints in schemas, fetch status pre-render, and visually flag revoked badges; plan tasks for nightly refreshes (Open Badges Spec v3.0 §B.1.22-23).
**Warning signs:** `credentialStatus` missing; UI never shows “Expired” label even when `validUntil` past.

### Pitfall 3: Heavy Badge Assets Killing Performance
**What goes wrong:** Baking metadata into PNG/SVG without optimizing adds >1MB per badge, blowing PERF-01.
**Why it happens:** Designers export hi-res “baked badges” straight from issuer platforms (Open Badges Spec v3.0 §5.3).
**How to avoid:** Store vector badges separately, use CSS mask/gradients for glass effects, and only embed metadata when producing downloadable artifacts.
**Warning signs:** Lighthouse warns about “Largest Contentful Paint image was lazily loaded” or >3s LCP.

### Pitfall 4: No Machine-Readable Story for AI Companion
**What goes wrong:** AI assistant cannot summarize Chapter 7 accomplishments because credentials only exist in JSX props.
**Why it happens:** Structured data (Schema.org JSON-LD) omitted from DOM; data store not shared with AI context.
**How to avoid:** Maintain a canonical `BadgeRecord` store + JSON-LD emitter; feed AI context with sanitized credential summaries referencing same IDs.

## Code Examples

### OpenBadgeCredential blueprint
```json
// Source: Open Badges 3.0 Implementation Guide §2.1 Issuer quickstart
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json"
  ],
  "type": ["VerifiableCredential", "OpenBadgeCredential"],
  "issuer": {"id": "did:web:example.com:issuers:540e3...", "name": "Example Institution"},
  "credentialSubject": {
    "achievement": {
      "id": "https://example.com/achievements/c3c1ea5b-9d6b-416d-ab7f-76da1df3e8d6",
      "name": "Advanced Shoe Tie",
      "criteria": {"narrative": "# Requirements..."}
    }
  },
  "proof": [{
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-rdf-2022",
    "verificationMethod": "did:web:example.com:issuers:540e3...#key-0"
  }]
}
```

### Schema.org JSON-LD helper
```tsx
// Source: Schema.org EducationalOccupationalCredential definition
export const buildCredentialJsonLd = (badge: BadgeViewModel) => ({
  '@context': 'https://schema.org',
  '@type': 'EducationalOccupationalCredential',
  name: badge.title,
  description: badge.summary,
  credentialCategory: badge.category,
  recognizedBy: { '@type': 'Organization', name: badge.issuerName, url: badge.issuerUrl },
  validity: badge.expiresOn ? { '@type': 'Date', '@value': badge.expiresOn } : undefined,
  competencyRequired: badge.skills.map((skill) => ({
    '@type': 'DefinedTerm',
    name: skill.label,
    url: skill.frameworkUrl,
  })),
});
```

### Parsing + formatting helper
```typescript
// Source: Zod README (schema parsing) + date-fns README (format helper)
const badgeRecordSchema = badgeCredentialSchema.transform((credential) => ({
  id: credential.id ?? credential.credentialSubject.achievement.id,
  issuedOn: format(new Date(credential.validFrom ?? Date.now()), 'PPP'),
  expiresOn: credential.validUntil ? format(new Date(credential.validUntil), 'PPP') : null,
  issuerName: credential.issuer.name,
}));

export type BadgeRecord = z.infer<typeof badgeRecordSchema>;
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Static PNG badges with optional metadata | OpenBadgeCredential + DataIntegrityProof signatures | Open Badges Spec v3.0 (2025-11-06) | Enables verifiable proofs + aligns with VC wallets. |
| Manual portfolio copy describing certifications | Schema.org `EducationalOccupationalCredential` JSON-LD per badge | Schema.org additions (2024+ updates) | Improves SEO, AI context, and chat assistant recall. |
| Email screenshots as proof | `credentialStatus` endpoints + revocation registries | Highlighted in OB 3.0 Impl. Guide §3.1.4 | Allows automated “revoked/expired” flagging in UI.

**Deprecated/outdated:**
- OB 2.0 badge assertions without VC envelope—migrate or wrap to OB 3.0 to avoid verifier incompatibility (Open Badges Spec v3.0 §6.3).

## Open Questions

1. **Data source ownership**
   - What we know: Phase 6 introduced data fetching infrastructure, but it is unclear whether Phase 7 should fetch directly from external badge APIs (Credly, Badgr) or rely on static JSON committed to the repo.
   - What's unclear: Availability of issuer API keys and rate limits.
   - Recommendation: During planning, confirm if remote APIs are in scope; default to static JSON snapshot with nightly refresh script for MVP.

2. **Credential verification surface**
   - What we know: Spec expects proof verification, but the UX placement (in-card badge vs. modal) is undecided.
   - What's unclear: Do we expose raw JSON/proof to users or keep checks server-side and show a trust badge?
   - Recommendation: Plan for server-side verification pipeline with UI trust indicators; leave raw JSON download as optional CTA.

3. **AI companion integration depth**
   - What we know: AI assistant must know the active chapter; uncertain how much badge metadata should flow into prompts.
   - What's unclear: Token budget and whether to inject summaries vs. entire credentials.
   - Recommendation: Define a summarization format (title, issuer, issuance date, verification link) so planning tasks can throttle AI context size.

## Sources

### Primary (HIGH confidence)
- 1EdTech Open Badges Specification v3.0 (Nov 6, 2025) — data model, proof, baking, API sections.  
- 1EdTech Open Badges 3.0 Implementation Guide (Apr 7, 2025) — issuer quickstart, OG/social guidance, API role guidance.  
- W3C Verifiable Credentials Data Model v2.0 (May 15, 2025) — verification workflow, proof suites, revocation guidance.  
- Schema.org `EducationalOccupationalCredential` (accessed 2026-03-10) — structured data fields, usage examples.

### Secondary (MEDIUM confidence)
- Zod README (GitHub, accessed 2026-03-10) — schema parsing patterns and installation guidance.  
- date-fns README (GitHub, accessed 2026-03-10) — date formatting API and install instructions.  
- Heroicons README (GitHub, accessed 2026-03-10) — React usage guidance for iconography.

### Tertiary (LOW confidence)
- None.

## Metadata

**Confidence breakdown:**
- Standard Stack: HIGH — drawn from existing `package.json` plus official library docs.  
- Architecture: MEDIUM — structure extrapolated from repo conventions + specs; pending confirmation of external data sources.  
- Pitfalls: MEDIUM — grounded in specs but some UX failure modes inferred from prior portfolio phases.

**Research date:** 2026-03-10  
**Valid until:** 2026-04-09 (revisit after spec/stack updates or once data-source decisions land)
