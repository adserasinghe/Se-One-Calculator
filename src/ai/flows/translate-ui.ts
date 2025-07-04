// src/ai/flows/translate-ui.ts
'use server';
/**
 * @fileOverview A UI translation AI agent.
 *
 * - translateUi - A function that handles the UI translation process.
 * - TranslateUiInput - The input type for the translateUi function.
 * - TranslateUiOutput - The return type for the translateUi function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranslateUiInputSchema = z.object({
  text: z.string().describe('The UI text to translate.'),
  language: z.string().describe('The target language for the translation.'),
});
export type TranslateUiInput = z.infer<typeof TranslateUiInputSchema>;

const TranslateUiOutputSchema = z.object({
  translatedText: z.string().describe('The translated UI text.'),
});
export type TranslateUiOutput = z.infer<typeof TranslateUiOutputSchema>;

export async function translateUi(input: TranslateUiInput): Promise<TranslateUiOutput> {
  return translateUiFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateUiPrompt',
  input: {schema: TranslateUiInputSchema},
  output: {schema: TranslateUiOutputSchema},
  prompt: `Translate the following UI text to {{language}}:

{{{text}}}`, 
});

const translateUiFlow = ai.defineFlow(
  {
    name: 'translateUiFlow',
    inputSchema: TranslateUiInputSchema,
    outputSchema: TranslateUiOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
