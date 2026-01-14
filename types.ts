export interface IntroSection {
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  subtitle: string;
  bgImage: string;
}

export interface OverviewItem {
  id: string;
  title: string;
  desc: string;
}

export interface RoadmapItem {
  quarter: string;
  title: string;
  details: string;
}

export interface RegistrationSection {
  title: string;
  subtitle: string;
  successTitle: string;
  successMessage: string;
  ctaButton: string;
  ctaProcessing: string;
  // New slogan fields matching the screenshot
  sloganSmall: string;
  sloganLine1: string;
  sloganLine2: string;
  visualImage: string;
}

export interface Speaker {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
}

export interface SpeakerSection {
  sectionTitle: string;
  sectionSubtitle: string;
  speakers: Speaker[];
}

export interface SiteData {
  intro: IntroSection;
  overview: OverviewItem[];
  roadmap: RoadmapItem[];
  speakers: SpeakerSection;
  registration: RegistrationSection;
  footer: {
    brandName: string;
    brandSub: string;
  };
}
