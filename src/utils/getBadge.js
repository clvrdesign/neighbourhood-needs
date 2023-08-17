export function getBadge(rank) {
  return {
    1: { path: "src/img/newcomer.png", name: "newcomer" },
    2: { path: "src/img/civicEnthusiastBadge.png", name: "Civic Enthusiast" },
    3: {
      path: "src/img/communitySupporterBadge.png",
      name: "Community Supporter",
    },
    4: {
      path: "src/img/communityAdvocateBadge.png",
      name: "Community Advocate",
    },
    5: { path: "src/img/outreachGuardianBadge.png", name: "Outreach Guardian" },
    6: {
      path: "src/img/neighbourhoodLuminaryBadge.png",
      name: "Neighbourhood Luminary",
    },
    7: {
      path: "src/img/arbiterOfEmpowermentBadge.png",
      name: "Arbiter Of Empowerment",
    },
    8: { path: "src/img/impactCatalystBadge.png", name: "Impact Catalyst" },
    9: {
      path: "src/img/pillarOfTheCommunityBadge.png",
      name: "Pillar Of The Community",
    },
    10: {
      path: "src/img/communityAmbassadorBadge.png",
      name: "Community Ambassador",
    },
  }[rank];
}
