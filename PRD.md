# Planning Guide

An AI-powered family communication tool that helps parents and children write more effective, empathetic messages by providing real-time refinement suggestions with educational explanations, fostering healthier relationships through better communication habits.


  - The app has several interconnected features (message input, AI refinement, comparison view, explanations) but maintains a focused, 
## Essential Features
### Message Input & Role Selection

**Complexity Level**: Light Application (multiple features with basic state)
  - The app has several interconnected features (message input, AI refinement, comparison view, explanations) but maintains a focused, single-purpose flow without requiring complex multi-view navigation or heavy data persistence

## Essential Features

### Message Input & Role Selection
- **Functionality**: Text area for composing messages with radio buttons to select sender role (Parent/Child)
- **Purpose**: Captures the user's raw communication attempt and context to tailor AI suggestions appropriately
- **Trigger**: User lands on the main page
- **Functionality**: Side-by-side or stacked display (responsive) showing original vs improved message
- **Trigger**: Results returned from AI

### Message History with 
- **Purpose**: Allows users to review their communication journey and see improvement over time
- **Progression**: View history → Browse past messages → See original/improved pairs → Optional: view statistics 


- **Very long messages** - Show character count with suggested maximum, allow but may truncate display

- **Offline state** -






  - Warm Sand `oklc
- **Functionality**: Side-by-side or stacked display (responsive) showing original vs improved message
  - Primary (Deep Ocean Blue `oklch(0.45 0.12 250)`): White text `oklch(1 0 0)` - Ratio 8.1:1 ✓
- **Trigger**: Results returned from AI
## Font Selection
Typography should feel modern and approachable while maintaining exceptional readability for potentially emotional conte


  - H1 (App Title): Space Grotesk Bold / 32px / -0.02em letter spacing / line-height 1.1
- **Purpose**: Allows users to review their communication journey and see improvement over time
  - Small (Metadata, timestamps): Inter Regular / 14px





  - **RadioGroup**: For Parent/Child role selection, with clear visual distinction and ic
- **Very long messages** - Show character count with suggested maximum, allow but may truncate display
  - **Separator**: To divide sections visually without harsh lines
  - **Skeleton**: Loading state for AI processing, maintaining layout stability

  - Custom 3D background using CSS transforms and gradients (soft geometric shape
  - Custom explanation cards with iconography from @phosphor-icons/react (Lig

  - Buttons: Idle (

- **Icon Selection**:

  - ChatCircle - T

  - ArrowsLeftRight - Comparison view toggle

  - Card padding: p-6
  - Element gaps: gap-4 
  - Input padding: p-4
- **Mobile**:
  - Larger touch targets for role selection (min 44px)
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
  - **Button**: Primary action "Improve Message", with loading state during AI processing
  - **Badge**: For categorizing explanation types (Tone, Clarity, Emotional Balance) with color coding
  - **ScrollArea**: For message history view when it exceeds viewport
  - **Separator**: To divide sections visually without harsh lines
  - **Alert**: For inline validation messages and error states
  - **Skeleton**: Loading state for AI processing, maintaining layout stability
  - **Tabs**: For switching between main view and history/stats view

- **Customizations**:
  - Custom 3D background using CSS transforms and gradients (soft geometric shapes with depth)
  - Custom message diff highlighting component that shows specific changes between original and improved
  - Custom explanation cards with iconography from @phosphor-icons/react (Lightbulb, ChatCircle, Heart)
  - Floating particle effect using framer-motion for ambient background movement

- **States**:
  - Buttons: Idle (primary blue), Hover (slightly lighter with lift), Active (pressed down), Loading (spinner with reduced opacity), Disabled (muted with cursor not-allowed)
  - Inputs: Empty (placeholder visible), Focused (accent border with subtle glow), Filled (border returns to default), Error (red border with shake animation)
  - Cards: Rest (subtle shadow), Hover (increased shadow and slight lift for interactive cards)

- **Icon Selection**:
  - UserCircle / Users - Role selection indicators
  - PaperPlaneRight - Send/Improve message action
  - Lightbulb - Insight/explanation moments
  - ChatCircle - Tone improvements
  - Heart - Emotional balance indicators
  - SparkleIcon - AI refinement in progress
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
  - Fixed bottom action button on mobile for easy thumb access
  - Collapsible explanation sections to reduce scrolling
  - Simplified 3D effects on mobile (performance consideration)

  - Single column layout with clear visual hierarchy
