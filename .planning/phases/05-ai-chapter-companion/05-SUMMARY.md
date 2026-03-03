# Phase 5: AI Chapter Companion - Planning Summary

**Status:** Planned  
**Requirements:** AI-01, AI-02, AI-03, AI-04  
**Goal:** Enhance AI chatbot with chapter context awareness and navigation capabilities

## Overview

Phase 5 transforms the existing ChatAssistant from a generic portfolio Q&A bot into an intelligent chapter-aware companion that understands where users are in their journey and can guide them to relevant content.

## Architecture

### Core Components

1. **Chapter Content Registry** (`data/chapterContent.ts`)
   - Maps each chapter to its content sections and theme
   - Provides context prompts for AI guidance
   - Single source of truth for chapter-specific knowledge

2. **Enhanced ChatService** (`services/chatService.ts`)
   - Accepts currentChapter parameter
   - Injects chapter context into system prompts
   - Provides navigation awareness to AI
   - Maintains conversation history with context switching

3. **Context-Aware ChatAssistant** (`components/layout/ChatAssistant/ChatAssistant.tsx`)
   - Integrates with NavigationContext
   - Dynamically updates suggestions per chapter
   - Inherits chapter theme colors via data-chapter pattern
   - Displays current chapter indicator in header

## Wave Structure

### Wave 1: Chapter Context Awareness (05-01)
**Goal:** Enable AI to understand and reference current chapter context

**Key Features:**
- Chapter content registry with themes and context prompts
- NavigationContext integration into ChatAssistant
- Chapter context injection into Gemini system prompts
- Dynamic suggestion chips per chapter

**Deliverables:**
- ✅ AI knows which chapter user is viewing (AI-01)
- ✅ AI can inject chapter-specific context (AI-02)
- ✅ Suggestions adapt to current chapter

### Wave 2: Navigation Assistant (05-02)
**Goal:** Add navigation capabilities and global accessibility

**Key Features:**
- AI can suggest relevant chapters based on questions
- Chapter theme colors applied to ChatAssistant
- Chapter indicator in chat header
- Navigation-themed suggestion chips

**Deliverables:**
- ✅ Chatbot accessible across all chapters (AI-03)
- ✅ Enhanced Gemini integration with navigation (AI-04)
- ✅ Visual theming matches chapter context
- ✅ AI guides users to related content

## Data Flow

```
User in Chapter 2 → ChatAssistant
                   ↓
     useNavigation() gets currentChapter = '02-builder'
                   ↓
     handleSend() passes to ChatService.sendMessage('...', '02-builder')
                   ↓
     ChatService.getContext('02-builder')
                   ↓
     getChapterContext('02-builder') returns:
       - Theme: "Technical depth and what I create"
       - Sections: Projects, GitHub
       - Guidance: "Emphasize project portfolio..."
                   ↓
     System instruction to Gemini includes:
       - Resume data
       - Chapter context
       - Navigation map of all chapters
                   ↓
     AI response tailored to Chapter 2 context
```

## Success Metrics

| Requirement | Validation Method |
|-------------|------------------|
| AI-01: Knows current chapter | Ask "What chapter am I in?" → Correct response |
| AI-02: Injects chapter context | Ask about topic → Response references chapter theme |
| AI-03: Accessible everywhere | Verify ChatAssistant visible in all 6 chapters + landing |
| AI-04: Enhanced Gemini integration | Ask "Where should I go?" → AI suggests chapters |

## Technical Decisions

### 1. Chapter Content Registry Pattern
**Decision:** Create separate `chapterContent.ts` registry instead of embedding in CHAPTERS  
**Rationale:**
- Separation of concerns (navigation metadata vs AI context)
- Easier to extend with section-specific context later
- Keeps CHAPTERS registry clean and focused

### 2. Context Injection Strategy
**Decision:** Inject chapter context into every message, not just session start  
**Rationale:**
- Handles mid-session navigation (user switches chapters during chat)
- Context always fresh and accurate
- Minimal overhead with Gemini's efficient processing

