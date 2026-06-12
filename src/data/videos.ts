export type VideoSource = 'youtube' | 'drive';

export interface VideoContent {
  id: string;
  title: string;
  url: string;
  source: VideoSource;
  duration?: string;
}

export interface VideoCategory {
  id: string;
  instructor: string;
  title: string;
  description: string;
  color: 'blue' | 'emerald' | 'purple' | 'amber';
  videos: VideoContent[];
}

export const VIDEO_CATEGORIES: VideoCategory[] = [
  {
    id: "eng-bassant",
    instructor: "Eng. Bassant Amr",
    title: "Intensive Review Sessions",
    description: "In-depth revision and exam preparation covering core elements of C++ like Arrays, Functions, and logic structures.",
    color: "blue",
    videos: [
      { id: "b1", title: "C++ Basics (Part 1)", url: "https://drive.google.com/file/d/1_KsKYna4WLSp-_LQYSflh3OE5GVei_EP/preview", source: "drive" },
      { id: "b2", title: "C++ Basics (Part 2)", url: "https://drive.google.com/file/d/1H9I7NKgpLwmDBt1EPT5fRMW8-GbY9uBX/preview", source: "drive" },
      { id: "b3", title: "Arrays mastery", url: "https://drive.google.com/file/d/1T0x6LlOqy5qa39KPvxaNgjjjSOdF60za/preview", source: "drive" },
      { id: "b4", title: "Functions & Scope", url: "https://drive.google.com/file/d/1YSGFbmZivIABL7jyZBqiw3k9ddvKDg9T/preview", source: "drive" },
      { id: "b5", title: "Loops Breakdown", url: "https://drive.google.com/file/d/1N-1w6j1riGwWLBn1m-vCOq-ZeIxK9V2_/preview", source: "drive" },
      { id: "b6", title: "Structures (Structs)", url: "https://drive.google.com/file/d/1HDtzcl1kXINYde2OUsAVl_cQrrURy_FI/preview", source: "drive" },
      { id: "rev1", title: "Final Revision 1", url: "https://drive.google.com/file/d/1N6jrRjbU31sgkbMVh-UW1k9DdzA3yxrX/preview", source: "drive" },
      { id: "rev2", title: "Final Revision 2", url: "https://drive.google.com/file/d/1r_-wWZy6nli3K0xWGmwnGs_puP_BO9uy/preview", source: "drive" },
    ]
  },
  {
    id: "prof-ehab",
    instructor: "Dr. Ehab Elshimy",
    title: "Official Academic Course",
    description: "The complete, official university curriculum playlist covering C++ theory and academic methodologies.",
    color: "emerald",
    videos: [
      { id: "e1", title: "Lecture 1 - Program Design Intro", duration: "41:15", url: "https://www.youtube.com/embed/OBHmgF4f9Mc", source: "youtube" },
      { id: "e2", title: "NUMBER SYSTEM", duration: "19:01", url: "https://www.youtube.com/embed/TIjwAa_w1xA", source: "youtube" },
      { id: "e3", title: "Lecture 2", duration: "36:21", url: "https://www.youtube.com/embed/hVCfblqE7OU", source: "youtube" },
      { id: "e4", title: "Introduction to C++", duration: "29:23", url: "https://www.youtube.com/embed/tLOjEItX3WU", source: "youtube" },
      { id: "e5", title: "Elementary Programming", duration: "57:12", url: "https://www.youtube.com/embed/8DVbk2kv-9o", source: "youtube" },
      { id: "e6", title: "Conditional Statement 1", duration: "21:31", url: "https://www.youtube.com/embed/BPUoU_80kjI", source: "youtube" },
      { id: "e7", title: "Conditional Statement 1 2", duration: "14:20", url: "https://www.youtube.com/embed/BxpVONNATVw", source: "youtube" },
      { id: "e8", title: "Loops", duration: "1:09:51", url: "https://www.youtube.com/embed/O8AUSrtdU9U", source: "youtube" },
      { id: "e9", title: "Array C++", duration: "57:44", url: "https://www.youtube.com/embed/hPHFhU-ukAQ", source: "youtube" },
      { id: "e10", title: "Pointers and Reference", duration: "25:06", url: "https://www.youtube.com/embed/otraoave7sw", source: "youtube" },
      { id: "e11", title: "Function 1", duration: "33:57", url: "https://www.youtube.com/embed/nGK5ug5csyI", source: "youtube" },
      { id: "e12", title: "Function 2", duration: "1:00:10", url: "https://www.youtube.com/embed/mTvx07vKmIk", source: "youtube" },
      { id: "e13", title: "Structure Programming - Program Design", duration: "Unknown", url: "https://www.youtube.com/embed/GbrzcXiLmEs", source: "youtube" }
    ]
  }
];
