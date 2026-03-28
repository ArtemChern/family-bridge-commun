# Planning Guide

An AI-powered family communication tool that helps parents and children write more effective, empathetic messages by providing real-time refinement suggestions with educational explanations, fostering healthier relationships through better communication habits. Users can select from multiple GitHub-hosted LLM models to power the AI suggestions.

**Experience Qualities**: 
1. **Empowering** - Users feel confident in improving their communication skills through clear, actionable feedback
2. **Supportive** - The interface provides gentle guidance without judgment, creating a safe space for growth
3. **Intelligent** - Advanced AI models offer nuanced understanding of family dynamics and emotional context

**Complexity Level**: Light Application (multiple features with basic state)
  - The app has several interconnected features (message input, AI refinement with model selection, comparison view, explanations) but maintains a focused, single-purpose flow without requiring complex multi-view navigation or heavy data persistence

## Essential Features

### Message Input & Role Selection
- **Functionality**: Text area for composing messages with radio buttons to select sender role (Parent/Child)
- **Purpose**: Captures the user's raw communication attempt and context to tailor AI suggestions appropriately
- **Trigger**: User lands on the main page
- **Progression**: Select role → Type message → View character count → Enable improve button when ready
- **Success criteria**: Input captures multi-line text, role selection is clear, button state reflects readiness

### AI Model Selection
- **Functionality**: Dropdown selector for choosing between available GitHub-hosted LLM models (GPT-4o, GPT-4o Mini)
- **Purpose**: Allows users to choose between more capable models for complex communication or faster models for quick improvements
- **Trigger**: Displayed alongside role selection before message composition
- **Progression**: View model options → Select preferred model → See model description → Model preference persists for future sessions
- **Success criteria**: Clear model descriptions, visual badges indicating recommended/fast options, selection persists using useKV

### AI Message Refinement
- **Functionality**: Submit button triggers AI analysis that returns improved message version with categorized explanations
- **Purpose**: Provides concrete examples of better communication patterns while explaining the reasoning
- **Trigger**: Click "Improve Message" button
- **Progression**: Click improve → Loading state with skeleton → Results appear with animation → Compare original vs improved
- **Success criteria**: Response within reasonable time using selected model, maintains original intent, feels authentic not robotic

### Side-by-Side Message Comparison
- **Functionality**: Side-by-side or stacked display (responsive) showing original vs improved message
- **Purpose**: Makes differences immediately visible and reinforces learning
- **Trigger**: Results returned from AI
- **Progression**: Messages appear with staggered animation → Visual distinction through color/border → User can copy either version
- **Success criteria**: Clear visual hierarchy, improved message stands out, responsive layout adapts to mobile

### Categorized Explanations
- **Functionality**: Expandable cards showing why changes were made, grouped by category (Tone, Clarity, Emotional Balance)
- **Purpose**: Educational component - users learn communication principles beyond just this message
- **Trigger**: Automatically displayed below message comparison
- **Progression**: Cards animate in sequentially → Icons indicate category → Text explains specific improvements → Disclaimer about AI suggestions
- **Success criteria**: 2-3 focused explanations, clear categories, actionable insights

### Message History with Persistence
- **Functionality**: Tab showing past message pairs with timestamps and role context, persisted using useKV
- **Purpose**: Allows users to review their communication journey and see improvement over time
- **Trigger**: Click "History" tab
- **Progression**: View history → Browse past messages → See original/improved pairs → Optional: clear history
- **Success criteria**: Chronological order, persistent across sessions, easy to browse, clear action to remove

## Edge Case Handling

- **Empty message submission** - Disable button until text entered, show toast if attempted
- **API failure** - Display friendly error message with retry option, don't lose user's message
- **Very long messages** - Show character count with suggested maximum, allow but may truncate display
- **Offline state** - Show clear indicator that AI features require connection
- **No history** - Empty state with helpful illustration and prompt to start using the app
- **Model selection errors** - Fallback to default model if selected model unavailable

## Design Direction

The design should evoke trust, calm, and optimism - like a wise friend who helps you communicate better. It should feel modern and tech-forward (acknowledging the AI) while remaining warm and human-centered. Visual language should emphasize connection and bridges between people.

## Color Selection

The color scheme uses cool blues and purples to evoke trust and calm, with warm accents for moments of insight and success.

