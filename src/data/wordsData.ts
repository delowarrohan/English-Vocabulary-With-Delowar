import { WordItem } from '../types';
import { KNOWN_VERBS_MAP, getRegularVerbForms, isBengaliVerb, capitalize } from './verbsMap';
import { RAW_DICTIONARY_ENTRIES } from './rawWordsA_E';
import { RAW_DICTIONARY_ENTRIES_F_M } from './rawWordsF_M';
import { RAW_DICTIONARY_ENTRIES_N_S } from './rawWordsN_S';
import { RAW_DICTIONARY_ENTRIES_T_Z } from './rawWordsT_Z';

type WordTuple = [string, string, string, boolean?];

const ALL_RAW_ENTRIES: WordTuple[] = [
  ...RAW_DICTIONARY_ENTRIES,
  ...RAW_DICTIONARY_ENTRIES_F_M,
  ...RAW_DICTIONARY_ENTRIES_N_S,
  ...RAW_DICTIONARY_ENTRIES_T_Z,
];

export function buildDictionaryDataset(): WordItem[] {
  const seenMap = new Map<string, WordItem>();

  ALL_RAW_ENTRIES.forEach(([rawEnglish, pronunciation, meaning, forcedVerb], index) => {
    const englishClean = rawEnglish.trim();
    const lowerKey = englishClean.toLowerCase();

    // Determine if verb
    const isKnownVerb = !!KNOWN_VERBS_MAP[lowerKey];
    const isVerb = forcedVerb ?? (isKnownVerb || isBengaliVerb(meaning));

    let past = '';
    let pastParticiple = '';

    if (isVerb) {
      if (KNOWN_VERBS_MAP[lowerKey]) {
        past = KNOWN_VERBS_MAP[lowerKey].past;
        pastParticiple = KNOWN_VERBS_MAP[lowerKey].pastParticiple;
      } else {
        const regular = getRegularVerbForms(englishClean);
        past = regular.past;
        pastParticiple = regular.pastParticiple;
      }
    }

    const presentFormatted = capitalize(englishClean);

    const wordItem: WordItem = {
      id: `word_${index + 1}_${lowerKey.replace(/[^a-z0-9]/g, '_')}`,
      present: presentFormatted,
      pronunciation: pronunciation || '',
      meaning: meaning || '',
      past: past || '',
      pastParticiple: pastParticiple || '',
      isVerb: isVerb,
      category: isVerb ? 'Verb' : 'Vocabulary',
    };

    if (!seenMap.has(lowerKey)) {
      seenMap.set(lowerKey, wordItem);
    } else {
      // Merge/enrich if needed
      const existing = seenMap.get(lowerKey)!;
      if (!existing.isVerb && isVerb) {
        existing.isVerb = true;
        existing.past = past;
        existing.pastParticiple = pastParticiple;
      }
      if (!existing.pronunciation && pronunciation) {
        existing.pronunciation = pronunciation;
      }
    }
  });

  return Array.from(seenMap.values());
}

export const INITIAL_WORDS: WordItem[] = buildDictionaryDataset();
