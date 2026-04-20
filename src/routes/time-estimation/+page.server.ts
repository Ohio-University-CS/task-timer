import type { Actions } from "./$types";
import { PDFParse } from "pdf-parse";

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

// Actual function
export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const file = formData.get("file");

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
            text: data.text
        };
    }
};