import { useRef } from 'react'
import { AboutFirstSection } from '../sections/AboutFirstSection'
import { Advisors, CoreContributors, Investors } from '../sections/Collaborators'
import { ExploitsCoverageSection } from '../sections/ExploitsCoverageSection'
import { RoadmapSection } from '../sections/RoadmapSection'
import { StakingSection } from '../sections/StakingSection'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useHomepageSections() {
  const HomepageSections = [
    { Section: AboutFirstSection, key: 'about', ref: useRef<HTMLDivElement | null>(null) },
    // { Section: ExploitsCoverageSection, key: 'coverage', ref: useRef<HTMLDivElement | null>(null) },
    // { Section: StakingSection, key: 'staking', ref: useRef<HTMLDivElement | null>(null) },
    // { Section: RoadmapSection, key: 'roadmap', ref: useRef<HTMLDivElement | null>(null) },
    // { Section: Investors, key: 'investors', ref: useRef<HTMLDivElement | null>(null) },
    // { Section: Advisors, key: 'advisors', ref: useRef<HTMLDivElement | null>(null) },
    // { Section: CoreContributors, key: 'team', ref: useRef<HTMLDivElement | null>(null) },
  ] as const
  return { HomepageSections }
}

export type HomepageSections = ReturnType<typeof useHomepageSections>['HomepageSections']
