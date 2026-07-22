export interface WordItem {
  id: string;
  present: string;
  pronunciation?: string;
  meaning: string;
  past: string; // empty string "" if non-verb
  pastParticiple: string; // empty string "" if non-verb
  isVerb: boolean;
  category?: string;
}

export type DensityMode = 'high' | 'standard' | 'comfortable';
