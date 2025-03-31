// 2024-11-18 18:09 승균 작성
export enum ExperienceType {
  EXTERNAL_ACTIVITY = 'EXTERNAL_ACTIVITY',
  EDUCATION = 'EDUCATION',
  VOLUNTEER = 'VOLUNTEER',
  CLUB = 'CLUB',
  ETC = 'ETC'
}

export enum AwardType {
  CERTIFICATE = 'CERTIFICATE',
  AWARD = 'AWARD'
}

export type HistoryItemType = {
  title: string;
  category: string;
  period: string;
  description?: string;
};

export type ExperienceItemType = {
  experienceType: ExperienceType;
  experienceName: string;
  startDate: string;
  endDate: string;
  experienceDescription: string;
};

export type CareerItemType = {
  companyName: string;
  startDate: string;
  endDate: string;
  careerDescription: string;
};

export type AwardItemType = {
  awardType: AwardType;
  organizer: string;
  awardName: string;
  awardDuration: string;
};

export type HistoryDataType = {
  introduction: string;
  experiences: ExperienceItemType[];
  careers: CareerItemType[];
  awards: AwardItemType[];
  portfolio: string[];
}; 