- **Primary Color (Deep Ocean Blue `oklch(0.45 0.12 250)`**: Main brand color representing depth, trust, and thoughtfulness - used for primary actions and key UI elements
- **Secondary Colors**: 
  - Warm Sand `oklch(0.92 0.02 70)` - Soft, neutral backgrounds that don't compete with content
  - Soft Sky `oklch(0.88 0.04 240)` - Card backgrounds with subtle blue tint
- **Accent Color (Gentle Violet `oklch(0.65 0.15 290)`**: Attention-grabbing highlight for AI features, insights, and moments of learning
- **Foreground/Background Pairings**: 
  - Background (Whisper White `oklch(0.98 0.005 240)`): Dark Navy text `oklch(0.25 0.02 250)` - Ratio 11.2:1 ✓
  - Primary (Deep Ocean Blue `oklch(0.45 0.12 250)`): White text `oklch(1 0 0)` - Ratio 8.1:1 ✓
  - Accent (Gentle Violet `oklch(0.65 0.15 290)`): White text `oklch(1 0 0)` - Ratio 4.6:1 ✓
  - Card (Soft Sky `oklch(0.88 0.04 240)`): Dark Navy text `oklch(0.25 0.02 250)` - Ratio 10.8:1 ✓

## Font Selection

Typography should feel modern and approachable while maintaining exceptional readability for potentially emotional content.

- **Primary Font**: Space Grotesk - A geometric sans-serif with technical precision softened by humanist warmth, perfect for the AI-assisted context
- **Secondary Font**: Inter - Highly legible for body text and explanations

- **Typographic Hierarchy**:
  - H1 (App Title): Space Grotesk Bold / 32px / -0.02em letter spacing / line-height 1.1
  - H2 (Section Headers): Space Grotesk SemiBold / 24px / -0.01em / line-height 1.2
  - H3 (Message Labels): Space Grotesk Medium / 18px / 0em / line-height 1.3
  - Body (Messages & Explanations): Inter Regular / 16px / 0em / line-height 1.6
  - Small (Metadata, timestamps): Inter Regular / 14px / 0em / line-height 1.5
  - Button Text: Space Grotesk Medium / 16px / 0em / line-height 1

## Animations

Animations should feel gentle and purposeful - like breathing or flowing water - reinforcing the calm, supportive nature of the tool. Key moments include the message submission (subtle fade and scale), the appearance of refined results (smooth slide-in with opacity), and the highlighting of differences (gentle pulse). Avoid sudden movements; everything should ease naturally. The 3D background elements should have very slow, continuous motion (like floating in space) to create depth without distraction.

## Component Selection

- **Components**:
  - **Card**: For message containers (original vs improved), using subtle shadows and the soft sky background to create depth
  - **Textarea**: Primary input for message composition, with auto-resize and character count
  - **RadioGroup**: For Parent/Child role selection, with clear visual distinction and icons
  - **Select**: For AI model selection with descriptions and visual badges
  - **Button**: Primary action "Improve Message", with loading state during AI processing
  - **Badge**: For categorizing explanation types (Tone, Clarity, Emotional Balance) and model features (Recommended, Fast)
  - **ScrollArea**: For message history view when it exceeds viewport
  - **Separator**: To divide sections visually without harsh lines
  - **Alert**: For inline validation messages and error states
  - **Skeleton**: Loading state for AI processing, maintaining layout stability
  - **Tabs**: For switching between main view and history/stats view

- **Customizations**:
  - Custom 3D background using CSS transforms and gradients (soft geometric shapes with depth)
  - Custom message diff highlighting component that shows specific changes between original and improved
  - Custom explanation cards with iconography from @phosphor-icons/react (Lightbulb, ChatCircle, Heart, Robot, Sparkle)
  - Custom model selector with detailed descriptions and visual indicators
  - Floating particle effect using framer-motion for ambient background movement

- **States**:
  - Buttons: Idle (primary blue), Hover (slightly lighter with lift), Active (pressed down), Loading (spinner with reduced opacity), Disabled (muted with cursor not-allowed)
  - Inputs: Empty (placeholder visible), Focused (accent border with subtle glow), Filled (border returns to default), Error (red border with shake animation)
  - Cards: Rest (subtle shadow), Hover (increased shadow and slight lift for interactive cards)
  - Select: Closed (chevron down), Open (dropdown visible with options), Selected (checkmark visible)

- **Icon Selection**:
  - UserCircle / Users - Role selection indicators
  - Robot - AI/Model features
  - Sparkle - AI model badges and refinement in progress
  - PaperPlaneRight - Send/Improve message action
  - Lightbulb - Insight/explanation moments
  - ChatCircle - Tone improvements
  - Heart - Emotional balance indicators
  - ClockCounterClockwise - Message history
  - ArrowsLeftRight - Comparison view toggle

- **Spacing**:
  - Container padding: px-6 py-8 (mobile) / px-12 py-12 (desktop)
  - Card padding: p-6
  - Section gaps: gap-8 (vertical stacking)
  - Element gaps: gap-4 (related items), gap-2 (tight groups)
  - Button padding: px-6 py-3
  - Input padding: p-4

- **Mobile**:
  - Stack comparison view vertically on mobile instead of side-by-side
  - Larger touch targets for role selection (min 44px)
  - Larger touch targets for model selection dropdown
  - Fixed bottom action button on mobile for easy thumb access
  - Collapsible explanation sections to reduce scrolling
  - Simplified 3D effects on mobile (performance consideration)
  - Single column layout with clear visual hierarchy
