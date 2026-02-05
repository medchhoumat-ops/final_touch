
export interface Lead {
  id: string;
  businessName: string;
  website: string;
  email: string;
  description: string;
  contactPerson?: string;
  score: number;
}

export enum PrecisionLevel {
  HIGH_ACCURACY = 'High Accuracy',
  WIDE_RANGE = 'Wide Range',
  VERIFIED_ONLY = 'Verified Only'
}

export interface LeadSearchParams {
  category: string;
  location: string;
  quantity: number;
  precision: PrecisionLevel;
}

export interface GenerationHistory {
  id: string;
  params: LeadSearchParams;
  date: string;
  leadCount: number;
}
