// Known irregular and specific verb forms
export const KNOWN_VERBS_MAP: Record<string, { past: string; pastParticiple: string; meaning?: string }> = {
  abide: { past: 'Abode / Abided', pastParticiple: 'Abode / Abided' },
  arise: { past: 'Arose', pastParticiple: 'Arisen' },
  awake: { past: 'Awoke', pastParticiple: 'Awoken' },
  bear: { past: 'Bore', pastParticiple: 'Borne / Born' },
  beat: { past: 'Beat', pastParticiple: 'Beaten' },
  become: { past: 'Became', pastParticiple: 'Become' },
  begin: { past: 'Began', pastParticiple: 'Begun' },
  behold: { past: 'Beheld', pastParticiple: 'Beheld' },
  bend: { past: 'Bent', pastParticiple: 'Bent' },
  bet: { past: 'Bet', pastParticiple: 'Bet' },
  bid: { past: 'Bade / Bid', pastParticiple: 'Bidden / Bid' },
  bind: { past: 'Bound', pastParticiple: 'Bound' },
  bite: { past: 'Bit', pastParticiple: 'Bitten' },
  bleed: { past: 'Bled', pastParticiple: 'Bled' },
  blow: { past: 'Blew', pastParticiple: 'Blown' },
  break: { past: 'Broke', pastParticiple: 'Broken' },
  breed: { past: 'Bred', pastParticiple: 'Bred' },
  bring: { past: 'Brought', pastParticiple: 'Brought' },
  build: { past: 'Built', pastParticiple: 'Built' },
  burn: { past: 'Burnt / Burned', pastParticiple: 'Burnt / Burned' },
  burst: { past: 'Burst', pastParticiple: 'Burst' },
  buy: { past: 'Bought', pastParticiple: 'Bought' },
  cast: { past: 'Cast', pastParticiple: 'Cast' },
  catch: { past: 'Caught', pastParticiple: 'Caught' },
  choose: { past: 'Chose', pastParticiple: 'Chosen' },
  cling: { past: 'Clung', pastParticiple: 'Clung' },
  come: { past: 'Came', pastParticiple: 'Come' },
  cost: { past: 'Cost', pastParticiple: 'Cost' },
  creep: { past: 'Crept', pastParticiple: 'Crept' },
  cut: { past: 'Cut', pastParticiple: 'Cut' },
  deal: { past: 'Dealt', pastParticiple: 'Dealt' },
  dig: { past: 'Dug', pastParticiple: 'Dug' },
  do: { past: 'Did', pastParticiple: 'Done' },
  draw: { past: 'Drew', pastParticiple: 'Drawn' },
  dream: { past: 'Dreamt / Dreamed', pastParticiple: 'Dreamt / Dreamed' },
  drink: { past: 'Drank', pastParticiple: 'Drunk' },
  drive: { past: 'Drove', pastParticiple: 'Driven' },
  eat: { past: 'Ate', pastParticiple: 'Eaten' },
  fall: { past: 'Fell', pastParticiple: 'Fallen' },
  feed: { past: 'Fed', pastParticiple: 'Fed' },
  feel: { past: 'Felt', pastParticiple: 'Felt' },
  fight: { past: 'Fought', pastParticiple: 'Fought' },
  find: { past: 'Found', pastParticiple: 'Found' },
  flee: { past: 'Fled', pastParticiple: 'Fled' },
  fling: { past: 'Flung', pastParticiple: 'Flung' },
  fly: { past: 'Flew', pastParticiple: 'Flown' },
  forbid: { past: 'Forbade', pastParticiple: 'Forbidden' },
  forget: { past: 'Forgot', pastParticiple: 'Forgotten' },
  forgive: { past: 'Forgave', pastParticiple: 'Forgiven' },
  freeze: { past: 'Froze', pastParticiple: 'Frozen' },
  get: { past: 'Got', pastParticiple: 'Got / Gotten' },
  give: { past: 'Gave', pastParticiple: 'Given' },
  go: { past: 'Went', pastParticiple: 'Gone' },
  grind: { past: 'Ground', pastParticiple: 'Ground' },
  grow: { past: 'Grew', pastParticiple: 'Grown' },
  hang: { past: 'Hung / Hanged', pastParticiple: 'Hung / Hanged' },
  have: { past: 'Had', pastParticiple: 'Had' },
  hear: { past: 'Heard', pastParticiple: 'Heard' },
  hide: { past: 'Hid', pastParticiple: 'Hidden' },
  hit: { past: 'Hit', pastParticiple: 'Hit' },
  hold: { past: 'Held', pastParticiple: 'Held' },
  hurt: { past: 'Hurt', pastParticiple: 'Hurt' },
  keep: { past: 'Kept', pastParticiple: 'Kept' },
  kneel: { past: 'Knelt / Kneeled', pastParticiple: 'Knelt / Kneeled' },
  knit: { past: 'Knit / Knitted', pastParticiple: 'Knit / Knitted' },
  know: { past: 'Knew', pastParticiple: 'Known' },
  lead: { past: 'Led', pastParticiple: 'Led' },
  lean: { past: 'Leant / Leaned', pastParticiple: 'Leant / Leaned' },
  learn: { past: 'Learnt / Learned', pastParticiple: 'Learnt / Learned' },
  leave: { past: 'Left', pastParticiple: 'Left' },
  lend: { past: 'Lent', pastParticiple: 'Lent' },
  let: { past: 'Let', pastParticiple: 'Let' },
  lie: { past: 'Lay / Lied', pastParticiple: 'Lain / Lied' },
  light: { past: 'Lit / Lighted', pastParticiple: 'Lit / Lighted' },
  lose: { past: 'Lost', pastParticiple: 'Lost' },
  make: { past: 'Made', pastParticiple: 'Made' },
  mean: { past: 'Meant', pastParticiple: 'Meant' },
  meet: { past: 'Met', pastParticiple: 'Met' },
  mistake: { past: 'Mistook', pastParticiple: 'Mistaken' },
  pay: { past: 'Paid', pastParticiple: 'Paid' },
  put: { past: 'Put', pastParticiple: 'Put' },
  quit: { past: 'Quit', pastParticiple: 'Quit' },
  read: { past: 'Read', pastParticiple: 'Read' },
  ride: { past: 'Rode', pastParticiple: 'Ridden' },
  ring: { past: 'Rang', pastParticiple: 'Rung' },
  rise: { past: 'Rose', pastParticiple: 'Risen' },
  run: { past: 'Ran', pastParticiple: 'Run' },
  say: { past: 'Said', pastParticiple: 'Said' },
  see: { past: 'Saw', pastParticiple: 'Seen' },
  seek: { past: 'Sought', pastParticiple: 'Sought' },
  sell: { past: 'Sold', pastParticiple: 'Sold' },
  send: { past: 'Sent', pastParticiple: 'Sent' },
  set: { past: 'Set', pastParticiple: 'Set' },
  sew: { past: 'Sewed', pastParticiple: 'Sewn / Sewed' },
  shake: { past: 'Shook', pastParticiple: 'Shaken' },
  shine: { past: 'Shone', pastParticiple: 'Shone' },
  shoot: { past: 'Shot', pastParticiple: 'Shot' },
  show: { past: 'Showed', pastParticiple: 'Shown' },
  shut: { past: 'Shut', pastParticiple: 'Shut' },
  sing: { past: 'Sang', pastParticiple: 'Sung' },
  sink: { past: 'Sank', pastParticiple: 'Sunk' },
  sit: { past: 'Sat', pastParticiple: 'Sat' },
  sleep: { past: 'Slept', pastParticiple: 'Slept' },
  slide: { past: 'Slid', pastParticiple: 'Slid' },
  speak: { past: 'Spoke', pastParticiple: 'Spoken' },
  spend: { past: 'Spent', pastParticiple: 'Spent' },
  stand: { past: 'Stood', pastParticiple: 'Stood' },
  steal: { past: 'Stole', pastParticiple: 'Stolen' },
  swim: { past: 'Swam', pastParticiple: 'Swum' },
  take: { past: 'Took', pastParticiple: 'Taken' },
  teach: { past: 'Taught', pastParticiple: 'Taught' },
  tear: { past: 'Tore', pastParticiple: 'Torn' },
  tell: { past: 'Told', pastParticiple: 'Told' },
  think: { past: 'Thought', pastParticiple: 'Thought' },
  throw: { past: 'Threw', pastParticiple: 'Thrown' },
  understand: { past: 'Understood', pastParticiple: 'Understood' },
  wake: { past: 'Woke', pastParticiple: 'Woken' },
  wear: { past: 'Wore', pastParticiple: 'Worn' },
  win: { past: 'Won', pastParticiple: 'Won' },
  write: { past: 'Wrote', pastParticiple: 'Written' },
};