### 3. Navigation Suggestions Approach
**Decision:** Conversational suggestions via AI, not clickable navigation links  
**Rationale:**
- Keeps UX simple and consistent
- Users can choose to navigate manually
- Preserves assistant role (advisory, not controlling)
- Future enhancement: Could parse responses for chapter mentions and add quick links

### 4. Theme Integration Method
**Decision:** Use existing data-chapter pattern from Phase 4  
**Rationale:**
- Zero additional CSS needed
- Consistent with rest of portfolio theming
- ChatAssistant automatically inherits chapter colors
- No prop drilling or context nesting

## Integration Points

### Existing Systems
- **NavigationContext:** Provides currentChapter state
- **Theme System:** data-chapter pattern for color theming
- **GeminiService:** Unchanged, ChatService wraps it
- **Glass Morphism:** ChatAssistant already uses glass styling

### New Interfaces

**ChapterContentMap:**
```typescript
interface ChapterContentMap {
  sections: string[];
  theme: string;
  contextPrompt: string;
}
```

**Enhanced ChatService:**
```typescript
sendMessage(message: string, currentChapter: ChapterId | null): Promise<string>
```

## File Structure

```
.planning/phases/05-ai-chapter-companion/
├── 05-01-PLAN.md        # Chapter context awareness
├── 05-02-PLAN.md        # Navigation assistant
└── 05-SUMMARY.md        # This file

data/
└── chapterContent.ts    # NEW: Chapter-to-content mapping

services/
└── chatService.ts       # MODIFIED: Accepts currentChapter param

components/layout/ChatAssistant/
└── ChatAssistant.tsx    # MODIFIED: Integrates NavigationContext
```

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Context bloat in prompts | Keep chapter context concise (theme + guidance only) |
| AI hallucinating chapters | Provide exact chapter list in system instruction |
| Performance overhead | Use existing sessionStorage caching in GeminiService |
| Navigation conflicts | Maintain ChatAssistant at z-index 200 (above chapter UI) |

## Future Enhancements (Post-v1)

1. **Deep Linking:** Parse AI responses for chapter mentions, add clickable quick-nav buttons
2. **Section-Level Context:** If user scrolls to specific section, inject section-specific context
3. **Smart Suggestions:** Track user behavior, suggest chapters they haven't visited
4. **Voice Navigation:** "Take me to my projects" → Auto-navigate to Chapter 2
5. **Reading Progress:** "Where was I?" → AI remembers last visited chapter
6. **Multi-Language:** Translate chapter context prompts for i18n support

## Testing Strategy

### Manual Testing (Required)

**Coverage:** All 6 chapters + landing page + navigation flows

**Key Scenarios:**
1. Ask "What chapter am I in?" from each chapter → Verify correct response
2. Navigate during conversation → Verify context switches
3. Ask navigation questions → Verify AI suggests relevant chapters
4. Check visual theming → Verify accent colors match chapter

### Automated Testing (Optional)

**Unit Tests:**
- `getChapterContext()` returns correct context for each chapter
- `ChatService.sendMessage()` passes currentChapter correctly

**Integration Tests:**
- ChatAssistant passes currentChapter from NavigationContext to ChatService
- Suggestions update when currentChapter changes

## Dependencies

**Before Phase 5:**
- Phase 1: Navigation architecture (NavigationContext)
- Phase 4: Visual theming (data-chapter pattern, theme colors)

**After Phase 5:**
- Phase 6: Performance optimization (independent, can run in parallel)

## Estimated Timeline

| Wave | Plans | Est. Time | Key Deliverable |
|------|-------|-----------|----------------|
| Wave 1 | 05-01 | 15-20 min | Chapter context awareness |
| Wave 2 | 05-02 | 12-15 min | Navigation assistant |
| **Total** | **2 plans** | **27-35 min** | **AI Chapter Companion** |

---

**Created:** 2026-03-03  
**Status:** Planning complete, ready for execution  
**Next Step:** Execute 05-01-PLAN.md (Chapter Context Awareness)
