/* This is the server that handles file uploads for the time estimation page. 
   I had to get creative with this, since Vercel restricts what I am able to do regarding
   file uploads since storing to the static folder in SvelteKit isn't very reliable with Vercel.
   I wanted to avoid having to use something like Render for temporary file storage, so I opted to have
   the server parse the PDF and return it to the client as a string instead of storing it somewhere. */

import type { Actions } from "./$types";
import { PDFParse } from "pdf-parse";

// Filtering out console warnings (they have no effect on the output, but this helps with filtering later)
const originalWarn = console.warn;
const originalError = console.error;

function shouldIgnore(msg: unknown) {
    const text = String(msg);

    return (
        text.includes("TT: undefined function") ||
        text.includes("standardFontDataUrl") ||
        text.includes("UnknownErrorException") ||
        text.includes("Warning: TT")
    );
}

console.warn = (...args: any[]) => {
    if (args.some(shouldIgnore)) return;
    originalWarn(...args);
};

console.error = (...args: any[]) => {
    if (args.some(shouldIgnore)) return;
    originalError(...args);
};

// Function to handle PDF submissions
export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();

        const file = formData.get("file");
        const subject = formData.get("subject");
        const confidence = formData.get("confidence");

        if (!(file instanceof File)) {
            return { text: "No file uploaded" };
        }

        if (file.size === 0) {
            return { text: "Empty file" };
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const uint8Array = new Uint8Array(buffer);

        const parser = new PDFParse(uint8Array);
        const data = await parser.getText();

        return {
            text: data.text,
            subject: formData.get("subject"),
            confidence: formData.get("confidence")
        };
    }
};