// Helper function to capitalize string
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Function to generate regular past form for a verb
export function getRegularVerbForms(word: string): { past: string; pastParticiple: string } {
  const lower = word.toLowerCase().trim();
  if (KNOWN_VERBS_MAP[lower]) {
    return KNOWN_VERBS_MAP[lower];
  }
  if (lower.endsWith('e')) {
    const p = capitalize(lower) + 'd';
    return { past: p, pastParticiple: p };
  }
  if (lower.endsWith('y') && !/[aeiou]y$/.test(lower)) {
    const p = capitalize(lower.slice(0, -1)) + 'ied';
    return { past: p, pastParticiple: p };
  }
  const p = capitalize(lower) + 'ed';
  return { past: p, pastParticiple: p };
}

// Detect if a Bengali meaning indicates a verb action
export function isBengaliVerb(meaning: string): boolean {
  if (!meaning) return false;
  // Common Bengali verb endings in dictionary definitions
  return /(করা|হওয়া|হওয়া|দেওয়া|নেওয়া|যাওয়া|আসা|বলা|দেখা|মারা|ধরা|বানানো|খোলা|বন্ধ|শেখা|পড়া|লেখা|শোনা|নাচা|গাওয়া|আঁকা|থাকা|চলা|ওঠা|পড়া|কাটা|টানা|ছাড়|ভাঙা|গড়া|রক্ষা|চালানো|লাভ|পাওয়া|খোজা|ভাবা)/.test(
    meaning
  );
}
