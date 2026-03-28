# Planning Guide

An AI-powered family communication tool that helps parents and children write more effective, empathetic messages by providing real-time refinement suggestions with educational explanations, fostering healthier relationships through better communication habits.

2. **Supportive** - The in
1. **Empowering** - Users feel confident in improving their communication skills through clear, actionable feedback
2. **Supportive** - The interface provides gentle guidance without judgment, creating a safe space for growth
3. **Simple** - Streamlined interface focused on core functionality without overwhelming options

- **Progression**: Select role → Type message → View character count → Enabl


- **Trigger**: Click 

### Side-by-Side Message Compariso
- **Purpose**: Makes differences immediately visible and reinforces learning
- **Progression**: Messages appear with staggered animation → Visual distinction through color/border → User ca

- **Functionality**: Expandable cards showing why changes were made, grouped by category (Tone, Clarity
- **Trigger**: Automatically displayed below message comparison

### Message History with 
- **Purpose**: Allows users to review their communication journey and see improvement over time
- **Progression**: View history → Browse past messages → See original/improved pairs → Optional: clear hi


- **API failure** - Display friendly error message with retry option, don't lose user's message






- **Secondary Colors**: 

- **Foreground/Background Pa
  - Primary (Deep Ocean Blue `oklch(0.45 0.12 250)`): White text `oklch(1 0 0)` - Ratio 8.1:1 ✓
  - Card (Soft Sky `oklch(0.88 0.04 240)`): Dark Navy text `oklch(0.25 0.02 250)` - Ratio 10.8:1 ✓
## Font Selection
Typography should feel modern and approachable while maintaining exceptional readability for potentially emotional content.
- **Primary Font**: Space Grotesk - A geometric sans-serif with technical precision sof

  - H1 (App Title): Space Grotesk Bo
  - H3 (Message Labels): Space Grotesk Medium / 18px / 0em / line-height 1.3
  - Small (Metadata, timestamps): Inter Regular / 14px / 0em / line-height 1.5




  - **Card**: For mes

  - **Badge**: For categorizing explanation types (Tone, Clarity, Emotional Balance) and mo
  - **Separator**: To divide sections visually without harsh lines
  - **Skeleton**: Loading state for AI processing, maintaining layout stability

  - Custom floating background using CSS gradients with framer-motion for ambient movement

- **States**:

  - Select: Closed (chevron down), Open (dropdown visible with options), Selected (checkmark visible)

  - Robot - AI/Mod

  - ChatCircle - Tone improvements


  - Container padding: p
  - Section gaps: gap-8 (vertical stacking)
  - Button padding: px-6 py-3

  - Stack comparison view vertically o
  - Larger touch targets for model selection dropdown
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
  - **Button**: Primary action "Improve Message", with loading state during AI processing
  - **Badge**: For categorizing explanation types (Tone, Clarity, Emotional Balance) and model features (Recommended, Fast)
  - **ScrollArea**: For message history view when it exceeds viewport
  - **Separator**: To divide sections visually without harsh lines
  - **Alert**: For inline validation messages and error states
  - **Skeleton**: Loading state for AI processing, maintaining layout stability
  - **Tabs**: For switching between main view and history/stats view

- **Customizations**:
  - Custom floating background using CSS gradients with framer-motion for ambient movement
  - Custom message comparison component that shows original vs improved side-by-side
  - Custom explanation cards with iconography from @phosphor-icons/react (Lightbulb, ChatCircle, Heart, Robot, Sparkle)

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

  - Simplified 3D effects on mobile (performance consideration)

