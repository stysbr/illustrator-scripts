# Adobe Illustrator Calendar Premaker Script

This script helps you generate vector calendars directly inside Adobe Illustrator. It has been enhanced with a modern UI and flexible layout options to speed up your workflow.

## 🚀 Features

### New Features Added:
*   **Unified Settings UI**: All settings are now available in a single, easy-to-use dialog box, replacing the old step-by-step prompts.
*   **Language Support**: 
    *   Easily toggle between **English** and **Bahasa Indonesia**.
    *   Month and Day names automatically update based on your selection.
*   **Start Day Selection**: Choose your preferred week start day: **Monday** or **Sunday**.
*   **Gap Settings**: 
    *   Adjust **Horizontal (Column)** and **Vertical (Row)** gaps between dates.
    *   Select from preset values (0 to 100pt) to create spacious or compact layouts.
*   **Smart Header Layout**:
    *   **Month Name** is aligned to the **Left**.
    *   **Year** is aligned to the **Right**, automatically adjusting to the width of your grid regardless of gap settings.
    *   Fixed vertical spacing ensures headers look consistent even with large row gaps.
*   **Live Customization**: You can manually edit the lists of Month Names, Day Names, and Holidays directly in the settings panel before generating the calendar.

## 🛠 How to Use
1.  Open Adobe Illustrator.
2.  Go to `File > Scripts > Other Script...`
3.  Select `Calendar Premaker.jsx`.
4.  In the settings dialog:
    *   **Year**: Enter the target year (e.g., 2026).
    *   **General Settings**: Choose Language and Start Day.
    *   **Layout Settings**: Set your desired Gaps (X/Y).
    *   **Customization**: Verify the pre-filled Month/Day names or add Holidays (format: `D/M`, separated by commas).
5.  Click **OK**. The script will generate the calendar vector on a new document.

## 🎨 Tips
*   The script uses **Paragraph Styles** and **Character Styles**. Open `Window > Type > Paragraph Styles` to globally change fonts, sizes, or colors after the calendar is generated.
*   Use the **Gap Settings** to create room for writing notes or adding decorative elements between dates.
