import type { SolarPost, SolarPostFormData, SolarPostWithCalculations } from "./types";

export const MOCK_POSTS: SolarPost[] = [
  {
    id: 1,
    dailyProduction: 32.5,
    place: "Kerala, India",
    postDate: "2026-07-04",
    panelWattage: 450,
    panelCount: 12,
    createdAt: "2026-07-04T10:30:00Z",
  },
  {
    id: 2,
    dailyProduction: 28.1,
    place: "Austin, TX",
    postDate: "2026-07-04",
    panelWattage: 400,
    panelCount: 10,
    createdAt: "2026-07-04T09:15:00Z",
  },
  {
    id: 3,
    dailyProduction: 45.2,
    place: "Barcelona, Spain",
    postDate: "2026-07-03",
    panelWattage: 500,
    panelCount: 14,
    createdAt: "2026-07-03T18:45:00Z",
  },
  {
    id: 4,
    dailyProduction: 18.7,
    place: "Tokyo, Japan",
    postDate: "2026-07-03",
    panelWattage: 350,
    panelCount: 8,
    createdAt: "2026-07-03T14:20:00Z",
  },
  {
    id: 5,
    dailyProduction: 52.3,
    place: "Cairo, Egypt",
    postDate: "2026-07-03",
    panelWattage: 550,
    panelCount: 16,
    createdAt: "2026-07-03T12:00:00Z",
  },
  {
    id: 6,
    dailyProduction: 12.4,
    place: "Berlin, Germany",
    postDate: "2026-07-02",
    panelWattage: 375,
    panelCount: 6,
    createdAt: "2026-07-02T16:30:00Z",
  },
  {
    id: 7,
    dailyProduction: 39.8,
    place: "Rajasthan, India",
    postDate: "2026-07-02",
    panelWattage: 480,
    panelCount: 14,
    createdAt: "2026-07-02T11:10:00Z",
  },
  {
    id: 8,
    dailyProduction: 24.6,
    place: "Melbourne, Australia",
    postDate: "2026-07-01",
    panelWattage: 420,
    panelCount: 10,
    createdAt: "2026-07-01T08:45:00Z",
  },
];

export function calculateTotalCapacity(panelWattage: number, panelCount: number): number {
  return (panelWattage * panelCount) / 1000;
}

export function calculateSpecificYield(
  dailyProduction: number,
  totalCapacityKwp: number
): number {
  if (totalCapacityKwp === 0) return 0;
  return dailyProduction / totalCapacityKwp;
}

export function enrichPost(post: SolarPost): SolarPostWithCalculations {
  const totalCapacityKwp = calculateTotalCapacity(post.panelWattage, post.panelCount);
  const specificYield = calculateSpecificYield(post.dailyProduction, totalCapacityKwp);
  return { ...post, totalCapacityKwp, specificYield };
}

export function enrichPosts(posts: SolarPost[]): SolarPostWithCalculations[] {
  return posts.map(enrichPost);
}

export function getSortedPosts(): SolarPostWithCalculations[] {
  return enrichPosts(MOCK_POSTS).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function filterPosts(
  posts: SolarPostWithCalculations[],
  query: string
): SolarPostWithCalculations[] {
  if (!query.trim()) return posts;
  const lower = query.toLowerCase();
  return posts.filter(
    (p) =>
      p.place.toLowerCase().includes(lower) || p.postDate.includes(query.trim())
  );
}

let nextId = MOCK_POSTS.length + 1;

export function addMockPost(data: SolarPostFormData): SolarPostWithCalculations {
  const newPost: SolarPost = {
    id: nextId++,
    dailyProduction: data.dailyProduction,
    place: data.place,
    postDate: data.postDate,
    panelWattage: data.panelWattage,
    panelCount: data.panelCount,
    createdAt: new Date().toISOString(),
  };
  MOCK_POSTS.push(newPost);
  return enrichPost(newPost);
}
