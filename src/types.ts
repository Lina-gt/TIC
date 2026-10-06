export interface Contender {
  id: string;
  title: string;
  advocate: string;
  notes?: string;
}

export interface MediationContext {
  vibe: string;
  availableTime: string;
  lastPickedBy: string;
  energyLevel?: string;
  specialNotes?: string;
}

export interface FilmAnalysis {
  title: string;
  advocate?: string;
  directorAndYear: string;
  genreAndTone: string;
  runtimeApprox: string;
  pacingRating: string;
  attentionRequired: string;
  emotionalWeight: string;
  whyWatchToday: string;
  risksToday: string;
  advocatePitch: string;
}

export interface Verdict {
  winnerTitle: string;
  winnerAdvocate?: string;
  titleVerdict: string;
  reasoning: string;
  concessionDeal: string;
}

export interface CompromiseFilm {
  title: string;
  directorAndYear: string;
  whyItSynthesizesBoth: string;
  shortSynopsis: string;
  whereToFindTone: string;
}

export interface MediationResult {
  summaryDilemma: string;
  filmAnalysis: FilmAnalysis[];
  verdict: Verdict;
  compromiseFilm: CompromiseFilm;
  popcornTrivia: string;
}

export interface PresetDilemma {
  id: string;
  title: string;
  badge: string;
  movie1: { title: string; advocate: string };
  movie2: { title: string; advocate: string };
  vibe: string;
  availableTime: string;
  suggestedCompromise?: string;
}
